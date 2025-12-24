-- Create investment status enum
CREATE TYPE public.investment_step AS ENUM (
  'verify_identity',
  'select_deal',
  'review_documents',
  'payment_processing',
  'funds_in_escrow',
  'investment_complete'
);

-- Create user investments table
CREATE TABLE public.user_investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id TEXT NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  current_step investment_step NOT NULL DEFAULT 'verify_identity',
  step_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, deal_id)
);

-- Enable RLS
ALTER TABLE public.user_investments ENABLE ROW LEVEL SECURITY;

-- Users can view their own investments
CREATE POLICY "Users can view their own investments"
ON public.user_investments
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own investments
CREATE POLICY "Users can create their own investments"
ON public.user_investments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own investments (for automated step advancement)
CREATE POLICY "Users can update their own investments"
ON public.user_investments
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_investments_updated_at
BEFORE UPDATE ON public.user_investments
FOR EACH ROW
EXECUTE FUNCTION public.update_deals_updated_at();