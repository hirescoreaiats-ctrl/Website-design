import { buildJobPostingSchema, buildJobSeo, preparePublicJobs } from './src/jobSeo.js'

const SITE_URL = 'https://hirescoreai.com'
const requiredFields = ['fullName', 'workEmail', 'phone', 'companyName', 'jobTitle', 'openings', 'location', 'workMode', 'experienceRange', 'mustHaveSkills', 'budgetRange', 'maximumNoticePeriod', 'candidatesRequired', 'targetShortlistDate', 'hiringUrgency', 'jobDescription']
const reply = (message, status = 200, extra = {}) => new Response(JSON.stringify({ message, ...extra }), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })
const clean = (value, max = 3000) => String(value ?? '').trim().slice(0, max)
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/api/sourcing-requests') return handleSourcingApi(request, env, url)
    if (url.pathname === '/api/demo-requests') return handleDemoRequestApi(request, env, url)
    if (url.pathname === '/api/indexing/jobs') return handleIndexingNotification(request, env)

    if (url.pathname === '/jobs-sitemap.xml') {
      const jobs = await loadPublicJobs(env)
      return new Response(renderJobsSitemap(jobs), { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=600' } })
    }

    if (url.pathname === '/requirement-platform/' && url.searchParams.get('job_id') && url.searchParams.get('submission') !== 'pending') {
      const jobs = await loadPublicJobs(env)
      const job = jobs.find((item) => item.id === url.searchParams.get('job_id'))
      if (job) return Response.redirect(`${SITE_URL}${job.canonical_path}/`, 301)
    }

    const jobMatch = url.pathname.match(/^\/jobs\/([^/]+)\/?$/)
    if (jobMatch && !['it-jobs', 'non-it-jobs', 'engineering-jobs', 'bpo-jobs', 'sales-jobs'].includes(jobMatch[1])) {
      if (!url.pathname.endsWith('/')) return Response.redirect(`${url.origin}${url.pathname}/`, 301)
      return renderPublicJobResponse(request, env, jobMatch[1])
    }
    return env.ASSETS.fetch(request)
  },
}

async function handleDemoRequestApi(request, env, url) {
  if (request.method !== 'POST') return reply('Method not allowed.', 405)
  let payload
  try { payload = await request.json() } catch { return reply('Please submit a valid demo request.', 400) }
  const normalized = {
    name: clean(payload.name, 120),
    workEmail: clean(payload.workEmail, 320).toLowerCase(),
    companyName: clean(payload.companyName, 200),
    hiringVolume: clean(payload.hiringVolume, 100),
    message: clean(payload.message, 5000),
    sourcePage: clean(payload.sourcePage || request.headers.get('referer') || `${url.origin}/contact`, 1000),
  }
  if (!normalized.name || !normalized.companyName || !normalized.hiringVolume || !/^\S+@\S+\.\S+$/.test(normalized.workEmail)) {
    return reply('Please complete your name, valid work email, company name, and hiring volume.', 400)
  }
  let upstream
  try {
    upstream = await fetch(`${apiBaseUrl(env)}/api/v1/demo/request`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(normalized),
    })
  } catch {
    return reply('The demo request service is temporarily unavailable. Please try again.', 502)
  }
  const body = await upstream.text()
  return new Response(body, {
    status: upstream.status,
    headers: { 'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

async function handleSourcingApi(request, env, url) {
  if (request.method === 'GET') {
    const upstream = await fetch(`${apiBaseUrl(env)}/public-sourcing-requirements${url.search}`, { headers: { accept: 'application/json' } })
    const body = await upstream.text()
    return new Response(body, { status: upstream.status, headers: { 'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8', 'cache-control': 'public, max-age=30, s-maxage=60' } })
  }
  if (request.method !== 'POST') return reply('Method not allowed.', 405)
  let payload
  try { payload = await request.json() } catch { return reply('Please submit a valid request.', 400) }
  const email = clean(payload.workEmail, 320)
  const openings = Number(payload.openings)
  const candidatesRequired = Number(payload.candidatesRequired)
  if (requiredFields.some((field) => !clean(payload[field])) || !payload.consent || !/^\S+@\S+\.\S+$/.test(email)) return reply('Please complete all required fields and provide consent.', 400)
  if (!Number.isInteger(openings) || openings < 1 || openings > 10000 || !Number.isInteger(candidatesRequired) || candidatesRequired < 1 || candidatesRequired > 10000) return reply('Please provide valid position and candidate quantities.', 400)
  const upstream = await fetch(`${apiBaseUrl(env)}/public-sourcing-requirements/submit`, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ ...payload, openings, candidatesRequired, workEmail: email }) })
  const body = await upstream.text()
  return new Response(body, { status: upstream.status, headers: { 'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8', 'cache-control': 'no-store' } })
}

async function loadPublicJobs(env) {
  const response = await fetch(`${apiBaseUrl(env)}/public-sourcing-requirements?limit=100`, { headers: { accept: 'application/json' } })
  if (!response.ok) return []
  const payload = await response.json().catch(() => ({}))
  return preparePublicJobs(Array.isArray(payload.results) ? payload.results : [])
}

async function renderPublicJobResponse(request, env, slug) {
  const jobs = await loadPublicJobs(env)
  const job = jobs.find((item) => item.seo_slug === slug)
  const assetUrl = new URL('/requirement-platform/', request.url)
  const templateResponse = await env.ASSETS.fetch(new Request(assetUrl, { headers: request.headers }))
  let html = await templateResponse.text()
  if (!job) {
    html = replaceRouteSeo(html, { title: 'Job No Longer Available | HireScoreAI', description: 'This HireScoreAI position is no longer accepting applications. Browse current active recruitment requirements.', canonical: `${SITE_URL}/jobs/${escapeHtml(slug)}/`, robots: 'noindex, follow', schema: null })
    html = replaceRoot(html, renderClosedJob())
    return new Response(html, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60' } })
  }
  const seo = buildJobSeo(job, SITE_URL)
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${seo.canonical}#webpage`, url: seo.canonical, name: seo.title, description: seo.description, inLanguage: 'en', mainEntity: { '@id': `${seo.canonical}#jobposting` } },
    buildJobPostingSchema(job, SITE_URL),
  ] }
  html = replaceRouteSeo(html, { ...seo, robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', schema })
  html = replaceRoot(html, renderJobSource(job, jobs))
  html = html.replace('<script type="module"', `<script>window.__PUBLIC_JOB__=${safeJson(job)};window.__PUBLIC_JOBS__=${safeJson(jobs)};</script><script type="module"`)
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=120, s-maxage=300' } })
}

function replaceRouteSeo(html, config) {
  const schema = config.schema ? `<script id="route-schema" type="application/ld+json">${safeJson(config.schema)}</script>` : ''
  const block = `<!-- route-seo:start -->
    <link rel="canonical" href="${escapeHtml(config.canonical)}" />
    <meta name="description" content="${escapeHtml(config.description)}" />
    <meta name="robots" content="${config.robots}" />
    <meta name="googlebot" content="${config.robots}" />
    <title>${escapeHtml(config.title)}</title>
    <meta property="og:site_name" content="HireScoreAI" />
    <meta property="og:title" content="${escapeHtml(config.title)}" />
    <meta property="og:description" content="${escapeHtml(config.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(config.canonical)}" />
    <meta property="og:image" content="${SITE_URL}/hirescore-logo-full.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(config.title)}" />
    <meta name="twitter:description" content="${escapeHtml(config.description)}" />
    ${schema}
    <!-- route-seo:end -->`
  return html.replace(/<!-- route-seo:start -->[\s\S]*?<!-- route-seo:end -->/, block)
}

function replaceRoot(html, content) {
  return html.replace(/<div id="root"[^>]*>[\s\S]*<\/div>\s*<script type="module"/, `<div id="root" data-static-route-content>${content}</div><script type="module"`)
}

function renderJobSource(job, jobs) {
  const related = jobs.filter((item) => item.id !== job.id && item.categories.some((category) => job.categories.includes(category))).slice(0, 3)
  return `<main class="publicJobsPage"><article class="jobDetailHero"><div class="container"><nav class="jobBreadcrumb"><a href="/requirement-platform/">Recruitment requirements</a> / ${escapeHtml(job.title)}</nav><span class="jobsEyebrow">Active job opportunity</span><h1>${escapeHtml(job.title)}${job.location ? ` Jobs in ${escapeHtml(job.location)}` : ''}</h1><p>${escapeHtml(job.company_name || 'An active hiring team')} is recruiting for this role. Review the complete public requirement and official application information.</p></div></article><section class="jobDetailBody"><div class="container jobDetailGrid"><article class="jobDescriptionCard"><h2>Job description</h2><div class="jobDescriptionText">${escapeHtml(job.description || '')}</div></article><aside class="jobFactsCard"><h2>Role overview</h2>${fact('Location', [job.location, job.work_mode].filter(Boolean).join(' · '))}${fact('Experience', job.experience_required)}${fact('Employment', job.employment_type)}${fact('Compensation', job.salary_range)}${job.apply_url ? `<a href="${escapeHtml(job.apply_url)}">Apply for this job</a>` : ''}</aside></div></section><section class="relatedJobsSection"><div class="container"><h2>Related active jobs</h2><div class="publicJobGrid">${related.map((item) => `<article class="publicJobCard"><h3><a href="${item.canonical_path}/">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.company_name || '')}</p><footer><a href="${item.canonical_path}/">View job details</a></footer></article>`).join('')}</div></div></section></main>`
}

function renderClosedJob() {
  return '<main><section class="jobsState isClosed"><h1>This position is no longer accepting applications.</h1><p>The role may be closed, filled, expired, deactivated, or unavailable to the public.</p><a href="/requirement-platform/">Browse active job requirements</a></section></main>'
}

function fact(label, value) { return value ? `<div class="jobFact"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>` : '' }

function renderJobsSitemap(jobs) {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = jobs.map((job) => `  <url><loc>${SITE_URL}${job.canonical_path}/</loc><lastmod>${escapeHtml((job.published_at || lastmod).slice(0, 10))}</lastmod></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

async function handleIndexingNotification(request, env) {
  if (request.method !== 'POST') return reply('Method not allowed.', 405)
  if (!env.GOOGLE_INDEXING_WEBHOOK_SECRET || request.headers.get('x-indexing-webhook-secret') !== env.GOOGLE_INDEXING_WEBHOOK_SECRET) return reply('Unauthorized.', 401)
  if (!env.GOOGLE_INDEXING_CLIENT_EMAIL || !env.GOOGLE_INDEXING_PRIVATE_KEY) return reply('Google Indexing API credentials are not configured.', 503)
  let payload
  try { payload = await request.json() } catch { return reply('Invalid JSON.', 400) }
  const type = payload.type === 'URL_DELETED' ? 'URL_DELETED' : payload.type === 'URL_UPDATED' ? 'URL_UPDATED' : null
  const targetUrl = clean(payload.url, 500)
  if (!type || !targetUrl.startsWith(`${SITE_URL}/jobs/`)) return reply('A valid HireScoreAI job URL and notification type are required.', 400)
  const accessToken = await googleAccessToken(env)
  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', { method: 'POST', headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' }, body: JSON.stringify({ url: targetUrl, type }) })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) return reply(result.error?.message || 'Google Indexing API request failed.', response.status)
  return reply('Indexing notification published.', 200, { result })
}

async function googleAccessToken(env) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64Url(JSON.stringify({ iss: env.GOOGLE_INDEXING_CLIENT_EMAIL, scope: 'https://www.googleapis.com/auth/indexing', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }))
  const unsigned = `${header}.${claim}`
  const key = await crypto.subtle.importKey('pkcs8', pemToBytes(env.GOOGLE_INDEXING_PRIVATE_KEY), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned))
  const assertion = `${unsigned}.${base64UrlBytes(new Uint8Array(signature))}`
  const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }) })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || !payload.access_token) throw new Error(payload.error_description || 'Could not obtain Google access token.')
  return payload.access_token
}

function pemToBytes(value) {
  const binary = atob(String(value).replaceAll('\\n', '\n').replace(/-----[^-]+-----/g, '').replace(/\s+/g, ''))
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}
function base64Url(value) { return base64UrlBytes(new TextEncoder().encode(value)) }
function base64UrlBytes(bytes) { let binary = ''; bytes.forEach((byte) => { binary += String.fromCharCode(byte) }); return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '') }
function safeJson(value) { return JSON.stringify(value).replaceAll('<', '\\u003c') }
function apiBaseUrl(env) { return clean(env.ATS_PUBLIC_API_BASE_URL || 'https://api.hirescoreai.com', 500).replace(/\/$/, '') }
