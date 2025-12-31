import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  // Server
  PORT: z.string().default('3001'),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  // n8n webhook (optional for local dev)
  N8N_WEBHOOK_URL: z.string().url().optional(),

  // Resend email service (optional for local dev)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default('Fragma Society <noreply@fragma.io>'),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
