import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { generateAccessToken, getApplicantByExternalUserId, getApplicantStatus } from '../services/sumsub.service.js';
import { env } from '../config/env.js';

interface AccessTokenBody {
  userId: string;
  email?: string;
  levelName?: string;
}

interface StatusParams {
  userId: string;
}

export async function kycRoutes(app: FastifyInstance) {
  // Health check for KYC service - also tests Sumsub API connection
  app.get('/api/kyc/health', async (_request: FastifyRequest, reply: FastifyReply) => {
    const configured = !!(env.SUMSUB_APP_TOKEN && env.SUMSUB_SECRET_KEY);
    
    let apiTest = 'not tested';
    let apiDetails = {};
    
    if (configured) {
      try {
        // Try to get applicant levels to test API connection
        const testResult = await getApplicantByExternalUserId('test-health-check-user');
        apiTest = testResult === null ? 'connected (no user found)' : 'connected (user found)';
      } catch (err: any) {
        apiTest = `error: ${err.message}`;
        apiDetails = {
          errorMessage: err.message,
          responseData: err.response?.data,
        };
      }
    }
    
    return reply.send({
      status: 'ok',
      configured,
      levelName: env.SUMSUB_LEVEL_NAME,
      apiTest,
      apiDetails,
      tokenPreview: env.SUMSUB_APP_TOKEN ? 
        `${env.SUMSUB_APP_TOKEN.substring(0, 8)}...${env.SUMSUB_APP_TOKEN.substring(env.SUMSUB_APP_TOKEN.length - 4)}` : 
        'not set',
      secretKeyLength: env.SUMSUB_SECRET_KEY?.length || 0,
    });
  });

  // Generate access token for WebSDK
  app.post('/api/kyc/access-token', async (request: FastifyRequest<{ Body: AccessTokenBody }>, reply: FastifyReply) => {
    try {
      const { userId, levelName } = request.body;

      if (!userId) {
        return reply.status(400).send({
          success: false,
          error: 'userId is required',
        });
      }

      if (!env.SUMSUB_APP_TOKEN || !env.SUMSUB_SECRET_KEY) {
        return reply.status(503).send({
          success: false,
          error: 'KYC service is not configured',
        });
      }

      const result = await generateAccessToken(userId, levelName);

      return reply.send({
        success: true,
        token: result.token,
        userId: result.userId,
      });
    } catch (error: any) {
      console.error('Error generating access token:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return reply.status(500).send({
        success: false,
        error: error.message || 'Failed to generate access token',
        // Include more details for debugging
        sumsub_error: error.response?.data || null,
        hint: 'Check SUMSUB_APP_TOKEN format - should use underscore (sbx_xxx) not colon',
      });
    }
  });

  // Get KYC status for a user
  app.get('/api/kyc/status/:userId', async (request: FastifyRequest<{ Params: StatusParams }>, reply: FastifyReply) => {
    try {
      const { userId } = request.params;

      if (!env.SUMSUB_APP_TOKEN || !env.SUMSUB_SECRET_KEY) {
        return reply.status(503).send({
          success: false,
          error: 'KYC service is not configured',
        });
      }

      // Get applicant by external user ID
      const applicant = await getApplicantByExternalUserId(userId);

      if (!applicant) {
        return reply.send({
          success: true,
          status: 'not_started',
          verified: false,
        });
      }

      // Get detailed status
      const status = await getApplicantStatus(applicant.id);

      // Map Sumsub status to our status
      let kycStatus: 'not_started' | 'pending' | 'approved' | 'rejected' | 'retry' = 'not_started';
      let verified = false;

      switch (status.reviewStatus) {
        case 'init':
        case 'pending':
        case 'queued':
        case 'onHold':
          kycStatus = 'pending';
          break;
        case 'completed':
          if (status.reviewResult?.reviewAnswer === 'GREEN') {
            kycStatus = 'approved';
            verified = true;
          } else if (status.reviewResult?.reviewAnswer === 'RED') {
            kycStatus = 'rejected';
          } else {
            kycStatus = 'retry';
          }
          break;
        default:
          kycStatus = 'pending';
      }

      return reply.send({
        success: true,
        status: kycStatus,
        verified,
        reviewStatus: status.reviewStatus,
        reviewResult: status.reviewResult,
      });
    } catch (error: any) {
      console.error('Error getting KYC status:', error.response?.data || error.message);
      return reply.status(500).send({
        success: false,
        error: error.response?.data?.description || error.message || 'Failed to get KYC status',
      });
    }
  });
}
