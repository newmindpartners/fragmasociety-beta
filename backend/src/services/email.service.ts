import { env } from '../config/env.js';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

interface ResendResponse {
  id?: string;
  error?: {
    message: string;
  };
}

/**
 * Send an email using Resend API
 */
async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured, skipping email');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    const data = (await response.json()) as ResendResponse;

    if (!response.ok || data.error) {
      const errorMessage = data.error?.message || `Resend returned ${response.status}`;
      console.error('❌ Email send failed:', errorMessage);
      return { success: false, error: errorMessage };
    }

    console.log('✅ Email sent successfully, id:', data.id);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Email send error:', message);
    return { success: false, error: message };
  }
}

/**
 * Send early access confirmation email
 */
export async function sendEarlyAccessConfirmation(
  fullName: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  const firstName = fullName.split(' ')[0];

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Fragma Society</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                Welcome to Fragma Society
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi ${firstName},
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for joining the Fragma Society early access program! We're thrilled to have you on board.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You're now part of an exclusive group of investors who will get first access to curated real-world asset investment opportunities.
              </p>
              
              <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1f2937; margin: 0 0 12px; font-size: 16px; font-weight: 600;">
                  What happens next?
                </h3>
                <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Our team will review your profile</li>
                  <li>You'll receive early access to exclusive deals</li>
                  <li>A member of our team may reach out to learn more about your investment goals</li>
                </ul>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                In the meantime, feel free to reply to this email if you have any questions.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
                Best regards,<br>
                <strong>The Fragma Society Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                © ${new Date().getFullYear()} Fragma Society. All rights reserved.<br>
                You're receiving this email because you signed up for early access.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return sendEmail({
    to: email,
    subject: 'Welcome to Fragma Society Early Access! 🎉',
    html,
  });
}

/**
 * Send newsletter welcome email
 */
export async function sendNewsletterWelcome(email: string): Promise<{ success: boolean; error?: string }> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
                You're Subscribed! 📬
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Thanks for subscribing to the Fragma Society newsletter!
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                You'll be the first to know about new investment opportunities, market insights, and exclusive updates.
              </p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                — The Fragma Society Team
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return sendEmail({
    to: email,
    subject: 'Welcome to the Fragma Society Newsletter!',
    html,
  });
}
