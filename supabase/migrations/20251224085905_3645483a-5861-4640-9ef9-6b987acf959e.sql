-- Create the update function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create transfers table for tracking deposits and withdrawals
CREATE TABLE public.transfers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  reference TEXT,
  bank_name TEXT,
  account_last4 TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own transfers" 
ON public.transfers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transfers" 
ON public.transfers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transfers" 
ON public.transfers 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_transfers_updated_at
BEFORE UPDATE ON public.transfers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for transfers table
ALTER PUBLICATION supabase_realtime ADD TABLE public.transfers;