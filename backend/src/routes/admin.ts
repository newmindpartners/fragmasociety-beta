import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../db/prisma.js';
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
   * Get all early access submissions with pagination
   */
  app.get('/api/admin/submissions', async (request, reply) => {
    try {
      const { page = '1', limit = '20', search = '' } = request.query as {
        page?: string;
        limit?: string;
        search?: string;
      };

      const pageNum = parseInt(page, 10);
      const limitNum = Math.min(parseInt(limit, 10), 100);
      const skip = (pageNum - 1) * limitNum;

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

      return reply.send({
        success: true,
        submissions,
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
};
