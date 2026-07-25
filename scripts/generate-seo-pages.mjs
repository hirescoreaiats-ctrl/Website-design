import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { SEO_ROUTES, buildRouteSchema } from '../src/seoConfig.js'

const root = process.cwd()
const dist = path.join(root, 'dist')
const templatePath = path.join(dist, 'index.html')
const template = await readFile(templatePath, 'utf8')
const lastmod = new Date().toISOString().slice(0, 10)

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

globalThis.window = {
  location: { pathname: '/' },
  addEventListener() {},
  removeEventListener() {},
  history: { pushState() {} },
  dispatchEvent() {},
  scrollTo() {},
  matchMedia: () => ({ matches: true }),
  requestAnimationFrame() {},
  cancelAnimationFrame() {},
  devicePixelRatio: 1,
  innerWidth: 1440,
  innerHeight: 900,
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
})
const { default: App } = await vite.ssrLoadModule('/src/App.jsx')

function renderStaticContent(config) {
  window.location.pathname = config.path
  return `<div id="root" data-static-route-content>${renderToStaticMarkup(React.createElement(App))}</div>`
}

const renderedH1 = (html) => html
  .match(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/i)?.[1]
  ?.replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim() || ''

function renderSeo(config) {
  const robots = config.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const jsonLd = JSON.stringify(buildRouteSchema(config)).replaceAll('<', '\\u003c')
  return `<!-- route-seo:start -->
    <link rel="canonical" href="${escapeHtml(config.canonical)}" />
    <link rel="alternate" hreflang="en" href="${escapeHtml(config.canonical)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(config.canonical)}" />
    <meta name="description" content="${escapeHtml(config.description)}" />
    <meta name="robots" content="${robots}" />
    <meta name="googlebot" content="${robots}" />
    <meta name="author" content="HireScoreAI" />
    <meta name="application-name" content="HireScoreAI" />
    <meta name="theme-color" content="#100d18" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="format-detection" content="telephone=no" />
    <title>${escapeHtml(config.title)}</title>
    <meta property="og:site_name" content="HireScoreAI" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escapeHtml(config.title)}" />
    <meta property="og:description" content="${escapeHtml(config.description)}" />
    <meta property="og:type" content="${config.ogType || 'website'}" />
    <meta property="og:url" content="${escapeHtml(config.canonical)}" />
    <meta property="og:image" content="${escapeHtml(config.image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(config.image)}" />
    <meta property="og:image:alt" content="HireScoreAI – AI recruitment workflow platform" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(config.title)}" />
    <meta name="twitter:description" content="${escapeHtml(config.description)}" />
    <meta name="twitter:image" content="${escapeHtml(config.image)}" />
    <meta name="twitter:image:alt" content="HireScoreAI – AI recruitment workflow platform" />
    <script id="route-schema" type="application/ld+json">${jsonLd}</script>
    <!-- route-seo:end -->`
}

function renderUrlset(routes) {
  const urls = routes
    .map((route) => `  <url><loc>${escapeHtml(route.canonical)}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function renderSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>https://hirescoreai.com/page-sitemap.xml</loc><lastmod>${lastmod}</lastmod></sitemap>\n  <sitemap><loc>https://hirescoreai.com/blog-sitemap.xml</loc><lastmod>${lastmod}</lastmod></sitemap>\n</sitemapindex>\n`
}

try {
  for (const config of SEO_ROUTES) {
    const staticContent = renderStaticContent(config)
    const schemaConfig = { ...config, renderedH1: renderedH1(staticContent) }
    const html = template.replace(
      /<!-- route-seo:start -->[\s\S]*?<!-- route-seo:end -->/,
      renderSeo(schemaConfig),
    ).replace('<div id="root"></div>', staticContent)
    const outputPath = config.path === '/'
      ? templatePath
      : path.join(dist, config.path.slice(1), 'index.html')
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, html)
  }
} finally {
  await vite.close()
}

const indexableRoutes = SEO_ROUTES.filter((route) => !route.noindex)
const blogRoutes = indexableRoutes.filter((route) => route.path.startsWith('/resources/blogs/'))
const pageRoutes = indexableRoutes.filter((route) => !route.path.startsWith('/resources/blogs/'))

await writeFile(path.join(dist, 'sitemap.xml'), renderSitemapIndex())
await writeFile(path.join(dist, 'page-sitemap.xml'), renderUrlset(pageRoutes))
await writeFile(path.join(dist, 'blog-sitemap.xml'), renderUrlset(blogRoutes))

console.log(`Generated route-specific SEO HTML and sitemaps for ${SEO_ROUTES.length} routes.`)
