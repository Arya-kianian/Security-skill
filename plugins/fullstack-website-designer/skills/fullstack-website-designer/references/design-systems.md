# Design Systems Reference

## Table of Contents
1. [Style Profiles](#1-style-profiles)
2. [3D Patterns](#2-3d-patterns)
3. [Animation Patterns](#3-animation-patterns)
4. [Typography System](#4-typography-system)
5. [Color Engineering](#5-color-engineering)
6. [Component Recipes](#6-component-recipes)

---

## 1. Style Profiles

### Glassmorphism
Best for: SaaS products, dashboards, tech startups, AI tools

```css
.glass-card {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
/* Dark variant: higher opacity bg, lighter border */
.glass-card-dark {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Aurora / Mesh Gradient
Best for: creative agencies, portfolios, luxury brands, Web3

```css
/* Animated aurora background */
.aurora-bg {
  background: conic-gradient(
    from 180deg at 50% 50%,
    #2a0e61 0%, #4a0e8f 15%, #0d4f8f 30%,
    #0e6659 45%, #1e8f2e 60%, #8f7a0e 75%,
    #8f1e1e 90%, #2a0e61 100%
  );
  filter: blur(80px) saturate(1.5);
  animation: aurora-rotate 8s linear infinite;
  border-radius: 50%;
  transform-origin: center;
}
@keyframes aurora-rotate {
  from { transform: rotate(0deg) scale(1.5); }
  to   { transform: rotate(360deg) scale(1.5); }
}
/* Layer over dark background, opacity 0.6 */
.aurora-container {
  position: relative;
  background: #030014;
  overflow: hidden;
}
```

### Neomorphism
Best for: fintech, health, minimal productivity tools

```css
:root {
  --neo-bg: #e8ecef;
  --neo-shadow-dark: #c8ccd0;
  --neo-shadow-light: #ffffff;
}
.neo-card {
  background: var(--neo-bg);
  border-radius: 1rem;
  box-shadow:
    8px 8px 16px var(--neo-shadow-dark),
    -8px -8px 16px var(--neo-shadow-light);
}
.neo-inset {
  box-shadow:
    inset 8px 8px 16px var(--neo-shadow-dark),
    inset -8px -8px 16px var(--neo-shadow-light);
}
/* Keep shadows subtle — max offset = border-radius */
```

### Cyberpunk / Neon
Best for: gaming, crypto, tech brands, entertainment

```css
.neon-text {
  color: #0ff;
  text-shadow:
    0 0 7px #0ff,
    0 0 10px #0ff,
    0 0 21px #0ff,
    0 0 42px #0fa,
    0 0 82px #0fa,
    0 0 92px #0fa;
  animation: neon-flicker 2s infinite alternate;
}
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 7px #0ff, 0 0 21px #0ff, 0 0 42px #0fa, 0 0 82px #0fa;
  }
  20%, 24%, 55% { text-shadow: none; }
}
.cyber-grid {
  background-image:
    linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
.scanline::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px
  );
  pointer-events: none;
}
```

---

## 2. 3D Patterns

### Particle Field (Three.js)

```js
function createParticleField(scene, count = 2000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    // Color gradient: primary → accent
    colors[i * 3]     = 0.39 + Math.random() * 0.2;
    colors[i * 3 + 1] = 0.40 + Math.random() * 0.2;
    colors[i * 3 + 2] = 0.95;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05, vertexColors: true, transparent: true, opacity: 0.8,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  return { points, update: () => {
    points.rotation.y += 0.0005 + mouseX * 0.001;
    points.rotation.x += 0.0003 + mouseY * 0.001;
  }};
}
```

### React Three Fiber Hero

```jsx
// src/components/HeroScene.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 3]} />
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ position: 'absolute', inset: 0 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#8b5cf6" intensity={0.5} />
      <AnimatedSphere />
      <Environment preset="city" />
    </Canvas>
  );
}
```

### CSS 3D Perspective Card

```css
.card-3d-wrapper {
  perspective: var(--perspective, 1200px);
  perspective-origin: center center;
}
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  border-radius: 1rem;
}
.card-3d .card-shine {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at var(--shine-x, 50%) var(--shine-y, 50%),
    rgba(255,255,255,0.15) 0%,
    transparent 60%
  );
  pointer-events: none;
  transition: opacity 0.3s;
  opacity: 0;
}
.card-3d:hover .card-shine { opacity: 1; }
```

```js
// Card tilt with shine
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 20;
    const rotX = (y - 0.5) * -20;
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    card.style.setProperty('--shine-x', `${x * 100}%`);
    card.style.setProperty('--shine-y', `${y * 100}%`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});
```

---

## 3. Animation Patterns

### Magnetic Button

```js
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});
```

### Text Reveal Clip

```css
.text-reveal-wrapper { overflow: hidden; }
.text-reveal { transform: translateY(110%); transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.text-reveal.in-view { transform: translateY(0); }
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
```

### Scroll Progress Bar

```js
const progress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progress.style.transform = `scaleX(${pct})`;
}, { passive: true });
```

---

## 4. Typography System

### Variable Font Setup

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300..800&family=Syne:wght@400..800&family=JetBrains+Mono:wght@400;700&display=swap');

:root {
  --font-display: 'Syne', sans-serif;      /* Headings — geometric, bold */
  --font-body: 'Plus Jakarta Sans', sans-serif; /* Body — modern, readable */
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Font Pairing Recommendations

| Mood | Display | Body |
|------|---------|------|
| Tech / Futuristic | Syne, Space Grotesk | Inter, DM Sans |
| Luxury / Editorial | Playfair Display, Cormorant | Lato, Source Serif |
| Playful / Creative | Unbounded, Cabinet Grotesk | Satoshi, General Sans |
| Corporate / Trust | Neue Haas Grotesk, Helvetica Now | IBM Plex Sans |
| Minimal | Switzer, Geist | Geist Mono, Fira Code |

---

## 5. Color Engineering

### Generating a palette from one brand color

```js
// Generate a 5-step tint/shade scale from a base hex
function generateScale(baseHex) {
  // Use oklch for perceptually uniform steps
  // Tints: L 0.95 → 0.7 (lighter)
  // Shades: L 0.45 → 0.15 (darker)
}
```

### Recommended dark-mode base surfaces

```css
:root[data-theme="dark"] {
  --surface-1: #0a0a0f;  /* page bg */
  --surface-2: #111118;  /* card bg */
  --surface-3: #1a1a24;  /* elevated card */
  --surface-4: #222232;  /* input bg */
  --border:    #2a2a3f;  /* subtle borders */
}
```

---

## 6. Component Recipes

### Hero Section Structure

```html
<section class="hero" role="banner">
  <canvas class="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-content" data-reveal>
    <span class="hero-tag">Tag line</span>
    <h1 class="hero-title gradient-text">Main headline</h1>
    <p class="hero-sub">Supporting description</p>
    <div class="hero-cta">
      <a href="#" class="btn btn-primary btn-magnetic">Get started</a>
      <a href="#" class="btn btn-ghost">Learn more</a>
    </div>
  </div>
  <div class="hero-scroll-indicator" aria-hidden="true">
    <div class="scroll-dot"></div>
  </div>
</section>
```

### Feature Grid

```html
<section class="features" aria-labelledby="features-title">
  <h2 id="features-title" data-reveal>Why choose us</h2>
  <div class="feature-grid" data-stagger>
    <article class="feature-card card-3d glass-card" tabindex="0">
      <div class="feature-icon" aria-hidden="true"><!-- SVG icon --></div>
      <h3>Feature name</h3>
      <p>Feature description</p>
    </article>
    <!-- repeat -->
  </div>
</section>
```

### Navbar with blur

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: background 0.3s;
}
.navbar.scrolled {
  background: rgba(10, 10, 15, 0.95);
}
```
