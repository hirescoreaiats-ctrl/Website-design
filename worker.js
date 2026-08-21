const requiredFields = ['fullName', 'workEmail', 'phone', 'companyName', 'jobTitle', 'openings', 'location', 'workMode', 'experienceRange', 'mustHaveSkills', 'budgetRange', 'maximumNoticePeriod', 'candidatesRequired', 'targetShortlistDate', 'hiringUrgency', 'jobDescription']
const reply = (message, status = 200) => new Response(JSON.stringify({ message }), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })
const clean = (value, max = 3000) => String(value ?? '').trim().slice(0, max)

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname !== '/api/sourcing-requests') return env.ASSETS.fetch(request)
    if (request.method === 'GET') {
      const apiBase = clean(env.ATS_PUBLIC_API_BASE_URL || 'https://api.hirescoreai.com', 500).replace(/\/$/, '')
      const upstream = await fetch(`${apiBase}/public-sourcing-requirements${url.search}`, { headers: { accept: 'application/json' } })
      const body = await upstream.text()
      return new Response(body, {
        status: upstream.status,
        headers: {
          'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=30, s-maxage=60',
        },
      })
    }
    if (request.method !== 'POST') return reply('Method not allowed.', 405)
    let payload
    try { payload = await request.json() } catch { return reply('Please submit a valid request.', 400) }
    const email = clean(payload.workEmail, 320)
    const openings = Number(payload.openings)
    if (requiredFields.some((field) => !clean(payload[field])) || !payload.consent || !/^\S+@\S+\.\S+$/.test(email)) return reply('Please complete all required fields and provide consent.', 400)
    const candidatesRequired = Number(payload.candidatesRequired)
    if (!Number.isInteger(openings) || openings < 1 || openings > 10000 || !Number.isInteger(candidatesRequired) || candidatesRequired < 1 || candidatesRequired > 10000) return reply('Please provide valid position and candidate quantities.', 400)
    const apiBase = clean(env.ATS_PUBLIC_API_BASE_URL || 'https://api.hirescoreai.com', 500).replace(/\/$/, '')
    const upstream = await fetch(`${apiBase}/public-sourcing-requirements/submit`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ ...payload, openings, candidatesRequired, workEmail: email }),
    })
    const body = await upstream.text()
    return new Response(body, { status: upstream.status, headers: { 'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8', 'cache-control': 'no-store' } })
  },
}
