import assert from 'node:assert/strict'
import worker from '../worker.js'

const validPayload = {
  fullName: 'Test Recruiter', workEmail: 'recruiter@example.com', phone: '+91 9000000000', companyName: 'Example Company',
  companyWebsite: 'https://example.com', jobTitle: 'Senior Java Developer', openings: '12', location: 'Bengaluru', workMode: 'Hybrid',
  experienceRange: '5-8 years', mustHaveSkills: 'Java, Spring Boot, APIs', preferredSkills: 'Cloud', budgetRange: 'Shared after review',
  maximumNoticePeriod: '30 days', candidatesRequired: '20', targetShortlistDate: '2026-09-01', hiringUrgency: 'Within 30 days',
  jobDescription: 'Build and maintain backend services.', additionalDetails: 'Test request', consent: true,
}
const env = { ATS_PUBLIC_API_BASE_URL: 'https://api.example.com' }
const publicJob = {
  id: 'job-1', title: 'Senior Java Developer', company_name: 'Example Company', company_website: 'https://example.com', department: 'Engineering',
  location: 'Bengaluru', work_mode: 'Hybrid', employment_type: 'Full Time', salary_range: 'Shared after review', experience_required: '5-8 years',
  primary_skills: ['Java', 'Spring Boot'], secondary_skills: ['Cloud'], description: 'Key Responsibilities\nBuild backend services.\nRequired Skills\nJava and Spring Boot.',
  application_deadline: '2026-09-01', published_at: '2026-08-23T00:00:00Z', apply_url: 'https://api.example.com/apply/java-job',
}
const originalFetch = globalThis.fetch
let deliveredPayload
let proxiedUrl
globalThis.fetch = async (url, options = {}) => {
  if (options.body) {
    deliveredPayload = JSON.parse(options.body)
    proxiedUrl = String(url)
    return new Response(JSON.stringify({ job_id: 'vendor-job', status: 'pending_approval' }), { status: 200, headers: { 'content-type': 'application/json' } })
  }
  proxiedUrl = String(url)
  return new Response(JSON.stringify({ results: [publicJob] }), { status: 200, headers: { 'content-type': 'application/json' } })
}

const validResponse = await worker.fetch(new Request('https://example.com/api/sourcing-requests', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(validPayload) }), env)
assert.equal(validResponse.status, 200)
assert.equal(deliveredPayload.workEmail, validPayload.workEmail)
assert.equal(deliveredPayload.openings, 12)
assert.equal(proxiedUrl, 'https://api.example.com/public-sourcing-requirements/submit')
assert.equal((await validResponse.json()).status, 'pending_approval')

const invalidResponse = await worker.fetch(new Request('https://example.com/api/sourcing-requests', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...validPayload, consent: false }) }), env)
assert.equal(invalidResponse.status, 400)
const feedResponse = await worker.fetch(new Request('https://example.com/api/sourcing-requests?job_id=job-1&limit=10'), { ATS_PUBLIC_API_BASE_URL: 'https://api.example.com/' })
assert.equal(feedResponse.status, 200)
assert.equal((await feedResponse.json()).results[0].id, 'job-1')
assert.equal(proxiedUrl, 'https://api.example.com/public-sourcing-requirements?job_id=job-1&limit=10')

const template = '<!doctype html><html><head><!-- route-seo:start --><title>Old</title><!-- route-seo:end --></head><body><div id="root">Old root</div><script type="module" src="/assets/app.js"></script></body></html>'
const seoEnv = { ATS_PUBLIC_API_BASE_URL: 'https://api.example.com', ASSETS: { fetch: async () => new Response(template, { headers: { 'content-type': 'text/html' } }) } }
const jobResponse = await worker.fetch(new Request('https://hirescoreai.com/jobs/senior-java-developer-bengaluru/'), seoEnv)
const jobHtml = await jobResponse.text()
assert.equal(jobResponse.status, 200)
assert.match(jobHtml, /Senior Java Developer Jobs in Bengaluru/)
assert.match(jobHtml, /"@type":"JobPosting"/)
assert.match(jobHtml, /rel="canonical" href="https:\/\/hirescoreai\.com\/jobs\/senior-java-developer-bengaluru\/"/)
assert.match(jobHtml, /window\.__PUBLIC_JOB__/)

const sitemapResponse = await worker.fetch(new Request('https://hirescoreai.com/jobs-sitemap.xml'), seoEnv)
const sitemap = await sitemapResponse.text()
assert.match(sitemap, /<loc>https:\/\/hirescoreai\.com\/jobs\/senior-java-developer-bengaluru\/<\/loc>/)

const closedResponse = await worker.fetch(new Request('https://hirescoreai.com/jobs/closed-role-nowhere/'), seoEnv)
const closedHtml = await closedResponse.text()
assert.equal(closedResponse.status, 404)
assert.match(closedHtml, /This position is no longer accepting applications/)
assert.doesNotMatch(closedHtml, /JobPosting/)

const indexingResponse = await worker.fetch(new Request('https://hirescoreai.com/api/indexing/jobs', { method: 'POST' }), seoEnv)
assert.equal(indexingResponse.status, 401)

globalThis.fetch = originalFetch
console.log('Candidate sourcing worker validation passed.')
