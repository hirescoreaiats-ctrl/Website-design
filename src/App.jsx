import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileSearch,
  Files,
  GitBranch,
  Globe2,
  GraduationCap,
  MailCheck,
  Menu,
  MessageSquareText,
  Network,
  PieChart,
  PlayCircle,
  Puzzle,
  Rocket,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TimerReset,
  Trophy,
  UsersRound,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import './App.css'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Features', href: '#features' },
  { label: 'Resources', href: '#resources' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const trustItems = [
  { icon: UsersRound, text: 'Built for recruiters' },
  { icon: BrainCircuit, text: 'AI scoring engine' },
  { icon: Zap, text: 'Faster shortlisting' },
  { icon: MessageSquareText, text: 'Explainable hiring decisions' },
  { icon: Workflow, text: 'End-to-end workflow' },
]

const problemCards = [
  {
    icon: Files,
    title: 'Too many resumes',
    text: 'High-volume roles bury recruiters in applications, making careful manual review slow and inconsistent.',
  },
  {
    icon: Target,
    title: 'Inconsistent shortlisting',
    text: 'Candidate decisions vary by reviewer, criteria, and time pressure, so strong matches can be missed.',
  },
  {
    icon: MessageSquareText,
    title: 'No clear candidate explanation',
    text: 'Hiring teams need simple reasons for every shortlist, hold, or rejection decision.',
  },
]

const workflowSteps = [
  { icon: BriefcaseBusiness, title: 'Create Job', text: 'Define role requirements and launch a structured hiring pipeline.' },
  { icon: Files, title: 'Upload Resumes', text: 'Bulk upload resumes or collect applications from public apply pages.' },
  { icon: BrainCircuit, title: 'AI Screening', text: 'Parse profiles, match skills, and understand resume context.' },
  { icon: BarChart3, title: 'Candidate Ranking', text: 'Rank applicants by fit, evidence, and job description alignment.' },
  { icon: Send, title: 'Outreach', text: 'Move shortlisted candidates forward with automated communication.' },
  { icon: CalendarCheck, title: 'Interview Scheduling', text: 'Coordinate interview slots without losing momentum.' },
]

const features = [
  { icon: FileSearch, title: 'AI-powered resume screening', text: 'Read, parse, and evaluate resumes against role requirements in minutes.' },
  { icon: Target, title: 'JD-based candidate scoring', text: 'Score candidates against your exact job description, not generic keywords.' },
  { icon: Trophy, title: 'AI candidate ranking', text: 'Prioritize top-fit talent with recruiter-friendly ranking views.' },
  { icon: Puzzle, title: 'Skill matching and gap analysis', text: 'See matched skills, missing skills, and role-fit signals at a glance.' },
  { icon: MessageSquareText, title: 'Recruiter explanation engine', text: 'Give hiring managers clear reasons behind every AI score.' },
  { icon: MailCheck, title: 'Automated candidate outreach', text: 'Send timely, personalized updates to shortlisted candidates.' },
  { icon: CalendarCheck, title: 'Interview scheduling', text: 'Let teams and candidates coordinate the next step faster.' },
  { icon: ClipboardCheck, title: 'AI screening test', text: 'Create screening tests that help validate role-specific ability.' },
  { icon: Globe2, title: 'Public apply page', text: 'Generate clean apply pages for each open role without extra setup.' },
  { icon: GitBranch, title: 'Complete hiring pipeline', text: 'Manage the journey from job creation to interview scheduling in one place.' },
]

const platformCards = [
  { icon: BriefcaseBusiness, title: 'Job creation' },
  { icon: Files, title: 'Resume upload' },
  { icon: Bot, title: 'AI parsing' },
  { icon: PieChart, title: 'Candidate scoring' },
  { icon: BadgeCheck, title: 'Shortlisting' },
  { icon: Send, title: 'Communication' },
  { icon: CalendarCheck, title: 'Interview scheduling' },
  { icon: ShieldCheck, title: 'Final hiring decision' },
]

const benefits = [
  'Screen hundreds of resumes in minutes',
  'Reduce manual effort across every role',
  'Improve shortlisting accuracy',
  'Explain candidate decisions clearly',
  'Keep the hiring pipeline organized',
  'Move candidates faster from application to interview',
]

const pricingPlans = [
  {
    name: 'Starter',
    tag: 'Pilot pricing available',
    description: 'For small teams validating AI screening on active roles.',
    items: ['Resume parsing', 'Candidate scoring', 'Public apply pages'],
  },
  {
    name: 'Growth',
    tag: 'Coming soon',
    description: 'For recruiting teams managing multiple roles and hiring managers.',
    items: ['Advanced ranking', 'Outreach workflows', 'Interview scheduling'],
    featured: true,
  },
  {
    name: 'Enterprise',
    tag: 'Coming soon',
    description: 'For organizations that need custom workflows and team governance.',
    items: ['Custom pipelines', 'Team controls', 'Priority onboarding'],
  },
]

const resources = [
  { icon: BookOpen, title: 'Blog', text: 'Practical hiring insights for AI-enabled recruiting teams.' },
  { icon: Building2, title: 'Case studies', text: 'Stories from teams reducing screening time and improving quality.' },
  { icon: Rocket, title: 'Product updates', text: 'New workflow, scoring, outreach, and scheduling improvements.' },
  { icon: GraduationCap, title: 'Hiring guides', text: 'Simple guides for better job descriptions and structured screening.' },
]

const candidateRows = [
  { name: 'Rahul Sharma', role: 'Data Analyst', score: '86%', skills: 'Python, SQL, Power BI', missing: 'Snowflake', status: 'Shortlist' },
  { name: 'Ananya Mehta', role: 'Data Analyst', score: '79%', skills: 'SQL, Excel, Tableau', missing: 'Python', status: 'Review' },
  { name: 'Vikram Rao', role: 'Data Analyst', score: '72%', skills: 'Excel, Reporting', missing: 'Power BI', status: 'Hold' },
]

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="HireScoreAI home">
      <span className="logoMark" aria-hidden="true">
        <img src="/hirescore-logo-mark.png" alt="" />
      </span>
      <span className="logoText">
        Hire<span>Score</span><strong>AI</strong>
      </span>
    </a>
  )
}

function SectionHeader({ eyebrow, title, highlight, text, align = 'center' }) {
  return (
    <div className={`sectionHeader ${align === 'left' ? 'sectionHeaderLeft' : ''}`}>
      <span className="eyebrow">
        <Sparkles size={14} />
        {eyebrow}
      </span>
      <h2>
        {title} {highlight && <span>{highlight}</span>}
      </h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="siteHeader">
      <div className="navShell">
        <Logo />
        <nav className="desktopNav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="navActions">
          <a className="btn btnGhost" href="#contact">Book Demo</a>
          <a className="btn btnPrimary" href="#pilot">Start 7-Day Pilot</a>
        </div>
        <button className="menuButton" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mobileNav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="btn btnGhost" href="#contact" onClick={() => setOpen(false)}>Book Demo</a>
          <a className="btn btnPrimary" href="#pilot" onClick={() => setOpen(false)}>Start 7-Day Pilot</a>
        </nav>
      )}
    </header>
  )
}

function DashboardMockup() {
  return (
    <div className="dashboardFrame" aria-label="HireScoreAI dashboard preview">
      <div className="windowBar">
        <span />
        <span />
        <span />
        <strong>Candidate intelligence workspace</strong>
      </div>
      <div className="dashboardGrid">
        <aside className="dashboardSidebar">
          <div className="sidebarBrand">
            <Network size={18} />
            <span>Data Analyst Hiring</span>
          </div>
          {['Overview', 'Candidates', 'AI Scores', 'Outreach', 'Interviews'].map((item, index) => (
            <div className={`sideItem ${index === 1 ? 'active' : ''}`} key={item}>
              <span />
              {item}
            </div>
          ))}
        </aside>

        <div className="rankingPanel">
          <div className="panelTop">
            <div>
              <small>Active role</small>
              <h3>Data Analyst</h3>
            </div>
            <span className="scorePill">129 resumes parsed</span>
          </div>
          <div className="candidateTable">
            <div className="tableHead">
              <span>Candidate</span>
              <span>AI score</span>
              <span>Matched skills</span>
              <span>Missing</span>
              <span>Status</span>
            </div>
            {candidateRows.map((row) => (
              <div className="tableRow" key={row.name}>
                <span>
                  <strong>{row.name}</strong>
                  <small>{row.role}</small>
                </span>
                <span className="scoreBadge">{row.score}</span>
                <span>{row.skills}</span>
                <span className="missing">{row.missing}</span>
                <span className={`status status${row.status}`}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="explainPanel">
          <div className="miniPanelHeader">
            <BrainCircuit size={18} />
            <span>AI explanation</span>
          </div>
          <h4>Rahul is a strong match</h4>
          <p>Dashboarding, SQL querying, and reporting experience align closely with the JD. Python improves profile strength for analytics automation.</p>
          <div className="skillCloud">
            {['Python', 'SQL', 'Power BI', 'Excel'].map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>

        <div className="scheduleCard">
          <div>
            <small>Next step</small>
            <h4>Interview scheduling</h4>
          </div>
          <div className="scheduleSlot">
            <CalendarCheck size={18} />
            Tomorrow, 11:30 AM
          </div>
          <button type="button">Send invite</button>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="heroPattern" aria-hidden="true" />
      <div className="container heroGrid">
        <div className="heroCopy">
          <span className="heroBadge">
            <Star size={15} />
            AI recruitment platform for faster shortlisting
          </span>
          <h1>Hire faster with AI-powered resume screening</h1>
          <p>
            HireScoreAI helps recruiters create jobs, screen resumes, rank candidates, explain AI scores, automate outreach, and schedule interviews, all from one intelligent hiring platform.
          </p>
          <div className="heroActions">
            <a className="btn btnPrimary btnLarge" href="#pilot">
              Start 7-Day Pilot
              <ArrowRight size={18} />
            </a>
            <a className="btn btnGhost btnLarge" href="#contact">
              <PlayCircle size={18} />
              Book a Demo
            </a>
          </div>
          <div className="heroStats" aria-label="Platform highlights">
            <span><strong>10x</strong> faster screening</span>
            <span><strong>Explainable</strong> score logic</span>
            <span><strong>One</strong> hiring workspace</span>
          </div>
        </div>
        <DashboardMockup />
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="trustStrip" aria-label="HireScoreAI value points">
      <div className="container trustGrid">
        {trustItems.map(({ icon: Icon, text }) => (
          <div className="trustItem" key={text}>
            <Icon size={18} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section className="section" id="solutions">
      <div className="container">
        <SectionHeader
          eyebrow="The problem"
          title="Manual resume screening is slowing"
          highlight="hiring teams down"
          text="Recruiters spend hours reading resumes, comparing skills manually, missing strong candidates, and struggling to explain why a candidate is shortlisted or rejected."
        />
        <div className="threeGrid">
          {problemCards.map(({ icon: Icon, title, text }) => (
            <article className="premiumCard" key={title}>
              <div className="iconBox danger"><Icon size={24} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Solution() {
  return (
    <section className="section splitSection" id="product">
      <div className="container splitGrid">
        <div>
          <SectionHeader
            align="left"
            eyebrow="The solution"
            title="HireScoreAI turns resumes into"
            highlight="ranked, explainable candidate insights"
            text="The platform reads resumes, understands the job description, scores candidates, ranks them, and gives recruiter-ready explanations for each decision."
          />
        </div>
        <div className="workflowLine" aria-label="Hiring workflow">
          {workflowSteps.map(({ icon: Icon, title, text }, index) => (
            <div className="workflowStep" key={title}>
              <div className="workflowIcon"><Icon size={20} /></div>
              <div>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {index < workflowSteps.length - 1 && <ChevronRight className="workflowArrow" size={18} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="section featuresSection" id="features">
      <div className="container">
        <SectionHeader
          eyebrow="Platform features"
          title="Everything recruiters need to"
          highlight="hire smarter"
          text="A complete AI-powered hiring toolkit for modern recruitment teams, from apply pages to interview scheduling."
        />
        <div className="featureGrid">
          {features.map(({ icon: Icon, title, text }) => (
            <article className="featureCard" key={title}>
              <div className="iconBox"><Icon size={23} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AIExplanation() {
  return (
    <section className="section explanationSection">
      <div className="container explanationGrid">
        <div>
          <SectionHeader
            align="left"
            eyebrow="AI explainability"
            title="Understand every"
            highlight="candidate score"
            text="HireScoreAI does not just give a number. It shows why a candidate scored high or low based on skills, experience, education, semantic JD match, missing skills, and profile strength."
          />
          <div className="explainChecks">
            {['Skills matched to JD', 'Experience relevance', 'Education fit', 'Semantic JD match', 'Missing skills', 'Profile strength'].map((item) => (
              <span key={item}><CheckCircle2 size={17} />{item}</span>
            ))}
          </div>
        </div>
        <article className="aiCard">
          <div className="aiCardTop">
            <span>Candidate: Rahul Sharma</span>
            <strong>AI Score: 86%</strong>
          </div>
          <div className="meter"><span style={{ width: '86%' }} /></div>
          <div className="skillBlock">
            <small>Matched skills</small>
            <div>{['Python', 'SQL', 'Power BI', 'Excel'].map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="skillBlock missingBlock">
            <small>Missing skills</small>
            <div><span>Snowflake</span></div>
          </div>
          <div className="explanationNote">
            <MessageSquareText size={19} />
            <p>Strong match for Data Analyst role because of dashboarding, SQL, and reporting experience.</p>
          </div>
        </article>
      </div>
    </section>
  )
}

function Platform() {
  return (
    <section className="section platformSection">
      <div className="container">
        <SectionHeader
          eyebrow="Workflow platform"
          title="One workspace for the complete"
          highlight="hiring journey"
          text="Give recruiters, hiring managers, and interview teams a clear path from job creation to final decision."
        />
        <div className="platformGrid">
          {platformCards.map(({ icon: Icon, title }, index) => (
            <article className="platformCard" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon size={24} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  return (
    <section className="section benefitsSection">
      <div className="container benefitsGrid">
        <div>
          <span className="eyebrow">
            <TimerReset size={14} />
            Recruiter benefits
          </span>
          <h2>Built to save recruiter time and improve hiring quality</h2>
          <p>Replace repetitive resume review with a faster, more structured workflow that keeps your team focused on the best candidates.</p>
        </div>
        <div className="benefitList">
          {benefits.map((item) => (
            <div className="benefitItem" key={item}>
              <CheckCircle2 size={19} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PilotCTA() {
  return (
    <section className="pilotCta" id="pilot">
      <div className="container pilotBox">
        <div>
          <span className="eyebrow">
            <Clock3 size={14} />
            Limited early access
          </span>
          <h2>Start with a 7-day free pilot</h2>
          <p>We are offering 7-day free pilot access for a limited number of early clients. Test HireScoreAI with your real hiring workflow and see how much time your recruitment team can save.</p>
          <a href="mailto:hireScoreAiAts@gmail.com">hireScoreAiAts@gmail.com</a>
        </div>
        <a className="btn btnGold btnLarge" href="#contact">
          Book Pilot Slot
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionHeader
          eyebrow="Pricing preview"
          title="Simple plans for every"
          highlight="hiring stage"
          text="Pricing is being finalized. Early clients can request pilot pricing during onboarding."
        />
        <div className="pricingGrid">
          {pricingPlans.map((plan) => (
            <article className={`pricingCard ${plan.featured ? 'featuredPlan' : ''}`} key={plan.name}>
              <span className="planTag">{plan.tag}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}><CheckCircle2 size={16} />{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Resources() {
  return (
    <section className="section resourcesSection" id="resources">
      <div className="container">
        <SectionHeader
          eyebrow="Resources"
          title="Guidance for modern"
          highlight="recruiting teams"
          text="Educational resources, product updates, and hiring playbooks will be available as the platform grows."
        />
        <div className="resourceGrid">
          {resources.map(({ icon: Icon, title, text }) => (
            <article className="resourceCard" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="section contactSection" id="contact">
      <div className="container contactGrid">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Contact"
            title="Request a demo for"
            highlight="your hiring team"
            text="Tell us about your hiring workflow and we will help you evaluate HireScoreAI with a focused pilot."
          />
          <div className="contactFacts">
            <span><MailCheck size={18} />hireScoreAiAts@gmail.com</span>
            <span><Route size={18} />Pilot support from setup to shortlist review</span>
          </div>
        </div>
        <form className="demoForm" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
          <label>
            Name
            <input name="name" type="text" placeholder="Your full name" required />
          </label>
          <label>
            Work email
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Company name
            <input name="company" type="text" placeholder="Company" required />
          </label>
          <label>
            Hiring volume
            <select name="volume" defaultValue="">
              <option value="" disabled>Select monthly hiring volume</option>
              <option>1 to 5 roles</option>
              <option>6 to 20 roles</option>
              <option>21 to 50 roles</option>
              <option>50+ roles</option>
            </select>
          </label>
          <label className="fullField">
            Message
            <textarea name="message" rows="5" placeholder="Tell us about your current hiring workflow" />
          </label>
          <button className="btn btnPrimary" type="submit">Request Demo</button>
          {submitted && <p className="formMessage">Thanks. The form UI is ready for backend integration.</p>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div className="footerBrand">
          <Logo />
          <p>HireScoreAI is an AI-powered recruitment and ATS platform for faster, explainable hiring workflows.</p>
          <a href="mailto:hireScoreAiAts@gmail.com">hireScoreAiAts@gmail.com</a>
        </div>
        <div>
          <h4>Product</h4>
          <a href="#product">AI screening</a>
          <a href="#features">Candidate scoring</a>
          <a href="#pilot">7-day pilot</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#contact">Contact</a>
          <a href="#pricing">Pricing</a>
          <a href="#solutions">Solutions</a>
        </div>
        <div>
          <h4>Resources</h4>
          <a href="#resources">Blog</a>
          <a href="#resources">Case studies</a>
          <a href="#resources">Hiring guides</a>
        </div>
      </div>
      <div className="container footerBottom">
        <span>Copyright 2026 HireScoreAI. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Solution />
        <Features />
        <AIExplanation />
        <Platform />
        <Benefits />
        <PilotCTA />
        <Pricing />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
