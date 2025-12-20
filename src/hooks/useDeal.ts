import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DealData } from "@/types/deal";

// Transform database row to DealData interface
const transformDealData = (row: any): DealData => ({
  id: row.id,
  category: row.category,
  subcategory: row.subcategory,
  leaderName: row.leader_name,
  leaderRole: row.leader_role,
  leaderImage: row.leader_image || "",
  bannerImage: row.banner_image || "",
  title: row.title,
  tagline: row.tagline,
  description: row.description,
  heroVideoUrl: row.hero_video_url || "",
  pitchVideoUrl: row.pitch_video_url || "",
  assetVideoUrl: row.asset_video_url || "",
  teamVideoUrl: row.team_video_url || "",
  assetImages: row.asset_images || [],
  minTicket: row.min_ticket,
  maxTicket: row.max_ticket || "",
  targetReturn: row.target_return,
  term: row.term,
  risk: row.risk as "Low" | "Medium" | "High",
  instrumentType: row.instrument_type,
  currency: row.currency,
  distributionFrequency: row.distribution_frequency || "",
  totalRaise: row.total_raise,
  currentRaised: row.current_raised || "0",
  investorCount: row.investor_count || 0,
  team: row.team || [],
  strategies: row.strategies || [],
  trackRecord: row.track_record || [],
  totalPastProfit: row.total_past_profit || "",
  currentProperties: row.current_properties || [],
  marketData: row.market_data || undefined,
  caseStudies: row.case_studies || [],
  timeline: row.timeline || undefined,
  financials: row.financials || undefined,
  specialOpportunity: row.special_opportunity || undefined,
  risks: row.risks || [],
  marketHighlights: row.market_highlights || [],
});

export const useDeal = (dealId: string | undefined) => {
  return useQuery({
    queryKey: ["deal", dealId],
    queryFn: async () => {
      if (!dealId) throw new Error("Deal ID is required");
      
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("id", dealId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Deal not found");

      return transformDealData(data);
    },
    enabled: !!dealId,
  });
};

export const useDeals = () => {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(transformDealData);
    },
  });
};
