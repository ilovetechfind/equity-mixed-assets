export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'RESEND_API_KEY is missing from Vercel environment variables.' });
    }

    // Safely parse body if it arrives as a string or object
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    // Accept flexible key names matching whatever the frontend script sends
    const to = body?.to || body?.email || body?.recipient;
    const subject = body?.subject;
    const html = body?.html || body?.message || body?.content;

    if (!to || !subject || !html) {
      return res.status(400).json({ 
        error: `Missing required fields. Received: recipient=${to ? 'OK' : 'missing'}, subject=${subject ? 'OK' : 'missing'}, body=${html ? 'OK' : 'missing'}` 
      });
    }

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
        html: html
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
