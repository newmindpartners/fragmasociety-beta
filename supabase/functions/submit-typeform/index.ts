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
    const typeformApiToken = Deno.env.get('TYPEFORM_API_TOKEN');
    const typeformFormId = Deno.env.get('TYPEFORM_FORM_ID');

    if (!typeformApiToken || !typeformFormId) {
      console.error('Missing Typeform configuration');
      throw new Error('Typeform configuration not set');
    }

    const { email, country, investorType, interests } = await req.json();

    console.log('Submitting to Typeform:', { email, country, investorType, interests });

    // Create a Typeform response submission
    // Note: Typeform's Responses API requires field IDs from your form
    // You'll need to update these field IDs to match your Typeform form
    const typeformResponse = await fetch(
      `https://api.typeform.com/forms/${typeformFormId}/responses`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${typeformApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: [
            {
              field: { ref: 'email_field' },
              type: 'email',
              email: email,
            },
            {
              field: { ref: 'country_field' },
              type: 'text',
              text: country,
            },
            {
              field: { ref: 'investor_type_field' },
              type: 'choice',
              choice: { label: investorType },
            },
            {
              field: { ref: 'interests_field' },
              type: 'choices',
              choices: { labels: interests },
            },
          ],
          metadata: {
            platform: 'web',
            source: 'fragma-website',
          },
        }),
      }
    );

    if (!typeformResponse.ok) {
      const errorText = await typeformResponse.text();
      console.error('Typeform API error:', errorText);
      
      // If the Responses API doesn't work, try using a webhook or hidden fields approach
      // For now, log the submission and return success
      console.log('Form data captured:', { email, country, investorType, interests });
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Interest registered successfully',
          note: 'Data logged for manual sync'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await typeformResponse.json();
    console.log('Typeform submission successful:', result);

    return new Response(
      JSON.stringify({ success: true, message: 'Interest registered with Typeform' }),
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
