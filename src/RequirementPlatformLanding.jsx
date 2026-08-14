import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, CheckCircle2, Globe2, Network, SearchCheck, ShieldCheck, Sparkles, UserRoundCheck, UsersRound, Workflow } from 'lucide-react'
import './RequirementPlatformLanding.css'

// Keep Requirement Platform access separate from the existing screening app.
// Until its isolated app is deployed, all access requests stay on the public site.
const platformHref = (intent) => `/contact/?interest=requirement-platform&intent=${encodeURIComponent(intent)}`

const actions = [
  ['Request Marketplace Access', platformHref('marketplace-access'), SearchCheck],
  ['Find Recruiters & HR', platformHref('find-professionals'), UsersRound],
  ['Request Vendor Access', platformHref('vendor-access'), BriefcaseBusiness],
  ['Join as Sourcing Partner', platformHref('sourcing-partner'), UserRoundCheck],
]

const participants = [
  ['Vendor / Company', 'Post verified recruitment requirements, review interested professionals, invite sourcing partners, and manage candidate submissions.', Building2],
  ['Recruiter', 'Receive requirements aligned with your markets, industries, specializations, experience, and current availability.', SearchCheck],
  ['HR Professional', 'Build a professional HR profile and optionally make yourself available for recruitment or sourcing projects.', UserRoundCheck],
  ['Recruitment Agency', 'Represent an approved agency, discover requirements, and collaborate through controlled sourcing assignments.', Network],
]

export function RequirementPlatformLanding({ SEO }) {
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
              <a className="rpLandingPrimary" href={platformHref('marketplace-access')}>Request Marketplace Access <ArrowRight size={18} /></a>
              <a className="rpLandingSecondary" href={platformHref('find-professionals')}>Find Recruiters &amp; HR</a>
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
          <div className="rpLandingRoleGrid">{participants.map(([title, text, Icon]) => <article key={title}><span><Icon size={21} /></span><h3>{title}</h3><p>{text}</p><a href={platformHref(`profile-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}>Request access <ArrowRight size={15} /></a></article>)}</div>
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
          <div className="rpLandingSectionHead"><span>Choose your next step</span><h2>Request access to the verified recruitment network</h2><p>The Requirement Platform is being deployed separately from HireScoreAI's existing screening app. Send your access request and our team will guide you through onboarding.</p></div>
          <div className="rpLandingActionGrid">{actions.map(([label, href, Icon]) => <a href={href} key={label}><Icon size={22} /><span>{label}</span><ArrowRight size={17} /></a>)}</div>
        </div>
      </section>
    </div>
  )
}
