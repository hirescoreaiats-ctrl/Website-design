export const JOBS_BASE_PATH = '/jobs'

export const JOB_CATEGORIES = [
  {
    slug: 'it-jobs',
    label: 'IT jobs',
    title: 'IT Jobs & Software Job Openings | HireScoreAI',
    description: 'Explore active IT jobs, software development roles, data, AI, cloud, DevOps, QA, and technology hiring requirements on HireScoreAI.',
    heading: 'Latest IT Jobs & Software Openings',
    intro: 'Browse active technology requirements across software development, data, AI and machine learning, cloud, DevOps, QA, support, and other IT specializations.',
  },
  {
    slug: 'non-it-jobs',
    label: 'Non-IT jobs',
    title: 'Non-IT Jobs in Sales, BPO & Operations | HireScoreAI',
    description: 'Find active Non-IT jobs across BPO, customer support, sales, operations, back office, and business functions on HireScoreAI.',
    heading: 'Latest Non-IT Job Openings',
    intro: 'Discover active Non-IT opportunities in BPO, customer support, sales, operations, back office, administration, and other business teams.',
  },
  {
    slug: 'engineering-jobs',
    label: 'Engineering jobs',
    title: 'Engineering Jobs & Technical Openings | HireScoreAI',
    description: 'Explore engineering jobs including embedded, firmware, hardware, manufacturing, electrical, mechanical, and technical roles on HireScoreAI.',
    heading: 'Active Engineering Jobs',
    intro: 'Review engineering requirements spanning embedded and firmware, hardware, electrical, mechanical, manufacturing, and related technical disciplines.',
  },
  {
    slug: 'bpo-jobs',
    label: 'BPO jobs',
    title: 'BPO Jobs & Customer Support Openings | HireScoreAI',
    description: 'Browse active BPO jobs, voice and non-voice processes, customer support, telecalling, and back-office opportunities on HireScoreAI.',
    heading: 'Active BPO & Customer Support Jobs',
    intro: 'Find current BPO, customer support, telecalling, voice, non-voice, and back-office requirements from active hiring teams.',
  },
  {
    slug: 'sales-jobs',
    label: 'Sales jobs',
    title: 'Sales Jobs & Business Development Openings | HireScoreAI',
    description: 'Explore active sales jobs, business development, inside sales, field sales, outbound calling, and account roles on HireScoreAI.',
    heading: 'Active Sales & Business Development Jobs',
    intro: 'Browse sales and business development opportunities across inside sales, field sales, outbound calling, lead generation, and customer acquisition.',
  },
]

const CATEGORY_KEYWORDS = {
  'it-jobs': ['software', 'developer', 'data', 'analyst', 'python', 'java', 'cloud', 'devops', 'qa', 'technology', 'it ', 'machine learning', ' ai ', 'cyber', 'web', 'full stack', 'frontend', 'backend'],
  'non-it-jobs': ['sales', 'bpo', 'support', 'operations', 'back office', 'telecall', 'business development', 'customer', 'marketing', 'finance', 'hr ', 'recruit'],
  'engineering-jobs': ['engineer', 'engineering', 'embedded', 'firmware', 'hardware', 'mechanical', 'electrical', 'electronics', 'manufacturing', 'civil'],
  'bpo-jobs': ['bpo', 'customer support', 'telecall', 'outbound call', 'inbound call', 'voice process', 'non voice', 'back office'],
  'sales-jobs': ['sales', 'business development', 'lead generation', 'account executive', 'outbound call', 'field sales', 'inside sales'],
}

export function slugifyJob(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

export function preparePublicJobs(rows = []) {
  const active = rows.filter((job) => job && job.id && job.title && job.is_active !== false)
  const bases = active.map((job) => slugifyJob(`${job.title}-${job.location || job.work_mode || ''}`) || `job-${String(job.id).slice(0, 8)}`)
  const counts = bases.reduce((map, slug) => map.set(slug, (map.get(slug) || 0) + 1), new Map())
  const companyKeys = active.map((job, index) => `${bases[index]}|${slugifyJob(job.company_name || '')}`)
  const companyCounts = companyKeys.reduce((map, key) => map.set(key, (map.get(key) || 0) + 1), new Map())
  return active.map((job, index) => {
    const base = bases[index]
    const slug = counts.get(base) > 1 ? `${base}-${slugifyJob(String(job.id).slice(0, 8))}` : base
    const disambiguator = counts.get(base) > 1
      ? (job.company_name && companyCounts.get(companyKeys[index]) === 1 ? job.company_name : `Opening ${String(job.id).slice(0, 8)}`)
      : ''
    return { ...job, seo_slug: slug, seo_disambiguator: disambiguator, canonical_path: `${JOBS_BASE_PATH}/${slug}`, categories: categoriesForJob(job) }
  })
}

export function categoriesForJob(job) {
  const haystack = ` ${[job.title, job.department, job.description, ...(job.primary_skills || []), ...(job.secondary_skills || [])].filter(Boolean).join(' ')} `.toLowerCase()
  const categories = Object.entries(CATEGORY_KEYWORDS)
    .filter(([, keywords]) => keywords.some((keyword) => haystack.includes(keyword)))
    .map(([slug]) => slug)
  if (!categories.includes('it-jobs') && !categories.includes('non-it-jobs')) {
    categories.unshift(/engineer|developer|software|data|technology|cloud|devops|qa|firmware|embedded/.test(haystack) ? 'it-jobs' : 'non-it-jobs')
  }
  return [...new Set(categories)]
}

export function categoryBySlug(slug) {
  return JOB_CATEGORIES.find((category) => category.slug === slug) || null
}

export function jobCanonicalUrl(job, siteUrl = 'https://hirescoreai.com') {
  return `${siteUrl}${job.canonical_path || `${JOBS_BASE_PATH}/${job.seo_slug}`}/`
}

export function buildJobSeo(job, siteUrl = 'https://hirescoreai.com') {
  const title = `${job.title}${job.location ? ` Jobs in ${job.location}` : ' Jobs'}${job.experience_required ? ` | ${job.experience_required}` : ''}${job.seo_disambiguator ? ` | ${job.seo_disambiguator}` : ''} | HireScoreAI`
  const company = job.company_name ? `${job.company_name} is hiring` : 'Apply for'
  const details = [job.location, job.experience_required, job.employment_type].filter(Boolean).join(', ')
  const description = `${company} ${job.title}${details ? ` (${details})` : ''}. Review skills, responsibilities, compensation and application details on HireScoreAI.`
  return {
    title,
    description: description.slice(0, 300),
    canonical: jobCanonicalUrl(job, siteUrl),
  }
}

export function buildJobPostingSchema(job, siteUrl = 'https://hirescoreai.com') {
  const seo = buildJobSeo(job, siteUrl)
  const remote = /remote|work from home|wfh/i.test(`${job.work_mode || ''} ${job.location || ''}`)
  const responsibilities = extractSection(job.description, ['key responsibilities', 'responsibilities'], ['required skills', 'skills', 'education', 'experience', 'compensation', 'good to have', 'what we offer', 'how to apply'])
  const qualifications = extractSection(job.description, ['required skills', 'qualifications', 'requirements'], ['education', 'experience', 'compensation', 'good to have', 'what we offer', 'how to apply'])
  const education = extractSection(job.description, ['education', 'education requirements'], ['experience', 'compensation', 'good to have', 'what we offer', 'how to apply'])
  const schema = {
    '@type': 'JobPosting',
    '@id': `${seo.canonical}#jobposting`,
    title: job.title,
    description: job.description,
    identifier: { '@type': 'PropertyValue', name: job.company_name || 'HireScoreAI requirement', value: String(job.id) },
    datePosted: validDate(job.published_at),
    validThrough: validDate(job.application_deadline),
    employmentType: normalizeEmploymentType(job.employment_type),
    hiringOrganization: job.company_name ? compact({ '@type': 'Organization', name: job.company_name, sameAs: safeHttpUrl(job.company_website) }) : undefined,
    jobLocationType: remote ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements: remote && job.location ? { '@type': 'AdministrativeArea', name: job.location } : undefined,
    jobLocation: !remote && job.location ? { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: job.location } } : undefined,
    skills: [...(job.primary_skills || []), ...(job.secondary_skills || [])].filter(Boolean).join(', ') || undefined,
    experienceRequirements: job.experience_required || undefined,
    educationRequirements: education || undefined,
    responsibilities: responsibilities || undefined,
    qualifications: qualifications || undefined,
    industry: job.department || undefined,
    directApply: Boolean(job.apply_url),
    url: seo.canonical,
  }
  return compact(schema)
}

export function relatedJobsFor(job, jobs = [], limit = 3) {
  const skills = new Set((job.primary_skills || []).map((skill) => String(skill).toLowerCase()))
  return jobs
    .filter((candidate) => candidate.id !== job.id)
    .map((candidate) => ({
      candidate,
      score: candidate.categories.filter((category) => job.categories.includes(category)).length * 5
        + (candidate.primary_skills || []).filter((skill) => skills.has(String(skill).toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

function normalizeEmploymentType(value) {
  const text = String(value || '').trim().toLowerCase()
  if (!text) return undefined
  if (text.includes('full')) return 'FULL_TIME'
  if (text.includes('part')) return 'PART_TIME'
  if (text.includes('contract')) return 'CONTRACTOR'
  if (text.includes('intern')) return 'INTERN'
  if (text.includes('temporary')) return 'TEMPORARY'
  return String(value).trim()
}

function extractSection(description, headings, nextHeadings) {
  const text = String(description || '').replace(/\r/g, '')
  if (!text) return undefined
  const start = headings.map((heading) => ({ heading, index: text.toLowerCase().indexOf(heading) })).filter((item) => item.index >= 0).sort((a, b) => a.index - b.index)[0]
  if (!start) return undefined
  const contentStart = start.index + start.heading.length
  const tail = text.slice(contentStart)
  const endIndexes = nextHeadings.map((heading) => tail.toLowerCase().indexOf(heading)).filter((index) => index > 0)
  const section = tail.slice(0, endIndexes.length ? Math.min(...endIndexes) : undefined).replace(/^\s*[:—-]?\s*/, '').trim()
  return section || undefined
}

function validDate(value) {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

function safeHttpUrl(value) {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}

function compact(value) {
  if (Array.isArray(value)) return value.map(compact).filter((item) => item !== undefined)
  if (!value || typeof value !== 'object') return value === '' || value === null || value === undefined ? undefined : value
  const output = {}
  for (const [key, child] of Object.entries(value)) {
    const cleaned = compact(child)
    if (cleaned !== undefined && (!Array.isArray(cleaned) || cleaned.length)) output[key] = cleaned
  }
  return output
}
