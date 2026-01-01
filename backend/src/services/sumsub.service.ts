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
  const appToken = getAppToken();
  const secretKey = getSecretKey();
  
  if (!appToken || !secretKey) {
    throw new Error('Sumsub credentials are not configured');
  }

  const level = levelName || env.SUMSUB_LEVEL_NAME;
  const ts = Math.floor(Date.now() / 1000);
  
  // Endpoint for SDK access tokens
  const urlPath = '/resources/accessTokens/sdk';
  
  // Request body
  const requestBody = {
    userId: externalUserId,
    levelName: level,
    ttlInSecs: 1800,
  };
  const bodyString = JSON.stringify(requestBody);

  // Signature includes the body
  const signature = generateSignature(ts, 'POST', urlPath, bodyString);

  console.log('Sumsub request details:', { 
    url: `${SUMSUB_BASE_URL}${urlPath}`,
    ts, 
    level, 
    externalUserId,
    appTokenPreview: `${appToken.substring(0, 10)}...${appToken.substring(appToken.length - 4)}`,
    bodyString: bodyString,
    signaturePreview: signature.substring(0, 20) + '...',
  });

  // POST with JSON body
  try {
    const response = await axios.post(
      `${SUMSUB_BASE_URL}${urlPath}`,
      requestBody,
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

    console.log('Sumsub success response:', response.data);

    return {
      token: response.data.token,
      userId: response.data.userId,
    };
  } catch (error: any) {
    console.error('Sumsub API error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: JSON.stringify(error.response?.data),
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
      },
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
