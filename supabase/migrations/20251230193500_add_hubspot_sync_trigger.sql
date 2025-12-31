-- Enable the pg_net extension for making HTTP requests from PostgreSQL
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create a function that will be called by the trigger
CREATE OR REPLACE FUNCTION public.sync_early_access_to_hubspot()
RETURNS TRIGGER AS $$
DECLARE
  payload jsonb;
  eu_quals text;
  us_quals text;
  inv_priorities text;
  asset_ints text;
  tags_str text;
BEGIN
  -- Convert arrays to comma-separated strings
  eu_quals := COALESCE(array_to_string(NEW.eu_professional_qualifications, ', '), '');
  us_quals := COALESCE(array_to_string(NEW.us_accredited_qualifications, ', '), '');
  inv_priorities := COALESCE(array_to_string(NEW.investment_priorities, ', '), '');
  asset_ints := COALESCE(array_to_string(NEW.asset_interests, ', '), '');
  tags_str := COALESCE(array_to_string(NEW.tags, ', '), '');

  -- Build the payload for n8n
  payload := jsonb_build_object(
    'type', 'INSERT',
    'table', 'early_access_submissions',
    'record', jsonb_build_object(
      'id', NEW.id,
      'full_name', NEW.full_name,
      'email', NEW.email,
      'country', NEW.country,
      'city', NEW.city,
      'registering_as', NEW.registering_as,
      'entity_name', NEW.entity_name,
      'is_us_person', NEW.is_us_person,
      'investor_status', NEW.investor_status,
      'eu_professional_qualifications', eu_quals,
      'eu_qualifications_count', NEW.eu_qualifications_count,
      'us_accredited_qualifications', us_quals,
      'annual_income', NEW.annual_income,
      'investable_capital', NEW.investable_capital,
      'is_pep', NEW.is_pep,
      'is_sanctioned', NEW.is_sanctioned,
      'investment_amount_3_6_months', NEW.investment_amount_3_6_months,
      'preferred_ticket_size', NEW.preferred_ticket_size,
      'investment_horizon', NEW.investment_horizon,
      'investment_priorities', inv_priorities,
      'asset_interests', asset_ints,
      'other_rwa_description', NEW.other_rwa_description,
      'preferred_contact_channel', NEW.preferred_contact_channel,
      'phone_whatsapp_number', NEW.phone_whatsapp_number,
      'consent_to_contact', NEW.consent_to_contact,
      'marketing_consent', NEW.marketing_consent,
      'tags', tags_str,
      'created_at', NEW.created_at
    )
  );

  -- Make HTTP POST request to n8n webhook
  -- Note: body must be cast to text for proper JSON serialization
  PERFORM net.http_post(
    url := 'https://newmind.app.n8n.cloud/webhook/supabase-early-access',
    body := payload::text,
    headers := jsonb_build_object('Content-Type', 'application/json')
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the early_access_submissions table
DROP TRIGGER IF EXISTS trigger_sync_to_hubspot ON public.early_access_submissions;

CREATE TRIGGER trigger_sync_to_hubspot
  AFTER INSERT ON public.early_access_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_early_access_to_hubspot();

-- Add a comment explaining the trigger
COMMENT ON TRIGGER trigger_sync_to_hubspot ON public.early_access_submissions IS 
  'Automatically syncs new early access submissions to HubSpot via n8n webhook';
