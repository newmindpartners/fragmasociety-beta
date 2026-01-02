import { useState, useEffect } from "react";
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
  Filter,
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
  EU: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  EEA: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  EU_EQUIVALENT: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  THIRD_COUNTRY_FRIENDLY: 'bg-green-500/10 text-green-400 border-green-500/20',
  THIRD_COUNTRY_RESTRICTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

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
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
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

  const filteredJurisdictions = jurisdictions.filter(j => {
    if (regionFilter && j.region !== regionFilter) return false;
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

  const getInvestorTypesAllowed = (j: Jurisdiction) => {
    const types = [];
    if (j.retailAllowed) types.push('Retail');
    if (j.professionalAllowed) types.push('Professional');
    if (j.qualifiedAllowed) types.push('Qualified');
    if (j.accreditedAllowed) types.push('Accredited');
    if (j.wholesaleAllowed) types.push('Wholesale');
    return types;
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
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Jurisdictions</h1>
                <p className="text-sm text-muted-foreground">Geographic eligibility rules and marketing restrictions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={seedJurisdictions}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors disabled:opacity-50"
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
          <div className="mx-auto w-full max-w-[1400px]">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {Object.entries(REGION_LABELS).map(([key, label]) => {
                const count = grouped?.[key as keyof GroupedJurisdictions]?.length || 0;
                return (
                  <button
                    key={key}
                    onClick={() => setRegionFilter(regionFilter === key ? '' : key)}
                    className={`p-4 rounded-xl border transition-all ${
                      regionFilter === key 
                        ? 'border-violet-500 bg-violet-500/10' 
                        : 'border-border bg-card hover:border-violet-500/40'
                    }`}
                  >
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </button>
                );
              })}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search country or regulator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              {/* Region Filter */}
              <div className="relative">
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="">All Regions</option>
                  {Object.entries(REGION_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-violet-600 text-white' : 'bg-card text-muted-foreground hover:bg-muted'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-violet-600 text-white' : 'bg-card text-muted-foreground hover:bg-muted'}`}
                >
                  Table
                </button>
              </div>
            </div>

            {/* Jurisdictions Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-40 bg-card rounded-xl border border-border animate-pulse" />
                  ))
                ) : filteredJurisdictions.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-muted-foreground">
                    <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No jurisdictions found</p>
                  </div>
                ) : (
                  filteredJurisdictions.map((jurisdiction, index) => (
                    <motion.div
                      key={jurisdiction.countryCode}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => setSelectedJurisdiction(jurisdiction)}
                      className="bg-card rounded-xl border border-border p-4 hover:border-violet-500/40 hover:shadow-lg transition-all cursor-pointer"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-lg">
                            {jurisdiction.countryCode}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{jurisdiction.countryName}</p>
                            <p className="text-xs text-muted-foreground">{jurisdiction.regulatorName || 'N/A'}</p>
                          </div>
                        </div>
                        {jurisdiction.blockedReasons ? (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        ) : jurisdiction.passportingAllowed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <Shield className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>

                      {/* Region Badge */}
                      <div className="mb-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${REGION_COLORS[jurisdiction.region]}`}>
                          {REGION_LABELS[jurisdiction.region]}
                        </span>
                      </div>

                      {/* Investor Types */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {getInvestorTypesAllowed(jurisdiction).length > 0 ? (
                          getInvestorTypesAllowed(jurisdiction).map(type => (
                            <span key={type} className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                              {type}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-red-400">Blocked</span>
                        )}
                      </div>

                      {/* Quick Info */}
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        {jurisdiction.retailAllowed && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> Retail
                          </span>
                        )}
                        {jurisdiction.requiresProspectus && (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" /> Prospectus
                          </span>
                        )}
                        {jurisdiction.requiresLocalLanguage && (
                          <span className="flex items-center gap-1">
                            🌐 {jurisdiction.localLanguage?.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            ) : (
              /* Table View */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Region</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Regulator</th>
                        <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Retail</th>
                        <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Professional</th>
                        <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Passport</th>
                        <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Prospectus</th>
                        <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Local Lang</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-muted-foreground">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                            Loading...
                          </td>
                        </tr>
                      ) : filteredJurisdictions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-muted-foreground">
                            No jurisdictions found
                          </td>
                        </tr>
                      ) : (
                        filteredJurisdictions.map((j) => (
                          <tr 
                            key={j.countryCode} 
                            className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                            onClick={() => setSelectedJurisdiction(j)}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{j.countryCode}</span>
                                <span className="text-sm text-foreground">{j.countryName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${REGION_COLORS[j.region]}`}>
                                {j.region.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{j.regulatorName || '-'}</td>
                            <td className="py-3 px-4 text-center">
                              {j.retailAllowed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {j.professionalAllowed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {j.passportingAllowed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                              ) : (
                                <XCircle className="w-4 h-4 text-muted-foreground mx-auto" />
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {j.requiresProspectus ? (
                                <CheckCircle2 className="w-4 h-4 text-yellow-400 mx-auto" />
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {j.requiresLocalLanguage ? (
                                <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                                  {j.localLanguage?.toUpperCase()}
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              {jurisdictions.length} jurisdictions configured
            </p>
          </div>
        </footer>
      </div>

      {/* Jurisdiction Detail Modal */}
      {selectedJurisdiction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedJurisdiction(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-card rounded-xl border border-border shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 p-6 border-b border-border bg-card z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold">
                    {selectedJurisdiction.countryCode}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedJurisdiction.countryName}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${REGION_COLORS[selectedJurisdiction.region]}`}>
                      {REGION_LABELS[selectedJurisdiction.region]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJurisdiction(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Blocked Warning */}
              {selectedJurisdiction.blockedReasons && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Blocked Jurisdiction</span>
                  </div>
                  <p className="text-sm text-red-400/80">{selectedJurisdiction.blockedReasons}</p>
                </div>
              )}

              {/* Investor Types */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Allowed Investor Types</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'retailAllowed', label: 'Retail', value: selectedJurisdiction.retailAllowed },
                    { key: 'professionalAllowed', label: 'Professional', value: selectedJurisdiction.professionalAllowed },
                    { key: 'qualifiedAllowed', label: 'Qualified', value: selectedJurisdiction.qualifiedAllowed },
                    { key: 'accreditedAllowed', label: 'Accredited', value: selectedJurisdiction.accreditedAllowed },
                    { key: 'wholesaleAllowed', label: 'Wholesale', value: selectedJurisdiction.wholesaleAllowed },
                  ].map(item => (
                    <div key={item.key} className={`p-3 rounded-lg border ${item.value ? 'bg-green-500/10 border-green-500/20' : 'bg-muted border-border'}`}>
                      <div className="flex items-center gap-2">
                        {item.value ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${item.value ? 'text-green-400' : 'text-muted-foreground'}`}>
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Info */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Regulatory Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Regulator</span>
                    <span className="text-sm font-medium text-foreground">{selectedJurisdiction.regulatorName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Notification Required</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedJurisdiction.regulatorNotification ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">EU Passporting</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.passportingAllowed ? 'text-green-400' : 'text-muted-foreground'}`}>
                      {selectedJurisdiction.passportingAllowed ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documentation Requirements */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Documentation Requirements</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Prospectus Required</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.requiresProspectus ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                      {selectedJurisdiction.requiresProspectus ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Local KID Required</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedJurisdiction.requiresLocalKID ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Local Language</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedJurisdiction.requiresLocalLanguage 
                        ? selectedJurisdiction.localLanguage?.toUpperCase() || 'Yes'
                        : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Marketing Restrictions */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Marketing Restrictions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Cold Calling Allowed</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.coldCallingAllowed ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedJurisdiction.coldCallingAllowed ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Advertising Allowed</span>
                    <span className={`text-sm font-medium ${selectedJurisdiction.advertisingAllowed ? 'text-green-400' : 'text-red-400'}`}>
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
