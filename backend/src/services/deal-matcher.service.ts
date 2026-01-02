/**
 * Deal Matcher Service
 * 
 * Matches investors with eligible deals based on:
 * - Investor classification (Retail, Professional, Qualified, etc.)
 * - Luxembourg securitisation law requirements
 * - Geographic/jurisdiction restrictions
 * - Compartment type (Professional vs Retail)
 * - Investment limits and thresholds
 */

import { prisma } from '../db/prisma.js';
import { JURISDICTION_RULES, checkJurisdictionEligibility, InvestorProfile } from './jurisdiction.service.js';
import { InvestorType, CompartmentType, ComplianceStatus, DealStatus } from '@prisma/client';

// =============================================
// TYPES
// =============================================

export interface MatchedDeal {
  dealId: string;
  dealName: string;
  compartmentType: CompartmentType;
  assetClass: string;
  eligible: boolean;
  eligibilityScore: number; // 0-100
  reasons: string[];
  restrictions: string[];
  requiredActions: string[];
  investmentLimits?: {
    minimum: number;
    maximum?: number;
    currency: string;
  };
  riskWarnings: string[];
}

export interface MatchingResult {
  investorId: string;
  investorType: InvestorType;
  countryCode: string;
  kycApproved: boolean;
  complianceApproved: boolean;
  eligibleDeals: MatchedDeal[];
  ineligibleDeals: MatchedDeal[];
  summary: {
    totalDeals: number;
    eligibleCount: number;
    ineligibleCount: number;
    topRestrictions: string[];
  };
}

export interface DealEligibilityCriteria {
  compartmentType: CompartmentType;
  minimumInvestment: number;
  allowedInvestorTypes: InvestorType[];
  allowedCountries?: string[];
  blockedCountries?: string[];
  requiresKyc: boolean;
  requiresCompliance: boolean;
  requiresSuitability: boolean;
  riskLevel: number; // 1-10
  capitalAtRisk: boolean;
}

// =============================================
// LUXEMBOURG SECURITISATION LAW RULES
// =============================================

/**
 * Luxembourg Law of 22 March 2004 on Securitisation
 * Key rules for investor eligibility
 */
const LUXEMBOURG_SECURITISATION_RULES = {
  // Professional Compartment (Article 6)
  professional: {
    minInvestment: 100000, // EUR 100,000 minimum
    allowedTypes: ['PROFESSIONAL', 'QUALIFIED', 'ACCREDITED', 'WHOLESALE', 'QII'] as InvestorType[],
    requiresProspectus: false, // PPM only
    requiresPriips: false,
    requiresCssfApproval: false,
  },
  
  // Retail Compartment (Article 7)
  retail: {
    minInvestment: 0, // No minimum (can be €50)
    allowedTypes: ['RETAIL', 'PROFESSIONAL', 'QUALIFIED', 'ACCREDITED', 'WHOLESALE', 'QII'] as InvestorType[],
    requiresProspectus: true, // Full EU Prospectus required
    requiresPriips: true, // PRIIPS KID required
    requiresCssfApproval: true, // CSSF must approve
  },
};

// =============================================
// MATCHING FUNCTIONS
// =============================================

/**
 * Check if an investor type can invest in a compartment type
 */
function canInvestInCompartment(
  investorType: InvestorType,
  compartmentType: CompartmentType
): { allowed: boolean; reason: string } {
  const rules = compartmentType === 'PROFESSIONAL' 
    ? LUXEMBOURG_SECURITISATION_RULES.professional 
    : LUXEMBOURG_SECURITISATION_RULES.retail;

  const allowed = rules.allowedTypes.includes(investorType);
  
  if (!allowed && compartmentType === 'PROFESSIONAL') {
    return {
      allowed: false,
      reason: `${investorType} investors cannot access Professional compartment deals. Minimum qualification: Professional investor with EUR 100,000 investment capacity.`,
    };
  }

  return {
    allowed: true,
    reason: `${investorType} investors are eligible for ${compartmentType} compartment.`,
  };
}

/**
 * Check investment amount against compartment minimums
 */
function checkInvestmentMinimum(
  compartmentType: CompartmentType,
  dealMinimum: number
): { minimum: number; currency: string } {
  const compartmentMin = compartmentType === 'PROFESSIONAL'
    ? LUXEMBOURG_SECURITISATION_RULES.professional.minInvestment
    : LUXEMBOURG_SECURITISATION_RULES.retail.minInvestment;

  return {
    minimum: Math.max(compartmentMin, dealMinimum),
    currency: 'EUR',
  };
}

/**
 * Get required documentation based on compartment and jurisdiction
 */
function getRequiredDocumentation(
  compartmentType: CompartmentType,
  countryCode: string,
  investorType: InvestorType
): string[] {
  const docs: string[] = [];
  const rules = compartmentType === 'PROFESSIONAL' 
    ? LUXEMBOURG_SECURITISATION_RULES.professional 
    : LUXEMBOURG_SECURITISATION_RULES.retail;

  // Base documentation
  docs.push('SUBSCRIPTION_AGREEMENT');
  docs.push('INVESTOR_DECLARATION');

  if (rules.requiresProspectus) {
    docs.push('EU_PROSPECTUS');
  } else {
    docs.push('PRIVATE_PLACEMENT_MEMORANDUM');
  }

  if (rules.requiresPriips) {
    docs.push('PRIIPS_KID');
  }

  // Professional investor specific
  if (investorType === 'PROFESSIONAL' || investorType === 'QUALIFIED') {
    docs.push('ELECTIVE_PROFESSIONAL_DECLARATION');
  }

  // Jurisdiction specific
  const jurisdictionRule = JURISDICTION_RULES[countryCode];
  if (jurisdictionRule?.requiredDocuments) {
    // Handle different investor type documents
    const investorTypeLower = investorType.toLowerCase() as 'retail' | 'professional' | 'accredited' | 'wholesale' | 'qii';
    const typeSpecificDocs = jurisdictionRule.requiredDocuments[investorTypeLower];
    if (typeSpecificDocs && Array.isArray(typeSpecificDocs)) {
      docs.push(...typeSpecificDocs);
    }
  }

  // US-specific
  if (countryCode === 'US') {
    docs.push('ACCREDITED_INVESTOR_CERTIFICATION');
    docs.push('W8_BEN_FORM');
  }

  return [...new Set(docs)]; // Remove duplicates
}

/**
 * Calculate risk alignment score between investor and deal
 */
function calculateRiskAlignment(
  investorRiskScore: number | null,
  investorRiskProfile: string | null,
  dealRiskLevel: number
): { score: number; warning: string | null } {
  // Default risk score based on profile
  let riskScore = investorRiskScore || 5;
  
  if (!investorRiskScore && investorRiskProfile) {
    switch (investorRiskProfile) {
      case 'conservative': riskScore = 3; break;
      case 'moderate': riskScore = 5; break;
      case 'aggressive': riskScore = 8; break;
    }
  }

  const difference = dealRiskLevel - riskScore;
  
  if (difference > 3) {
    return {
      score: 30,
      warning: `Deal risk level (${dealRiskLevel}/10) significantly exceeds your risk tolerance (${riskScore}/10). Careful consideration advised.`,
    };
  } else if (difference > 1) {
    return {
      score: 60,
      warning: `Deal risk level (${dealRiskLevel}/10) moderately exceeds your risk tolerance (${riskScore}/10).`,
    };
  } else if (difference > 0) {
    return {
      score: 80,
      warning: null,
    };
  }

  return {
    score: 100,
    warning: null,
  };
}

/**
 * Main matching function - match a single investor with a single deal
 */
export async function matchInvestorToDeal(
  investorId: string,
  dealId: string
): Promise<MatchedDeal> {
  // Fetch user (investor)
  const user = await prisma.user.findUnique({
    where: { id: investorId },
  });

  if (!user) {
    throw new Error(`User not found: ${investorId}`);
  }

  // Fetch deal
  const deal = await prisma.deal.findUnique({
    where: { id: dealId },
  });

  if (!deal) {
    throw new Error(`Deal not found: ${dealId}`);
  }

  const reasons: string[] = [];
  const restrictions: string[] = [];
  const requiredActions: string[] = [];
  const riskWarnings: string[] = [];
  let eligible = true;
  let eligibilityScore = 100;

  // 1. Check compartment eligibility
  const compartmentCheck = canInvestInCompartment(user.investorType, deal.compartmentType);
  if (!compartmentCheck.allowed) {
    eligible = false;
    eligibilityScore = 0;
    reasons.push(compartmentCheck.reason);
  } else {
    reasons.push(compartmentCheck.reason);
  }

  // 2. Check jurisdiction eligibility
  const investorProfile: InvestorProfile = {
    countryCode: user.country || 'XX',
    investorType: user.investorType,
    isUsPerson: user.isUsPerson,
    totalAssets: user.totalAssets ? Number(user.totalAssets) : undefined,
  };

  const jurisdictionResult = checkJurisdictionEligibility(investorProfile, user.country || 'XX');
  
  if (!jurisdictionResult.eligible) {
    eligible = false;
    eligibilityScore = Math.min(eligibilityScore, 20);
    reasons.push(`Jurisdiction restriction: ${jurisdictionResult.reason}`);
  }

  if (jurisdictionResult.restrictions.length > 0) {
    restrictions.push(...jurisdictionResult.restrictions);
  }

  // 3. Check KYC status - always required for investment
  if (user.kycStatus !== 'APPROVED') {
    eligible = false;
    eligibilityScore = Math.min(eligibilityScore, 30);
    reasons.push('KYC verification required but not completed');
    requiredActions.push('Complete KYC verification');
  }

  // 4. Check compliance status - required for all active deals
  if (user.complianceStatus !== 'APPROVED') {
    if (user.complianceStatus === 'PENDING_REVIEW') {
      restrictions.push('Awaiting compliance review approval');
      requiredActions.push('Wait for compliance team review');
    } else if (user.complianceStatus === 'REJECTED') {
      eligible = false;
      eligibilityScore = 0;
      reasons.push('Compliance status: Rejected');
    } else {
      requiredActions.push('Complete compliance questionnaire');
    }
  }

  // 5. Check risk alignment
  const riskCheck = calculateRiskAlignment(
    user.riskScore,
    user.riskProfile,
    deal.riskLevel
  );
  
  if (riskCheck.warning) {
    riskWarnings.push(riskCheck.warning);
  }
  
  eligibilityScore = Math.min(eligibilityScore, riskCheck.score);

  // 6. Check investment limits
  const investmentLimits = checkInvestmentMinimum(deal.compartmentType, Number(deal.minTicket));

  // 7. Capital at risk warning
  if (deal.capitalAtRisk) {
    riskWarnings.push('Your capital is at risk. You may lose some or all of your investment.');
  }

  // 8. Get required documentation
  const requiredDocs = getRequiredDocumentation(
    deal.compartmentType,
    user.country || 'XX',
    user.investorType
  );
  
  if (requiredDocs.length > 0) {
    requiredActions.push(`Review and sign: ${requiredDocs.join(', ')}`);
  }

  return {
    dealId: deal.id,
    dealName: deal.title,
    compartmentType: deal.compartmentType,
    assetClass: deal.assetClass || deal.category,
    eligible,
    eligibilityScore,
    reasons,
    restrictions,
    requiredActions,
    investmentLimits,
    riskWarnings,
  };
}

/**
 * Match an investor with all available deals
 */
export async function matchInvestorToAllDeals(
  investorId: string
): Promise<MatchingResult> {
  // Fetch user (investor)
  const user = await prisma.user.findUnique({
    where: { id: investorId },
  });

  if (!user) {
    throw new Error(`User not found: ${investorId}`);
  }

  // Fetch all active deals
  const deals = await prisma.deal.findMany({
    where: { status: 'ACTIVE' },
  });

  const eligibleDeals: MatchedDeal[] = [];
  const ineligibleDeals: MatchedDeal[] = [];
  const allRestrictions: string[] = [];

  for (const deal of deals) {
    const match = await matchInvestorToDeal(investorId, deal.id);
    
    if (match.eligible) {
      eligibleDeals.push(match);
    } else {
      ineligibleDeals.push(match);
    }
    
    allRestrictions.push(...match.restrictions);
  }

  // Sort eligible deals by score (highest first)
  eligibleDeals.sort((a, b) => b.eligibilityScore - a.eligibilityScore);

  // Count unique restrictions
  const restrictionCounts = allRestrictions.reduce((acc, r) => {
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topRestrictions = Object.entries(restrictionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([r]) => r);

  return {
    investorId: user.id,
    investorType: user.investorType,
    countryCode: user.country || 'XX',
    kycApproved: user.kycStatus === 'APPROVED',
    complianceApproved: user.complianceStatus === 'APPROVED',
    eligibleDeals,
    ineligibleDeals,
    summary: {
      totalDeals: deals.length,
      eligibleCount: eligibleDeals.length,
      ineligibleCount: ineligibleDeals.length,
      topRestrictions,
    },
  };
}

/**
 * Find all eligible investors for a specific deal
 */
export async function findEligibleInvestorsForDeal(
  dealId: string
): Promise<{ investorId: string; investorType: InvestorType; countryCode: string; score: number }[]> {
  const deal = await prisma.deal.findUnique({
    where: { id: dealId },
  });

  if (!deal) {
    throw new Error(`Deal not found: ${dealId}`);
  }

  // Get all approved users
  const users = await prisma.user.findMany({
    where: {
      complianceStatus: 'APPROVED',
      kycStatus: 'APPROVED',
    },
  });

  const eligibleInvestors: { investorId: string; investorType: InvestorType; countryCode: string; score: number }[] = [];

  for (const user of users) {
    const match = await matchInvestorToDeal(user.id, dealId);
    
    if (match.eligible) {
      eligibleInvestors.push({
        investorId: user.id,
        investorType: user.investorType,
        countryCode: user.country || 'XX',
        score: match.eligibilityScore,
      });
    }
  }

  // Sort by score
  return eligibleInvestors.sort((a, b) => b.score - a.score);
}

/**
 * Get deal recommendations for an investor based on their profile
 */
export async function getRecommendedDeals(
  investorId: string,
  limit: number = 5
): Promise<MatchedDeal[]> {
  const result = await matchInvestorToAllDeals(investorId);
  
  // Return top eligible deals
  return result.eligibleDeals.slice(0, limit);
}

/**
 * Check if a specific investor can invest in a specific deal
 * Quick eligibility check without full analysis
 */
export async function canInvest(
  investorId: string,
  dealId: string
): Promise<{ canInvest: boolean; reason: string }> {
  try {
    const match = await matchInvestorToDeal(investorId, dealId);
    
    return {
      canInvest: match.eligible,
      reason: match.eligible
        ? 'Investor is eligible for this deal'
        : match.reasons.join('; '),
    };
  } catch (error: any) {
    return {
      canInvest: false,
      reason: error.message,
    };
  }
}

// Export types
export { InvestorType, CompartmentType };
