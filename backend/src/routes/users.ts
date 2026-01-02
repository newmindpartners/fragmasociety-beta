/**
 * User API Routes
 * 
 * CRUD operations for users
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../db/prisma.js';
import { InvestorType, KYCStatus, ComplianceStatus, MembershipTier } from '@prisma/client';

export default async function userRoutes(fastify: FastifyInstance) {
  /**
   * Get current user profile
   */
  fastify.get('/api/users/me', async (
    request: FastifyRequest<{
      Querystring: { clerkUserId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId } = request.query;

      if (!clerkUserId) {
        return reply.status(400).send({
          success: false,
          error: 'clerkUserId is required',
        });
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId },
        include: {
          wallets: true,
          investments: {
            include: {
              deal: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  category: true,
                  bannerImage: true,
                  status: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: {
              investments: true,
              orders: true,
              notifications: { where: { read: false } },
            },
          },
        },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found',
        });
      }

      return reply.status(200).send({
        success: true,
        user,
      });

    } catch (error: any) {
      console.error('Get user error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Update user profile
   */
  fastify.put('/api/users/me', async (
    request: FastifyRequest<{
      Querystring: { clerkUserId: string };
      Body: {
        displayName?: string;
        bio?: string;
        phone?: string;
        country?: string;
        city?: string;
        address?: string;
        postalCode?: string;
        taxResidency?: string;
        nationality?: string;
        investmentHorizon?: string;
        preferredTicketSize?: string;
        investmentPriorities?: string[];
        assetInterests?: string[];
        preferredContactChannel?: string;
        marketingConsent?: boolean;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId } = request.query;
      const updates = request.body;

      if (!clerkUserId) {
        return reply.status(400).send({
          success: false,
          error: 'clerkUserId is required',
        });
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found',
        });
      }

      const updatedUser = await prisma.user.update({
        where: { clerkUserId },
        data: {
          ...updates,
          lastActivityAt: new Date(),
        },
      });

      return reply.status(200).send({
        success: true,
        user: updatedUser,
      });

    } catch (error: any) {
      console.error('Update user error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get user by ID (admin)
   */
  fastify.get('/api/users/:userId', async (
    request: FastifyRequest<{
      Params: { userId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { userId } = request.params;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          wallets: true,
          investments: {
            include: { deal: true },
          },
          documents: true,
        },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found',
        });
      }

      return reply.status(200).send({
        success: true,
        user,
      });

    } catch (error: any) {
      console.error('Get user error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * List all users (admin)
   */
  fastify.get('/api/admin/users', async (
    request: FastifyRequest<{
      Querystring: {
        limit?: number;
        offset?: number;
        investorType?: string;
        kycStatus?: string;
        complianceStatus?: string;
        country?: string;
        search?: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { 
        limit = 50, 
        offset = 0, 
        investorType, 
        kycStatus, 
        complianceStatus,
        country,
        search,
      } = request.query;

      const where: any = {};

      if (investorType) where.investorType = investorType;
      if (kycStatus) where.kycStatus = kycStatus;
      if (complianceStatus) where.complianceStatus = complianceStatus;
      if (country) where.country = country;
      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { fullName: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ];
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: Number(limit),
          skip: Number(offset),
          select: {
            id: true,
            clerkUserId: true,
            email: true,
            firstName: true,
            lastName: true,
            fullName: true,
            avatarUrl: true,
            country: true,
            city: true,
            investorType: true,
            kycStatus: true,
            complianceStatus: true,
            membershipTier: true,
            totalInvested: true,
            activeInvestments: true,
            isAdmin: true,
            isActive: true,
            createdAt: true,
            lastLoginAt: true,
          },
        }),
        prisma.user.count({ where }),
      ]);

      // Get stats
      const stats = await prisma.user.groupBy({
        by: ['investorType'],
        _count: true,
      });

      const kycStats = await prisma.user.groupBy({
        by: ['kycStatus'],
        _count: true,
      });

      return reply.status(200).send({
        success: true,
        users,
        pagination: {
          total,
          limit: Number(limit),
          offset: Number(offset),
        },
        stats: {
          byInvestorType: Object.fromEntries(stats.map(s => [s.investorType, s._count])),
          byKycStatus: Object.fromEntries(kycStats.map(s => [s.kycStatus, s._count])),
        },
      });

    } catch (error: any) {
      console.error('List users error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Update user KYC status (admin)
   */
  fastify.put('/api/admin/users/:userId/kyc', async (
    request: FastifyRequest<{
      Params: { userId: string };
      Body: {
        kycStatus: KYCStatus;
        notes?: string;
        reviewedBy?: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { userId } = request.params;
      const { kycStatus, notes, reviewedBy } = request.body;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found',
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          kycStatus,
          kycApprovedAt: kycStatus === 'APPROVED' ? new Date() : user.kycApprovedAt,
          complianceNotes: notes,
          reviewedBy,
          lastComplianceReview: new Date(),
        },
      });

      return reply.status(200).send({
        success: true,
        user: updatedUser,
      });

    } catch (error: any) {
      console.error('Update KYC error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Update user investor type (admin)
   */
  fastify.put('/api/admin/users/:userId/investor-type', async (
    request: FastifyRequest<{
      Params: { userId: string };
      Body: {
        investorType: InvestorType;
        reason?: string;
        classifiedBy?: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { userId } = request.params;
      const { investorType, reason, classifiedBy } = request.body;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found',
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          investorType,
          classificationDate: new Date(),
          classifiedBy,
          complianceNotes: reason,
        },
      });

      // Log the change
      try {
        await prisma.complianceAuditLog.create({
          data: {
            actorType: 'admin',
            actorId: classifiedBy,
            targetType: 'user',
            targetId: userId,
            userId,
            action: 'investor_type_changed',
            category: 'classification',
            previousValue: { investorType: user.investorType },
            newValue: { investorType },
            reason,
          },
        });
      } catch (auditError) {
        console.warn('Audit log failed:', auditError);
      }

      return reply.status(200).send({
        success: true,
        user: updatedUser,
        previousType: user.investorType,
      });

    } catch (error: any) {
      console.error('Update investor type error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get user dashboard stats
   */
  fastify.get('/api/users/me/stats', async (
    request: FastifyRequest<{
      Querystring: { clerkUserId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId } = request.query;

      if (!clerkUserId) {
        return reply.status(400).send({
          success: false,
          error: 'clerkUserId is required',
        });
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId },
        include: {
          wallets: true,
          investments: {
            where: { status: { in: ['ACTIVE', 'FUNDED', 'COMPLETED'] } },
          },
          distributions: {
            where: { status: 'COMPLETED' },
          },
        },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found',
        });
      }

      // Calculate stats
      const totalInvested = user.investments.reduce(
        (sum, inv) => sum + Number(inv.amount),
        0
      );

      const totalReturns = user.distributions.reduce(
        (sum, dist) => sum + Number(dist.amount),
        0
      );

      const availableBalance = user.wallets.reduce(
        (sum, w) => sum + Number(w.balance),
        0
      );

      const activeInvestments = user.investments.filter(
        inv => inv.status === 'ACTIVE' || inv.status === 'FUNDED'
      ).length;

      return reply.status(200).send({
        success: true,
        stats: {
          totalInvested,
          totalReturns,
          availableBalance,
          activeInvestments,
          completedInvestments: user.investments.filter(inv => inv.status === 'COMPLETED').length,
          averageReturn: totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0,
        },
      });

    } catch (error: any) {
      console.error('Get user stats error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get user notifications
   */
  fastify.get('/api/users/me/notifications', async (
    request: FastifyRequest<{
      Querystring: { clerkUserId: string; unreadOnly?: boolean };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId, unreadOnly } = request.query;

      if (!clerkUserId) {
        return reply.status(400).send({
          success: false,
          error: 'clerkUserId is required',
        });
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found',
        });
      }

      const where: any = { userId: user.id };
      if (unreadOnly === true || unreadOnly === 'true' as any) {
        where.read = false;
      }

      const notifications = await prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 50,
      });

      const unreadCount = await prisma.notification.count({
        where: { userId: user.id, read: false },
      });

      return reply.status(200).send({
        success: true,
        notifications,
        unreadCount,
      });

    } catch (error: any) {
      console.error('Get notifications error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Mark notification as read
   */
  fastify.put('/api/users/me/notifications/:notificationId/read', async (
    request: FastifyRequest<{
      Params: { notificationId: string };
      Querystring: { clerkUserId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { notificationId } = request.params;
      const { clerkUserId } = request.query;

      if (!clerkUserId) {
        return reply.status(400).send({
          success: false,
          error: 'clerkUserId is required',
        });
      }

      const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: {
          read: true,
          readAt: new Date(),
        },
      });

      return reply.status(200).send({
        success: true,
        notification,
      });

    } catch (error: any) {
      console.error('Mark notification read error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
