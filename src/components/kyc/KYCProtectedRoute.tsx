import { useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useKYC } from '@/contexts/KYCContext';

interface KYCProtectedRouteProps {
  children: ReactNode;
}

// Pages that don't require KYC verification
const KYC_EXEMPT_PATHS = [
  '/dashboard/kyc',
  '/auth',
  '/admin',
  '/admin/login',
  '/', // Landing page
];

export function KYCProtectedRoute({ children }: KYCProtectedRouteProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { kycStatus, isKycApproved, isKycLoading } = useKYC();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path is exempt from KYC
  const isExemptPath = KYC_EXEMPT_PATHS.some(path => 
    location.pathname === path || location.pathname.startsWith('/admin')
  );

  useEffect(() => {
    // If authenticated, not on exempt path, not loading, and KYC not approved -> redirect
    if (isAuthenticated && !isExemptPath && !isKycLoading && !isKycApproved) {
      navigate('/dashboard/kyc', { replace: true });
    }
  }, [isAuthenticated, isExemptPath, isKycLoading, isKycApproved, navigate]);

  // Still loading auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // Not authenticated - let the page handle redirect to auth
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Exempt path - allow access
  if (isExemptPath) {
    return <>{children}</>;
  }

  // Checking KYC status
  if (isKycLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking verification status...</p>
        </div>
      </div>
    );
  }

  // KYC not approved - will redirect via useEffect
  if (!isKycApproved) {
    return null;
  }

  // KYC approved - allow access
  return <>{children}</>;
}
