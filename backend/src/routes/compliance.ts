/**
 * Compliance API Routes
 * 
 * Endpoints for investor classification, deal eligibility,
 * jurisdiction checks, and compliance management.
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../db/prisma.js';
import { InvestorType, ComplianceStatus, JurisdictionRegion } from '@prisma/client';
import {
  JURISDICTION_RULES,
  checkJurisdictionEligibility,
  getEligibleJurisdictions,
  getAllJurisdictions,
  getJurisdictionsByRegion,
  canMarketInJurisdiction,
  InvestorProfile,
} from '../services/jurisdiction.service.js';
import {
  complianceAI,
  ChatMessage,
  InvestorQuestionnaire,
  ComplianceCase,
} from '../services/compliance-ai.service.js';

// =============================================
// TYPES
// =============================================

interface ClassifyInvestorRequest {
  clerkUserId: string;
  email: string;
  countryCode: string;
  questionnaire: {
    totalAssets?: number;
    annualIncome?: number;
    financialAssets?: number;
    professionalExperience?: boolean;
    institutionalInvestor?: boolean;
    isUsPerson?: boolean;
    riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
    investmentHorizon?: string;
    investmentObjectives?: string[];
  };
}

interface CheckEligibilityRequest {
  investorId: string;
  dealId: string;
}

interface SuitabilityRequest {
  investorId: string;
  dealId: string;
}

// =============================================
// CLASSIFICATION RULES
// =============================================

function classifyInvestorType(questionnaire: ClassifyInvestorRequest['questionnaire'], countryCode: string): {
  type: InvestorType;
  reason: string;
  confidence: number;
} {
  const jurisdictionRule = JURISDICTION_RULES[countryCode];
  
  // US Person - must be accredited
  if (questionnaire.isUsPerson) {
    const meetsIncome = (questionnaire.annualIncome || 0) >= 200000;
    const meetsAssets = (questionnaire.totalAssets || 0) >= 1000000;
    
    if (meetsIncome || meetsAssets) {
      return {
        type: 'ACCREDITED',
        reason: 'US person meeting accredited investor criteria (income >= $200k or net worth >= $1M)',
        confidence: 0.95,
      };
    } else {
      return {
        type: 'RETAIL',
        reason: 'US person not meeting accredited investor criteria - restricted',
        confidence: 0.9,
      };
    }
  }
  
  // Institutional investor - always qualified
  if (questionnaire.institutionalInvestor) {
    return {
      type: 'QUALIFIED',
      reason: 'Institutional investor (bank, fund, insurance company, etc.)',
      confidence: 0.98,
    };
  }
  
  // Professional investor criteria (MiFID II)
  // 1. Professional experience in financial sector
  // 2. Total assets >= EUR 500,000
  // 3. Large transactions (>= EUR 50,000) in last 4 quarters
  
  const hasHighAssets = (questionnaire.totalAssets || 0) >= 500000;
  const hasHighFinancialAssets = (questionnaire.financialAssets || 0) >= 500000;
  const hasProfessionalExp = questionnaire.professionalExperience;
  
  if (hasHighAssets || hasHighFinancialAssets) {
    if (hasProfessionalExp) {
      return {
        type: 'QUALIFIED',
        reason: 'High net worth (>= EUR 500k) with professional financial experience',
        confidence: 0.92,
      };
    }
    return {
      type: 'PROFESSIONAL',
      reason: 'High net worth (>= EUR 500k) - elective professional client',
      confidence: 0.88,
    };
  }
  
  // Check minimum for professional (EUR 100k investment capacity)
  const hasMinProfessional = (questionnaire.totalAssets || 0) >= 100000 
    || (questionnaire.annualIncome || 0) >= 100000;
  
  if (hasMinProfessional && hasProfessionalExp) {
    return {
      type: 'PROFESSIONAL',
      reason: 'Meets minimum professional criteria with financial experience',
      confidence: 0.85,
    };
  }
  
  // Australia - wholesale investor
  if (countryCode === 'AU') {
    const meetsAustralianWholesale = (questionnaire.totalAssets || 0) >= 2500000 
      || (questionnaire.annualIncome || 0) >= 250000;
    
    if (meetsAustralianWholesale) {
      return {
        type: 'WHOLESALE',
        reason: 'Australian wholesale client (net assets >= AUD 2.5M or income >= AUD 250k)',
        confidence: 0.9,
      };
    }
  }
  
  // Singapore - accredited investor
  if (countryCode === 'SG') {
    const meetsSingaporeAccredited = (questionnaire.totalAssets || 0) >= 2000000 
      || (questionnaire.financialAssets || 0) >= 1000000;
    
    if (meetsSingaporeAccredited) {
      return {
        type: 'ACCREDITED',
        reason: 'Singapore accredited investor (net assets >= SGD 2M or financial assets >= SGD 1M)',
        confidence: 0.9,
      };
    }
  }
  
  // Canada - accredited investor
  if (countryCode === 'CA') {
    const meetsCanadianAccredited = (questionnaire.financialAssets || 0) >= 1000000 
      || (questionnaire.annualIncome || 0) >= 200000;
    
    if (meetsCanadianAccredited) {
      return {
        type: 'ACCREDITED',
        reason: 'Canadian accredited investor (financial assets >= CAD 1M or income >= CAD 200k)',
        confidence: 0.9,
      };
    }
  }
  
  // Default to retail
  return {
    type: 'RETAIL',
    reason: 'Does not meet professional/qualified/accredited investor criteria',
    confidence: 0.95,
  };
}

function calculateRiskScore(questionnaire: ClassifyInvestorRequest['questionnaire']): number {
  let score = 5; // Default moderate
  
  switch (questionnaire.riskTolerance) {
    case 'conservative':
      score = 3;
      break;
    case 'moderate':
      score = 5;
      break;
    case 'aggressive':
      score = 8;
      break;
  }
  
  // Adjust based on investment horizon
  if (questionnaire.investmentHorizon === 'long_term') {
    score = Math.min(10, score + 1);
  } else if (questionnaire.investmentHorizon === 'short_term') {
    score = Math.max(1, score - 1);
  }
  
  return score;
}

// =============================================
// ROUTES
// =============================================

export async function complianceRoutes(fastify: FastifyInstance) {
  
  // Health check
  fastify.get('/api/compliance/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return {
      status: 'ok',
      service: 'compliance-engine',
      jurisdictionsLoaded: Object.keys(JURISDICTION_RULES).length,
      timestamp: new Date().toISOString(),
    };
  });
  
  // =============================================
  // INVESTOR CLASSIFICATION
  // =============================================
  
  /**
   * Classify an investor based on questionnaire responses
   */
  fastify.post('/api/compliance/classify-investor', async (
    request: FastifyRequest<{ Body: ClassifyInvestorRequest }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId, email, countryCode, questionnaire } = request.body;
      
      // Classify investor type
      const classification = classifyInvestorType(questionnaire, countryCode);
      const riskScore = calculateRiskScore(questionnaire);
      
      // Check jurisdiction eligibility
      const investorProfile: InvestorProfile = {
        countryCode,
        investorType: classification.type,
        totalAssets: questionnaire.totalAssets,
        annualIncome: questionnaire.annualIncome,
        financialAssets: questionnaire.financialAssets,
        professionalStatus: questionnaire.professionalExperience,
        isUsPerson: questionnaire.isUsPerson,
      };
      
      const jurisdictionEligibility = checkJurisdictionEligibility(investorProfile, countryCode);
      
      // Create or update investor record
      const investor = await prisma.investor.upsert({
        where: { clerkUserId },
        create: {
          clerkUserId,
          email,
          countryCode,
          investorType: classification.type,
          classificationDate: new Date(),
          classifiedBy: 'AI_CLASSIFICATION',
          totalAssets: questionnaire.totalAssets,
          annualIncome: questionnaire.annualIncome,
          financialAssets: questionnaire.financialAssets,
          professionalStatus: questionnaire.professionalExperience || false,
          institutionalInvestor: questionnaire.institutionalInvestor || false,
          isUsPerson: questionnaire.isUsPerson || false,
          riskProfile: questionnaire.riskTolerance || 'moderate',
          riskScore,
          complianceStatus: 'PENDING_REVIEW',
        },
        update: {
          countryCode,
          investorType: classification.type,
          classificationDate: new Date(),
          classifiedBy: 'AI_CLASSIFICATION',
          totalAssets: questionnaire.totalAssets,
          annualIncome: questionnaire.annualIncome,
          financialAssets: questionnaire.financialAssets,
          professionalStatus: questionnaire.professionalExperience || false,
          institutionalInvestor: questionnaire.institutionalInvestor || false,
          isUsPerson: questionnaire.isUsPerson || false,
          riskProfile: questionnaire.riskTolerance || 'moderate',
          riskScore,
        },
      });
      
      // Create compliance check record
      await prisma.complianceCheck.create({
        data: {
          investorId: investor.id,
          checkType: 'CLASSIFICATION',
          status: 'passed',
          aiAnalysis: classification.reason,
          aiScore: classification.confidence,
          aiRecommendation: `Classified as ${classification.type} with ${(classification.confidence * 100).toFixed(0)}% confidence`,
          metadata: JSON.parse(JSON.stringify({
            questionnaire,
            jurisdictionEligibility,
          })),
        },
      });
      
      // Log audit trail
      await prisma.complianceAuditLog.create({
        data: {
          actorType: 'ai',
          actorId: 'compliance-engine',
          targetType: 'investor',
          targetId: investor.id,
          investorId: investor.id,
          action: 'classified',
          category: 'classification',
          newValue: {
            investorType: classification.type,
            riskScore,
            countryCode,
          },
          reason: classification.reason,
          aiModel: 'rule-based-classifier-v1',
          aiConfidence: classification.confidence,
        },
      });
      
      return reply.status(200).send({
        success: true,
        investor: {
          id: investor.id,
          investorType: classification.type,
          riskScore,
          complianceStatus: investor.complianceStatus,
        },
        classification: {
          type: classification.type,
          reason: classification.reason,
          confidence: classification.confidence,
        },
        jurisdictionEligibility,
      });
      
    } catch (error: any) {
      console.error('Classification error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * Get investor profile with compliance status
   */
  fastify.get('/api/compliance/investor/:clerkUserId', async (
    request: FastifyRequest<{ Params: { clerkUserId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId } = request.params;
      
      const investor = await prisma.investor.findUnique({
        where: { clerkUserId },
        include: {
          complianceChecks: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          jurisdictionEligibility: {
            include: {
              jurisdiction: true,
            },
          },
        },
      });
      
      if (!investor) {
        return reply.status(404).send({
          success: false,
          error: 'Investor not found',
        });
      }
      
      // Get jurisdiction eligibility
      const investorProfile: InvestorProfile = {
        countryCode: investor.countryCode,
        investorType: investor.investorType,
        totalAssets: investor.totalAssets ? Number(investor.totalAssets) : undefined,
        annualIncome: investor.annualIncome ? Number(investor.annualIncome) : undefined,
        financialAssets: investor.financialAssets ? Number(investor.financialAssets) : undefined,
        professionalStatus: investor.professionalStatus,
        isUsPerson: investor.isUsPerson,
      };
      
      const allJurisdictions = getEligibleJurisdictions(investorProfile);
      const eligibleCountries = Array.from(allJurisdictions.entries())
        .filter(([_, result]) => result.eligible)
        .map(([code, result]) => ({
          countryCode: code,
          countryName: JURISDICTION_RULES[code]?.countryName,
          eligibleAsType: result.investorTypeInJurisdiction,
          requiredDocuments: result.requiredDocuments,
        }));
      
      return reply.status(200).send({
        success: true,
        investor: {
          id: investor.id,
          email: investor.email,
          countryCode: investor.countryCode,
          investorType: investor.investorType,
          complianceStatus: investor.complianceStatus,
          kycStatus: investor.kycStatus,
          riskScore: investor.riskScore,
          riskProfile: investor.riskProfile,
          classificationDate: investor.classificationDate,
          lastReviewDate: investor.lastReviewDate,
        },
        complianceChecks: investor.complianceChecks,
        eligibleCountries,
        eligibleCountriesCount: eligibleCountries.length,
      });
      
    } catch (error: any) {
      console.error('Get investor error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // =============================================
  // DEAL ELIGIBILITY
  // =============================================
  
  /**
   * Check if an investor is eligible for a deal
   */
  fastify.post('/api/compliance/check-eligibility', async (
    request: FastifyRequest<{ Body: CheckEligibilityRequest }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId, dealId } = request.body;
      
      const investor = await prisma.investor.findUnique({
        where: { id: investorId },
      });
      
      const deal = await prisma.deal.findUnique({
        where: { id: dealId },
        include: {
          jurisdictions: true,
        },
      });
      
      if (!investor || !deal) {
        return reply.status(404).send({
          success: false,
          error: 'Investor or deal not found',
        });
      }
      
      const eligibilityReasons: string[] = [];
      let eligible = true;
      
      // 1. Check investor type vs compartment
      if (deal.compartmentType === 'PROFESSIONAL') {
        if (investor.investorType === 'RETAIL') {
          eligible = false;
          eligibilityReasons.push('Retail investors cannot invest in Professional compartment deals');
        }
      }
      
      // 2. Check KYC status
      if (investor.kycStatus !== 'approved') {
        eligible = false;
        eligibilityReasons.push('KYC verification required');
      }
      
      // 3. Check compliance status
      if (investor.complianceStatus !== 'APPROVED') {
        eligible = false;
        eligibilityReasons.push('Compliance approval required');
      }
      
      // 4. Check jurisdiction eligibility
      const investorProfile: InvestorProfile = {
        countryCode: investor.countryCode,
        investorType: investor.investorType,
        totalAssets: investor.totalAssets ? Number(investor.totalAssets) : undefined,
        annualIncome: investor.annualIncome ? Number(investor.annualIncome) : undefined,
      };
      
      const jurisdictionResult = checkJurisdictionEligibility(investorProfile, investor.countryCode);
      if (!jurisdictionResult.eligible) {
        eligible = false;
        eligibilityReasons.push(`Jurisdiction restriction: ${jurisdictionResult.reason}`);
      }
      
      // 5. Check minimum investment
      // (This would be checked at investment time, not eligibility)
      
      // 6. Check deal is available in investor's jurisdiction
      const dealJurisdiction = deal.jurisdictions.find(
        dj => dj.jurisdictionId === investor.countryCode
      );
      if (dealJurisdiction && !dealJurisdiction.marketingAllowed) {
        eligible = false;
        eligibilityReasons.push('Deal not available in your jurisdiction');
      }
      
      // Save eligibility result
      await prisma.dealEligibility.upsert({
        where: {
          investorId_dealId: { investorId, dealId },
        },
        create: {
          investorId,
          dealId,
          eligible,
          reason: eligibilityReasons.join('; ') || 'Eligible',
          eligibilityType: 'comprehensive_check',
          checkedBy: 'AI_ELIGIBILITY_ENGINE',
          aiConfidence: 0.95,
        },
        update: {
          eligible,
          reason: eligibilityReasons.join('; ') || 'Eligible',
          checkedAt: new Date(),
          aiConfidence: 0.95,
        },
      });
      
      return reply.status(200).send({
        success: true,
        eligible,
        reasons: eligibilityReasons,
        investorType: investor.investorType,
        dealCompartment: deal.compartmentType,
        jurisdictionCheck: jurisdictionResult,
      });
      
    } catch (error: any) {
      console.error('Eligibility check error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * Get all eligible deals for an investor
   */
  fastify.get('/api/compliance/investor/:investorId/eligible-deals', async (
    request: FastifyRequest<{ Params: { investorId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId } = request.params;
      
      const investor = await prisma.investor.findUnique({
        where: { id: investorId },
      });
      
      if (!investor) {
        return reply.status(404).send({
          success: false,
          error: 'Investor not found',
        });
      }
      
      // Get all active deals
      const deals = await prisma.deal.findMany({
        where: {
          status: 'active',
        },
      });
      
      // Check eligibility for each
      const eligibleDeals = [];
      const ineligibleDeals = [];
      
      for (const deal of deals) {
        let eligible = true;
        const reasons: string[] = [];
        
        // Check compartment
        if (deal.compartmentType === 'PROFESSIONAL' && investor.investorType === 'RETAIL') {
          eligible = false;
          reasons.push('Professional investors only');
        }
        
        // Check jurisdiction
        const investorProfile: InvestorProfile = {
          countryCode: investor.countryCode,
          investorType: investor.investorType,
        };
        const jurisdictionResult = checkJurisdictionEligibility(investorProfile, investor.countryCode);
        
        if (!jurisdictionResult.eligible) {
          eligible = false;
          reasons.push(jurisdictionResult.reason);
        }
        
        if (eligible) {
          eligibleDeals.push({
            ...deal,
            requiredDocuments: jurisdictionResult.requiredDocuments,
            investmentLimits: jurisdictionResult.investmentLimits,
          });
        } else {
          ineligibleDeals.push({
            id: deal.id,
            name: deal.name,
            reasons,
          });
        }
      }
      
      return reply.status(200).send({
        success: true,
        eligibleDeals,
        ineligibleDeals,
        totalDeals: deals.length,
        eligibleCount: eligibleDeals.length,
      });
      
    } catch (error: any) {
      console.error('Get eligible deals error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // =============================================
  // JURISDICTION MANAGEMENT
  // =============================================
  
  /**
   * Get all jurisdictions
   */
  fastify.get('/api/compliance/jurisdictions', async (
    request: FastifyRequest<{ Querystring: { region?: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { region } = request.query;
      
      let jurisdictions;
      if (region) {
        jurisdictions = getJurisdictionsByRegion(region as JurisdictionRegion);
      } else {
        jurisdictions = getAllJurisdictions();
      }
      
      // Group by region for easier UI rendering
      const grouped = {
        EU: jurisdictions.filter(j => j.region === 'EU'),
        EEA: jurisdictions.filter(j => j.region === 'EEA'),
        EU_EQUIVALENT: jurisdictions.filter(j => j.region === 'EU_EQUIVALENT'),
        THIRD_COUNTRY_FRIENDLY: jurisdictions.filter(j => j.region === 'THIRD_COUNTRY_FRIENDLY'),
        THIRD_COUNTRY_RESTRICTED: jurisdictions.filter(j => j.region === 'THIRD_COUNTRY_RESTRICTED'),
      };
      
      return reply.status(200).send({
        success: true,
        jurisdictions,
        grouped,
        total: jurisdictions.length,
      });
      
    } catch (error: any) {
      console.error('Get jurisdictions error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * Get jurisdiction details
   */
  fastify.get('/api/compliance/jurisdictions/:countryCode', async (
    request: FastifyRequest<{ Params: { countryCode: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { countryCode } = request.params;
      
      const rule = JURISDICTION_RULES[countryCode.toUpperCase()];
      
      if (!rule) {
        return reply.status(404).send({
          success: false,
          error: 'Jurisdiction not found',
        });
      }
      
      // Get database record if exists
      const dbRecord = await prisma.jurisdiction.findUnique({
        where: { countryCode: countryCode.toUpperCase() },
        include: {
          subJurisdictions: true,
        },
      });
      
      return reply.status(200).send({
        success: true,
        jurisdiction: {
          ...rule,
          dbRecord,
        },
      });
      
    } catch (error: any) {
      console.error('Get jurisdiction error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * Check if a deal can be marketed in a jurisdiction
   */
  fastify.post('/api/compliance/check-marketing', async (
    request: FastifyRequest<{ Body: { countryCode: string; compartmentType: 'PROFESSIONAL' | 'RETAIL' } }>,
    reply: FastifyReply
  ) => {
    try {
      const { countryCode, compartmentType } = request.body;
      
      const result = canMarketInJurisdiction(countryCode, compartmentType);
      
      return reply.status(200).send({
        success: true,
        ...result,
        countryCode,
        compartmentType,
      });
      
    } catch (error: any) {
      console.error('Check marketing error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // =============================================
  // SUITABILITY ASSESSMENT
  // =============================================
  
  /**
   * Run suitability assessment for investor-deal pair
   */
  fastify.post('/api/compliance/suitability-assessment', async (
    request: FastifyRequest<{ Body: SuitabilityRequest }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId, dealId } = request.body;
      
      const investor = await prisma.investor.findUnique({
        where: { id: investorId },
      });
      
      const deal = await prisma.deal.findUnique({
        where: { id: dealId },
      });
      
      if (!investor || !deal) {
        return reply.status(404).send({
          success: false,
          error: 'Investor or deal not found',
        });
      }
      
      // Suitability assessment logic
      const warnings: string[] = [];
      const recommendations: string[] = [];
      let suitabilityScore = 100;
      
      // 1. Risk alignment check
      const investorRiskScore = investor.riskScore || 5;
      const dealRiskLevel = deal.riskLevel || 5;
      
      if (dealRiskLevel > investorRiskScore + 2) {
        warnings.push('Deal risk level significantly exceeds investor risk tolerance');
        suitabilityScore -= 30;
      } else if (dealRiskLevel > investorRiskScore) {
        warnings.push('Deal risk level slightly exceeds investor risk tolerance');
        suitabilityScore -= 10;
      }
      
      // 2. Capital at risk warning
      if (deal.capitalAtRisk) {
        if (investor.riskProfile === 'conservative') {
          warnings.push('Capital is at risk - may not be suitable for conservative investors');
          suitabilityScore -= 20;
        }
        recommendations.push('Ensure investor understands capital loss risk');
      }
      
      // 3. Liquidity check
      if (deal.liquidityRisk === 'high') {
        warnings.push('High liquidity risk - investment may be difficult to exit');
        suitabilityScore -= 15;
      }
      
      // 4. Investment size vs portfolio
      const investorAssets = Number(investor.totalAssets) || 0;
      const minInvestment = Number(deal.minimumInvestment);
      
      if (investorAssets > 0 && minInvestment / investorAssets > 0.1) {
        warnings.push('Minimum investment represents >10% of investor total assets');
        suitabilityScore -= 15;
        recommendations.push('Consider diversification impact');
      }
      
      const suitable = suitabilityScore >= 60;
      const status = suitabilityScore >= 80 ? 'passed' : suitabilityScore >= 60 ? 'passed_with_warnings' : 'failed';
      
      // Save compliance check
      await prisma.complianceCheck.create({
        data: {
          investorId,
          checkType: 'SUITABILITY',
          status,
          aiAnalysis: `Suitability score: ${suitabilityScore}/100`,
          aiScore: suitabilityScore / 100,
          aiRecommendation: recommendations.join('; '),
          metadata: JSON.parse(JSON.stringify({
            dealId,
            warnings,
            recommendations,
          })),
        },
      });
      
      // Audit log
      await prisma.complianceAuditLog.create({
        data: {
          actorType: 'ai',
          actorId: 'suitability-engine',
          targetType: 'suitability_assessment',
          targetId: `${investorId}-${dealId}`,
          investorId,
          action: 'assessed',
          category: 'suitability',
          newValue: {
            suitabilityScore,
            suitable,
            warnings,
          },
          aiModel: 'suitability-v1',
          aiConfidence: 0.9,
        },
      });
      
      return reply.status(200).send({
        success: true,
        suitable,
        suitabilityScore,
        status,
        warnings,
        recommendations,
        investorRiskProfile: investor.riskProfile,
        investorRiskScore: investor.riskScore,
        dealRiskLevel: deal.riskLevel,
      });
      
    } catch (error: any) {
      console.error('Suitability assessment error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // =============================================
  // AUDIT LOG
  // =============================================
  
  /**
   * Get compliance audit log
   */
  fastify.get('/api/compliance/audit-log', async (
    request: FastifyRequest<{ 
      Querystring: { 
        investorId?: string;
        category?: string;
        action?: string;
        limit?: number;
        offset?: number;
      } 
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId, category, action, limit = 50, offset = 0 } = request.query;
      
      const where: any = {};
      if (investorId) where.investorId = investorId;
      if (category) where.category = category;
      if (action) where.action = action;
      
      const [logs, total] = await Promise.all([
        prisma.complianceAuditLog.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: Number(limit),
          skip: Number(offset),
          include: {
            investor: {
              select: {
                email: true,
                investorType: true,
              },
            },
          },
        }),
        prisma.complianceAuditLog.count({ where }),
      ]);
      
      return reply.status(200).send({
        success: true,
        logs,
        pagination: {
          total,
          limit: Number(limit),
          offset: Number(offset),
          hasMore: Number(offset) + logs.length < total,
        },
      });
      
    } catch (error: any) {
      console.error('Get audit log error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // =============================================
  // ADMIN: INVESTOR MANAGEMENT
  // =============================================
  
  /**
   * List all investors with compliance status
   */
  fastify.get('/api/compliance/admin/investors', async (
    request: FastifyRequest<{ 
      Querystring: { 
        status?: string;
        investorType?: string;
        countryCode?: string;
        limit?: number;
        offset?: number;
      } 
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { status, investorType, countryCode, limit = 50, offset = 0 } = request.query;
      
      const where: any = {};
      if (status) where.complianceStatus = status;
      if (investorType) where.investorType = investorType;
      if (countryCode) where.countryCode = countryCode;
      
      const [investors, total] = await Promise.all([
        prisma.investor.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: Number(limit),
          skip: Number(offset),
          include: {
            complianceChecks: {
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
          },
        }),
        prisma.investor.count({ where }),
      ]);
      
      // Get counts by status
      const statusCounts = await prisma.investor.groupBy({
        by: ['complianceStatus'],
        _count: true,
      });
      
      return reply.status(200).send({
        success: true,
        investors,
        statusCounts: Object.fromEntries(
          statusCounts.map(s => [s.complianceStatus, s._count])
        ),
        pagination: {
          total,
          limit: Number(limit),
          offset: Number(offset),
        },
      });
      
    } catch (error: any) {
      console.error('List investors error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * Update investor compliance status
   */
  fastify.put('/api/compliance/admin/investors/:investorId/status', async (
    request: FastifyRequest<{ 
      Params: { investorId: string };
      Body: { 
        status: ComplianceStatus;
        notes?: string;
        reviewedBy: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId } = request.params;
      const { status, notes, reviewedBy } = request.body;
      
      const investor = await prisma.investor.findUnique({
        where: { id: investorId },
      });
      
      if (!investor) {
        return reply.status(404).send({
          success: false,
          error: 'Investor not found',
        });
      }
      
      const previousStatus = investor.complianceStatus;
      
      // Update investor
      const updated = await prisma.investor.update({
        where: { id: investorId },
        data: {
          complianceStatus: status,
          complianceNotes: notes,
          lastReviewDate: new Date(),
          lastReviewedBy: reviewedBy,
        },
      });
      
      // Create compliance check
      await prisma.complianceCheck.create({
        data: {
          investorId,
          checkType: 'ADMIN_REVIEW',
          status: status === 'APPROVED' ? 'passed' : status === 'REJECTED' ? 'failed' : 'pending',
          adminReview: notes,
          reviewedBy,
          reviewedAt: new Date(),
        },
      });
      
      // Audit log
      await prisma.complianceAuditLog.create({
        data: {
          actorType: 'admin',
          actorId: reviewedBy,
          targetType: 'investor',
          targetId: investorId,
          investorId,
          action: 'status_updated',
          category: 'compliance',
          previousValue: { status: previousStatus },
          newValue: { status },
          reason: notes,
        },
      });
      
      return reply.status(200).send({
        success: true,
        investor: updated,
      });
      
    } catch (error: any) {
      console.error('Update investor status error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * Reclassify investor type
   */
  fastify.put('/api/compliance/admin/investors/:investorId/reclassify', async (
    request: FastifyRequest<{ 
      Params: { investorId: string };
      Body: { 
        investorType: InvestorType;
        reason: string;
        classifiedBy: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId } = request.params;
      const { investorType, reason, classifiedBy } = request.body;
      
      const investor = await prisma.investor.findUnique({
        where: { id: investorId },
      });
      
      if (!investor) {
        return reply.status(404).send({
          success: false,
          error: 'Investor not found',
        });
      }
      
      const previousType = investor.investorType;
      
      // Update investor
      const updated = await prisma.investor.update({
        where: { id: investorId },
        data: {
          investorType,
          classificationDate: new Date(),
          classifiedBy,
        },
      });
      
      // Create compliance check
      await prisma.complianceCheck.create({
        data: {
          investorId,
          checkType: 'RECLASSIFICATION',
          status: 'passed',
          adminReview: reason,
          reviewedBy: classifiedBy,
          reviewedAt: new Date(),
          metadata: JSON.parse(JSON.stringify({
            previousType,
            newType: investorType,
          })),
        },
      });
      
      // Audit log
      await prisma.complianceAuditLog.create({
        data: {
          actorType: 'admin',
          actorId: classifiedBy,
          targetType: 'investor',
          targetId: investorId,
          investorId,
          action: 'reclassified',
          category: 'classification',
          previousValue: { investorType: previousType },
          newValue: { investorType },
          reason,
        },
      });
      
      return reply.status(200).send({
        success: true,
        investor: updated,
        previousType,
      });
      
    } catch (error: any) {
      console.error('Reclassify investor error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // =============================================
  // SEED JURISDICTIONS
  // =============================================
  
  /**
   * Seed jurisdiction database from rules
   */
  fastify.post('/api/compliance/admin/seed-jurisdictions', async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const jurisdictions = getAllJurisdictions();
      let created = 0;
      let updated = 0;
      
      for (const rule of jurisdictions) {
        const existing = await prisma.jurisdiction.findUnique({
          where: { countryCode: rule.countryCode },
        });
        
        const data = {
          countryCode: rule.countryCode,
          countryName: rule.countryName,
          region: rule.region,
          retailAllowed: rule.retailAllowed,
          professionalAllowed: rule.professionalAllowed,
          qualifiedAllowed: rule.qualifiedAllowed,
          accreditedAllowed: rule.accreditedAllowed,
          wholesaleAllowed: rule.wholesaleAllowed,
          minInvestmentRetail: rule.minInvestmentRetail,
          minInvestmentPro: rule.minInvestmentPro,
          maxInvestmentRetail: rule.maxInvestmentRetail,
          requiresProspectus: rule.requiresProspectus,
          requiresLocalKID: rule.requiresLocalKID,
          requiresLocalLanguage: rule.requiresLocalLanguage,
          localLanguage: rule.localLanguage,
          regulatorName: rule.regulatorName,
          regulatorNotification: rule.regulatorNotification,
          passportingAllowed: rule.passportingAllowed,
          coldCallingAllowed: rule.coldCallingAllowed,
          advertisingAllowed: rule.advertisingAllowed,
          riskWarningsRequired: rule.riskWarningsRequired,
          coolingOffPeriod: rule.coolingOffPeriod,
          specialRequirements: rule.specialRequirements,
          blockedReasons: rule.blockedReasons,
          hasSubJurisdictions: rule.hasSubJurisdictions,
        };
        
        if (existing) {
          await prisma.jurisdiction.update({
            where: { countryCode: rule.countryCode },
            data,
          });
          updated++;
        } else {
          await prisma.jurisdiction.create({ data });
          created++;
        }
        
        // Create sub-jurisdictions if any
        if (rule.hasSubJurisdictions && rule.subJurisdictions) {
          const jurisdiction = await prisma.jurisdiction.findUnique({
            where: { countryCode: rule.countryCode },
          });
          
          if (jurisdiction) {
            for (const subCode of rule.subJurisdictions) {
              await prisma.subJurisdiction.upsert({
                where: {
                  jurisdictionId_code: {
                    jurisdictionId: jurisdiction.id,
                    code: subCode,
                  },
                },
                create: {
                  jurisdictionId: jurisdiction.id,
                  code: subCode,
                  name: subCode, // Can be updated with proper names
                },
                update: {},
              });
            }
          }
        }
      }
      
      return reply.status(200).send({
        success: true,
        message: `Seeded ${created} new, updated ${updated} existing jurisdictions`,
        total: jurisdictions.length,
      });
      
    } catch (error: any) {
      console.error('Seed jurisdictions error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // =============================================
  // AI COMPLIANCE OFFICER
  // =============================================
  
  /**
   * Check AI service status
   */
  fastify.get('/api/compliance/ai/status', async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const modelInfo = complianceAI.getModelInfo();
    const provider = complianceAI.getActiveProvider();
    
    return reply.status(200).send({
      success: true,
      available: complianceAI.isAvailable(),
      provider: provider,
      model: modelInfo,
      message: complianceAI.isAvailable()
        ? `AI Compliance Officer online - ${modelInfo?.provider} (${modelInfo?.model})`
        : 'AI service not configured - using rule-based fallbacks',
    });
  });
  
  /**
   * Chat with AI Compliance Officer
   */
  fastify.post('/api/compliance/ai/chat', async (
    request: FastifyRequest<{ 
      Body: { 
        messages: ChatMessage[];
        context?: {
          investorId?: string;
          dealId?: string;
          jurisdictionCode?: string;
        };
      } 
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { messages, context } = request.body;
      
      if (!messages || messages.length === 0) {
        return reply.status(400).send({
          success: false,
          error: 'Messages array is required',
        });
      }
      
      // Build context data if IDs provided
      let contextData: any = {};
      
      if (context?.investorId) {
        const investor = await prisma.investor.findUnique({
          where: { id: context.investorId },
          select: {
            email: true,
            countryCode: true,
            investorType: true,
            complianceStatus: true,
            kycStatus: true,
            riskProfile: true,
            totalAssets: true,
          },
        });
        if (investor) {
          contextData.investorData = investor;
        }
      }
      
      if (context?.dealId) {
        const deal = await prisma.deal.findUnique({
          where: { id: context.dealId },
          select: {
            name: true,
            compartmentType: true,
            assetClass: true,
            riskLevel: true,
            minimumInvestment: true,
          },
        });
        if (deal) {
          contextData.dealData = deal;
        }
      }
      
      if (context?.jurisdictionCode) {
        contextData.jurisdictionCode = context.jurisdictionCode;
      }
      
      const response = await complianceAI.chat_with_officer(messages, contextData);
      
      // Log the interaction (non-blocking, don't fail if table doesn't exist)
      try {
        await prisma.complianceAuditLog.create({
          data: {
            actorType: 'ai',
            actorId: 'compliance-ai-officer',
            targetType: 'ai_chat',
            targetId: 'chat_session',
            action: 'chat_response',
            category: 'ai_assistant',
            newValue: JSON.parse(JSON.stringify({
              messageCount: messages.length,
              hasContext: Object.keys(contextData).length > 0,
            })),
            aiModel: complianceAI.getActiveProvider() || 'unknown',
          },
        });
      } catch (auditError) {
        console.warn('Audit log failed (table may not exist):', auditError);
      }
      
      return reply.status(200).send({
        success: true,
        response,
        aiAvailable: complianceAI.isAvailable(),
        model: complianceAI.getModelInfo(),
      });
      
    } catch (error: any) {
      console.error('AI chat error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * AI-powered investor classification
   */
  fastify.post('/api/compliance/ai/classify', async (
    request: FastifyRequest<{ Body: { questionnaire: InvestorQuestionnaire } }>,
    reply: FastifyReply
  ) => {
    try {
      const { questionnaire } = request.body;
      
      if (!questionnaire || !questionnaire.countryCode) {
        return reply.status(400).send({
          success: false,
          error: 'Questionnaire with countryCode is required',
        });
      }
      
      const classification = await complianceAI.classifyInvestor(questionnaire);
      
      return reply.status(200).send({
        success: true,
        classification,
        aiAvailable: complianceAI.isAvailable(),
      });
      
    } catch (error: any) {
      console.error('AI classification error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * AI-powered suitability assessment
   */
  fastify.post('/api/compliance/ai/suitability', async (
    request: FastifyRequest<{ 
      Body: { 
        investorId: string;
        dealId: string;
      } 
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId, dealId } = request.body;
      
      const investor = await prisma.investor.findUnique({
        where: { id: investorId },
      });
      
      const deal = await prisma.deal.findUnique({
        where: { id: dealId },
      });
      
      if (!investor || !deal) {
        return reply.status(404).send({
          success: false,
          error: 'Investor or deal not found',
        });
      }
      
      const result = await complianceAI.assessSuitability(
        {
          investorType: investor.investorType,
          riskProfile: investor.riskProfile || undefined,
          riskScore: investor.riskScore || undefined,
          totalAssets: investor.totalAssets ? Number(investor.totalAssets) : undefined,
        },
        {
          name: deal.name,
          compartmentType: deal.compartmentType,
          riskLevel: deal.riskLevel,
          minimumInvestment: Number(deal.minimumInvestment),
          assetClass: deal.assetClass,
          liquidityRisk: deal.liquidityRisk || undefined,
          capitalAtRisk: deal.capitalAtRisk,
        }
      );
      
      // Log the assessment
      await prisma.complianceCheck.create({
        data: {
          investorId,
          checkType: 'AI_SUITABILITY',
          status: result.suitable ? 'passed' : 'failed',
          aiAnalysis: result.reasoning,
          aiScore: result.score / 100,
          aiRecommendation: result.recommendations.join('; '),
          metadata: JSON.parse(JSON.stringify({
            dealId,
            warnings: result.warnings,
            requiredDisclosures: result.requiredDisclosures,
          })),
        },
      });
      
      return reply.status(200).send({
        success: true,
        result,
        aiAvailable: complianceAI.isAvailable(),
      });
      
    } catch (error: any) {
      console.error('AI suitability error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  /**
   * AI-powered compliance case review
   */
  fastify.post('/api/compliance/ai/review-case', async (
    request: FastifyRequest<{ Body: { investorId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId } = request.body;
      
      const investor = await prisma.investor.findUnique({
        where: { id: investorId },
      });
      
      if (!investor) {
        return reply.status(404).send({
          success: false,
          error: 'Investor not found',
        });
      }
      
      const caseData: ComplianceCase = {
        investorId: investor.id,
        investorEmail: investor.email,
        investorType: investor.investorType,
        countryCode: investor.countryCode,
        kycStatus: investor.kycStatus || undefined,
        totalAssets: investor.totalAssets ? Number(investor.totalAssets) : undefined,
        annualIncome: investor.annualIncome ? Number(investor.annualIncome) : undefined,
        complianceStatus: investor.complianceStatus,
        complianceNotes: investor.complianceNotes || undefined,
        isPep: investor.isPep,
        isSanctioned: investor.isSanctioned,
      };
      
      const review = await complianceAI.reviewComplianceCase(caseData);
      
      // Log the review
      await prisma.complianceCheck.create({
        data: {
          investorId,
          checkType: 'AI_CASE_REVIEW',
          status: review.decision === 'approve' ? 'passed' : 
                  review.decision === 'reject' ? 'failed' : 'pending',
          aiAnalysis: review.reasoning,
          aiScore: review.confidence,
          aiRecommendation: review.recommendations.join('; '),
          metadata: JSON.parse(JSON.stringify({
            decision: review.decision,
            riskFactors: review.riskFactors,
            mitigatingFactors: review.mitigatingFactors,
            requiredActions: review.requiredActions,
          })),
        },
      });
      
      // Audit log (non-blocking)
      try {
        await prisma.complianceAuditLog.create({
          data: {
            actorType: 'ai',
            actorId: 'compliance-ai-officer',
            targetType: 'investor',
            targetId: investorId,
            investorId,
            action: 'case_reviewed',
            category: 'ai_review',
            newValue: JSON.parse(JSON.stringify({
              decision: review.decision,
              confidence: review.confidence,
            })),
            aiModel: complianceAI.getActiveProvider() || 'unknown',
            aiConfidence: review.confidence,
          },
        });
      } catch (auditError) {
        console.warn('Audit log failed:', auditError);
      }
      
      return reply.status(200).send({
        success: true,
        review,
        aiAvailable: complianceAI.isAvailable(),
      });
      
    } catch (error: any) {
      console.error('AI case review error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
