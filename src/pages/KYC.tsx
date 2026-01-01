import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KYCVerification } from "@/components/kyc/KYCVerification";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useKYC } from "@/contexts/KYCContext";

const KYC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { kycStatus, refreshKycStatus } = useKYC();
  const navigate = useNavigate();

  // Generate a user ID - use Clerk user ID if available, otherwise generate from email
  const userId = user?.id || (user?.email ? `user-${user.email.replace(/[^a-zA-Z0-9]/g, '-')}` : 'demo-user');
  const userEmail = user?.email || 'demo@fragma.io';

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Redirect verified users to dashboard - they don't need to see this page
    if (kycStatus === 'approved') {
      navigate('/dashboard', { replace: true });
      return;
    }
  }, [isLoading, isAuthenticated, navigate, kycStatus]);

  const handleStartKYC = () => {
    setShowVerification(true);
  };

  const handleKYCComplete = async () => {
    setShowVerification(false);
    // Refresh the global KYC context status
    await refreshKycStatus();
    // Refresh again after a delay in case Sumsub needs time to update
    setTimeout(refreshKycStatus, 3000);
  };

  const handleKYCError = (error: string) => {
    console.error('KYC Error:', error);
  };

  const renderStatusCard = () => {
    switch (kycStatus) {
      case 'loading':
        return (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          </div>
        );

      case 'approved':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-serif text-foreground mb-2">Identity Verified</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Your identity has been successfully verified. You now have full access to all investment opportunities.
            </p>
            <Button
              onClick={async () => {
                // Refresh KYC status before navigating to ensure sidebar unlocks
                await refreshKycStatus();
                navigate('/dashboard');
              }}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 'pending':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
              <Clock className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-serif text-foreground mb-2">Verification In Progress</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Your documents are being reviewed. This usually takes a few minutes but can take up to 24 hours.
            </p>
            <Button
              variant="outline"
              onClick={refreshKycStatus}
              className="border-violet-200 text-violet-700 hover:bg-violet-50"
            >
              Check Status
            </Button>
          </motion.div>
        );

      case 'rejected':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-serif text-foreground mb-2">Verification Failed</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Unfortunately, we couldn't verify your identity. Please try again with clearer documents.
            </p>
            <Button
              onClick={handleStartKYC}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Try Again
            </Button>
          </motion.div>
        );

      case 'retry':
      case 'not_started':
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 mb-6">
              <Shield className="w-10 h-10 text-violet-600" />
            </div>
            <h2 className="text-2xl font-serif text-foreground mb-2">Verify Your Identity</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              To invest on Fragma Society, we need to verify your identity. This is a one-time process that takes about 5 minutes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-2xl mb-2">📄</div>
                <h3 className="font-medium text-foreground text-sm">ID Document</h3>
                <p className="text-xs text-muted-foreground">Passport or national ID</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-2xl mb-2">🤳</div>
                <h3 className="font-medium text-foreground text-sm">Selfie</h3>
                <p className="text-xs text-muted-foreground">Take a quick photo</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-2xl mb-2">✅</div>
                <h3 className="font-medium text-foreground text-sm">Verification</h3>
                <p className="text-xs text-muted-foreground">Instant verification</p>
              </div>
            </div>

            <Button
              onClick={handleStartKYC}
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8"
            >
              Start Verification
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 256,
        }}
      >
        <DashboardHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} hideWalletBanner={true} />
        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1000px]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-serif text-foreground">
                Identity Verification
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Complete your KYC to unlock full platform access
              </p>
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
            >
              {showVerification ? (
                <div className="p-6">
                  <KYCVerification
                    userId={userId}
                    email={userEmail}
                    onComplete={handleKYCComplete}
                    onError={handleKYCError}
                  />
                </div>
              ) : (
                renderStatusCard()
              )}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-6"
            >
              <h3 className="font-medium text-foreground mb-3">Why do we need this?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Regulatory Compliance:</strong> As a regulated platform, we're required to verify all investors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Fraud Prevention:</strong> KYC helps protect you and other investors from fraud.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Secure Transactions:</strong> Verified identity ensures secure fund transfers and ownership.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KYC;
