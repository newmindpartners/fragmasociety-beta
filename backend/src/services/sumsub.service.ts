import crypto from 'crypto';
import axios from 'axios';
import { env } from '../config/env.js';

const SUMSUB_BASE_URL = 'https://api.sumsub.com';

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
  if (!env.SUMSUB_SECRET_KEY) {
    throw new Error('SUMSUB_SECRET_KEY is not configured');
  }
  
  // Sumsub expects: timestamp (as string) + method (uppercase) + url path (including query) + body
  const dataToSign = ts.toString() + httpMethod.toUpperCase() + urlPath + body;
  
  console.log('Signature data:', { 
    ts: ts.toString(), 
    method: httpMethod.toUpperCase(), 
    path: urlPath, 
    bodyLength: body.length,
    dataToSign: dataToSign.substring(0, 100) + '...',
  });
  
  const signature = crypto
    .createHmac('sha256', env.SUMSUB_SECRET_KEY)
    .update(dataToSign)
    .digest('hex');
    
  console.log('Generated signature:', signature.substring(0, 20) + '...');
  
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
  // Try with 'basic-kyc-level' as fallback if the configured level doesn't exist
  const urlPath = `/resources/accessTokens?userId=${encodeURIComponent(externalUserId)}&levelName=${encodeURIComponent(level)}&ttlInSecs=1800`;

  // Signature for POST with no body
  const signature = generateSignature(ts, 'POST', urlPath, '');

  console.log('Sumsub request:', { 
    url: `${SUMSUB_BASE_URL}${urlPath}`,
    ts, 
    level, 
    externalUserId,
    appToken: env.SUMSUB_APP_TOKEN?.substring(0, 10) + '...',
  });

  // POST with query parameters only - NO body
  // As per Sumsub docs: https://docs.sumsub.com/reference/generate-access-token
  try {
    const response = await axios({
      method: 'POST',
      url: `${SUMSUB_BASE_URL}${urlPath}`,
      headers: {
        'Accept': 'application/json',
        'X-App-Token': env.SUMSUB_APP_TOKEN!,
        'X-App-Access-Ts': ts.toString(),
        'X-App-Access-Sig': signature,
      },
      // No data property = no body
    });

    console.log('Sumsub success response:', response.data);

    return {
      token: response.data.token,
      userId: response.data.userId,
    };
  } catch (error: any) {
    console.error('Sumsub API error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    
    const errorData = error.response?.data;
    const errorMsg = errorData?.description || errorData?.message || errorData?.error || error.message;
    throw new Error(errorMsg);
  }
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
