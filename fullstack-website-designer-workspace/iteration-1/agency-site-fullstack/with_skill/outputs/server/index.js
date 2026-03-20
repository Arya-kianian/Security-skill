/**
 * Apex Studio — Standalone Express Contact Server
 *
 * A lightweight Express backend that mirrors the Next.js /api/contact route.
 * Use this if you prefer to run the backend as a separate process or
 * deploy it independently (e.g. on Railway, Fly.io, Heroku).
 *
 * Usage:
 *   cp .env.example .env.local   # fill in real values
 *   node server/index.js
 *
 * Environment variables (see .env.example):
 *   EXPRESS_PORT, CORS_ORIGIN, SMTP_HOST, SMTP_PORT,
 *   SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
 */

'use strict';

const express     = require('express');
const cors        = require('cors');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');
const nodemailer  = require('nodemailer');
const path        = require('path');

// Load .env.local if present (simple loader, no extra deps)
try {
  const fs   = require('fs');
  const file = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(file)) {
    fs.readFileSync(file, 'utf8').split('\n').forEach((line) => {
      const [key, ...rest] = line.split('=');
      const k = key?.trim();
      if (k && !k.startsWith('#') && !(k in process.env)) {
        process.env[k] = rest.join('=').trim().replace(/^["']|["']$/g, '');
      }
    });
  }
} catch { /* ignore */ }

const PORT        = parseInt(process.env.EXPRESS_PORT  || '4000', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN            || 'http://localhost:3000';

/* ─── App setup ─────────────────────────────────────────────────── */
const app = express();

app.use(helmet());
app.use(cors({
  origin:      CORS_ORIGIN,
  methods:     ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json({ limit: '64kb' }));

/* ─── Rate limiter ───────────────────────────────────────────────── */
const limiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: 'Too many requests. Please wait a minute and try again.' },
});

/* ─── Validation helper ─────────────────────────────────────────── */
function validateContact(body) {
  const errors = {};
  const { name, email, message } = body;

  if (!name  || typeof name  !== 'string' || !name.trim())      errors.name    = 'Name is required.';
  if (!email || typeof email !== 'string' || !email.trim())     errors.email   = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(email))                        errors.email   = 'Invalid email address.';
  if (!message || typeof message !== 'string' || message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';

  return errors;
}

/* ─── Email helper ──────────────────────────────────────────────── */
async function sendContactEmail(data) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('[Express] SMTP not configured — logging submission:');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  const transporter = nodemailer.createTransport({
    host:   SMTP_HOST,
    port:   parseInt(SMTP_PORT || '587', 10),
    secure: parseInt(SMTP_PORT || '587', 10) === 465,
    auth:   { user: SMTP_USER, pass: SMTP_PASS },
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
        ${String(data.message).replace(/</g, '&lt;').replace(/>/g, '&gt;')}
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

/* ─── Routes ────────────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'apex-studio-api' }));

app.post('/api/contact', limiter, async (req, res) => {
  const errors = validateContact(req.body);
  if (Object.keys(errors).length) {
    return res.status(422).json({ error: 'Validation failed.', details: errors });
  }

  const { name, email, company = '', budget = '', service = '', message } = req.body;
  const payload = { name: name.trim(), email: email.trim(), company, budget, service, message: message.trim() };

  try {
    await sendContactEmail(payload);
    return res.status(200).json({ success: true, message: 'Your message has been received.' });
  } catch (err) {
    console.error('[Express] Email send error:', err);
    return res.status(500).json({
      error: 'Failed to send message. Please try again or email us directly.',
    });
  }
});

/* 404 catch-all */
app.use((_req, res) => res.status(404).json({ error: 'Route not found.' }));

/* ─── Start ─────────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`✦ Apex Studio Express server running on http://localhost:${PORT}`);
  console.log(`  POST http://localhost:${PORT}/api/contact`);
  console.log(`  GET  http://localhost:${PORT}/health`);
});
