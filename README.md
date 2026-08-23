# HireScoreAI Website

Modern Vite + React landing website for HireScoreAI, an AI-powered recruitment and ATS platform.

## Run locally

```bash
npm install
npm run dev
```

Vite will print a local URL, usually:

```bash
http://localhost:5173
```

## Production build

```bash
npm run build
```

The deployable output will be generated in `dist/`.

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

No backend integration is required for the current contact form. The form UI is ready for future API wiring.

## Deploy to Cloudflare Pages

Use these settings:

```bash
Build command: npm run build
Output directory: dist
```

Cloudflare SPA refresh handling is configured in `wrangler.jsonc` with:

```json
"not_found_handling": "single-page-application"
```

Do not add a Netlify-style `_redirects` file. Nested routes like `/product/ai-candidate-ranking`, `/pricing`, `/resources/blogs`, and `/contact` are handled by Wrangler assets config.

## Production URLs

- Main website: `https://hirescoreai.com`
- App and product CTAs: `https://app.hirescoreai.com`
- Backend API URL: `https://api.hirescoreai.com`

## Public jobs SEO

The production build prerenders the Requirement Platform, job-category pages, B2B recruitment pages, and every active approved public job returned by `ATS_PUBLIC_API_BASE_URL`. Cloudflare Worker routes keep `/jobs/{slug}/` and `/jobs-sitemap.xml` current between deployments. Closed, private, pending, rejected, and inactive jobs are excluded because the public API returns only active approved sourcing requirements.

Required runtime variable:

```bash
ATS_PUBLIC_API_BASE_URL=https://api.hirescoreai.com
```

Optional Google Indexing API preparation:

```bash
GOOGLE_INDEXING_WEBHOOK_SECRET=replace_with_a_long_random_secret
GOOGLE_INDEXING_CLIENT_EMAIL=service-account@your-project.iam.gserviceaccount.com
GOOGLE_INDEXING_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

After enabling the Google Indexing API and granting the service account access in Search Console, an authorized backend lifecycle hook can call `POST /api/indexing/jobs` with `x-indexing-webhook-secret` and JSON `{ "url": "https://hirescoreai.com/jobs/example/", "type": "URL_UPDATED" }`. Use `URL_DELETED` when a previously published job is closed or removed. No Google credentials are stored in source control.

Search Console setup:

1. Verify the `https://hirescoreai.com/` domain property.
2. Submit `https://hirescoreai.com/sitemap.xml`.
3. Enable the Google Indexing API in the same Google Cloud project as the service account.
4. Add the service-account email as an owner of the Search Console property before sending JobPosting notifications.
