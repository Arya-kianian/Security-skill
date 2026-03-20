/**
 * Apex Studio — Express Backend
 * Handles contact form submissions.
 *
 * Endpoints:
 *   POST /api/contact  — validate & store/email the form submission
 *   GET  /health       — simple health check
 *
 * Usage:
 *   node backend/server.js
 *   # or with nodemon:
 *   npx nodemon backend/server.js
 *
 * Environment variables (copy .env.example → .env):
 *   PORT            (default: 4000)
 *   SMTP_HOST       e.g. smtp.gmail.com
 *   SMTP_PORT       e.g. 587
 *   SMTP_USER       your email address
 *   SMTP_PASS       app password / OAuth token
 *   NOTIFY_EMAIL    who receives the notification
 *   ALLOWED_ORIGIN  e.g. http://localhost:3000
 */

'use strict';

const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs         = require('fs');
const path       = require('path');

// ── Load .env if present ──────────────────────────────────────────────────────
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .forEach((line) => {
      const [key, ...rest] = line.split('=');
      if (key && key.trim() && !key.startsWith('#')) {
        process.env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
      }
    });
}

// ── Config ────────────────────────────────────────────────────────────────────
const PORT           = parseInt(process.env.PORT || '4000', 10);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const NOTIFY_EMAIL   = process.env.NOTIFY_EMAIL   || 'hello@apexstudio.co';

// ── Express setup ─────────────────────────────────────────────────────────────
const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// ── Nodemailer transporter ────────────────────────────────────────────────────
// Falls back to Ethereal (test account) if SMTP config is missing.
let transporter;

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('[mailer] Using configured SMTP transport.');
  } else {
    // Ethereal test account — safe for development
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host:   'smtp.ethereal.email',
      port:   587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('[mailer] No SMTP config found — using Ethereal test account.');
    console.log(`[mailer] Preview emails at: https://ethereal.email`);
  }

  return transporter;
}

// ── Validation helpers ────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CHARS = 5000;

function sanitize(str) {
  if (typeof str !== 'string') return '';
  // Strip HTML tags
  return str.replace(/<[^>]*>/g, '').trim().slice(0, MAX_CHARS);
}

function validateContactPayload(body) {
  const errors = [];

  const name    = sanitize(body.name);
  const email   = sanitize(body.email);
  const message = sanitize(body.message);

  if (!name)                         errors.push('name is required');
  if (!email)                        errors.push('email is required');
  if (email && !EMAIL_RE.test(email)) errors.push('email is invalid');
  if (!message)                      errors.push('message is required');
  if (message && message.length < 10) errors.push('message is too short (min 10 chars)');

  return { errors, fields: { name, email, message } };
}

// ── In-memory storage (replace with a real DB in production) ─────────────────
const submissions = [];

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * GET /health
 * Used by monitoring tools and the dev script to confirm the server is alive.
 */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

/**
 * POST /api/contact
 * Body (JSON):
 *   name     {string} required
 *   email    {string} required
 *   company  {string} optional
 *   service  {string} optional
 *   budget   {string} optional
 *   message  {string} required, min 10 chars
 */
app.post('/api/contact', async (req, res) => {
  // 1. Validate
  const { errors, fields } = validateContactPayload(req.body);
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  // 2. Build submission record
  const submission = {
    id:        `sub_${Date.now()}`,
    createdAt: new Date().toISOString(),
    name:      fields.name,
    email:     fields.email,
    company:   sanitize(req.body.company)  || '',
    service:   sanitize(req.body.service)  || '',
    budget:    sanitize(req.body.budget)   || '',
    message:   fields.message,
    ip:        req.ip,
  };

  // 3. Store in memory
  submissions.push(submission);
  console.log(`[contact] New submission #${submissions.length} from ${submission.email}`);

  // 4. Send notification email (non-blocking — failure doesn't fail the request)
  try {
    const t = await getTransporter();

    const info = await t.sendMail({
      from:    `"Apex Studio Contact" <${process.env.SMTP_USER || 'noreply@apexstudio.co'}>`,
      to:      NOTIFY_EMAIL,
      replyTo: submission.email,
      subject: `New enquiry from ${submission.name}${submission.company ? ` @ ${submission.company}` : ''}`,
      text: `
NEW CONTACT FORM SUBMISSION
===========================
ID:       ${submission.id}
Date:     ${submission.createdAt}

Name:     ${submission.name}
Email:    ${submission.email}
Company:  ${submission.company  || '—'}
Service:  ${submission.service  || '—'}
Budget:   ${submission.budget   || '—'}

Message:
${submission.message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #222; background: #f9f9f9; }
    .card { max-width: 600px; margin: 2rem auto; background: #fff;
            border: 1px solid #e0e0e0; padding: 2rem; }
    h1 { font-size: 1.2rem; margin-top: 0; color: #ff3c00; }
    dl { margin: 0; }
    dt { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em;
         color: #888; margin-top: 1rem; }
    dd { margin: 0.2rem 0 0; font-size: 0.95rem; }
    .message-box { background: #f5f5f5; padding: 1rem; margin-top: 1rem;
                   border-left: 3px solid #ff3c00; white-space: pre-wrap; }
    .footer { margin-top: 2rem; font-size: 0.75rem; color: #aaa; }
  </style>
</head>
<body>
<div class="card">
  <h1>New Contact Form Submission</h1>
  <dl>
    <dt>Name</dt><dd>${submission.name}</dd>
    <dt>Email</dt><dd><a href="mailto:${submission.email}">${submission.email}</a></dd>
    <dt>Company</dt><dd>${submission.company  || '—'}</dd>
    <dt>Service</dt><dd>${submission.service  || '—'}</dd>
    <dt>Budget</dt><dd>${submission.budget    || '—'}</dd>
  </dl>
  <div class="message-box">${submission.message.replace(/\n/g, '<br>')}</div>
  <p class="footer">
    ID: ${submission.id} &bull; ${submission.createdAt}
  </p>
</div>
</body>
</html>
      `,
    });

    // Log Ethereal preview URL in dev
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('[mailer] Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (mailErr) {
    console.error('[mailer] Failed to send notification:', mailErr.message);
    // Not re-throwing — email failure is not fatal for the API consumer
  }

  // 5. Respond
  return res.status(201).json({
    success: true,
    message: 'Your message has been received. We\'ll be in touch within 24 hours.',
    id:      submission.id,
  });
});

/**
 * GET /api/submissions
 * Development-only endpoint to inspect stored submissions.
 * Remove or protect this in production!
 */
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/submissions', (_req, res) => {
    res.json({ count: submissions.length, data: submissions });
  });
}

// ── 404 / error handlers ──────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Apex Studio API server\n  Listening on http://localhost:${PORT}\n`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`  Health check: http://localhost:${PORT}/health`);
    console.log(`  Submissions:  http://localhost:${PORT}/api/submissions\n`);
  }
});

module.exports = app; // for testing
