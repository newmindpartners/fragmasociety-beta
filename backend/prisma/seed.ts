/**
 * Seed script for mock data
 * 
 * Creates sample investors and deals for testing the compliance engine
 */

import { PrismaClient, InvestorType, ComplianceStatus, CompartmentType } from '@prisma/client';

const prisma = new PrismaClient();

// Sample Investors
const mockInvestors = [
  {
    clerkUserId: 'user_demo_001',
    email: 'john.smith@example.com',
    countryCode: 'LU',
    investorType: 'PROFESSIONAL' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 750000,
    annualIncome: 150000,
    riskProfile: 'moderate',
    riskScore: 6,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_002',
    email: 'marie.laurent@example.com',
    countryCode: 'FR',
    investorType: 'QUALIFIED' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 2500000,
    annualIncome: 350000,
    riskProfile: 'aggressive',
    riskScore: 8,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_003',
    email: 'hans.mueller@example.com',
    countryCode: 'DE',
    investorType: 'RETAIL' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 150000,
    annualIncome: 85000,
    riskProfile: 'conservative',
    riskScore: 3,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_004',
    email: 'sarah.johnson@example.com',
    countryCode: 'US',
    investorType: 'ACCREDITED' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 1200000,
    annualIncome: 250000,
    isUsPerson: true,
    riskProfile: 'moderate',
    riskScore: 5,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_005',
    email: 'james.wilson@example.com',
    countryCode: 'GB',
    investorType: 'PROFESSIONAL' as InvestorType,
    complianceStatus: 'PENDING_REVIEW' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 500000,
    annualIncome: 120000,
    riskProfile: 'moderate',
    riskScore: 5,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_006',
    email: 'sophie.martin@example.com',
    countryCode: 'CH',
    investorType: 'QUALIFIED' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 3500000,
    annualIncome: 450000,
    riskProfile: 'aggressive',
    riskScore: 7,
    isPep: true, // PEP for enhanced due diligence testing
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_007',
    email: 'carlo.rossi@example.com',
    countryCode: 'IT',
    investorType: 'RETAIL' as InvestorType,
    complianceStatus: 'PENDING_REVIEW' as ComplianceStatus,
    kycStatus: 'pending',
    totalAssets: 80000,
    annualIncome: 55000,
    riskProfile: 'conservative',
    riskScore: 2,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_008',
    email: 'yuki.tanaka@example.com',
    countryCode: 'JP',
    investorType: 'PROFESSIONAL' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 900000,
    annualIncome: 200000,
    riskProfile: 'moderate',
    riskScore: 5,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_009',
    email: 'ahmed.hassan@example.com',
    countryCode: 'AE',
    investorType: 'QII' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 10000000,
    annualIncome: 1500000,
    riskProfile: 'aggressive',
    riskScore: 9,
    isPep: false,
    isSanctioned: false,
  },
  {
    clerkUserId: 'user_demo_010',
    email: 'emma.anderson@example.com',
    countryCode: 'AU',
    investorType: 'WHOLESALE' as InvestorType,
    complianceStatus: 'APPROVED' as ComplianceStatus,
    kycStatus: 'approved',
    totalAssets: 2800000,
    annualIncome: 280000,
    riskProfile: 'moderate',
    riskScore: 6,
    isPep: false,
    isSanctioned: false,
  },
];

// Sample Deals
const mockDeals = [
  {
    name: 'Bryan Balsiger - Equestrian Excellence',
    slug: 'bryan-balsiger-equestrian',
    description: 'Investment in European Champion show jumping career and associated rights',
    compartmentType: 'PROFESSIONAL' as CompartmentType,
    assetClass: 'Sport',
    assetCoName: 'Balsiger Sport Holdings',
    minimumInvestment: 100000,
    maximumInvestment: 500000,
    targetRaise: 5000000,
    currentRaise: 2750000,
    currency: 'EUR',
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: true,
    cssfApproved: false,
    riskLevel: 6,
    liquidityRisk: 'medium',
    capitalAtRisk: true,
    status: 'active',
  },
  {
    name: 'Philippe Naouri - Film Rights Portfolio',
    slug: 'philippe-naouri-film',
    description: 'Fractional ownership of premium film distribution rights and royalties',
    compartmentType: 'RETAIL' as CompartmentType,
    assetClass: 'Entertainment',
    assetCoName: 'Naouri Films SCS',
    minimumInvestment: 500,
    maximumInvestment: 50000,
    targetRaise: 2000000,
    currentRaise: 1200000,
    currency: 'EUR',
    requiresProspectus: true,
    requiresPRIIPSKID: true,
    requiresPPM: false,
    cssfApproved: true,
    cssfApprovalDate: new Date('2025-06-15'),
    riskLevel: 7,
    liquidityRisk: 'high',
    capitalAtRisk: true,
    status: 'active',
  },
  {
    name: 'Tim Levy - Music Catalog',
    slug: 'tim-levy-music',
    description: 'Investment in curated music rights and streaming royalties',
    compartmentType: 'RETAIL' as CompartmentType,
    assetClass: 'Entertainment',
    assetCoName: 'Levy Music Rights SA',
    minimumInvestment: 250,
    maximumInvestment: 25000,
    targetRaise: 1500000,
    currentRaise: 450000,
    currency: 'EUR',
    requiresProspectus: true,
    requiresPRIIPSKID: true,
    requiresPPM: false,
    cssfApproved: true,
    cssfApprovalDate: new Date('2025-08-20'),
    riskLevel: 5,
    liquidityRisk: 'medium',
    capitalAtRisk: true,
    status: 'active',
  },
  {
    name: 'Tuscan Villa Collection',
    slug: 'tuscan-villa-collection',
    description: 'Premium Italian real estate portfolio in Tuscany region',
    compartmentType: 'PROFESSIONAL' as CompartmentType,
    assetClass: 'Real Estate',
    assetCoName: 'Tuscany Estates SCS',
    minimumInvestment: 100000,
    maximumInvestment: 1000000,
    targetRaise: 15000000,
    currentRaise: 0,
    currency: 'EUR',
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: true,
    cssfApproved: false,
    riskLevel: 4,
    liquidityRisk: 'high',
    capitalAtRisk: true,
    status: 'draft',
  },
  {
    name: 'Monaco Luxury Residence',
    slug: 'monaco-luxury-residence',
    description: 'Exclusive Monaco waterfront property fractional ownership',
    compartmentType: 'PROFESSIONAL' as CompartmentType,
    assetClass: 'Real Estate',
    assetCoName: 'Monaco Prime RE',
    minimumInvestment: 250000,
    maximumInvestment: 2000000,
    targetRaise: 25000000,
    currentRaise: 8500000,
    currency: 'EUR',
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: true,
    cssfApproved: false,
    riskLevel: 3,
    liquidityRisk: 'high',
    capitalAtRisk: true,
    status: 'active',
  },
  {
    name: 'Sustainable Energy Fund',
    slug: 'sustainable-energy-fund',
    description: 'Green energy infrastructure investments across Europe',
    compartmentType: 'RETAIL' as CompartmentType,
    assetClass: 'ESG',
    assetCoName: 'Green Power Europe SA',
    minimumInvestment: 100,
    maximumInvestment: 10000,
    targetRaise: 5000000,
    currentRaise: 2100000,
    currency: 'EUR',
    requiresProspectus: true,
    requiresPRIIPSKID: true,
    requiresPPM: false,
    cssfApproved: true,
    cssfApprovalDate: new Date('2025-09-01'),
    riskLevel: 4,
    liquidityRisk: 'low',
    capitalAtRisk: true,
    status: 'active',
  },
  {
    name: 'Vintage Car Collection',
    slug: 'vintage-car-collection',
    description: 'Classic automobile portfolio featuring rare European sports cars',
    compartmentType: 'PROFESSIONAL' as CompartmentType,
    assetClass: 'Collectibles',
    assetCoName: 'Classic Motors SCS',
    minimumInvestment: 100000,
    maximumInvestment: 500000,
    targetRaise: 8000000,
    currentRaise: 3200000,
    currency: 'EUR',
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: true,
    cssfApproved: false,
    riskLevel: 5,
    liquidityRisk: 'high',
    capitalAtRisk: true,
    status: 'active',
  },
  {
    name: 'Private Credit Fund I',
    slug: 'private-credit-fund-1',
    description: 'Senior secured lending to European SMEs',
    compartmentType: 'PROFESSIONAL' as CompartmentType,
    assetClass: 'Private Credit',
    assetCoName: 'Fragma Credit SA',
    minimumInvestment: 100000,
    maximumInvestment: 2000000,
    targetRaise: 50000000,
    currentRaise: 18500000,
    currency: 'EUR',
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: true,
    cssfApproved: false,
    riskLevel: 5,
    liquidityRisk: 'medium',
    capitalAtRisk: true,
    status: 'active',
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  console.log('🗑️ Clearing existing data...');
  await prisma.investment.deleteMany();
  await prisma.dealEligibility.deleteMany();
  await prisma.complianceCheck.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.investor.deleteMany();

  // Create Investors
  console.log('👤 Creating investors...');
  for (const investor of mockInvestors) {
    await prisma.investor.upsert({
      where: { clerkUserId: investor.clerkUserId },
      update: investor,
      create: investor,
    });
    console.log(`  ✓ Created investor: ${investor.email}`);
  }

  // Create Deals
  console.log('📄 Creating deals...');
  for (const deal of mockDeals) {
    await prisma.deal.upsert({
      where: { slug: deal.slug },
      update: deal,
      create: deal,
    });
    console.log(`  ✓ Created deal: ${deal.name}`);
  }

  console.log('');
  console.log('✅ Seed completed!');
  console.log(`   - ${mockInvestors.length} investors created`);
  console.log(`   - ${mockDeals.length} deals created`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
