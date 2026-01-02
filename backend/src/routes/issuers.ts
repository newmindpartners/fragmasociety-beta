import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../db/prisma.js';

interface CreateIssuerBody {
  companyName: string;
  legalName?: string;
  tradingName?: string;
  registrationNumber?: string;
  lei?: string;
  jurisdiction: string;
  companyType?: string;
  incorporationDate?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal?: string;
  };
  website?: string;
  email?: string;
  phone?: string;
  directors?: Array<{
    name: string;
    role: string;
    nationality?: string;
    appointedAt?: string;
  }>;
  beneficialOwners?: Array<{
    name: string;
    ownership: number;
    isPEP?: boolean;
  }>;
  keyPersons?: Array<{
    name: string;
    role: string;
    bio?: string;
  }>;
  regulatoryStatus?: string;
  licenses?: Array<{
    type: string;
    number: string;
    issuer: string;
    expiresAt?: string;
  }>;
  documents?: Array<{
    type: string;
    name: string;
    url: string;
    uploadedAt?: string;
  }>;
}

export async function issuerRoutes(fastify: FastifyInstance) {
  /**
   * Get all issuers
   */
  fastify.get('/api/issuers', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const issuers = await prisma.issuer.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { deals: true }
          }
        }
      });

      return reply.status(200).send({
        success: true,
        issuers: issuers.map(issuer => ({
          id: issuer.id,
          companyName: issuer.companyName,
          legalName: issuer.legalName,
          tradingName: issuer.tradingName,
          registrationNumber: issuer.registrationNumber,
          lei: issuer.lei,
          jurisdiction: issuer.jurisdiction,
          companyType: issuer.companyType,
          incorporationDate: issuer.incorporationDate,
          address: issuer.address,
          website: issuer.website,
          email: issuer.email,
          phone: issuer.phone,
          directors: issuer.directors,
          beneficialOwners: issuer.beneficialOwners,
          keyPersons: issuer.keyPersons,
          regulatoryStatus: issuer.regulatoryStatus,
          licenses: issuer.licenses,
          documents: issuer.documents,
          isActive: issuer.isActive,
          isVerified: issuer.isVerified,
          verifiedAt: issuer.verifiedAt,
          dealCount: issuer._count.deals,
          createdAt: issuer.createdAt,
          updatedAt: issuer.updatedAt,
        })),
      });
    } catch (error: any) {
      console.error('Get issuers error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Get single issuer by ID
   */
  fastify.get('/api/issuers/:issuerId', async (
    request: FastifyRequest<{ Params: { issuerId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { issuerId } = request.params;

      const issuer = await prisma.issuer.findUnique({
        where: { id: issuerId },
        include: {
          deals: {
            select: {
              id: true,
              title: true,
              slug: true,
              category: true,
              status: true,
              totalRaise: true,
              currentRaised: true,
            }
          }
        }
      });

      if (!issuer) {
        return reply.status(404).send({
          success: false,
          error: 'Issuer not found',
        });
      }

      return reply.status(200).send({
        success: true,
        issuer: {
          id: issuer.id,
          companyName: issuer.companyName,
          legalName: issuer.legalName,
          tradingName: issuer.tradingName,
          registrationNumber: issuer.registrationNumber,
          lei: issuer.lei,
          jurisdiction: issuer.jurisdiction,
          companyType: issuer.companyType,
          incorporationDate: issuer.incorporationDate,
          address: issuer.address,
          website: issuer.website,
          email: issuer.email,
          phone: issuer.phone,
          directors: issuer.directors,
          beneficialOwners: issuer.beneficialOwners,
          keyPersons: issuer.keyPersons,
          regulatoryStatus: issuer.regulatoryStatus,
          licenses: issuer.licenses,
          documents: issuer.documents,
          isActive: issuer.isActive,
          isVerified: issuer.isVerified,
          verifiedAt: issuer.verifiedAt,
          deals: issuer.deals,
          createdAt: issuer.createdAt,
          updatedAt: issuer.updatedAt,
        },
      });
    } catch (error: any) {
      console.error('Get issuer error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Create new issuer
   */
  fastify.post('/api/issuers', async (
    request: FastifyRequest<{ Body: CreateIssuerBody }>,
    reply: FastifyReply
  ) => {
    try {
      const body = request.body;

      const issuer = await prisma.issuer.create({
        data: {
          companyName: body.companyName,
          legalName: body.legalName,
          tradingName: body.tradingName,
          registrationNumber: body.registrationNumber,
          lei: body.lei,
          jurisdiction: body.jurisdiction,
          companyType: body.companyType,
          incorporationDate: body.incorporationDate ? new Date(body.incorporationDate) : null,
          address: body.address || null,
          website: body.website,
          email: body.email,
          phone: body.phone,
          directors: body.directors || null,
          beneficialOwners: body.beneficialOwners || null,
          keyPersons: body.keyPersons || null,
          regulatoryStatus: body.regulatoryStatus,
          licenses: body.licenses || null,
          documents: body.documents || null,
        },
      });

      return reply.status(201).send({
        success: true,
        issuer: {
          id: issuer.id,
          companyName: issuer.companyName,
          jurisdiction: issuer.jurisdiction,
          createdAt: issuer.createdAt,
        },
      });
    } catch (error: any) {
      console.error('Create issuer error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Update issuer
   */
  fastify.put('/api/issuers/:issuerId', async (
    request: FastifyRequest<{
      Params: { issuerId: string };
      Body: Partial<CreateIssuerBody>;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { issuerId } = request.params;
      const body = request.body;

      const issuer = await prisma.issuer.update({
        where: { id: issuerId },
        data: {
          ...(body.companyName && { companyName: body.companyName }),
          ...(body.legalName !== undefined && { legalName: body.legalName }),
          ...(body.tradingName !== undefined && { tradingName: body.tradingName }),
          ...(body.registrationNumber !== undefined && { registrationNumber: body.registrationNumber }),
          ...(body.lei !== undefined && { lei: body.lei }),
          ...(body.jurisdiction && { jurisdiction: body.jurisdiction }),
          ...(body.companyType !== undefined && { companyType: body.companyType }),
          ...(body.incorporationDate !== undefined && { 
            incorporationDate: body.incorporationDate ? new Date(body.incorporationDate) : null 
          }),
          ...(body.address !== undefined && { address: body.address }),
          ...(body.website !== undefined && { website: body.website }),
          ...(body.email !== undefined && { email: body.email }),
          ...(body.phone !== undefined && { phone: body.phone }),
          ...(body.directors !== undefined && { directors: body.directors }),
          ...(body.beneficialOwners !== undefined && { beneficialOwners: body.beneficialOwners }),
          ...(body.keyPersons !== undefined && { keyPersons: body.keyPersons }),
          ...(body.regulatoryStatus !== undefined && { regulatoryStatus: body.regulatoryStatus }),
          ...(body.licenses !== undefined && { licenses: body.licenses }),
          ...(body.documents !== undefined && { documents: body.documents }),
        },
      });

      return reply.status(200).send({
        success: true,
        issuer: {
          id: issuer.id,
          companyName: issuer.companyName,
          updatedAt: issuer.updatedAt,
        },
      });
    } catch (error: any) {
      console.error('Update issuer error:', error);
      if (error.code === 'P2025') {
        return reply.status(404).send({
          success: false,
          error: 'Issuer not found',
        });
      }
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Delete issuer
   */
  fastify.delete('/api/issuers/:issuerId', async (
    request: FastifyRequest<{ Params: { issuerId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { issuerId } = request.params;

      // Check if issuer has associated deals
      const dealCount = await prisma.deal.count({
        where: { issuerId },
      });

      if (dealCount > 0) {
        return reply.status(400).send({
          success: false,
          error: `Cannot delete issuer with ${dealCount} associated deal(s). Remove deals first.`,
        });
      }

      await prisma.issuer.delete({
        where: { id: issuerId },
      });

      return reply.status(200).send({
        success: true,
        message: 'Issuer deleted successfully',
      });
    } catch (error: any) {
      console.error('Delete issuer error:', error);
      if (error.code === 'P2025') {
        return reply.status(404).send({
          success: false,
          error: 'Issuer not found',
        });
      }
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Verify issuer (admin action)
   */
  fastify.post('/api/issuers/:issuerId/verify', async (
    request: FastifyRequest<{
      Params: { issuerId: string };
      Body: { verifiedBy?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { issuerId } = request.params;
      const { verifiedBy } = request.body;

      const issuer = await prisma.issuer.update({
        where: { id: issuerId },
        data: {
          isVerified: true,
          verifiedAt: new Date(),
          verifiedBy: verifiedBy || 'admin',
        },
      });

      return reply.status(200).send({
        success: true,
        issuer: {
          id: issuer.id,
          companyName: issuer.companyName,
          isVerified: issuer.isVerified,
          verifiedAt: issuer.verifiedAt,
        },
      });
    } catch (error: any) {
      console.error('Verify issuer error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
