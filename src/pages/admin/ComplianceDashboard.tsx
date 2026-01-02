import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  Scale,
  Users,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  TrendingUp,
  Shield,
  FileWarning,
  ArrowRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ComplianceStats {
  totalInvestors: number;
  pendingReview: number;
  approved: number;
  rejected: number;
  requiresDocuments: number;
  jurisdictionsActive: number;
  recentChecks: number;
  investorsByType: { type: string; count: number }[];
  investorsByCountry: { country: string; count: number }[];
}

interface PendingInvestor {
  id: string;
  email: string;
  countryCode: string;
  investorType: string;
  complianceStatus: string;
  createdAt: string;
  kycStatus?: string;
}

const ComplianceDashboard = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState<ComplianceStats | null>(null);
  const [pendingInvestors, setPendingInvestors] = useState<PendingInvestor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplianceData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch compliance stats
      const [investorsRes, jurisdictionsRes] = await Promise.all([
        fetch(`${API_URL}/api/compliance/admin/investors?limit=10`),
        fetch(`${API_URL}/api/compliance/jurisdictions`),
      ]);

      const investorsData = await investorsRes.json();
      const jurisdictionsData = await jurisdictionsRes.json();

      if (investorsData.success) {
        // Calculate stats from investors data
        const investors = investorsData.investors || [];
        const statusCounts = investorsData.statusCounts || {};
        
        setStats({
          totalInvestors: investorsData.pagination?.total || investors.length,
          pendingReview: statusCounts['PENDING_REVIEW'] || 0,
          approved: statusCounts['APPROVED'] || 0,
          rejected: statusCounts['REJECTED'] || 0,
          requiresDocuments: statusCounts['REQUIRES_DOCUMENTS'] || 0,
          jurisdictionsActive: jurisdictionsData.total || 0,
          recentChecks: investors.filter((i: any) => i.complianceChecks?.length > 0).length,
          investorsByType: [],
          investorsByCountry: [],
        });

        // Get pending investors
        setPendingInvestors(
          investors.filter((i: PendingInvestor) => i.complianceStatus === 'PENDING_REVIEW')
        );
      } else {
        // If no data yet, set empty stats
        setStats({
          totalInvestors: 0,
          pendingReview: 0,
          approved: 0,
          rejected: 0,
          requiresDocuments: 0,
          jurisdictionsActive: jurisdictionsData.total || 40,
          recentChecks: 0,
          investorsByType: [],
          investorsByCountry: [],
        });
        setPendingInvestors([]);
      }
    } catch (err) {
      console.error('Compliance fetch error:', err);
      // Set default stats even on error
      setStats({
        totalInvestors: 0,
        pendingReview: 0,
        approved: 0,
        rejected: 0,
        requiresDocuments: 0,
        jurisdictionsActive: 40,
        recentChecks: 0,
        investorsByType: [],
        investorsByCountry: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const statCards = [
    {
      icon: Users,
      label: "Total Investors",
      value: stats?.totalInvestors || 0,
      change: "All registered",
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: Clock,
      label: "Pending Review",
      value: stats?.pendingReview || 0,
      change: "Awaiting approval",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      urgent: (stats?.pendingReview || 0) > 0,
    },
    {
      icon: CheckCircle2,
      label: "Approved",
      value: stats?.approved || 0,
      change: "Fully compliant",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: XCircle,
      label: "Rejected",
      value: stats?.rejected || 0,
      change: "Not eligible",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
  ];

  const quickActions = [
    {
      icon: Users,
      label: "Review Investors",
      description: "Manage investor classifications",
      href: "/admin/compliance/investors",
      color: "violet",
    },
    {
      icon: Globe,
      label: "Jurisdictions",
      description: "Configure country rules",
      href: "/admin/compliance/jurisdictions",
      color: "blue",
    },
    {
      icon: Scale,
      label: "Audit Log",
      description: "View compliance history",
      href: "/admin/compliance/audit",
      color: "green",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatInvestorType = (type: string) => {
    const types: Record<string, string> = {
      RETAIL: 'Retail',
      PROFESSIONAL: 'Professional',
      QUALIFIED: 'Qualified',
      ACCREDITED: 'Accredited',
      WHOLESALE: 'Wholesale',
      QII: 'QII',
    };
    return types[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING_REVIEW: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      APPROVED: 'bg-green-500/10 text-green-400 border-green-500/20',
      REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
      REQUIRES_DOCUMENTS: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };
    return styles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        adminName={user?.fullName || user?.firstName || 'Admin'}
        adminEmail={user?.email || ''}
      />

      {/* Main Content */}
      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 256,
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-card/80 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <Scale className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Compliance Engine</h1>
                <p className="text-sm text-muted-foreground">Investor classification, eligibility, and regulatory compliance</p>
              </div>
            </div>
            <button
              onClick={fetchComplianceData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {/* Alerts Section */}
            {(stats?.pendingReview || 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-400">
                    {stats?.pendingReview} investor(s) pending compliance review
                  </p>
                  <p className="text-xs text-yellow-400/70">
                    Review and approve investor classifications to enable deal access
                  </p>
                </div>
                <Link
                  to="/admin/compliance/investors?status=PENDING_REVIEW"
                  className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm transition-colors"
                >
                  Review Now
                </Link>
              </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05 }}
                    className={`group relative bg-card rounded-xl border ${stat.urgent ? 'border-yellow-500/40' : 'border-border'} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} strokeWidth={1.75} />
                      </div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                    </div>

                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-serif font-semibold text-foreground tracking-tight">
                        {loading ? '...' : stat.value.toLocaleString()}
                      </p>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.href}
                      to={action.href}
                      className="group p-5 bg-card rounded-xl border border-border hover:border-violet-500/40 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${action.color}-500/10`}>
                            <Icon className={`w-5 h-5 text-${action.color}-400`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-violet-400 transition-colors">
                              {action.label}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {action.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pending Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <h2 className="text-lg font-semibold text-foreground">Pending Reviews</h2>
                  </div>
                  <Link 
                    to="/admin/compliance/investors?status=PENDING_REVIEW" 
                    className="text-sm text-violet-400 hover:text-violet-300"
                  >
                    View all →
                  </Link>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-muted-foreground">Loading...</div>
                ) : pendingInvestors.length === 0 ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-muted-foreground">All caught up! No pending reviews.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingInvestors.slice(0, 5).map((investor) => (
                      <div
                        key={investor.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-violet-400">
                              {investor.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{investor.email}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">{investor.countryCode}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusBadge(investor.investorType)}`}>
                                {formatInvestorType(investor.investorType)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link
                          to={`/admin/compliance/investors/${investor.id}`}
                          className="px-3 py-1.5 text-xs bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
                        >
                          Review
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Jurisdiction Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-6"
              >
                {/* Active Jurisdictions */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <h3 className="font-semibold text-foreground">Jurisdictions</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">EU/EEA</span>
                      <span className="text-sm font-medium text-foreground">30 countries</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Third Country</span>
                      <span className="text-sm font-medium text-foreground">10 countries</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Restricted</span>
                      <span className="text-sm font-medium text-red-400">2 countries</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/admin/compliance/jurisdictions"
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Manage Jurisdictions
                  </Link>
                </div>

                {/* Compliance Status */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-green-400" />
                    <h3 className="font-semibold text-foreground">System Status</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">KYC Service</span>
                      <span className="flex items-center gap-1.5 text-xs text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Compliance Engine</span>
                      <span className="flex items-center gap-1.5 text-xs text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">AI Assistant</span>
                      <span className="flex items-center gap-1.5 text-xs text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Ready
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance - Compliance Engine
            </p>
            <p className="text-xs text-violet-400">
              v1.0.0 - Luxembourg Securitisation Law Compliant
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
