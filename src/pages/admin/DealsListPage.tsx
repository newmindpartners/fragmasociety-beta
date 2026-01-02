import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Briefcase,
  Plus,
  Search,
  RefreshCw,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Building2,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  MoreHorizontal,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Deal {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  subcategory?: string;
  leaderName: string;
  leaderImage?: string;
  bannerImage?: string;
  status: string;
  currency: string;
  minTicket: string;
  totalRaise: string;
  currentRaised: string;
  investorCount: number;
  investmentCount?: number;
  issuer?: {
    id: string;
    companyName: string;
    jurisdiction: string;
  };
  createdAt: string;
}

const DEAL_STATUS_STYLES: Record<string, { bg: string; text: string; icon: any }> = {
  DRAFT: { bg: 'bg-slate-100', text: 'text-slate-700', icon: FileText },
  PENDING_APPROVAL: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
  ACTIVE: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
  FUNDED: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle2 },
  CLOSED: { bg: 'bg-slate-100', text: 'text-slate-700', icon: XCircle },
  CANCELLED: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Real Estate': 'bg-emerald-100 text-emerald-700',
  'Sports': 'bg-blue-100 text-blue-700',
  'Art': 'bg-purple-100 text-purple-700',
  'Entertainment': 'bg-pink-100 text-pink-700',
  'Private Equity': 'bg-amber-100 text-amber-700',
};

const DealsListPage = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/admin/deals`);
      const data = await response.json();
      
      if (data.success) {
        setDeals(data.deals || []);
      } else {
        setError(data.error || 'Failed to load deals');
      }
    } catch (err) {
      console.error('Fetch deals error:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    if (statusFilter && deal.status !== statusFilter) return false;
    if (categoryFilter && deal.category !== categoryFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        deal.title.toLowerCase().includes(query) ||
        deal.leaderName.toLowerCase().includes(query) ||
        deal.slug.toLowerCase().includes(query) ||
        deal.issuer?.companyName?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: deals.length,
    active: deals.filter(d => d.status === 'ACTIVE').length,
    draft: deals.filter(d => d.status === 'DRAFT').length,
    totalRaised: deals.reduce((sum, d) => sum + parseFloat(d.currentRaised || '0'), 0),
    totalInvestors: deals.reduce((sum, d) => sum + (d.investorCount || 0), 0),
  };

  const formatCurrency = (value: string | number, currency = 'EUR') => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const categories = [...new Set(deals.map(d => d.category))];

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
        style={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-card/80 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Deals Management</h1>
                <p className="text-sm text-muted-foreground">Create and manage investment opportunities</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchDeals}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <Link
                to="/admin/deals/new"
                className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                New Deal
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
                <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Deals</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active Deals</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-slate-600" />
                </div>
                <p className="text-2xl font-bold text-slate-600">{stats.draft}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalRaised)}</p>
                <p className="text-xs text-muted-foreground">Total Raised</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-violet-600" />
                </div>
                <p className="text-2xl font-bold text-violet-600">{stats.totalInvestors}</p>
                <p className="text-xs text-muted-foreground">Total Investors</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search deals, leaders, issuers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="">All Statuses</option>
                  <option value="DRAFT">Draft</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                  <option value="ACTIVE">Active</option>
                  <option value="FUNDED">Funded</option>
                  <option value="CLOSED">Closed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredDeals.length}</span> of {deals.length} deals
              </div>
            </div>

            {/* Deals Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Deal</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Issuer</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Target</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Raised</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Investors</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-muted-foreground">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3" />
                          <p>Loading deals...</p>
                        </td>
                      </tr>
                    ) : filteredDeals.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-muted-foreground">
                          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="mb-2">No deals found</p>
                          <Link
                            to="/admin/deals/new"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Create your first deal
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      filteredDeals.map((deal, index) => {
                        const statusStyle = DEAL_STATUS_STYLES[deal.status] || DEAL_STATUS_STYLES.DRAFT;
                        const StatusIcon = statusStyle.icon;
                        const categoryColor = CATEGORY_COLORS[deal.category] || 'bg-slate-100 text-slate-700';
                        const progress = deal.totalRaise ? (parseFloat(deal.currentRaised) / parseFloat(deal.totalRaise)) * 100 : 0;

                        return (
                          <motion.tr
                            key={deal.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.02 }}
                            className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                {deal.bannerImage ? (
                                  <img 
                                    src={deal.bannerImage} 
                                    alt={deal.title}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-foreground">{deal.title}</p>
                                  <p className="text-xs text-muted-foreground">{deal.leaderName}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-xs px-2 py-1 rounded ${categoryColor}`}>
                                {deal.category}
                              </span>
                              {deal.subcategory && (
                                <p className="text-xs text-muted-foreground mt-1">{deal.subcategory}</p>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {deal.issuer ? (
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-foreground">{deal.issuer.companyName}</p>
                                    <p className="text-xs text-muted-foreground">{deal.issuer.jurisdiction}</p>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">No issuer</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded ${statusStyle.bg} ${statusStyle.text}`}>
                                <StatusIcon className="w-3 h-3" />
                                {deal.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <p className="text-sm font-medium text-foreground">
                                {formatCurrency(deal.totalRaise, deal.currency)}
                              </p>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {formatCurrency(deal.currentRaised, deal.currency)}
                                </p>
                                <div className="w-16 h-1.5 bg-muted rounded-full mt-1 ml-auto">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-sm font-medium text-foreground">{deal.investorCount}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1">
                                <Link
                                  to={`/deal/${deal.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                  title="Preview"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <Link
                                  to={`/admin/deals/${deal.id}/edit`}
                                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </Link>
                                <button
                                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"
                                  title="More actions"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              {deals.length} deals configured
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DealsListPage;
