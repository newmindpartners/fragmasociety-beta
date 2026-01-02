import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../db/prisma.js';

// Helper to serialize deal for API response
const serializeDeal = (deal: any, includeIssuer = false) => ({
  id: deal.id,
  slug: deal.slug,
  title: deal.title,
  tagline: deal.tagline,
  description: deal.description,
  category: deal.category,
  subcategory: deal.subcategory,
  // Issuer
  issuerId: deal.issuerId,
  issuer: includeIssuer && deal.issuer ? {
    id: deal.issuer.id,
    companyName: deal.issuer.companyName,
    jurisdiction: deal.issuer.jurisdiction,
  } : undefined,
  // Leadership
  leaderName: deal.leaderName,
  leaderRole: deal.leaderRole,
  leaderImage: deal.leaderImage,
  leaderBio: deal.leaderBio,
  leaderCredentials: deal.leaderCredentials,
  leaderPressLinks: deal.leaderPressLinks,
  // Media
  bannerImage: deal.bannerImage,
  heroVideoUrl: deal.heroVideoUrl,
  pitchVideoUrl: deal.pitchVideoUrl,
  assetVideoUrl: deal.assetVideoUrl,
  teamVideoUrl: deal.teamVideoUrl,
  assetImages: deal.assetImages,
  // Terms
  minTicket: deal.minTicket,
  maxTicket: deal.maxTicket,
  targetReturn: deal.targetReturn,
  term: deal.term,
  risk: deal.risk,
  instrumentType: deal.instrumentType,
  currency: deal.currency,
  distributionFrequency: deal.distributionFrequency,
  totalRaise: deal.totalRaise,
  currentRaised: deal.currentRaised,
  investorCount: deal.investorCount,
  // Universal data
  team: deal.team,
  strategies: deal.strategies,
  trackRecord: deal.trackRecord,
  totalPastProfit: deal.totalPastProfit,
  currentProperties: deal.currentProperties,
  marketData: deal.marketData,
  caseStudies: deal.caseStudies,
  timeline: deal.timeline,
  financials: deal.financials,
  specialOpportunity: deal.specialOpportunity,
  risks: deal.risks,
  marketHighlights: deal.marketHighlights,
  // Category-specific data
  realEstateData: deal.realEstateData,
  sportsData: deal.sportsData,
  artData: deal.artData,
  privateEquityData: deal.privateEquityData,
  // Status
  status: deal.status,
  launchDate: deal.launchDate,
  closeDate: deal.closeDate,
  createdAt: deal.createdAt,
  updatedAt: deal.updatedAt,
});

export async function dealRoutes(fastify: FastifyInstance) {
  /**
   * Get all deals (public)
   */
  fastify.get('/api/deals', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const deals = await prisma.deal.findMany({
        where: { status: { in: ['ACTIVE', 'FUNDED'] } },
        orderBy: { createdAt: 'desc' },
      });

      return reply.status(200).send({
        success: true,
        deals: deals.map(deal => serializeDeal(deal)),
      });
    } catch (error: any) {
      console.error('Get deals error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get all deals (admin - includes drafts)
   */
  fastify.get('/api/admin/deals', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const deals = await prisma.deal.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          issuer: {
            select: { id: true, companyName: true, jurisdiction: true }
          },
          _count: {
            select: { investments: true }
          }
        }
      });

      return reply.status(200).send({
        success: true,
        deals: deals.map(deal => ({
          ...serializeDeal(deal, true),
          investmentCount: deal._count.investments,
        })),
      });
    } catch (error: any) {
      console.error('Get admin deals error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get single deal by ID or slug (public)
   */
  fastify.get('/api/deals/:dealId', async (
    request: FastifyRequest<{ Params: { dealId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { dealId } = request.params;

      // Try to find by slug first (more common in URLs), then by ID
      let deal = await prisma.deal.findUnique({
        where: { slug: dealId },
        include: { issuer: true },
      });

      // If not found by slug, try by ID (for UUID lookups)
      if (!deal) {
        deal = await prisma.deal.findUnique({
          where: { id: dealId },
          include: { issuer: true },
        });
      }

      if (!deal) {
        return reply.status(404).send({
          success: false,
          error: 'Deal not found',
        });
      }

      return reply.status(200).send({
        success: true,
        deal: serializeDeal(deal, true),
      });
    } catch (error: any) {
      console.error('Get deal error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Create new deal (admin)
   */
  fastify.post('/api/admin/deals', async (
    request: FastifyRequest<{ Body: any }>,
    reply: FastifyReply
  ) => {
    try {
      const body = request.body as Record<string, any>;

      // Generate slug from title if not provided
      const slug = body.slug || body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const deal = await prisma.deal.create({
        data: {
          title: body.title,
          slug,
          tagline: body.tagline,
          description: body.description,
          category: body.category,
          subcategory: body.subcategory,
          issuerId: body.issuerId || null,
          // Leadership
          leaderName: body.leaderName,
          leaderRole: body.leaderRole,
          leaderImage: body.leaderImage,
          leaderBio: body.leaderBio,
          leaderCredentials: body.leaderCredentials,
          leaderPressLinks: body.leaderPressLinks,
          // Terms
          currency: body.currency || 'EUR',
          minTicket: body.minTicket,
          maxTicket: body.maxTicket,
          totalRaise: body.totalRaise,
          targetReturn: body.targetReturn,
          term: body.term,
          instrumentType: body.instrumentType || 'Notes',
          distributionFrequency: body.distributionFrequency,
          risk: body.risk,
          riskLevel: body.riskLevel || 5,
          // Media
          bannerImage: body.bannerImage,
          heroVideoUrl: body.heroVideoUrl,
          pitchVideoUrl: body.pitchVideoUrl,
          assetVideoUrl: body.assetVideoUrl,
          teamVideoUrl: body.teamVideoUrl,
          assetImages: body.assetImages,
          // Universal data
          team: body.team,
          strategies: body.strategies,
          trackRecord: body.trackRecord,
          totalPastProfit: body.totalPastProfit,
          currentProperties: body.currentProperties,
          marketData: body.marketData,
          caseStudies: body.caseStudies,
          timeline: body.timeline,
          financials: body.financials,
          specialOpportunity: body.specialOpportunity,
          risks: body.risks,
          marketHighlights: body.marketHighlights,
          // Category-specific
          realEstateData: body.realEstateData,
          sportsData: body.sportsData,
          artData: body.artData,
          privateEquityData: body.privateEquityData,
          // Status
          status: body.status || 'DRAFT',
          launchDate: body.launchDate ? new Date(body.launchDate) : null,
          closeDate: body.closeDate ? new Date(body.closeDate) : null,
        },
      });

      return reply.status(201).send({
        success: true,
        deal: serializeDeal(deal),
      });
    } catch (error: any) {
      console.error('Create deal error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Update deal (admin)
   */
  fastify.put('/api/admin/deals/:dealId', async (
    request: FastifyRequest<{
      Params: { dealId: string };
      Body: any;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { dealId } = request.params;
      const body = request.body as Record<string, any>;

      const deal = await prisma.deal.update({
        where: { id: dealId },
        data: {
          ...(body.title && { title: body.title }),
          ...(body.slug && { slug: body.slug }),
          ...(body.tagline !== undefined && { tagline: body.tagline }),
          ...(body.description !== undefined && { description: body.description }),
          ...(body.category && { category: body.category }),
          ...(body.subcategory !== undefined && { subcategory: body.subcategory }),
          ...(body.issuerId !== undefined && { issuerId: body.issuerId }),
          // Leadership
          ...(body.leaderName && { leaderName: body.leaderName }),
          ...(body.leaderRole && { leaderRole: body.leaderRole }),
          ...(body.leaderImage !== undefined && { leaderImage: body.leaderImage }),
          ...(body.leaderBio !== undefined && { leaderBio: body.leaderBio }),
          ...(body.leaderCredentials !== undefined && { leaderCredentials: body.leaderCredentials }),
          ...(body.leaderPressLinks !== undefined && { leaderPressLinks: body.leaderPressLinks }),
          // Terms
          ...(body.currency && { currency: body.currency }),
          ...(body.minTicket !== undefined && { minTicket: body.minTicket }),
          ...(body.maxTicket !== undefined && { maxTicket: body.maxTicket }),
          ...(body.totalRaise !== undefined && { totalRaise: body.totalRaise }),
          ...(body.targetReturn !== undefined && { targetReturn: body.targetReturn }),
          ...(body.term !== undefined && { term: body.term }),
          ...(body.instrumentType !== undefined && { instrumentType: body.instrumentType }),
          ...(body.distributionFrequency !== undefined && { distributionFrequency: body.distributionFrequency }),
          ...(body.risk !== undefined && { risk: body.risk }),
          ...(body.riskLevel !== undefined && { riskLevel: body.riskLevel }),
          // Media
          ...(body.bannerImage !== undefined && { bannerImage: body.bannerImage }),
          ...(body.heroVideoUrl !== undefined && { heroVideoUrl: body.heroVideoUrl }),
          ...(body.pitchVideoUrl !== undefined && { pitchVideoUrl: body.pitchVideoUrl }),
          ...(body.assetVideoUrl !== undefined && { assetVideoUrl: body.assetVideoUrl }),
          ...(body.teamVideoUrl !== undefined && { teamVideoUrl: body.teamVideoUrl }),
          ...(body.assetImages !== undefined && { assetImages: body.assetImages }),
          // Universal data
          ...(body.team !== undefined && { team: body.team }),
          ...(body.strategies !== undefined && { strategies: body.strategies }),
          ...(body.trackRecord !== undefined && { trackRecord: body.trackRecord }),
          ...(body.totalPastProfit !== undefined && { totalPastProfit: body.totalPastProfit }),
          ...(body.currentProperties !== undefined && { currentProperties: body.currentProperties }),
          ...(body.marketData !== undefined && { marketData: body.marketData }),
          ...(body.caseStudies !== undefined && { caseStudies: body.caseStudies }),
          ...(body.timeline !== undefined && { timeline: body.timeline }),
          ...(body.financials !== undefined && { financials: body.financials }),
          ...(body.specialOpportunity !== undefined && { specialOpportunity: body.specialOpportunity }),
          ...(body.risks !== undefined && { risks: body.risks }),
          ...(body.marketHighlights !== undefined && { marketHighlights: body.marketHighlights }),
          // Category-specific
          ...(body.realEstateData !== undefined && { realEstateData: body.realEstateData }),
          ...(body.sportsData !== undefined && { sportsData: body.sportsData }),
          ...(body.artData !== undefined && { artData: body.artData }),
          ...(body.privateEquityData !== undefined && { privateEquityData: body.privateEquityData }),
          // Status
          ...(body.status && { status: body.status }),
          ...(body.launchDate !== undefined && { launchDate: body.launchDate ? new Date(body.launchDate) : null }),
          ...(body.closeDate !== undefined && { closeDate: body.closeDate ? new Date(body.closeDate) : null }),
        },
        include: { issuer: true },
      });

      return reply.status(200).send({
        success: true,
        deal: serializeDeal(deal, true),
      });
    } catch (error: any) {
      console.error('Update deal error:', error);
      if (error.code === 'P2025') {
        return reply.status(404).send({
          success: false,
          error: 'Deal not found',
        });
      }
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Delete deal (admin)
   */
  fastify.delete('/api/admin/deals/:dealId', async (
    request: FastifyRequest<{ Params: { dealId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { dealId } = request.params;

      // Check for investments first
      const investmentCount = await prisma.userInvestment.count({
        where: { dealId },
      });

      if (investmentCount > 0) {
        return reply.status(400).send({
          success: false,
          error: `Cannot delete deal with ${investmentCount} investment(s). Archive instead.`,
        });
      }

      await prisma.deal.delete({
        where: { id: dealId },
      });

      return reply.status(200).send({
        success: true,
        message: 'Deal deleted successfully',
      });
    } catch (error: any) {
      console.error('Delete deal error:', error);
      if (error.code === 'P2025') {
        return reply.status(404).send({
          success: false,
          error: 'Deal not found',
        });
      }
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get deal cap table (admin)
   */
  fastify.get('/api/admin/deals/:dealId/cap-table', async (
    request: FastifyRequest<{ Params: { dealId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { dealId } = request.params;

      const investments = await prisma.userInvestment.findMany({
        where: { dealId },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              country: true,
              investorType: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
      });

      const deal = await prisma.deal.findUnique({
        where: { id: dealId },
        select: { totalRaise: true, currentRaised: true },
      });

      const totalRaised = Number(deal?.currentRaised || 0);

      return reply.status(200).send({
        success: true,
        capTable: investments.map(inv => ({
          id: inv.id,
          investor: {
            id: inv.user.id,
            name: inv.user.fullName,
            email: inv.user.email,
            country: inv.user.country,
            investorType: inv.user.investorType,
          },
          amount: inv.amount,
          tokens: inv.tokens,
          ownershipPercent: totalRaised > 0 
            ? ((Number(inv.amount) / totalRaised) * 100).toFixed(2) 
            : '0',
          status: inv.status,
          investedAt: inv.createdAt,
        })),
        summary: {
          totalInvestors: investments.length,
          totalRaised: deal?.currentRaised,
          targetRaise: deal?.totalRaise,
        },
      });
    } catch (error: any) {
      console.error('Get cap table error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get deal comments
   */
  fastify.get('/api/deals/:dealId/comments', async (
    request: FastifyRequest<{ Params: { dealId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { dealId } = request.params;

      const comments = await prisma.dealComment.findMany({
        where: { dealId },
        orderBy: { createdAt: 'desc' },
      });

      return reply.status(200).send({
        success: true,
        comments: comments.map(c => ({
          id: c.id,
          dealId: c.dealId,
          userId: c.userId,
          parentId: c.parentId,
          content: c.content,
          userName: c.userName,
          userAvatar: c.userAvatar,
          createdAt: c.createdAt,
        })),
      });
    } catch (error: any) {
      console.error('Get comments error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Post a comment
   */
  fastify.post('/api/deals/:dealId/comments', async (
    request: FastifyRequest<{
      Params: { dealId: string };
      Body: {
        content: string;
        userId: string;
        userName?: string;
        userAvatar?: string;
        parentId?: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { dealId } = request.params;
      const { content, userId, userName, userAvatar, parentId } = request.body;

      // Find user by Clerk ID to get display name
      const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
      });

      const comment = await prisma.dealComment.create({
        data: {
          dealId,
          userId: user?.id || userId,
          parentId: parentId || null,
          content,
          userName: user?.displayName || userName || 'Anonymous',
          userAvatar: user?.avatarUrl || userAvatar || null,
        },
      });

      return reply.status(201).send({
        success: true,
        comment: {
          id: comment.id,
          dealId: comment.dealId,
          userId: comment.userId,
          parentId: comment.parentId,
          content: comment.content,
          userName: comment.userName,
          userAvatar: comment.userAvatar,
          createdAt: comment.createdAt,
        },
      });
    } catch (error: any) {
      console.error('Post comment error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get deal updates
   */
  fastify.get('/api/deals/:dealId/updates', async (
    request: FastifyRequest<{ Params: { dealId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { dealId } = request.params;

      const updates = await prisma.dealUpdate.findMany({
        where: { dealId },
        orderBy: { publishedAt: 'desc' },
      });

      return reply.status(200).send({
        success: true,
        updates: updates.map(u => ({
          id: u.id,
          dealId: u.dealId,
          title: u.title,
          content: u.content,
          imageUrl: u.imageUrl,
          publishedAt: u.publishedAt,
        })),
      });
    } catch (error: any) {
      console.error('Get updates error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
