-- Create deals table for storing signature deal data
CREATE TABLE public.deals (
  id TEXT NOT NULL PRIMARY KEY,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  leader_name TEXT NOT NULL,
  leader_role TEXT NOT NULL,
  leader_image TEXT,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  hero_video_url TEXT,
  pitch_video_url TEXT,
  asset_video_url TEXT,
  team_video_url TEXT,
  asset_images JSONB DEFAULT '[]'::jsonb,
  min_ticket TEXT NOT NULL,
  max_ticket TEXT,
  target_return TEXT NOT NULL,
  term TEXT NOT NULL,
  risk TEXT NOT NULL CHECK (risk IN ('Low', 'Medium', 'High')),
  instrument_type TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  distribution_frequency TEXT,
  total_raise TEXT NOT NULL,
  current_raised TEXT DEFAULT '0',
  investor_count INTEGER DEFAULT 0,
  team JSONB DEFAULT '[]'::jsonb,
  strategies JSONB DEFAULT '[]'::jsonb,
  track_record JSONB DEFAULT '[]'::jsonb,
  total_past_profit TEXT,
  current_properties JSONB DEFAULT '[]'::jsonb,
  market_data JSONB,
  case_studies JSONB DEFAULT '[]'::jsonb,
  timeline JSONB,
  financials JSONB,
  special_opportunity JSONB,
  risks JSONB DEFAULT '[]'::jsonb,
  market_highlights JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (deals are public content)
CREATE POLICY "Deals are publicly readable" 
ON public.deals 
FOR SELECT 
USING (true);

-- Create policy for authenticated admin insert/update (you can restrict this further later)
CREATE POLICY "Authenticated users can manage deals" 
ON public.deals 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_deals_updated_at
BEFORE UPDATE ON public.deals
FOR EACH ROW
EXECUTE FUNCTION public.update_deals_updated_at();

-- Create index for faster lookups
CREATE INDEX idx_deals_category ON public.deals(category);
CREATE INDEX idx_deals_created_at ON public.deals(created_at DESC);