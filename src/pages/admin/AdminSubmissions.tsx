import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Submission {
  id: string;
  fullName: string;
  email: string;
  country: string;
  city?: string;
  registeringAs: string;
  entityName?: string;
  isUsPerson?: boolean;
  investorStatus?: string;
  investableCapital?: string;
  preferredTicketSize?: string;
  investmentHorizon?: string;
  tags: string[];
  createdAt: string;
  kycStatus?: 'not_started' | 'pending' | 'approved' | 'rejected' | 'retry' | 'error';
  kycVerified?: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const AdminSubmissions = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [includeKyc, setIncludeKyc] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const fetchSubmissions = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        search,
        includeKyc: includeKyc.toString(),
      });
      
      const response = await fetch(`${API_URL}/api/admin/submissions?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.submissions);
        setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch submissions');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Fetch submissions error:', err);
    } finally {
      setLoading(false);
    }
  }, [search, includeKyc]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
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

  const getKycStatusBadge = (status?: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case 'retry':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            Retry
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-500/10 text-gray-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-500/10 text-slate-400 text-xs">
            Not Started
          </span>
        );
    }
  };

  const exportToCsv = () => {
    const headers = ['Name', 'Email', 'Country', 'City', 'Type', 'Entity', 'KYC Status', 'Registered At'];
    const rows = submissions.map(s => [
      s.fullName,
      s.email,
      s.country,
      s.city || '',
      formatInvestorType(s.registeringAs),
      s.entityName || '',
      s.kycStatus || 'not_started',
      formatDate(s.createdAt),
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `early-access-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
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
              <Users className="w-6 h-6 text-violet-400" />
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Early Access Users</h1>
                <p className="text-sm text-muted-foreground">
                  {pagination.total} registered users
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToCsv}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => fetchSubmissions(pagination.page)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {/* Search and Filters */}
            <div className="bg-card rounded-xl border border-border p-4 mb-6">
              <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, or country..."
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeKyc}
                    onChange={(e) => setIncludeKyc(e.target.checked)}
                    className="rounded border-border text-violet-600 focus:ring-violet-500"
                  />
                  Include KYC Status
                </label>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
                >
                  Search
                </button>
              </form>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">User</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Investment</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">KYC Status</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Registered</th>
                      <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-muted-foreground">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                          Loading users...
                        </td>
                      </tr>
                    ) : submissions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-muted-foreground">
                          No submissions found
                        </td>
                      </tr>
                    ) : (
                      submissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-foreground">{submission.fullName}</p>
                              <p className="text-sm text-muted-foreground">{submission.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-sm text-foreground">{submission.country}</p>
                              {submission.city && (
                                <p className="text-xs text-muted-foreground">{submission.city}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400">
                              {formatInvestorType(submission.registeringAs)}
                            </span>
                            {submission.entityName && (
                              <p className="text-xs text-muted-foreground mt-1">{submission.entityName}</p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm">
                              {submission.investableCapital && (
                                <p className="text-foreground">{submission.investableCapital}</p>
                              )}
                              {submission.preferredTicketSize && (
                                <p className="text-xs text-muted-foreground">{submission.preferredTicketSize}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getKycStatusBadge(submission.kycStatus)}
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {formatDate(submission.createdAt)}
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => setSelectedSubmission(submission)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fetchSubmissions(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => fetchSubmissions(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-xl border border-border shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">User Details</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Full Name</label>
                    <p className="text-foreground font-medium">{selectedSubmission.fullName}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Email</label>
                    <p className="text-foreground">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Country</label>
                    <p className="text-foreground">{selectedSubmission.country}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">City</label>
                    <p className="text-foreground">{selectedSubmission.city || '-'}</p>
                  </div>
                </div>

                {/* Investor Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Registering As</label>
                    <p className="text-foreground">{formatInvestorType(selectedSubmission.registeringAs)}</p>
                  </div>
                  {selectedSubmission.entityName && (
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Entity Name</label>
                      <p className="text-foreground">{selectedSubmission.entityName}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">US Person</label>
                    <p className="text-foreground">{selectedSubmission.isUsPerson ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Investor Status</label>
                    <p className="text-foreground">{selectedSubmission.investorStatus || '-'}</p>
                  </div>
                </div>

                {/* Investment Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Investable Capital</label>
                    <p className="text-foreground">{selectedSubmission.investableCapital || '-'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Preferred Ticket Size</label>
                    <p className="text-foreground">{selectedSubmission.preferredTicketSize || '-'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Investment Horizon</label>
                    <p className="text-foreground">{selectedSubmission.investmentHorizon || '-'}</p>
                  </div>
                </div>

                {/* KYC Status */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <label className="text-xs text-muted-foreground uppercase">KYC Verification Status</label>
                  <div className="mt-2">
                    {getKycStatusBadge(selectedSubmission.kycStatus)}
                  </div>
                </div>

                {/* Tags */}
                {selectedSubmission.tags && selectedSubmission.tags.length > 0 && (
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Tags</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedSubmission.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-violet-500/10 text-violet-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div>
                  <label className="text-xs text-muted-foreground uppercase">Registered At</label>
                  <p className="text-foreground">{formatDate(selectedSubmission.createdAt)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance Admin Panel
            </p>
            <p className="text-xs text-violet-400">
              v1.0.0
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminSubmissions;
