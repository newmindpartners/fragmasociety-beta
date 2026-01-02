/**
 * Clerk Webhook Sync Service
 * 
 * Handles synchronization of Clerk user data with our database
 */

import { prisma } from '../db/prisma.js';
import { KYCStatus, ComplianceStatus, InvestorType, MembershipTier } from '@prisma/client';
import crypto from 'crypto';

// Clerk webhook event types
export type ClerkWebhookEvent = 
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'session.created'
  | 'session.ended';

// Clerk user data structure
export interface ClerkUserData {
  id: string;
  email_addresses: Array<{
    id: string;
    email_address: string;
    verification: { status: string };
  }>;
  primary_email_address_id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  phone_numbers: Array<{
    id: string;
    phone_number: string;
    verification: { status: string };
  }>;
  primary_phone_number_id: string | null;
  created_at: number;
  updated_at: number;
  last_sign_in_at: number | null;
  public_metadata: Record<string, any>;
  private_metadata: Record<string, any>;
  unsafe_metadata: Record<string, any>;
}

/**
 * Verify Clerk webhook signature
 */
export function verifyClerkWebhook(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    // Clerk uses Svix for webhooks
    // The signature header is in format: v1,timestamp,signature
    const parts = signature.split(',');
    if (parts.length < 3) return false;

    const timestamp = parts[1];
    const sig = parts[2];

    // Create the signed payload
    const signedPayload = `${timestamp}.${payload}`;

    // Calculate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');

    return sig === expectedSignature;
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

/**
 * Get primary email from Clerk user data
 */
function getPrimaryEmail(userData: ClerkUserData): string | null {
  const primaryEmailObj = userData.email_addresses.find(
    e => e.id === userData.primary_email_address_id
  );
  return primaryEmailObj?.email_address || null;
}

/**
 * Get primary phone from Clerk user data
 */
function getPrimaryPhone(userData: ClerkUserData): string | null {
  if (!userData.primary_phone_number_id) return null;
  const primaryPhoneObj = userData.phone_numbers.find(
    p => p.id === userData.primary_phone_number_id
  );
  return primaryPhoneObj?.phone_number || null;
}

/**
 * Generate a unique referral code
 */
function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'FRAGMA-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a new user from Clerk data
 */
export async function createUserFromClerk(userData: ClerkUserData) {
  const email = getPrimaryEmail(userData);
  if (!email) {
    throw new Error('No email found in Clerk user data');
  }

  const phone = getPrimaryPhone(userData);
  const fullName = [userData.first_name, userData.last_name].filter(Boolean).join(' ') || null;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userData.id },
  });

  if (existingUser) {
    console.log(`User already exists: ${userData.id}`);
    return existingUser;
  }

  // Check if there's an early access submission for this email
  const earlyAccessSubmission = await prisma.earlyAccessSubmission.findFirst({
    where: { email: email },
    orderBy: { createdAt: 'desc' },
  });

  // Generate referral code
  let referralCode = generateReferralCode();
  let attempts = 0;
  while (attempts < 5) {
    const exists = await prisma.user.findUnique({ where: { referralCode } });
    if (!exists) break;
    referralCode = generateReferralCode();
    attempts++;
  }

  // Determine initial investor type from early access
  let investorType: InvestorType = 'RETAIL';
  if (earlyAccessSubmission?.investorStatus === 'professional') {
    investorType = 'PROFESSIONAL';
  } else if (earlyAccessSubmission?.investorStatus === 'qualified') {
    investorType = 'QUALIFIED';
  }

  // Create the user
  const newUser = await prisma.user.create({
    data: {
      clerkUserId: userData.id,
      email,
      emailVerified: userData.email_addresses.some(
        e => e.id === userData.primary_email_address_id && e.verification?.status === 'verified'
      ),
      firstName: userData.first_name,
      lastName: userData.last_name,
      fullName,
      avatarUrl: userData.image_url,
      phone,
      phoneVerified: userData.phone_numbers.some(
        p => p.id === userData.primary_phone_number_id && p.verification?.status === 'verified'
      ),
      
      // From early access submission (if exists)
      country: earlyAccessSubmission?.country || null,
      city: earlyAccessSubmission?.city || null,
      registeringAs: earlyAccessSubmission?.registeringAs || 'individual',
      entityName: earlyAccessSubmission?.entityName || null,
      investorType,
      investorStatus: earlyAccessSubmission?.investorStatus || null,
      
      // Financial profile from early access
      annualIncome: earlyAccessSubmission?.annualIncome || null,
      investableCapital: earlyAccessSubmission?.investableCapital || null,
      isUsPerson: earlyAccessSubmission?.isUsPerson || false,
      isPep: earlyAccessSubmission?.isPep || false,
      isSanctioned: earlyAccessSubmission?.isSanctioned || false,
      
      // Investment preferences
      investmentHorizon: earlyAccessSubmission?.investmentHorizon || null,
      preferredTicketSize: earlyAccessSubmission?.preferredTicketSize || null,
      investmentPriorities: earlyAccessSubmission?.investmentPriorities || [],
      assetInterests: earlyAccessSubmission?.assetInterests || [],
      
      // Contact preferences
      preferredContactChannel: earlyAccessSubmission?.preferredContactChannel || null,
      marketingConsent: earlyAccessSubmission?.marketingConsent || false,
      consentToContact: earlyAccessSubmission?.consentToContact || false,
      
      // EU/US qualifications
      euProfessionalQualifications: earlyAccessSubmission?.euProfessionalQualifications || [],
      euQualificationsCount: earlyAccessSubmission?.euQualificationsCount || null,
      usAccreditedQualifications: earlyAccessSubmission?.usAccreditedQualifications || [],
      
      // Referral
      referralCode,
      
      // Metadata
      lastLoginAt: userData.last_sign_in_at 
        ? new Date(userData.last_sign_in_at) 
        : new Date(),
      
      // Admin from Clerk metadata
      isAdmin: userData.public_metadata?.role === 'admin' || 
               userData.public_metadata?.role === 'super_admin',
    },
  });

  // Link early access submission to user
  if (earlyAccessSubmission) {
    await prisma.earlyAccessSubmission.update({
      where: { id: earlyAccessSubmission.id },
      data: { userId: newUser.id },
    });
  }

  // Create default EUR wallet
  await prisma.wallet.create({
    data: {
      userId: newUser.id,
      type: 'FIAT',
      currency: 'EUR',
      balance: 0,
      pendingBalance: 0,
    },
  });

  console.log(`Created new user: ${newUser.id} (${email})`);
  return newUser;
}

/**
 * Update existing user from Clerk data
 */
export async function updateUserFromClerk(userData: ClerkUserData) {
  const email = getPrimaryEmail(userData);
  if (!email) {
    throw new Error('No email found in Clerk user data');
  }

  const phone = getPrimaryPhone(userData);
  const fullName = [userData.first_name, userData.last_name].filter(Boolean).join(' ') || null;

  // Find existing user
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userData.id },
  });

  if (!existingUser) {
    // User doesn't exist, create them
    return createUserFromClerk(userData);
  }

  // Update the user
  const updatedUser = await prisma.user.update({
    where: { clerkUserId: userData.id },
    data: {
      email,
      emailVerified: userData.email_addresses.some(
        e => e.id === userData.primary_email_address_id && e.verification?.status === 'verified'
      ),
      firstName: userData.first_name,
      lastName: userData.last_name,
      fullName,
      avatarUrl: userData.image_url,
      phone,
      phoneVerified: userData.phone_numbers.some(
        p => p.id === userData.primary_phone_number_id && p.verification?.status === 'verified'
      ),
      
      // Admin from Clerk metadata
      isAdmin: userData.public_metadata?.role === 'admin' || 
               userData.public_metadata?.role === 'super_admin',
    },
  });

  console.log(`Updated user: ${updatedUser.id} (${email})`);
  return updatedUser;
}

/**
 * Handle user deletion from Clerk
 */
export async function deleteUserFromClerk(userData: { id: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userData.id },
  });

  if (!existingUser) {
    console.log(`User not found for deletion: ${userData.id}`);
    return null;
  }

  // Soft delete - mark as inactive and banned
  const deletedUser = await prisma.user.update({
    where: { clerkUserId: userData.id },
    data: {
      isActive: false,
      isBanned: true,
      banReason: 'Account deleted from Clerk',
    },
  });

  console.log(`Soft deleted user: ${deletedUser.id}`);
  return deletedUser;
}

/**
 * Update user's last login timestamp
 */
export async function updateUserLastLogin(clerkUserId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      console.log(`User not found for login update: ${clerkUserId}`);
      return null;
    }

    const updatedUser = await prisma.user.update({
      where: { clerkUserId },
      data: {
        lastLoginAt: new Date(),
        lastActivityAt: new Date(),
      },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating last login:', error);
    return null;
  }
}

/**
 * Sync user from Clerk ID (for manual sync)
 */
export async function syncUserFromClerkId(clerkUserId: string) {
  // This would typically call Clerk API to get user data
  // For now, we'll just check if user exists
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  return user;
}

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkUserId: string) {
  return prisma.user.findUnique({
    where: { clerkUserId },
    include: {
      wallets: true,
      investments: {
        include: { deal: true },
      },
    },
  });
}

/**
 * Get or create user from Clerk ID
 */
export async function getOrCreateUser(clerkUserId: string, email: string, userData?: Partial<ClerkUserData>) {
  let user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    // Create minimal user
    const referralCode = generateReferralCode();
    
    user = await prisma.user.create({
      data: {
        clerkUserId,
        email,
        referralCode,
        firstName: userData?.first_name || null,
        lastName: userData?.last_name || null,
        fullName: userData?.first_name && userData?.last_name 
          ? `${userData.first_name} ${userData.last_name}` 
          : null,
        avatarUrl: userData?.image_url || null,
      },
    });

    // Create default wallet
    await prisma.wallet.create({
      data: {
        userId: user.id,
        type: 'FIAT',
        currency: 'EUR',
      },
    });
  }

  return user;
}

export const clerkSyncService = {
  verifyClerkWebhook,
  createUserFromClerk,
  updateUserFromClerk,
  deleteUserFromClerk,
  updateUserLastLogin,
  syncUserFromClerkId,
  getUserByClerkId,
  getOrCreateUser,
};
