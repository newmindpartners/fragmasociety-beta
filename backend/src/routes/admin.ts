import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../db/prisma.js';
import { env } from '../config/env.js';
import { getApplicantByExternalUserId, getApplicantStatus } from '../services/sumsub.service.js';
import crypto from 'crypto';

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Create admin schema
const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MODERATOR']).default('ADMIN'),
});

export const adminRoutes: FastifyPluginAsync = async (app) => {
  /**
   * POST /api/admin/login
   * Admin login
   */
  app.post('/api/admin/login', async (request, reply) => {
    try {
      const result = loginSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({
          success: false,
          error: 'Invalid credentials format',
        });
      }

      const { email, password } = result.data;

      const admin = await prisma.adminUser.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!admin || !admin.isActive) {
        return reply.status(401).send({
          success: false,
          error: 'Invalid email or password',
        });
      }

      if (!verifyPassword(password, admin.passwordHash)) {
        return reply.status(401).send({
          success: false,
          error: 'Invalid email or password',
        });
      }

      // Update last login
      await prisma.adminUser.update({
        where: { id: admin.id },
        data: { lastLoginAt: new Date() },
      });

      // Return admin data (in production, return a JWT token)
      return reply.send({
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error('Admin login error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Login failed',
      });
    }
  });

  /**
   * POST /api/admin/create
   * Create a new admin user (protected - requires existing admin)
   */
  app.post('/api/admin/create', async (request, reply) => {
    try {
      const result = createAdminSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        });
      }

      const { email, password, name, role } = result.data;

      // Check if admin already exists
      const existing = await prisma.adminUser.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existing) {
        return reply.status(409).send({
          success: false,
          error: 'Admin with this email already exists',
        });
      }

      const admin = await prisma.adminUser.create({
        data: {
          email: email.toLowerCase(),
          passwordHash: hashPassword(password),
          name,
          role,
        },
      });

      return reply.status(201).send({
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error('Create admin error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create admin',
      });
    }
  });

  /**
   * GET /api/admin/dashboard/stats
   * Get dashboard statistics
   */
  app.get('/api/admin/dashboard/stats', async (_request, reply) => {
    try {
      const [
        totalSubmissions,
        totalNewsletterSubscribers,
        submissionsToday,
        submissionsThisWeek,
        recentSubmissions,
      ] = await Promise.all([
        prisma.earlyAccessSubmission.count(),
        prisma.newsletterSubscriber.count(),
        prisma.earlyAccessSubmission.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        }),
        prisma.earlyAccessSubmission.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }),
        prisma.earlyAccessSubmission.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            fullName: true,
            email: true,
            country: true,
            registeringAs: true,
            createdAt: true,
          },
        }),
      ]);

      // Get country distribution
      const countryDistribution = await prisma.earlyAccessSubmission.groupBy({
        by: ['country'],
        _count: { country: true },
        orderBy: { _count: { country: 'desc' } },
        take: 10,
      });

      // Get investor type distribution
      const investorTypeDistribution = await prisma.earlyAccessSubmission.groupBy({
        by: ['registeringAs'],
        _count: { registeringAs: true },
      });

      return reply.send({
        success: true,
        stats: {
          totalSubmissions,
          totalNewsletterSubscribers,
          submissionsToday,
          submissionsThisWeek,
          countryDistribution: countryDistribution.map((c) => ({
            country: c.country,
            count: c._count.country,
          })),
          investorTypeDistribution: investorTypeDistribution.map((i) => ({
            type: i.registeringAs,
            count: i._count.registeringAs,
          })),
        },
        recentSubmissions,
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch dashboard stats',
      });
    }
  });

  /**
   * GET /api/admin/submissions
   * Get all early access submissions with pagination and optional KYC status
   */
  app.get('/api/admin/submissions', async (request, reply) => {
    try {
      const { page = '1', limit = '20', search = '', includeKyc = 'false' } = request.query as {
        page?: string;
        limit?: string;
        search?: string;
        includeKyc?: string;
      };

      const pageNum = parseInt(page, 10);
      const limitNum = Math.min(parseInt(limit, 10), 100);
      const skip = (pageNum - 1) * limitNum;
      const shouldIncludeKyc = includeKyc === 'true';

      const where = search
        ? {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' as const } },
              { email: { contains: search, mode: 'insensitive' as const } },
              { country: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {};

      const [submissions, total] = await Promise.all([
        prisma.earlyAccessSubmission.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.earlyAccessSubmission.count({ where }),
      ]);

      // Optionally fetch KYC status for each submission
      let submissionsWithKyc = submissions;
      if (shouldIncludeKyc && env.SUMSUB_APP_TOKEN && env.SUMSUB_SECRET_KEY) {
        submissionsWithKyc = await Promise.all(
          submissions.map(async (submission) => {
            try {
              // Use email as the external user ID for Sumsub lookup
              const applicant = await getApplicantByExternalUserId(submission.email);
              
              if (!applicant) {
                return {
                  ...submission,
                  kycStatus: 'not_started' as const,
                  kycVerified: false,
                };
              }

              const status = await getApplicantStatus(applicant.id);
              
              let kycStatus: 'not_started' | 'pending' | 'approved' | 'rejected' | 'retry' = 'not_started';
              let kycVerified = false;

              switch (status.reviewStatus) {
                case 'init':
                case 'pending':
                case 'queued':
                case 'onHold':
                  kycStatus = 'pending';
                  break;
                case 'completed':
                  if (status.reviewResult?.reviewAnswer === 'GREEN') {
                    kycStatus = 'approved';
                    kycVerified = true;
                  } else if (status.reviewResult?.reviewAnswer === 'RED') {
                    kycStatus = 'rejected';
                  } else {
                    kycStatus = 'retry';
                  }
                  break;
                default:
                  kycStatus = 'pending';
              }

              return {
                ...submission,
                kycStatus,
                kycVerified,
                kycReviewResult: status.reviewResult,
              };
            } catch (err) {
              console.error(`Failed to get KYC for ${submission.email}:`, err);
              return {
                ...submission,
                kycStatus: 'error' as const,
                kycVerified: false,
              };
            }
          })
        );
      }

      return reply.send({
        success: true,
        submissions: submissionsWithKyc,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      console.error('Fetch submissions error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch submissions',
      });
    }
  });

  /**
   * GET /api/admin/submissions/:id/kyc
   * Get KYC status for a specific submission
   */
  app.get('/api/admin/submissions/:id/kyc', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      if (!env.SUMSUB_APP_TOKEN || !env.SUMSUB_SECRET_KEY) {
        return reply.status(503).send({
          success: false,
          error: 'KYC service is not configured',
        });
      }

      // Get the submission
      const submission = await prisma.earlyAccessSubmission.findUnique({
        where: { id },
      });

      if (!submission) {
        return reply.status(404).send({
          success: false,
          error: 'Submission not found',
        });
      }

      // Look up KYC status using email as external user ID
      const applicant = await getApplicantByExternalUserId(submission.email);

      if (!applicant) {
        return reply.send({
          success: true,
          email: submission.email,
          kycStatus: 'not_started',
          kycVerified: false,
        });
      }

      const status = await getApplicantStatus(applicant.id);

      let kycStatus: 'not_started' | 'pending' | 'approved' | 'rejected' | 'retry' = 'not_started';
      let kycVerified = false;

      switch (status.reviewStatus) {
        case 'init':
        case 'pending':
        case 'queued':
        case 'onHold':
          kycStatus = 'pending';
          break;
        case 'completed':
          if (status.reviewResult?.reviewAnswer === 'GREEN') {
            kycStatus = 'approved';
            kycVerified = true;
          } else if (status.reviewResult?.reviewAnswer === 'RED') {
            kycStatus = 'rejected';
          } else {
            kycStatus = 'retry';
          }
          break;
        default:
          kycStatus = 'pending';
      }

      return reply.send({
        success: true,
        email: submission.email,
        kycStatus,
        kycVerified,
        reviewStatus: status.reviewStatus,
        reviewResult: status.reviewResult,
        applicantId: applicant.id,
      });
    } catch (error) {
      console.error('Get submission KYC error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to get KYC status',
      });
    }
  });

  /**
   * GET /api/admin/newsletter-subscribers
   * Get all newsletter subscribers with pagination
   */
  app.get('/api/admin/newsletter-subscribers', async (request, reply) => {
    try {
      const { page = '1', limit = '20' } = request.query as {
        page?: string;
        limit?: string;
      };

      const pageNum = parseInt(page, 10);
      const limitNum = Math.min(parseInt(limit, 10), 100);
      const skip = (pageNum - 1) * limitNum;

      const [subscribers, total] = await Promise.all([
        prisma.newsletterSubscriber.findMany({
          skip,
          take: limitNum,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.newsletterSubscriber.count(),
      ]);

      return reply.send({
        success: true,
        subscribers,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      console.error('Fetch subscribers error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch subscribers',
      });
    }
  });

  /**
   * DELETE /api/admin/submissions/:id
   * Delete a submission
   */
  app.delete('/api/admin/submissions/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      await prisma.earlyAccessSubmission.delete({
        where: { id },
      });

      return reply.send({
        success: true,
        message: 'Submission deleted',
      });
    } catch (error) {
      console.error('Delete submission error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to delete submission',
      });
    }
  });

  // ============================================
  // Clerk Role Management Endpoints
  // ============================================

  const setRoleSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    role: z.enum(['super_admin', 'admin', 'moderator']).nullable(),
  });

  /**
   * POST /api/admin/set-role
   * Set admin role for a Clerk user (updates publicMetadata)
   * Requires CLERK_SECRET_KEY to be configured
   */
  app.post('/api/admin/set-role', async (request, reply) => {
    try {
      if (!env.CLERK_SECRET_KEY) {
        return reply.status(503).send({
          success: false,
          error: 'Clerk integration not configured. Set CLERK_SECRET_KEY in environment.',
        });
      }

      const result = setRoleSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        });
      }

      const { userId, role } = result.data;

      // Update user's publicMetadata via Clerk Backend API
      const response = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_metadata: {
            role: role, // null to remove role
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Clerk API error:', errorData);
        return reply.status(response.status).send({
          success: false,
          error: 'Failed to update user role in Clerk',
          details: errorData,
        });
      }

      const updatedUser = await response.json() as {
        id: string;
        email_addresses?: { email_address: string }[];
        public_metadata?: { role?: string };
      };

      return reply.send({
        success: true,
        message: role ? `User role set to ${role}` : 'User role removed',
        user: {
          id: updatedUser.id,
          email: updatedUser.email_addresses?.[0]?.email_address,
          role: updatedUser.public_metadata?.role || null,
        },
      });
    } catch (error) {
      console.error('Set role error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to set user role',
      });
    }
  });

  /**
   * GET /api/admin/users
   * Get all Clerk users with their roles
   * Requires CLERK_SECRET_KEY to be configured
   */
  app.get('/api/admin/users', async (request, reply) => {
    try {
      if (!env.CLERK_SECRET_KEY) {
        return reply.status(503).send({
          success: false,
          error: 'Clerk integration not configured. Set CLERK_SECRET_KEY in environment.',
        });
      }

      const { limit = '20', offset = '0' } = request.query as {
        limit?: string;
        offset?: string;
      };

      const response = await fetch(
        `https://api.clerk.com/v1/users?limit=${limit}&offset=${offset}`,
        {
          headers: {
            'Authorization': `Bearer ${env.CLERK_SECRET_KEY}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Clerk API error:', errorData);
        return reply.status(response.status).send({
          success: false,
          error: 'Failed to fetch users from Clerk',
        });
      }

      const users = await response.json() as Array<{
        id: string;
        email_addresses?: { email_address: string }[];
        first_name?: string;
        last_name?: string;
        image_url?: string;
        public_metadata?: { role?: string };
        created_at?: number;
        last_sign_in_at?: number;
      }>;

      // Map to a simpler format
      const mappedUsers = users.map((user) => ({
        id: user.id,
        email: user.email_addresses?.[0]?.email_address || '',
        firstName: user.first_name,
        lastName: user.last_name,
        imageUrl: user.image_url,
        role: user.public_metadata?.role || null,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
      }));

      return reply.send({
        success: true,
        users: mappedUsers,
        total: users.length,
      });
    } catch (error) {
      console.error('Fetch users error:', error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch users',
      });
    }
  });
};
