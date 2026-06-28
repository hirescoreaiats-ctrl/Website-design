export const SITE_URL = 'https://hirescoreai.com'
export const BRAND_NAME = 'HireScore AI'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/hirescore-logo-full.png`
export const DEFAULT_DESCRIPTION = 'HireScore AI is an AI recruitment workflow platform for resume screening, JD matching, candidate ranking, explainable shortlisting, communication, and interview scheduling.'

const baseKeywords = ['HireScore AI', 'AI recruitment software', 'AI resume screening', 'candidate ranking software', 'recruitment workflow automation']

export function canonicalUrlForPath(path = '/') {
  const normalized = normalizePath(path)
  return `${SITE_URL}${normalized === '/' ? '/' : `${normalized}/`}`
}

const staticRoutes = [
  ['/', 'HireScore AI | AI Recruitment & Resume Screening Software', 'Screen resumes, match candidates to job descriptions, explain fit, rank talent, manage shortlists, communicate, and schedule interviews with HireScore AI.', 'WebPage'],
  ['/product', 'AI Recruitment Software Features | HireScore AI', 'Explore HireScore AI features for job creation, public apply pages, resume parsing, JD matching, candidate ranking, explainable shortlisting, communication, and interviews.', 'CollectionPage'],
  ['/solutions', 'AI Hiring Solutions for Recruiters & Staffing Agencies | HireScore AI', 'HireScore AI helps recruitment agencies, HR teams, staffing firms, startups, and high-volume hiring teams screen resumes, rank candidates, shortlist talent, and manage hiring workflows with AI.', 'CollectionPage'],
  ['/resources', 'AI Recruitment Resources, Guides & Case Studies | HireScore AI', 'Explore practical AI recruitment guides, articles, sample case studies, FAQs, and product updates from HireScore AI.', 'CollectionPage'],
  ['/resources/user-guide', 'HireScore AI User Guide | Recruiter Workflow Tutorials', 'Follow step-by-step HireScore AI guides for jobs, apply links, resume uploads, ranked candidates, shortlisting, communication, screening tests, and interviews.', 'CollectionPage'],
  ['/resources/blogs', 'AI Recruitment Blog | Resume Screening & Hiring Automation', 'Read practical articles about AI resume screening, JD matching, candidate ranking, shortlisting, explainable AI, and recruitment workflow automation.', 'CollectionPage'],
  ['/resources/case-studies', 'AI Recruitment Workflow Case Studies | HireScore AI', 'Explore sample HireScore AI case studies covering resume screening, candidate shortlisting, and public application workflows.', 'CollectionPage'],
  ['/resources/faqs', 'HireScore AI FAQs | AI Resume Screening & Recruitment', 'Find answers about HireScore AI, AI resume screening, candidate ranking, free pilot access, recruiter control, and hiring workflow automation.', 'FAQPage'],
  ['/resources/release-notes', 'HireScore AI Release Notes | Product Updates', 'Follow HireScore AI product updates for resume screening, candidate ranking, public apply pages, communication, and interview workflows.', 'CollectionPage'],
  ['/pricing', 'HireScore AI Pricing | Start a Free Recruitment Software Pilot', 'Explore HireScore AI Free Pilot, Starter, Growth, and Enterprise options for AI resume screening and connected hiring workflows.', 'WebPage'],
  ['/contact', 'Contact HireScore AI | Book a Demo or Request a Pilot', 'Contact HireScore AI to book a demo, request pilot access, or discuss AI resume screening, candidate ranking, and recruitment automation.', 'ContactPage'],
  ['/privacy', 'Privacy Policy | HireScore AI', 'Read the HireScore AI privacy policy for information about website and recruitment platform data practices.', 'WebPage', true],
  ['/terms', 'Terms of Use | HireScore AI', 'Read the terms that apply to the HireScore AI website and recruitment workflow platform.', 'WebPage', true],
]

const productRoutes = [
  ['/product/create-job', 'AI Job Creation Software for Recruiters | HireScore AI', 'Create structured jobs in HireScore AI so recruiters can collect applications, screen resumes, and manage every hiring stage from one connected workflow.'],
  ['/product/public-apply-page', 'Public Job Apply Pages for Recruiters | HireScore AI', 'Generate shareable public job apply pages to collect candidate details and resumes directly into an organized hiring pipeline.'],
  ['/product/resume-upload', 'Bulk Resume Upload for Hiring Teams | HireScore AI', 'Upload and organize resumes in HireScore AI for AI parsing, JD matching, candidate scoring, ranking, and shortlisting.'],
  ['/product/ai-resume-parsing', 'AI Resume Parser for Recruiters | HireScore AI', 'Use HireScore AI as a resume parser for recruiters to extract candidate skills, experience, education, and job-fit signals for faster screening.'],
  ['/product/ai-candidate-scoring', 'JD-Based Resume Scoring Software | HireScore AI', 'Score resumes against job descriptions using skills, experience, semantic match, profile quality, and explainable role-fit evidence.'],
  ['/product/ai-candidate-ranking', 'AI Candidate Ranking Software for Recruiters | HireScore AI', 'Rank candidates automatically by job fit, matched skills, missing skills, experience, and explainable AI evidence.'],
  ['/product/ai-shortlisting', 'Resume Shortlisting Software | HireScore AI', 'Shortlist stronger candidates faster with resume shortlisting software that uses JD-based scores, ranked profiles, skill evidence, and recruiter-friendly AI explanations.'],
  ['/product/ai-explanation-engine', 'Explainable AI for Recruitment Decisions | HireScore AI', 'Understand candidate scores through matched skills, skill gaps, relevant experience, semantic job fit, and transparent AI explanations.'],
  ['/product/candidate-communication', 'Candidate Communication Workflow Software | HireScore AI', 'Keep candidate outreach and hiring status connected to screening, shortlisting, tests, and interview scheduling.'],
  ['/product/interview-scheduling', 'AI Interview Scheduling Workflow | HireScore AI', 'Use AI interview scheduling workflow support to move qualified candidates from shortlist to interview while preserving hiring context.'],
  ['/product/ai-screening-test', 'AI Screening Tests for Candidate Validation | HireScore AI', 'Validate shortlisted candidates with role-specific AI screening tests before progressing them to interviews.'],
  ['/product/hiring-pipeline', 'AI Hiring Pipeline & Recruitment Workflow Software | HireScore AI', 'Manage job creation, applications, resume screening, ranking, shortlisting, communication, tests, and interviews in one hiring pipeline.'],
]

export const solutionSegmentRoutes = [
  {
    path: '/solutions/recruitment-agencies',
    navLabel: 'Recruitment Agencies',
    title: 'AI Recruiting Software for Recruitment Agencies | HireScore AI',
    description: 'HireScore AI helps recruitment agencies screen more resumes, rank candidates by JD fit, create recruiter-ready shortlists, and share explainable insights with clients.',
  },
  {
    path: '/solutions/staffing-companies',
    navLabel: 'Staffing Companies',
    title: 'AI Resume Screening for Staffing Companies | HireScore AI',
    description: 'HireScore AI helps staffing companies and consulting firms process resumes faster, manage role-fit candidate pipelines, and prepare client-ready shortlists.',
  },
  {
    path: '/solutions/hr-teams',
    navLabel: 'HR Teams',
    title: 'AI Hiring Software for HR Teams | HireScore AI',
    description: 'HireScore AI helps in-house HR teams create jobs, collect applications, rank candidates, shortlist talent, and move qualified profiles into interviews.',
  },
  {
    path: '/solutions/startups',
    navLabel: 'Startups',
    title: 'AI Resume Screening for Startups & SMBs | HireScore AI',
    description: 'HireScore AI helps startups and SMBs screen resumes, compare candidates, and focus small hiring teams on the most relevant applicants faster.',
  },
  {
    path: '/solutions/bulk-resume-screening',
    navLabel: 'Bulk Resume Screening',
    title: 'Bulk Resume Screening Software | HireScoreAI',
    description: 'Screen large resume batches faster with HireScoreAI, using AI candidate ranking and recruiter-ready explanations for high-volume hiring workflows.',
  },
  {
    path: '/solutions/tech-hiring',
    navLabel: 'IT & Tech Hiring',
    title: 'AI Technical Candidate Screening Software | HireScoreAI',
    description: 'Help recruiters screen technical resumes faster with AI-powered skill matching, candidate ranking, and explainable shortlist insights.',
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
  ['/resources/user-guide/create-a-job', 'How to Create a Job in HireScore AI', 'Create a structured job in HireScore AI with role details, skills, hiring criteria, and a connected candidate pipeline.', ['Open the job workspace and choose Create Job.', 'Add the role title, description, skills, and hiring criteria.', 'Save the job and review the pipeline stages.']],
  ['/resources/user-guide/share-public-apply-link', 'How to Share a Public Job Apply Link', 'Generate and share a HireScore AI public apply link so candidates can submit applications and resumes for the correct role.', ['Open the job you want to promote.', 'Generate or copy the public apply page link.', 'Share it on job boards, email, or social channels.']],
  ['/resources/user-guide/upload-resumes', 'How to Upload Resumes in HireScore AI', 'Upload resumes to a HireScore AI job pipeline and prepare candidate profiles for AI parsing, screening, and ranking.', ['Open the correct job pipeline.', 'Upload resumes in bulk or review applications from the apply page.', 'Start parsing and screening candidates.']],
  ['/resources/user-guide/review-ai-ranked-candidates', 'How to Review AI-Ranked Candidates', 'Review ranked candidates in HireScore AI using job-fit scores, skill evidence, and transparent AI explanations.', ['Open the candidate ranking view.', 'Sort or filter by AI score and skill match.', 'Open top profiles to review explanations.']],
  ['/resources/user-guide/shortlist-candidates', 'How to Shortlist Candidates in HireScore AI', 'Shortlist candidates using AI scores, matched skills, skill gaps, role-fit evidence, and recruiter judgment.', ['Review score, matched skills, and missing skills.', 'Compare candidate explanation with the role requirements.', 'Move qualified candidates to shortlist.']],
  ['/resources/user-guide/move-to-communication', 'How to Move Candidates to Communication', 'Move shortlisted candidates into communication and keep outreach connected to the HireScore AI hiring workflow.', ['Select shortlisted candidates.', 'Move them to the communication stage.', 'Send outreach or prepare the next update.']],
  ['/resources/user-guide/schedule-interviews', 'How to Schedule Interviews in HireScore AI', 'Schedule interviews for shortlisted candidates while preserving job, screening, and communication context.', ['Open a candidate in communication or shortlist stage.', 'Choose the interview step.', 'Confirm time and move the candidate forward.']],
  ['/resources/user-guide/run-ai-screening-test', 'How to Run an AI Candidate Screening Test', 'Assign an AI screening test, review candidate results, and use the evidence before interview scheduling.', ['Select candidates who need validation.', 'Create or assign the screening test.', 'Review test results before interview scheduling.']],
]

const blogRoutes = [
  ['/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time', 'How AI Resume Screening Saves Recruiters Time | HireScore AI', 'Learn how AI resume screening reduces manual resume review, structures candidate profiles, improves JD matching, and helps recruiters build stronger shortlists faster.', 'AI Resume Screening', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/what-is-candidate-ranking-and-why-it-matters', 'What Is Candidate Ranking in Recruitment? | HireScore AI', 'Understand candidate ranking and how JD-based AI scoring, skill matching, gap analysis, and explainable evidence help recruiters prioritize applicants.', 'Candidate Ranking', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/how-to-create-a-public-job-apply-page-for-faster-hiring', 'How to Create a Public Job Apply Page | HireScore AI', 'Learn how public job apply pages simplify candidate intake, organize resume collection, and connect applications with AI resume screening.', 'Public Apply Page', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/ai-in-recruitment-benefits-risks-and-best-practices', 'AI in Recruitment: Benefits, Risks & Best Practices', 'Explore AI recruitment benefits, responsible-use risks, recruiter oversight, explainable resume screening, and practical hiring best practices.', 'AI Recruitment', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/how-to-shortlist-candidates-faster-without-losing-quality', 'How to Shortlist Candidates Faster Without Losing Quality', 'Learn how AI scoring, candidate ranking, skill evidence, gap analysis, and explainable decisions help recruiters shortlist faster without reducing quality.', 'AI Shortlisting', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80'],
  ['/resources/blogs/complete-guide-to-ai-powered-hiring-automation', 'Complete Guide to AI-Powered Hiring Automation', 'Explore AI hiring automation from job creation and applications to resume screening, candidate ranking, shortlisting, communication, tests, and interviews.', 'Hiring Automation', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'],
]

const caseStudyRoutes = [
  ['/resources/case-studies/startup-reduced-resume-screening-time', 'Startup Resume Screening Case Study | HireScore AI', 'A transparent sample case study showing how a startup could reduce manual resume screening time using an AI-powered hiring workflow.'],
  ['/resources/case-studies/recruiting-team-improved-shortlisting-quality', 'Candidate Shortlisting Case Study | HireScore AI', 'A transparent sample case study showing how candidate ranking and explainable AI could improve shortlist consistency.'],
  ['/resources/case-studies/public-apply-pages-improved-application-collection', 'Public Apply Page Case Study | HireScore AI', 'A transparent sample case study showing how role-specific apply pages could simplify candidate application and resume collection.'],
]

const breadcrumbFor = (path, label, parentPath, parentLabel) => [
  { name: 'Home', path: '/' },
  ...(parentPath ? [{ name: parentLabel, path: parentPath }] : []),
  { name: label, path },
]

export const SEO_ROUTES = [
  ...staticRoutes.map(([path, title, description, pageType, noindex = false]) => ({ path, title, description, pageType: pageType === 'FAQPage' ? 'WebPage' : pageType, schemaKind: pageType === 'FAQPage' ? 'faq' : undefined, noindex })),
  ...productRoutes.map(([path, title, description]) => ({ path, title, description, pageType: 'WebPage', breadcrumbs: breadcrumbFor(path, title.replace(/ \|.*$/, ''), '/product', 'Product') })),
  ...solutionSegmentRoutes.map(({ path, title, description, navLabel }) => ({ path, title, description, pageType: 'WebPage', breadcrumbs: breadcrumbFor(path, navLabel, '/solutions', 'Solutions') })),
  ...comparisonRoutes.map(({ path, title, description, navLabel }) => ({ path, title, description, pageType: 'WebPage', breadcrumbs: breadcrumbFor(path, navLabel) })),
  ...guideRoutes.map(([path, title, description, steps]) => ({ path, title: `${title} | HireScore AI Guide`, description, pageType: 'WebPage', schemaKind: 'howto', steps, breadcrumbs: breadcrumbFor(path, title, '/resources/user-guide', 'User Guide') })),
  ...blogRoutes.map(([path, title, description, category, image]) => ({ path, title, description, pageType: 'WebPage', ogType: 'article', schemaKind: 'article', category, image, breadcrumbs: breadcrumbFor(path, title.replace(/ \|.*$/, ''), '/resources/blogs', 'Blog') })),
  ...caseStudyRoutes.map(([path, title, description]) => ({ path, title, description, pageType: 'WebPage', ogType: 'article', schemaKind: 'case-study', breadcrumbs: breadcrumbFor(path, title.replace(/ \|.*$/, ''), '/resources/case-studies', 'Case Studies') })),
].map((route) => ({
  ...route,
  canonical: canonicalUrlForPath(route.path),
  image: route.image || DEFAULT_OG_IMAGE,
  keywords: [...new Set([...baseKeywords, route.title.replace(/ \|.*$/, '')])].join(', '),
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
    keywords: baseKeywords.join(', '),
    noindex: true,
  }
}

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND_NAME,
  alternateName: ['HireScoreAI', 'HireScore AI ATS'],
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
  description: 'HireScore AI is an independent AI recruitment workflow platform for recruiters, HR teams, staffing agencies, and growing companies.',
  disambiguatingDescription: 'HireScore AI is independent and is not affiliated with HiredScore, HireScore.com, Workday, or similarly named products.',
  sameAs: ['https://www.linkedin.com/company/hire-score-ai', 'https://www.instagram.com/hirescore_ai/'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales and customer support',
    email: 'info@hirescoreai.com',
    availableLanguage: ['English', 'Hindi'],
  },
}

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BRAND_NAME,
  alternateName: 'HireScoreAI',
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

const software = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: BRAND_NAME,
  alternateName: 'HireScoreAI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI recruitment software',
  operatingSystem: 'Web',
  url: `${SITE_URL}/`,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}/#organization` },
  brand: { '@id': `${SITE_URL}/#organization` },
  featureList: ['Job creation', 'Public job apply pages', 'Bulk resume upload', 'AI resume parsing', 'JD-based candidate matching', 'AI candidate scoring and ranking', 'Explainable candidate fit', 'Shortlisting', 'Candidate communication', 'Screening tests', 'Interview scheduling', 'Hiring pipeline analytics'],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    category: 'Free pilot',
    description: 'Seven-day free pilot access is available for selected early clients.',
    url: canonicalUrlForPath('/pricing'),
  },
}

const faqEntities = [
  ['What is HireScore AI?', 'HireScore AI is an independent AI recruitment workflow platform for job creation, public apply pages, resume screening, candidate ranking, explainable shortlisting, communication, tests, and interview scheduling.'],
  ['Is HireScore AI the same as HiredScore or Workday?', 'No. HireScore AI is independent and is not affiliated with HiredScore, HireScore.com, or Workday.'],
  ['Can recruiters use HireScore AI for high-volume roles?', 'Yes. HireScore AI helps recruiters organize, screen, and rank larger candidate pools while keeping final decisions under human control.'],
  ['Does HireScore AI replace recruiters?', 'No. HireScore AI supports recruiter decisions with structured insights, scores, and explanations. Recruiters remain responsible for hiring decisions.'],
]

export function buildRouteSchema(config) {
  if (!config || config.noindex) return null
  const pageId = `${config.canonical}#webpage`
  const graph = [organization, website, software, {
    '@type': config.pageType || 'WebPage',
    '@id': pageId,
    url: config.canonical,
    name: config.title,
    description: config.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#software` },
    primaryImageOfPage: { '@type': 'ImageObject', url: config.image },
    breadcrumb: config.breadcrumbs ? { '@id': `${config.canonical}#breadcrumb` } : undefined,
  }]

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
    graph.push({
      '@type': 'Article',
      '@id': `${config.canonical}#article`,
      headline: config.title.replace(/ \|.*$/, ''),
      description: config.description,
      image: [config.image],
      articleSection: config.category || 'Sample case study',
      inLanguage: 'en',
      mainEntityOfPage: { '@id': pageId },
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      isAccessibleForFree: true,
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
      mainEntity: faqEntities.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
