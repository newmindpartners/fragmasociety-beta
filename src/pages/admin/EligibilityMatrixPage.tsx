import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Grid3X3,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  Users,
  Building2,
  ChevronDown,
  Download,
  RefreshCw,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Investor types
const INVESTOR_TYPES = ['RETAIL', 'PROFESSIONAL', 'QUALIFIED', 'ACCREDITED', 'WHOLESALE', 'QII'];

// Regions for filtering
const REGIONS = [
  { id: 'all', name: 'All Regions' },
  { id: 'EU', name: 'European Union' },
  { id: 'EEA', name: 'EEA (non-EU)' },
  { id: 'EU_EQUIVALENT', name: 'EU Equivalent' },
  { id: 'THIRD_COUNTRY_FRIENDLY', name: 'Third Country (Friendly)' },
  { id: 'THIRD_COUNTRY_RESTRICTED', name: 'Third Country (Restricted)' },
];

// Sample country eligibility data
const COUNTRY_DATA = [
  { code: 'LU', name: 'Luxembourg', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'FR', name: 'France', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'DE', name: 'Germany', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'IT', name: 'Italy', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'ES', name: 'Spain', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'NL', name: 'Netherlands', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'BE', name: 'Belgium', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'AT', name: 'Austria', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'IE', name: 'Ireland', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'PT', name: 'Portugal', region: 'EU', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'CH', name: 'Switzerland', region: 'EU_EQUIVALENT', retail: false, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: false },
  { code: 'GB', name: 'United Kingdom', region: 'EU_EQUIVALENT', retail: false, professional: true, qualified: true, accredited: false, wholesale: true, qii: true, passporting: false },
  { code: 'NO', name: 'Norway', region: 'EEA', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'IS', name: 'Iceland', region: 'EEA', retail: true, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'LI', name: 'Liechtenstein', region: 'EEA', retail: false, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: true },
  { code: 'MC', name: 'Monaco', region: 'EU_EQUIVALENT', retail: false, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: false },
  { code: 'US', name: 'United States', region: 'THIRD_COUNTRY_RESTRICTED', retail: false, professional: false, qualified: false, accredited: true, wholesale: false, qii: true, passporting: false },
  { code: 'CA', name: 'Canada', region: 'THIRD_COUNTRY_FRIENDLY', retail: false, professional: true, qualified: true, accredited: true, wholesale: false, qii: true, passporting: false },
  { code: 'SG', name: 'Singapore', region: 'THIRD_COUNTRY_FRIENDLY', retail: false, professional: true, qualified: true, accredited: true, wholesale: false, qii: true, passporting: false },
  { code: 'AU', name: 'Australia', region: 'THIRD_COUNTRY_FRIENDLY', retail: false, professional: true, qualified: true, accredited: false, wholesale: true, qii: true, passporting: false },
  { code: 'JP', name: 'Japan', region: 'THIRD_COUNTRY_FRIENDLY', retail: false, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: false },
  { code: 'AE', name: 'UAE', region: 'THIRD_COUNTRY_FRIENDLY', retail: false, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: false },
  { code: 'HK', name: 'Hong Kong', region: 'THIRD_COUNTRY_FRIENDLY', retail: false, professional: true, qualified: true, accredited: false, wholesale: false, qii: true, passporting: false },
  { code: 'SA', name: 'Saudi Arabia', region: 'THIRD_COUNTRY_RESTRICTED', retail: false, professional: false, qualified: true, accredited: false, wholesale: false, qii: true, passporting: false },
  { code: 'QA', name: 'Qatar', region: 'THIRD_COUNTRY_RESTRICTED', retail: false, professional: false, qualified: true, accredited: false, wholesale: false, qii: true, passporting: false },
];

const EligibilityMatrixPage = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [showPassportingOnly, setShowPassportingOnly] = useState(false);

  const filteredCountries = useMemo(() => {
    return COUNTRY_DATA.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           country.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = regionFilter === 'all' || country.region === regionFilter;
      const matchesPassporting = !showPassportingOnly || country.passporting;
      return matchesSearch && matchesRegion && matchesPassporting;
    });
  }, [searchQuery, regionFilter, showPassportingOnly]);

  const stats = useMemo(() => {
    const total = COUNTRY_DATA.length;
    const retailAllowed = COUNTRY_DATA.filter(c => c.retail).length;
    const professionalAllowed = COUNTRY_DATA.filter(c => c.professional).length;
    const passportingCountries = COUNTRY_DATA.filter(c => c.passporting).length;
    
    return { total, retailAllowed, professionalAllowed, passportingCountries };
  }, []);

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'EU': return 'bg-blue-500/10 text-blue-400';
      case 'EEA': return 'bg-cyan-500/10 text-cyan-400';
      case 'EU_EQUIVALENT': return 'bg-violet-500/10 text-violet-400';
      case 'THIRD_COUNTRY_FRIENDLY': return 'bg-green-500/10 text-green-400';
      case 'THIRD_COUNTRY_RESTRICTED': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const renderCell = (allowed: boolean) => {
    if (allowed) {
      return (
        <div className="flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <XCircle className="w-4 h-4 text-red-400/50" />
      </div>
    );
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
                <Grid3X3 className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">Eligibility Matrix</h1>
                <p className="text-sm text-muted-foreground">Visual overview of investor eligibility by country and type</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Total Countries</p>
              </div>
              <p className="text-2xl font-semibold">{stats.total}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-400" />
                <p className="text-xs text-muted-foreground">Retail Allowed</p>
              </div>
              <p className="text-2xl font-semibold text-blue-400">{stats.retailAllowed}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-violet-400" />
                <p className="text-xs text-muted-foreground">Professional Allowed</p>
              </div>
              <p className="text-2xl font-semibold text-violet-400">{stats.professionalAllowed}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <p className="text-xs text-muted-foreground">EU Passporting</p>
              </div>
              <p className="text-2xl font-semibold text-green-400">{stats.passportingCountries}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              {REGIONS.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showPassportingOnly}
                onChange={(e) => setShowPassportingOnly(e.target.checked)}
                className="w-4 h-4 rounded border-border text-violet-600 focus:ring-violet-500"
              />
              <span className="text-muted-foreground">EU Passporting only</span>
            </label>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-muted-foreground">Allowed</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400/50" />
              <span className="text-muted-foreground">Not Allowed</span>
            </div>
            <div className="h-4 border-l border-border mx-2" />
            {REGIONS.slice(1).map(region => (
              <div key={region.id} className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] ${getRegionColor(region.id)}`}>
                  {region.id.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>

          {/* Matrix Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground sticky left-0 bg-muted/50 z-10">
                      Country
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">
                      Region
                    </th>
                    {INVESTOR_TYPES.map(type => (
                      <th key={type} className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">
                        {type}
                      </th>
                    ))}
                    <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">
                      Passporting
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCountries.map((country, index) => (
                    <motion.tr
                      key={country.code}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 sticky left-0 bg-card z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getFlagEmoji(country.code)}</span>
                          <div>
                            <p className="text-sm font-medium">{country.name}</p>
                            <p className="text-xs text-muted-foreground">{country.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${getRegionColor(country.region)}`}>
                          {country.region.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">{renderCell(country.retail)}</td>
                      <td className="px-4 py-3">{renderCell(country.professional)}</td>
                      <td className="px-4 py-3">{renderCell(country.qualified)}</td>
                      <td className="px-4 py-3">{renderCell(country.accredited)}</td>
                      <td className="px-4 py-3">{renderCell(country.wholesale)}</td>
                      <td className="px-4 py-3">{renderCell(country.qii)}</td>
                      <td className="px-4 py-3">{renderCell(country.passporting)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">No countries match your filters</p>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> This matrix shows general eligibility based on Luxembourg securitisation law and EU passporting rules. 
              Actual eligibility may vary based on specific deal characteristics, investor documentation, and regulatory changes. 
              Always verify eligibility with the compliance team before proceeding.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper function to get flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default EligibilityMatrixPage;
