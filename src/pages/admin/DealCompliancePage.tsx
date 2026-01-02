import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText,
  Plus,
  Search,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Globe,
  ChevronRight,
  Edit,
  Eye,
  RefreshCw,
  Save,
  X,
  Loader2,
  Database,
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
  maximumInvestment?: number;
  targetRaise: number;
  currentRaise: number;
  riskLevel: number;
  liquidityRisk?: string;
  requiresProspectus: boolean;
  requiresPRIIPSKID: boolean;
  requiresPPM: boolean;
  cssfApproved: boolean;
  cssfApprovalDate?: string;
  capitalAtRisk: boolean;
  eligibleInvestorsCount?: number;
  jurisdictionsCount?: number;
}

const DealCompliancePage = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [compartmentFilter, setCompartmentFilter] = useState<string>('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    requiresProspectus: false,
    requiresPRIIPSKID: false,
    requiresPPM: false,
    cssfApproved: false,
    riskLevel: 5,
    liquidityRisk: 'medium',
    capitalAtRisk: true,
    status: 'draft',
  });

  useEffect(() => {
    fetchDeals();
  }, [statusFilter, compartmentFilter]);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (compartmentFilter !== 'all') params.append('compartment', compartmentFilter);

      const response = await fetch(`${API_URL}/api/compliance/deals?${params}`);
      const data = await response.json();

      if (data.success) {
        setDeals(data.deals);
      }
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedMockData = async () => {
    setSeeding(true);
    try {
      const response = await fetch(`${API_URL}/api/compliance/admin/seed-mock-data`, {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        alert(`✅ ${data.message}`);
        fetchDeals();
      } else {
        alert(`❌ Failed to seed data: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to seed data:', error);
      alert('Failed to seed mock data');
    } finally {
      setSeeding(false);
    }
  };

  const openEditModal = (deal: Deal) => {
    setSelectedDeal(deal);
    setEditForm({
      requiresProspectus: deal.requiresProspectus,
      requiresPRIIPSKID: deal.requiresPRIIPSKID,
      requiresPPM: deal.requiresPPM,
      cssfApproved: deal.cssfApproved,
      riskLevel: deal.riskLevel,
      liquidityRisk: deal.liquidityRisk || 'medium',
      capitalAtRisk: deal.capitalAtRisk,
      status: deal.status,
    });
    setShowEditModal(true);
  };

  const saveCompliance = async () => {
    if (!selectedDeal) return;

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/compliance/deals/${selectedDeal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (data.success) {
        setShowEditModal(false);
        fetchDeals();
      } else {
        alert(`Failed to update: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to save compliance:', error);
      alert('Failed to save compliance settings');
    } finally {
      setSaving(false);
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.assetClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
            <div className="flex items-center gap-3">
              <button 
                onClick={seedMockData}
                disabled={seeding}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                Seed Mock Data
              </button>
              <button 
                onClick={fetchDeals}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white text-sm font-medium">
                <Plus className="w-4 h-4" />
                New Deal
              </button>
            </div>
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

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
            </div>
          ) : filteredDeals.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-4">No deals found</p>
              <button 
                onClick={seedMockData}
                disabled={seeding}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white text-sm"
              >
                Seed Mock Data
              </button>
            </div>
          ) : (
            /* Deals List */
            <div className="space-y-4">
              {filteredDeals.map((deal, index) => {
                const compliance = getComplianceStatus(deal);
                const raisePercent = (Number(deal.currentRaise) / Number(deal.targetRaise)) * 100;
                
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
                            {deal.eligibleInvestorsCount || 0} eligible
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
                              €{(Number(deal.currentRaise) / 1000000).toFixed(2)}M / €{(Number(deal.targetRaise) / 1000000).toFixed(2)}M
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
                            Min: €{Number(deal.minimumInvestment).toLocaleString()}
                          </span>
                          
                          <span className="text-xs text-muted-foreground">
                            Risk: {deal.riskLevel}/10
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openEditModal(deal)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white text-xs"
                        >
                          <Edit className="w-3 h-3" />
                          Edit Compliance
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto m-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Edit Compliance</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">{selectedDeal.name}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${getCompartmentColor(selectedDeal.compartmentType)}`}>
                {selectedDeal.compartmentType} Compartment
              </span>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Documentation Requirements */}
              <div>
                <label className="block text-sm font-medium mb-3">Documentation Requirements</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                    <input
                      type="checkbox"
                      checked={editForm.requiresProspectus}
                      onChange={(e) => setEditForm({ ...editForm, requiresProspectus: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-violet-600 focus:ring-violet-500"
                    />
                    <div>
                      <p className="text-sm font-medium">EU Prospectus</p>
                      <p className="text-xs text-muted-foreground">Required for Retail compartment</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                    <input
                      type="checkbox"
                      checked={editForm.requiresPRIIPSKID}
                      onChange={(e) => setEditForm({ ...editForm, requiresPRIIPSKID: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-violet-600 focus:ring-violet-500"
                    />
                    <div>
                      <p className="text-sm font-medium">PRIIPS KID</p>
                      <p className="text-xs text-muted-foreground">Key Information Document for retail</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                    <input
                      type="checkbox"
                      checked={editForm.requiresPPM}
                      onChange={(e) => setEditForm({ ...editForm, requiresPPM: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-violet-600 focus:ring-violet-500"
                    />
                    <div>
                      <p className="text-sm font-medium">Private Placement Memorandum</p>
                      <p className="text-xs text-muted-foreground">Required for Professional compartment</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                    <input
                      type="checkbox"
                      checked={editForm.cssfApproved}
                      onChange={(e) => setEditForm({ ...editForm, cssfApproved: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-violet-600 focus:ring-violet-500"
                    />
                    <div>
                      <p className="text-sm font-medium">CSSF Approved</p>
                      <p className="text-xs text-muted-foreground">Luxembourg regulator approval</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Risk Settings */}
              <div>
                <label className="block text-sm font-medium mb-2">Risk Level: {editForm.riskLevel}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={editForm.riskLevel}
                  onChange={(e) => setEditForm({ ...editForm, riskLevel: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Liquidity Risk</label>
                <select
                  value={editForm.liquidityRisk}
                  onChange={(e) => setEditForm({ ...editForm, liquidityRisk: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <label className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <input
                  type="checkbox"
                  checked={editForm.capitalAtRisk}
                  onChange={(e) => setEditForm({ ...editForm, capitalAtRisk: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-violet-600 focus:ring-violet-500"
                />
                <div>
                  <p className="text-sm font-medium">Capital at Risk</p>
                  <p className="text-xs text-muted-foreground">Investor may lose capital</p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <button 
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={saveCompliance}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white text-sm disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DealCompliancePage;
