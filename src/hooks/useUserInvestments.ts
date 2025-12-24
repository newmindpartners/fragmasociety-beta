import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type InvestmentStep = 
  | 'verify_identity'
  | 'select_deal'
  | 'review_documents'
  | 'payment_processing'
  | 'funds_in_escrow'
  | 'investment_complete';

export interface UserInvestment {
  id: string;
  user_id: string;
  deal_id: string;
  current_step: InvestmentStep;
  step_deadline: string | null;
  created_at: string;
  updated_at: string;
  deal?: {
    id: string;
    title: string;
    banner_image: string | null;
    category: string;
  };
}

const STEP_ORDER: InvestmentStep[] = [
  'verify_identity',
  'select_deal',
  'review_documents',
  'payment_processing',
  'funds_in_escrow',
  'investment_complete'
];

export const getStepIndex = (step: InvestmentStep): number => {
  return STEP_ORDER.indexOf(step);
};

export const getNextStep = (currentStep: InvestmentStep): InvestmentStep | null => {
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  if (currentIndex < STEP_ORDER.length - 1) {
    return STEP_ORDER[currentIndex + 1];
  }
  return null;
};

export const useUserInvestments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-investments', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_investments')
        .select(`
          *,
          deal:deals(id, title, banner_image, category)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserInvestment[];
    },
    enabled: !!user?.id,
  });
};

export const useAdvanceInvestmentStep = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ investmentId, newStep }: { investmentId: string; newStep: InvestmentStep }) => {
      const { data, error } = await supabase
        .from('user_investments')
        .update({ current_step: newStep })
        .eq('id', investmentId)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-investments'] });
    },
  });
};

export const useCreateInvestment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ dealId, initialStep = 'verify_identity' }: { dealId: string; initialStep?: InvestmentStep }) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('user_investments')
        .insert({
          user_id: user.id,
          deal_id: dealId,
          current_step: initialStep,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-investments'] });
    },
  });
};
