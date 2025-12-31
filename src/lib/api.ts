/**
 * API Client for Fragma Society Backend
 * Replaces Supabase client for early access and newsletter operations
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  details?: Record<string, string[]>;
  data?: T;
}

interface EarlyAccessSubmission {
  full_name: string;
  email: string;
  country: string;
  city?: string | null;
  registering_as: string;
  entity_name?: string | null;
  is_us_person?: boolean | null;
  investor_status?: string | null;
  eu_professional_qualifications?: string[];
  eu_qualifications_count?: string | null;
  us_accredited_qualifications?: string[];
  annual_income?: string | null;
  investable_capital?: string | null;
  is_pep?: boolean | null;
  is_sanctioned?: boolean | null;
  investment_amount_3_6_months?: string | null;
  preferred_ticket_size?: string | null;
  investment_horizon?: string | null;
  investment_priorities?: string[];
  asset_interests?: string[];
  other_rwa_description?: string | null;
  preferred_contact_channel?: string | null;
  phone_whatsapp_number?: string | null;
  consent_to_contact?: boolean | null;
  marketing_consent?: boolean | null;
  tags?: string[];
}

interface EarlyAccessResponse extends ApiResponse {
  id?: string;
  alreadyRegistered?: boolean;
}

interface NewsletterResponse extends ApiResponse {
  id?: string;
  alreadySubscribed?: boolean;
}

interface ConfirmationEmailResponse extends ApiResponse {}

/**
 * Submit early access form
 */
export async function submitEarlyAccess(
  data: EarlyAccessSubmission
): Promise<EarlyAccessResponse> {
  try {
    const response = await fetch(`${API_URL}/api/early-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as EarlyAccessResponse;

    if (!response.ok) {
      return {
        success: false,
        error: result.error || `Request failed with status ${response.status}`,
        details: result.details,
        alreadyRegistered: result.alreadyRegistered,
      };
    }

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error';
    console.error('Early access submission error:', message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Send early access confirmation email
 */
export async function sendEarlyAccessConfirmation(
  fullName: string,
  email: string
): Promise<ConfirmationEmailResponse> {
  try {
    const response = await fetch(`${API_URL}/api/early-access/send-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email }),
    });

    const result = (await response.json()) as ConfirmationEmailResponse;

    if (!response.ok) {
      return {
        success: false,
        error: result.error || `Request failed with status ${response.status}`,
      };
    }

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error';
    console.error('Send confirmation email error:', message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(
  email: string,
  source?: string
): Promise<NewsletterResponse> {
  try {
    const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, source }),
    });

    const result = (await response.json()) as NewsletterResponse;

    if (!response.ok) {
      return {
        success: false,
        error: result.error || `Request failed with status ${response.status}`,
        details: result.details,
      };
    }

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error';
    console.error('Newsletter subscription error:', message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeNewsletter(email: string): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `${API_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`,
      {
        method: 'DELETE',
      }
    );

    const result = (await response.json()) as ApiResponse;

    if (!response.ok) {
      return {
        success: false,
        error: result.error || `Request failed with status ${response.status}`,
      };
    }

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error';
    console.error('Newsletter unsubscribe error:', message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<{ status: string; ready: boolean }> {
  try {
    const response = await fetch(`${API_URL}/health/ready`);
    const result = (await response.json()) as { status: string };

    return {
      status: result.status,
      ready: response.ok && result.status === 'ready',
    };
  } catch {
    return {
      status: 'unreachable',
      ready: false,
    };
  }
}

// Export types for use in components
export type {
  EarlyAccessSubmission,
  EarlyAccessResponse,
  NewsletterResponse,
  ApiResponse,
};
