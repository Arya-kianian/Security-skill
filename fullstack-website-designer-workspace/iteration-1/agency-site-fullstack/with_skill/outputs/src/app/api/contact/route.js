/**
 * POST /api/contact
 *
 * Accepts a contact-form submission, validates it with Zod,
 * then sends an email via Nodemailer (SMTP).
 *
 * If SMTP credentials are not configured the API still returns 200 so the
 * UI flow can be tested locally; it logs the payload to stdout instead.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';

/* ─── Validation schema ─────────────────────────────────────────── */
const ContactSchema = z.object({
  name:    z.string().min(1,  'Name is required').max(120),
  email:   z.string().email('Invalid email address'),
  company: z.string().max(120).optional().default(''),
  budget:  z.string().max(60).optional().default(''),
  service: z.string().max(60).optional().default(''),
  message: z.string().min(20, 'Message must be at least 20 characters').max(4000),
});

/* ─── Rate limiting (in-memory, per-process) ─────────────────────── */
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT     = 5;      // max 5 requests per IP per window
const rateMap        = new Map();

function isRateLimited(ip) {
  const now    = Date.now();
  const record = rateMap.get(ip) ?? { count: 0, resetAt: now + RATE_WINDOW_MS };

  if (now > record.resetAt) {
    record.count   = 1;
    record.resetAt = now + RATE_WINDOW_MS;
    rateMap.set(ip, record);
    return false;
  }

  record.count += 1;
  rateMap.set(ip, record);
  return record.count > RATE_LIMIT;
}

/* ─── Nodemailer (lazy-loaded) ──────────────────────────────────── */
async function sendEmail(data) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Dev fallback: log instead of sending
    console.log('[Contact API] SMTP not configured — logging submission:');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.default.createTransport({
    host:   SMTP_HOST,
    port:   parseInt(SMTP_PORT || '587', 10),
    secure: parseInt(SMTP_PORT || '587', 10) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const toAddress = CONTACT_TO_EMAIL || SMTP_USER;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#ef4444;border-bottom:2px solid #ef4444;padding-bottom:8px">
        New Project Enquiry — Apex Studio
      </h2>
      <table style="width:100%;border-collapse:collapse">
        ${[
          ['Name',    data.name],
          ['Email',   data.email],
          ['Company', data.company || '—'],
          ['Service', data.service || '—'],
          ['Budget',  data.budget  || '—'],
        ].map(([k, v]) => `
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#555;width:120px">${k}</td>
            <td style="padding:8px 0;color:#111">${v}</td>
          </tr>`).join('')}
      </table>
      <h3 style="margin-top:24px;color:#555">Project Brief</h3>
      <p style="background:#f5f5f5;padding:16px;border-left:4px solid #ef4444;margin:0;white-space:pre-wrap">
        ${data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </p>
    </div>
  `;

  await transporter.sendMail({
    from:    `"Apex Studio Contact" <${SMTP_USER}>`,
    to:      toAddress,
    replyTo: data.email,
    subject: `New Enquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html,
    text: [
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Company: ${data.company || '—'}`,
      `Service: ${data.service || '—'}`,
      `Budget:  ${data.budget  || '—'}`,
      '',
      'Message:',
      data.message,
    ].join('\n'),
  });
}

/* ─── Handler ───────────────────────────────────────────────────── */
export async function POST(request) {
  // Rate limiting via X-Forwarded-For or fallback
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Validate
  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return NextResponse.json(
      { error: 'Validation failed.', details: errors },
      { status: 422 }
    );
  }

  // Send
  try {
    await sendEmail(result.data);
    return NextResponse.json(
      { success: true, message: 'Your message has been received.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[Contact API] Email send error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}

/* Block other HTTP methods */
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
