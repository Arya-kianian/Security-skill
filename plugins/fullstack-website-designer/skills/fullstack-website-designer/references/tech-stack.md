# Tech Stack Reference

## Choosing a Stack

| Use case | Stack | When |
|----------|-------|------|
| Static landing / portfolio | HTML + CSS + Vanilla JS + Vite | No auth, no backend needed |
| Marketing site with CMS | Astro + Tailwind + Contentlayer | Blog, docs, content-heavy |
| Interactive SPA | React + Vite + Tailwind | Complex UI, no SSR needed |
| Full-stack app | Next.js 14 (App Router) | Auth, DB, SSR, API routes |
| Backend-heavy | React + Vite + Express/FastAPI | Custom APIs, WebSockets |

---

## Stack 1: Vanilla HTML + Vite

### Setup

```bash
npm create vite@latest my-site -- --template vanilla
cd my-site && npm install
npm install three gsap
```

### `package.json` scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### File structure
```
my-site/
├── index.html
├── src/
│   ├── main.js
│   ├── styles/
│   │   └── globals.css
│   └── lib/
│       ├── hero-scene.js   (Three.js)
│       └── animations.js   (GSAP)
├── public/
└── vite.config.js
```

---

## Stack 2: React + Vite + Tailwind

### Setup

```bash
npm create vite@latest my-site -- --template react
cd my-site
npm install tailwindcss @tailwindcss/vite
npm install three @react-three/fiber @react-three/drei
npm install gsap framer-motion
npm install react-router-dom
```

### `vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### `tailwind.config.js`
```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'aurora': 'aurora-rotate 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
};
```

---

## Stack 3: Next.js 14 (App Router)

### Setup

```bash
npx create-next-app@latest my-site \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-site
npm install three @react-three/fiber @react-three/drei
npm install gsap framer-motion
npm install prisma @prisma/client bcryptjs jsonwebtoken zod
npm install -D @types/bcryptjs @types/jsonwebtoken
npx prisma init
```

### File structure
```
my-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       └── auth/
│   │           └── route.ts
│   ├── components/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── scenes/
│   └── types/
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
└── next.config.js
```

### `src/lib/db.ts` (Prisma singleton)
```ts
import { PrismaClient } from '@prisma/client';
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
```

### Three.js in Next.js (client component)

```tsx
'use client';
import { useEffect, useRef } from 'react';

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    let cleanup: () => void;
    import('@/lib/scenes/hero').then(({ initScene }) => {
      cleanup = initScene(canvasRef.current!);
    });
    return () => cleanup?.();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
```

---

## Stack 4: Astro + Tailwind (Content sites)

### Setup

```bash
npm create astro@latest my-site -- --template minimal
cd my-site
npx astro add tailwind
npx astro add react  # for interactive islands
npm install three gsap
```

### Key pattern: Islands architecture

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import HeroScene from '../components/HeroScene.jsx';
---
<Layout title="My Site">
  <!-- Static HTML renders at build time -->
  <section class="hero">
    <!-- client:load = hydrate immediately -->
    <HeroScene client:load />
    <h1>Welcome</h1>
  </section>
</Layout>
```

---

## Dependency Versions (pinned, March 2026)

```json
{
  "three": "^0.171.0",
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.117.0",
  "gsap": "^3.12.5",
  "framer-motion": "^11.15.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next": "^15.1.0",
  "tailwindcss": "^4.0.0",
  "vite": "^6.0.0",
  "@vitejs/plugin-react": "^4.3.0",
  "prisma": "^6.2.0",
  "@prisma/client": "^6.2.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "zod": "^3.23.0",
  "express": "^4.21.0",
  "helmet": "^8.0.0",
  "cors": "^2.8.5",
  "express-rate-limit": "^7.4.0"
}
```

---

## CDN Option (no build tool, pure HTML)

For ultra-simple sites with no bundler:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.171.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.171.0/examples/jsm/"
  }
}
</script>
<script type="module">
  import * as THREE from 'three';
  // your code
</script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

Use this only for static pages where there's a strong reason to avoid npm.

---

## Google Fonts Quick Reference

Add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
```

Recommended Google Fonts for 2025-2026:
- **Display**: Syne, Unbounded, Space Grotesk, Cabinet Grotesk
- **Body**: Plus Jakarta Sans, DM Sans, Geist, Outfit, Satoshi
- **Mono**: JetBrains Mono, Fira Code, Geist Mono
