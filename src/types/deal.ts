// Reusable Deal Data Template for Signature Deals
// Use this interface for all deal detail pages

export interface DealTeamMember {
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  image?: string;
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
}

export interface DealTrackRecord {
  address: string;
  acquisitionPrice: string;
  totalInvestment: string;
  salePrice: string;
  profit: string;
}

export interface DealStrategy {
  title: string;
  description: string;
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
  
  // Track record (optional)
  trackRecord?: DealTrackRecord[];
  totalPastProfit?: string;
  
  // Current portfolio (optional)
  currentProperties?: DealProperty[];
  
  // Risks
  risks: DealRisk[];
  
  // Market context (optional)
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
  risks: [],
  marketHighlights: [],
});
