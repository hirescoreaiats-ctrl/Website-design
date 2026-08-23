import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Code2,
  ExternalLink,
  MapPin,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import './RequirementPlatformLanding.css'
import { JOB_CATEGORIES, preparePublicJobs } from './jobSeo.js'

export function RequirementPlatformLanding({ SEO }) {
  const seededRequirements = preparePublicJobs(Array.isArray(window.__PUBLIC_JOBS__) ? window.__PUBLIC_JOBS__ : [])
  const [requirements, setRequirements] = useState(seededRequirements)
  const [requirementsState, setRequirementsState] = useState(seededRequirements.length ? 'ready' : 'loading')
  const focusedJobId = new URLSearchParams(window.location.search).get('job_id')
  const submissionStatus = new URLSearchParams(window.location.search).get('submission')
  const roleCount = requirements.length

  useEffect(() => {
    const controller = new AbortController()
    const query = new URLSearchParams({ limit: '60' })
    if (focusedJobId) query.set('job_id', focusedJobId)

    fetch(`/api/sourcing-requests?${query}`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(payload.message || 'Could not load requirements')
        setRequirements(preparePublicJobs(Array.isArray(payload.results) ? payload.results : []))
        setRequirementsState('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setRequirementsState(seededRequirements.length ? 'ready' : 'error')
        }
      })

    return () => controller.abort()
  }, [focusedJobId])

  return (
    <div className="requirementsPage">
      <SEO path="/requirement-platform" schemaHeadline="Active IT & Non-IT Jobs & Recruitment Requirements" />

      <section className="requirementsHero">
        <div className="container requirementsHeroInner">
          <div>
            <span className="requirementsEyebrow"><Sparkles size={15} /> Jobs and recruitment marketplace</span>
            <h1>Active IT &amp; Non-IT Jobs &amp; <span>Recruitment Requirements</span></h1>
            <p>HireScoreAI connects candidates, recruitment vendors, staffing vendors, hiring partners, and recruitment sourcing partners in one transparent marketplace. Explore latest job openings and active job requirements across software, engineering, BPO, sales, operations, fresher roles, and other IT and Non-IT hiring needs.</p>
            <div className="requirementsHeroActions">
              <a href="/request-candidate-sourcing/">Submit a requirement <ArrowRight size={16} /></a>
              <small>Vendors can submit complete role details. Admin approval is required before publishing.</small>
            </div>
          </div>
          <aside className="requirementsSummary" aria-label="Requirement feed summary">
            <span><i /> Live feed</span>
            <strong>{requirementsState === 'ready' ? roleCount : '—'}</strong>
            <p>{roleCount === 1 ? 'active requirement' : 'active requirements'}</p>
            <small>Only sourcing-enabled roles are published here.</small>
          </aside>
        </div>
      </section>

      <section className="requirementsAudience" aria-label="Jobs, vendors, and sourcing partners">
        <div className="container">
          <div className="requirementsAudienceGrid">
            <article>
              <span><BriefcaseBusiness size={21} /></span>
              <h2>Find IT &amp; Non-IT Jobs</h2>
              <p>Candidates can discover software development, data, AI and ML, cloud, DevOps, QA, engineering, embedded and firmware, BPO, customer support, sales, operations, back office, and other active roles.</p>
              <a href="#active-jobs">Browse Jobs <ArrowRight size={16} /></a>
            </article>
            <article>
              <span><Building2 size={21} /></span>
              <h2>Post Active Recruitment Requirements</h2>
              <p>Recruitment agencies, staffing companies, hiring vendors, and employers can publish complete staffing requirements and connect with candidate sourcing partners after admin approval.</p>
              <a href="/request-candidate-sourcing/">Post a Requirement <ArrowRight size={16} /></a>
            </article>
            <article>
              <span><UsersRound size={21} /></span>
              <h2>Find Requirements &amp; Submit Candidates</h2>
              <p>Independent recruiters and sourcing partners can browse active recruitment requirements, understand vendor requirements, and use the approved candidate submission or application path.</p>
              <a href="/sourcing-partners/">Explore Requirements <ArrowRight size={16} /></a>
            </article>
          </div>
          <nav className="requirementsCategoryLinks" aria-label="Job categories">
            {JOB_CATEGORIES.map((category) => <a href={`/jobs/${category.slug}/`} key={category.slug}>{category.label}</a>)}
            <a href="/recruitment-vendors/">For recruitment vendors</a>
            <a href="/active-recruitment-requirements/">For sourcing partners</a>
          </nav>
        </div>
      </section>

      <section className="requirementsFeed" id="active-jobs" aria-label="Active recruitment requirements">
        <div className="container">
          {submissionStatus === 'pending' && (
            <div className="requirementsPending" role="status">
              <Clock3 size={22} />
              <div><strong>Requirement submitted for approval</strong><p>The complete request has been sent to HireScoreAI. It will appear publicly only after admin approval.</p></div>
            </div>
          )}
          {requirementsState === 'loading' && (
            <div className="requirementsState" role="status">
              <span className="requirementsLoader" />
              <strong>Loading active requirements</strong>
              <p>Please wait while we fetch the latest roles.</p>
            </div>
          )}

          {requirementsState === 'error' && (
            <div className="requirementsState requirementsStateError" role="alert">
              <BriefcaseBusiness size={24} />
              <strong>Requirements are temporarily unavailable</strong>
              <p>Please refresh this page or contact info@hirescoreai.com.</p>
            </div>
          )}

          {requirementsState === 'ready' && requirements.length === 0 && submissionStatus !== 'pending' && (
            <div className="requirementsState">
              <BriefcaseBusiness size={24} />
              <strong>No active requirements right now</strong>
              <p>Please check again soon for new hiring opportunities.</p>
            </div>
          )}

          {requirementsState === 'ready' && requirements.length > 0 && (
            <>
              <div className="requirementsFeedHeader">
                <div><span>Open positions</span><strong>{requirements.length} {requirements.length === 1 ? 'role' : 'roles'} available</strong></div>
                <small>Most recently published first</small>
              </div>
              <div className="requirementsGrid">
              {requirements.map((item) => (
                <article
                  key={item.id}
                  className={`requirementCard${item.id === focusedJobId ? ' isFocused' : ''}`}
                >
                  <div className="requirementCardHeader">
                    <div className="requirementCompany">
                      <span className="requirementIcon"><Building2 size={21} /></span>
                      <div>
                        <small>Hiring company</small>
                        <strong>{item.company_name || 'Company details available'}</strong>
                        {item.company_website && <a href={item.company_website} target="_blank" rel="noopener noreferrer">Visit website <ExternalLink size={12} /></a>}
                      </div>
                    </div>
                    <div className="requirementStatusGroup">
                      {item.published_at && <small>Published {formatDate(item.published_at)}</small>}
                      <span className="requirementLive"><i /> Active</span>
                    </div>
                  </div>

                  <div className="requirementCardBody">
                    <div className="requirementCardMain">
                      <span className="requirementDepartment">{item.department || 'Open role'}</span>
                      <h2><a href={`${item.canonical_path}/`}>{item.title}</a></h2>

                      <div className="requirementMeta">
                        {(item.location || item.work_mode) && <span><MapPin size={16} />{[item.location, item.work_mode].filter(Boolean).join(' · ')}</span>}
                        <span><BriefcaseBusiness size={16} />{item.employment_type || 'Employment type in JD'}</span>
                        <span><Clock3 size={16} />{item.experience_required || 'Experience shared in JD'}</span>
                      </div>

                      {item.description && <p className="requirementDescription">{descriptionPreview(item.description)}</p>}

                      {(item.primary_skills || []).length > 0 && (
                        <section className="requirementSkillSection">
                          <h3><Code2 size={15} /> Required skills</h3>
                          <div className="requirementSkills">
                            {(item.primary_skills || []).slice(0, 10).map((skill) => <span key={skill}>{skill}</span>)}
                            {(item.primary_skills || []).length > 10 && <span>+{item.primary_skills.length - 10} more</span>}
                          </div>
                        </section>
                      )}

                      {(item.secondary_skills || []).length > 0 && (
                        <section className="requirementSkillSection isPreferred">
                          <h3><Sparkles size={15} /> Good to have</h3>
                          <div className="requirementSkills">
                            {(item.secondary_skills || []).slice(0, 7).map((skill) => <span key={skill}>{skill}</span>)}
                          </div>
                        </section>
                      )}
                    </div>

                    <aside className="requirementFacts">
                      <h3>Role overview</h3>
                      <div><span><CircleDollarSign size={16} /> Compensation</span><strong>{item.salary_range || 'Shared during process'}</strong></div>
                      <div><span><UsersRound size={16} /> Experience</span><strong>{item.experience_required || 'See job description'}</strong></div>
                      <div><span><BriefcaseBusiness size={16} /> Work type</span><strong>{[item.employment_type, item.work_mode].filter(Boolean).join(' · ') || 'See job description'}</strong></div>
                      <div><span><CalendarClock size={16} /> Apply by</span><strong>{item.application_deadline ? formatDate(item.application_deadline) : 'Open until filled'}</strong></div>
                      {item.apply_url ? <a href={item.apply_url}>Apply for this role <ArrowRight size={16} /></a> : <small>Application link unavailable</small>}
                      <a className="requirementDetailsLink" href={`${item.canonical_path}/`}>View full job details</a>
                    </aside>
                  </div>

                  {item.description && (
                    <details className="requirementFullDescription">
                      <summary>View complete job description <ChevronDown size={17} /></summary>
                      <div>{item.description}</div>
                    </details>
                  )}
                </article>
              ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

function descriptionPreview(value) {
  const text = String(value || '').replace(/\r/g, '')
  const about = text.split(/about the role/i)[1]
  const useful = (about || text)
    .split(/key responsibilities|required skills|responsibilities/i)[0]
    .replace(/^(?:\s*[:—-]?\s*)/, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!useful) return 'Review the complete job description below for responsibilities, qualifications, and application details.'
  return useful.length > 420 ? `${useful.slice(0, 417).trimEnd()}…` : useful
}
