import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../db/prisma.js';
import { sendNewsletterWelcome } from '../services/email.service.js';

// Request schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(),
});

export async function newsletterRoutes(app: FastifyInstance): Promise<void> {
  /**
   * POST /api/newsletter/subscribe
   * Subscribe to the newsletter
   */
  app.post('/api/newsletter/subscribe', async (request, reply) => {
    try {
      // Validate request body
      const result = subscribeSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        });
      }

      const { email, source } = result.data;
      const normalizedEmail = email.trim().toLowerCase();

      // Check if already subscribed
      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        return reply.send({
          success: true,
          message: 'Already subscribed',
          alreadySubscribed: true,
        });
      }

      // Create subscription
      const subscriber = await prisma.newsletterSubscriber.create({
        data: {
          email: normalizedEmail,
          source: source || 'website',
        },
      });

      // Send welcome email (don't block on failure)
      sendNewsletterWelcome(normalizedEmail).catch((err) => {
        console.error('Failed to send newsletter welcome email:', err);
      });

      console.log(`✅ New newsletter subscriber: ${normalizedEmail}`);

      return reply.status(201).send({
        success: true,
        message: 'Successfully subscribed',
        id: subscriber.id,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Newsletter subscription error:', message);

      return reply.status(500).send({
        success: false,
        error: 'Failed to subscribe',
      });
    }
  });

  /**
   * DELETE /api/newsletter/unsubscribe
   * Unsubscribe from the newsletter
   */
  app.delete('/api/newsletter/unsubscribe', async (request, reply) => {
    try {
      const { email } = request.query as { email?: string };

      if (!email) {
        return reply.status(400).send({
          success: false,
          error: 'Email is required',
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      const deleted = await prisma.newsletterSubscriber.deleteMany({
        where: { email: normalizedEmail },
      });

      if (deleted.count === 0) {
        return reply.status(404).send({
          success: false,
          error: 'Email not found',
        });
      }

      console.log(`✅ Newsletter unsubscribe: ${normalizedEmail}`);

      return reply.send({
        success: true,
        message: 'Successfully unsubscribed',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Newsletter unsubscribe error:', message);

      return reply.status(500).send({
        success: false,
        error: 'Failed to unsubscribe',
      });
    }
  });
}
