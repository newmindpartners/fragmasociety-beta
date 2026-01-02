import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { 
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  FileWarning,
  RefreshCw,
  ChevronDown,
  Globe,
  Shield,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Investor {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  countryCode: string;
  investorType: string;
  complianceStatus: string;
  kycStatus?: string;
  riskScore?: number;
  totalAssets?: string;
  createdAt: string;
  lastReviewDate?: string;
  complianceChecks?: any[];
}

const INVESTOR_TYPES = ['RETAIL', 'PROFESSIONAL', 'QUALIFIED', 'ACCREDITED', 'WHOLESALE', 'QII'];
const COMPLIANCE_STATUSES = ['PENDING_REVIEW', 'APPROVED', 'REJECTED', 'REQUIRES_DOCUMENTS', 'SUSPENDED'];

const InvestorReview = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [typeFilter, setTypeFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  
  // Modal state
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchInvestors = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (typeFilter) params.append('investorType', typeFilter);
      if (countryFilter) params.append('countryCode', countryFilter);
      params.append('limit', '50');
      
      const response = await fetch(`${API_URL}/api/compliance/admin/investors?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setInvestors(data.investors || []);
        setTotalCount(data.pagination?.total || 0);
        setStatusCounts(data.statusCounts || {});
      } else {
        setInvestors([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Fetch investors error:', err);
      setError('Failed to load investors');
      setInvestors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, [statusFilter, typeFilter, countryFilter]);

  const handleStatusUpdate = async (investorId: string, newStatus: string, notes?: string) => {
    setActionLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/compliance/admin/investors/${investorId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          notes,
          reviewedBy: user?.email || 'admin',
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        fetchInvestors();
        setShowModal(false);
        setSelectedInvestor(null);
      } else {
        setError(data.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Failed to update investor status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReclassify = async (investorId: string, newType: string, reason: string) => {
    setActionLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/compliance/admin/investors/${investorId}/reclassify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          investorType: newType,
          reason,
          classifiedBy: user?.email || 'admin',
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        fetchInvestors();
        setShowModal(false);
        setSelectedInvestor(null);
      } else {
        setError(data.error || 'Failed to reclassify');
      }
    } catch (err) {
      setError('Failed to reclassify investor');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'REJECTED':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'PENDING_REVIEW':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'REQUIRES_DOCUMENTS':
        return <FileWarning className="w-4 h-4 text-orange-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING_REVIEW: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      APPROVED: 'bg-green-500/10 text-green-400 border-green-500/20',
      REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
      REQUIRES_DOCUMENTS: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      SUSPENDED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return styles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      RETAIL: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      PROFESSIONAL: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      QUALIFIED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      ACCREDITED: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      WHOLESALE: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      QII: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    };
    return styles[type] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const filteredInvestors = investors.filter(investor => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        investor.email.toLowerCase().includes(query) ||
        investor.firstName?.toLowerCase().includes(query) ||
        investor.lastName?.toLowerCase().includes(query)
      );
    }
    return true;
  });

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
                <UserCheck className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Investor Review</h1>
                <p className="text-sm text-muted-foreground">Manage investor classifications and compliance status</p>
              </div>
            </div>
            <button
              onClick={fetchInvestors}
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
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setStatusFilter('')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !statusFilter 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All ({totalCount})
              </button>
              {COMPLIANCE_STATUSES.map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    statusFilter === status 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {getStatusIcon(status)}
                  {status.replace('_', ' ')} ({statusCounts[status] || 0})
                </button>
              ))}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="">All Types</option>
                  {INVESTOR_TYPES.map(type => (
                    <option key={type} value={type}>{formatInvestorType(type)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Investors Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Investor</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">KYC</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Created</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-muted-foreground">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                          Loading investors...
                        </td>
                      </tr>
                    ) : filteredInvestors.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-muted-foreground">
                          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>No investors found</p>
                          {(statusFilter || typeFilter || searchQuery) && (
                            <button 
                              onClick={() => {
                                setStatusFilter('');
                                setTypeFilter('');
                                setSearchQuery('');
                              }}
                              className="mt-2 text-sm text-violet-400 hover:text-violet-300"
                            >
                              Clear filters
                            </button>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredInvestors.map((investor) => (
                        <tr key={investor.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-violet-400">
                                  {investor.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {investor.firstName && investor.lastName 
                                    ? `${investor.firstName} ${investor.lastName}` 
                                    : investor.email}
                                </p>
                                <p className="text-xs text-muted-foreground">{investor.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{investor.countryCode}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full border ${getTypeBadge(investor.investorType)}`}>
                              {formatInvestorType(investor.investorType)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full border flex items-center gap-1.5 w-fit ${getStatusBadge(investor.complianceStatus)}`}>
                              {getStatusIcon(investor.complianceStatus)}
                              {investor.complianceStatus.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              investor.kycStatus === 'approved' 
                                ? 'bg-green-500/10 text-green-400' 
                                : investor.kycStatus === 'pending'
                                ? 'bg-yellow-500/10 text-yellow-400'
                                : 'bg-gray-500/10 text-gray-400'
                            }`}>
                              {investor.kycStatus || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {formatDate(investor.createdAt)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {investor.complianceStatus === 'PENDING_REVIEW' && (
                                <>
                                  <button
                                    onClick={() => handleStatusUpdate(investor.id, 'APPROVED')}
                                    className="p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                                    title="Approve"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(investor.id, 'REJECTED')}
                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedInvestor(investor);
                                  setShowModal(true);
                                }}
                                className="px-3 py-1.5 text-xs bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors font-medium"
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Info */}
              {!loading && filteredInvestors.length > 0 && (
                <div className="px-4 py-3 border-t border-border bg-muted/20 text-sm text-muted-foreground">
                  Showing {filteredInvestors.length} of {totalCount} investors
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              {totalCount} investors in database
            </p>
          </div>
        </footer>
      </div>

      {/* Investor Detail Modal */}
      {showModal && selectedInvestor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-violet-400">
                      {selectedInvestor.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedInvestor.email}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      {selectedInvestor.countryCode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Investor Type</p>
                  <span className={`text-sm px-2.5 py-1 rounded-full border ${getTypeBadge(selectedInvestor.investorType)}`}>
                    {formatInvestorType(selectedInvestor.investorType)}
                  </span>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Compliance Status</p>
                  <span className={`text-sm px-2.5 py-1 rounded-full border flex items-center gap-1.5 w-fit ${getStatusBadge(selectedInvestor.complianceStatus)}`}>
                    {getStatusIcon(selectedInvestor.complianceStatus)}
                    {selectedInvestor.complianceStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">KYC Status</span>
                  <span className="text-sm font-medium text-foreground">{selectedInvestor.kycStatus || 'Not Started'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <span className="text-sm font-medium text-foreground">{selectedInvestor.riskScore || 'N/A'}/10</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Total Assets</span>
                  <span className="text-sm font-medium text-foreground">
                    {selectedInvestor.totalAssets ? `€${Number(selectedInvestor.totalAssets).toLocaleString()}` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Registered</span>
                  <span className="text-sm font-medium text-foreground">{formatDate(selectedInvestor.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border space-y-3">
                <p className="text-sm font-medium text-foreground">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  {selectedInvestor.complianceStatus !== 'APPROVED' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedInvestor.id, 'APPROVED', 'Approved via admin review')}
                      disabled={actionLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                  )}
                  {selectedInvestor.complianceStatus !== 'REJECTED' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedInvestor.id, 'REJECTED', 'Rejected via admin review')}
                      disabled={actionLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleStatusUpdate(selectedInvestor.id, 'REQUIRES_DOCUMENTS', 'Additional documents required')}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FileWarning className="w-4 h-4" />
                    Request Docs
                  </button>
                </div>

                {/* Reclassify */}
                <div className="pt-3">
                  <p className="text-xs text-muted-foreground mb-2">Reclassify Investor Type</p>
                  <div className="flex flex-wrap gap-2">
                    {INVESTOR_TYPES.filter(t => t !== selectedInvestor.investorType).map(type => (
                      <button
                        key={type}
                        onClick={() => handleReclassify(selectedInvestor.id, type, `Reclassified to ${type} by admin`)}
                        disabled={actionLoading}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-colors disabled:opacity-50 ${getTypeBadge(type)} hover:opacity-80`}
                      >
                        {formatInvestorType(type)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InvestorReview;
