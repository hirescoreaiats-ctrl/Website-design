import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { FOUNDER_ID, HOME_FAQS, HOME_H1, OFFICIAL_SOCIAL_LINKS, ORGANIZATION_ID, SEO_ROUTES, SITE_URL, STATIC_ROUTE_H1S } from '../src/seoConfig.js'

const dist = path.join(process.cwd(), 'dist')
const errors = []
const titles = new Map()
const descriptions = new Map()
const canonicals = new Map()
const staticParagraphs = new Map()
const intentionalNoindexRoutes = new Set(['/privacy', '/terms'])
const routePaths = new Set(SEO_ROUTES.map((route) => route.path))
const inboundLinks = new Map(SEO_ROUTES.map((route) => [route.path, new Set()]))
const linkRecords = []
const blogBodies = []
const routeMetrics = []

const decodeHtml = (value = '') => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')

const capture = (html, pattern) => decodeHtml(html.match(pattern)?.[1] || '')
const stripHtml = (html = '') => decodeHtml(html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
  .replace(/<canvas[\s\S]*?<\/canvas>/gi, ' ')
  .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
  .replace(/<section[^>]*\bctaSection\b[^>]*>[\s\S]*?<\/section>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim())
const wordCount = (text = '') => text.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length || 0
const normalizeRoutePath = (value = '/') => {
  const clean = value.split('?')[0].split('#')[0].replace(/\/+$/, '')
  return clean || '/'
}
const attribute = (attrs, name) => decodeHtml(attrs.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, 'i'))?.slice(1).find((value) => value !== undefined) || '')
const requiredRepresentativePaths = new Set([
  '/',
  '/product/hirescore-ai',
  '/pricing',
  '/solutions/recruitment-agencies',
  '/product/ai-candidate-scoring',
  '/resources',
  '/resources/blogs',
  '/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time',
  '/resources/blogs/what-is-candidate-ranking-and-why-it-matters',
  '/resources/blogs/complete-guide-to-ai-powered-hiring-automation',
  '/resources/user-guide/upload-resumes',
  '/compare/hirescoreai-vs-hiredscore',
])

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
  const jsonLdBlocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  const jsonLd = jsonLdBlocks[0]?.[1]
  const body = capture(html, /<body[^>]*>([\s\S]*?)<\/body>/i)
  const mainHtml = body.match(/<main(?:\s[^>]*)?>([\s\S]*?)<\/main>/i)?.[1] || ''
  const h1Matches = body.match(/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/gi) || []
  const h1Text = h1Matches[0]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || ''
  const paragraphTexts = [...mainHtml.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)]
    .map((match) => decodeHtml(match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()))
    .filter(Boolean)
  const visibleText = stripHtml(body)
  const meaningfulText = stripHtml(mainHtml)
  const meaningfulWords = wordCount(meaningfulText)
  const mainHeadings = [...mainHtml.matchAll(/<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi)].map((match) => stripHtml(match[2]))
  routeMetrics.push({ path: route.path, words: meaningfulWords, h1: h1Text, headings: mainHeadings })

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
  if (!route.noindex && jsonLdBlocks.length !== 1) errors.push(`${route.path}: expected exactly one JSON-LD block, found ${jsonLdBlocks.length}`)
  if (!mainHtml || meaningfulWords < 50) errors.push(`${route.path}: initial main content is blank or extremely thin (${meaningfulWords} words)`)
  if (h1Matches.length !== 1) errors.push(`${route.path}: initial HTML must contain exactly one H1`)
  if (STATIC_ROUTE_H1S[route.path] && h1Text !== STATIC_ROUTE_H1S[route.path]) errors.push(`${route.path}: static H1 conflicts with the interactive React H1`)
  if (route.path === '/' && h1Text !== HOME_H1) errors.push('/: approved homepage H1 mismatch')
  if (route.path !== '/' && visibleText.includes(HOME_H1)) errors.push(`${route.path}: unrelated route contains the homepage H1`)
  if (route.path === '/' && meaningfulWords < 600) errors.push(`/: homepage needs at least 600 meaningful main-content words; found ${meaningfulWords}`)
  if (requiredRepresentativePaths.has(route.path) && (!h1Text || !mainHeadings.length || meaningfulWords < 100)) errors.push(`${route.path}: representative parity route is missing its H1, section headings, or core content`)
  if (route.schemaKind === 'article') {
    if (meaningfulWords < 800) errors.push(`${route.path}: complete blog article requires at least 800 meaningful words; found ${meaningfulWords}`)
    if (mainHeadings.length < 4) errors.push(`${route.path}: complete blog article is missing its expected section hierarchy`)
    if (meaningfulText.includes('Practical guidance for recruiting teams')) errors.push(`${route.path}: generic blog fallback is still present`)
    blogBodies.push({ path: route.path, text: meaningfulText.toLowerCase() })
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

  for (const match of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = match[1]
    const href = attribute(attrs, 'href')
    const anchorText = stripHtml(match[2]) || attribute(attrs, 'aria-label')
    const inMain = mainHtml.includes(match[0])
    const target = attribute(attrs, 'target')
    const rel = attribute(attrs, 'rel')
    const ariaLabel = attribute(attrs, 'aria-label')
    let kind = 'external'
    let destinationStatus = 'external-not-fetched'
    let canonicalDestination = ''
    let broken = false
    let redirectDetected = false

    if (!href || href === '#' || /^javascript:/i.test(href)) {
      broken = true
      destinationStatus = 'invalid'
      errors.push(`${route.path}: empty, placeholder, or JavaScript href`)
    } else if (href.startsWith('#')) {
      kind = 'internal'
      const id = href.slice(1)
      destinationStatus = new RegExp(`\\bid=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(body) ? 'ok' : 'missing-fragment'
      broken = destinationStatus !== 'ok'
      canonicalDestination = `${route.canonical}${href}`
      if (broken) errors.push(`${route.path}: missing fragment destination ${href}`)
    } else if (href.startsWith('/') || href.startsWith(SITE_URL)) {
      kind = 'internal'
      let localHref = href.startsWith(SITE_URL) ? href.slice(SITE_URL.length) || '/' : href
      if (localHref.startsWith('//') || /\/{2,}/.test(localHref.split('?')[0].replace(/^\/\//, '/'))) {
        broken = true
        errors.push(`${route.path}: malformed internal href ${href}`)
      }
      const destinationPath = normalizeRoutePath(localHref)
      canonicalDestination = `${SITE_URL}${destinationPath === '/' ? '/' : `${destinationPath}/`}`
      if (!routePaths.has(destinationPath)) {
        broken = true
        destinationStatus = 'missing-route'
        errors.push(`${route.path}: internal link points to unknown generated route ${href}`)
      } else {
        destinationStatus = 'ok'
        inboundLinks.get(destinationPath).add(route.path)
      }
      const pathPart = localHref.split('?')[0].split('#')[0]
      if (pathPart !== '/' && !pathPart.endsWith('/')) {
        redirectDetected = true
        errors.push(`${route.path}: internal href must use the canonical trailing slash ${href}`)
      }
      if (/^https?:\/\/www\.hirescoreai\.com/i.test(href)) errors.push(`${route.path}: internal link uses www host ${href}`)
    } else if (/^https?:/i.test(href)) {
      if (target === '_blank' && (!rel.includes('noopener') || !rel.includes('noreferrer'))) {
        broken = true
        errors.push(`${route.path}: target="_blank" external link is missing noopener noreferrer: ${href}`)
      }
    } else if (!href.startsWith('mailto:')) {
      broken = true
      destinationStatus = 'malformed'
      errors.push(`${route.path}: malformed href ${href}`)
    }

    const approvedSocial = Object.entries(OFFICIAL_SOCIAL_LINKS).find(([, url]) => href === url)
    if (/youtube\.com|linkedin\.com|instagram\.com/i.test(href)) {
      if (!approvedSocial) {
        broken = true
        errors.push(`${route.path}: unapproved social URL ${href}`)
      } else {
        const [network] = approvedSocial
        const expectedLabel = {
          youtube: 'HireScoreAI on YouTube',
          linkedin: 'HireScoreAI on LinkedIn',
          instagram: 'HireScoreAI on Instagram',
        }[network]
        if (target !== '_blank' || !rel.includes('noopener') || !rel.includes('noreferrer') || ariaLabel !== expectedLabel) {
          broken = true
          errors.push(`${route.path}: ${network} social link attributes are incomplete`)
        }
      }
    }

    linkRecords.push({
      sourceRoute: route.path,
      anchorText,
      destination: href,
      kind,
      destinationStatus,
      canonicalDestination,
      redirectDetected,
      broken,
      inMain,
    })
  }

  if (!route.noindex) {
    try {
      const parsed = JSON.parse(jsonLd)
      const graph = parsed['@graph']
      if (!Array.isArray(graph)) throw new Error('JSON-LD @graph must be an array')
      const types = graph.flatMap((node) => Array.isArray(node['@type']) ? node['@type'] : [node['@type']])
      const structuredEntities = []
      const collectEntities = (value) => {
        if (!value || typeof value !== 'object') return
        if (value['@type']) structuredEntities.push(value)
        for (const child of Object.values(value)) collectEntities(child)
      }
      collectEntities(graph)
      const entityIds = structuredEntities.map((node) => node['@id']).filter(Boolean)
      const duplicateIds = entityIds.filter((id, index) => entityIds.indexOf(id) !== index)
      if (duplicateIds.length) errors.push(`${route.path}: duplicate JSON-LD @id values: ${[...new Set(duplicateIds)].join(', ')}`)
      const entityKeys = structuredEntities
        .map((node) => `${node['@type']}|${node['@id'] || node.url || node.name || ''}`)
        .filter((key) => !key.endsWith('|'))
      const duplicateEntityKeys = entityKeys.filter((key, index) => entityKeys.indexOf(key) !== index)
      if (duplicateEntityKeys.length) errors.push(`${route.path}: duplicate schema entities: ${[...new Set(duplicateEntityKeys)].join(', ')}`)
      if (!types.includes(route.pageType || 'WebPage')) errors.push(`${route.path}: missing route WebPage schema`)

      const walk = (value, location = '$') => {
        if (value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
          errors.push(`${route.path}: empty structured-data value at ${location}`)
          return
        }
        if (!value || typeof value !== 'object') return
        for (const [key, child] of Object.entries(value)) {
          if (key === 'brand') errors.push(`${route.path}: unsupported SoftwareApplication brand property at ${location}`)
          walk(child, `${location}.${key}`)
        }
      }
      walk(parsed)

      const softwareEntities = structuredEntities.filter((node) => node['@type'] === 'SoftwareApplication')
      if (route.path === '/product/hirescore-ai') {
        if (softwareEntities.length !== 1) errors.push(`${route.path}: primary product route must contain exactly one SoftwareApplication`)
        const software = softwareEntities[0]
        const supportedSoftwareProperties = new Set(['@type', '@id', 'name', 'description', 'applicationCategory', 'operatingSystem', 'url', 'publisher', 'offers'])
        for (const property of Object.keys(software || {})) {
          if (!supportedSoftwareProperties.has(property)) errors.push(`${route.path}: unsupported SoftwareApplication property ${property}`)
        }
        for (const required of ['name', 'description', 'applicationCategory', 'operatingSystem', 'url', 'offers']) {
          if (!software?.[required]) errors.push(`${route.path}: SoftwareApplication missing ${required}`)
        }
        if (software?.publisher?.['@id'] !== ORGANIZATION_ID) errors.push(`${route.path}: SoftwareApplication publisher must reference the stable Organization @id`)
        if (software?.offers?.priceCurrency !== 'INR' || software?.offers?.url !== `${SITE_URL}/pricing/`) errors.push(`${route.path}: SoftwareApplication offer is incomplete`)
        if ('aggregateRating' in (software || {}) || 'review' in (software || {})) errors.push(`${route.path}: rating or review data must not be emitted without public evidence`)
      } else if (softwareEntities.length) {
        errors.push(`${route.path}: SoftwareApplication is only allowed on /product/hirescore-ai`)
      }

      const organizations = graph.filter((node) => node['@type'] === 'Organization')
      const requiresOrganization = route.path === '/' || route.path === '/product/hirescore-ai' || ['article', 'case-study'].includes(route.schemaKind)
      if (requiresOrganization && (organizations.length !== 1 || organizations[0]?.['@id'] !== ORGANIZATION_ID)) errors.push(`${route.path}: must contain one stable HireScoreAI Organization entity`)

      if (route.path === '/') {
        if (!types.includes('WebSite')) errors.push('/: homepage missing WebSite schema')
        if (types.includes('SoftwareApplication')) errors.push('/: homepage must not claim SoftwareApplication without review evidence')
        const website = graph.find((node) => node['@id'] === `${SITE_URL}/#website`)
        if (website?.publisher?.['@id'] !== ORGANIZATION_ID) errors.push('/: WebSite publisher must reference the stable Organization @id')
      } else if (types.includes('WebSite')) {
        errors.push(`${route.path}: WebSite must only be emitted on the homepage`)
      }

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
      if (route.schemaKind === 'article') {
        const article = graph.find((node) => node['@type'] === 'Article')
        if (!article) errors.push(`${route.path}: missing Article schema`)
        if (article?.headline !== h1Text) errors.push(`${route.path}: Article headline must match the visible H1`)
        if (article?.author?.['@id'] !== ORGANIZATION_ID || !visibleText.includes('By HireScoreAI')) errors.push(`${route.path}: article authorship is not consistent between schema and visible content`)
        for (const field of ['headline', 'description', 'image', 'author', 'publisher', 'datePublished', 'dateModified', 'mainEntityOfPage']) {
          if (!article?.[field]) errors.push(`${route.path}: Article missing ${field}`)
        }
      }
      if (route.schemaKind === 'case-study' && !types.includes('Article')) errors.push(`${route.path}: case study missing Article schema`)
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

for (let index = 0; index < blogBodies.length; index += 1) {
  for (let other = index + 1; other < blogBodies.length; other += 1) {
    const left = new Set(blogBodies[index].text.split(/\s+/).filter((word) => word.length > 4))
    const right = new Set(blogBodies[other].text.split(/\s+/).filter((word) => word.length > 4))
    const overlap = [...left].filter((word) => right.has(word)).length
    const similarity = overlap / Math.max(1, Math.min(left.size, right.size))
    if (similarity > 0.9) errors.push(`${blogBodies[index].path} and ${blogBodies[other].path}: blog main content is substantially duplicated`)
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

const destinationsFor = (source) => linkRecords
  .filter((link) => link.sourceRoute === source && link.kind === 'internal' && link.inMain && !link.broken)
  .map((link) => normalizeRoutePath(link.destination.startsWith(SITE_URL) ? link.destination.slice(SITE_URL.length) : link.destination))
const requireLinkGroup = (source, label, predicate, minimum = 1) => {
  const matches = destinationsFor(source).filter(predicate)
  if (new Set(matches).size < minimum) errors.push(`${source}: missing ${label} internal links (expected ${minimum})`)
}

const homepageRequired = [
  '/product/hirescore-ai',
  '/pricing',
  '/contact',
  '/resources',
  '/resources/blogs',
  ...SEO_ROUTES.filter((route) => route.path.startsWith('/solutions/')).map((route) => route.path),
]
for (const destination of homepageRequired) {
  if (!destinationsFor('/').includes(destination)) errors.push(`/: missing required contextual link to ${destination}`)
}

for (const route of SEO_ROUTES.filter((item) => item.path.startsWith('/product/') && !['/product/hirescore-ai', '/product/jd-manager'].includes(item.path))) {
  requireLinkGroup(route.path, 'product overview', (destination) => destination === '/product/hirescore-ai')
  requireLinkGroup(route.path, 'related product', (destination) => destination.startsWith('/product/') && destination !== route.path && destination !== '/product/hirescore-ai', 2)
  requireLinkGroup(route.path, 'relevant solution', (destination) => destination.startsWith('/solutions/'))
  requireLinkGroup(route.path, 'resource or guide', (destination) => destination.startsWith('/resources/'))
  requireLinkGroup(route.path, 'pricing or contact', (destination) => ['/pricing', '/contact'].includes(destination))
}

for (const route of SEO_ROUTES.filter((item) => item.path.startsWith('/solutions/'))) {
  requireLinkGroup(route.path, 'solutions overview', (destination) => destination === '/solutions')
  requireLinkGroup(route.path, 'relevant product', (destination) => destination.startsWith('/product/'), 2)
  requireLinkGroup(route.path, 'resource or guide', (destination) => destination.startsWith('/resources/'))
  requireLinkGroup(route.path, 'pricing or contact', (destination) => ['/pricing', '/contact'].includes(destination))
}

const articleRoutes = SEO_ROUTES.filter((route) => route.schemaKind === 'article')
for (const route of articleRoutes) {
  requireLinkGroup(route.path, 'relevant product', (destination) => destination.startsWith('/product/'), 2)
  requireLinkGroup(route.path, 'relevant solution', (destination) => destination.startsWith('/solutions/'))
  requireLinkGroup(route.path, 'guide or FAQ', (destination) => destination.startsWith('/resources/user-guide/') || destination === '/resources/faqs')
  requireLinkGroup(route.path, 'related article', (destination) => destination.startsWith('/resources/blogs/') && destination !== route.path, 2)
  requireLinkGroup(route.path, 'blog hub', (destination) => destination === '/resources/blogs')
  requireLinkGroup(route.path, 'pricing or contact', (destination) => ['/pricing', '/contact'].includes(destination))
}

for (const article of articleRoutes) {
  const hubLinks = linkRecords.filter((link) => link.sourceRoute === '/resources/blogs' && normalizeRoutePath(link.destination) === article.path)
  if (hubLinks.length < 3) errors.push(`/resources/blogs: blog card for ${article.path} must link its image, title, and CTA`)
}

const orphanRoutes = SEO_ROUTES
  .filter((route) => !route.noindex && route.path !== '/' && inboundLinks.get(route.path).size === 0)
  .map((route) => route.path)
for (const orphan of orphanRoutes) errors.push(`${orphan}: indexable route has no internal inbound links`)

const inboundCounts = Object.fromEntries([...inboundLinks].map(([route, sources]) => [route, sources.size]))
for (const record of linkRecords) {
  if (record.kind === 'internal') record.inboundLinkCount = inboundCounts[normalizeRoutePath(record.destination)] || 0
}
await writeFile(path.join(dist, 'internal-link-report.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  totals: {
    hyperlinks: linkRecords.length,
    internal: linkRecords.filter((link) => link.kind === 'internal').length,
    external: linkRecords.filter((link) => link.kind === 'external').length,
    broken: linkRecords.filter((link) => link.broken).length,
    redirects: linkRecords.filter((link) => link.redirectDetected).length,
  },
  orphanRoutes,
  lowInboundRoutes: Object.entries(inboundCounts).filter(([, count]) => count < 3),
  inboundCounts,
  routeMetrics,
  links: linkRecords,
}, null, 2)}\n`)

if (errors.length) {
  console.error(`SEO validation failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`SEO validation passed: ${SEO_ROUTES.length} route pages, ${indexableUrls.size} indexable URLs, unique titles/descriptions, valid canonicals, schemas, and sitemaps.`)
