export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    // This will show us the exact keys your frontend form is sending
    const receivedKeys = Object.keys(body).join(', ');

    const to = body?.email || body?.to;
    const subject = body?.subject;
    const html = body?.html || body?.message || body?.content || body?.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ 
        error: `DEBUG - Received keys from frontend: [${receivedKeys}]` 
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Equity Mixed Assets <support@equitymixedasset.cc>',
        to: [to],
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
