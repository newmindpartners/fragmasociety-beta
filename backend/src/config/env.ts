import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  // Server
  PORT: z.string().default('3001').transform((val) => parseInt(val, 10)),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // CORS - default includes Railway frontend
  CORS_ORIGIN: z.string().default('https://fragma-beta-frontend-production.up.railway.app,http://localhost:5173,http://localhost:8080'),

  // n8n webhook (optional for local dev)
  N8N_WEBHOOK_URL: z.string().url().optional(),

  // Resend email service (optional for local dev)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default('Fragma Society <noreply@fragma.io>'),

  // Sumsub KYC (optional for local dev)
  SUMSUB_APP_TOKEN: z.string().optional(),
  SUMSUB_SECRET_KEY: z.string().optional(),
  SUMSUB_LEVEL_NAME: z.string().default('id-and-liveness'),

  // Clerk (for admin role management)
  CLERK_SECRET_KEY: z.string().optional(),

  // OpenAI (for AI Compliance Agent)
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o'),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
