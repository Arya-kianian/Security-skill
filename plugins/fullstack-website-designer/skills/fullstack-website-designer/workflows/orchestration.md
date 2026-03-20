# Agent Orchestration Workflow

## Overview

Four agents run concurrently in a single turn. The orchestrator compiles
their outputs and resolves conflicts in a second pass.

```
                     ┌─────────────────────────────────────────────┐
                     │               USER REQUEST                  │
                     └─────────────────┬───────────────────────────┘
                                       │
                     ┌─────────────────▼───────────────────────────┐
                     │            ORCHESTRATOR                     │
                     │   (capture intent → build project brief)    │
                     └──────┬──────────┬──────────┬──────────┬─────┘
                            │          │          │          │
               ┌────────────▼──┐  ┌───▼────┐ ┌──▼──────┐ ┌─▼──────────┐
               │  UI/UX        │  │Frontend│ │Backend  │ │QA Debugger │
               │  Designer     │  │Engineer│ │Engineer │ │            │
               └────────────┬──┘  └───┬────┘ └──┬──────┘ └─┬──────────┘
                            │         │          │           │
                     ┌──────▼─────────▼──────────▼───────────▼──────────┐
                     │                MERGE PASS                        │
                     │    orchestrator reads all outputs, patches       │
                     │    mismatches, confirms integration              │
                     └──────────────────────┬───────────────────────────┘
                                            │
                     ┌──────────────────────▼───────────────────────────┐
                     │            FINAL DELIVERY                        │
                     │   complete, working, debugged website            │
                     └──────────────────────────────────────────────────┘
```

---

## Turn 1: Launch All Agents

Spawn all four agents in a single turn using `Agent` tool calls with
`run_in_background: false` so you wait for all of them. Pass the same
`project_brief` to each.

### Project Brief Template

Fill this completely before spawning agents:

```
PROJECT BRIEF
=============
Site name:        <name>
Site type:        <portfolio | SaaS | e-commerce | agency | blog | etc.>
Pages:            <comma-separated list>
Brand tone:       <playful | futuristic | minimal | luxury | corporate>
Design style:     <glassmorphism | aurora | neomorphism | cyberpunk | etc.>
3D elements:      <icosahedron hero | particle field | WebGL shader | CSS tilt cards>
Colors:           <primary hex, accent hex, or "generate a dark tech palette">
Fonts:            <pair name or "generate based on tone">
Frontend stack:   <vanilla+vite | react+vite | next.js | astro>
Backend:          <none | next.js api routes | express | fastapi>
Database:         <none | sqlite+prisma | postgres+prisma>
Auth:             <none | jwt | next-auth>
Output directory: <absolute path>
Special:          <anything else>
```

### Agent Prompts

**Designer agent prompt:**
```
Read agents/designer.md in the skill directory at {baseDir}.
Here is the project brief:
<project_brief>
Build the complete design system and save all outputs to <output_dir>/design/.
Deliver: design-tokens.json, layout-spec.md, component-spec.md, 3d-scene-spec.md
```

**Frontend engineer agent prompt:**
```
Read agents/frontend-engineer.md in the skill directory at {baseDir}.
Here is the project brief:
<project_brief>
Read design system files from <output_dir>/design/ if they exist.
Build the complete frontend and save all files to <output_dir>/.
The site must be fully functional with 3D elements and animations as specified.
```

**Backend engineer agent prompt:**
```
Read agents/backend-engineer.md in the skill directory at {baseDir}.
Here is the project brief:
<project_brief>
Build the complete backend and save files to <output_dir>/server/ (or <output_dir>/src/app/api/).
Save api-contract.md to <output_dir>/design/api-contract.md.
Save .env.example to <output_dir>/.env.example.
```

**Debugger agent prompt:**
```
Read agents/debugger.md in the skill directory at {baseDir}.
Review all files in <output_dir>/ once they are written.
Fix all bugs in-place. Write QA-REPORT.md to <output_dir>/QA-REPORT.md.
```

**Important**: Launch designer + frontend + backend simultaneously.
Launch debugger slightly after (or second) so it has files to review.
In practice, launch all four at once — the debugger will wait for files.

---

## Turn 2: Merge Pass

After all agents complete, do a merge pass:

### 1. Design token integration

Read `design/design-tokens.json` and verify that:
- CSS custom properties in `styles/globals.css` match
- No hardcoded hex values in component files
- Font families imported in HTML `<head>` or `index.html`

If mismatches, patch `globals.css` directly.

### 2. API contract integration

Read `design/api-contract.md` and verify frontend API client:
- Base URL matches `VITE_API_URL` env var
- All endpoint paths match exactly
- Request/response shapes are handled in the frontend

### 3. Environment variables

Check `.env.example` and verify:
- Frontend `import.meta.env.VITE_*` variables all have entries
- Backend `process.env.*` variables all have entries
- No secret values present in `.env.example` — only placeholder strings

### 4. Apply debugger fixes

Read `QA-REPORT.md`. If the debugger listed bugs it couldn't fix
automatically, apply those fixes now.

---

## Turn 3: Final Review and Delivery

Verify the output is complete by running this checklist:

```
DELIVERY CHECKLIST
==================
[ ] index.html or src/main.jsx exists and is the correct entry point
[ ] package.json has dev, build, preview scripts
[ ] README.md explains: prerequisites, how to install, how to run, how to build
[ ] .env.example documents every env var
[ ] All pages listed in brief have corresponding files
[ ] 3D elements are implemented (not just commented out)
[ ] Animations are implemented (GSAP / Framer Motion / CSS transitions)
[ ] No TODO comments or placeholder text remain
[ ] QA-REPORT.md status is PASS or PASS WITH WARNINGS (not FAIL)
```

If any item is unchecked, fix it before delivering.

---

## Conflict Resolution

| Conflict type | Resolution |
|--------------|------------|
| Design token in JSON ≠ CSS custom property | Update CSS to match JSON |
| Frontend API URL ≠ backend route | Update frontend to match backend |
| Env var in backend ≠ .env.example | Add missing var to .env.example |
| Component in layout-spec not built | Build it (don't skip) |
| 3D library version conflict | Pin to version in references/tech-stack.md |
| Debugger can't fix a bug | Document in QA-REPORT, orchestrator fixes manually |

---

## Output Directory Convention

Use the site name in kebab-case as the output directory:

```
/tmp/<site-name>/          # default if no specific path given
  ├── design/              # designer outputs
  ├── src/                 # source code
  ├── server/              # backend (if applicable)
  ├── public/              # static assets
  ├── package.json
  ├── README.md
  ├── .env.example
  └── QA-REPORT.md
```

Present the absolute path to the user at the end so they know where to find it.

---

## Timing Expectations

- Designer: fast (produces docs/JSON, not code)
- Frontend: slow (most code, most files)
- Backend: medium (fewer files but careful implementation)
- Debugger: depends on how many bugs exist

Run all four in parallel. Total time is bounded by the slowest agent.
