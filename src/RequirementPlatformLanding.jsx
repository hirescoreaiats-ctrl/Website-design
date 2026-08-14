import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, CheckCircle2, Globe2, Network, SearchCheck, ShieldCheck, Sparkles, UserRoundCheck, UsersRound, Workflow } from 'lucide-react'
import './RequirementPlatformLanding.css'

// Requirement Platform lives on the public-site deployment and stays isolated
// from the existing screening application hosted at app.hirescoreai.com.
const platformHref = (view) => `/requirement-platform/?view=${encodeURIComponent(view)}`

const actions = [
  ['Explore Requirements', platformHref('requirements'), SearchCheck],
  ['Find Recruiters & HR', platformHref('professionals'), UsersRound],
  ['Post a Requirement', platformHref('post-requirement'), BriefcaseBusiness],
  ['Join as Sourcing Partner', platformHref('join'), UserRoundCheck],
]

const participants = [
  ['Vendor / Company', 'Post verified recruitment requirements, review interested professionals, invite sourcing partners, and manage candidate submissions.', Building2],
  ['Recruiter', 'Receive requirements aligned with your markets, industries, specializations, experience, and current availability.', SearchCheck],
  ['HR Professional', 'Build a professional HR profile and optionally make yourself available for recruitment or sourcing projects.', UserRoundCheck],
  ['Recruitment Agency', 'Represent an approved agency, discover requirements, and collaborate through controlled sourcing assignments.', Network],
]

export function RequirementPlatformLanding({ SEO }) {
  const activeView = new URLSearchParams(window.location.search).get('view')
  if (['requirements', 'professionals', 'post-requirement', 'join'].includes(activeView)) {
    return <RequirementMarketplace SEO={SEO} activeView={activeView} />
  }

  return (
    <div className="rpLanding">
      <SEO path="/requirement-platform" schemaHeadline="A verified recruitment collaboration network" />
      <section className="rpLandingHero">
        <div className="container rpLandingHeroGrid">
          <div className="rpLandingHeroCopy">
            <span className="rpLandingEyebrow"><ShieldCheck size={15} /> Verified recruitment collaboration</span>
            <h1>Vendor Requirements <em>meet</em> Verified Recruiters &amp; HR</h1>
            <p>HireScoreAI Requirement Platform connects genuine recruitment requirements with verified sourcing professionals—and gives both sides one focused workspace to collaborate securely.</p>
            <div className="rpLandingActions">
              <a className="rpLandingPrimary" href={platformHref('requirements')}>Explore Requirements <ArrowRight size={18} /></a>
              <a className="rpLandingSecondary" href={platformHref('professionals')}>Find Recruiters &amp; HR</a>
            </div>
            <div className="rpLandingTrustLine"><BadgeCheck size={18} /><span>Marketplace access requires profile review and approval. Profile completion alone does not create a verified account.</span></div>
          </div>
          <div className="rpLandingNetwork" aria-label="Requirement Platform collaboration flow">
            <div className="rpNetworkCore"><Sparkles size={25} /><strong>Requirement<br />Platform</strong><small>Verified network</small></div>
            <div className="rpNetworkNode nodeVendor"><Building2 size={20} /><span><strong>Vendor</strong><small>Posts requirement</small></span></div>
            <div className="rpNetworkNode nodeRecruiter"><UsersRound size={20} /><span><strong>Verified Partner</strong><small>Requests to source</small></span></div>
            <div className="rpNetworkNode nodeAssignment"><Workflow size={20} /><span><strong>Assignment</strong><small>Controlled access</small></span></div>
            <div className="rpNetworkNode nodeCandidate"><BriefcaseBusiness size={20} /><span><strong>Candidate</strong><small>Private submission</small></span></div>
            <i className="rpNetworkOrbit orbitOne" /><i className="rpNetworkOrbit orbitTwo" />
          </div>
        </div>
      </section>

      <section className="rpLandingSection rpLandingIntro">
        <div className="container">
          <div className="rpLandingSectionHead"><span>Two-sided marketplace</span><h2>Find the right recruitment collaboration without becoming a public job board</h2><p>Requirements are matched to verified professionals, while vendors receive recommended sourcing partners for every role.</p></div>
          <div className="rpLandingFeatureGrid">
            <article><BriefcaseBusiness size={25} /><h3>Post real requirements</h3><p>Verified vendors and companies publish structured recruitment requirements with controlled visibility.</p></article>
            <article><SearchCheck size={25} /><h3>Receive relevant work</h3><p>Recruiters and eligible HR professionals see opportunities that match their specialization and availability.</p></article>
            <article><UsersRound size={25} /><h3>Discover sourcing partners</h3><p>Vendors receive transparent partner recommendations with match reasons and credibility signals.</p></article>
            <article><Workflow size={25} /><h3>Collaborate in one workspace</h3><p>Invitations, source requests, assignments, and standalone candidate submissions remain connected.</p></article>
          </div>
        </div>
      </section>

      <section className="rpLandingSection rpLandingRoles">
        <div className="container">
          <div className="rpLandingSectionHead"><span>Professional account types</span><h2>One account system, role-aware capabilities</h2><p>Different professional details and permissions—without four disconnected user systems.</p></div>
          <div className="rpLandingRoleGrid">{participants.map(([title, text, Icon]) => <article key={title}><span><Icon size={21} /></span><h3>{title}</h3><p>{text}</p><a href={platformHref(title === 'Vendor / Company' ? 'post-requirement' : 'join')}>Create profile <ArrowRight size={15} /></a></article>)}</div>
        </div>
      </section>

      <section className="rpLandingSection rpLandingSafety">
        <div className="container rpLandingSafetyGrid">
          <div><span className="rpLandingEyebrow"><ShieldCheck size={15} /> Trust before access</span><h2>Professional verification is part of the product—not a decorative badge</h2><p>Every marketplace participant completes a detailed profile, verifies contact information, and goes through admin review before full access.</p><ul>{['Email and phone verification indicators', 'Professional, employment, company, or agency review', 'Private evidence with restricted admin access', 'Credibility-focused Trust Score', 'Reporting, moderation, suspension, and audit history'].map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></div>
          <div className="rpVerificationCard"><header><div className="rpVerifyAvatar">RS</div><span><strong>Rahul Sharma</strong><small>US IT Recruiter</small></span><BadgeCheck size={24} /></header><div className="rpVerifyBadges"><span><CheckCircle2 size={15} />Email Verified</span><span><CheckCircle2 size={15} />Phone Verified</span><span><CheckCircle2 size={15} />Professional Verified</span></div><div className="rpTrustMeter"><span>Trust Score</span><strong>94<small>/100</small></strong><i><b /></i></div><p>Trust represents credibility and verification—not sourcing performance.</p></div>
        </div>
      </section>

      <section className="rpLandingSection rpLandingFlow">
        <div className="container">
          <div className="rpLandingSectionHead"><span>Focused workflow</span><h2>From requirement to authorized candidate submission</h2></div>
          <div className="rpFlowSteps">{[['01', 'Requirement posted', 'A verified vendor publishes a structured public, invite-only, or private-network requirement.'], ['02', 'Two-sided matching', 'Relevant professionals receive the requirement while the vendor receives recommended sourcing partners.'], ['03', 'Request or invitation', 'The vendor reviews interest or directly invites a verified professional before work begins.'], ['04', 'Active assignment', 'Only an accepted and active sourcing assignment allows standalone candidate submission.']].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="rpLandingSection rpLandingActionSection">
        <div className="container">
          <div className="rpLandingSectionHead"><span>Choose your next step</span><h2>Open the verified recruitment network</h2><p>Explore the dedicated marketplace experience without entering HireScoreAI's existing resume-screening application.</p></div>
          <div className="rpLandingActionGrid">{actions.map(([label, href, Icon]) => <a href={href} key={label}><Icon size={22} /><span>{label}</span><ArrowRight size={17} /></a>)}</div>
        </div>
      </section>
    </div>
  )
}

const requirementPreviews = [
  ['Senior Backend Engineer', 'Bengaluru · Hybrid', '5–8 years', ['Python', 'FastAPI', 'AWS']],
  ['US IT Recruiter', 'Remote · India', '3–6 years', ['US Staffing', 'W2', 'Boolean Search']],
  ['Salesforce Developer', 'Pune · Hybrid', '4–7 years', ['Apex', 'LWC', 'Integrations']],
]

const professionalPreviews = [
  ['RS', 'Rahul Sharma', 'US IT Recruitment', '8 years experience'],
  ['AM', 'Ananya Mehta', 'Technology Hiring', '6 years experience'],
  ['VK', 'Vikram Kumar', 'Salesforce Staffing', '9 years experience'],
]

function RequirementMarketplace({ SEO, activeView }) {
  const isRequirements = activeView === 'requirements'
  const isProfessionals = activeView === 'professionals'
  const isAccess = activeView === 'post-requirement' || activeView === 'join'
  return (
    <div className="rpMarketplace">
      <SEO path="/requirement-platform" schemaHeadline="HireScoreAI Requirement Platform marketplace" />
      <header className="rpMarketplaceTopbar">
        <a href="/requirement-platform/" className="rpMarketplaceBrand"><Network size={22} /><span>Requirement <strong>Platform</strong></span></a>
        <span className="rpMarketplaceIsolation"><ShieldCheck size={15} /> Separate from Resume Screening</span>
        <a href="/requirement-platform/" className="rpMarketplaceBack">Platform overview</a>
      </header>
      <div className="rpMarketplaceLayout">
        <aside className="rpMarketplaceSidebar">
          <small>MARKETPLACE</small>
          <a className={isRequirements ? 'active' : ''} href={platformHref('requirements')}><BriefcaseBusiness size={18} /> Requirements</a>
          <a className={isProfessionals ? 'active' : ''} href={platformHref('professionals')}><UsersRound size={18} /> Recruiters &amp; HR</a>
          <small>PARTICIPATE</small>
          <a className={activeView === 'post-requirement' ? 'active' : ''} href={platformHref('post-requirement')}><Building2 size={18} /> Post requirement</a>
          <a className={activeView === 'join' ? 'active' : ''} href={platformHref('join')}><UserRoundCheck size={18} /> Join network</a>
        </aside>
        <main className="rpMarketplaceMain">
          {isRequirements && <>
            <div className="rpMarketplaceHeading"><div><span>PUBLIC MARKETPLACE PREVIEW</span><h1>Recruitment Requirements</h1><p>Discover structured requirements published for verified sourcing professionals.</p></div><a href={platformHref('post-requirement')}>Post a Requirement <ArrowRight size={16} /></a></div>
            <div className="rpMarketplaceNotice"><Sparkles size={18} /><span><strong>Preview listings</strong> — Live requirements will appear here after vendor verification and the isolated marketplace backend launch.</span></div>
            <div className="rpMarketplaceCards">{requirementPreviews.map(([role, location, experience, skills]) => <article key={role}><div className="rpMarketplaceCardTop"><span><BriefcaseBusiness size={20} /></span><small>PREVIEW</small></div><h2>{role}</h2><p>{location}</p><p>{experience}</p><div>{skills.map((skill) => <i key={skill}>{skill}</i>)}</div><button disabled>Verification required</button></article>)}</div>
          </>}
          {isProfessionals && <>
            <div className="rpMarketplaceHeading"><div><span>VERIFIED NETWORK PREVIEW</span><h1>Recruiters &amp; HR Professionals</h1><p>Find sourcing professionals by specialization, market, experience, and availability.</p></div><a href={platformHref('join')}>Join the Network <ArrowRight size={16} /></a></div>
            <div className="rpMarketplaceNotice"><BadgeCheck size={18} /><span><strong>Preview profiles</strong> — Public professional discovery activates after identity and professional verification workflows go live.</span></div>
            <div className="rpProfessionalCards">{professionalPreviews.map(([initials, name, focus, experience]) => <article key={name}><div>{initials}</div><BadgeCheck size={20} /><h2>{name}</h2><p>{focus}</p><small>{experience}</small><span>Preview profile</span></article>)}</div>
          </>}
          {isAccess && <div className="rpAccessPanel"><span><ShieldCheck size={27} /></span><small>ISOLATED MARKETPLACE ONBOARDING</small><h1>{activeView === 'post-requirement' ? 'Vendor Requirement Access' : 'Recruiter & HR Network Access'}</h1><p>This workspace is separate from the existing HireScoreAI screening application. Account creation will open here when the dedicated marketplace deployment and verification service are connected.</p><div><CheckCircle2 size={18} /> No redirect to the screening app</div><div><CheckCircle2 size={18} /> Independent professional verification</div><div><CheckCircle2 size={18} /> Controlled marketplace access</div><a href="mailto:info@hirescoreai.com?subject=Requirement%20Platform%20Early%20Access">Request early access <ArrowRight size={17} /></a></div>}
        </main>
      </div>
    </div>
  )
}
