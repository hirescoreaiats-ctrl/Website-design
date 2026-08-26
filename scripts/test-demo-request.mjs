import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import worker from '../worker.js'

const app = readFileSync('src/App.jsx', 'utf8')
assert.match(app, /onSubmit=\{submitDemoRequest\}/, 'Request Demo form should use its submit handler')
assert.match(app, /fetch\('\/api\/demo-requests'/, 'Request Demo form should call the same-origin Worker API')
for (const field of ['name', 'workEmail', 'companyName', 'hiringVolume', 'message']) {
  assert.match(app, new RegExp(`name="${field}"`), `Request Demo form should submit ${field}`)
}
assert.match(app, /disabled=\{formState\.status === 'submitting'\}/, 'Request Demo should prevent duplicate in-flight submits')
assert.match(app, /status: 'success'/, 'Request Demo should expose a success state')
assert.match(app, /status: 'error'/, 'Request Demo should expose an error state')

const validPayload = {
  name: 'Asha Sharma',
  workEmail: 'ASHA@EXAMPLE.COM',
  companyName: 'Hiring Tech',
  hiringVolume: '6 to 20 roles',
  message: 'We want to evaluate the platform.',
  sourcePage: 'https://hirescoreai.com/contact',
}
const originalFetch = globalThis.fetch
let upstreamUrl = ''
let upstreamPayload = null
globalThis.fetch = async (url, options = {}) => {
  upstreamUrl = String(url)
  upstreamPayload = JSON.parse(options.body)
  return new Response(JSON.stringify({ message: 'Demo request submitted successfully.', status: 'sent' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

const response = await worker.fetch(new Request('https://hirescoreai.com/api/demo-requests', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(validPayload),
}), { ATS_PUBLIC_API_BASE_URL: 'https://api.example.com/' })
assert.equal(response.status, 200)
assert.equal(upstreamUrl, 'https://api.example.com/api/v1/demo/request')
assert.deepEqual(upstreamPayload, { ...validPayload, workEmail: 'asha@example.com' })
assert.equal((await response.json()).status, 'sent')

const invalid = await worker.fetch(new Request('https://hirescoreai.com/api/demo-requests', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...validPayload, workEmail: 'invalid' }),
}), { ATS_PUBLIC_API_BASE_URL: 'https://api.example.com' })
assert.equal(invalid.status, 400)

globalThis.fetch = async () => { throw new Error('network unavailable') }
const unavailable = await worker.fetch(new Request('https://hirescoreai.com/api/demo-requests', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(validPayload),
}), { ATS_PUBLIC_API_BASE_URL: 'https://api.example.com' })
assert.equal(unavailable.status, 502)
assert.match((await unavailable.json()).message, /temporarily unavailable/i)

globalThis.fetch = originalFetch
console.log('Request Demo worker validation passed.')
