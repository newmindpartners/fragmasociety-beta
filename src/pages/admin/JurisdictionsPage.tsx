import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Globe,
  Search,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ChevronDown,
  Shield,
  AlertTriangle,
  Users,
  FileText,
  Building,
  Building2,
  Download,
  Eye,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Jurisdiction {
  countryCode: string;
  countryName: string;
  region: string;
  retailAllowed: boolean;
  professionalAllowed: boolean;
  qualifiedAllowed: boolean;
  accreditedAllowed: boolean;
  wholesaleAllowed: boolean;
  regulatorName?: string;
  regulatorNotification: boolean;
  passportingAllowed: boolean;
  requiresProspectus: boolean;
  requiresLocalKID: boolean;
  requiresLocalLanguage: boolean;
  localLanguage?: string;
  coldCallingAllowed: boolean;
  advertisingAllowed: boolean;
  blockedReasons?: string;
  hasSubJurisdictions: boolean;
}

interface GroupedJurisdictions {
  EU: Jurisdiction[];
  EEA: Jurisdiction[];
  EU_EQUIVALENT: Jurisdiction[];
  THIRD_COUNTRY_FRIENDLY: Jurisdiction[];
  THIRD_COUNTRY_RESTRICTED: Jurisdiction[];
}

const REGION_LABELS: Record<string, string> = {
  EU: 'European Union',
  EEA: 'European Economic Area',
  EU_EQUIVALENT: 'EU-Equivalent',
  THIRD_COUNTRY_FRIENDLY: 'Third Country (Friendly)',
  THIRD_COUNTRY_RESTRICTED: 'Third Country (Restricted)',
};

const REGION_COLORS: Record<string, string> = {
  EU: 'bg-blue-50 text-blue-700 border-blue-200',
  EEA: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  EU_EQUIVALENT: 'bg-violet-50 text-violet-700 border-violet-200',
  THIRD_COUNTRY_FRIENDLY: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  THIRD_COUNTRY_RESTRICTED: 'bg-red-50 text-red-700 border-red-200',
};

// Helper function to get flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const JurisdictionsPage = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [grouped, setGrouped] = useState<GroupedJurisdictions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [showPassportingOnly, setShowPassportingOnly] = useState(false);
  
  // Selected jurisdiction for detail view
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);

  const fetchJurisdictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/compliance/jurisdictions`);
      const data = await response.json();
      
      if (data.success) {
        setJurisdictions(data.jurisdictions || []);
        setGrouped(data.grouped || null);
      } else {
        setError(data.error || 'Failed to load jurisdictions');
      }
    } catch (err) {
      console.error('Fetch jurisdictions error:', err);
      setError('Failed to load jurisdictions');
    } finally {
      setLoading(false);
    }
  };

  const seedJurisdictions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/compliance/admin/seed-jurisdictions`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        fetchJurisdictions();
      } else {
        setError(data.error || 'Failed to seed jurisdictions');
      }
    } catch (err) {
      setError('Failed to seed jurisdictions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJurisdictions();
  }, []);

  const filteredJurisdictions = useMemo(() => {
    return jurisdictions.filter(j => {
      if (regionFilter && j.region !== regionFilter) return false;
      if (showPassportingOnly && !j.passportingAllowed) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          j.countryCode.toLowerCase().includes(query) ||
          j.countryName.toLowerCase().includes(query) ||
          j.regulatorName?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [jurisdictions, regionFilter, showPassportingOnly, searchQuery]);

  // Quick stats
  const stats = useMemo(() => {
    const total = jurisdictions.length;
    const retailAllowed = jurisdictions.filter(j => j.retailAllowed).length;
    const professionalAllowed = jurisdictions.filter(j => j.professionalAllowed).length;
    const passportingCountries = jurisdictions.filter(j => j.passportingAllowed).length;
    const blocked = jurisdictions.filter(j => j.blockedReasons).length;
    
    return { total, retailAllowed, professionalAllowed, passportingCountries, blocked };
  }, [jurisdictions]);

  const exportToCsv = () => {
    const headers = ['Country Code', 'Country Name', 'Region', 'Retail', 'Professional', 'Qualified', 'Accredited', 'Wholesale', 'Passporting', 'Regulator', 'Prospectus Required', 'Local Language'];
    const rows = filteredJurisdictions.map(j => [
      j.countryCode,
      j.countryName,
      j.region,
      j.retailAllowed ? 'Yes' : 'No',
      j.professionalAllowed ? 'Yes' : 'No',
      j.qualifiedAllowed ? 'Yes' : 'No',
      j.accreditedAllowed ? 'Yes' : 'No',
      j.wholesaleAllowed ? 'Yes' : 'No',
      j.passportingAllowed ? 'Yes' : 'No',
      j.regulatorName || '',
      j.requiresProspectus ? 'Yes' : 'No',
      j.localLanguage || ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jurisdictions-export.csv';
    a.click();
  };

  const renderCell = (allowed: boolean) => (
    <div className="flex items-center justify-center">
      {allowed ? (
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-muted-foreground/30" />
      )}
    </div>
  );

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
              <div className="p-2 bg-blue-50 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Jurisdictions</h1>
                <p className="text-sm text-muted-foreground">Geographic eligibility rules & investor classification by country</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportToCsv}
                disabled={loading || jurisdictions.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={seedJurisdictions}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                <Building className="w-4 h-4" />
                Seed DB
              </button>
              <button
                onClick={fetchJurisdictions}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors disabled:opacity-50 font-medium text-sm"
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
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Countries</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{stats.retailAllowed}</p>
                <p className="text-xs text-muted-foreground">Retail Allowed</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-violet-600" />
                </div>
                <p className="text-2xl font-bold text-violet-600">{stats.professionalAllowed}</p>
                <p className="text-xs text-muted-foreground">Professional Allowed</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{stats.passportingCountries}</p>
                <p className="text-xs text-muted-foreground">EU Passporting</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
                <p className="text-xs text-muted-foreground">Blocked</p>
              </div>
            </div>

            {/* Region Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setRegionFilter('')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  regionFilter === '' 
                    ? 'bg-foreground text-background' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All Regions
              </button>
              {Object.entries(REGION_LABELS).map(([key, label]) => {
                const count = grouped?.[key as keyof GroupedJurisdictions]?.length || 0;
                return (
                  <button
                    key={key}
                    onClick={() => setRegionFilter(regionFilter === key ? '' : key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      regionFilter === key 
                        ? 'bg-foreground text-background' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      regionFilter === key 
                        ? 'bg-background/20 text-background' 
                        : 'bg-background text-foreground'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search country, code, or regulator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer bg-card border border-border px-3 py-2 rounded-lg">
                <input
                  type="checkbox"
                  checked={showPassportingOnly}
                  onChange={(e) => setShowPassportingOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500"
                />
                <span className="text-muted-foreground">EU Passporting only</span>
              </label>

              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredJurisdictions.length}</span> of {jurisdictions.length} jurisdictions
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-muted/30 rounded-lg border border-border">
              <span className="text-xs font-medium text-muted-foreground">Legend:</span>
              <div className="flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span className="text-muted-foreground">Allowed</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <XCircle className="w-3.5 h-3.5 text-muted-foreground/30" />
                <span className="text-muted-foreground">Not Allowed</span>
              </div>
              <div className="h-4 border-l border-border mx-1" />
              {Object.entries(REGION_LABELS).map(([key, label]) => (
                <span key={key} className={`text-[10px] px-2 py-0.5 rounded border ${REGION_COLORS[key]}`}>
                  {key.replace(/_/g, ' ')}
                </span>
              ))}
            </div>

            {/* Jurisdictions Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide sticky left-0 bg-muted/50 z-10">
                        Country
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Region
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Retail
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Professional
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Qualified
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Accredited
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Wholesale
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Passporting
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Regulator
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={10} className="py-16 text-center text-muted-foreground">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3" />
                          <p>Loading jurisdictions...</p>
                        </td>
                      </tr>
                    ) : filteredJurisdictions.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-16 text-center text-muted-foreground">
                          <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="mb-2">No jurisdictions found</p>
                          {jurisdictions.length === 0 && (
                            <button
                              onClick={seedJurisdictions}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Seed database with default jurisdictions
                            </button>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredJurisdictions.map((j, index) => (
                        <motion.tr 
                          key={j.countryCode}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.01 }}
                          className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${j.blockedReasons ? 'bg-red-50/30' : ''}`}
                        >
                          <td className="py-3 px-4 sticky left-0 bg-card z-10">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{getFlagEmoji(j.countryCode)}</span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-foreground">{j.countryName}</p>
                                  {j.blockedReasons && (
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground font-mono">{j.countryCode}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded border ${REGION_COLORS[j.region]}`}>
                              {j.region.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">{renderCell(j.retailAllowed)}</td>
                          <td className="py-3 px-4">{renderCell(j.professionalAllowed)}</td>
                          <td className="py-3 px-4">{renderCell(j.qualifiedAllowed)}</td>
                          <td className="py-3 px-4">{renderCell(j.accreditedAllowed)}</td>
                          <td className="py-3 px-4">{renderCell(j.wholesaleAllowed)}</td>
                          <td className="py-3 px-4">{renderCell(j.passportingAllowed)}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground max-w-[150px] truncate">
                            {j.regulatorName || '-'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => setSelectedJurisdiction(j)}
                              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Footer Info */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> This matrix shows general eligibility based on Luxembourg securitisation law and EU passporting rules. 
                Actual eligibility may vary based on specific deal characteristics, investor documentation, and regulatory changes. 
                Always verify eligibility with the compliance team before proceeding.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              {jurisdictions.length} jurisdictions configured • Luxembourg Securitisation Law Compliant
            </p>
          </div>
        </footer>
      </div>

      {/* Jurisdiction Detail Modal */}
      {selectedJurisdiction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedJurisdiction(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-card rounded-xl border border-border shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 p-6 border-b border-border bg-card z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{getFlagEmoji(selectedJurisdiction.countryCode)}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{selectedJurisdiction.countryName}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-mono text-muted-foreground">{selectedJurisdiction.countryCode}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${REGION_COLORS[selectedJurisdiction.region]}`}>
                        {REGION_LABELS[selectedJurisdiction.region]}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJurisdiction(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Blocked Warning */}
              {selectedJurisdiction.blockedReasons && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Blocked Jurisdiction</span>
                  </div>
                  <p className="text-sm text-red-600">{selectedJurisdiction.blockedReasons}</p>
                </div>
              )}

              {/* Investor Types */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  Allowed Investor Types
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'retailAllowed', label: 'Retail', value: selectedJurisdiction.retailAllowed },
                    { key: 'professionalAllowed', label: 'Professional', value: selectedJurisdiction.professionalAllowed },
                    { key: 'qualifiedAllowed', label: 'Qualified', value: selectedJurisdiction.qualifiedAllowed },
                    { key: 'accreditedAllowed', label: 'Accredited', value: selectedJurisdiction.accreditedAllowed },
                    { key: 'wholesaleAllowed', label: 'Wholesale', value: selectedJurisdiction.wholesaleAllowed },
                  ].map(item => (
                    <div key={item.key} className={`p-3 rounded-lg border ${item.value ? 'bg-green-50 border-green-200' : 'bg-muted/50 border-border'}`}>
                      <div className="flex items-center gap-2">
                        {item.value ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground/50" />
                        )}
                        <span className={`text-sm font-medium ${item.value ? 'text-green-700' : 'text-muted-foreground'}`}>
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Info */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  Regulatory Information
                </h3>
                <div className="bg-muted/30 rounded-lg border border-border divide-y divide-border">
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Regulator</span>
                    <span className="text-sm font-medium text-foreground">{selectedJurisdiction.regulatorName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Notification Required</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.regulatorNotification ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {selectedJurisdiction.regulatorNotification ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">EU Passporting</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.passportingAllowed ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {selectedJurisdiction.passportingAllowed ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documentation Requirements */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  Documentation Requirements
                </h3>
                <div className="bg-muted/30 rounded-lg border border-border divide-y divide-border">
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Prospectus Required</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.requiresProspectus ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {selectedJurisdiction.requiresProspectus ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Local KID Required</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.requiresLocalKID ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {selectedJurisdiction.requiresLocalKID ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Local Language</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedJurisdiction.requiresLocalLanguage 
                        ? selectedJurisdiction.localLanguage?.toUpperCase() || 'Required'
                        : 'Not Required'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Marketing Restrictions */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  Marketing Restrictions
                </h3>
                <div className="bg-muted/30 rounded-lg border border-border divide-y divide-border">
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Cold Calling Allowed</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.coldCallingAllowed ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedJurisdiction.coldCallingAllowed ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Advertising Allowed</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.advertisingAllowed ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedJurisdiction.advertisingAllowed ? 'Yes' : 'No'}
                    </span>
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

export default JurisdictionsPage;
