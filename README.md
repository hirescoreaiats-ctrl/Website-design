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

The `public/_redirects` file rewrites nested routes to `index.html`, so refreshes on URLs like `/product/ai-candidate-ranking` work after deployment.

## Production URLs

- Main website: `https://hirescoreai.com`
- App and product CTAs: `https://app.hirescoreai.com`
- Backend API URL: `https://api.hirescoreai.com`
