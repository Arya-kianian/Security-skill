# Luminary — AI Analytics Dashboard Landing Page

A high-fidelity SaaS landing page built with React + Vite featuring:

- Glassmorphism card system
- Aurora gradient animated background
- Three.js 3D animated sphere with particle rings (hero section)
- Pricing section with 3 tiers and monthly/annual toggle
- Features section with 6 animated icon cards (3D tilt effect)
- Responsive navbar with scroll progress bar
- Fluid typography with CSS `clamp()`
- `prefers-reduced-motion` support
- Full WCAG 2.1 AA accessibility (focus rings, aria-labels, semantic HTML)

## Tech Stack

- **React 19** + **Vite 6**
- **Three.js 0.171** — 3D sphere, particle field, torus rings
- **GSAP 3.12** (available for additional animations)
- **Syne** + **Plus Jakarta Sans** (Google Fonts)
- Pure CSS — no Tailwind, no additional CSS frameworks

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
npm run preview   # preview production build locally
```

## Project Structure

```
├── index.html                  # Entry HTML, Google Fonts
├── vite.config.js              # Vite + React plugin
├── package.json
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Layout: Navbar → Hero → Features → Pricing → Footer
    ├── index.css               # Design tokens, aurora animation, glassmorphism, utilities
    ├── components/
    │   ├── Navbar.jsx          # Fixed navbar with scroll detection, mobile menu
    │   ├── Hero.jsx            # Hero with Three.js sphere + aurora background
    │   ├── Features.jsx        # 6-card feature grid with 3D tilt + icon animation
    │   ├── Pricing.jsx         # 3-tier pricing with monthly/annual toggle
    │   └── Footer.jsx          # Multi-column footer with newsletter + social links
    └── lib/
        └── hero-scene.js       # Three.js scene: sphere, wireframe, particles, rings
```

## Customisation

### 1. Brand colors
Edit CSS custom properties in `src/index.css`:
```css
--color-bg:      #0f0a1e;   /* page background */
--color-primary: #6366f1;   /* indigo accent */
--color-accent:  #8b5cf6;   /* violet accent */
```

### 2. Product name and copy
- Hero headline and stats: `src/components/Hero.jsx`
- Features: edit the `FEATURES` array in `src/components/Features.jsx`
- Pricing tiers: edit the `TIERS` array in `src/components/Pricing.jsx`

### 3. Navigation links
Edit `NAV_LINKS` in `src/components/Navbar.jsx`.

### 4. Three.js sphere appearance
`src/lib/hero-scene.js` — adjust sphere geometry, particle count, light colors, or rotation speeds.

### 5. Fonts
Replace the Google Fonts `<link>` in `index.html` and update `--font-display` / `--font-body` in `index.css`.

## Deployment

The built output is a static site (`dist/`). Deploy to any static host:

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir dist

# GitHub Pages
npm run build && gh-pages -d dist
```
