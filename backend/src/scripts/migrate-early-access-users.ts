/**
 * Migration Script: Early Access Users to User Table
 * 
 * This script migrates existing EarlyAccessSubmission records to the User table.
 * It should be run once to populate initial user data.
 * 
 * Usage: npx tsx src/scripts/migrate-early-access-users.ts
 */

import { prisma } from '../db/prisma.js';
import { InvestorType, KYCStatus, ComplianceStatus, MembershipTier } from '@prisma/client';

// Country code mapping
const COUNTRY_CODE_MAP: Record<string, string> = {
  'France': 'FR', 'Germany': 'DE', 'Italy': 'IT', 'Spain': 'ES', 'Portugal': 'PT',
  'Netherlands': 'NL', 'Belgium': 'BE', 'Luxembourg': 'LU', 'Switzerland': 'CH',
  'United Kingdom': 'GB', 'UK': 'GB', 'United States': 'US', 'USA': 'US',
  'Canada': 'CA', 'Australia': 'AU', 'Japan': 'JP', 'Singapore': 'SG',
  'United Arab Emirates': 'AE', 'UAE': 'AE', 'Dubai': 'AE', 'Saudi Arabia': 'SA',
  'Qatar': 'QA', 'Monaco': 'MC', 'Liechtenstein': 'LI', 'Austria': 'AT',
  'Ireland': 'IE', 'Sweden': 'SE', 'Denmark': 'DK', 'Norway': 'NO', 'Finland': 'FI',
  'Poland': 'PL', 'Czech Republic': 'CZ', 'Greece': 'GR', 'Hungary': 'HU',
  'Romania': 'RO', 'Bulgaria': 'BG', 'Croatia': 'HR', 'Slovakia': 'SK',
  'Slovenia': 'SI', 'Estonia': 'EE', 'Latvia': 'LV', 'Lithuania': 'LT',
  'Cyprus': 'CY', 'Malta': 'MT', 'Iceland': 'IS',
};

function getCountryCode(country: string): string {
  return COUNTRY_CODE_MAP[country] || country?.substring(0, 2).toUpperCase() || 'XX';
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'FRAGMA-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function determineInvestorType(submission: any): InvestorType {
  const status = submission.investorStatus?.toLowerCase();
  if (status === 'professional') return 'PROFESSIONAL';
  if (status === 'qualified') return 'QUALIFIED';
  if (status === 'accredited') return 'ACCREDITED';
  
  // Check tags
  if (submission.tags.includes('PROFESSIONAL')) return 'PROFESSIONAL';
  if (submission.tags.includes('QUALIFIED')) return 'QUALIFIED';
  if (submission.tags.includes('ACCREDITED')) return 'ACCREDITED';
  
  return 'RETAIL';
}

function determineComplianceStatus(submission: any): ComplianceStatus {
  if (submission.tags.includes('APPROVED')) return 'APPROVED';
  if (submission.tags.includes('REJECTED')) return 'REJECTED';
  if (submission.tags.includes('REQUIRES_DOCS')) return 'REQUIRES_DOCUMENTS';
  if (submission.tags.includes('SUSPENDED')) return 'SUSPENDED';
  return 'PENDING_REVIEW';
}

async function migrateEarlyAccessUsers() {
  console.log('🚀 Starting Early Access Users Migration...\n');

  // Get all early access submissions
  const submissions = await prisma.earlyAccessSubmission.findMany({
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${submissions.length} Early Access submissions to process.\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const submission of submissions) {
    try {
      // Check if user already exists by email
      const existingUser = await prisma.user.findUnique({
        where: { email: submission.email },
      });

      if (existingUser) {
        // Link the submission to existing user if not already linked
        if (!submission.userId) {
          await prisma.earlyAccessSubmission.update({
            where: { id: submission.id },
            data: { userId: existingUser.id },
          });
          console.log(`  ⏭️  Linked existing user: ${submission.email}`);
        } else {
          console.log(`  ⏭️  Already linked: ${submission.email}`);
        }
        skipped++;
        continue;
      }

      // Generate unique referral code
      let referralCode = generateReferralCode();
      let attempts = 0;
      while (attempts < 5) {
        const exists = await prisma.user.findUnique({ where: { referralCode } });
        if (!exists) break;
        referralCode = generateReferralCode();
        attempts++;
      }

      // Parse full name
      const nameParts = submission.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || null;

      // Create user without clerkUserId (will be set when they sign up with Clerk)
      const newUser = await prisma.user.create({
        data: {
          // Generate a temporary clerkUserId (will be replaced on Clerk signup)
          clerkUserId: `pending_${submission.id}`,
          email: submission.email,
          emailVerified: false,
          
          // Personal info
          firstName,
          lastName,
          fullName: submission.fullName,
          
          // Location
          country: getCountryCode(submission.country),
          countryName: submission.country,
          city: submission.city,
          
          // Investor classification
          registeringAs: submission.registeringAs || 'individual',
          entityName: submission.entityName,
          investorType: determineInvestorType(submission),
          investorStatus: submission.investorStatus,
          
          // Compliance
          complianceStatus: determineComplianceStatus(submission),
          
          // Risk & PEP
          isPep: submission.isPep || false,
          isSanctioned: submission.isSanctioned || false,
          
          // Financial profile
          annualIncome: submission.annualIncome,
          investableCapital: submission.investableCapital,
          isUsPerson: submission.isUsPerson || false,
          
          // EU/US qualifications
          euProfessionalQualifications: submission.euProfessionalQualifications || [],
          euQualificationsCount: submission.euQualificationsCount,
          usAccreditedQualifications: submission.usAccreditedQualifications || [],
          
          // Investment preferences
          investmentHorizon: submission.investmentHorizon,
          preferredTicketSize: submission.preferredTicketSize,
          investmentPriorities: submission.investmentPriorities || [],
          assetInterests: submission.assetInterests || [],
          
          // Contact preferences
          preferredContactChannel: submission.preferredContactChannel,
          marketingConsent: submission.marketingConsent || false,
          consentToContact: submission.consentToContact || false,
          
          // Membership
          referralCode,
          
          // Timestamps
          createdAt: submission.createdAt,
        },
      });

      // Link submission to user
      await prisma.earlyAccessSubmission.update({
        where: { id: submission.id },
        data: { userId: newUser.id },
      });

      // Create default wallet
      await prisma.wallet.create({
        data: {
          userId: newUser.id,
          type: 'FIAT',
          currency: 'EUR',
          balance: 0,
          pendingBalance: 0,
        },
      });

      console.log(`  ✅ Created user: ${submission.email} (${newUser.id})`);
      created++;

    } catch (error: any) {
      console.error(`  ❌ Error processing ${submission.email}: ${error.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary:');
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('='.repeat(50));

  // Get total user count
  const totalUsers = await prisma.user.count();
  console.log(`\n📈 Total users in database: ${totalUsers}`);
}

// Run the migration
migrateEarlyAccessUsers()
  .then(() => {
    console.log('\n✨ Migration completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  });
