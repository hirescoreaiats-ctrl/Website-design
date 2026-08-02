export const SITE_URL = 'https://hirescoreai.com'
export const BRAND_NAME = 'HireScoreAI'
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const FOUNDER_ID = `${SITE_URL}/#sachin-yadav`
export const DEFAULT_OG_IMAGE = `${SITE_URL}/hirescore-logo-full.png`
export const DEFAULT_DESCRIPTION = 'HireScoreAI is an AI recruitment workflow platform for resume screening, JD matching, candidate ranking, explainable shortlisting, communication, and interview scheduling.'
export const HOME_H1 = 'AI Resume Screening and Candidate Ranking Software for Recruiters'
export const OFFICIAL_SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/@HireScoreAI',
  linkedin: 'https://www.linkedin.com/company/hire-score-a',
  instagram: 'https://www.instagram.com/hirescore_ai/',
}

export const STATIC_ROUTE_H1S = {
  '/': HOME_H1,
  '/product/hirescore-ai': 'One AI hiring workspace for faster, clearer decisions.',
  '/pricing': 'Simple pricing for AI-powered hiring teams',
  '/solutions/recruitment-agencies': 'AI recruiting software for recruitment agencies Screen more resumes. Send better shortlists to clients.',
  '/solutions/staffing-companies': 'AI resume screening for staffing companies Manage candidate pipelines for multiple roles.',
  '/solutions/bulk-resume-screening': 'Bulk resume screening software for high-volume hiring Upload resumes. Get ranked candidates. Save recruiter time.',
  '/product/ai-candidate-scoring': 'JD-Based AI Candidate Scoring for Recruiters',
  '/product/ai-candidate-ranking': 'AI Candidate Ranking Tool for Faster Shortlists',
  '/resources/blogs': 'AI recruitment insights for faster, smarter hiring',
  '/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time': 'How AI Resume Screening Helps Recruiters Save Time and Improve Shortlist Quality',
}

export function canonicalUrlForPath(path = '/') {
  const normalized = normalizePath(path)
  return `${SITE_URL}${normalized === '/' ? '/' : `${normalized}/`}`
}

const staticRoutes = [
  ['/', 'AI Resume Screening Software for Recruiters | HireScoreAI', 'HireScoreAI is AI resume screening software for JD-based candidate scoring, explainable ranking, shortlisting, and connected recruitment automation.', 'WebPage'],
  ['/product/hirescore-ai', 'HireScoreAI Product | AI Resume Screening Software', 'Explore HireScoreAI for AI resume screening, JD-based candidate scoring, candidate ranking, smart shortlisting, and recruiter-ready explanations.', 'WebPage'],
  ['/solutions', 'AI Hiring Solutions for Recruiters & Staffing Agencies | HireScoreAI', 'HireScoreAI helps recruitment agencies, HR teams, staffing firms, startups, and high-volume hiring teams screen resumes, rank candidates, shortlist talent, and manage hiring workflows with AI.', 'CollectionPage'],
  ['/resources', 'AI Recruitment Resources, Guides & Case Studies | HireScoreAI', 'Explore practical AI recruitment guides, articles, sample case studies, FAQs, and product updates from HireScoreAI.', 'CollectionPage'],
  ['/resources/user-guide', 'HireScoreAI User Guide | Recruiter Workflow Tutorials', 'Follow step-by-step HireScoreAI guides for jobs, apply links, resume uploads, ranked candidates, shortlisting, communication, screening tests, and interviews.', 'CollectionPage'],
  ['/resources/blogs', 'AI Recruitment Blog | Resume Screening & Hiring Automation', 'Read practical articles about AI resume screening, JD matching, candidate ranking, shortlisting, explainable AI, and recruitment workflow automation.', 'CollectionPage'],
  ['/resources/case-studies', 'AI Recruitment Workflow Case Studies | HireScoreAI', 'Explore sample HireScoreAI case studies covering resume screening, candidate shortlisting, and public application workflows.', 'CollectionPage'],
  ['/resources/faqs', 'HireScoreAI FAQs | AI Resume Screening & Recruitment', 'Find answers about HireScoreAI, AI resume screening, candidate ranking, free pilot access, recruiter control, and hiring workflow automation.', 'FAQPage'],
  ['/resources/release-notes', 'HireScoreAI Release Notes | Product Updates', 'Follow HireScoreAI product updates for resume screening, candidate ranking, public apply pages, communication, and interview workflows.', 'CollectionPage'],
  ['/pricing', 'HireScoreAI Pricing | INR Plans from 599 per Month', 'Compare HireScoreAI pricing: Free Pilot for 7 days, Starter at INR 599/month, Growth at INR 1,599/month, and Enterprise custom pricing.', 'WebPage'],
  ['/contact', 'Contact HireScoreAI | Book a Demo or Request a Pilot', 'Contact HireScoreAI to book a demo, request pilot access, or discuss AI resume screening, candidate ranking, and recruitment automation.', 'ContactPage'],
  ['/privacy', 'Privacy Policy | HireScoreAI', 'Read the HireScoreAI privacy policy for information about website and recruitment platform data practices.', 'WebPage', true],
  ['/terms', 'Terms of Use | HireScoreAI', 'Read the terms that apply to the HireScoreAI website and recruitment workflow platform.', 'WebPage', true],
]

const productRoutes = [
  ['/product/jd-manager', 'JD Manager for Recruitment Agencies | HireScoreAI', 'Use JD Manager, a free open-source JD workspace for recruitment agencies and staffing teams to manage clients, JDs, candidates, shortlist scores, submissions, and pipeline status.'],
  ['/product/create-job', 'AI Job Creation Software for Recruiters | HireScoreAI', 'Create structured jobs in HireScoreAI so recruiters can collect applications, screen resumes, and manage every hiring stage from one connected workflow.'],
  ['/product/public-apply-page', 'Public Job Apply Pages for Recruiters | HireScoreAI', 'Generate shareable public job apply pages to collect candidate details and resumes directly into an organized hiring pipeline.'],
  ['/product/resume-upload', 'Bulk Resume Upload for Hiring Teams | HireScoreAI', 'Upload and organize resumes in HireScoreAI for AI parsing, JD matching, candidate scoring, ranking, and shortlisting.'],
  ['/product/ai-resume-parsing', 'AI Resume Parser for Recruiters | HireScoreAI', 'Use HireScoreAI as a resume parser for recruiters to extract candidate skills, experience, education, and job-fit signals for faster screening.'],
  ['/product/ai-candidate-scoring', 'JD-Based Resume Scoring Software | HireScoreAI', 'Score resumes against job descriptions using skills, experience, semantic match, profile quality, and explainable role-fit evidence.'],
  ['/product/ai-candidate-ranking', 'AI Candidate Ranking Software for Recruiters | HireScoreAI', 'Rank candidates automatically by job fit, matched skills, missing skills, experience, and explainable AI evidence.'],
  ['/product/ai-shortlisting', 'Resume Shortlisting Software | HireScoreAI', 'Shortlist stronger candidates faster with resume shortlisting software that uses JD-based scores, ranked profiles, skill evidence, and recruiter-friendly AI explanations.'],
  ['/product/ai-explanation-engine', 'Explainable AI for Recruitment Decisions | HireScoreAI', 'Understand candidate scores through matched skills, skill gaps, relevant experience, semantic job fit, and transparent AI explanations.'],
  ['/product/candidate-communication', 'Candidate Communication Workflow Software | HireScoreAI', 'Keep candidate outreach and hiring status connected to screening, shortlisting, tests, and interview scheduling.'],
  ['/product/interview-scheduling', 'AI Interview Scheduling Workflow | HireScoreAI', 'Use AI interview scheduling workflow support to move qualified candidates from shortlist to interview while preserving hiring context.'],
  ['/product/ai-screening-test', 'AI Screening Tests for Candidate Validation | HireScoreAI', 'Validate shortlisted candidates with role-specific AI screening tests before progressing them to interviews.'],
  ['/product/hiring-pipeline', 'AI Hiring Pipeline & Recruitment Workflow Software | HireScoreAI', 'Manage job creation, applications, resume screening, ranking, shortlisting, communication, tests, and interviews in one hiring pipeline.'],
]

export const solutionSegmentRoutes = [
  {
    path: '/solutions/recruitment-agencies',
    navLabel: 'Recruitment Agencies',
    title: 'AI Recruiting Software for Recruitment Agencies | HireScoreAI',
    description: 'AI recruiting software for recruitment agencies to screen resume batches, rank candidates by JD fit, and create client-ready shortlists with explainable evidence.',
  },
  {
    path: '/solutions/staffing-companies',
    navLabel: 'Staffing Companies',
    title: 'AI Resume Screening for Staffing Companies | HireScoreAI',
    description: 'AI resume screening for staffing companies and consulting firms that need faster bench matching, role-fit candidate ranking, and client-ready shortlist evidence.',
  },
  {
    path: '/solutions/hr-teams',
    navLabel: 'HR Teams',
    title: 'AI Hiring Software for HR Teams | HireScoreAI',
    description: 'AI hiring software for HR teams to create jobs, collect applications, rank applicants, explain candidate fit, and move qualified profiles into interviews.',
  },
  {
    path: '/solutions/startups',
    navLabel: 'Startups',
    title: 'AI Resume Screening for Startups & SMBs | HireScoreAI',
    description: 'AI resume screening for startups and SMBs that need faster applicant review, JD-based candidate ranking, and explainable shortlists without a large HR team.',
  },
  {
    path: '/solutions/bulk-resume-screening',
    navLabel: 'Bulk Resume Screening',
    title: 'Bulk Resume Screening Software | HireScoreAI',
    description: 'Bulk resume screening software for high-volume hiring teams to process large resume batches, rank candidates by JD fit, and review shortlist evidence.',
  },
  {
    path: '/solutions/tech-hiring',
    navLabel: 'IT & Tech Hiring',
    title: 'AI Technical Candidate Screening Software | HireScoreAI',
    description: 'AI technical candidate screening software for IT recruiters to match skills, rank technical resumes, review gaps, and prepare stronger shortlists.',
  },
]

export const comparisonRoutes = [
  {
    path: '/compare/hirescoreai-vs-hiredscore',
    navLabel: 'HireScoreAI vs HiredScore',
    title: 'HireScoreAI vs HiredScore: Is HireScoreAI the Same Platform? | 2026',
    description: 'HireScoreAI is an independent AI recruitment platform and is not affiliated with HiredScore, HireScore.com, or Workday. See how the platforms differ.',
  },
  {
    path: '/compare/hirescoreai-vs-zoho-recruit',
    navLabel: 'HireScoreAI vs Zoho Recruit',
    title: 'HireScoreAI vs Zoho Recruit | AI Resume Screening Comparison | 2026',
    description: 'Compare HireScoreAI and Zoho Recruit for AI resume screening, candidate ranking, hiring workflows, and recruiter-focused shortlist review.',
  },
  {
    path: '/compare/hirescoreai-vs-manatal',
    navLabel: 'HireScoreAI vs Manatal',
    title: 'HireScoreAI vs Manatal: AI Recruiting Software Compared | 2026',
    description: "See how HireScoreAI's explainable AI candidate scoring compares with Manatal's broader recruiting suite, including screening focus, setup, and hiring workflow fit.",
  },
  {
    path: '/compare/hirescoreai-vs-workable',
    navLabel: 'HireScoreAI vs Workable',
    title: 'HireScoreAI vs Workable: AI ATS Comparison | 2026',
    description: 'Compare HireScoreAI and Workable on AI screening, candidate evaluation, pricing clarity, and hiring workflow fit for growing teams.',
  },
  {
    path: '/compare/hirescoreai-vs-greenhouse',
    navLabel: 'HireScoreAI vs Greenhouse',
    title: 'HireScoreAI vs Greenhouse: AI ATS Comparison | 2026',
    description: 'Compare HireScoreAI and Greenhouse on AI screening, setup effort, pricing clarity, and fit for recruitment teams, startups, and HR teams.',
  },
]

const guideRoutes = [
  ['/resources/user-guide/create-a-job', 'How to Create a Job in HireScoreAI', 'Create a structured job in HireScoreAI with role details, skills, hiring criteria, and a connected candidate pipeline.', ['Open the job workspace and choose Create Job.', 'Add the role title, description, skills, and hiring criteria.', 'Save the job and review the pipeline stages.']],
  ['/resources/user-guide/share-public-apply-link', 'How to Share a Public Job Apply Link', 'Generate and share a HireScoreAI public apply link so candidates can submit applications and resumes for the correct role.', ['Open the job you want to promote.', 'Generate or copy the public apply page link.', 'Share it on job boards, email, or social channels.']],
  ['/resources/user-guide/upload-resumes', 'How to Upload Resumes in HireScoreAI', 'Upload resumes to a HireScoreAI job pipeline and prepare candidate profiles for AI parsing, screening, and ranking.', ['Open the correct job pipeline.', 'Upload resumes in bulk or review applications from the apply page.', 'Start parsing and screening candidates.']],
  ['/resources/user-guide/review-ai-ranked-candidates', 'How to Review AI-Ranked Candidates', 'Review ranked candidates in HireScoreAI using job-fit scores, skill evidence, and transparent AI explanations.', ['Open the candidate ranking view.', 'Sort or filter by AI score and skill match.', 'Open top profiles to review explanations.']],
  ['/resources/user-guide/shortlist-candidates', 'How to Shortlist Candidates in HireScoreAI', 'Shortlist candidates using AI scores, matched skills, skill gaps, role-fit evidence, and recruiter judgment.', ['Review score, matched skills, and missing skills.', 'Compare candidate explanation with the role requirements.', 'Move qualified candidates to shortlist.']],
  ['/resources/user-guide/move-to-communication', 'How to Move Candidates to Communication', 'Move shortlisted candidates into communication and keep outreach connected to the HireScoreAI hiring workflow.', ['Select shortlisted candidates.', 'Move them to the communication stage.', 'Send outreach or prepare the next update.']],
  ['/resources/user-guide/schedule-interviews', 'How to Schedule Interviews in HireScoreAI', 'Schedule interviews for shortlisted candidates while preserving job, screening, and communication context.', ['Open a candidate in communication or shortlist stage.', 'Choose the interview step.', 'Confirm time and move the candidate forward.']],
  ['/resources/user-guide/run-ai-screening-test', 'How to Run an AI Candidate Screening Test', 'Assign an AI screening test, review candidate results, and use the evidence before interview scheduling.', ['Select candidates who need validation.', 'Create or assign the screening test.', 'Review test results before interview scheduling.']],
]

const blogRoutes = [
  ['/resources/blogs/hire-through-conversation-action-ai-agent', 'AI ATS Action Agent for Conversational Recruitment | HireScoreAI', 'Learn how HireScoreAI’s AI ATS Action Agent supports conversational recruitment, from job creation and resume screening to candidate ranking, communication and interviews—with recruiter approval.', 'AI Recruitment Automation', `${SITE_URL}/conversational-ai-recruitment-hero.png`, '2026-07-26', '2026-08-02', 'BlogPosting'],
  ['/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time', 'How AI Resume Screening Saves Recruiters Time | HireScoreAI', 'Learn how AI resume screening reduces manual resume review, structures candidate profiles, improves JD matching, and helps recruiters build stronger shortlists faster.', 'AI Resume Screening', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/what-is-candidate-ranking-and-why-it-matters', 'What Is Candidate Ranking in Recruitment? | HireScoreAI', 'Understand candidate ranking and how JD-based AI scoring, skill matching, gap analysis, and explainable evidence help recruiters prioritize applicants.', 'Candidate Ranking', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/how-to-create-a-public-job-apply-page-for-faster-hiring', 'How to Create a Public Job Apply Page | HireScoreAI', 'Learn how public job apply pages simplify candidate intake, organize resume collection, and connect applications with AI resume screening.', 'Public Apply Page', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/ai-in-recruitment-benefits-risks-and-best-practices', 'AI in Recruitment: Benefits, Risks & Best Practices', 'Explore AI recruitment benefits, responsible-use risks, recruiter oversight, explainable resume screening, and practical hiring best practices.', 'AI Recruitment', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/how-to-shortlist-candidates-faster-without-losing-quality', 'How to Shortlist Candidates Faster Without Losing Quality', 'Learn how AI scoring, candidate ranking, skill evidence, gap analysis, and explainable decisions help recruiters shortlist faster without reducing quality.', 'AI Shortlisting', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/complete-guide-to-ai-powered-hiring-automation', 'Complete Guide to AI-Powered Hiring Automation', 'Explore AI hiring automation from job creation and applications to resume screening, candidate ranking, shortlisting, communication, tests, and interviews.', 'Hiring Automation', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'],
]

const caseStudyRoutes = [
  ['/resources/case-studies/startup-reduced-resume-screening-time', 'Startup Resume Screening Case Study | HireScoreAI', 'A transparent sample case study showing how a startup could reduce manual resume screening time using an AI-powered hiring workflow.'],
  ['/resources/case-studies/recruiting-team-improved-shortlisting-quality', 'Candidate Shortlisting Case Study | HireScoreAI', 'A transparent sample case study showing how candidate ranking and explainable AI could improve shortlist consistency.'],
  ['/resources/case-studies/public-apply-pages-improved-application-collection', 'Public Apply Page Case Study | HireScoreAI', 'A transparent sample case study showing how role-specific apply pages could simplify candidate application and resume collection.'],
]

const breadcrumbFor = (path, label, parentPath, parentLabel) => [
  { name: 'Home', path: '/' },
  ...(parentPath ? [{ name: parentLabel, path: parentPath }] : []),
  { name: label, path },
]

export const SEO_ROUTES = [
  ...staticRoutes.map(([path, title, description, pageType, noindex = false]) => ({ path, title, description, pageType: pageType === 'FAQPage' ? 'WebPage' : pageType, schemaKind: pageType === 'FAQPage' ? 'faq' : undefined, noindex })),
  ...productRoutes.map(([path, title, description]) => ({ path, title, description, pageType: 'WebPage', breadcrumbs: breadcrumbFor(path, title.replace(/ \|.*$/, ''), '/product/hirescore-ai', 'HireScoreAI') })),
  ...solutionSegmentRoutes.map(({ path, title, description, navLabel }) => ({ path, title, description, pageType: 'WebPage', breadcrumbs: breadcrumbFor(path, navLabel, '/solutions', 'Solutions') })),
  ...comparisonRoutes.map(({ path, title, description, navLabel }) => ({ path, title, description, pageType: 'WebPage', breadcrumbs: breadcrumbFor(path, navLabel) })),
  ...guideRoutes.map(([path, title, description, steps]) => ({ path, title: `${title} | HireScoreAI Guide`, description, pageType: 'WebPage', schemaKind: 'howto', steps, breadcrumbs: breadcrumbFor(path, title, '/resources/user-guide', 'User Guide') })),
  ...blogRoutes.map(([path, title, description, category, image, datePublished = '2026-06-28', dateModified = '2026-07-25', articleType = 'Article']) => ({
    path,
    title,
    description,
    pageType: 'WebPage',
    ogType: 'article',
    schemaKind: 'article',
    articleType,
    category,
    image,
    datePublished,
    dateModified,
    breadcrumbs: path === '/resources/blogs/hire-through-conversation-action-ai-agent'
      ? [
          { name: 'Home', path: '/' },
          { name: 'Resources', path: '/resources' },
          { name: 'Blogs', path: '/resources/blogs' },
          { name: 'Hire Through Conversation', path },
        ]
      : breadcrumbFor(path, title.replace(/ \|.*$/, ''), '/resources/blogs', 'Blog'),
  })),
  ...caseStudyRoutes.map(([path, title, description]) => ({ path, title, description, pageType: 'WebPage', ogType: 'article', schemaKind: 'case-study', datePublished: '2026-06-28', dateModified: '2026-07-25', breadcrumbs: breadcrumbFor(path, title.replace(/ \|.*$/, ''), '/resources/case-studies', 'Case Studies') })),
].map((route) => ({
  ...route,
  canonical: canonicalUrlForPath(route.path),
  image: route.image || DEFAULT_OG_IMAGE,
}))

const routeMap = new Map(SEO_ROUTES.map((route) => [route.path, route]))

export function normalizePath(path = '/') {
  const cleaned = path.split('?')[0].split('#')[0].replace(/\/+$/, '')
  return cleaned || '/'
}

export function getSeoConfig(path, fallback = {}) {
  const normalized = normalizePath(path)
  const configured = routeMap.get(normalized)
  if (configured) return configured
  return {
    path: normalized,
    title: fallback.title || `Page Not Found | ${BRAND_NAME}`,
    description: fallback.description || DEFAULT_DESCRIPTION,
    pageType: 'WebPage',
    ogType: fallback.type || 'website',
    canonical: canonicalUrlForPath(normalized),
    image: DEFAULT_OG_IMAGE,
    noindex: true,
  }
}

const organization = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: BRAND_NAME,
  alternateName: ['HireScoreAI', 'HireScoreAI ATS'],
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/hirescore-logo-mark.png`,
    contentUrl: `${SITE_URL}/hirescore-logo-mark.png`,
    width: 365,
    height: 365,
    caption: BRAND_NAME,
  },
  image: { '@id': `${SITE_URL}/#logo` },
  email: 'info@hirescoreai.com',
  description: 'HireScoreAI is an independent AI recruitment workflow platform for recruiters, HR teams, staffing agencies, and growing companies.',
  disambiguatingDescription: 'HireScoreAI is independent and is not affiliated with HiredScore, HireScore.com, Workday, or similarly named products.',
  founder: { '@id': FOUNDER_ID },
  sameAs: Object.values(OFFICIAL_SOCIAL_LINKS),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales and customer support',
    email: 'info@hirescoreai.com',
    availableLanguage: ['English', 'Hindi'],
  },
}

const founder = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Sachin Yadav',
  jobTitle: 'Founder',
  url: FOUNDER_ID,
  worksFor: { '@id': ORGANIZATION_ID },
}

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BRAND_NAME,
  alternateName: 'HireScoreAI',
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
}

const primarySoftware = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/product/hirescore-ai/#software`,
  name: BRAND_NAME,
  description: 'AI recruitment and resume screening platform for JD-based candidate scoring, ranking, smart shortlisting, and recruiter-ready explanations.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: canonicalUrlForPath('/product/hirescore-ai'),
  publisher: { '@id': ORGANIZATION_ID },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    description: 'Seven-day free pilot access is available for selected early clients.',
    url: canonicalUrlForPath('/pricing'),
  },
}

export const HOME_FAQS = [
  ['What is HireScoreAI?', 'HireScoreAI is an independent AI recruitment workflow platform for job creation, public apply pages, resume screening, candidate ranking, explainable shortlisting, communication, tests, and interview scheduling.'],
  ['How does AI resume screening software help recruiters?', 'AI resume screening software structures resume data, compares candidates with job requirements, and helps recruiters prioritize profiles for human review.'],
  ['How does HireScoreAI perform JD-based candidate scoring?', 'HireScoreAI evaluates job requirements, matched skills, relevant experience, and skill gaps to produce a role-specific score with recruiter-readable evidence.'],
  ['Is HireScoreAI an AI ATS software platform?', 'HireScoreAI connects job creation, applications, resume screening, candidate ranking, shortlisting, communication, tests, and interview workflows in one AI-assisted hiring workspace.'],
  ['Can HireScoreAI automate recruitment tasks?', 'Yes. Connected recruitment automation can prepare or complete available workflow actions while recruiters review important actions and retain final hiring control.'],
]

export function buildRouteSchema(config) {
  if (!config || config.noindex) return null
  const pageId = `${config.canonical}#webpage`
  const page = {
    '@type': config.pageType || 'WebPage',
    '@id': pageId,
    url: config.canonical,
    name: config.title,
    description: config.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    primaryImageOfPage: { '@type': 'ImageObject', url: config.image },
    breadcrumb: config.breadcrumbs ? { '@id': `${config.canonical}#breadcrumb` } : undefined,
  }
  const graph = [page]

  if (config.path === '/') {
    graph.unshift(organization, founder, website)
    graph.push({
      '@type': 'FAQPage',
      '@id': `${config.canonical}#faq`,
      mainEntity: HOME_FAQS.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    })
  }

  if (config.path === '/product/hirescore-ai') {
    page.about = { '@id': primarySoftware['@id'] }
    graph.unshift(organization)
    graph.push(primarySoftware)
  }

  if (config.breadcrumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${config.canonical}#breadcrumb`,
      itemListElement: config.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: canonicalUrlForPath(item.path),
      })),
    })
  }

  if (config.schemaKind === 'article' || config.schemaKind === 'case-study') {
    graph.unshift(organization)
    graph.push({
      '@type': config.articleType || 'Article',
      '@id': `${config.canonical}#article`,
      headline: config.renderedH1 || config.title.replace(/ \|.*$/, ''),
      description: config.description,
      image: [config.image],
      articleSection: config.category || 'Sample case study',
      inLanguage: 'en',
      mainEntityOfPage: { '@id': pageId },
      url: config.canonical,
      author: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
      isAccessibleForFree: true,
      datePublished: config.datePublished,
      dateModified: config.dateModified,
    })
  }

  if (config.schemaKind === 'howto') {
    graph.push({
      '@type': 'HowTo',
      '@id': `${config.canonical}#howto`,
      name: config.title.replace(/ \|.*$/, ''),
      description: config.description,
      inLanguage: 'en',
      step: config.steps.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: `Step ${index + 1}`, text, url: `${config.canonical}#step-${index + 1}` })),
    })
  }

  if (config.schemaKind === 'faq') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${config.canonical}#faq`,
      mainEntity: HOME_FAQS.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
