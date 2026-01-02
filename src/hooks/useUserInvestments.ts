import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || '';

export type InvestmentStep = 
  | 'verify_identity'
  | 'select_deal'
  | 'review_documents'
  | 'payment_processing'
  | 'funds_in_escrow'
  | 'investment_complete';

export interface UserInvestment {
  id: string;
  userId: string;
  dealId: string;
  currentStep: InvestmentStep;
  stepDeadline: string | null;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deal?: {
    id: string;
    title: string;
    bannerImage: string | null;
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
      
      const response = await fetch(
        `${API_URL}/api/users/me/investments?clerkUserId=${user.id}`
      );

      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Failed to fetch investments');
      }

      const data = await response.json();
      return (data.investments || []) as UserInvestment[];
    },
    enabled: !!user?.id,
  });
};

export const useAdvanceInvestmentStep = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ investmentId, newStep }: { investmentId: string; newStep: InvestmentStep }) => {
      const response = await fetch(
        `${API_URL}/api/investments/${investmentId}/step?clerkUserId=${user?.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step: newStep }),
        }
      );

      if (!response.ok) throw new Error('Failed to update investment step');
      const data = await response.json();
      return data.investment;
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
      
      const response = await fetch(`${API_URL}/api/investments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkUserId: user.id,
          dealId,
          initialStep,
        }),
      });

      if (!response.ok) throw new Error('Failed to create investment');
      const data = await response.json();
      return data.investment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-investments'] });
    },
  });
};
