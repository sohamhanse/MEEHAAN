import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, company, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MEEHAAN Website" <${process.env.GMAIL_USER}>`,
    to: 'info@meehaan.com',
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:8px;">
        <h2 style="color:#050805;margin-bottom:24px;font-size:20px;">New Contact Form Submission</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#111;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#111;"><a href="mailto:${email}" style="color:#F5921E;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;">Company</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#111;">${company || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#111;">${phone || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#111;">${subject}</td></tr>
          <tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;font-size:14px;color:#111;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</td></tr>
        </table>
        <p style="margin-top:32px;font-size:11px;color:#aaa;">Sent from meehaan.com/contact</p>
      </div>
    `,
  });

  return res.status(200).json({ success: true });
}
