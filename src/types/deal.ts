// Comprehensive Deal Data Template for Signature Deals

export interface DealTeamMember {
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  image?: string;
  pressLinks?: { title: string; source: string; }[];
}

export interface DealRisk {
  title: string;
  description: string;
}

export interface DealProperty {
  address: string;
  acquisitionPrice?: string;
  constructionCost?: string;
  projectedExitPrice?: string;
  size?: string;
  specs?: string;
  status?: "acquisition" | "construction" | "completed" | "listed";
  image?: string;
}

export interface DealTrackRecord {
  address: string;
  acquisitionPrice: string;
  totalInvestment: string;
  salePrice: string;
  profit: string;
  year?: string;
}

export interface DealStrategy {
  title: string;
  description: string;
  icon?: string;
}

export interface DealCaseStudy {
  address: string;
  acquisitionPrice: string;
  constructionCost: string;
  exitPrice: string;
  profit: string;
  size: string;
  specs: string;
  description: string;
  yearBuilt?: string;
  architect?: string;
  features?: string[];
  images?: string[];
}

export interface DealMarketData {
  region: string;
  stats: {
    label: string;
    value: string;
    trend?: "up" | "down" | "stable";
    description?: string;
  }[];
  projections: {
    period: string;
    description: string;
  }[];
  highlights: string[];
}

export interface DealTimeline {
  phases: {
    date: string;
    title: string;
    description?: string;
    status?: "completed" | "current" | "upcoming";
  }[];
  totalDuration: string;
}

export interface DealFinancials {
  projectedProfit: string;
  optimisticScenario?: string;
  conservativeScenario?: string;
  portfolioTarget?: string;
  resaleTarget?: string;
  fundSize?: string;
  minimumInvestment?: string;
  targetIRR: string;
}

export interface DealOpportunityInfo {
  title: string;
  description: string;
  bulletPoints?: string[];
}

export interface DealData {
  // Core identifiers
  id: string;
  category: string;
  subcategory: string;
  
  // Deal leader info
  leaderName: string;
  leaderRole: string;
  leaderImage: string;
  bannerImage?: string; // Transparent cutout image for hero
  
  // Deal content
  title: string;
  tagline: string;
  description: string;
  
  // Media assets
  heroVideoUrl: string;
  pitchVideoUrl: string;
  assetVideoUrl: string;
  teamVideoUrl: string;
  assetImages: string[];
  
  // Key terms
  minTicket: string;
  maxTicket: string;
  targetReturn: string;
  term: string;
  risk: "Low" | "Medium" | "High";
  instrumentType: string;
  currency: string;
  distributionFrequency: string;
  
  // Fundraising status
  totalRaise: string;
  currentRaised: string;
  investorCount: number;
  
  // Team & credentials
  team: DealTeamMember[];
  
  // Investment strategy
  strategies?: DealStrategy[];
  
  // Track record
  trackRecord?: DealTrackRecord[];
  totalPastProfit?: string;
  
  // Current portfolio
  currentProperties?: DealProperty[];
  
  // Market Analysis
  marketData?: DealMarketData;
  
  // Case Studies (detailed past projects)
  caseStudies?: DealCaseStudy[];
  
  // Timeline
  timeline?: DealTimeline;
  
  // Financial Projections
  financials?: DealFinancials;
  
  // Special Opportunity (e.g., Pacific Palisades)
  specialOpportunity?: DealOpportunityInfo;
  
  // Risks
  risks: DealRisk[];
  
  // Market context (simple highlights - legacy)
  marketHighlights?: string[];
}

// Template for creating new deals
export const createDealTemplate = (): Partial<DealData> => ({
  id: "",
  category: "",
  subcategory: "",
  leaderName: "",
  leaderRole: "",
  leaderImage: "",
  title: "",
  tagline: "",
  description: "",
  heroVideoUrl: "",
  pitchVideoUrl: "",
  assetVideoUrl: "",
  teamVideoUrl: "",
  assetImages: [],
  minTicket: "",
  maxTicket: "",
  targetReturn: "",
  term: "",
  risk: "Medium",
  instrumentType: "",
  currency: "EUR",
  distributionFrequency: "",
  totalRaise: "",
  currentRaised: "",
  investorCount: 0,
  team: [],
  strategies: [],
  trackRecord: [],
  currentProperties: [],
  caseStudies: [],
  risks: [],
  marketHighlights: [],
});
