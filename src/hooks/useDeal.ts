import { useQuery } from "@tanstack/react-query";
import type { DealData } from "@/types/deal";

const API_URL = import.meta.env.VITE_API_URL || '';

// Transform API response to DealData interface
const transformDealData = (row: any): DealData => ({
  id: row.id,
  category: row.category,
  subcategory: row.subcategory,
  leaderName: row.leaderName || row.leader_name,
  leaderRole: row.leaderRole || row.leader_role,
  leaderImage: row.leaderImage || row.leader_image || "",
  bannerImage: row.bannerImage || row.banner_image || "",
  title: row.title,
  tagline: row.tagline,
  description: row.description,
  heroVideoUrl: row.heroVideoUrl || row.hero_video_url || "",
  pitchVideoUrl: row.pitchVideoUrl || row.pitch_video_url || "",
  assetVideoUrl: row.assetVideoUrl || row.asset_video_url || "",
  teamVideoUrl: row.teamVideoUrl || row.team_video_url || "",
  assetImages: row.assetImages || row.asset_images || [],
  minTicket: row.minTicket || row.min_ticket,
  maxTicket: row.maxTicket || row.max_ticket || "",
  targetReturn: row.targetReturn || row.target_return,
  term: row.term,
  risk: (row.risk || "Medium") as "Low" | "Medium" | "High",
  instrumentType: row.instrumentType || row.instrument_type,
  currency: row.currency,
  distributionFrequency: row.distributionFrequency || row.distribution_frequency || "",
  totalRaise: row.totalRaise || row.total_raise,
  currentRaised: row.currentRaised || row.current_raised || "0",
  investorCount: row.investorCount || row.investor_count || 0,
  team: row.team || [],
  strategies: row.strategies || [],
  trackRecord: row.trackRecord || row.track_record || [],
  totalPastProfit: row.totalPastProfit || row.total_past_profit || "",
  currentProperties: row.currentProperties || row.current_properties || [],
  marketData: row.marketData || row.market_data || undefined,
  caseStudies: row.caseStudies || row.case_studies || [],
  timeline: row.timeline || undefined,
  financials: row.financials || undefined,
  specialOpportunity: row.specialOpportunity || row.special_opportunity || undefined,
  risks: row.risks || [],
  marketHighlights: row.marketHighlights || row.market_highlights || [],
});

export const useDeal = (dealId: string | undefined) => {
  return useQuery({
    queryKey: ["deal", dealId],
    queryFn: async () => {
      if (!dealId) throw new Error("Deal ID is required");
      
      const response = await fetch(`${API_URL}/api/deals/${dealId}`);
      
      if (!response.ok) {
        if (response.status === 404) throw new Error("Deal not found");
        throw new Error("Failed to fetch deal");
      }

      const data = await response.json();
      if (!data.success || !data.deal) throw new Error("Deal not found");

      return transformDealData(data.deal);
    },
    enabled: !!dealId,
  });
};

export const useDeals = () => {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/deals`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch deals");
      }

      const data = await response.json();
      return (data.deals || []).map(transformDealData);
    },
  });
};
