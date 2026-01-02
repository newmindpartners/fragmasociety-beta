import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyRawBody from 'fastify-raw-body';
import { env } from './config/env.js';
import { healthRoutes } from './routes/health.js';
import { earlyAccessRoutes } from './routes/early-access.js';
import { newsletterRoutes } from './routes/newsletter.js';
import { kycRoutes } from './routes/kyc.js';
import { adminRoutes } from './routes/admin.js';
import { complianceRoutes } from './routes/compliance.js';
import clerkWebhookRoutes from './routes/clerk-webhooks.js';
import userRoutes from './routes/users.js';

const app = Fastify({
  logger: {
    level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  },
});

// Register raw body plugin for webhook signature verification
await app.register(fastifyRawBody, {
  field: 'rawBody',
  global: true,
  encoding: 'utf8',
  runFirst: true,
});

// Register CORS
await app.register(cors, {
  origin: env.CORS_ORIGIN.split(',').map(o => o.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'svix-id', 'svix-timestamp', 'svix-signature'],
  credentials: true,
});

// Register routes (routes already include /api prefix in their paths)
await app.register(healthRoutes);
await app.register(earlyAccessRoutes);
await app.register(newsletterRoutes);
await app.register(kycRoutes);
await app.register(adminRoutes);
await app.register(complianceRoutes);
await app.register(clerkWebhookRoutes);
await app.register(userRoutes);

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

