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
  // EU Professional qualifications
  euProfessionalQualifications?: string[];
  euQualificationsCount?: string;
  // US Accredited qualifications
  usAccreditedQualifications?: string[];
  // Financial info
  annualIncome?: string;
  investableCapital?: string;
  // PEP/Sanctions
  isPep?: boolean;
  isSanctioned?: boolean;
  // Investment preferences
  investmentAmount3to6Months?: string;
  preferredTicketSize?: string;
  investmentHorizon?: string;
  investmentPriorities?: string[];
  assetInterests?: string[];
  otherRwaDescription?: string;
  // Contact preferences
  preferredContactChannel?: string;
  phoneWhatsappNumber?: string;
  consentToContact?: boolean;
  marketingConsent?: boolean;
  // Metadata
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  // KYC
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
    const headers = [
      'Name', 'Email', 'Country', 'City', 'Type', 'Entity',
      'US Person', 'Investor Status', 'Annual Income', 'Investable Capital',
      'Preferred Ticket Size', 'Investment Horizon', '3-6 Month Investment',
      'EU Qualifications', 'US Accredited Qualifications',
      'Is PEP', 'Is Sanctioned',
      'Investment Priorities', 'Asset Interests', 'Other RWA',
      'Contact Channel', 'Phone/WhatsApp', 'Consent to Contact', 'Marketing Consent',
      'Tags', 'KYC Status', 'Registered At'
    ];
    const rows = submissions.map(s => [
      s.fullName,
      s.email,
      s.country,
      s.city || '',
      formatInvestorType(s.registeringAs),
      s.entityName || '',
      s.isUsPerson ? 'Yes' : 'No',
      s.investorStatus || '',
      s.annualIncome || '',
      s.investableCapital || '',
      s.preferredTicketSize || '',
      s.investmentHorizon || '',
      s.investmentAmount3to6Months || '',
      (s.euProfessionalQualifications || []).join('; '),
      (s.usAccreditedQualifications || []).join('; '),
      s.isPep ? 'Yes' : 'No',
      s.isSanctioned ? 'Yes' : 'No',
      (s.investmentPriorities || []).join('; '),
      (s.assetInterests || []).join('; '),
      s.otherRwaDescription || '',
      s.preferredContactChannel || '',
      s.phoneWhatsappNumber || '',
      s.consentToContact ? 'Yes' : 'No',
      s.marketingConsent ? 'Yes' : 'No',
      (s.tags || []).join('; '),
      s.kycStatus || 'not_started',
      formatDate(s.createdAt),
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
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
              className="bg-card rounded-xl border border-border shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 p-6 border-b border-border bg-card z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedSubmission.fullName}</h2>
                    <p className="text-sm text-muted-foreground">{selectedSubmission.email}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-8">
                {/* Section: Basic Info */}
                <div>
                  <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/20 rounded-lg p-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Full Name</label>
                      <p className="text-foreground font-medium">{selectedSubmission.fullName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Email</label>
                      <p className="text-foreground break-all">{selectedSubmission.email}</p>
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
                </div>

                {/* Section: Investor Classification */}
                <div>
                  <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">
                    Investor Classification
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-muted/20 rounded-lg p-4">
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
                      <p className={`font-medium ${selectedSubmission.isUsPerson ? 'text-amber-400' : 'text-green-400'}`}>
                        {selectedSubmission.isUsPerson ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Investor Status</label>
                      <p className="text-foreground capitalize">{selectedSubmission.investorStatus?.replace(/_/g, ' ') || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Annual Income</label>
                      <p className="text-foreground">{selectedSubmission.annualIncome?.replace(/_/g, ' - ') || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Section: EU Professional Qualifications */}
                {selectedSubmission.euProfessionalQualifications && selectedSubmission.euProfessionalQualifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-4">
                      EU Professional Qualifications
                    </h3>
                    <div className="bg-blue-500/10 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedSubmission.euProfessionalQualifications.map((qual, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                            {qual.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                      {selectedSubmission.euQualificationsCount && (
                        <p className="text-xs text-muted-foreground">
                          Qualifications met: {selectedSubmission.euQualificationsCount}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Section: US Accredited Qualifications */}
                {selectedSubmission.usAccreditedQualifications && selectedSubmission.usAccreditedQualifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-4">
                      US Accredited Investor Qualifications
                    </h3>
                    <div className="bg-amber-500/10 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.usAccreditedQualifications.map((qual, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
                            {qual.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Section: PEP & Sanctions */}
                <div>
                  <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-4">
                    Compliance Flags
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`rounded-lg p-4 ${selectedSubmission.isPep ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/10'}`}>
                      <label className="text-xs text-muted-foreground uppercase">Politically Exposed Person (PEP)</label>
                      <p className={`font-semibold ${selectedSubmission.isPep ? 'text-red-400' : 'text-green-400'}`}>
                        {selectedSubmission.isPep ? '⚠️ Yes - Requires Review' : '✓ No'}
                      </p>
                    </div>
                    <div className={`rounded-lg p-4 ${selectedSubmission.isSanctioned ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/10'}`}>
                      <label className="text-xs text-muted-foreground uppercase">Sanctioned</label>
                      <p className={`font-semibold ${selectedSubmission.isSanctioned ? 'text-red-400' : 'text-green-400'}`}>
                        {selectedSubmission.isSanctioned ? '🚫 Yes - BLOCKED' : '✓ No'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: Investment Preferences */}
                <div>
                  <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">
                    Investment Preferences
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/20 rounded-lg p-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Investable Capital</label>
                      <p className="text-foreground">{selectedSubmission.investableCapital?.replace(/_/g, ' - ') || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Preferred Ticket Size</label>
                      <p className="text-foreground">{selectedSubmission.preferredTicketSize?.replace(/_/g, ' - ') || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Investment Horizon</label>
                      <p className="text-foreground">{selectedSubmission.investmentHorizon?.replace(/_/g, ' ') || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">3-6 Month Investment</label>
                      <p className="text-foreground">{selectedSubmission.investmentAmount3to6Months?.replace(/_/g, ' - ') || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Investment Priorities */}
                {selectedSubmission.investmentPriorities && selectedSubmission.investmentPriorities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">
                      Investment Priorities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.investmentPriorities.map((priority, i) => (
                        <span key={i} className="px-3 py-1.5 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                          {priority.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Asset Interests */}
                {selectedSubmission.assetInterests && selectedSubmission.assetInterests.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">
                      Asset Class Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.assetInterests.map((asset, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-500/20 text-slate-300 rounded-full text-sm capitalize">
                          {asset.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                    {selectedSubmission.otherRwaDescription && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Other interests: {selectedSubmission.otherRwaDescription}
                      </p>
                    )}
                  </div>
                )}

                {/* Section: Contact Preferences */}
                <div>
                  <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">
                    Contact Preferences
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/20 rounded-lg p-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Preferred Channel</label>
                      <p className="text-foreground capitalize">{selectedSubmission.preferredContactChannel || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Phone/WhatsApp</label>
                      <p className="text-foreground">{selectedSubmission.phoneWhatsappNumber || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Consent to Contact</label>
                      <p className={selectedSubmission.consentToContact ? 'text-green-400' : 'text-muted-foreground'}>
                        {selectedSubmission.consentToContact ? '✓ Yes' : 'No'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Marketing Consent</label>
                      <p className={selectedSubmission.marketingConsent ? 'text-green-400' : 'text-muted-foreground'}>
                        {selectedSubmission.marketingConsent ? '✓ Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: KYC Status */}
                <div>
                  <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">
                    KYC Verification
                  </h3>
                  <div className="bg-muted/20 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      {getKycStatusBadge(selectedSubmission.kycStatus)}
                      <span className="text-sm text-muted-foreground">
                        {selectedSubmission.kycVerified ? 'Identity verified via Sumsub' : 'Verification pending or not started'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section: Tags */}
                {selectedSubmission.tags && selectedSubmission.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Timestamps */}
                <div className="border-t border-border pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Registered At</label>
                      <p className="text-foreground">{formatDate(selectedSubmission.createdAt)}</p>
                    </div>
                    {selectedSubmission.updatedAt && (
                      <div>
                        <label className="text-xs text-muted-foreground uppercase">Last Updated</label>
                        <p className="text-foreground">{formatDate(selectedSubmission.updatedAt)}</p>
                      </div>
                    )}
                  </div>
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
