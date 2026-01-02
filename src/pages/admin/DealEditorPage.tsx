import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Briefcase,
  Save,
  ArrowLeft,
  Eye,
  Loader2,
  AlertTriangle,
  XCircle,
  FileText,
  Building2,
  DollarSign,
  Image,
  Users,
  BarChart3,
  Shield,
  PieChart,
  Settings,
} from "lucide-react";

// Tab Components
import { BasicInfoTab } from "@/components/admin/deals/BasicInfoTab";
import { IssuerTab } from "@/components/admin/deals/IssuerTab";
import { TermsTab } from "@/components/admin/deals/TermsTab";
import { MediaTab } from "@/components/admin/deals/MediaTab";
import { TeamTab } from "@/components/admin/deals/TeamTab";
import { CategoryDataTab } from "@/components/admin/deals/CategoryDataTab";
import { RisksTab } from "@/components/admin/deals/RisksTab";
import { CapTableTab } from "@/components/admin/deals/CapTableTab";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FileText },
  { id: 'issuer', label: 'Issuer', icon: Building2 },
  { id: 'terms', label: 'Terms', icon: DollarSign },
  { id: 'media', label: 'Media', icon: Image },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'category', label: 'Category Data', icon: BarChart3 },
  { id: 'risks', label: 'Risks', icon: Shield },
  { id: 'captable', label: 'Cap Table', icon: PieChart },
];

interface DealFormData {
  // Basic Info
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  subcategory: string;
  status: string;
  
  // Issuer
  issuerId: string | null;
  
  // Leadership
  leaderName: string;
  leaderRole: string;
  leaderImage: string;
  leaderBio: string;
  leaderCredentials: string[];
  
  // Terms
  currency: string;
  minTicket: string;
  maxTicket: string;
  totalRaise: string;
  targetReturn: string;
  term: string;
  distributionFrequency: string;
  instrumentType: string;
  risk: string;
  
  // Media
  bannerImage: string;
  heroVideoUrl: string;
  pitchVideoUrl: string;
  assetVideoUrl: string;
  teamVideoUrl: string;
  assetImages: string[];
  
  // Team
  team: Array<{
    name: string;
    role: string;
    bio: string;
    credentials: string[];
    image: string;
  }>;
  
  // Category-specific
  trackRecord: any[];
  totalPastProfit: string;
  currentProperties: any[];
  strategies: any[];
  marketData: any;
  financials: any;
  caseStudies: any[];
  timeline: any;
  specialOpportunity: any;
  realEstateData: any;
  sportsData: any;
  artData: any;
  privateEquityData: any;
  
  // Risks
  risks: Array<{ title: string; description: string }>;
}

const defaultFormData: DealFormData = {
  title: '',
  slug: '',
  tagline: '',
  description: '',
  category: 'Real Estate',
  subcategory: '',
  status: 'DRAFT',
  issuerId: null,
  leaderName: '',
  leaderRole: '',
  leaderImage: '',
  leaderBio: '',
  leaderCredentials: [],
  currency: 'EUR',
  minTicket: '',
  maxTicket: '',
  totalRaise: '',
  targetReturn: '',
  term: '',
  distributionFrequency: '',
  instrumentType: 'Notes',
  risk: 'Medium',
  bannerImage: '',
  heroVideoUrl: '',
  pitchVideoUrl: '',
  assetVideoUrl: '',
  teamVideoUrl: '',
  assetImages: [],
  team: [],
  trackRecord: [],
  totalPastProfit: '',
  currentProperties: [],
  strategies: [],
  marketData: null,
  financials: null,
  caseStudies: [],
  timeline: null,
  specialOpportunity: null,
  realEstateData: null,
  sportsData: null,
  artData: null,
  privateEquityData: null,
  risks: [],
};

const DealEditorPage = () => {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(!!dealId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<DealFormData>(defaultFormData);
  const [hasChanges, setHasChanges] = useState(false);

  const isEditing = !!dealId;

  // Fetch deal data if editing
  useEffect(() => {
    if (dealId) {
      fetchDeal();
    }
  }, [dealId]);

  const fetchDeal = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/deals/${dealId}`);
      const data = await response.json();
      
      if (data.success && data.deal) {
        const deal = data.deal;
        setFormData({
          title: deal.title || '',
          slug: deal.slug || '',
          tagline: deal.tagline || '',
          description: deal.description || '',
          category: deal.category || 'Real Estate',
          subcategory: deal.subcategory || '',
          status: deal.status || 'DRAFT',
          issuerId: deal.issuerId || null,
          leaderName: deal.leaderName || '',
          leaderRole: deal.leaderRole || '',
          leaderImage: deal.leaderImage || '',
          leaderBio: deal.leaderBio || '',
          leaderCredentials: deal.leaderCredentials || [],
          currency: deal.currency || 'EUR',
          minTicket: deal.minTicket?.toString() || '',
          maxTicket: deal.maxTicket?.toString() || '',
          totalRaise: deal.totalRaise?.toString() || '',
          targetReturn: deal.targetReturn || '',
          term: deal.term || '',
          distributionFrequency: deal.distributionFrequency || '',
          instrumentType: deal.instrumentType || 'Notes',
          risk: deal.risk || 'Medium',
          bannerImage: deal.bannerImage || '',
          heroVideoUrl: deal.heroVideoUrl || '',
          pitchVideoUrl: deal.pitchVideoUrl || '',
          assetVideoUrl: deal.assetVideoUrl || '',
          teamVideoUrl: deal.teamVideoUrl || '',
          assetImages: deal.assetImages || [],
          team: deal.team || [],
          trackRecord: deal.trackRecord || [],
          totalPastProfit: deal.totalPastProfit || '',
          currentProperties: deal.currentProperties || [],
          strategies: deal.strategies || [],
          marketData: deal.marketData || null,
          financials: deal.financials || null,
          caseStudies: deal.caseStudies || [],
          timeline: deal.timeline || null,
          specialOpportunity: deal.specialOpportunity || null,
          realEstateData: deal.realEstateData || null,
          sportsData: deal.sportsData || null,
          artData: deal.artData || null,
          privateEquityData: deal.privateEquityData || null,
          risks: deal.risks || [],
        });
      } else {
        setError('Deal not found');
      }
    } catch (err) {
      console.error('Fetch deal error:', err);
      setError('Failed to load deal');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (updates: Partial<DealFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      // Generate slug if not provided
      const slug = formData.slug || formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const payload = {
        ...formData,
        slug,
        minTicket: formData.minTicket ? parseFloat(formData.minTicket) : null,
        maxTicket: formData.maxTicket ? parseFloat(formData.maxTicket) : null,
        totalRaise: formData.totalRaise ? parseFloat(formData.totalRaise) : null,
      };

      const url = isEditing 
        ? `${API_URL}/api/admin/deals/${dealId}`
        : `${API_URL}/api/admin/deals`;
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setHasChanges(false);
        if (!isEditing && data.deal?.id) {
          navigate(`/admin/deals/${data.deal.id}/edit`, { replace: true });
        }
      } else {
        setError(data.error || 'Failed to save deal');
      }
    } catch (err) {
      console.error('Save deal error:', err);
      setError('Failed to save deal');
    } finally {
      setSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoTab formData={formData} updateFormData={updateFormData} />;
      case 'issuer':
        return <IssuerTab formData={formData} updateFormData={updateFormData} />;
      case 'terms':
        return <TermsTab formData={formData} updateFormData={updateFormData} />;
      case 'media':
        return <MediaTab formData={formData} updateFormData={updateFormData} />;
      case 'team':
        return <TeamTab formData={formData} updateFormData={updateFormData} />;
      case 'category':
        return <CategoryDataTab formData={formData} updateFormData={updateFormData} />;
      case 'risks':
        return <RisksTab formData={formData} updateFormData={updateFormData} />;
      case 'captable':
        return <CapTableTab dealId={dealId} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="theme-dashboard min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading deal...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/deals')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-semibold text-foreground">
                    {isEditing ? 'Edit Deal' : 'New Deal'}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {formData.title || 'Untitled deal'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {formData.slug && (
                <a
                  href={`/deal/${formData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </a>
              )}
              <button
                onClick={handleSave}
                disabled={saving || !formData.title || !formData.leaderName}
                className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {hasChanges ? 'Save Changes' : 'Save'}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 bg-background">
          <div className="mx-auto w-full max-w-[1400px] px-6 py-6 lg:px-10">
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

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-border mb-6 -mx-6 px-6">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                // Disable cap table for new deals
                const isDisabled = tab.id === 'captable' && !isEditing;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => !isDisabled && setActiveTab(tab.id)}
                    disabled={isDisabled}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'border-blue-600 text-blue-600'
                        : isDisabled
                        ? 'border-transparent text-muted-foreground/50 cursor-not-allowed'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DealEditorPage;
