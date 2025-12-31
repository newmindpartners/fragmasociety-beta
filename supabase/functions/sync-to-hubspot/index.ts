import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const N8N_WEBHOOK_URL = "https://newmind.app.n8n.cloud/webhook/supabase-early-access";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log("Received payload:", JSON.stringify(payload, null, 2));

    // Extract the record from the payload
    // This handles both direct calls and database trigger calls
    const record = payload.record || payload;
    
    if (!record || !record.email) {
      console.error("Invalid payload - missing record or email");
      return new Response(
        JSON.stringify({ error: "Invalid payload - missing record or email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare the data for n8n webhook
    const n8nPayload = {
      type: "INSERT",
      table: "early_access_submissions",
      record: {
        full_name: record.full_name,
        email: record.email,
        country: record.country,
        city: record.city,
        registering_as: record.registering_as,
        entity_name: record.entity_name,
        is_us_person: record.is_us_person,
        investor_status: record.investor_status,
        eu_professional_qualifications: Array.isArray(record.eu_professional_qualifications) 
          ? record.eu_professional_qualifications.join(', ') 
          : record.eu_professional_qualifications,
        eu_qualifications_count: record.eu_qualifications_count,
        us_accredited_qualifications: Array.isArray(record.us_accredited_qualifications)
          ? record.us_accredited_qualifications.join(', ')
          : record.us_accredited_qualifications,
        annual_income: record.annual_income,
        investable_capital: record.investable_capital,
        is_pep: record.is_pep,
        is_sanctioned: record.is_sanctioned,
        investment_amount_3_6_months: record.investment_amount_3_6_months,
        preferred_ticket_size: record.preferred_ticket_size,
        investment_horizon: record.investment_horizon,
        investment_priorities: Array.isArray(record.investment_priorities)
          ? record.investment_priorities.join(', ')
          : record.investment_priorities,
        asset_interests: Array.isArray(record.asset_interests)
          ? record.asset_interests.join(', ')
          : record.asset_interests,
        other_rwa_description: record.other_rwa_description,
        preferred_contact_channel: record.preferred_contact_channel,
        phone_whatsapp_number: record.phone_whatsapp_number,
        consent_to_contact: record.consent_to_contact,
        marketing_consent: record.marketing_consent,
        tags: Array.isArray(record.tags) 
          ? record.tags.join(', ') 
          : record.tags,
        created_at: record.created_at || new Date().toISOString(),
      },
    };

    console.log("Sending to n8n:", JSON.stringify(n8nPayload, null, 2));

    // Call the n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(n8nPayload),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error("n8n webhook failed:", n8nResponse.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: "n8n webhook failed", 
          status: n8nResponse.status,
          details: errorText 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const n8nResult = await n8nResponse.text();
    console.log("n8n response:", n8nResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully synced to HubSpot via n8n",
        n8nResponse: n8nResult 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in sync-to-hubspot function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
