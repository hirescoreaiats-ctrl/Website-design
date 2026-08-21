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
  return new Response(JSON.stringify({ results: [{ id: 'job-1', title: 'Senior Java Developer' }] }), { status: 200, headers: { 'content-type': 'application/json' } })
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

globalThis.fetch = originalFetch
console.log('Candidate sourcing worker validation passed.')
