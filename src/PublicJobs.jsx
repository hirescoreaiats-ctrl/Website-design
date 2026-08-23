import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Building2, CalendarClock, CheckCircle2, CircleDollarSign, Clock3, Code2, MapPin, Network, Send, Sparkles, UsersRound } from 'lucide-react'
import { buildJobPostingSchema, buildJobSeo, categoryBySlug, JOB_CATEGORIES, preparePublicJobs, relatedJobsFor } from './jobSeo.js'
import './PublicJobs.css'

const SITE_URL = 'https://hirescoreai.com'

function initialJobs() {
  return preparePublicJobs(Array.isArray(window.__PUBLIC_JOBS__) ? window.__PUBLIC_JOBS__ : [])
}

function usePublicJobs() {
  const [jobs, setJobs] = useState(initialJobs)
  const [state, setState] = useState(jobs.length ? 'ready' : 'loading')

  useEffect(() => {
    if (jobs.length) return undefined
    const controller = new AbortController()
    fetch('/api/sourcing-requests?limit=100', { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(payload.message || 'Could not load public jobs')
        setJobs(preparePublicJobs(payload.results || []))
        setState('ready')
      })
      .catch((error) => { if (error.name !== 'AbortError') setState('error') })
    return () => controller.abort()
  }, [])

  return { jobs, state }
}

export function PublicJobPage({ slug }) {
  const seededJob = window.__PUBLIC_JOB__?.seo_slug === slug ? window.__PUBLIC_JOB__ : null
  const { jobs, state } = usePublicJobs()
  const job = seededJob || jobs.find((item) => item.seo_slug === slug)
  const related = useMemo(() => job ? relatedJobsFor(job, jobs) : [], [job, jobs])

  useEffect(() => {
    if (job) updateDynamicJobSeo(job)
    else if (state === 'ready') updateUnavailableJobSeo()
  }, [job, state])

  if (!job && state === 'loading') return <JobLoading />
  if (!job) return <ClosedJob />

  const seo = buildJobSeo(job)
  return (
    <div className="publicJobsPage">
      <section className="jobDetailHero">
        <div className="container jobDetailHeroInner">
          <div>
            <nav className="jobBreadcrumb" aria-label="Breadcrumb">
              <a href="/requirement-platform/">Recruitment requirements</a><span>/</span><span>{job.title}</span>
            </nav>
            <span className="jobsEyebrow"><Sparkles size={15} /> Active job opportunity</span>
            <h1>{job.title}{job.location ? ` Jobs in ${job.location}` : ''}</h1>
            <p>{job.company_name ? `${job.company_name} is hiring for this role.` : 'An active hiring team is recruiting for this role.'} Review the complete requirement and apply through the official application link.</p>
            <div className="jobHeroMeta">
              {job.location && <span><MapPin size={17} />{job.location}{job.work_mode ? ` · ${job.work_mode}` : ''}</span>}
              {job.experience_required && <span><Clock3 size={17} />{job.experience_required}</span>}
              {job.employment_type && <span><BriefcaseBusiness size={17} />{job.employment_type}</span>}
            </div>
          </div>
          <aside className="jobApplyCard">
            <span>Active requirement</span>
            <strong>{job.salary_range || 'Compensation shared during process'}</strong>
            {job.application_deadline && <small>Apply by {formatDate(job.application_deadline)}</small>}
            {job.apply_url ? <a href={job.apply_url}>Apply for this job <ArrowRight size={17} /></a> : <small>Application link is currently unavailable.</small>}
          </aside>
        </div>
      </section>

      <section className="jobDetailBody">
        <div className="container jobDetailGrid">
          <article className="jobDescriptionCard">
            <div className="jobCompanyLine"><Building2 size={20} /><div><small>Hiring organization</small><strong>{job.company_name || 'Company details available during the process'}</strong>{job.company_website && <a href={job.company_website} target="_blank" rel="noopener noreferrer">Company website</a>}</div></div>
            <h2>Job description</h2>
            <div className="jobDescriptionText">{job.description}</div>
          </article>
          <aside className="jobFactsCard">
            <h2>Role overview</h2>
            <Fact icon={MapPin} label="Location" value={[job.location, job.work_mode].filter(Boolean).join(' · ')} />
            <Fact icon={Clock3} label="Experience" value={job.experience_required} />
            <Fact icon={BriefcaseBusiness} label="Employment" value={job.employment_type} />
            <Fact icon={CircleDollarSign} label="Compensation" value={job.salary_range} />
            <Fact icon={CalendarClock} label="Published" value={job.published_at ? formatDate(job.published_at) : null} />
            {(job.primary_skills || []).length > 0 && <div className="jobSkills"><span><Code2 size={15} /> Required skills</span><div>{job.primary_skills.map((skill) => <b key={skill}>{skill}</b>)}</div></div>}
          </aside>
        </div>
      </section>

      <section className="relatedJobsSection">
        <div className="container">
          <div className="jobsSectionHeading"><div><span>Continue exploring</span><h2>Related active jobs</h2></div><a href="/requirement-platform/">Browse all active job requirements <ArrowRight size={16} /></a></div>
          {related.length ? <div className="publicJobGrid">{related.map((item) => <PublicJobCard job={item} key={item.id} />)}</div> : <p className="jobsEmpty">New matching jobs will appear here after approval.</p>}
          <p className="jobCanonicalNote">Canonical job page: <a href={seo.canonical}>{seo.canonical}</a></p>
        </div>
      </section>
    </div>
  )
}

export function JobCategoryPage({ slug, SEO }) {
  const category = categoryBySlug(slug)
  const { jobs, state } = usePublicJobs()
  const matching = category ? jobs.filter((job) => job.categories.includes(category.slug)) : []
  if (!category) return <ClosedJob />
  return (
    <div className="publicJobsPage">
      <SEO path={`/jobs/${category.slug}`} schemaHeadline={category.heading} />
      <section className="jobsLandingHero"><div className="container"><span className="jobsEyebrow"><BriefcaseBusiness size={15} /> HireScoreAI job marketplace</span><h1>{category.heading}</h1><p>{category.intro} Every listing below is an active, public requirement approved for candidate sourcing.</p><div className="jobsHeroLinks"><a href="/requirement-platform/">Browse all jobs <ArrowRight size={16} /></a><a href="/sourcing-partners/">Become a sourcing partner</a></div></div></section>
      <section className="jobsListingSection"><div className="container"><div className="jobsSectionHeading"><div><span>Current openings</span><h2>{category.label} on HireScoreAI</h2></div><small>{matching.length} active {matching.length === 1 ? 'job' : 'jobs'}</small></div>{state === 'error' ? <p className="jobsEmpty">Jobs are temporarily unavailable. Please try again shortly.</p> : matching.length ? <div className="publicJobGrid">{matching.map((job) => <PublicJobCard job={job} key={job.id} />)}</div> : <p className="jobsEmpty">No approved openings in this category right now. Browse all active requirements for other opportunities.</p>}</div></section>
      <CategoryLinks current={category.slug} />
    </div>
  )
}

export function RecruitmentVendorsPage({ SEO }) {
  return <PartnerLanding type="vendors" SEO={SEO} />
}

export function SourcingPartnersPage({ SEO }) {
  return <PartnerLanding type="partners" SEO={SEO} />
}

export function ActiveRequirementsPage({ SEO }) {
  return <PartnerLanding type="requirements" SEO={SEO} />
}

function PartnerLanding({ type, SEO }) {
  const content = {
    vendors: {
      path: '/recruitment-vendors', eyebrow: 'For recruitment vendors and employers', heading: 'Post Recruitment Requirements & Find Sourcing Partners',
      intro: 'HireScoreAI gives recruitment agencies, staffing vendors, employers, and hiring partners a structured way to publish active recruitment requirements and connect with relevant sourcing partners.',
      bullets: ['Share complete role, location, experience, skills, and application details.', 'Keep every vendor requirement pending until HireScoreAI admin approval.', 'Reach sourcing partners without exposing private ATS or recruiter data.'],
      primary: ['/request-candidate-sourcing/', 'Post a recruitment requirement'], secondary: ['/requirement-platform/', 'View the recruitment marketplace'],
    },
    partners: {
      path: '/sourcing-partners', eyebrow: 'For independent recruiters and sourcing teams', heading: 'Find Active Requirements & Submit Relevant Candidates',
      intro: 'Sourcing partners can discover approved staffing requirements, understand the role before outreach, and use the official application or candidate-submission path provided for each opportunity.',
      bullets: ['Browse active recruitment requirements by role, category, and location.', 'Review required skills, experience, compensation, and deadlines.', 'Submit candidates only against public, approved requirements.'],
      primary: ['/requirement-platform/', 'Explore active requirements'], secondary: ['/jobs/it-jobs/', 'Browse IT jobs'],
    },
    requirements: {
      path: '/active-recruitment-requirements', eyebrow: 'Live recruitment marketplace', heading: 'Active Recruitment Requirements for Hiring & Sourcing Partners',
      intro: 'Explore current staffing requirements shared by approved hiring teams. Candidates can apply to suitable jobs while recruitment sourcing partners can identify relevant roles for candidate submission.',
      bullets: ['IT, Non-IT, engineering, BPO, sales, and operations requirements.', 'Clear role details with official application links where available.', 'Closed, private, pending, and deactivated requirements remain excluded.'],
      primary: ['/requirement-platform/', 'Browse active recruitment requirements'], secondary: ['/recruitment-vendors/', 'Information for recruitment vendors'],
    },
  }[type]
  return (
    <div className="publicJobsPage partnerLanding">
      <SEO path={content.path} schemaHeadline={content.heading} />
      <section className="partnerHero"><div className="container partnerHeroGrid"><div><span className="jobsEyebrow"><Network size={15} />{content.eyebrow}</span><h1>{content.heading}</h1><p>{content.intro}</p><div className="partnerActions"><a href={content.primary[0]}>{content.primary[1]} <ArrowRight size={16} /></a><a href={content.secondary[0]}>{content.secondary[1]}</a></div></div><aside><UsersRound size={30} /><strong>Structured recruitment collaboration</strong><small>Public listings, clear role evidence, admin approval, and protected internal data.</small></aside></div></section>
      <section className="partnerBenefits"><div className="container"><div className="partnerBenefitGrid">{content.bullets.map((bullet) => <article key={bullet}><CheckCircle2 size={21} /><p>{bullet}</p></article>)}</div><div className="partnerExplanation"><h2>How the HireScoreAI recruitment marketplace works</h2><p>Hiring teams or recruitment vendors submit complete staffing requirements. HireScoreAI reviews each request before publication. Once approved, a public job page presents the role information candidates and sourcing partners need, while internal ATS data, recruiter controls, and private requirements remain protected.</p><div><a href="/jobs/engineering-jobs/">Engineering job requirements</a><a href="/jobs/bpo-jobs/">BPO job requirements</a><a href="/jobs/sales-jobs/">Sales job requirements</a></div></div></div></section>
    </div>
  )
}

export function PublicJobCard({ job }) {
  return <article className="publicJobCard"><header><span><BriefcaseBusiness size={19} /></span><small><i /> Active</small></header><h3><a href={`${job.canonical_path}/`}>{job.title}</a></h3><p>{job.company_name || 'Hiring company details available'}</p><div className="publicJobMeta">{job.location && <span><MapPin size={14} />{job.location}</span>}{job.experience_required && <span><Clock3 size={14} />{job.experience_required}</span>}</div><div className="publicJobSkills">{(job.primary_skills || []).slice(0, 5).map((skill) => <b key={skill}>{skill}</b>)}</div><footer><a href={`${job.canonical_path}/`}>View job details <ArrowRight size={15} /></a></footer></article>
}

function CategoryLinks({ current }) {
  return <section className="categoryLinks"><div className="container"><h2>Explore more job categories</h2><div>{JOB_CATEGORIES.filter((category) => category.slug !== current).map((category) => <a href={`/jobs/${category.slug}/`} key={category.slug}>{category.label}</a>)}</div></div></section>
}

function Fact({ icon: Icon, label, value }) {
  if (!value) return null
  return <div className="jobFact"><span><Icon size={16} />{label}</span><strong>{value}</strong></div>
}

function JobLoading() {
  return <section className="jobsState"><span /><h1>Loading job details</h1><p>Please wait while we verify this active requirement.</p></section>
}

function ClosedJob() {
  return <section className="jobsState isClosed"><BriefcaseBusiness size={30} /><h1>This position is no longer accepting applications.</h1><p>The role may have been closed, filled, expired, deactivated, or is not publicly available.</p><a href="/requirement-platform/">Browse active job requirements <ArrowRight size={16} /></a></section>
}

function updateDynamicJobSeo(job) {
  const seo = buildJobSeo(job)
  document.title = seo.title
  setMeta('description', seo.description)
  setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  setMeta('googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  setPropertyMeta('og:title', seo.title)
  setPropertyMeta('og:description', seo.description)
  setPropertyMeta('og:url', seo.canonical)
  setPropertyMeta('og:type', 'website')
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', seo.title)
  setMeta('twitter:description', seo.description)
  setCanonical(seo.canonical)
  setJobSchema(buildJobPostingSchema(job))
}

function updateUnavailableJobSeo() {
  document.title = 'Job No Longer Available | HireScoreAI'
  setMeta('description', 'This HireScoreAI job is no longer accepting applications. Browse current active recruitment requirements.')
  setMeta('robots', 'noindex, follow')
  document.getElementById('job-posting-schema')?.remove()
}

function setMeta(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`)
  if (!element) { element = document.createElement('meta'); element.setAttribute('name', name); document.head.appendChild(element) }
  element.setAttribute('content', content)
}

function setPropertyMeta(property, content) {
  let element = document.head.querySelector(`meta[property="${property}"]`)
  if (!element) { element = document.createElement('meta'); element.setAttribute('property', property); document.head.appendChild(element) }
  element.setAttribute('content', content)
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) { element = document.createElement('link'); element.setAttribute('rel', 'canonical'); document.head.appendChild(element) }
  element.setAttribute('href', href)
}

function setJobSchema(schema) {
  let element = document.getElementById('job-posting-schema')
  if (!element) { element = document.createElement('script'); element.id = 'job-posting-schema'; element.type = 'application/ld+json'; document.head.appendChild(element) }
  element.textContent = JSON.stringify({ '@context': 'https://schema.org', ...schema })
}

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}
