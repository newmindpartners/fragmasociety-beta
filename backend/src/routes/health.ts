import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '../db/prisma.js';

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/api/health', async (request, reply) => {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;
      
      return reply.send({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'connected',
      });
    } catch (error) {
      return reply.status(503).send({
        status: 'error',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
      });
    }
  });
};
