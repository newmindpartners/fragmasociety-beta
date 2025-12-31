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
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Email service configuration error");
    }

    const { fullName, email }: EarlyAccessEmailRequest = await req.json();
    
    console.log(`Sending early access confirmation to: ${email}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // IMPORTANT: If you use a custom domain, update this to your verified sender (e.g., info@fragmasociety.com)
        // If you use onboarding@resend.dev, you can ONLY send emails to the email address registered with your Resend account.
        from: "Fragma Society <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to the Fragma Society Early Access List",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
                    <!-- Top Accent Bar -->
                    <tr>
                      <td style="height: 8px; background: linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%);"></td>
                    </tr>
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 48px 40px 32px; text-align: center;">
                        <div style="margin-bottom: 24px;">
                          <img src="https://fragmasociety.com/fragma-logo-v2.png" alt="Fragma Society" style="height: 40px; width: auto;" onerror="this.style.display='none'; document.getElementById('text-logo').style.display='block';">
                          <div id="text-logo" style="display: none; font-family: 'Playfair Display', serif; font-size: 24px; color: #1e293b; letter-spacing: 0.05em; font-weight: 700;">FRAGMA SOCIETY</div>
                        </div>
                        <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #1e293b; line-height: 1.2;">Welcome to the Society, ${fullName}</h1>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 0 40px 40px;">
                        <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.7; color: #475569; text-align: center;">
                          Thank you for registering your interest. You have successfully joined our exclusive early access list for fractionalized high-end real-world assets.
                        </p>
                        
                        <div style="background-color: #f1f5f9; border-radius: 20px; padding: 32px; margin: 32px 0;">
                          <h2 style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #8b5cf6; text-transform: uppercase; letter-spacing: 0.1em;">Next Steps</h2>
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding-bottom: 16px; font-size: 15px; color: #1e293b;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #8b5cf6; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; margin-right: 12px;">1</span>
                                <strong>Profile Review</strong> &mdash; Our team is reviewing your investor profile.
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 16px; font-size: 15px; color: #1e293b;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #8b5cf6; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; margin-right: 12px;">2</span>
                                <strong>Curation</strong> &mdash; We match your preferences with upcoming luxury opportunities.
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #1e293b;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #8b5cf6; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; margin-right: 12px;">3</span>
                                <strong>Activation</strong> &mdash; You'll receive a personal invite when access opens for you.
                              </td>
                            </tr>
                          </table>
                        </div>
                        
                        <p style="margin: 0 0 32px; font-size: 15px; line-height: 1.6; color: #64748b; text-align: center; font-style: italic;">
                          "Fragma curates real-world opportunities—built to feel safe, serious, and real."
                        </p>
                        
                        <!-- CTA -->
                        <div style="text-align: center;">
                          <a href="https://t.me/+BGJB5RBN2wAwODY0" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff; text-decoration: none; padding: 18px 36px; border-radius: 100px; font-size: 16px; font-weight: 600; box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.3);">
                            Join Private Telegram Community
                          </a>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                        <div style="margin-bottom: 16px;">
                          <a href="https://fragmasociety.com" style="color: #64748b; text-decoration: none; font-size: 13px; margin: 0 12px;">Website</a>
                          <a href="https://instagram.com/fragmasociety" style="color: #64748b; text-decoration: none; font-size: 13px; margin: 0 12px;">Instagram</a>
                          <a href="https://x.com/FragmaSociety" style="color: #64748b; text-decoration: none; font-size: 13px; margin: 0 12px;">Twitter / X</a>
                        </div>
                        <p style="margin: 0 0 8px; font-size: 11px; line-height: 1.5; color: #94a3b8; max-width: 400px; margin-left: auto; margin-right: auto;">
                          Capital at risk. Access depends on eligibility and jurisdiction. Gyeld Sàrl, 26 Rue Goethe, L-1637 Luxembourg.
                        </p>
                        <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                          © ${new Date().getFullYear()} Fragma Society. All rights reserved.
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
