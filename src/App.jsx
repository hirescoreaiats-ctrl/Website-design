import { useEffect, useState } from 'react'
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
  ChevronDown,
  ClipboardCheck,
  FileSearch,
  Files,
  GitBranch,
  Globe2,
  HelpCircle,
  MailCheck,
  Menu,
  MessageSquareText,
  Network,
  PenLine,
  PieChart,
  Rocket,
  Route,
  SearchCheck,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UsersRound,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import './App.css'

const SITE_URL = 'https://hirescoreai.com'
const APP_URL = 'https://app.hirescoreai.com'
const CONTACT_EMAIL = 'hirescoreaiats@gmail.com'

const iconMap = {
  job: BriefcaseBusiness,
  apply: Globe2,
  upload: Files,
  parse: Bot,
  score: Target,
  rank: Trophy,
  shortlist: BadgeCheck,
  explain: MessageSquareText,
  communicate: Send,
  schedule: CalendarCheck,
  test: ClipboardCheck,
  pipeline: GitBranch,
}

const productPages = [
  {
    slug: '/product/create-job',
    navLabel: 'Create Job',
    title: 'Create Jobs Faster With AI-Ready Hiring Workflows',
    meta: 'Create structured jobs in HireScore AI so recruiters can collect applications, screen resumes, and manage hiring from one workflow.',
    icon: 'job',
    intro: 'Build clear job records with role details, requirements, skills, and hiring stages before applications start arriving.',
    does: 'Create a central job workspace where recruiters define the role, attach hiring criteria, and prepare the pipeline.',
    need: 'Recruiters need a consistent job setup so resume screening and candidate scoring are based on the right role requirements.',
    solves: 'HireScore AI keeps the job description, skills, public apply page, resumes, scores, and communication connected to one role.',
    benefits: ['Structured job setup', 'Cleaner candidate tracking', 'Better JD-based scoring', 'Faster launch for new roles'],
    workflow: ['Add role details', 'Set required skills', 'Launch apply page', 'Start screening'],
    related: ['/product/public-apply-page', '/product/ai-candidate-scoring', '/product/hiring-pipeline'],
  },
  {
    slug: '/product/public-apply-page',
    navLabel: 'Public Apply Page',
    title: 'Public Apply Pages for Faster Candidate Collection',
    meta: 'Generate public job apply pages with HireScore AI to collect candidate applications and resumes in one organized hiring pipeline.',
    icon: 'apply',
    intro: 'Create a public application link for every job so candidates can apply without manual email collection.',
    does: 'Gives each role a clean apply page where candidates can submit details and resumes.',
    need: 'Recruiters need one reliable place to collect applications instead of tracking resumes across email, chats, and spreadsheets.',
    solves: 'HireScore AI connects every application directly to the right job and makes it ready for resume parsing and AI scoring.',
    benefits: ['Shareable job links', 'Organized applications', 'Fewer manual follow-ups', 'Cleaner candidate intake'],
    workflow: ['Create job', 'Generate link', 'Share with candidates', 'Review applications'],
    related: ['/product/create-job', '/product/resume-upload', '/product/hiring-pipeline'],
  },
  {
    slug: '/product/resume-upload',
    navLabel: 'Resume Upload',
    title: 'Resume Upload for High-Volume Hiring Teams',
    meta: 'Upload resumes into HireScore AI and keep candidate profiles organized for parsing, screening, scoring, and ranking.',
    icon: 'upload',
    intro: 'Bulk upload resumes or review resumes collected from public apply pages in one recruiter workspace.',
    does: 'Stores candidate resumes against open jobs so they can be parsed, scored, and reviewed consistently.',
    need: 'Manual file handling slows teams down and makes it harder to compare candidates role by role.',
    solves: 'HireScore AI centralizes resume intake and prepares each profile for AI parsing and candidate ranking.',
    benefits: ['Bulk resume handling', 'Cleaner job-wise organization', 'Reduced manual sorting', 'Ready for AI parsing'],
    workflow: ['Select job', 'Upload resumes', 'Parse profiles', 'Review ranked list'],
    related: ['/product/ai-resume-parsing', '/product/ai-candidate-ranking', '/resources/user-guide/upload-resumes'],
  },
  {
    slug: '/product/ai-resume-parsing',
    navLabel: 'AI Resume Screening',
    title: 'AI Resume Screening and Resume Parsing Software',
    meta: 'HireScore AI screens and parses resumes so recruiters can identify skills, experience, education, and role-fit signals faster.',
    icon: 'parse',
    intro: 'Turn resumes into structured candidate insights that recruiters can compare without reading every profile manually.',
    does: 'Extracts skills, experience, education, and candidate highlights from resumes.',
    need: 'Recruiters often spend hours reading resumes before they can build a shortlist.',
    solves: 'HireScore AI reads candidate profiles and turns them into structured screening data connected to the job description.',
    benefits: ['Faster resume review', 'Structured candidate profiles', 'Reduced manual reading', 'Better role-fit visibility'],
    workflow: ['Upload resume', 'Parse profile', 'Match skills', 'Send to scoring'],
    related: ['/product/ai-candidate-scoring', '/product/ai-candidate-ranking', '/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time'],
  },
  {
    slug: '/product/ai-candidate-scoring',
    navLabel: 'AI Candidate Scoring',
    title: 'JD-Based AI Candidate Scoring for Recruiters',
    meta: 'Score candidates against job descriptions with HireScore AI and understand role-fit based on skills, experience, and profile strength.',
    icon: 'score',
    intro: 'Use job description based scoring to compare candidates with clearer, more consistent hiring criteria.',
    does: 'Calculates candidate fit using skills, experience, education, semantic JD match, missing skills, and profile quality.',
    need: 'Recruiters need a consistent way to prioritize candidates without relying only on keyword matching.',
    solves: 'HireScore AI scores every candidate against the role and supports each score with explainable evidence.',
    benefits: ['JD-based scoring', 'Consistent evaluation', 'Clear fit signals', 'Better hiring manager discussions'],
    workflow: ['Read JD', 'Analyze resume', 'Calculate score', 'Explain decision'],
    related: ['/product/ai-explanation-engine', '/product/ai-candidate-ranking', '/product/ai-shortlisting'],
  },
  {
    slug: '/product/ai-candidate-ranking',
    navLabel: 'AI Candidate Ranking',
    title: 'AI Candidate Ranking Tool for Faster Shortlists',
    meta: 'Rank candidates automatically with HireScore AI so recruiters can focus on the strongest job matches first.',
    icon: 'rank',
    intro: 'See the best-fit candidates at the top of every hiring pipeline with AI-powered candidate ranking.',
    does: 'Orders candidates by AI score, matched skills, missing skills, and job relevance.',
    need: 'High-volume roles make it hard to know which candidates deserve attention first.',
    solves: 'HireScore AI ranks the pipeline so recruiters can review top candidates, compare evidence, and move faster.',
    benefits: ['Prioritized candidate list', 'Less manual comparison', 'Faster shortlist creation', 'Clear ranking evidence'],
    workflow: ['Score candidates', 'Sort by fit', 'Review evidence', 'Shortlist top matches'],
    related: ['/product/ai-candidate-scoring', '/product/ai-shortlisting', '/resources/blogs/what-is-candidate-ranking-and-why-it-matters'],
  },
  {
    slug: '/product/ai-shortlisting',
    navLabel: 'AI Shortlisting',
    title: 'AI Shortlisting Software for Quality Hiring Decisions',
    meta: 'Use HireScore AI to shortlist candidates faster while keeping candidate decisions explainable and organized.',
    icon: 'shortlist',
    intro: 'Move the strongest candidates from screening to the next hiring step with confidence.',
    does: 'Helps recruiters identify candidates who should move forward based on score, skills, and explanation.',
    need: 'Shortlisting needs to be fast, consistent, and easy to explain to hiring managers.',
    solves: 'HireScore AI gives recruiters a ranked pipeline and clear evidence for every shortlist decision.',
    benefits: ['Faster shortlist review', 'Clear decision context', 'Better manager alignment', 'Reduced quality loss'],
    workflow: ['Review ranking', 'Read explanation', 'Select candidates', 'Move to communication'],
    related: ['/product/ai-explanation-engine', '/product/candidate-communication', '/resources/user-guide/shortlist-candidates'],
  },
  {
    slug: '/product/ai-explanation-engine',
    navLabel: 'AI Explanation Engine',
    title: 'Explainable AI Hiring Decisions for Recruiters',
    meta: 'HireScore AI explains candidate scores using skills, experience, education, semantic match, missing skills, and profile strength.',
    icon: 'explain',
    intro: 'Understand why every candidate scored high or low before making hiring decisions.',
    does: 'Generates recruiter-ready explanations for candidate scores and shortlisting decisions.',
    need: 'Hiring teams need transparency, not just a number, when moving candidates forward.',
    solves: 'HireScore AI shows matched skills, missing skills, experience relevance, and profile strengths behind every score.',
    benefits: ['Transparent scoring', 'Clear hiring manager updates', 'Better candidate review', 'Explainable shortlisting'],
    workflow: ['Open profile', 'Review score', 'Read explanation', 'Decide next step'],
    related: ['/product/ai-candidate-scoring', '/product/ai-candidate-ranking', '/product/ai-shortlisting'],
  },
  {
    slug: '/product/candidate-communication',
    navLabel: 'Candidate Communication',
    title: 'Candidate Communication for Faster Hiring Follow-Up',
    meta: 'Move shortlisted candidates to communication in HireScore AI and keep outreach organized in the hiring workflow.',
    icon: 'communicate',
    intro: 'Keep candidate follow-up connected to shortlisting, screening, and interview scheduling.',
    does: 'Helps recruiters move candidates into communication after screening and shortlisting.',
    need: 'Candidate momentum is lost when outreach is disconnected from the hiring pipeline.',
    solves: 'HireScore AI keeps shortlisted candidates, communication status, and next steps in one workflow.',
    benefits: ['Faster follow-up', 'Cleaner candidate status', 'Reduced missed outreach', 'Better recruiter coordination'],
    workflow: ['Shortlist candidate', 'Move to communication', 'Send update', 'Schedule interview'],
    related: ['/product/ai-shortlisting', '/product/interview-scheduling', '/resources/user-guide/move-to-communication'],
  },
  {
    slug: '/product/interview-scheduling',
    navLabel: 'Interview Scheduling',
    title: 'AI Interview Scheduling Software for Hiring Teams',
    meta: 'Schedule interviews from your hiring pipeline with HireScore AI and move candidates faster from shortlist to interview.',
    icon: 'schedule',
    intro: 'Coordinate interviews after candidate screening without losing context from the hiring workflow.',
    does: 'Supports interview scheduling as part of the end-to-end hiring process.',
    need: 'Recruiters need to move qualified candidates quickly before they lose interest.',
    solves: 'HireScore AI connects shortlisting, communication, and interview scheduling inside the candidate pipeline.',
    benefits: ['Faster interview setup', 'Connected candidate context', 'Cleaner next steps', 'Less manual coordination'],
    workflow: ['Select candidate', 'Move to interview', 'Choose time', 'Confirm schedule'],
    related: ['/product/candidate-communication', '/product/hiring-pipeline', '/resources/user-guide/schedule-interviews'],
  },
  {
    slug: '/product/ai-screening-test',
    navLabel: 'AI Screening Test',
    title: 'AI Screening Tests for Better Candidate Validation',
    meta: 'Run AI screening tests with HireScore AI to validate candidate fit after resume screening and shortlisting.',
    icon: 'test',
    intro: 'Add screening tests to evaluate role-specific skills before the interview stage.',
    does: 'Helps recruiters validate shortlisted candidates with AI-supported screening test workflows.',
    need: 'Resume fit is important, but teams also need practical validation before interviews.',
    solves: 'HireScore AI connects test workflows to the candidate profile and hiring pipeline.',
    benefits: ['Role-fit validation', 'Better interview readiness', 'Structured candidate evidence', 'Improved shortlist quality'],
    workflow: ['Select candidates', 'Run screening test', 'Review results', 'Move to interview'],
    related: ['/product/ai-shortlisting', '/product/interview-scheduling', '/resources/user-guide/run-ai-screening-test'],
  },
  {
    slug: '/product/hiring-pipeline',
    navLabel: 'Hiring Pipeline Automation',
    title: 'Automated Hiring Pipeline Software for Recruiters',
    meta: 'Manage job creation, applications, resume screening, ranking, shortlisting, communication, interviews, and hiring decisions in HireScore AI.',
    icon: 'pipeline',
    intro: 'Run the complete hiring workflow from job creation to interview scheduling in one AI-powered platform.',
    does: 'Connects every hiring stage so recruiters can manage candidates without disconnected tools.',
    need: 'Recruiters need one organized workflow instead of scattered spreadsheets, inboxes, and manual status tracking.',
    solves: 'HireScore AI links jobs, apply pages, resumes, AI scores, shortlists, communication, tests, and interviews.',
    benefits: ['End-to-end visibility', 'Fewer manual handoffs', 'Organized candidate status', 'Faster hiring decisions'],
    workflow: ['Create job', 'Collect applications', 'Screen candidates', 'Schedule interviews'],
    related: ['/product/create-job', '/product/public-apply-page', '/product/interview-scheduling'],
  },
]

const guidePages = [
  ['create-a-job', 'Create a Job', '/product/create-job', ['Open the job workspace and choose Create Job.', 'Add the role title, description, skills, and hiring criteria.', 'Save the job and review the pipeline stages.']],
  ['share-public-apply-link', 'Share a Public Apply Link', '/product/public-apply-page', ['Open the job you want to promote.', 'Generate or copy the public apply page link.', 'Share it on job boards, email, or social channels.']],
  ['upload-resumes', 'Upload Resumes', '/product/resume-upload', ['Open the correct job pipeline.', 'Upload resumes in bulk or review applications from the apply page.', 'Start parsing and screening candidates.']],
  ['review-ai-ranked-candidates', 'Review AI Ranked Candidates', '/product/ai-candidate-ranking', ['Open the candidate ranking view.', 'Sort or filter by AI score and skill match.', 'Open top profiles to review explanations.']],
  ['shortlist-candidates', 'Shortlist Candidates', '/product/ai-shortlisting', ['Review score, matched skills, and missing skills.', 'Compare candidate explanation with the role requirements.', 'Move qualified candidates to shortlist.']],
  ['move-to-communication', 'Move Candidates to Communication', '/product/candidate-communication', ['Select shortlisted candidates.', 'Move them to the communication stage.', 'Send outreach or prepare the next update.']],
  ['schedule-interviews', 'Schedule Interviews', '/product/interview-scheduling', ['Open a candidate in communication or shortlist stage.', 'Choose the interview step.', 'Confirm time and move the candidate forward.']],
  ['run-ai-screening-test', 'Run an AI Screening Test', '/product/ai-screening-test', ['Select candidates who need validation.', 'Create or assign the screening test.', 'Review test results before interview scheduling.']],
].map(([slug, title, productLink, steps]) => ({
  slug: `/resources/user-guide/${slug}`,
  title,
  productLink,
  steps,
  meta: `${title} in HireScore AI with simple recruiter steps, common mistakes, best practices, and app CTA.`,
}))

const blogPosts = [
  {
    slug: '/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time',
    title: 'How AI Resume Screening Helps Recruiters Save Time',
    meta: 'Learn how AI resume screening software helps recruiters reduce manual review, organize profiles, and shortlist candidates faster.',
    sections: [
      ['Why manual screening takes so long', 'Recruiters often review hundreds of resumes for one role. AI resume screening helps turn those resumes into structured candidate insights.'],
      ['How AI screening improves recruiter focus', 'Instead of starting with every resume, recruiters can start with parsed profiles, matched skills, missing skills, and candidate scores.'],
      ['Where HireScore AI fits', 'HireScore AI connects resume parsing with JD-based candidate scoring and AI candidate ranking.'],
    ],
    links: ['/product/ai-resume-parsing', '/product/ai-candidate-scoring', '/product/ai-candidate-ranking'],
  },
  {
    slug: '/resources/blogs/what-is-candidate-ranking-and-why-it-matters',
    title: 'What Is Candidate Ranking and Why It Matters',
    meta: 'Understand candidate ranking, why it matters for recruiters, and how AI candidate ranking tools improve shortlist quality.',
    sections: [
      ['Candidate ranking explained', 'Candidate ranking sorts applicants by role fit so recruiters can review the strongest matches first.'],
      ['Why ranking improves speed', 'A ranked list reduces manual comparison and helps teams spend time on candidates with stronger evidence.'],
      ['Use ranking with explanations', 'Ranking works best when every score has a clear explanation recruiters can review.'],
    ],
    links: ['/product/ai-candidate-ranking', '/product/ai-explanation-engine', '/product/ai-shortlisting'],
  },
  {
    slug: '/resources/blogs/how-to-create-a-public-job-apply-page-for-faster-hiring',
    title: 'How to Create a Public Job Apply Page for Faster Hiring',
    meta: 'Learn how public job apply pages help recruiters collect applications and keep candidate intake organized.',
    sections: [
      ['Why apply pages matter', 'Public apply pages give candidates a simple way to submit information and resumes for a specific role.'],
      ['What to include', 'A good apply page should clearly explain the role and collect the details recruiters need for screening.'],
      ['Connect applications to AI screening', 'HireScore AI links each application to the right job pipeline for parsing and scoring.'],
    ],
    links: ['/product/public-apply-page', '/product/create-job', '/resources/user-guide/share-public-apply-link'],
  },
  {
    slug: '/resources/blogs/ai-in-recruitment-benefits-risks-and-best-practices',
    title: 'AI in Recruitment: Benefits, Risks, and Best Practices',
    meta: 'Explore AI recruitment software benefits, risks, and practical best practices for recruiters and HR teams.',
    sections: [
      ['Benefits of AI recruitment software', 'AI can reduce repetitive screening work, structure candidate evidence, and improve hiring speed.'],
      ['Risks to manage', 'Recruiters should avoid blindly trusting scores and should review candidate explanations before decisions.'],
      ['Best practices', 'Use AI as a decision support tool with clear criteria, explainable scoring, and human review.'],
    ],
    links: ['/product/ai-explanation-engine', '/product/ai-candidate-scoring', '/product/hiring-pipeline'],
  },
  {
    slug: '/resources/blogs/how-to-shortlist-candidates-faster-without-losing-quality',
    title: 'How to Shortlist Candidates Faster Without Losing Quality',
    meta: 'Learn how recruiters can shortlist candidates faster using AI scoring, ranking, and explainable hiring decisions.',
    sections: [
      ['Start with structured criteria', 'A clear job description and required skills make shortlisting more consistent.'],
      ['Use ranking and explanation together', 'Scores show priority, while explanations show why a candidate deserves review.'],
      ['Move faster without skipping review', 'HireScore AI helps recruiters focus review time on the most relevant candidates.'],
    ],
    links: ['/product/ai-shortlisting', '/product/ai-candidate-ranking', '/product/ai-explanation-engine'],
  },
  {
    slug: '/resources/blogs/complete-guide-to-ai-powered-hiring-automation',
    title: 'Complete Guide to AI-Powered Hiring Automation',
    meta: 'A practical guide to AI hiring automation for jobs, apply pages, resume screening, candidate ranking, communication, and interviews.',
    sections: [
      ['What hiring automation includes', 'Hiring automation connects job setup, application collection, resume screening, scoring, outreach, tests, and interviews.'],
      ['Why recruiters need connected workflows', 'Disconnected tools create manual handoffs and candidate status confusion.'],
      ['How HireScore AI supports automation', 'HireScore AI manages the complete hiring pipeline from job creation to interview scheduling.'],
    ],
    links: ['/product/hiring-pipeline', '/product/candidate-communication', '/product/interview-scheduling'],
  },
]

const caseStudies = [
  {
    slug: '/resources/case-studies/startup-reduced-resume-screening-time',
    title: 'How a Startup Reduced Resume Screening Time by 70%',
    meta: 'A generic sample case study showing how a startup could reduce resume screening time with AI-powered hiring workflows.',
    summary: 'A demo startup hiring for multiple roles used AI resume screening to prioritize candidate review and reduce manual effort.',
    results: ['70% less time spent on first-pass resume review', 'Cleaner shortlist conversations', 'Faster movement from application to interview'],
  },
  {
    slug: '/resources/case-studies/recruiting-team-improved-shortlisting-quality',
    title: 'How a Recruiting Team Improved Candidate Shortlisting Quality',
    meta: 'A generic sample case study about improving shortlisting quality with candidate ranking and explainable AI scores.',
    summary: 'A demo recruiting team used AI candidate ranking and explanations to make shortlist discussions more consistent.',
    results: ['More consistent candidate review', 'Clearer hiring manager communication', 'Improved shortlist confidence'],
  },
  {
    slug: '/resources/case-studies/public-apply-pages-improved-application-collection',
    title: 'How Public Apply Pages Improved Application Collection',
    meta: 'A generic sample case study showing how public apply pages can simplify application collection for recruiters.',
    summary: 'A demo hiring team replaced scattered resume collection with public apply links connected to each job.',
    results: ['Applications organized by job', 'Reduced email-based resume tracking', 'Faster resume parsing and screening'],
  },
]

const faqs = [
  ['What is HireScore AI?', 'HireScore AI is an AI-powered recruitment and ATS platform for creating jobs, collecting applications, screening resumes, ranking candidates, explaining AI decisions, and managing hiring workflows.'],
  ['Where do product CTAs go?', `All product and app CTAs point to ${APP_URL}.`],
  ['Can recruiters use it for high-volume roles?', 'Yes. HireScore AI is designed to help recruiters screen and rank large candidate pools faster.'],
  ['Does HireScore AI replace recruiters?', 'No. It supports recruiter decisions with structured insights, scores, and explanations. Human review stays important.'],
]

const pricingPlans = [
  ['Free Pilot', '7-day free pilot access available for selected early clients.', ['Test with real jobs', 'Resume screening', 'Candidate ranking', 'Pilot support']],
  ['Starter', 'For small teams starting with AI resume screening.', ['Create jobs', 'Upload resumes', 'AI scoring', 'Public apply pages']],
  ['Growth', 'For growing teams managing multiple roles and hiring managers.', ['Advanced workflow', 'Communication stages', 'Interview scheduling', 'AI screening tests']],
  ['Enterprise', 'For teams that need custom rollout and workflow support.', ['Custom onboarding', 'Team governance', 'Priority support', 'Workflow consultation']],
]

function navigateTo(path) {
  if (path.startsWith('http') || path.startsWith('mailto:')) {
    window.location.href = path
    return
  }
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Link({ href, children, className, onClick, ...props }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (!href.startsWith('http') && !href.startsWith('mailto:')) {
          event.preventDefault()
          navigateTo(href)
        }
        if (onClick) onClick()
      }}
      {...props}
    >
      {children}
    </a>
  )
}

function SEO({ title, description, path = '/' }) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path === '/' ? '' : path}`
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setCanonical(canonical)
  }, [title, description, path])
  return null
}

function setMeta(name, content, attr = 'name') {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function Logo() {
  return (
    <Link className="logo" href="/" aria-label="HireScore AI home">
      <span className="logoMark"><img src="/hirescore-logo-mark.png" alt="" /></span>
      <span className="logoText">HireScore <strong>AI</strong></span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const productNav = productPages.filter((page) => [
    '/product/ai-resume-parsing',
    '/product/ai-candidate-ranking',
    '/product/ai-explanation-engine',
    '/product/public-apply-page',
    '/product/ai-screening-test',
    '/product/interview-scheduling',
    '/product/candidate-communication',
    '/product/hiring-pipeline',
  ].includes(page.slug))
  const resourceNav = [
    ['/resources/user-guide', 'User Guide'],
    ['/resources/blogs', 'Blogs'],
    ['/resources/case-studies', 'Case Studies'],
    ['/resources/faqs', 'FAQs'],
    ['/resources/release-notes', 'Release Notes'],
  ]

  return (
    <header className="siteHeader">
      <div className="navShell">
        <Logo />
        <nav className="desktopNav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Dropdown label="Product" base="/product" items={productNav.map((p) => [p.slug, p.navLabel])} />
          <Link href="/solutions">Solutions</Link>
          <Dropdown label="Resources" base="/resources" items={resourceNav} />
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="navActions">
          <Link className="btn btnGhost" href="/contact">Book Demo</Link>
          <a className="btn btnPrimary" href={APP_URL}>Start Free Pilot</a>
        </div>
        <button className="menuButton" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="mobileNav" aria-label="Mobile navigation">
          {['/', '/product', '/solutions', '/resources/user-guide', '/resources/blogs', '/resources/case-studies', '/pricing', '/contact'].map((path) => (
            <Link key={path} href={path} onClick={() => setOpen(false)}>{labelFor(path)}</Link>
          ))}
          <a className="btn btnPrimary" href={APP_URL}>Start Free Pilot</a>
        </nav>
      )}
    </header>
  )
}

function Dropdown({ label, base, items }) {
  return (
    <div className="dropdown">
      <Link href={base} className="dropTrigger">{label}<ChevronDown size={15} /></Link>
      <div className="dropMenu">
        {items.map(([href, text]) => <Link href={href} key={href}>{text}</Link>)}
      </div>
    </div>
  )
}

function labelFor(path) {
  const labels = {
    '/': 'Home',
    '/product': 'Product',
    '/solutions': 'Solutions',
    '/resources/user-guide': 'User Guide',
    '/resources/blogs': 'Blogs',
    '/resources/case-studies': 'Case Studies',
    '/pricing': 'Pricing',
    '/contact': 'Contact',
  }
  return labels[path] || path
}

function PageHero({ eyebrow, title, intro, cta = true }) {
  return (
    <section className="pageHero">
      <div className="container heroGrid">
        <div>
          <span className="eyebrow"><Sparkles size={14} />{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          {cta && <ButtonRow />}
        </div>
        <DashboardMockup />
      </div>
    </section>
  )
}

function ButtonRow() {
  return (
    <div className="buttonRow">
      <a className="btn btnPrimary btnLarge" href={APP_URL}>Start Free Pilot <ArrowRight size={18} /></a>
      <Link className="btn btnGhost btnLarge" href="/contact">Book a Demo</Link>
    </div>
  )
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="sectionHeader">
      <span className="eyebrow"><Sparkles size={14} />{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="dashboardFrame">
      <img src="/hirescore-logo-full.png" alt="HireScore AI logo and product identity" className="dashLogo" />
      <div className="mockGrid">
        <div className="metric"><span>AI Score</span><strong>86%</strong></div>
        <div className="metric"><span>Parsed resumes</span><strong>129</strong></div>
        <div className="metric"><span>Shortlisted</span><strong>14</strong></div>
      </div>
      <div className="candidateTable">
        {['Rahul Sharma', 'Ananya Mehta', 'Vikram Rao'].map((name, index) => (
          <div className="tableRow" key={name}>
            <span><strong>{name}</strong><small>Data Analyst</small></span>
            <b>{[86, 79, 72][index]}%</b>
            <em>{['Shortlist', 'Review', 'Hold'][index]}</em>
          </div>
        ))}
      </div>
      <div className="explainBox">
        <BrainCircuit size={20} />
        <p>Strong match because of SQL, reporting, dashboarding, and role-relevant analytics experience.</p>
      </div>
    </div>
  )
}

function FeatureCard({ page }) {
  const Icon = iconMap[page.icon] || FileSearch
  return (
    <Link className="featureCard" href={page.slug}>
      <div className="iconBox"><Icon size={22} /></div>
      <h3>{page.navLabel}</h3>
      <p>{page.intro}</p>
      <span>Learn more <ArrowRight size={15} /></span>
    </Link>
  )
}

function WorkflowSteps() {
  const steps = [
    ['/product/create-job', 'Create Job', BriefcaseBusiness],
    ['/product/public-apply-page', 'Public Apply Page', Globe2],
    ['/product/ai-resume-parsing', 'Resume Screening', SearchCheck],
    ['/product/ai-candidate-ranking', 'AI Ranking', Trophy],
    ['/product/ai-shortlisting', 'Shortlisting', BadgeCheck],
    ['/product/candidate-communication', 'Communication', Send],
    ['/product/interview-scheduling', 'Interview Scheduling', CalendarCheck],
    ['/product/hiring-pipeline', 'Hiring Decision', ShieldCheck],
  ]
  return (
    <div className="workflowGrid">
      {steps.map(([href, text, Icon], index) => (
        <Link className="workflowStep" href={href} key={href}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <Icon size={24} />
          <strong>{text}</strong>
        </Link>
      ))}
    </div>
  )
}

function FAQSection() {
  return (
    <section className="section">
      <div className="container narrow">
        <SectionHeader eyebrow="FAQs" title="Questions recruiters ask before starting" />
        <div className="faqList">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ title = 'Start your free HireScore AI pilot', text = 'Test AI resume screening, candidate ranking, and hiring workflow automation with your real hiring process.' }) {
  return (
    <section className="ctaSection">
      <div className="container ctaBox">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <ButtonRow />
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <SEO title="HireScore AI | AI Hiring Intelligence for Modern Recruiters" description="Create jobs, collect applications, screen resumes, rank candidates, explain AI decisions, schedule interviews, and manage hiring from one platform." path="/" />
      <PageHero
        eyebrow="AI recruitment software"
        title="AI Hiring Intelligence for Modern Recruiters"
        intro="Create jobs, collect applications, screen resumes, rank candidates, explain AI decisions, schedule interviews, and manage your complete hiring process from one platform."
      />
      <TrustStrip />
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Workflow" title="From job creation to hiring decision" text="Every hiring step links to a dedicated product page so recruiters can understand the workflow clearly." />
          <WorkflowSteps />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Features" title="Product-focused AI hiring features" text="HireScore AI brings resume screening, candidate scoring, ranking, explanations, and interview workflows together." />
          <div className="featureGrid">{productPages.map((page) => <FeatureCard page={page} key={page.slug} />)}</div>
        </div>
      </section>
      <section className="section splitSection">
        <div className="container splitGrid">
          <div>
            <SectionHeader eyebrow="How it works" title="Simple enough for recruiters, powerful enough for hiring teams" text="Launch a job, collect applications, let AI structure and score candidate profiles, then move the best candidates forward." />
            <ButtonRow />
          </div>
          <div className="stepsPanel">
            {['Create a job with clear requirements', 'Share a public apply page or upload resumes', 'Review AI-ranked candidates with explanations', 'Shortlist, communicate, test, and schedule interviews'].map((step) => <p key={step}><CheckCircle2 size={18} />{step}</p>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Why HireScore AI" title="Built for recruiter speed and hiring clarity" />
          <div className="threeGrid">
            {['Screen hundreds of resumes faster', 'Explain every candidate score', 'Keep the full pipeline organized'].map((item) => (
              <div className="infoCard" key={item}><Zap size={24} /><h3>{item}</h3><p>Give recruiters a cleaner, faster workflow for modern hiring teams.</p></div>
            ))}
          </div>
        </div>
      </section>
      <FAQSection />
      <CTASection />
    </>
  )
}

function TrustStrip() {
  return (
    <section className="trustStrip">
      <div className="container trustGrid">
        {['AI recruitment software', 'AI resume screening software', 'AI candidate ranking tool', 'AI ATS software', 'Automated hiring pipeline'].map((item) => <span key={item}><CheckCircle2 size={17} />{item}</span>)}
      </div>
    </section>
  )
}

function ProductOverview() {
  return (
    <>
      <SEO title="Product | HireScore AI Recruitment Platform" description="Explore HireScore AI product features for jobs, apply pages, resume parsing, AI scoring, ranking, shortlisting, communication, interviews, and hiring pipelines." path="/product" />
      <PageHero eyebrow="Product overview" title="One AI hiring platform for the complete recruiter workflow" intro="HireScore AI helps recruiters create jobs, collect applications, parse resumes, rank candidates, explain scores, and move candidates to interviews." />
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Product modules" title="Explore every HireScore AI workflow" />
          <div className="featureGrid">{productPages.map((page) => <FeatureCard page={page} key={page.slug} />)}</div>
        </div>
      </section>
      <CTASection />
    </>
  )
}

function ProductDetail({ page }) {
  return (
    <>
      <SEO title={`${page.title} | HireScore AI`} description={page.meta} path={page.slug} />
      <PageHero eyebrow="Product feature" title={page.title} intro={page.intro} />
      <Breadcrumbs items={[['/product', 'Product'], [page.slug, page.navLabel]]} />
      <section className="section">
        <div className="container detailGrid">
          <InfoBlock title="What this feature does" text={page.does} />
          <InfoBlock title="Why recruiters need it" text={page.need} />
          <InfoBlock title="How HireScore AI solves it" text={page.solves} />
        </div>
      </section>
      <section className="section">
        <div className="container splitGrid">
          <div>
            <SectionHeader eyebrow="Key benefits" title="Practical value for recruiters" />
            <ul className="checkList">{page.benefits.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul>
          </div>
          <div>
            <SectionHeader eyebrow="Mini workflow" title="How it fits into hiring" />
            <div className="stepsPanel">{page.workflow.map((item) => <p key={item}><Route size={18} />{item}</p>)}</div>
          </div>
        </div>
      </section>
      <RelatedLinks links={page.related} />
      <CTASection />
    </>
  )
}

function InfoBlock({ title, text }) {
  return <article className="infoCard"><h2>{title}</h2><p>{text}</p></article>
}

function RelatedLinks({ links }) {
  return (
    <section className="section compact">
      <div className="container">
        <h2>Related HireScore AI features</h2>
        <div className="linkGrid">
          {links.map((href) => <Link className="resourceCard" href={href} key={href}>{titleByPath(href)} <ArrowRight size={16} /></Link>)}
        </div>
      </div>
    </section>
  )
}

function titleByPath(path) {
  return productPages.find((p) => p.slug === path)?.navLabel || guidePages.find((p) => p.slug === path)?.title || path.split('/').pop().replaceAll('-', ' ')
}

function ResourceHub() {
  return (
    <>
      <SEO title="Resources | HireScore AI Guides, Blogs, Case Studies and FAQs" description="Explore HireScore AI user guides, recruiting blogs, case studies, FAQs, and release notes for AI-powered hiring teams." path="/resources" />
      <PageHero eyebrow="Resources" title="Hiring resources for AI-powered recruiters" intro="Read guides, blogs, case studies, FAQs, and release notes for using HireScore AI effectively." />
      <section className="section">
        <div className="container resourceGrid">
          {[
            ['/resources/user-guide', 'User Guide', BookOpen],
            ['/resources/blogs', 'Blogs', PenLine],
            ['/resources/case-studies', 'Case Studies', Building2],
            ['/resources/faqs', 'FAQs', HelpCircle],
            ['/resources/release-notes', 'Release Notes', Rocket],
          ].map(([href, title, Icon]) => <Link href={href} className="resourceCard" key={href}><Icon size={24} /><h2>{title}</h2><p>Open {title.toLowerCase()} resources.</p></Link>)}
        </div>
      </section>
    </>
  )
}

function GuideHub() {
  return (
    <>
      <SEO title="User Guide | HireScore AI" description="Step-by-step HireScore AI user guides for creating jobs, sharing apply links, uploading resumes, reviewing ranked candidates, shortlisting, communication, interviews, and tests." path="/resources/user-guide" />
      <PageHero eyebrow="User guide" title="Step-by-step guides for using HireScore AI" intro="Simple instructions for recruiters using HireScore AI from job setup to interview scheduling." />
      <section className="section"><div className="container resourceGrid">{guidePages.map((guide) => <ResourceCard item={guide} key={guide.slug} />)}</div></section>
    </>
  )
}

function GuidePage({ guide }) {
  return (
    <>
      <SEO title={`${guide.title} | HireScore AI User Guide`} description={guide.meta} path={guide.slug} />
      <PageHero eyebrow="User guide" title={guide.title} intro="Follow these simple steps to use HireScore AI in your recruiting workflow." />
      <Breadcrumbs items={[['/resources/user-guide', 'User Guide'], [guide.slug, guide.title]]} />
      <section className="section">
        <div className="container guideLayout">
          <article className="articleCard">
            <h2>Steps</h2>
            {guide.steps.map((step, index) => <p key={step}><strong>Step {index + 1}:</strong> {step}</p>)}
            <h2>Common mistakes</h2>
            <p>Avoid using the wrong job pipeline, incomplete job descriptions, or skipping AI explanations before shortlisting.</p>
            <h2>Best practices</h2>
            <p>Keep job criteria clear, review AI explanations, and move candidates through the pipeline as soon as decisions are made.</p>
            <a className="btn btnPrimary" href={APP_URL}>Open HireScore AI</a>
          </article>
          <aside className="sideCard">
            <h3>Related product feature</h3>
            <Link href={guide.productLink}>{titleByPath(guide.productLink)} <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </section>
    </>
  )
}

function BlogList() {
  return (
    <>
      <SEO title="Blogs | HireScore AI Recruitment Insights" description="Read HireScore AI blogs about AI resume screening, candidate ranking, public apply pages, shortlisting, and AI hiring automation." path="/resources/blogs" />
      <PageHero eyebrow="Blogs" title="AI recruitment insights for modern hiring teams" intro="Starter articles for recruiters learning how AI can support resume screening, ranking, shortlisting, and hiring automation." />
      <section className="section"><div className="container resourceGrid">{blogPosts.map((post) => <ResourceCard item={post} key={post.slug} />)}</div></section>
    </>
  )
}

function BlogPost({ post }) {
  return (
    <>
      <SEO title={`${post.title} | HireScore AI Blog`} description={post.meta} path={post.slug} />
      <PageHero eyebrow="Blog" title={post.title} intro={post.meta} cta={false} />
      <Breadcrumbs items={[['/resources/blogs', 'Blogs'], [post.slug, post.title]]} />
      <section className="section">
        <article className="container articleCard">
          <p>{post.meta}</p>
          {post.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
          <h2>Related HireScore AI pages</h2>
          <div className="inlineLinks">{post.links.map((href) => <Link href={href} key={href}>{titleByPath(href)}</Link>)}</div>
          <ButtonRow />
        </article>
      </section>
    </>
  )
}

function CaseStudyList() {
  return (
    <>
      <SEO title="Case Studies | HireScore AI" description="Explore generic demo case studies for AI resume screening, candidate shortlisting, and public apply page workflows." path="/resources/case-studies" />
      <PageHero eyebrow="Case studies" title="Demo case studies for AI-powered hiring workflows" intro="These generic examples show how recruiting teams can use HireScore AI. They are sample scenarios, not named client claims." />
      <section className="section"><div className="container resourceGrid">{caseStudies.map((study) => <ResourceCard item={study} key={study.slug} />)}</div></section>
    </>
  )
}

function CaseStudyPage({ study }) {
  return (
    <>
      <SEO title={`${study.title} | HireScore AI Case Study`} description={study.meta} path={study.slug} />
      <PageHero eyebrow="Sample case study" title={study.title} intro={study.summary} />
      <Breadcrumbs items={[['/resources/case-studies', 'Case Studies'], [study.slug, study.title]]} />
      <section className="section">
        <article className="container articleCard">
          <p><strong>Note:</strong> This is a generic demo case study using placeholder scenarios for product education.</p>
          <h2>Challenge</h2>
          <p>The recruiting team needed to reduce manual screening work while keeping candidate decisions clear and organized.</p>
          <h2>Solution</h2>
          <p>The team used HireScore AI for structured job setup, resume screening, candidate scoring, ranking, and workflow tracking.</p>
          <h2>Results</h2>
          <ul className="checkList">{study.results.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul>
          <div className="inlineLinks"><Link href="/pricing">View pricing</Link><Link href="/contact">Book demo</Link></div>
        </article>
      </section>
    </>
  )
}

function ResourceCard({ item }) {
  return (
    <Link className="resourceCard" href={item.slug}>
      <BookOpen size={24} />
      <h2>{item.title}</h2>
      <p>{item.meta || item.summary}</p>
      <span>Read more <ArrowRight size={15} /></span>
    </Link>
  )
}

function PricingPage() {
  return (
    <>
      <SEO title="Pricing | HireScore AI" description="Explore HireScore AI pricing blocks for Free Pilot, Starter, Growth, and Enterprise plans with 7-day pilot access for selected early clients." path="/pricing" />
      <PageHero eyebrow="Pricing" title="Simple pricing for AI-powered hiring teams" intro="7-day free pilot access available for selected early clients. Choose a starting point that fits your hiring workflow." />
      <section className="section"><div className="container pricingGrid">{pricingPlans.map(([name, text, items]) => <PricingCard key={name} name={name} text={text} items={items} />)}</div></section>
      <CTASection />
    </>
  )
}

function PricingCard({ name, text, items }) {
  return (
    <article className="pricingCard">
      <span>{name === 'Free Pilot' ? 'Available now' : 'Pilot pricing'}</span>
      <h2>{name}</h2>
      <p>{text}</p>
      <ul>{items.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
      <a className="btn btnPrimary" href={APP_URL}>Start Free Pilot</a>
    </article>
  )
}

function ContactPage() {
  return (
    <>
      <SEO title="Contact HireScore AI | Book Demo or Request Pilot Access" description="Contact HireScore AI to book a demo, request pilot access, or discuss AI resume screening and hiring workflow automation." path="/contact" />
      <PageHero eyebrow="Contact" title="Request a HireScore AI demo or free pilot" intro="Recruiters, HR teams, startups, staffing agencies, and hiring managers can request pilot access or ask questions about the platform." cta={false} />
      <section className="section">
        <div className="container contactGrid">
          <form className="demoForm" onSubmit={(event) => event.preventDefault()}>
            <label>Name<input type="text" placeholder="Your name" required /></label>
            <label>Work email<input type="email" placeholder="you@company.com" required /></label>
            <label>Company name<input type="text" placeholder="Company" /></label>
            <label>Hiring volume<select defaultValue=""><option value="" disabled>Select hiring volume</option><option>1 to 5 roles</option><option>6 to 20 roles</option><option>20+ roles</option></select></label>
            <label className="fullField">Message<textarea rows="5" placeholder="Tell us about your hiring workflow" /></label>
            <button className="btn btnPrimary" type="submit">Request Demo</button>
          </form>
          <aside className="sideCard">
            <h2>Book demo or start pilot</h2>
            <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or start directly from the app CTA.</p>
            <a className="btn btnPrimary" href={APP_URL}>Start Free Pilot</a>
          </aside>
        </div>
      </section>
    </>
  )
}

function SolutionsPage() {
  return (
    <>
      <SEO title="Solutions | HireScore AI for Recruiters, HR Teams and Staffing Agencies" description="HireScore AI solutions for recruiters, HR teams, startups, hiring managers, staffing agencies, and small-to-mid companies." path="/solutions" />
      <PageHero eyebrow="Solutions" title="AI hiring workflows for every recruiting team" intro="HireScore AI supports recruiters, HR teams, startups, hiring managers, staffing agencies, and small-to-mid companies." />
      <section className="section"><div className="container threeGrid">{['Recruiters', 'HR teams', 'Startups', 'Hiring managers', 'Staffing agencies', 'SMB companies'].map((name) => <div className="infoCard" key={name}><UsersRound size={24} /><h2>{name}</h2><p>Use AI resume screening, candidate ranking, and workflow automation to hire faster with clearer decisions.</p></div>)}</div></section>
      <CTASection />
    </>
  )
}

function SimplePage({ type }) {
  const config = {
    '/resources/faqs': ['FAQs', 'Frequently asked questions about HireScore AI', 'Find answers about AI resume screening, candidate ranking, free pilots, and hiring workflow automation.'],
    '/resources/release-notes': ['Release Notes', 'HireScore AI release notes', 'Product updates for AI resume screening, candidate ranking, apply pages, and hiring workflow improvements.'],
    '/privacy': ['Privacy Policy', 'HireScore AI privacy policy', 'This placeholder privacy page can be updated with your final legal policy before launch.'],
    '/terms': ['Terms', 'HireScore AI terms', 'This placeholder terms page can be updated with your final legal terms before launch.'],
  }[type]
  return (
    <>
      <SEO title={`${config[0]} | HireScore AI`} description={config[2]} path={type} />
      <PageHero eyebrow={config[0]} title={config[1]} intro={config[2]} />
      {type === '/resources/faqs' ? <FAQSection /> : <CTASection />}
    </>
  )
}

function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map(([href, label]) => <span key={href}>/<Link href={href}>{label}</Link></span>)}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div>
          <Logo />
          <p>HireScore AI is an AI-powered recruitment and ATS platform for resume screening, candidate ranking, explainable AI, and hiring workflow automation.</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={APP_URL}>App login and start pilot</a>
        </div>
        <FooterCol title="Product" links={productPages.slice(0, 8).map((p) => [p.slug, p.navLabel])} />
        <FooterCol title="Resources" links={[['/resources/user-guide', 'User Guide'], ['/resources/blogs', 'Blogs'], ['/resources/case-studies', 'Case Studies'], ['/resources/faqs', 'FAQs']]} />
        <FooterCol title="Company" links={[['/pricing', 'Pricing'], ['/contact', 'Contact'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms']]} />
      </div>
      <div className="container footerBottom">Copyright 2026 HireScore AI. All rights reserved.</div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3>{title}</h3>
      {links.map(([href, text]) => <Link href={href} key={href}>{text}</Link>)}
    </div>
  )
}

function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | HireScore AI" description="The requested HireScore AI page could not be found." path={window.location.pathname} />
      <PageHero eyebrow="404" title="Page not found" intro="This page does not exist yet. Use the navigation to explore HireScore AI." />
    </>
  )
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path.replace(/\/$/, '') || '/'
}

function renderRoute(path) {
  if (path === '/') return <HomePage />
  if (path === '/product') return <ProductOverview />
  if (path === '/solutions') return <SolutionsPage />
  if (path === '/resources') return <ResourceHub />
  if (path === '/resources/user-guide') return <GuideHub />
  if (path === '/resources/blogs') return <BlogList />
  if (path === '/resources/case-studies') return <CaseStudyList />
  if (path === '/pricing') return <PricingPage />
  if (path === '/contact') return <ContactPage />
  if (['/resources/faqs', '/resources/release-notes', '/privacy', '/terms'].includes(path)) return <SimplePage type={path} />
  const product = productPages.find((page) => page.slug === path)
  if (product) return <ProductDetail page={product} />
  const guide = guidePages.find((page) => page.slug === path)
  if (guide) return <GuidePage guide={guide} />
  const post = blogPosts.find((page) => page.slug === path)
  if (post) return <BlogPost post={post} />
  const study = caseStudies.find((page) => page.slug === path)
  if (study) return <CaseStudyPage study={study} />
  return <NotFound />
}

export default function App() {
  const path = usePath()
  return (
    <div className="app">
      <Header />
      <main>{renderRoute(path)}</main>
      <Footer />
    </div>
  )
}
