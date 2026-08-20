import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  MapPin,
  Sparkles,
} from 'lucide-react'
import './RequirementPlatformLanding.css'

export function RequirementPlatformLanding({ SEO }) {
  const [requirements, setRequirements] = useState([])
  const [requirementsState, setRequirementsState] = useState('loading')
  const focusedJobId = new URLSearchParams(window.location.search).get('job_id')

  useEffect(() => {
    const controller = new AbortController()
    const query = new URLSearchParams({ limit: '60' })
    if (focusedJobId) query.set('job_id', focusedJobId)

    fetch(`/api/sourcing-requests?${query}`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(payload.message || 'Could not load requirements')
        setRequirements(Array.isArray(payload.results) ? payload.results : [])
        setRequirementsState('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setRequirementsState('error')
      })

    return () => controller.abort()
  }, [focusedJobId])

  return (
    <div className="requirementsPage">
      <SEO path="/requirement-platform" schemaHeadline="Active recruitment requirements from HireScoreAI" />

      <section className="requirementsHero">
        <div className="container requirementsHeroInner">
          <span className="requirementsEyebrow"><Sparkles size={15} /> Live hiring opportunities</span>
          <h1>Recruitment <span>Requirements</span></h1>
          <p>Browse live, structured job requirements shared by hiring teams that have requested candidate sourcing through HireScoreAI. Review the role, location, experience expectations, employment type, and core skills in one clear view, then open the official application link when a position matches your profile.</p>
        </div>
      </section>

      <section className="requirementsFeed" aria-label="Active recruitment requirements">
        <div className="container">
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

          {requirementsState === 'ready' && requirements.length === 0 && (
            <div className="requirementsState">
              <BriefcaseBusiness size={24} />
              <strong>No active requirements right now</strong>
              <p>Please check again soon for new hiring opportunities.</p>
            </div>
          )}

          {requirementsState === 'ready' && requirements.length > 0 && (
            <div className="requirementsGrid">
              {requirements.map((item) => (
                <article
                  key={item.id}
                  className={`requirementCard${item.id === focusedJobId ? ' isFocused' : ''}`}
                >
                  <div className="requirementCardHeader">
                    <span className="requirementIcon"><BriefcaseBusiness size={21} /></span>
                    <span className="requirementLive"><i /> Active</span>
                  </div>

                  <h2>{item.title}</h2>

                  <div className="requirementMeta">
                    {item.company_name && <span><Building2 size={15} />{item.company_name}</span>}
                    {(item.location || item.work_mode) && (
                      <span><MapPin size={15} />{[item.location, item.work_mode].filter(Boolean).join(' · ')}</span>
                    )}
                    <span><CalendarClock size={15} />{item.experience_required || 'Experience shared in JD'}</span>
                  </div>

                  {(item.primary_skills || []).length > 0 && (
                    <div className="requirementSkills">
                      {(item.primary_skills || []).slice(0, 8).map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  )}

                  <div className="requirementCardFooter">
                    <span>{item.employment_type || 'Role details available'}</span>
                    {item.apply_url ? (
                      <a href={item.apply_url}>View &amp; Apply <ArrowRight size={16} /></a>
                    ) : (
                      <small>Apply link unavailable</small>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
