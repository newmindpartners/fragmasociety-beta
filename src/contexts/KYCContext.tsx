import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getKycStatus } from '@/lib/api';

type KycStatusType = 'loading' | 'not_started' | 'pending' | 'approved' | 'rejected' | 'retry';

interface KYCContextType {
  kycStatus: KycStatusType;
  isKycApproved: boolean;
  isKycLoading: boolean;
  refreshKycStatus: () => Promise<void>;
}

const KYCContext = createContext<KYCContextType | undefined>(undefined);

export function KYCProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [kycStatus, setKycStatus] = useState<KycStatusType>('loading');

  const refreshKycStatus = useCallback(async () => {
    if (!user?.id) {
      setKycStatus('not_started');
      return;
    }

    try {
      setKycStatus('loading');
      const result = await getKycStatus(user.id);
      if (result.success) {
        setKycStatus(result.status);
      } else {
        setKycStatus('not_started');
      }
    } catch (error) {
      console.error('Error fetching KYC status:', error);
      setKycStatus('not_started');
    }
  }, [user?.id]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user?.id) {
      refreshKycStatus();
    } else if (!authLoading && !isAuthenticated) {
      setKycStatus('not_started');
    }
  }, [authLoading, isAuthenticated, user?.id, refreshKycStatus]);

  const value: KYCContextType = {
    kycStatus,
    isKycApproved: kycStatus === 'approved',
    isKycLoading: kycStatus === 'loading',
    refreshKycStatus,
  };

  return (
    <KYCContext.Provider value={value}>
      {children}
    </KYCContext.Provider>
  );
}

export function useKYC() {
  const context = useContext(KYCContext);
  if (context === undefined) {
    throw new Error('useKYC must be used within a KYCProvider');
  }
  return context;
}
