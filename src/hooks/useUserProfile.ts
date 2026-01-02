/**
 * User Profile Hook
 * 
 * Fetches and manages user profile data from our backend API.
 * Ensures user is synced to database after Clerk authentication.
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '';

export interface UserProfile {
  id: string;
  clerkUserId: string;
  email: string;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  
  // Location
  country: string | null;
  countryName: string | null;
  city: string | null;
  
  // Investor info
  registeringAs: string;
  entityName: string | null;
  investorType: 'RETAIL' | 'PROFESSIONAL' | 'QUALIFIED' | 'ACCREDITED' | 'WHOLESALE' | 'QII';
  investorStatus: string | null;
  
  // KYC & Compliance
  kycStatus: 'PENDING' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  complianceStatus: string;
  
  // Financial
  annualIncome: string | null;
  investableCapital: string | null;
  isUsPerson: boolean;
  isPep: boolean;
  
  // Investment preferences
  investmentHorizon: string | null;
  preferredTicketSize: string | null;
  investmentPriorities: string[];
  assetInterests: string[];
  
  // Membership
  membershipTier: 'FREE' | 'BASIC' | 'PREMIUM' | 'VIP' | 'INSTITUTIONAL';
  referralCode: string | null;
  
  // Stats
  totalInvested: number;
  totalReturns: number;
  activeInvestments: number;
  completedInvestments: number;
  
  // Admin
  isAdmin: boolean;
  adminRole: string | null;
  
  // Timestamps
  createdAt: string;
  lastLoginAt: string | null;
  
  // Related data
  wallets?: Array<{
    id: string;
    type: string;
    currency: string;
    balance: number;
    pendingBalance: number;
  }>;
  investments?: Array<{
    id: string;
    amount: number;
    status: string;
    deal: {
      id: string;
      title: string;
      slug: string;
      category: string;
      bannerImage: string | null;
    };
  }>;
  _count?: {
    investments: number;
    orders: number;
    notifications: number;
  };
}

export interface UserStats {
  totalInvested: number;
  totalReturns: number;
  availableBalance: number;
  activeInvestments: number;
  completedInvestments: number;
  averageReturn: number;
}

interface UseUserProfileReturn {
  profile: UserProfile | null;
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
}

export function useUserProfile(): UseUserProfileReturn {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure user exists in our database
  const ensureUser = useCallback(async () => {
    if (!user?.id || !user?.email) return null;

    try {
      const response = await fetch(`${API_URL}/api/users/ensure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkUserId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        }),
      });

      if (!response.ok) {
        console.warn('Failed to ensure user:', await response.text());
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (err) {
      console.error('Error ensuring user:', err);
      return null;
    }
  }, [user]);

  // Fetch full user profile
  const fetchProfile = useCallback(async () => {
    if (!user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First ensure user exists
      await ensureUser();

      // Then fetch full profile
      const response = await fetch(
        `${API_URL}/api/users/me?clerkUserId=${user.id}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          // User not found, try to create
          await ensureUser();
          setError(null);
        } else {
          throw new Error('Failed to fetch profile');
        }
        return;
      }

      const data = await response.json();
      if (data.success && data.user) {
        setProfile(data.user);
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, ensureUser]);

  // Fetch user stats
  const fetchStats = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(
        `${API_URL}/api/users/me/stats?clerkUserId=${user.id}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, [user]);

  // Update user profile
  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const response = await fetch(
        `${API_URL}/api/users/me?clerkUserId=${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      if (data.success && data.user) {
        setProfile(data.user);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message);
      return false;
    }
  }, [user]);

  // Refetch all data
  const refetch = useCallback(async () => {
    await Promise.all([fetchProfile(), fetchStats()]);
  }, [fetchProfile, fetchStats]);

  // Initial fetch when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchProfile();
      fetchStats();
    } else {
      setProfile(null);
      setStats(null);
      setLoading(false);
    }
  }, [isAuthenticated, user?.id, fetchProfile, fetchStats]);

  return {
    profile,
    stats,
    loading,
    error,
    refetch,
    updateProfile,
  };
}

export default useUserProfile;
