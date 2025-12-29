-- Create table for early access submissions with full questionnaire data
CREATE TABLE public.early_access_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identity
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  
  -- Investor Profile
  registering_as TEXT NOT NULL, -- 'individual', 'company_spv', 'family_office', 'fund_asset_manager'
  entity_name TEXT, -- Only if company/fund
  is_us_person BOOLEAN,
  investor_status TEXT, -- 'retail', 'professional_eu', 'accredited_us', 'institutional', 'not_sure'
  
  -- EU Professional Questions
  eu_professional_qualifications TEXT[], -- Array of selected options
  eu_qualifications_count TEXT, -- '0-1', '2', '3'
  
  -- US Accredited Questions
  us_accredited_qualifications TEXT[], -- Array of selected options
  
  -- Financial Profile
  annual_income TEXT,
  investable_capital TEXT,
  
  -- Compliance
  is_pep BOOLEAN,
  is_sanctioned BOOLEAN,
  
  -- Investment Preferences
  investment_amount_3_6_months TEXT,
  preferred_ticket_size TEXT,
  investment_horizon TEXT,
  investment_priorities TEXT[], -- Array of selected options
  
  -- Asset Interests
  asset_interests TEXT[], -- Array of selected assets
  other_rwa_description TEXT, -- If "Other RWAs" selected
  
  -- Contact Preferences
  preferred_contact_channel TEXT,
  phone_whatsapp_number TEXT,
  consent_to_contact BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  
  -- Computed Tags for routing
  tags TEXT[] DEFAULT '{}',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.early_access_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no auth required for early access form)
CREATE POLICY "Anyone can submit early access form"
  ON public.early_access_submissions
  FOR INSERT
  WITH CHECK (true);

-- Only allow reading own submissions (if authenticated)
CREATE POLICY "Users can read own submissions by email"
  ON public.early_access_submissions
  FOR SELECT
  USING (true);

-- Create index for email lookups
CREATE INDEX idx_early_access_email ON public.early_access_submissions(email);

-- Create trigger for updated_at
CREATE TRIGGER update_early_access_submissions_updated_at
  BEFORE UPDATE ON public.early_access_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();