import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { HOME_FAQS, SEO_ROUTES, STATIC_ROUTE_FAQS, STATIC_ROUTE_H1S, buildRouteSchema } from '../src/seoConfig.js'

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

const pageHeading = (config) => STATIC_ROUTE_H1S[config.path] || config.title.replace(/ \|.*$/, '')

function staticLinksFor(config) {
  if (config.path === '/') return [
    ['/product/ai-resume-parsing/', 'AI resume screening'],
    ['/product/ai-candidate-scoring/', 'JD-based candidate scoring'],
    ['/solutions/bulk-resume-screening/', 'Bulk resume screening'],
    ['/resources/user-guide/review-ai-ranked-candidates/', 'Candidate ranking guide'],
    ['/pricing/', 'Pricing'],
  ]
  if (config.path.startsWith('/product/')) return [
    ['/product/hirescore-ai/', 'HireScore AI product'],
    ['/solutions/', 'Hiring solutions'],
    ['/pricing/', 'Pricing'],
  ]
  if (config.path.startsWith('/solutions/')) return [
    ['/solutions/', 'All solutions'],
    ['/product/ai-resume-parsing/', 'AI resume screening'],
    ['/contact/', 'Book a demo'],
  ]
  if (config.path.startsWith('/resources/')) return [
    ['/resources/', 'Resources'],
    ['/product/hirescore-ai/', 'Product'],
    ['/solutions/', 'Solutions'],
  ]
  if (config.path.startsWith('/compare/')) return [
    ['/product/hirescore-ai/', 'HireScore AI product'],
    ['/pricing/', 'Pricing'],
    ['/contact/', 'Book a demo'],
  ]
  return [
    ['/product/hirescore-ai/', 'Product'],
    ['/solutions/', 'Solutions'],
    ['/resources/', 'Resources'],
  ]
}

function staticContext(config) {
  if (config.path === '/') return {
    title: 'AI recruitment software for connected hiring workflows',
    text: 'HireScore AI combines AI resume screening, candidate ranking software, JD-based candidate scoring, and recruitment automation software in one recruiter-controlled workspace.',
  }
  if (config.path.startsWith('/product/')) return {
    title: 'How this HireScore AI capability fits into hiring',
    text: 'Connect this capability with job requirements, candidate evidence, recruiter review, communication, and interview workflows without losing hiring context.',
  }
  if (config.path.startsWith('/solutions/')) return {
    title: 'A practical workflow for this hiring need',
    text: 'Define the role, collect candidate resumes, review JD-based ranking evidence, and move qualified applicants forward with recruiter oversight.',
  }
  if (config.path.startsWith('/compare/')) return {
    title: 'Review platform fit carefully',
    text: 'Compare screening focus, workflow breadth, setup needs, and team fit using current vendor information before making a purchasing decision.',
  }
  if (config.path.startsWith('/resources/')) return {
    title: 'Practical guidance for recruiting teams',
    text: 'Use this resource to understand the workflow, review the available evidence, and keep hiring decisions under human control.',
  }
  if (config.path === '/pricing') return {
    title: 'Choose a plan by active hiring volume',
    text: 'Start with the free pilot, test a real hiring workflow, and confirm the connected features and Action AI Agent access available for your selected plan.',
  }
  return {
    title: 'Explore HireScore AI',
    text: 'Learn how HireScore AI supports explainable resume screening, candidate ranking, shortlisting, and connected recruiter workflows.',
  }
}

function renderStaticContent(config) {
  const context = staticContext(config)
  const breadcrumbs = config.breadcrumbs?.length
    ? `<nav aria-label="Breadcrumb">${config.breadcrumbs.map((item) => `<a href="${escapeHtml(item.path === '/' ? '/' : `${item.path}/`)}">${escapeHtml(item.name)}</a>`).join(' <span aria-hidden="true">/</span> ')}</nav>`
    : ''
  const steps = config.steps?.length
    ? `<section><h2>Steps</h2><ol>${config.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol></section>`
    : ''
  const routeFaqs = config.path === '/' || config.schemaKind === 'faq'
    ? HOME_FAQS
    : STATIC_ROUTE_FAQS[config.path]
  const faqs = routeFaqs?.length
    ? `<section><h2>Frequently asked questions</h2>${routeFaqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}</section>`
    : ''
  const links = staticLinksFor(config)
    .map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`)
    .join('')

  return `<div id="root">
    <div class="staticRouteShell" data-static-route-content>
      <header><a href="/" aria-label="HireScore AI home">HireScore AI</a><nav aria-label="Primary navigation"><a href="/product/hirescore-ai/">Product</a><a href="/solutions/">Solutions</a><a href="/resources/">Resources</a><a href="/pricing/">Pricing</a><a href="/contact/">Contact</a></nav></header>
      <main>
        ${breadcrumbs}
        <article>
          <h1>${escapeHtml(pageHeading(config))}</h1>
          <p>${escapeHtml(config.description)}</p>
          <section><h2>${escapeHtml(context.title)}</h2><p>${escapeHtml(context.text)}</p></section>
          ${steps}
          ${faqs}
          <nav class="staticRouteLinks" aria-label="Related HireScore AI pages">${links}</nav>
        </article>
      </main>
      <footer><p>HireScore AI helps recruiters make faster, explainable hiring decisions.</p></footer>
    </div>
  </div>`
}

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
    <meta name="author" content="HireScore AI" />
    <meta name="application-name" content="HireScore AI" />
    <meta name="theme-color" content="#100d18" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="format-detection" content="telephone=no" />
    <title>${escapeHtml(config.title)}</title>
    <meta property="og:site_name" content="HireScore AI" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escapeHtml(config.title)}" />
    <meta property="og:description" content="${escapeHtml(config.description)}" />
    <meta property="og:type" content="${config.ogType || 'website'}" />
    <meta property="og:url" content="${escapeHtml(config.canonical)}" />
    <meta property="og:image" content="${escapeHtml(config.image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(config.image)}" />
    <meta property="og:image:alt" content="HireScore AI – AI recruitment workflow platform" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(config.title)}" />
    <meta name="twitter:description" content="${escapeHtml(config.description)}" />
    <meta name="twitter:image" content="${escapeHtml(config.image)}" />
    <meta name="twitter:image:alt" content="HireScore AI – AI recruitment workflow platform" />
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

for (const config of SEO_ROUTES) {
  const html = template.replace(
    /<!-- route-seo:start -->[\s\S]*?<!-- route-seo:end -->/,
    renderSeo(config),
  ).replace('<div id="root"></div>', renderStaticContent(config))
  const outputPath = config.path === '/'
    ? templatePath
    : path.join(dist, config.path.slice(1), 'index.html')
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html)
}

const indexableRoutes = SEO_ROUTES.filter((route) => !route.noindex)
const blogRoutes = indexableRoutes.filter((route) => route.path.startsWith('/resources/blogs/'))
const pageRoutes = indexableRoutes.filter((route) => !route.path.startsWith('/resources/blogs/'))

await writeFile(path.join(dist, 'sitemap.xml'), renderSitemapIndex())
await writeFile(path.join(dist, 'page-sitemap.xml'), renderUrlset(pageRoutes))
await writeFile(path.join(dist, 'blog-sitemap.xml'), renderUrlset(blogRoutes))

console.log(`Generated route-specific SEO HTML and sitemaps for ${SEO_ROUTES.length} routes.`)
