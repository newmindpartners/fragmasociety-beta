import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../db/prisma.js';
import { syncToN8n, type EarlyAccessRecord } from '../services/n8n.service.js';
import { sendEarlyAccessConfirmation } from '../services/email.service.js';

// Request validation schema
const earlyAccessSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().nullable().optional(),
  registering_as: z.string().min(1, 'Registering as is required'),
  entity_name: z.string().nullable().optional(),
  is_us_person: z.boolean().nullable().optional(),
  investor_status: z.string().nullable().optional(),
  eu_professional_qualifications: z.array(z.string()).optional().default([]),
  eu_qualifications_count: z.string().nullable().optional(),
  us_accredited_qualifications: z.array(z.string()).optional().default([]),
  annual_income: z.string().nullable().optional(),
  investable_capital: z.string().nullable().optional(),
  is_pep: z.boolean().nullable().optional(),
  is_sanctioned: z.boolean().nullable().optional(),
  investment_amount_3_6_months: z.string().nullable().optional(),
  preferred_ticket_size: z.string().nullable().optional(),
  investment_horizon: z.string().nullable().optional(),
  investment_priorities: z.array(z.string()).optional().default([]),
  asset_interests: z.array(z.string()).optional().default([]),
  other_rwa_description: z.string().nullable().optional(),
  preferred_contact_channel: z.string().nullable().optional(),
  phone_whatsapp_number: z.string().nullable().optional(),
  consent_to_contact: z.boolean().nullable().optional(),
  marketing_consent: z.boolean().nullable().optional(),
  tags: z.array(z.string()).optional().default([]),
});

type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;

export async function earlyAccessRoutes(app: FastifyInstance): Promise<void> {
  /**
   * POST /api/early-access
   * Submit early access form
   */
  app.post('/api/early-access', async (request, reply) => {
    try {
      // Validate request body
      const result = earlyAccessSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        });
      }

      const data: EarlyAccessInput = result.data;
      const normalizedEmail = data.email.trim().toLowerCase();

      // Check for duplicate submission
      const existing = await prisma.earlyAccessSubmission.findFirst({
        where: { email: normalizedEmail },
      });

      if (existing) {
        return reply.status(409).send({
          success: false,
          error: 'Email already registered for early access',
          alreadyRegistered: true,
        });
      }

      // Create submission in database
      const submission = await prisma.earlyAccessSubmission.create({
        data: {
          fullName: data.full_name.trim(),
          email: normalizedEmail,
          country: data.country,
          city: data.city?.trim() || null,
          registeringAs: data.registering_as,
          entityName: data.entity_name?.trim() || null,
          isUsPerson: data.is_us_person ?? null,
          investorStatus: data.investor_status || null,
          euProfessionalQualifications: data.eu_professional_qualifications,
          euQualificationsCount: data.eu_qualifications_count || null,
          usAccreditedQualifications: data.us_accredited_qualifications,
          annualIncome: data.annual_income || null,
          investableCapital: data.investable_capital || null,
          isPep: data.is_pep ?? null,
          isSanctioned: data.is_sanctioned ?? null,
          investmentAmount3to6Months: data.investment_amount_3_6_months || null,
          preferredTicketSize: data.preferred_ticket_size || null,
          investmentHorizon: data.investment_horizon || null,
          investmentPriorities: data.investment_priorities,
          assetInterests: data.asset_interests,
          otherRwaDescription: data.other_rwa_description?.trim() || null,
          preferredContactChannel: data.preferred_contact_channel || null,
          phoneWhatsappNumber: data.phone_whatsapp_number?.trim() || null,
          consentToContact: data.consent_to_contact ?? null,
          marketingConsent: data.marketing_consent ?? null,
          tags: data.tags,
        },
      });

      console.log(`✅ Early access submission created: ${submission.id}`);

      // Prepare record for n8n (HubSpot sync)
      const n8nRecord: EarlyAccessRecord = {
        full_name: submission.fullName,
        email: submission.email,
        country: submission.country,
        city: submission.city,
        registering_as: submission.registeringAs,
        entity_name: submission.entityName,
        is_us_person: submission.isUsPerson,
        investor_status: submission.investorStatus,
        eu_professional_qualifications: submission.euProfessionalQualifications.join(', '),
        eu_qualifications_count: submission.euQualificationsCount,
        us_accredited_qualifications: submission.usAccreditedQualifications.join(', '),
        annual_income: submission.annualIncome,
        investable_capital: submission.investableCapital,
        is_pep: submission.isPep,
        is_sanctioned: submission.isSanctioned,
        investment_amount_3_6_months: submission.investmentAmount3to6Months,
        preferred_ticket_size: submission.preferredTicketSize,
        investment_horizon: submission.investmentHorizon,
        investment_priorities: submission.investmentPriorities.join(', '),
        asset_interests: submission.assetInterests.join(', '),
        other_rwa_description: submission.otherRwaDescription,
        preferred_contact_channel: submission.preferredContactChannel,
        phone_whatsapp_number: submission.phoneWhatsappNumber,
        consent_to_contact: submission.consentToContact,
        marketing_consent: submission.marketingConsent,
        tags: submission.tags.join(', '),
        created_at: submission.createdAt.toISOString(),
      };

      // Sync to n8n (HubSpot) - don't block on failure
      syncToN8n(n8nRecord).catch((err) => {
        console.error('Failed to sync to n8n:', err);
      });

      return reply.status(201).send({
        success: true,
        message: 'Early access submission received',
        id: submission.id,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Early access submission error:', message);

      // Check for unique constraint violation
      if (message.includes('Unique constraint')) {
        return reply.status(409).send({
          success: false,
          error: 'Email already registered for early access',
        });
      }

      return reply.status(500).send({
        success: false,
        error: 'Failed to submit early access form',
      });
    }
  });

  /**
   * POST /api/early-access/send-confirmation
   * Send confirmation email to early access user
   */
  app.post('/api/early-access/send-confirmation', async (request, reply) => {
    try {
      const { fullName, email } = request.body as { fullName?: string; email?: string };

      if (!fullName || !email) {
        return reply.status(400).send({
          success: false,
          error: 'fullName and email are required',
        });
      }

      const result = await sendEarlyAccessConfirmation(fullName, email);

      if (!result.success) {
        return reply.status(500).send({
          success: false,
          error: result.error || 'Failed to send confirmation email',
        });
      }

      return reply.send({
        success: true,
        message: 'Confirmation email sent',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Send confirmation email error:', message);

      return reply.status(500).send({
        success: false,
        error: 'Failed to send confirmation email',
      });
    }
  });
}
