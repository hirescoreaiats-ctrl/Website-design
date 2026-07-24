import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { FOUNDER_ID, HOME_FAQS, HOME_H1, ORGANIZATION_ID, SEO_ROUTES, SITE_URL, STATIC_ROUTE_FAQS, STATIC_ROUTE_H1S } from '../src/seoConfig.js'

const dist = path.join(process.cwd(), 'dist')
const errors = []
const titles = new Map()
const descriptions = new Map()
const canonicals = new Map()
const staticParagraphs = new Map()
const intentionalNoindexRoutes = new Set(['/privacy', '/terms'])

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
  const body = capture(html, /<body[^>]*>([\s\S]*?)<\/body>/i)
  const rootContent = capture(body, /<div id="root">([\s\S]*?)<\/div>\s*$/i)
  const h1Matches = body.match(/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/gi) || []
  const h1Text = h1Matches[0]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || ''
  const paragraphTexts = [...body.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)]
    .map((match) => decodeHtml(match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()))
    .filter(Boolean)
  const visibleText = body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (title !== route.title) errors.push(`${route.path}: title mismatch`)
  if (description !== route.description) errors.push(`${route.path}: description mismatch`)
  if (canonical !== route.canonical) errors.push(`${route.path}: canonical mismatch`)
  if (!route.canonical.startsWith(`${SITE_URL}/`)) errors.push(`${route.path}: canonical must use HTTPS non-www domain`)
  if (!route.canonical.endsWith('/')) errors.push(`${route.path}: canonical must use trailing slash`)
  if (route.noindex ? !robots.includes('noindex') : !robots.includes('index')) errors.push(`${route.path}: robots directive mismatch`)
  if (titles.has(title)) errors.push(`${route.path}: duplicate title with ${titles.get(title)}`)
  if (descriptions.has(description)) errors.push(`${route.path}: duplicate description with ${descriptions.get(description)}`)
  if (canonicals.has(canonical)) errors.push(`${route.path}: duplicate canonical with ${canonicals.get(canonical)}`)
  if (Boolean(route.noindex) !== intentionalNoindexRoutes.has(route.path)) errors.push(`${route.path}: unexpected noindex configuration`)
  if (/<meta[^>]+name=["']keywords["']/i.test(html)) errors.push(`${route.path}: meta keywords tag must not be present`)
  if (/<noscript[\s>]/i.test(html)) errors.push(`${route.path}: SEO noscript content must not be present`)
  if (!body.includes('data-static-route-content')) errors.push(`${route.path}: missing meaningful static route content`)
  if (!rootContent || visibleText.length < 180) errors.push(`${route.path}: initial HTML body content is too thin`)
  if (h1Matches.length !== 1) errors.push(`${route.path}: initial HTML must contain exactly one H1`)
  if (STATIC_ROUTE_H1S[route.path] && h1Text !== STATIC_ROUTE_H1S[route.path]) errors.push(`${route.path}: static H1 conflicts with the interactive React H1`)
  if (route.path === '/' && h1Text !== HOME_H1) errors.push('/: approved homepage H1 mismatch')
  if (!visibleText.includes(route.description)) errors.push(`${route.path}: static body must contain its route-specific primary description`)
  if (route.path !== '/' && visibleText.includes(HOME_H1)) errors.push(`${route.path}: unrelated route contains the homepage H1`)
  for (const [question, answer] of STATIC_ROUTE_FAQS[route.path] || []) {
    if (!visibleText.includes(question) || !visibleText.includes(answer)) errors.push(`${route.path}: static FAQ content conflicts with the interactive page`)
  }
  for (const paragraph of paragraphTexts.filter((text) => text.length >= 80)) {
    const routes = staticParagraphs.get(paragraph) || []
    routes.push(route.path)
    staticParagraphs.set(paragraph, routes)
  }
  if ((body.match(/<a\s/gi) || []).length < 3) errors.push(`${route.path}: initial HTML needs contextual crawlable links`)
  titles.set(title, route.path)
  descriptions.set(description, route.path)
  canonicals.set(canonical, route.path)

  if (!route.noindex) {
    try {
      const parsed = JSON.parse(jsonLd)
      const graph = parsed['@graph']
      const types = graph.flatMap((node) => Array.isArray(node['@type']) ? node['@type'] : [node['@type']])
      const entityIds = graph.map((node) => node['@id']).filter(Boolean)
      const duplicateIds = entityIds.filter((id, index) => entityIds.indexOf(id) !== index)
      if (duplicateIds.length) errors.push(`${route.path}: duplicate JSON-LD @id values: ${[...new Set(duplicateIds)].join(', ')}`)
      for (const required of ['Organization', 'WebSite', 'SoftwareApplication']) {
        if (!types.includes(required)) errors.push(`${route.path}: missing ${required} schema`)
      }
      const organizations = graph.filter((node) => node['@type'] === 'Organization')
      if (organizations.length !== 1 || organizations[0]?.['@id'] !== ORGANIZATION_ID) errors.push(`${route.path}: must contain one stable HireScore AI Organization entity`)
      if (organizations[0]?.founder?.['@id'] !== FOUNDER_ID) errors.push(`${route.path}: Organization founder must reference the stable founder @id`)

      const website = graph.find((node) => node['@id'] === `${SITE_URL}/#website`)
      if (website?.publisher?.['@id'] !== ORGANIZATION_ID) errors.push(`${route.path}: WebSite publisher must reference the stable Organization @id`)
      const software = graph.find((node) => node['@id'] === `${SITE_URL}/#software`)
      if (software?.publisher?.['@id'] !== ORGANIZATION_ID || software?.brand?.['@id'] !== ORGANIZATION_ID) errors.push(`${route.path}: SoftwareApplication must reference the stable Organization @id`)
      if (software?.offers?.priceCurrency !== 'INR') errors.push(`${route.path}: SoftwareApplication offer currency must be INR`)
      if (software?.offers?.url !== `${SITE_URL}/pricing/`) errors.push(`${route.path}: SoftwareApplication offer URL must use trailing slash pricing URL`)

      const founderEntities = graph.filter((node) => node['@type'] === 'Person' && node.name === 'Sachin Yadav')
      if (route.path === '/') {
        const founder = founderEntities[0]
        if (founderEntities.length !== 1 || founder?.['@id'] !== FOUNDER_ID) errors.push(`${route.path}: homepage must contain one stable Sachin Yadav Person entity`)
        if (founder?.jobTitle !== 'Founder') errors.push(`${route.path}: founder Person jobTitle must be Founder`)
        if (founder?.url !== FOUNDER_ID) errors.push(`${route.path}: founder Person URL must match the visible homepage founder anchor`)
        if (founder?.worksFor?.['@id'] !== ORGANIZATION_ID) errors.push(`${route.path}: founder Person worksFor must reference the stable Organization @id`)
        const faq = graph.find((node) => node['@type'] === 'FAQPage')
        if (!faq || faq.mainEntity?.length !== HOME_FAQS.length) errors.push(`${route.path}: homepage FAQ schema must match visible FAQ content`)
        for (const [question, answer] of HOME_FAQS) {
          if (!visibleText.includes(question) || !visibleText.includes(answer)) errors.push(`${route.path}: visible initial HTML is missing FAQ content for ${question}`)
        }
      } else if (founderEntities.length) {
        errors.push(`${route.path}: founder Person entity must only appear on the visible About page`)
      }
      if (route.breadcrumbs && !types.includes('BreadcrumbList')) errors.push(`${route.path}: missing BreadcrumbList schema`)
      if (route.schemaKind === 'article' && !types.includes('Article')) errors.push(`${route.path}: missing Article schema`)
      if (route.schemaKind === 'howto' && !types.includes('HowTo')) errors.push(`${route.path}: missing HowTo schema`)
      if (route.schemaKind === 'faq' && !types.includes('FAQPage')) errors.push(`${route.path}: missing FAQPage schema`)
    } catch {
      errors.push(`${route.path}: invalid JSON-LD`)
    }
  }
}

for (const [paragraph, routes] of staticParagraphs) {
  if (routes.length === SEO_ROUTES.length) errors.push(`Generic paragraph duplicated across every route: ${paragraph.slice(0, 80)}`)
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
