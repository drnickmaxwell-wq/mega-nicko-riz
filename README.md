# St Mary’s House Dental Care — Next.js Monorepo

This repository contains the integrated website code for **St Mary’s House Dental Care**.

## Project Structure

- `/app` — Next.js App Router routes and pages
- `/components` — Reusable UI components
- `/features` — Larger feature modules (3D viewer, animations, chatbot, AI, etc.)
  - `/features/imports/*` — Original imported modules from uploaded ZIPs kept intact
- `/public` — Static assets (models, textures, images)
- `/styles` — (if present) legacy styles migrated into `/app` where applicable
- `next.config.mjs`, `tsconfig.json` — project configuration
- `tailwind.config.ts`, `postcss.config.cjs` — TailwindCSS configuration
- `.eslintrc.cjs`, `.prettierrc` — linting and formatting

## Local Development

```bash
# 1) Install Node.js 18+
# 2) Install dependencies
npm install

# 3) Run dev server (http://localhost:3000)
npm run dev

# 4) Build for production
npm run build
npm start
```

## Dependencies

- Next.js 14 (App Router)
- TypeScript, ESLint, Prettier
- TailwindCSS
- framer-motion
- 3D/AR:
  - `@google/model-viewer` for GLTF/GLB + AR quick wins
  - `three`, `@react-three/fiber`, `@react-three/drei` for custom scenes

> Choose the 3D approach that matches the imported components. Both stacks are pre-installed.

## Environment Variables

Create a `.env.local` for any secrets. In **Vercel**, add the same keys via **Project Settings → Environment Variables**.

```
# EXAMPLES ONLY — replace/remove as needed
NEXT_PUBLIC_SITE_NAME="St Mary’s House Dental Care"
```

## GitHub & Vercel

1. Initialize git and push:
   ```bash
   git init
   git remote add origin https://github.com/drnickmaxwell-wq/chatgpt-build.git
   git add -A
   git commit -m "chore: initial import — scaffold + integrated batches"
   git push -u origin main
   ```

2. In **Vercel**, create or select the `chatgpt-build` project and import this GitHub repo.
   - Framework Preset: **Next.js**
   - Root Directory: `/` (repo root)
   - Build Command: `next build`
   - Output Directory: `.vercel/output` (auto) or leave default
   - Add any environment variables.

If the Vercel build fails, check the logs and ensure missing packages or type errors are resolved. Update `package.json` as needed.

## Notes

- All uploaded ZIP contents are preserved under `/features/imports/*` if they did not follow a conventional Next.js layout. Conventional folders (`app`, `components`, `public`, `features`) were merged directly.
- Resolve any duplicate component names by consolidating files and removing `__imported` suffixed duplicates once you confirm which version is correct.
- If you had specific pages/components from “manus AI project prompt”, add them now under `/app` and `/components` accordingly.

— Generated on 2025-09-10T03:58:16.914726Z


## New routes wired from final batch
- /journeys — Patient treatment journeys
- /fees — Fees page scaffold
- /dental-plan — Dental plan placeholder
- /appointments — BookingWidget
- /smile-quiz — AI Smile Quiz
- /three — 3D viewer + AR
- /chatbot — AI concierge
- /seo — Zero-click SEO showcase
- /pwa — Performance & PWA demo
- /privacy — GDPR & consent manager
- /video-consultations (and /video-consultations/portal) — existing scaffold, now with feature module available

