# إذاعة القرآن الكريم من القاهرة (quranmasr)

Arabic-first, SEO-friendly Next.js app for live Quran radio streaming from Cairo.

## Features

- RTL Arabic UI with Cairo + Amiri fonts
- HTML5 live audio player with status, volume, mute, and share
- Listener heartbeats via `/api/listener` (Upstash Redis or in-memory fallback)
- Metrics panel via `/api/metrics`
- Curated social comments (`data/comments.json`)
- SEO: metadata, Open Graph, Twitter cards, JSON-LD (`RadioStation`, `WebSite`)
- Google Analytics 4 (page views + stream events)

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:

- `NEXT_PUBLIC_RADIO_STREAM_URL` — verified stream URL (required before production)
- `NEXT_PUBLIC_SITE_URL` — canonical site URL
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 ID from [Google Analytics](https://analytics.google.com/)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — optional, for live listener counts on the homepage

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub

Repository: [github.com/mshams999/quranmasr](https://github.com/mshams999/quranmasr)

```bash
git remote add origin https://github.com/mshams999/quranmasr.git
git push -u origin main
```

## Deploy to Netlify

### Option A — Netlify Dashboard (recommended)

1. In [Netlify](https://app.netlify.com/) → **Add new site** → **Import an existing project**.
2. Connect the **quranmasr** GitHub repo.
3. **Site configuration → Environment variables** — add every variable from `.env.example`.
4. **Deploy site**. API routes run as serverless functions automatically.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli   # once
netlify login
netlify init
netlify env:import .env.local
netlify deploy --prod
```

After the first deploy, update `NEXT_PUBLIC_SITE_URL` to your production domain and redeploy.

Replace the stream URL with a **verified, licensed** production source before going public.

## Pages

| Path | Description |
|------|-------------|
| `/` | Main player, metrics, comments |
| `/about` | About the station |
| `/schedule` | Program schedule (placeholder) |
| `/contact` | Social links |
| `/privacy` | Privacy policy |

## Important

Before public launch, verify the stream source and broadcasting rights. Unofficial stream URLs may change or violate terms of use.

## Stack

Next.js App Router · TypeScript · Tailwind CSS · Google Analytics 4 · Upstash Redis
