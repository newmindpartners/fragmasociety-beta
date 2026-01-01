import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/env.js';
import { healthRoutes } from './routes/health.js';
import { earlyAccessRoutes } from './routes/early-access.js';
import { newsletterRoutes } from './routes/newsletter.js';
import { kycRoutes } from './routes/kyc.js';
import { adminRoutes } from './routes/admin.js';

const app = Fastify({
  logger: {
    level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  },
});

// Register CORS
await app.register(cors, {
  origin: env.CORS_ORIGIN.split(',').map(o => o.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Register routes (routes already include /api prefix in their paths)
await app.register(healthRoutes);
await app.register(earlyAccessRoutes);
await app.register(newsletterRoutes);
await app.register(kycRoutes);
await app.register(adminRoutes);

// Start server
const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST });
    console.log(`🚀 Server running at http://${env.HOST}:${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
// Deploy trigger Thu Jan  1 17:51:08 +04 2026
