export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'RESEND_API_KEY is missing from Vercel environment variables.' });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const to = body?.email || body?.to || body?.recipient;
    const subject = body?.subject || body?.title;
    const rawHtml = body?.htmlContent || body?.html || body?.message || body?.content;
    const amount = body?.amount; // Captured from your new input field

    if (!to || !subject || !rawHtml) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, or htmlContent' });
    }

    // Creates a gorgeous financial amount highlight box if an amount is entered
    const amountSection = amount ? `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #38bdf8; padding: 18px; margin: 24px 0; border-radius: 6px;">
        <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.8px;">Transaction Amount</p>
        <p style="margin: 6px 0 0 0; font-size: 26px; font-weight: 700; color: #0f172a;">${amount}</p>
      </div>
    ` : '';

    // Professional HTML template with deep styling
    const styledHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; padding: 20px 0;">
          <tr>
            <td>
              <!-- Header -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1e293b; border-radius: 12px 12px 0 0; padding: 28px; border: 1px solid #334155; border-bottom: none;">
                <tr>
                  <td align="center">
                    <h1 style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 600; letter-spacing: 0.5px;">Equity Mixed Assets</h1>
                    <p style="color: #38bdf8; font-size: 11px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 1.2px;">Institutional Client Services</p>
                  </td>
                </tr>
              </table>

              <!-- Body Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; padding: 36px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);">
                <tr>
                  <td>
                    <div style="color: #334155; font-size: 15px; line-height: 1.6;">
                      ${rawHtml}
                    </div>
                    
                    ${amountSection}

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;">

                    <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0;">
                      This is an automated institutional message from Equity Mixed Assets. Please do not reply directly to this communication.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 20px 0;">
                <tr>
                  <td align="center" style="color: #64748b; font-size: 11px;">
                    &copy; 2026 Equity Mixed Assets. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Equity Mixed Assets <support@equitymixedasset.cc>',
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: styledHtml
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
