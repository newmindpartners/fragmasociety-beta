import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EarlyAccessEmailRequest {
  fullName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email }: EarlyAccessEmailRequest = await req.json();
    
    console.log(`Sending early access confirmation to: ${email}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Fragma <onboarding@resend.dev>",
        to: [email],
        subject: "You're on the Fragma early access list!",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">
                    <!-- Header -->
                    <tr>
                      <td style="text-align: center; padding-bottom: 32px;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: 2px;">FRAGMA</h1>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 16px; padding: 48px 40px;">
                        <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 400; color: #ffffff;">Welcome, ${fullName}!</h2>
                        <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.7);">
                          Thank you for registering your interest in Fragma. You're now on our early access list.
                        </p>
                        <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.7);">
                          We're reviewing your profile and will notify you when eligible investment opportunities become available based on your preferences.
                        </p>
                        
                        <!-- What's Next -->
                        <div style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 24px; margin: 32px 0;">
                          <h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px;">What happens next?</h3>
                          <ul style="margin: 0; padding: 0 0 0 20px; color: rgba(255, 255, 255, 0.7); font-size: 14px; line-height: 1.8;">
                            <li>We review your investor profile</li>
                            <li>Match you with eligible opportunities</li>
                            <li>Notify you when access opens</li>
                          </ul>
                        </div>
                        
                        <!-- CTA -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td align="center" style="padding-top: 16px;">
                              <a href="https://t.me/+BGJB5RBN2wAwODY0" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 14px; font-weight: 500;">
                                Join Our Community
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="text-align: center; padding-top: 32px;">
                        <p style="margin: 0 0 8px; font-size: 12px; color: rgba(255, 255, 255, 0.4);">
                          Capital at risk. Access depends on eligibility and jurisdiction.
                        </p>
                        <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.4);">
                          © ${new Date().getFullYear()} Fragma. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-early-access-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
