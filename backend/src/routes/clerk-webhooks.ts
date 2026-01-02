/**
 * Clerk Webhook Routes
 * 
 * Handles Clerk authentication webhooks for user sync
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Webhook } from 'svix';
import {
  clerkSyncService,
  ClerkUserData,
  ClerkWebhookEvent,
} from '../services/clerk-sync.service.js';
import { env } from '../config/env.js';

interface WebhookPayload {
  type: ClerkWebhookEvent;
  data: ClerkUserData | { id: string };
}

export default async function clerkWebhookRoutes(fastify: FastifyInstance) {
  /**
   * Clerk Webhook Endpoint
   * 
   * Receives webhooks from Clerk for user events
   */
  fastify.post('/api/webhooks/clerk', {
    config: {
      rawBody: true,
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
      
      if (!CLERK_WEBHOOK_SECRET) {
        console.warn('CLERK_WEBHOOK_SECRET not configured');
        return reply.status(500).send({
          success: false,
          error: 'Webhook secret not configured',
        });
      }

      // Get the headers
      const svixId = request.headers['svix-id'] as string;
      const svixTimestamp = request.headers['svix-timestamp'] as string;
      const svixSignature = request.headers['svix-signature'] as string;

      if (!svixId || !svixTimestamp || !svixSignature) {
        console.warn('Missing Svix headers');
        return reply.status(400).send({
          success: false,
          error: 'Missing webhook headers',
        });
      }

      // Get the raw body
      const rawBody = (request as any).rawBody || JSON.stringify(request.body);

      // Verify the webhook
      const wh = new Webhook(CLERK_WEBHOOK_SECRET);
      let payload: WebhookPayload;

      try {
        payload = wh.verify(rawBody, {
          'svix-id': svixId,
          'svix-timestamp': svixTimestamp,
          'svix-signature': svixSignature,
        }) as WebhookPayload;
      } catch (err) {
        console.error('Webhook verification failed:', err);
        return reply.status(400).send({
          success: false,
          error: 'Invalid webhook signature',
        });
      }

      const { type, data } = payload;
      console.log(`Received Clerk webhook: ${type}`);

      // Handle different event types
      switch (type) {
        case 'user.created': {
          const userData = data as ClerkUserData;
          await clerkSyncService.createUserFromClerk(userData);
          break;
        }

        case 'user.updated': {
          const userData = data as ClerkUserData;
          await clerkSyncService.updateUserFromClerk(userData);
          break;
        }

        case 'user.deleted': {
          const deleteData = data as { id: string };
          await clerkSyncService.deleteUserFromClerk(deleteData);
          break;
        }

        case 'session.created': {
          const sessionData = data as any;
          if (sessionData.user_id) {
            await clerkSyncService.updateUserLastLogin(sessionData.user_id);
          }
          break;
        }

        default:
          console.log(`Unhandled webhook event: ${type}`);
      }

      return reply.status(200).send({
        success: true,
        message: `Webhook ${type} processed`,
      });

    } catch (error: any) {
      console.error('Webhook processing error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Manual User Sync Endpoint (Admin only)
   * 
   * Manually sync a user from Clerk
   */
  fastify.post('/api/admin/sync-user', async (
    request: FastifyRequest<{
      Body: { clerkUserId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId } = request.body;

      if (!clerkUserId) {
        return reply.status(400).send({
          success: false,
          error: 'clerkUserId is required',
        });
      }

      const user = await clerkSyncService.syncUserFromClerkId(clerkUserId);

      return reply.status(200).send({
        success: true,
        user,
      });

    } catch (error: any) {
      console.error('Manual sync error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get User by Clerk ID
   */
  fastify.get('/api/users/clerk/:clerkUserId', async (
    request: FastifyRequest<{
      Params: { clerkUserId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId } = request.params;

      const user = await clerkSyncService.getUserByClerkId(clerkUserId);

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
   * Get or Create User
   * 
   * Called from frontend after Clerk auth to ensure user exists in DB
   */
  fastify.post('/api/users/ensure', async (
    request: FastifyRequest<{
      Body: {
        clerkUserId: string;
        email: string;
        firstName?: string;
        lastName?: string;
        imageUrl?: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clerkUserId, email, firstName, lastName, imageUrl } = request.body;

      if (!clerkUserId || !email) {
        return reply.status(400).send({
          success: false,
          error: 'clerkUserId and email are required',
        });
      }

      const user = await clerkSyncService.getOrCreateUser(clerkUserId, email, {
        first_name: firstName || null,
        last_name: lastName || null,
        image_url: imageUrl || null,
      } as any);

      return reply.status(200).send({
        success: true,
        user,
      });

    } catch (error: any) {
      console.error('Ensure user error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
