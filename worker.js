const requiredFields = ['fullName', 'workEmail', 'phone', 'companyName', 'jobTitle', 'openings', 'location', 'workMode', 'experienceRange', 'mustHaveSkills', 'budgetRange', 'maximumNoticePeriod', 'candidatesRequired', 'targetShortlistDate', 'hiringUrgency', 'jobDescription']
const reply = (message, status = 200) => new Response(JSON.stringify({ message }), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })
const clean = (value, max = 3000) => String(value ?? '').trim().slice(0, max)
const escapeHtml = (value) => clean(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname !== '/api/sourcing-requests') return env.ASSETS.fetch(request)
    if (request.method !== 'POST') return reply('Method not allowed.', 405)
    if (!env.RESEND_API_KEY || !env.SOURCING_REQUEST_TO_EMAIL || !env.SOURCING_REQUEST_FROM_EMAIL) return reply('Candidate sourcing email delivery is not configured. Please contact HireScoreAI by email.', 503)
    let payload
    try { payload = await request.json() } catch { return reply('Please submit a valid request.', 400) }
    const email = clean(payload.workEmail, 320)
    const openings = Number(payload.openings)
    if (requiredFields.some((field) => !clean(payload[field])) || !payload.consent || !/^\S+@\S+\.\S+$/.test(email)) return reply('Please complete all required fields and provide consent.', 400)
    const candidatesRequired = Number(payload.candidatesRequired)
    if (!Number.isInteger(openings) || openings < 1 || openings > 10000 || !Number.isInteger(candidatesRequired) || candidatesRequired < 1 || candidatesRequired > 10000) return reply('Please provide valid position and candidate quantities.', 400)
    const entries = [['Full name', payload.fullName], ['Work email', email], ['Phone', payload.phone], ['Company', payload.companyName], ['Company website', payload.companyWebsite || 'Not provided'], ['Job title', payload.jobTitle], ['Open positions', openings], ['Location', payload.location], ['Work mode', payload.workMode], ['Required experience', payload.experienceRange], ['Mandatory skills', payload.mustHaveSkills], ['Preferred skills', payload.preferredSkills || 'Not provided'], ['Salary or CTC range', payload.budgetRange], ['Maximum notice period', payload.maximumNoticePeriod], ['Candidates required', candidatesRequired], ['Target shortlist date', payload.targetShortlistDate], ['Hiring urgency', payload.hiringUrgency], ['Job description', payload.jobDescription], ['Additional notes', payload.additionalDetails || 'Not provided'], ['Consent', 'Confirmed']]
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.SOURCING_REQUEST_FROM_EMAIL, to: [env.SOURCING_REQUEST_TO_EMAIL], reply_to: email, subject: `Candidate sourcing request: ${clean(payload.jobTitle, 120)} — ${clean(payload.companyName, 120)}`, text: entries.map(([label, value]) => `${label}: ${clean(value)}`).join('\n'), html: `<h1>New candidate sourcing request</h1><table>${entries.map(([label, value]) => `<tr><th style="text-align:left;padding:8px;border:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')}</table>` }),
    })
    if (!delivery.ok) return reply('The request could not be delivered. Please try again or contact HireScoreAI by email.', 502)
    return reply('Candidate sourcing request delivered.')
  },
}
