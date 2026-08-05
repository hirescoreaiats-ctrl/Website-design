import assert from 'node:assert/strict'
import worker from '../worker.js'

const validPayload = {
  fullName: 'Test Recruiter', workEmail: 'recruiter@example.com', phone: '+91 9000000000', companyName: 'Example Company',
  companyWebsite: 'https://example.com', jobTitle: 'Senior Java Developer', openings: '12', location: 'Bengaluru', workMode: 'Hybrid',
  experienceRange: '5-8 years', mustHaveSkills: 'Java, Spring Boot, APIs', preferredSkills: 'Cloud', budgetRange: 'Shared after review',
  maximumNoticePeriod: '30 days', candidatesRequired: '20', targetShortlistDate: '2026-09-01', hiringUrgency: 'Within 30 days',
  jobDescription: 'Build and maintain backend services.', additionalDetails: 'Test request', consent: true,
}
const env = { RESEND_API_KEY: 'test-key', SOURCING_REQUEST_TO_EMAIL: 'team@example.com', SOURCING_REQUEST_FROM_EMAIL: 'Sourcing <sourcing@example.com>' }
const originalFetch = globalThis.fetch
let deliveredPayload
globalThis.fetch = async (_url, options) => { deliveredPayload = JSON.parse(options.body); return new Response(JSON.stringify({ id: 'email-test' }), { status: 200 }) }

const validResponse = await worker.fetch(new Request('https://example.com/api/sourcing-requests', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(validPayload) }), env)
assert.equal(validResponse.status, 200)
assert.equal(deliveredPayload.reply_to, validPayload.workEmail)
assert.match(deliveredPayload.subject, /Senior Java Developer/)

const invalidResponse = await worker.fetch(new Request('https://example.com/api/sourcing-requests', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...validPayload, consent: false }) }), env)
assert.equal(invalidResponse.status, 400)
const missingConfigResponse = await worker.fetch(new Request('https://example.com/api/sourcing-requests', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(validPayload) }), {})
assert.equal(missingConfigResponse.status, 503)

globalThis.fetch = originalFetch
console.log('Candidate sourcing worker validation passed.')
