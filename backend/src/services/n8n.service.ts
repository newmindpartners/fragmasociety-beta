import { env } from '../config/env.js';

export interface EarlyAccessRecord {
  full_name: string;
  email: string;
  country: string;
  city: string | null;
  registering_as: string;
  entity_name: string | null;
  is_us_person: boolean | null;
  investor_status: string | null;
  eu_professional_qualifications: string;
  eu_qualifications_count: string | null;
  us_accredited_qualifications: string;
  annual_income: string | null;
  investable_capital: string | null;
  is_pep: boolean | null;
  is_sanctioned: boolean | null;
  investment_amount_3_6_months: string | null;
  preferred_ticket_size: string | null;
  investment_horizon: string | null;
  investment_priorities: string;
  asset_interests: string;
  other_rwa_description: string | null;
  preferred_contact_channel: string | null;
  phone_whatsapp_number: string | null;
  consent_to_contact: boolean | null;
  marketing_consent: boolean | null;
  tags: string;
  created_at: string;
}

export interface N8nPayload {
  type: 'INSERT';
  table: 'early_access_submissions';
  record: EarlyAccessRecord;
}

/**
 * Sync a new early access submission to n8n webhook
 * n8n then syncs to HubSpot
 */
export async function syncToN8n(record: EarlyAccessRecord): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('⚠️ N8N_WEBHOOK_URL not configured, skipping n8n sync');
    return { success: false, error: 'N8N_WEBHOOK_URL not configured' };
  }

  try {
    const payload: N8nPayload = {
      type: 'INSERT',
      table: 'early_access_submissions',
      record,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ n8n sync failed:', response.status, errorText);
      return { success: false, error: `n8n returned ${response.status}` };
    }

    console.log('✅ n8n sync successful');
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ n8n sync error:', message);
    return { success: false, error: message };
  }
}
