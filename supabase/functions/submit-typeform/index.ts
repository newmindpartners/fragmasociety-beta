import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, country, investorType, interests } = await req.json();

    console.log('=== Typeform Sync Request ===');
    console.log('Email:', email);
    console.log('Country:', country);
    console.log('Investor Type:', investorType);
    console.log('Interests:', interests);

    // Note: Typeform's Responses API only allows READING responses, not creating them.
    // To get form submissions into Typeform, you have two options:
    // 
    // Option 1: Set up a Typeform webhook that posts TO your Supabase edge function
    //           (reverse the data flow - Typeform -> Your DB)
    //
    // Option 2: Use Typeform's embed with hidden fields pre-populated
    //           (users fill out the actual Typeform)
    //
    // For now, we log the data for manual review or future webhook integration.
    
    const typeformFormId = Deno.env.get('TYPEFORM_FORM_ID');
    
    if (!typeformFormId) {
      console.log('TYPEFORM_FORM_ID not configured');
    } else {
      console.log('Typeform Form ID:', typeformFormId);
      console.log('Data ready for sync - consider setting up Typeform webhook integration');
    }

    // Data is already stored in Supabase early_access_submissions table
    // This function serves as a placeholder for future Typeform webhook integration
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Data logged for Typeform sync',
        note: 'Typeform API does not support creating responses. Data stored in Supabase.',
        data: { email, country, investorType, interests }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in submit-typeform function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
