import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  Mail, 
  TrendingUp, 
  Calendar,
  Globe,
  Briefcase,
  RefreshCw,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface DashboardStats {
  totalSubmissions: number;
  totalNewsletterSubscribers: number;
  submissionsToday: number;
  submissionsThisWeek: number;
  countryDistribution: { country: string; count: number }[];
  investorTypeDistribution: { type: string; count: number }[];
}

interface RecentSubmission {
  id: string;
  fullName: string;
  email: string;
  country: string;
  registeringAs: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/admin/dashboard/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setRecentSubmissions(data.recentSubmissions);
      } else {
        setError(data.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      icon: Users,
      label: "Total Submissions",
      value: stats?.totalSubmissions || 0,
      change: `+${stats?.submissionsThisWeek || 0} this week`,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: Mail,
      label: "Newsletter Subscribers",
      value: stats?.totalNewsletterSubscribers || 0,
      change: "Active subscribers",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      label: "Today's Submissions",
      value: stats?.submissionsToday || 0,
      change: "Last 24 hours",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Calendar,
      label: "This Week",
      value: stats?.submissionsThisWeek || 0,
      change: "Last 7 days",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
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
      individual: 'Individual',
      company_spv: 'Company/SPV',
      fund_asset_manager: 'Fund/Asset Manager',
    };
    return types[type] || type;
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
            <div>
              <h1 className="text-xl font-serif font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Overview of early access submissions and analytics</p>
            </div>
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors disabled:opacity-50 font-medium text-sm"
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
                    className="group relative bg-card rounded-xl border border-border p-6 shadow-sm hover:border-violet-500/40 hover:shadow-md transition-all duration-300"
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

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Submissions */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Recent Submissions</h2>
                    <a href="/admin/submissions" className="text-sm text-violet-400 hover:text-violet-300">
                      View all →
                    </a>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-muted-foreground">
                              Loading...
                            </td>
                          </tr>
                        ) : recentSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-muted-foreground">
                              No submissions yet
                            </td>
                          </tr>
                        ) : (
                          recentSubmissions.map((submission) => (
                            <tr key={submission.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                              <td className="py-3 px-4 text-sm font-medium text-foreground">{submission.fullName}</td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">{submission.email}</td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">{submission.country}</td>
                              <td className="py-3 px-4">
                                <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400">
                                  {formatInvestorType(submission.registeringAs)}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(submission.createdAt)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>

              {/* Distribution Charts */}
              <div className="space-y-6">
                {/* Country Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4 text-violet-400" />
                    <h3 className="font-semibold text-foreground">Top Countries</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {loading ? (
                      <p className="text-muted-foreground text-sm">Loading...</p>
                    ) : stats?.countryDistribution?.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No data yet</p>
                    ) : (
                      stats?.countryDistribution?.slice(0, 5).map((item, index) => (
                        <div key={item.country} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-4">{index + 1}.</span>
                            <span className="text-sm text-foreground">{item.country}</span>
                          </div>
                          <span className="text-sm font-medium text-violet-400">{item.count}</span>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>

                {/* Investor Type Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <h3 className="font-semibold text-foreground">Investor Types</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {loading ? (
                      <p className="text-muted-foreground text-sm">Loading...</p>
                    ) : stats?.investorTypeDistribution?.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No data yet</p>
                    ) : (
                      stats?.investorTypeDistribution?.map((item) => (
                        <div key={item.type} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{formatInvestorType(item.type)}</span>
                          <span className="text-sm font-medium text-blue-400">{item.count}</span>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <nav className="flex items-center gap-8">
              <a
                href="/admin/settings"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Settings
              </a>
              <a
                href="/admin/users"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Admin Users
              </a>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
