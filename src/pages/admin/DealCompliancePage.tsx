import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText,
  Plus,
  Search,
  Filter,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Globe,
  ChevronRight,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Deal {
  id: string;
  name: string;
  slug: string;
  compartmentType: 'PROFESSIONAL' | 'RETAIL';
  assetClass: string;
  status: string;
  minimumInvestment: number;
  targetRaise: number;
  currentRaise: number;
  riskLevel: number;
  requiresProspectus: boolean;
  requiresPRIIPSKID: boolean;
  requiresPPM: boolean;
  cssfApproved: boolean;
  capitalAtRisk: boolean;
  eligibleInvestorsCount?: number;
  jurisdictionsCount?: number;
}

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Bryan Balsiger - Equestrian Excellence',
    slug: 'bryan-balsiger',
    compartmentType: 'PROFESSIONAL',
    assetClass: 'Sport',
    status: 'active',
    minimumInvestment: 100000,
    targetRaise: 5000000,
    currentRaise: 2500000,
    riskLevel: 6,
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: true,
    cssfApproved: false,
    capitalAtRisk: true,
    eligibleInvestorsCount: 45,
    jurisdictionsCount: 28,
  },
  {
    id: '2',
    name: 'Philippe Naouri - Film Rights',
    slug: 'philippe-naouri',
    compartmentType: 'RETAIL',
    assetClass: 'Entertainment',
    status: 'active',
    minimumInvestment: 500,
    targetRaise: 2000000,
    currentRaise: 800000,
    riskLevel: 7,
    requiresProspectus: true,
    requiresPRIIPSKID: true,
    requiresPPM: false,
    cssfApproved: true,
    capitalAtRisk: true,
    eligibleInvestorsCount: 320,
    jurisdictionsCount: 35,
  },
  {
    id: '3',
    name: 'Tuscan Villa Collection',
    slug: 'tuscan-villa',
    compartmentType: 'PROFESSIONAL',
    assetClass: 'Real Estate',
    status: 'draft',
    minimumInvestment: 100000,
    targetRaise: 10000000,
    currentRaise: 0,
    riskLevel: 4,
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: true,
    cssfApproved: false,
    capitalAtRisk: true,
    eligibleInvestorsCount: 0,
    jurisdictionsCount: 0,
  },
];

const DealCompliancePage = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [compartmentFilter, setCompartmentFilter] = useState<string>('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.assetClass.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    const matchesCompartment = compartmentFilter === 'all' || deal.compartmentType === compartmentFilter;
    return matchesSearch && matchesStatus && matchesCompartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400';
      case 'draft': return 'bg-yellow-500/10 text-yellow-400';
      case 'closed': return 'bg-gray-500/10 text-gray-400';
      case 'cancelled': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getCompartmentColor = (type: string) => {
    return type === 'PROFESSIONAL' 
      ? 'bg-violet-500/10 text-violet-400 border-violet-500/30' 
      : 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  };

  const getComplianceStatus = (deal: Deal) => {
    const issues: string[] = [];
    
    if (deal.compartmentType === 'RETAIL') {
      if (!deal.requiresProspectus) issues.push('Missing EU Prospectus');
      if (!deal.requiresPRIIPSKID) issues.push('Missing PRIIPS KID');
      if (!deal.cssfApproved) issues.push('Pending CSSF Approval');
    } else {
      if (!deal.requiresPPM) issues.push('Missing PPM');
    }
    
    if (issues.length === 0) return { status: 'complete', issues };
    return { status: 'incomplete', issues };
  };

  const stats = {
    total: deals.length,
    active: deals.filter(d => d.status === 'active').length,
    draft: deals.filter(d => d.status === 'draft').length,
    professional: deals.filter(d => d.compartmentType === 'PROFESSIONAL').length,
    retail: deals.filter(d => d.compartmentType === 'RETAIL').length,
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
        style={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-card/80 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg">
                <FileText className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Deal Compliance</h1>
                <p className="text-sm text-muted-foreground">Configure compliance requirements for deals</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white text-sm font-medium">
              <Plus className="w-4 h-4" />
              New Deal
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Deals</p>
              <p className="text-2xl font-semibold">{stats.total}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Active</p>
              <p className="text-2xl font-semibold text-green-400">{stats.active}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Draft</p>
              <p className="text-2xl font-semibold text-yellow-400">{stats.draft}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Professional</p>
              <p className="text-2xl font-semibold text-violet-400">{stats.professional}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Retail</p>
              <p className="text-2xl font-semibold text-blue-400">{stats.retail}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={compartmentFilter}
              onChange={(e) => setCompartmentFilter(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <option value="all">All Compartments</option>
              <option value="PROFESSIONAL">Professional</option>
              <option value="RETAIL">Retail</option>
            </select>
          </div>

          {/* Deals List */}
          <div className="space-y-4">
            {filteredDeals.map((deal, index) => {
              const compliance = getComplianceStatus(deal);
              const raisePercent = (deal.currentRaise / deal.targetRaise) * 100;
              
              return (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-xl p-5 hover:border-violet-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Deal Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-foreground">{deal.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                          {deal.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCompartmentColor(deal.compartmentType)}`}>
                          {deal.compartmentType}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {deal.assetClass}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {deal.eligibleInvestorsCount || 0} eligible investors
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          {deal.jurisdictionsCount || 0} jurisdictions
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Raise Progress</span>
                          <span className="text-foreground font-medium">
                            €{(deal.currentRaise / 1000000).toFixed(2)}M / €{(deal.targetRaise / 1000000).toFixed(2)}M
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${Math.min(raisePercent, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Compliance Status */}
                      <div className="flex items-center gap-4">
                        {compliance.status === 'complete' ? (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Compliance Complete
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-yellow-400">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {compliance.issues.length} issue{compliance.issues.length > 1 ? 's' : ''}
                          </span>
                        )}
                        
                        {deal.cssfApproved && (
                          <span className="flex items-center gap-1 text-xs text-blue-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            CSSF Approved
                          </span>
                        )}
                        
                        <span className="text-xs text-muted-foreground">
                          Min: €{deal.minimumInvestment.toLocaleString()}
                        </span>
                        
                        <span className="text-xs text-muted-foreground">
                          Risk: {deal.riskLevel}/10
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setSelectedDeal(deal); setShowDetailModal(true); }}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button 
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button 
                        className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white text-xs"
                      >
                        Configure
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">No deals found</p>
            </div>
          )}
        </main>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{selectedDeal.name}</h2>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Deal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Compartment</p>
                  <p className={`text-sm font-medium ${selectedDeal.compartmentType === 'PROFESSIONAL' ? 'text-violet-400' : 'text-blue-400'}`}>
                    {selectedDeal.compartmentType}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Asset Class</p>
                  <p className="text-sm font-medium">{selectedDeal.assetClass}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Minimum Investment</p>
                  <p className="text-sm font-medium">€{selectedDeal.minimumInvestment.toLocaleString()}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                  <p className="text-sm font-medium">{selectedDeal.riskLevel}/10</p>
                </div>
              </div>

              {/* Compliance Requirements */}
              <div>
                <h3 className="text-sm font-medium mb-3">Compliance Requirements</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">EU Prospectus</span>
                    {selectedDeal.requiresProspectus ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">PRIIPS KID</span>
                    {selectedDeal.requiresPRIIPSKID ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Private Placement Memorandum</span>
                    {selectedDeal.requiresPPM ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">CSSF Approval</span>
                    {selectedDeal.cssfApproved ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                >
                  Close
                </button>
                <button 
                  className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white text-sm"
                >
                  Edit Compliance
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DealCompliancePage;
