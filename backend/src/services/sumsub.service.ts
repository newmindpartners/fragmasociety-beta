import crypto from 'crypto';
import https from 'https';
import axios from 'axios';
import { env } from '../config/env.js';

const SUMSUB_BASE_URL = 'https://api.sumsub.com';

// Helper to get cleaned tokens (remove any accidental whitespace)
const getAppToken = () => env.SUMSUB_APP_TOKEN?.trim() || '';
const getSecretKey = () => env.SUMSUB_SECRET_KEY?.trim() || '';

/**
 * Generate signature for Sumsub API requests
 * Format: HMAC-SHA256(secret, ts + method + path + body)
 */
function generateSignature(
  ts: number,
  httpMethod: string,
  urlPath: string,
  body: string = ''
): string {
  const secretKey = getSecretKey();
  if (!secretKey) {
    throw new Error('SUMSUB_SECRET_KEY is not configured');
  }
  
  // Sumsub expects: timestamp (as string) + method (uppercase) + url path (including query) + body
  const dataToSign = ts.toString() + httpMethod.toUpperCase() + urlPath + body;
  
  console.log('Signature data:', { 
    ts: ts.toString(), 
    method: httpMethod.toUpperCase(), 
    path: urlPath, 
    bodyLength: body.length,
  });
  
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(dataToSign)
    .digest('hex');
  
  return signature;
}

/**
 * Create an applicant in Sumsub
 */
export async function createApplicant(
  externalUserId: string,
  email?: string,
  phone?: string
): Promise<{ id: string; inspectionId: string }> {
  const appToken = getAppToken();
  if (!appToken) {
    throw new Error('Sumsub credentials are not configured');
  }

  const ts = Math.floor(Date.now() / 1000);
  const urlPath = `/resources/applicants?levelName=${env.SUMSUB_LEVEL_NAME}`;
  
  // Only include defined fields in body
  const bodyObj: { externalUserId: string; email?: string; phone?: string } = {
    externalUserId,
  };
  if (email) bodyObj.email = email;
  if (phone) bodyObj.phone = phone;
  const body = JSON.stringify(bodyObj);

  const signature = generateSignature(ts, 'POST', urlPath, body);

  console.log('Creating Sumsub applicant:', { externalUserId, urlPath });

  const response = await axios.post(
    `${SUMSUB_BASE_URL}${urlPath}`,
    body,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-App-Token': appToken,
        'X-App-Access-Ts': ts.toString(),
        'X-App-Access-Sig': signature,
      },
    }
  );

  console.log('Applicant created:', response.data.id);

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
  const appToken = getAppToken();
  if (!appToken) {
    throw new Error('Sumsub credentials are not configured');
  }

  const ts = Math.floor(Date.now() / 1000);
  const urlPath = `/resources/applicants/-;externalUserId=${encodeURIComponent(externalUserId)}/one`;

  const signature = generateSignature(ts, 'GET', urlPath, '');

  console.log('Looking up applicant:', { externalUserId, urlPath });

  try {
    const response = await axios.get(`${SUMSUB_BASE_URL}${urlPath}`, {
      headers: {
        'Accept': 'application/json',
        'X-App-Token': appToken,
        'X-App-Access-Ts': ts.toString(),
        'X-App-Access-Sig': signature,
      },
    });

    console.log('Applicant found:', response.data.id);

    return {
      id: response.data.id,
      inspectionId: response.data.inspectionId,
      reviewStatus: response.data.review?.reviewStatus || 'init',
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log('Applicant not found for:', externalUserId);
      return null;
    }
    console.error('Error looking up applicant:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Generate access token for WebSDK
 * Tries multiple approaches to generate a token
 */
export async function generateAccessToken(
  externalUserId: string,
  levelName?: string
): Promise<{ token: string; userId: string }> {
  const appToken = getAppToken();
  const secretKey = getSecretKey();
  
  if (!appToken || !secretKey) {
    throw new Error('Sumsub credentials are not configured');
  }

  const level = levelName || env.SUMSUB_LEVEL_NAME;
  const ts = Math.floor(Date.now() / 1000);
  
  // Try approach 1: /resources/accessTokens with query params (for existing applicants)
  const urlPath = `/resources/accessTokens?userId=${encodeURIComponent(externalUserId)}&levelName=${encodeURIComponent(level)}&ttlInSecs=3600`;
  
  // Signature for POST with NO body
  const signature = generateSignature(ts, 'POST', urlPath, '');

  console.log('Sumsub access token request:', { 
    url: `${SUMSUB_BASE_URL}${urlPath}`,
    ts, 
    level, 
    externalUserId,
  });

  // Use native fetch with NO body
  const response = await fetch(`${SUMSUB_BASE_URL}${urlPath}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'X-App-Token': appToken,
      'X-App-Access-Ts': ts.toString(),
      'X-App-Access-Sig': signature,
    },
  });

  const responseText = await response.text();
  console.log('Sumsub raw response:', { 
    status: response.status, 
    statusText: response.statusText,
    body: responseText.substring(0, 500),
  });

  if (!response.ok) {
    let errorMsg = responseText;
    try {
      const errorData = JSON.parse(responseText);
      errorMsg = errorData.description || errorData.message || errorData.error || responseText;
    } catch {
      // Keep responseText as error
    }
    throw new Error(errorMsg);
  }

  const data = JSON.parse(responseText);
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
