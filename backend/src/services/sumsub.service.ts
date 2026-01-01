import crypto from 'crypto';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env.js';

// These parameters should be used for all requests
const SUMSUB_BASE_URL = 'https://api.sumsub.com';

// Helper to get cleaned tokens (remove any accidental whitespace)
const getAppToken = () => env.SUMSUB_APP_TOKEN?.trim() || '';
const getSecretKey = () => env.SUMSUB_SECRET_KEY?.trim() || '';

/**
 * Create signature for request - matches official Sumsub JS example exactly
 * https://github.com/SumSubstance/AppTokenUsageExamples/blob/master/JS/AppTokenJsExample.js
 */
function createSignedRequest(
  method: string,
  url: string,
  body?: object
): { headers: Record<string, string>; data?: string } {
  const ts = Math.floor(Date.now() / 1000);
  const secretKey = getSecretKey();
  const appToken = getAppToken();
  
  if (!secretKey || !appToken) {
    throw new Error('Sumsub credentials are not configured');
  }

  // Create signature exactly as in official example
  const signature = crypto.createHmac('sha256', secretKey);
  signature.update(ts + method.toUpperCase() + url);
  
  let bodyString: string | undefined;
  if (body) {
    bodyString = JSON.stringify(body);
    signature.update(bodyString);
  }

  const sig = signature.digest('hex');

  console.log('Sumsub request:', {
    method: method.toUpperCase(),
    url,
    ts,
    bodyLength: bodyString?.length || 0,
  });

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'X-App-Token': appToken,
    'X-App-Access-Ts': ts.toString(),
    'X-App-Access-Sig': sig,
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  return { headers, data: bodyString };
}

/**
 * Create an applicant in Sumsub
 * https://docs.sumsub.com/reference/create-applicant
 */
export async function createApplicant(
  externalUserId: string,
  email?: string,
  phone?: string
): Promise<{ id: string; inspectionId: string }> {
  const levelName = env.SUMSUB_LEVEL_NAME;
  const url = '/resources/applicants?levelName=' + encodeURIComponent(levelName);
  
  const body: { externalUserId: string; email?: string; phone?: string } = {
    externalUserId,
  };
  if (email) body.email = email;
  if (phone) body.phone = phone;

  const { headers, data } = createSignedRequest('POST', url, body);

  console.log('Creating Sumsub applicant:', { externalUserId, url });

  const response = await axios.post(
    SUMSUB_BASE_URL + url,
    data,
    { headers }
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
  const url = `/resources/applicants/-;externalUserId=${encodeURIComponent(externalUserId)}/one`;
  
  const { headers } = createSignedRequest('GET', url);

  console.log('Looking up applicant:', { externalUserId, url });

  try {
    const response = await axios.get(SUMSUB_BASE_URL + url, { headers });

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
 * https://docs.sumsub.com/reference/generate-access-token
 * Matches official JS example exactly
 */
export async function generateAccessToken(
  externalUserId: string,
  levelName?: string,
  ttlInSecs: number = 600
): Promise<{ token: string; userId: string }> {
  const level = levelName || env.SUMSUB_LEVEL_NAME;
  
  // Use /resources/accessTokens/sdk with JSON body - exactly as in official example
  const url = '/resources/accessTokens/sdk';
  
  const body = {
    userId: externalUserId,
    levelName: level,
    ttlInSecs: ttlInSecs,
  };

  const { headers, data } = createSignedRequest('POST', url, body);

  console.log('Sumsub access token request:', { 
    url: SUMSUB_BASE_URL + url,
    level, 
    externalUserId,
    body: data,
  });

  try {
    const response = await axios.post(
      SUMSUB_BASE_URL + url,
      data,
      { headers }
    );

    console.log('Sumsub access token success:', response.data);

    return {
      token: response.data.token,
      userId: response.data.userId,
    };
  } catch (error: any) {
    console.error('Sumsub access token error:', {
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
 * https://docs.sumsub.com/reference/get-applicant-review-status
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
  const url = `/resources/applicants/${applicantId}/status`;
  
  const { headers } = createSignedRequest('GET', url);

  const response = await axios.get(SUMSUB_BASE_URL + url, { headers });

  return {
    reviewStatus: response.data.reviewStatus,
    reviewResult: response.data.reviewResult,
  };
}
