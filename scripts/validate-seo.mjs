import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { SEO_ROUTES, SITE_URL } from '../src/seoConfig.js'

const dist = path.join(process.cwd(), 'dist')
const errors = []
const titles = new Map()
const descriptions = new Map()

const decodeHtml = (value = '') => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')

const capture = (html, pattern) => decodeHtml(html.match(pattern)?.[1] || '')

for (const route of SEO_ROUTES) {
  const outputPath = route.path === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, route.path.slice(1), 'index.html')
  let html
  try {
    html = await readFile(outputPath, 'utf8')
  } catch {
    errors.push(`${route.path}: generated HTML is missing`)
    continue
  }

  const title = capture(html, /<title>([\s\S]*?)<\/title>/i)
  const description = capture(html, /<meta name="description" content="([^"]*)"/i)
  const canonical = capture(html, /<link rel="canonical" href="([^"]*)"/i)
  const robots = capture(html, /<meta name="robots" content="([^"]*)"/i)
  const jsonLd = html.match(/<script id="route-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1]

  if (title !== route.title) errors.push(`${route.path}: title mismatch`)
  if (description !== route.description) errors.push(`${route.path}: description mismatch`)
  if (canonical !== route.canonical) errors.push(`${route.path}: canonical mismatch`)
  if (!route.canonical.startsWith(`${SITE_URL}/`)) errors.push(`${route.path}: canonical must use HTTPS non-www domain`)
  if (!route.canonical.endsWith('/')) errors.push(`${route.path}: canonical must use trailing slash`)
  if (route.noindex ? !robots.includes('noindex') : !robots.includes('index')) errors.push(`${route.path}: robots directive mismatch`)
  if (titles.has(title)) errors.push(`${route.path}: duplicate title with ${titles.get(title)}`)
  if (descriptions.has(description)) errors.push(`${route.path}: duplicate description with ${descriptions.get(description)}`)
  titles.set(title, route.path)
  descriptions.set(description, route.path)

  if (!route.noindex) {
    try {
      const parsed = JSON.parse(jsonLd)
      const types = parsed['@graph'].flatMap((node) => Array.isArray(node['@type']) ? node['@type'] : [node['@type']])
      for (const required of ['Organization', 'WebSite', 'SoftwareApplication']) {
        if (!types.includes(required)) errors.push(`${route.path}: missing ${required} schema`)
      }
      const software = parsed['@graph'].find((node) => node['@type'] === 'SoftwareApplication')
      if (software?.offers?.priceCurrency !== 'INR') errors.push(`${route.path}: SoftwareApplication offer currency must be INR`)
      if (software?.offers?.url !== `${SITE_URL}/pricing/`) errors.push(`${route.path}: SoftwareApplication offer URL must use trailing slash pricing URL`)
      if (route.breadcrumbs && !types.includes('BreadcrumbList')) errors.push(`${route.path}: missing BreadcrumbList schema`)
      if (route.schemaKind === 'article' && !types.includes('Article')) errors.push(`${route.path}: missing Article schema`)
      if (route.schemaKind === 'howto' && !types.includes('HowTo')) errors.push(`${route.path}: missing HowTo schema`)
      if (route.schemaKind === 'faq' && !types.includes('FAQPage')) errors.push(`${route.path}: missing FAQPage schema`)
    } catch {
      errors.push(`${route.path}: invalid JSON-LD`)
    }
  }
}

const sitemapFiles = ['page-sitemap.xml', 'blog-sitemap.xml']
const sitemapUrls = new Set()
for (const filename of sitemapFiles) {
  const xml = await readFile(path.join(dist, filename), 'utf8')
  for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const url = match[1]
    sitemapUrls.add(url)
    if (!url.startsWith(`${SITE_URL}/`)) errors.push(`${filename}: sitemap URL must use HTTPS non-www domain: ${url}`)
    if (!url.endsWith('/')) errors.push(`${filename}: sitemap URL must use trailing slash: ${url}`)
  }
}
const indexableUrls = new Set(SEO_ROUTES.filter((route) => !route.noindex).map((route) => route.canonical))
for (const url of indexableUrls) if (!sitemapUrls.has(url)) errors.push(`Sitemap missing ${url}`)
for (const url of sitemapUrls) if (!indexableUrls.has(url)) errors.push(`Sitemap contains non-indexable or unknown URL ${url}`)

if (errors.length) {
  console.error(`SEO validation failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`SEO validation passed: ${SEO_ROUTES.length} route pages, ${indexableUrls.size} indexable URLs, unique titles/descriptions, valid canonicals, schemas, and sitemaps.`)
