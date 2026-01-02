/**
 * Compliance API Routes (Simplified)
 * 
 * Basic endpoints for compliance management.
 * Uses User model for investor data.
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../db/prisma.js';
import { InvestorType, ComplianceStatus } from '@prisma/client';
import { env } from '../config/env.js';
import {
  JURISDICTION_RULES,
  getAllJurisdictions,
  getJurisdictionsByRegion,
} from '../services/jurisdiction.service.js';

// Country code mapping for EarlyAccessSubmission
const COUNTRY_CODE_MAP: Record<string, string> = {
  'France': 'FR', 'Germany': 'DE', 'Italy': 'IT', 'Spain': 'ES', 'Portugal': 'PT',
  'Netherlands': 'NL', 'Belgium': 'BE', 'Luxembourg': 'LU', 'Switzerland': 'CH',
  'United Kingdom': 'GB', 'UK': 'GB', 'United States': 'US', 'USA': 'US',
  'Canada': 'CA', 'Australia': 'AU', 'Japan': 'JP', 'Singapore': 'SG',
  'United Arab Emirates': 'AE', 'UAE': 'AE', 'Dubai': 'AE', 'Saudi Arabia': 'SA',
  'Qatar': 'QA', 'Monaco': 'MC', 'Liechtenstein': 'LI', 'Austria': 'AT',
  'Ireland': 'IE', 'Sweden': 'SE', 'Denmark': 'DK', 'Norway': 'NO', 'Finland': 'FI',
};

export async function complianceRoutes(fastify: FastifyInstance) {
  
  // =============================================
  // HEALTH CHECK
  // =============================================
  
  fastify.get('/api/compliance/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({
      success: true,
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Compliance API is running',
    });
  });

  // =============================================
  // JURISDICTION MANAGEMENT
  // =============================================

  /**
   * Get all jurisdictions (from static rules)
   */
  fastify.get('/api/compliance/jurisdictions', async (
    request: FastifyRequest<{
      Querystring: { region?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { region } = request.query;
      
      let jurisdictions;
      if (region) {
        jurisdictions = getJurisdictionsByRegion(region as any);
      } else {
        jurisdictions = getAllJurisdictions();
      }

      // Group by region
      const byRegion: Record<string, any[]> = {};
      jurisdictions.forEach(j => {
        if (!byRegion[j.region]) byRegion[j.region] = [];
        byRegion[j.region].push(j);
      });

      return reply.status(200).send({
        success: true,
        jurisdictions,
        byRegion,
        count: jurisdictions.length,
      });

    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get specific jurisdiction by country code
   */
  fastify.get('/api/compliance/jurisdictions/:countryCode', async (
    request: FastifyRequest<{
      Params: { countryCode: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { countryCode } = request.params;
      const rule = JURISDICTION_RULES[countryCode.toUpperCase()];

      if (!rule) {
        return reply.status(404).send({
          success: false,
          error: `Jurisdiction not found: ${countryCode}`,
        });
      }

      return reply.status(200).send({
        success: true,
        jurisdiction: rule,
      });

    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // =============================================
  // INVESTOR MANAGEMENT (from EarlyAccessSubmission)
  // =============================================

  /**
   * List all investors from EarlyAccessSubmission
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
      
      // Fetch from EarlyAccessSubmission table
      const submissions = await prisma.earlyAccessSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: Number(limit),
        skip: Number(offset),
      });
      
      const total = await prisma.earlyAccessSubmission.count();
      
      // Transform to investor format
      const investors = submissions.map(sub => {
        // Determine investor type based on investorStatus
        let type: string = 'RETAIL';
        if (sub.investorStatus === 'professional') type = 'PROFESSIONAL';
        else if (sub.investorStatus === 'qualified') type = 'QUALIFIED';
        else if (sub.investorStatus === 'accredited') type = 'ACCREDITED';
        
        // Get country code
        const countryCodeVal = COUNTRY_CODE_MAP[sub.country] || sub.country?.substring(0, 2).toUpperCase() || 'XX';
        
        // Determine compliance status based on tags
        let complianceStatus = 'PENDING_REVIEW';
        if (sub.tags.includes('APPROVED')) complianceStatus = 'APPROVED';
        else if (sub.tags.includes('REJECTED')) complianceStatus = 'REJECTED';
        else if (sub.tags.includes('REQUIRES_DOCS')) complianceStatus = 'REQUIRES_DOCUMENTS';
        
        return {
          id: sub.id,
          email: sub.email,
          firstName: sub.fullName.split(' ')[0],
          lastName: sub.fullName.split(' ').slice(1).join(' ') || '',
          countryCode: countryCodeVal,
          investorType: type,
          complianceStatus,
          kycStatus: 'pending',
          riskScore: sub.isPep ? 8 : sub.isSanctioned ? 10 : 3,
          totalAssets: sub.investableCapital || '',
          isPep: sub.isPep,
          isSanctioned: sub.isSanctioned,
          createdAt: sub.createdAt.toISOString(),
          fullName: sub.fullName,
          registeringAs: sub.registeringAs,
          entityName: sub.entityName,
          annualIncome: sub.annualIncome,
          investableCapital: sub.investableCapital,
          investmentHorizon: sub.investmentHorizon,
          preferredTicketSize: sub.preferredTicketSize,
          assetInterests: sub.assetInterests,
          city: sub.city,
          tags: sub.tags,
        };
      });
      
      // Apply filters
      let filtered = investors;
      if (status) {
        filtered = filtered.filter(i => i.complianceStatus === status);
      }
      if (investorType) {
        filtered = filtered.filter(i => i.investorType === investorType);
      }
      if (countryCode) {
        filtered = filtered.filter(i => i.countryCode === countryCode);
      }
      
      // Calculate status counts
      const statusCounts: Record<string, number> = {
        'PENDING_REVIEW': 0,
        'APPROVED': 0,
        'REJECTED': 0,
        'REQUIRES_DOCUMENTS': 0,
      };
      investors.forEach(i => {
        statusCounts[i.complianceStatus] = (statusCounts[i.complianceStatus] || 0) + 1;
      });
      
      return reply.status(200).send({
        success: true,
        investors: filtered,
        statusCounts,
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
   * Update investor compliance status (updates tags)
   */
  fastify.put('/api/compliance/admin/investors/:investorId/status', async (
    request: FastifyRequest<{ 
      Params: { investorId: string };
      Body: { 
        status: string;
        notes?: string;
        reviewedBy: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId } = request.params;
      const { status, notes, reviewedBy } = request.body;
      
      const submission = await prisma.earlyAccessSubmission.findUnique({
        where: { id: investorId },
      });
      
      if (!submission) {
        return reply.status(404).send({
          success: false,
          error: 'Investor not found',
        });
      }
      
      // Update tags to reflect new status
      const statusTags = ['PENDING_REVIEW', 'APPROVED', 'REJECTED', 'REQUIRES_DOCS', 'SUSPENDED'];
      let newTags = submission.tags.filter(t => !statusTags.includes(t));
      
      if (status === 'APPROVED') newTags.push('APPROVED');
      else if (status === 'REJECTED') newTags.push('REJECTED');
      else if (status === 'REQUIRES_DOCUMENTS') newTags.push('REQUIRES_DOCS');
      else if (status === 'SUSPENDED') newTags.push('SUSPENDED');
      
      const updated = await prisma.earlyAccessSubmission.update({
        where: { id: investorId },
        data: { tags: newTags },
      });
      
      return reply.status(200).send({
        success: true,
        investor: { ...updated, complianceStatus: status },
        message: `Status updated to ${status}`,
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
        investorType: string;
        reason: string;
        classifiedBy: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { investorId } = request.params;
      const { investorType, reason, classifiedBy } = request.body;
      
      const submission = await prisma.earlyAccessSubmission.findUnique({
        where: { id: investorId },
      });
      
      if (!submission) {
        return reply.status(404).send({
          success: false,
          error: 'Investor not found',
        });
      }
      
      const typeTags = ['RETAIL', 'PROFESSIONAL', 'QUALIFIED', 'ACCREDITED', 'WHOLESALE', 'QII'];
      const previousType = submission.tags.find(t => typeTags.includes(t)) || 'RETAIL';
      
      let newTags = submission.tags.filter(t => !typeTags.includes(t));
      newTags.push(investorType);
      
      const updated = await prisma.earlyAccessSubmission.update({
        where: { id: investorId },
        data: { tags: newTags },
      });
      
      return reply.status(200).send({
        success: true,
        investor: { ...updated, investorType },
        previousType,
        message: `Reclassified from ${previousType} to ${investorType}`,
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
  // DEAL MANAGEMENT (from Supabase)
  // =============================================

  /**
   * Get all deals from Supabase
   */
  fastify.get('/api/compliance/deals', async (
    request: FastifyRequest<{
      Querystring: { status?: string; category?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const supabaseUrl = env.SUPABASE_URL;
      const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        return reply.status(200).send({
          success: true,
          deals: [],
          count: 0,
          message: 'Supabase not configured',
        });
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/deals?select=*&order=created_at.desc`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Supabase error: ${response.statusText}`);
      }

      const supabaseDeals = await response.json() as Array<any>;

      const deals = supabaseDeals.map(deal => ({
        id: deal.id,
        name: deal.title,
        slug: deal.id,
        description: deal.description,
        compartmentType: deal.instrument_type === 'Notes' ? 'RETAIL' : 'PROFESSIONAL',
        assetClass: deal.category,
        assetCoName: deal.leader_name,
        minimumInvestment: parseFloat(deal.min_ticket?.replace(/[^0-9.]/g, '')) || 0,
        maximumInvestment: deal.max_ticket ? parseFloat(deal.max_ticket.replace(/[^0-9.]/g, '')) : null,
        targetRaise: parseFloat(deal.total_raise?.replace(/[^0-9.]/g, '')) || 0,
        currentRaise: deal.current_raised ? parseFloat(deal.current_raised.replace(/[^0-9.]/g, '')) : 0,
        currency: deal.currency || 'EUR',
        riskLevel: deal.risk === 'High' ? 8 : deal.risk === 'Medium' ? 5 : 3,
        liquidityRisk: 'medium',
        requiresProspectus: deal.instrument_type === 'Notes',
        requiresPRIIPSKID: deal.instrument_type === 'Notes',
        requiresPPM: deal.instrument_type !== 'Notes',
        cssfApproved: false,
        capitalAtRisk: true,
        status: 'active',
        investorCount: deal.investor_count || 0,
        createdAt: deal.created_at,
      }));

      return reply.status(200).send({
        success: true,
        deals,
        count: deals.length,
      });

    } catch (error: any) {
      console.error('Get deals error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // =============================================
  // AI COMPLIANCE ASSISTANT
  // =============================================

  /**
   * AI status check
   */
  fastify.get('/api/compliance/ai/status', async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const hasOpenAI = !!env.OPENAI_API_KEY;
      const hasGemini = !!env.GOOGLE_AI_API_KEY;
      
      return reply.status(200).send({
        success: true,
        available: hasOpenAI || hasGemini,
        providers: {
          openai: hasOpenAI,
          gemini: hasGemini,
        },
        model: {
          provider: hasGemini ? 'gemini' : hasOpenAI ? 'openai' : 'none',
          model: hasGemini ? env.GEMINI_MODEL : hasOpenAI ? env.OPENAI_MODEL : 'none',
        },
      });

    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * AI chat endpoint
   */
  fastify.post('/api/compliance/ai/chat', async (
    request: FastifyRequest<{
      Body: {
        message: string;
        history?: Array<{ role: string; content: string }>;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { message, history = [] } = request.body;

      if (!message) {
        return reply.status(400).send({
          success: false,
          error: 'Message is required',
        });
      }

      // Simple response for now - can be enhanced with actual AI integration
      const response = `I'm the AI Compliance Officer. You asked about: "${message}". 
      
Please note that for detailed compliance advice, you should consult with our compliance team directly. 

Key points to remember:
- Luxembourg securitisation law governs our operations
- Retail compartments require EU Prospectus and PRIIPS KID
- Professional compartments have €100,000 minimum investment
- All investors require KYC verification`;

      return reply.status(200).send({
        success: true,
        response,
        model: 'simplified',
      });

    } catch (error: any) {
      console.error('AI chat error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
