# إذاعة القرآن الكريم من القاهرة (quranmasr)


[![Netlify Status](https://api.netlify.com/api/v1/badges/f02da83c-0638-4de4-85e1-ab52f84a06a5/deploy-status)](https://app.netlify.com/projects/quranmasr/deploys)


Arabic-first, SEO-friendly Next.js app for live Quran radio streaming from Cairo.

## Features

- RTL Arabic UI with Cairo + Amiri fonts
- HTML5 live audio player with status, volume, mute, and share
- Mobile navigation menu
- SEO: metadata, Open Graph, Twitter cards, JSON-LD (`RadioStation`, `WebSite`)

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:

- `NEXT_PUBLIC_RADIO_STREAM_URL` — verified stream URL (required before production)
- `NEXT_PUBLIC_SITE_URL` — canonical site URL (required for SEO, sitemap, and schema)

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

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://quranmasr.com`) and redeploy so sitemap, canonical URLs, and structured data rank correctly.

Replace the stream URL with a **verified, licensed** production source before going public.

## Google Search Console

1. Deploy with `NEXT_PUBLIC_SITE_URL` set to your production domain (e.g. `https://quranmasr.com`).
2. In [Google Search Console](https://search.google.com/search-console), add your domain or URL prefix property.
3. Choose **HTML tag** verification, copy the `content` value, and set `GOOGLE_SITE_VERIFICATION` in Netlify env vars, then redeploy.
4. Click **Verify** in Search Console.
5. Submit your sitemap: `https://your-domain.com/sitemap.xml`
6. Use **URL inspection** on the homepage and request indexing.

Test structured data: [Rich Results Test](https://search.google.com/test/rich-results).

## Pages

| Path | Description |
|------|-------------|
| `/` | Main player |
| `/about` | About the station |
| `/schedule` | Program schedule (placeholder) |
| `/privacy` | Privacy policy |

## Important

Before public launch, verify the stream source and broadcasting rights. Unofficial stream URLs may change or violate terms of use.

## Stack

Next.js App Router · TypeScript · Tailwind CSS
