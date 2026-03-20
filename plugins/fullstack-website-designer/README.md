# Full-Stack Website Designer

A Claude Code skill that orchestrates four parallel specialist agents to design
and code complete, production-ready websites with cutting-edge 3D visuals,
advanced animations, and modern design systems — delivered in a single session.

## What It Does

- **Designs** a complete visual system: color tokens, typography scale, layout
  spec, component specs, and 3D scene blueprints
- **Codes** the entire frontend: HTML/CSS/JS or React/Next.js with Three.js or
  React Three Fiber 3D elements, GSAP/Framer Motion animations
- **Builds** the backend (if needed): API routes, database schema, auth, env config
- **Debugs** the full codebase: fixes bugs, checks accessibility, validates
  cross-browser compatibility, and writes a QA report
- **Delivers** a complete, working, runnable codebase with README and setup instructions

## Design Capabilities

| Technique | Implementation |
|-----------|---------------|
| 3D hero scenes | Three.js / React Three Fiber |
| WebGL shader backgrounds | GLSL shaders via `ShaderMaterial` |
| Particle systems | `BufferGeometry` with mouse interaction |
| CSS 3D card tilt | `perspective` + `rotateX/Y` on mousemove |
| Aurora / mesh gradients | Animated `conic-gradient` + SVG blur |
| Glassmorphism | `backdrop-filter: blur()` + rgba surfaces |
| Scroll animations | GSAP ScrollTrigger |
| Magnetic buttons | Mouse-tracking JS |
| Gradient text | `background-clip: text` animations |

## Trigger Examples

> "Build me a portfolio with a 3D hero"

> "Create a SaaS landing page with glassmorphism cards and particle animations"

> "I want a dark luxury website for my agency"

> "Make a full-stack e-commerce site with Next.js"

> "Design and code a personal blog with aurora gradient aesthetics"

## Tech Stacks Supported

- Vanilla HTML + Vite (static)
- React + Vite + Tailwind
- Next.js 14 (App Router, full-stack)
- Astro (content sites)

## Agents

| Agent | Role |
|-------|------|
| `agents/designer.md` | Design tokens, layout spec, 3D scene blueprints |
| `agents/frontend-engineer.md` | All frontend code, 3D, animations |
| `agents/backend-engineer.md` | API, database, auth |
| `agents/debugger.md` | Bug fixes, a11y, QA report |

## References

- `references/design-systems.md` — CSS/JS code snippets for every design style
- `references/tech-stack.md` — Setup commands and pinned dependency versions
- `workflows/orchestration.md` — Agent coordination protocol
