import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Building2,
  Plus,
  Search,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  Calendar,
  Shield,
  X,
  Save,
  Loader2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Issuer {
  id: string;
  companyName: string;
  legalName?: string;
  tradingName?: string;
  registrationNumber?: string;
  lei?: string;
  jurisdiction: string;
  companyType?: string;
  incorporationDate?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal?: string;
  };
  website?: string;
  email?: string;
  phone?: string;
  directors?: Array<{ name: string; role: string; nationality?: string }>;
  beneficialOwners?: Array<{ name: string; ownership: number; isPEP?: boolean }>;
  regulatoryStatus?: string;
  isActive: boolean;
  isVerified: boolean;
  verifiedAt?: string;
  dealCount: number;
  createdAt: string;
}

const IssuersPage = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [issuers, setIssuers] = useState<Issuer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingIssuer, setEditingIssuer] = useState<Issuer | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    registrationNumber: '',
    lei: '',
    jurisdiction: '',
    companyType: '',
    website: '',
    email: '',
    phone: '',
    regulatoryStatus: '',
  });

  const fetchIssuers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/issuers`);
      const data = await response.json();
      
      if (data.success) {
        setIssuers(data.issuers || []);
      } else {
        setError(data.error || 'Failed to load issuers');
      }
    } catch (err) {
      console.error('Fetch issuers error:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuers();
  }, []);

  const filteredIssuers = issuers.filter(issuer => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      issuer.companyName.toLowerCase().includes(query) ||
      issuer.legalName?.toLowerCase().includes(query) ||
      issuer.jurisdiction.toLowerCase().includes(query) ||
      issuer.registrationNumber?.toLowerCase().includes(query)
    );
  });

  const openCreateModal = () => {
    setEditingIssuer(null);
    setFormData({
      companyName: '',
      legalName: '',
      registrationNumber: '',
      lei: '',
      jurisdiction: '',
      companyType: '',
      website: '',
      email: '',
      phone: '',
      regulatoryStatus: '',
    });
    setShowModal(true);
  };

  const openEditModal = (issuer: Issuer) => {
    setEditingIssuer(issuer);
    setFormData({
      companyName: issuer.companyName,
      legalName: issuer.legalName || '',
      registrationNumber: issuer.registrationNumber || '',
      lei: issuer.lei || '',
      jurisdiction: issuer.jurisdiction,
      companyType: issuer.companyType || '',
      website: issuer.website || '',
      email: issuer.email || '',
      phone: issuer.phone || '',
      regulatoryStatus: issuer.regulatoryStatus || '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingIssuer 
        ? `${API_URL}/api/issuers/${editingIssuer.id}`
        : `${API_URL}/api/issuers`;
      
      const response = await fetch(url, {
        method: editingIssuer ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowModal(false);
        fetchIssuers();
      } else {
        setError(data.error || 'Failed to save issuer');
      }
    } catch (err) {
      console.error('Save issuer error:', err);
      setError('Failed to save issuer');
    } finally {
      setSaving(false);
    }
  };

  const handleVerify = async (issuerId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/issuers/${issuerId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verifiedBy: user?.email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchIssuers();
      }
    } catch (err) {
      console.error('Verify issuer error:', err);
    }
  };

  const handleDelete = async (issuer: Issuer) => {
    if (issuer.dealCount > 0) {
      alert(`Cannot delete issuer with ${issuer.dealCount} associated deal(s)`);
      return;
    }
    
    if (!confirm(`Delete issuer "${issuer.companyName}"?`)) return;
    
    try {
      const response = await fetch(`${API_URL}/api/issuers/${issuer.id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchIssuers();
      } else {
        setError(data.error || 'Failed to delete issuer');
      }
    } catch (err) {
      console.error('Delete issuer error:', err);
      setError('Failed to delete issuer');
    }
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
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Issuers</h1>
                <p className="text-sm text-muted-foreground">Manage deal sponsors and issuers</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchIssuers}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                New Issuer
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
                <button onClick={() => setError(null)}>
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search issuers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredIssuers.length} issuers
              </div>
            </div>

            {/* Issuers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-48 bg-card rounded-xl border border-border animate-pulse" />
                ))
              ) : filteredIssuers.length === 0 ? (
                <div className="col-span-full py-16 text-center text-muted-foreground">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-2">No issuers found</p>
                  <button 
                    onClick={openCreateModal}
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    Create your first issuer
                  </button>
                </div>
              ) : (
                filteredIssuers.map((issuer, index) => (
                  <motion.div
                    key={issuer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-card rounded-xl border border-border p-5 hover:border-emerald-500/40 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{issuer.companyName}</h3>
                          {issuer.legalName && issuer.legalName !== issuer.companyName && (
                            <p className="text-xs text-muted-foreground">{issuer.legalName}</p>
                          )}
                        </div>
                      </div>
                      {issuer.isVerified ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => handleVerify(issuer.id)}
                          className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full hover:bg-amber-100 transition-colors"
                        >
                          <Shield className="w-3 h-3" />
                          Verify
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{issuer.jurisdiction}</span>
                        {issuer.companyType && (
                          <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{issuer.companyType}</span>
                        )}
                      </div>
                      {issuer.registrationNumber && (
                        <div className="text-xs text-muted-foreground font-mono">
                          Reg: {issuer.registrationNumber}
                        </div>
                      )}
                      {issuer.email && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{issuer.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {issuer.dealCount} deal{issuer.dealCount !== 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(issuer)}
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(issuer)}
                          disabled={issuer.dealCount > 0}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              {issuers.length} issuers registered
            </p>
          </div>
        </footer>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  {editingIssuer ? 'Edit Issuer' : 'New Issuer'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="Naouri Development LLC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Legal Name</label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="Naouri Real Estate Holdings, LLC"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Jurisdiction *</label>
                  <input
                    type="text"
                    value={formData.jurisdiction}
                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Delaware, USA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Company Type</label>
                  <input
                    type="text"
                    value={formData.companyType}
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="LLC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="LLC-2015-CA-789456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">LEI</label>
                  <input
                    type="text"
                    value={formData.lei}
                    onChange={(e) => setFormData({ ...formData, lei: e.target.value })}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="549300EXAMPLE0001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Regulatory Status</label>
                <input
                  type="text"
                  value={formData.regulatoryStatus}
                  onChange={(e) => setFormData({ ...formData, regulatoryStatus: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="Registered Investment Adviser"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formData.companyName || !formData.jurisdiction}
                className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingIssuer ? 'Update' : 'Create'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default IssuersPage;
