# Feature Mega Pack (Drop-in)

This pack merges:
- AI Smile Quiz (lead capture) + API route
- Appointments page
- Video Consultations page + API route
- Legal pages (privacy, terms, cookies)
- PWA/SEO basics (manifest, robots, sitemap)
- Effects (Reveal, GlowSpotlight, CoastalWaves)
- Cookie consent
- UI Button component
- SEO JSON-LD helper
- Zod validators

## Install

```bash
npm i zod clsx
```

## Add to your project

Copy folders into your repo:

```
/app
/components/effects
/components/legal
/components/ui
/lib/seo
/lib/utils
/public/manifest.json
```

## ENV (add to .env.local)

```
NEXT_PUBLIC_SITE_URL=https://your-domain
ZAPIER_WEBHOOK_URL=
NEXT_PUBLIC_TABEO_EMBED_KEY=
```

Everything is safe by default. Email/SMS/payment/portal features can be turned on later.
