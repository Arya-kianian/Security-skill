# Apex Studio — Creative Agency Website

A bold, brutalist creative agency website built with **Next.js 15**, **Three.js**, and **GSAP**. Features a full-screen particle/3D hero, horizontally-scrolling case studies, 3D-tilt team cards, and a live contact form with email delivery.

---

## What's Inside

| Section | Technology | Notes |
|---------|-----------|-------|
| **Hero** | Three.js particle field + wireframe icosahedron | Canvas behind brutalist typographic overlay; mouse-parallax |
| **Case Studies** | GSAP `ScrollTrigger` horizontal pin | 5 real-content cards with stats, pinned while scrolling horizontally |
| **Team** | CSS 3D perspective tilt + shine overlay | 4 team members, pointer-tracked rotation, radial shine |
| **Contact** | React form + Zod validation + Nodemailer | Next.js API route + optional standalone Express server |

### Design System

- **Palette** — Black `#000`, White `#fff`, Accent red `#ef4444`
- **Fonts** — Unbounded (display / headings), Space Grotesk (body), JetBrains Mono (labels/code)
- **Type** — Fluid scale via CSS `clamp()`, `--text-xs` through `--text-hero`
- **Borders** — 3–5px solid white/red; brutalist offset shadows on interactive elements
- **Animations** — GSAP `ScrollTrigger` for every section reveal, stagger groups, scroll progress bar, magnetic navbar logo

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or pnpm / yarn)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local and fill in SMTP credentials (or leave blank to log to stdout)

# 3. Start Next.js dev server
npm run dev
# → http://localhost:3000
```

---

## Running the Optional Express Server

The `server/` directory contains a standalone Express backend that mirrors the Next.js API route. Use it if you want to host the backend separately.

```bash
# In a second terminal:
npm run server
# → http://localhost:4000

# Or run both concurrently:
npm run dev:all
```

The Express server exposes:
- `POST http://localhost:4000/api/contact` — contact form handler
- `GET  http://localhost:4000/health` — health check

> **Note**: When using the Express server, update your Contact component's `fetch` call from `/api/contact` to `http://localhost:4000/api/contact`.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable | Description |
|----------|-------------|
| `CONTACT_TO_EMAIL` | Email address that receives submissions |
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (usually `587`) |
| `SMTP_USER` | SMTP username / Gmail address |
| `SMTP_PASS` | SMTP password or Gmail App Password |
| `EXPRESS_PORT` | Port for the standalone Express server (default `4000`) |
| `CORS_ORIGIN` | Allowed origin for Express CORS (default `http://localhost:3000`) |

**Gmail users**: enable 2FA and create an [App Password](https://support.google.com/accounts/answer/185833) for `SMTP_PASS`.

If SMTP is not configured the API route logs submissions to stdout — useful for local development.

---

## Production Build

```bash
npm run build   # builds Next.js app
npm run start   # starts production Next.js server
```

---

## Project Structure

```
apex-studio/
├── src/
│   ├── app/
│   │   ├── layout.jsx           # Root layout, font imports, metadata
│   │   ├── page.jsx             # Home page — GSAP orchestration
│   │   ├── globals.css          # Design tokens, brutalist utilities, GSAP hooks
│   │   └── api/
│   │       └── contact/
│   │           └── route.js     # Next.js API route — Zod + Nodemailer
│   └── components/
│       ├── Navbar.jsx           # Fixed nav, scroll-aware, magnetic logo
│       ├── Hero.jsx             # Three.js canvas hero + GSAP text entrance
│       ├── CaseStudies.jsx      # GSAP horizontal scroll pin (5 cards)
│       ├── Team.jsx             # 3D tilt cards (4 members)
│       └── Contact.jsx          # Multi-field form with validation + success state
├── server/
│   └── index.js                 # Standalone Express contact server (optional)
├── public/                      # Static assets (favicons, images)
├── next.config.js               # Next.js config — security headers, transpile
├── .env.example                 # Environment variable documentation
└── package.json
```

---

## Top 5 Things to Customise First

1. **Brand name & copy** — Search for `APEX STUDIO` / `Apex Studio` across `Navbar.jsx`, `Hero.jsx`, `layout.jsx`, and `page.jsx`.
2. **Accent colour** — Change `#ef4444` to your brand colour in `globals.css` (`--color-accent`). One variable controls the entire palette.
3. **Case study content** — Edit the `CASE_STUDIES` array in `CaseStudies.jsx` with real project data.
4. **Team members** — Edit the `TEAM` array in `Team.jsx`.
5. **SMTP credentials** — Fill `.env.local` so the contact form actually sends emails.

---

## Accessibility

- WCAG 2.1 AA colour contrast maintained throughout (white on black, red on black ≥ 4.5:1)
- `prefers-reduced-motion` disables all CSS animations
- Focus-visible rings on all interactive elements
- Semantic HTML (`<nav>`, `<section>`, `<article>`, `<h1>`–`<h3>`)
- `aria-label` on all icon-only and decorative elements
- Form error messages use `role="alert"` and `aria-describedby`

---

## Tech Stack

| Layer | Library | Version |
|-------|---------|---------|
| Framework | Next.js (App Router) | ^15.1.0 |
| UI | React | ^19.0.0 |
| 3D | Three.js | ^0.171.0 |
| Animation | GSAP + ScrollTrigger | ^3.12.5 |
| Validation | Zod | ^3.23.0 |
| Email | Nodemailer | ^6.9.16 |
| Express (optional) | Express 4 + Helmet + CORS + Rate-Limit | ^4.21.0 |
