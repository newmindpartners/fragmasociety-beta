import crypto from 'crypto';
import axios from 'axios';
import { env } from '../config/env.js';

const SUMSUB_BASE_URL = 'https://api.sumsub.com';

/**
 * Generate signature for Sumsub API requests
 */
function generateSignature(
  ts: number,
  httpMethod: string,
  urlPath: string,
  body: string = ''
): string {
  if (!env.SUMSUB_SECRET_KEY) {
    throw new Error('SUMSUB_SECRET_KEY is not configured');
  }
  
  const data = ts + httpMethod.toUpperCase() + urlPath + body;
  return crypto
    .createHmac('sha256', env.SUMSUB_SECRET_KEY)
    .update(data)
    .digest('hex');
}

/**
 * Create an applicant in Sumsub
 */
export async function createApplicant(
  externalUserId: string,
  email?: string,
  phone?: string
): Promise<{ id: string; inspectionId: string }> {
  if (!env.SUMSUB_APP_TOKEN || !env.SUMSUB_SECRET_KEY) {
    throw new Error('Sumsub credentials are not configured');
  }

  const ts = Math.floor(Date.now() / 1000);
  const urlPath = `/resources/applicants?levelName=${env.SUMSUB_LEVEL_NAME}`;
  
  const body = JSON.stringify({
    externalUserId,
    email,
    phone,
  });

  const signature = generateSignature(ts, 'POST', urlPath, body);

  const response = await axios.post(
    `${SUMSUB_BASE_URL}${urlPath}`,
    body,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-App-Token': env.SUMSUB_APP_TOKEN,
        'X-App-Access-Ts': ts.toString(),
        'X-App-Access-Sig': signature,
      },
    }
  );

  return {
    id: response.data.id,
    inspectionId: response.data.inspectionId,
  };
}

/**
 * Get applicant by external user ID
 */
export async function getApplicantByExternalUserId(
  externalUserId: string
): Promise<{ id: string; inspectionId: string; reviewStatus: string } | null> {
  if (!env.SUMSUB_APP_TOKEN || !env.SUMSUB_SECRET_KEY) {
    throw new Error('Sumsub credentials are not configured');
  }

  const ts = Math.floor(Date.now() / 1000);
  const urlPath = `/resources/applicants/-;externalUserId=${externalUserId}/one`;

  const signature = generateSignature(ts, 'GET', urlPath);

  try {
    const response = await axios.get(`${SUMSUB_BASE_URL}${urlPath}`, {
      headers: {
        'Accept': 'application/json',
        'X-App-Token': env.SUMSUB_APP_TOKEN,
        'X-App-Access-Ts': ts.toString(),
        'X-App-Access-Sig': signature,
      },
    });

    return {
      id: response.data.id,
      inspectionId: response.data.inspectionId,
      reviewStatus: response.data.review?.reviewStatus || 'init',
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Generate access token for WebSDK
 * Uses query parameters as per Sumsub API documentation
 */
export async function generateAccessToken(
  externalUserId: string,
  levelName?: string
): Promise<{ token: string; userId: string }> {
  if (!env.SUMSUB_APP_TOKEN || !env.SUMSUB_SECRET_KEY) {
    throw new Error('Sumsub credentials are not configured');
  }

  const level = levelName || env.SUMSUB_LEVEL_NAME;
  const ts = Math.floor(Date.now() / 1000);
  
  // Build URL with query parameters (userId here maps to externalUserId)
  const urlPath = `/resources/accessTokens?userId=${encodeURIComponent(externalUserId)}&levelName=${encodeURIComponent(level)}`;

  // Signature for POST with no body
  const signature = generateSignature(ts, 'POST', urlPath, '');

  console.log('Sumsub request:', { 
    url: `${SUMSUB_BASE_URL}${urlPath}`,
    ts, 
    level, 
    externalUserId,
    appToken: env.SUMSUB_APP_TOKEN?.substring(0, 10) + '...',
  });

  // Use native fetch to ensure no unwanted body is sent
  const response = await fetch(`${SUMSUB_BASE_URL}${urlPath}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'X-App-Token': env.SUMSUB_APP_TOKEN,
      'X-App-Access-Ts': ts.toString(),
      'X-App-Access-Sig': signature,
    },
  });

  const data = await response.json();
  
  console.log('Sumsub response:', { status: response.status, data });

  if (!response.ok) {
    console.error('Sumsub error response:', data);
    throw new Error(data.description || data.message || data.error || `Sumsub API error: ${response.status}`);
  }

  return {
    token: data.token,
    userId: data.userId,
  };
}

/**
 * Get applicant verification status
 */
export async function getApplicantStatus(
  applicantId: string
): Promise<{
  reviewStatus: string;
  reviewResult?: {
    reviewAnswer: string;
    rejectLabels?: string[];
    reviewRejectType?: string;
  };
}> {
  if (!env.SUMSUB_APP_TOKEN || !env.SUMSUB_SECRET_KEY) {
    throw new Error('Sumsub credentials are not configured');
  }

  const ts = Math.floor(Date.now() / 1000);
  const urlPath = `/resources/applicants/${applicantId}/status`;

  const signature = generateSignature(ts, 'GET', urlPath);

  const response = await axios.get(`${SUMSUB_BASE_URL}${urlPath}`, {
    headers: {
      'Accept': 'application/json',
      'X-App-Token': env.SUMSUB_APP_TOKEN,
      'X-App-Access-Ts': ts.toString(),
      'X-App-Access-Sig': signature,
    },
  });

  return {
    reviewStatus: response.data.reviewStatus,
    reviewResult: response.data.reviewResult,
  };
}
