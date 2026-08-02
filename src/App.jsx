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
  Instagram,
  Linkedin,
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
  Youtube,
  Zap,
} from 'lucide-react'
import './App.css'
import { BRAND_NAME, HOME_FAQS, HOME_H1, OFFICIAL_SOCIAL_LINKS, buildRouteSchema, comparisonRoutes, getSeoConfig, solutionSegmentRoutes } from './seoConfig.js'

const APP_URL = 'https://app.hirescoreai.com'
const CONTACT_EMAIL = 'Info@hireScoreAi.com'
const PILOT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=HireScore%20AI%20Free%20Pilot%20Access&body=Hi%20HireScore%20AI%20team%2C%0A%0AI%20want%20free%20pilot%20access%20for%20HireScore%20AI.%0A%0ACompany%3A%0AHiring%20roles%3A%0AExpected%20resume%20volume%3A%0A`

const solutionNavItems = [
  ['/solutions/recruitment-agencies', 'Recruitment Agencies'],
  ['/solutions/staffing-companies', 'Staffing Companies'],
  ['/solutions/hr-teams', 'HR Teams'],
  ['/solutions/startups', 'Startups'],
  ['/solutions/bulk-resume-screening', 'Bulk Resume Screening'],
  ['/solutions/tech-hiring', 'IT & Tech Hiring'],
]

const productNavItems = [
  ['/product/hirescore-ai', 'HireScoreAI'],
  ['/product/jd-manager', 'JD Manager'],
]

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
    meta: 'Create structured jobs in HireScoreAI so recruiters can collect applications, screen resumes, and manage hiring from one workflow.',
    icon: 'job',
    intro: 'Build clear job records with role details, requirements, skills, and hiring stages before applications start arriving.',
    does: 'Create a central job workspace where recruiters define the role, attach hiring criteria, and prepare the pipeline.',
    need: 'Recruiters need a consistent job setup so resume screening and candidate scoring are based on the right role requirements.',
    solves: 'HireScoreAI keeps the job description, skills, public apply page, resumes, scores, and communication connected to one role.',
    benefits: ['Structured job setup', 'Cleaner candidate tracking', 'Better JD-based scoring', 'Faster launch for new roles'],
    workflow: ['Add role details', 'Set required skills', 'Launch apply page', 'Start screening'],
    related: ['/product/public-apply-page', '/product/ai-candidate-scoring', '/product/hiring-pipeline'],
  },
  {
    slug: '/product/public-apply-page',
    navLabel: 'Public Apply Page',
    title: 'Public Apply Pages for Faster Candidate Collection',
    meta: 'Generate public job apply pages with HireScoreAI to collect candidate applications and resumes in one organized hiring pipeline.',
    icon: 'apply',
    intro: 'Create a public application link for every job so candidates can apply without manual email collection.',
    does: 'Gives each role a clean apply page where candidates can submit details and resumes.',
    need: 'Recruiters need one reliable place to collect applications instead of tracking resumes across email, chats, and spreadsheets.',
    solves: 'HireScoreAI connects every application directly to the right job and makes it ready for resume parsing and AI scoring.',
    benefits: ['Shareable job links', 'Organized applications', 'Fewer manual follow-ups', 'Cleaner candidate intake'],
    workflow: ['Create job', 'Generate link', 'Share with candidates', 'Review applications'],
    related: ['/product/create-job', '/product/resume-upload', '/product/hiring-pipeline'],
  },
  {
    slug: '/product/resume-upload',
    navLabel: 'Resume Upload',
    title: 'Resume Upload for High-Volume Hiring Teams',
    meta: 'Upload resumes into HireScoreAI and keep candidate profiles organized for parsing, screening, scoring, and ranking.',
    icon: 'upload',
    intro: 'Bulk upload resumes or review resumes collected from public apply pages in one recruiter workspace.',
    does: 'Stores candidate resumes against open jobs so they can be parsed, scored, and reviewed consistently.',
    need: 'Manual file handling slows teams down and makes it harder to compare candidates role by role.',
    solves: 'HireScoreAI centralizes resume intake and prepares each profile for AI parsing and candidate ranking.',
    benefits: ['Bulk resume handling', 'Cleaner job-wise organization', 'Reduced manual sorting', 'Ready for AI parsing'],
    workflow: ['Select job', 'Upload resumes', 'Parse profiles', 'Review ranked list'],
    related: ['/product/ai-resume-parsing', '/product/ai-candidate-ranking', '/resources/user-guide/upload-resumes'],
  },
  {
    slug: '/product/ai-resume-parsing',
    navLabel: 'AI Resume Screening',
    title: 'AI Resume Screening and Resume Parsing Software',
    meta: 'HireScoreAI screens and parses resumes so recruiters can identify skills, experience, education, and role-fit signals faster.',
    icon: 'parse',
    intro: 'Turn resumes into structured candidate insights that recruiters can compare without reading every profile manually.',
    does: 'Extracts skills, experience, education, and candidate highlights from resumes.',
    need: 'Recruiters often spend hours reading resumes before they can build a shortlist.',
    solves: 'HireScoreAI reads candidate profiles and turns them into structured screening data connected to the job description.',
    benefits: ['Faster resume review', 'Structured candidate profiles', 'Reduced manual reading', 'Better role-fit visibility'],
    workflow: ['Upload resume', 'Parse profile', 'Match skills', 'Send to scoring'],
    related: ['/product/ai-candidate-scoring', '/product/ai-candidate-ranking', '/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time'],
  },
  {
    slug: '/product/ai-candidate-scoring',
    navLabel: 'AI Candidate Scoring',
    title: 'JD-Based AI Candidate Scoring for Recruiters',
    meta: 'Score candidates against job descriptions with HireScoreAI and understand role-fit based on skills, experience, and profile strength.',
    icon: 'score',
    intro: 'Use job description based scoring to compare candidates with clearer, more consistent hiring criteria.',
    does: 'Calculates candidate fit using skills, experience, education, semantic JD match, missing skills, and profile quality.',
    need: 'Recruiters need a consistent way to prioritize candidates without relying only on keyword matching.',
    solves: 'HireScoreAI scores every candidate against the role and supports each score with explainable evidence.',
    benefits: ['JD-based scoring', 'Consistent evaluation', 'Clear fit signals', 'Better hiring manager discussions'],
    workflow: ['Read JD', 'Analyze resume', 'Calculate score', 'Explain decision'],
    related: ['/product/ai-explanation-engine', '/product/ai-candidate-ranking', '/product/ai-shortlisting'],
  },
  {
    slug: '/product/ai-candidate-ranking',
    navLabel: 'AI Candidate Ranking',
    title: 'AI Candidate Ranking Tool for Faster Shortlists',
    meta: 'Rank candidates automatically with HireScoreAI so recruiters can focus on the strongest job matches first.',
    icon: 'rank',
    intro: 'See the best-fit candidates at the top of every hiring pipeline with AI-powered candidate ranking.',
    does: 'Orders candidates by AI score, matched skills, missing skills, and job relevance.',
    need: 'High-volume roles make it hard to know which candidates deserve attention first.',
    solves: 'HireScoreAI ranks the pipeline so recruiters can review top candidates, compare evidence, and move faster.',
    benefits: ['Prioritized candidate list', 'Less manual comparison', 'Faster shortlist creation', 'Clear ranking evidence'],
    workflow: ['Score candidates', 'Sort by fit', 'Review evidence', 'Shortlist top matches'],
    related: ['/product/ai-candidate-scoring', '/product/ai-shortlisting', '/resources/blogs/what-is-candidate-ranking-and-why-it-matters'],
  },
  {
    slug: '/product/ai-shortlisting',
    navLabel: 'AI Shortlisting',
    title: 'AI Shortlisting Software for Quality Hiring Decisions',
    meta: 'Use HireScoreAI to shortlist candidates faster while keeping candidate decisions explainable and organized.',
    icon: 'shortlist',
    intro: 'Move the strongest candidates from screening to the next hiring step with confidence.',
    does: 'Helps recruiters identify candidates who should move forward based on score, skills, and explanation.',
    need: 'Shortlisting needs to be fast, consistent, and easy to explain to hiring managers.',
    solves: 'HireScoreAI gives recruiters a ranked pipeline and clear evidence for every shortlist decision.',
    benefits: ['Faster shortlist review', 'Clear decision context', 'Better manager alignment', 'Reduced quality loss'],
    workflow: ['Review ranking', 'Read explanation', 'Select candidates', 'Move to communication'],
    related: ['/product/ai-explanation-engine', '/product/candidate-communication', '/resources/user-guide/shortlist-candidates'],
  },
  {
    slug: '/product/ai-explanation-engine',
    navLabel: 'AI Explanation Engine',
    title: 'Explainable AI Hiring Decisions for Recruiters',
    meta: 'HireScoreAI explains candidate scores using skills, experience, education, semantic match, missing skills, and profile strength.',
    icon: 'explain',
    intro: 'Understand why every candidate scored high or low before making hiring decisions.',
    does: 'Generates recruiter-ready explanations for candidate scores and shortlisting decisions.',
    need: 'Hiring teams need transparency, not just a number, when moving candidates forward.',
    solves: 'HireScoreAI shows matched skills, missing skills, experience relevance, and profile strengths behind every score.',
    benefits: ['Transparent scoring', 'Clear hiring manager updates', 'Better candidate review', 'Explainable shortlisting'],
    workflow: ['Open profile', 'Review score', 'Read explanation', 'Decide next step'],
    related: ['/product/ai-candidate-scoring', '/product/ai-candidate-ranking', '/product/ai-shortlisting'],
  },
  {
    slug: '/product/candidate-communication',
    navLabel: 'Candidate Communication',
    title: 'Candidate Communication for Faster Hiring Follow-Up',
    meta: 'Move shortlisted candidates to communication in HireScoreAI and keep outreach organized in the hiring workflow.',
    icon: 'communicate',
    intro: 'Keep candidate follow-up connected to shortlisting, screening, and interview scheduling.',
    does: 'Helps recruiters move candidates into communication after screening and shortlisting.',
    need: 'Candidate momentum is lost when outreach is disconnected from the hiring pipeline.',
    solves: 'HireScoreAI keeps shortlisted candidates, communication status, and next steps in one workflow.',
    benefits: ['Faster follow-up', 'Cleaner candidate status', 'Reduced missed outreach', 'Better recruiter coordination'],
    workflow: ['Shortlist candidate', 'Move to communication', 'Send update', 'Schedule interview'],
    related: ['/product/ai-shortlisting', '/product/interview-scheduling', '/resources/user-guide/move-to-communication'],
  },
  {
    slug: '/product/interview-scheduling',
    navLabel: 'Interview Scheduling',
    title: 'AI Interview Scheduling Software for Hiring Teams',
    meta: 'Schedule interviews from your hiring pipeline with HireScoreAI and move candidates faster from shortlist to interview.',
    icon: 'schedule',
    intro: 'Coordinate interviews after candidate screening without losing context from the hiring workflow.',
    does: 'Supports interview scheduling as part of the end-to-end hiring process.',
    need: 'Recruiters need to move qualified candidates quickly before they lose interest.',
    solves: 'HireScoreAI connects shortlisting, communication, and interview scheduling inside the candidate pipeline.',
    benefits: ['Faster interview setup', 'Connected candidate context', 'Cleaner next steps', 'Less manual coordination'],
    workflow: ['Select candidate', 'Move to interview', 'Choose time', 'Confirm schedule'],
    related: ['/product/candidate-communication', '/product/hiring-pipeline', '/resources/user-guide/schedule-interviews'],
  },
  {
    slug: '/product/ai-screening-test',
    navLabel: 'AI Screening Test',
    title: 'AI Screening Tests for Better Candidate Validation',
    meta: 'Run AI screening tests with HireScoreAI to validate candidate fit after resume screening and shortlisting.',
    icon: 'test',
    intro: 'Add screening tests to evaluate role-specific skills before the interview stage.',
    does: 'Helps recruiters validate shortlisted candidates with AI-supported screening test workflows.',
    need: 'Resume fit is important, but teams also need practical validation before interviews.',
    solves: 'HireScoreAI connects test workflows to the candidate profile and hiring pipeline.',
    benefits: ['Role-fit validation', 'Better interview readiness', 'Structured candidate evidence', 'Improved shortlist quality'],
    workflow: ['Select candidates', 'Run screening test', 'Review results', 'Move to interview'],
    related: ['/product/ai-shortlisting', '/product/interview-scheduling', '/resources/user-guide/run-ai-screening-test'],
  },
  {
    slug: '/product/hiring-pipeline',
    navLabel: 'Hiring Pipeline Automation',
    title: 'Automated Hiring Pipeline Software for Recruiters',
    meta: 'Manage job creation, applications, resume screening, ranking, shortlisting, communication, interviews, and hiring decisions in HireScoreAI.',
    icon: 'pipeline',
    intro: 'Run the complete hiring workflow from job creation to interview scheduling in one AI-powered platform.',
    does: 'Connects every hiring stage so recruiters can manage candidates without disconnected tools.',
    need: 'Recruiters need one organized workflow instead of scattered spreadsheets, inboxes, and manual status tracking.',
    solves: 'HireScoreAI links jobs, apply pages, resumes, AI scores, shortlists, communication, tests, and interviews.',
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
  meta: `${title} in HireScoreAI with simple recruiter steps, common mistakes, best practices, and app CTA.`,
}))

const blogPosts = [
  {
    slug: '/resources/blogs/hire-through-conversation-action-ai-agent',
    title: 'Conversational AI ATS: HireScoreAI Action Agent',
    meta: 'See how HireScoreAI’s AI ATS Action Agent helps recruiters manage job creation, resume screening, candidate ranking, communication and interviews through conversational AI.',
    image: '/action-ai-agent-conversation.webp',
    category: 'AI Recruitment Automation',
    readTime: '11 min read',
    published: 'July 26, 2026',
    isActionAgentArticle: true,
    links: [
      '/product/hirescore-ai',
      '/solutions',
      '/product/create-job',
      '/product/public-apply-page',
      '/product/resume-upload',
      '/product/ai-candidate-ranking',
      '/product/candidate-communication',
      '/product/interview-scheduling',
      '/product/ai-screening-test',
    ],
  },
  {
    slug: '/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time',
    title: 'How AI Resume Screening Helps Recruiters Save Time and Improve Shortlist Quality',
    meta: 'Learn how AI resume screening helps recruiters reduce manual resume review, parse candidate profiles, match resumes with job descriptions, and shortlist better candidates faster.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Resume Screening',
    readTime: '9 min read',
    sections: [
      [
        'Introduction',
        `Recruiters spend a large part of their day reading resumes, comparing candidate profiles, checking skills, and deciding which applicants should move forward. For one open role, a recruiter may receive dozens or even hundreds of resumes. The problem is not only the volume of resumes. The bigger problem is that every resume has a different format, different wording, different skill placement, and different level of detail. This makes manual screening slow and inconsistent. AI resume screening helps recruiters solve this problem by converting resumes into structured candidate insights and comparing them with the job description. HireScoreAI is designed to support this workflow by helping recruiters create jobs, collect resumes, parse profiles, match candidates with the JD, rank profiles, and shortlist better candidates faster.`
      ],
      [
        'Why manual resume screening slows down hiring',
        `Manual resume screening takes time because recruiters need to open every resume, read the candidate summary, check skills, review work experience, understand education, compare the profile with the job description, and then decide whether the candidate should be shortlisted. This process becomes difficult when multiple recruiters are working on multiple roles at the same time. It also creates inconsistency because one recruiter may focus on skills, another may focus on experience, and another may focus on resume presentation. A good candidate can be missed if the resume is not formatted well. A weak candidate can look strong if the resume repeats the right keywords. This is where AI resume screening becomes useful.`
      ],
      [
        'What AI resume screening actually does',
        `AI resume screening is not just keyword searching. A useful AI screening system should read resumes, extract candidate information, identify role-relevant skills, understand experience signals, compare the resume with the job description, and help recruiters review candidates in a structured way. HireScoreAI helps turn unstructured resumes into cleaner candidate profiles. Recruiters can review details like skills, education, experience, matched skills, missing skills, AI score, and candidate fit signals. This reduces manual data entry and gives recruiters a better starting point for screening.`
      ],
      [
        'How HireScoreAI parses resumes into candidate profiles',
        `HireScoreAI includes AI resume parsing to extract important candidate details from resumes. Instead of manually copying data from a PDF or document, recruiters can view candidate information in a structured format. This can include name, contact details, skills, education, total experience, designation, previous company information, and role-related evidence. Structured candidate profiles make screening easier because recruiters no longer have to search every resume line by line. They can quickly understand who the candidate is, what skills they have, and whether the profile is relevant to the open job.`
      ],
      [
        'Why JD-based matching is better than keyword matching',
        `Many basic screening tools rely too much on keywords. Keyword matching can be helpful, but it is not enough for quality hiring. A candidate may repeat a keyword many times without real experience. Another candidate may have strong experience but use different wording. JD-based matching is better because the resume is compared with the actual job requirements. HireScoreAI uses the job description as the base for screening. This helps recruiters understand whether the candidate has the right skills, experience, and role relevance for that specific job.`
      ],
      [
        'How AI scoring helps recruiters prioritize candidates',
        `After resumes are parsed and matched with the job description, recruiters need to know which candidates should be reviewed first. AI candidate scoring helps with this. HireScoreAI can help recruiters prioritize candidates using role-fit signals such as matched skills, missing skills, experience relevance, and profile strength. This does not mean recruiters should blindly trust a score. Instead, the score gives a starting point. Recruiters can review the top matches first, check the explanation, and then decide whether to shortlist or keep the candidate in review.`
      ],
      [
        'How matched skills and missing skills improve review quality',
        `Matched skills and missing skills are important because they make candidate review more transparent. For example, if a job requires SQL, Excel, Power BI, Python, reporting, and dashboarding, the recruiter can quickly see which of those skills are present in the candidate profile and which need verification. This saves time during screening and improves the quality of recruiter decisions. HireScoreAI shows candidate fit in a more explainable way so recruiters can discuss profiles with hiring managers more confidently.`
      ],
      [
        'Where HireScoreAI fits in the recruiter workflow',
        `HireScoreAI supports the early hiring workflow from job creation to shortlisting. Recruiters can create a job with a clear JD, generate a public apply page, collect candidate applications, upload resumes, parse resumes, match candidates with the JD, rank candidates, and move suitable candidates forward. This makes HireScoreAI more than a resume parser. It helps recruiters manage the full screening workflow in one place instead of using scattered folders, spreadsheets, email threads, and manual notes.`
      ],
      [
        'Best practices for using AI resume screening',
        `To get the best result from AI resume screening, recruiters should start with a clear job description. The JD should include required skills, experience range, responsibilities, role expectations, location, work mode, and must-have qualifications. Recruiters should also review AI explanations before making decisions. A candidate should not be rejected only because one keyword is missing. AI should support recruiter judgment, not replace it. HireScoreAI works best when recruiters use it as a decision-support system with human review.`
      ],
      [
        'Final thoughts',
        `AI resume screening helps recruiters save time, reduce repetitive work, and improve shortlist quality. It gives hiring teams a structured way to review resumes, compare candidates with job descriptions, and prioritize stronger profiles. HireScoreAI helps recruiters create jobs, collect applications, parse resumes, match profiles with the JD, rank candidates, and shortlist faster. For recruitment agencies, HR teams, startups, and staffing companies, AI resume screening can make hiring faster, cleaner, and easier to manage.`
      ],
    ],
    links: [
      '/product/ai-resume-parsing',
      '/product/ai-candidate-scoring',
      '/product/ai-candidate-ranking',
      '/product/ai-explanation-engine',
      '/product/ai-shortlisting',
    ],
  },

  {
    slug: '/resources/blogs/what-is-candidate-ranking-and-why-it-matters',
    title: 'What Is Candidate Ranking and Why It Matters in Recruitment',
    meta: 'Understand candidate ranking, why recruiters need it, and how HireScoreAI helps rank candidates using JD-based AI scoring, matched skills, missing skills, and explainable hiring signals.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'Candidate Ranking',
    readTime: '9 min read',
    sections: [
      [
        'Introduction',
        `Candidate ranking is one of the most important parts of modern recruitment. When recruiters receive many applications for a job, they need a practical way to decide which candidates should be reviewed first. Without ranking, recruiters usually open resumes in random order, application order, or upload order. This wastes time and makes shortlisting inconsistent. AI candidate ranking helps recruiters prioritize candidates based on job fit. HireScoreAI helps recruiters rank candidates using JD-based scoring, skill match, missing skill analysis, experience relevance, and explainable candidate insights.`
      ],
      [
        'What candidate ranking means',
        `Candidate ranking means arranging applicants based on how closely they match a specific job requirement. A strong ranking system does not simply put resumes in alphabetical order or upload order. It compares candidate profiles with the job description and shows which candidates appear more relevant for the role. For recruiters, ranking is useful because it creates a clear review priority. Instead of spending equal time on every profile, recruiters can start with the candidates who show stronger evidence of job fit.`
      ],
      [
        'Why recruiters need candidate ranking',
        `Recruiters often manage multiple jobs at the same time. One role may receive ten resumes, while another may receive two hundred. If recruiters manually compare every candidate, the hiring process becomes slow. Candidate ranking helps recruiters focus their time where it matters most. It is especially useful for high-volume hiring, recruitment agencies, startup hiring, and staffing teams that need to submit candidates quickly. With a ranked candidate list, recruiters can review stronger profiles first and reduce time spent on weak matches.`
      ],
      [
        'The problem with manual ranking',
        `Manual ranking is difficult because resumes are inconsistent. Some candidates write clear skills sections. Some mention skills inside projects. Some use different words for the same technology. Some resumes are well-designed but weak in actual experience. Others are poorly formatted but strong in role relevance. When recruiters rank manually, decisions can become subjective. AI candidate ranking helps reduce this inconsistency by extracting candidate signals and comparing them against the job description in a more structured way.`
      ],
      [
        'How HireScoreAI ranks candidates',
        `HireScoreAI helps rank candidates by connecting resume parsing with JD-based candidate scoring. First, the resume is parsed into a structured candidate profile. Then the profile is compared with the job description. The system can consider matched skills, missing skills, experience relevance, education, role similarity, and profile quality. Recruiters can use the ranking to identify which profiles should be reviewed first. This makes screening faster and helps hiring teams build stronger shortlists.`
      ],
      [
        'Why JD-based ranking is important',
        `A candidate cannot be judged properly without job context. A profile that is excellent for a backend developer role may not be suitable for a data analyst role. A sales candidate may be strong for field sales but not for enterprise SaaS sales. This is why ranking should be based on the job description. HireScoreAI ranks candidates against the specific job they are applying for. This keeps candidate evaluation connected to actual hiring requirements rather than generic resume keywords.`
      ],
      [
        'Why explainable ranking matters',
        `A ranking number alone is not enough. Recruiters need to know why a candidate is ranked higher or lower. Explainable ranking helps recruiters understand the evidence behind the score. HireScoreAI supports this by showing matched skills, missing skills, and candidate fit signals. This helps recruiters discuss candidates with hiring managers more clearly. Instead of saying “this candidate scored high,” recruiters can explain that the candidate matched key skills, had relevant experience, and aligned with the JD.`
      ],
      [
        'How ranking improves shortlist quality',
        `Candidate ranking improves shortlist quality because it gives recruiters a structured starting point. Strong candidates can be reviewed earlier, average candidates can stay in review, and weak candidates can be deprioritized. This does not remove human judgment. Recruiters still review the candidate profile and final decision. But ranking reduces random review and improves consistency. HireScoreAI helps recruiters move from unorganized resume review to evidence-based shortlisting.`
      ],
      [
        'How HireScoreAI connects ranking with shortlisting',
        `Candidate ranking becomes more useful when it connects with the next hiring step. HireScoreAI helps recruiters move ranked candidates toward shortlisting, communication, tests, and interview scheduling. This means recruiters do not have to rank candidates in one tool and track them somewhere else. The ranking becomes part of the hiring pipeline. This keeps candidate status organized and helps teams avoid losing strong candidates after screening.`
      ],
      [
        'Final thoughts',
        `Candidate ranking matters because recruiters need speed, structure, and clarity. Without ranking, hiring teams spend too much time comparing resumes manually. With AI candidate ranking, recruiters can review stronger matches first and make shortlist decisions faster. HireScoreAI combines AI resume parsing, JD-based scoring, candidate ranking, explainable AI, and shortlisting workflows to help recruiters build better candidate pipelines with less manual effort.`
      ],
    ],
    links: [
      '/product/ai-candidate-ranking',
      '/product/ai-candidate-scoring',
      '/product/ai-explanation-engine',
      '/product/ai-shortlisting',
      '/product/hiring-pipeline',
    ],
  },

  {
    slug: '/resources/blogs/how-to-create-a-public-job-apply-page-for-faster-hiring',
    title: 'How to Create a Public Job Apply Page for Faster Hiring',
    meta: 'Learn how public job apply pages help recruiters collect candidate applications, organize resume intake, track candidates role-wise, and connect applications with AI resume screening.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    category: 'Public Apply Page',
    readTime: '9 min read',
    sections: [
      [
        'Introduction',
        `A public job apply page is one of the simplest ways to make hiring more organized. Instead of collecting resumes from emails, WhatsApp messages, job portals, spreadsheets, and shared folders, recruiters can share one application link for a specific job. Candidates can open the link, read job details, fill in their information, and upload their resume. HireScoreAI supports this kind of structured hiring workflow by connecting job creation, public apply pages, resume collection, AI resume parsing, candidate scoring, and shortlisting.`
      ],
      [
        'What is a public job apply page?',
        `A public job apply page is a role-specific application page where candidates can apply for an open position. It usually includes the job title, company name, location, work mode, job type, experience requirement, salary range, responsibilities, required skills, and an application form. For recruiters, the biggest benefit is organization. Every application comes under the correct job instead of getting mixed across different channels. This helps recruiters start screening faster and avoid confusion.`
      ],
      [
        'Why scattered resume collection creates problems',
        `Many recruiters still collect resumes through multiple channels. Some candidates send resumes by email. Some apply through job portals. Some share resumes through messages. Some are uploaded manually by recruiters. When applications are scattered, recruiters spend extra time downloading files, renaming resumes, updating spreadsheets, and tracking which candidate applied for which role. This slows down hiring and increases the chance of mistakes. Public apply pages reduce this problem by creating one clean application flow.`
      ],
      [
        'How HireScoreAI helps create job-based application flows',
        `HireScoreAI starts with job creation. Recruiters can create a job with a clear JD, required skills, experience range, location, salary range, and work mode. Once a job is created, the candidate intake can be connected to that role. This helps recruiters track candidates job-wise. When applications are attached to the correct job, AI screening becomes more accurate because each resume is compared with the right job description.`
      ],
      [
        'What a good public apply page should include',
        `A good public apply page should be simple, clear, and candidate-friendly. It should explain the role without making the candidate confused. The page should include the job title, job type, location, experience range, key responsibilities, must-have skills, and application instructions. The application form should collect only useful details. A clean apply page improves candidate experience and helps recruiters receive better-quality applications.`
      ],
      [
        'How public apply pages connect with AI resume screening',
        `A public apply page becomes more powerful when it connects directly with AI resume screening. After a candidate applies, the resume can be parsed into a structured candidate profile. Then the profile can be matched with the job description. HireScoreAI helps recruiters move from application collection to resume screening faster by connecting intake with parsing, scoring, ranking, and shortlisting. This reduces manual work and improves hiring speed.`
      ],
      [
        'Why candidate source and role tracking matter',
        `Recruiters often need to know where candidates are coming from and which role they applied for. Candidate source tracking helps recruiters understand which channels are producing applications. Role tracking prevents candidates from getting mixed across jobs. For example, if a recruiter is hiring for backend developer, QA engineer, and data analyst roles at the same time, each candidate should stay connected to the right job. HireScoreAI supports a more organized candidate pipeline so recruiters can review candidates with proper context.`
      ],
      [
        'How public apply pages help recruitment agencies',
        `Recruitment agencies can benefit strongly from public apply pages. Agencies often work on multiple client requirements and need to collect resumes quickly. A role-specific apply page allows agencies to share a clean job link with candidates and collect applications in a structured way. Once resumes are collected, AI screening can help identify stronger matches. This improves the speed and quality of candidate submission to clients.`
      ],
      [
        'How HireScoreAI improves the full intake workflow',
        `HireScoreAI is not limited to collecting resumes. It helps recruiters create jobs, share apply pages, upload resumes, parse candidate profiles, match candidates with the JD, rank profiles, and move suitable candidates forward. This means recruiters can manage candidate intake and screening in one connected workflow. A public apply page is the starting point, but the real value comes when it connects with AI-powered screening and candidate ranking.`
      ],
      [
        'Final thoughts',
        `Public job apply pages make hiring cleaner and faster. They reduce scattered resume collection, improve candidate tracking, and help recruiters collect applications under the right job. HireScoreAI connects public apply pages with job creation, resume parsing, JD matching, AI scoring, candidate ranking, and shortlisting. For recruiters who want a more organized hiring workflow, public apply pages are an important first step.`
      ],
    ],
    links: [
      '/product/create-job',
      '/product/public-apply-page',
      '/product/resume-upload',
      '/product/ai-resume-parsing',
      '/product/hiring-pipeline',
    ],
  },
    {
    slug: '/resources/blogs/ai-in-recruitment-benefits-risks-and-best-practices',
    title: 'AI in Recruitment: Benefits, Risks, and Best Practices for Hiring Teams',
    meta: 'Explore how AI is used in recruitment, the benefits and risks recruiters should understand, and how HireScoreAI supports explainable AI resume screening and human review.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Recruitment',
    readTime: '10 min read',
    sections: [
      [
        'Introduction',
        `AI is becoming an important part of modern recruitment. Hiring teams are using AI to reduce manual resume screening, organize candidate data, rank applicants, explain candidate fit, and move candidates faster through the hiring pipeline. But AI in recruitment should be used carefully. It should support recruiters, not replace them. Recruiters still need to review candidate context, understand role requirements, and make final hiring decisions. HireScoreAI is built with this idea in mind. It helps recruiters use AI for resume screening, JD-based matching, candidate ranking, and explainable hiring decisions while keeping human review in the workflow.`
      ],
      [
        'How AI is used in recruitment',
        `AI can support many parts of recruitment. It can parse resumes, extract candidate information, match resumes with job descriptions, score candidates, rank applicants, identify matched and missing skills, and help recruiters prepare shortlists. It can also support communication, screening tests, interview scheduling, and hiring pipeline automation. The main value of AI is that it reduces repetitive manual work. Instead of spending hours reading every resume from scratch, recruiters can start with structured candidate insights and focus on reviewing the right profiles.`
      ],
      [
        'Benefits of AI recruitment software',
        `The biggest benefit of AI recruitment software is speed. Recruiters can screen more resumes in less time and focus on stronger candidates first. AI also improves organization by converting resumes into structured profiles. This helps recruiters compare candidates more consistently. AI can also reduce manual errors, especially when recruiters are handling multiple roles at the same time. HireScoreAI helps recruiters create jobs, collect resumes, parse candidate profiles, compare resumes with job descriptions, rank candidates, and move suitable candidates forward in a cleaner workflow.`
      ],
      [
        'Why AI resume screening helps hiring teams',
        `Resume screening is one of the most repetitive parts of recruitment. Every resume needs to be reviewed for skills, experience, education, role relevance, and contact details. AI resume screening helps by extracting these details and presenting them in a structured way. HireScoreAI helps recruiters move from unstructured resume files to organized candidate profiles. This makes it easier to understand candidate fit, review skill coverage, and decide which candidates should move forward.`
      ],
      [
        'Risks of using AI in recruitment',
        `AI in recruitment also has risks. Recruiters should not blindly trust a score without understanding the reason behind it. If the job description is unclear, the AI matching may also become weak. If a resume is incomplete or poorly written, important candidate details may be missed. AI can also make mistakes when candidate context is not clear. This is why hiring teams should use AI as a decision-support tool, not as a final decision-maker. Human review should always remain part of the process.`
      ],
      [
        'Why explainable AI is important',
        `Explainable AI is important because recruiters need to understand why a candidate is recommended or not recommended. A score alone is not enough. Recruiters need evidence such as matched skills, missing skills, experience relevance, and role-fit signals. HireScoreAI focuses on explainable candidate review. This helps recruiters discuss candidate recommendations with hiring managers more confidently. Instead of saying that the AI selected a candidate, recruiters can show the actual reasons behind the recommendation.`
      ],
      [
        'Best practices for using AI in hiring',
        `Recruiters should follow a few best practices when using AI. First, create a clear job description with must-have skills, responsibilities, experience range, location, and role expectations. Second, review AI scores along with explanations. Third, do not reject a candidate only because one skill is missing. Fourth, use AI ranking as a priority guide, not as a final hiring decision. Fifth, keep recruiters involved in every important hiring decision. HireScoreAI works best when teams combine AI speed with recruiter judgment.`
      ],
      [
        'How HireScoreAI supports responsible AI hiring',
        `HireScoreAI helps recruiters use AI in a practical and controlled way. It supports job creation, public apply pages, resume upload, resume parsing, JD-based matching, AI scoring, candidate ranking, matched skills, missing skills, explanations, shortlisting, and hiring pipeline movement. The platform helps recruiters save time, but it does not remove the recruiter from the process. Recruiters can review candidate data, check evidence, and make final decisions with better visibility.`
      ],
      [
        'Who should use AI recruitment tools',
        `AI recruitment tools are useful for recruitment agencies, HR teams, staffing companies, startups, and businesses that receive many resumes. They are especially useful for high-volume hiring, role-wise candidate tracking, and early-stage resume screening. Teams hiring for technical roles, sales roles, analytics roles, QA roles, backend roles, and full-stack roles can use AI to organize candidate review and improve shortlisting speed. HireScoreAI is designed for teams that want faster screening with better explanation and workflow control.`
      ],
      [
        'Final thoughts',
        `AI can improve recruitment when it is used responsibly. It can reduce manual work, improve candidate visibility, and help recruiters make faster decisions. But AI should not replace human judgment. The best approach is to use AI for structure, speed, ranking, and explanation while recruiters make final decisions. HireScoreAI follows this approach by combining AI resume screening, JD-based scoring, candidate ranking, explainable AI, and hiring pipeline support in one recruitment platform.`
      ],
    ],
    links: [
      '/product/ai-explanation-engine',
      '/product/ai-candidate-scoring',
      '/product/ai-resume-parsing',
      '/product/ai-candidate-ranking',
      '/product/hiring-pipeline',
    ],
  },

  {
    slug: '/resources/blogs/how-to-shortlist-candidates-faster-without-losing-quality',
    title: 'How to Shortlist Candidates Faster Without Losing Quality',
    meta: 'Learn how recruiters can shortlist candidates faster using AI scoring, candidate ranking, matched skills, missing skills, and explainable hiring decisions with HireScoreAI.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Shortlisting',
    readTime: '9 min read',
    sections: [
      [
        'Introduction',
        `Shortlisting candidates is one of the most important steps in hiring. Recruiters need to move fast, but they also need to maintain quality. If shortlisting is too slow, strong candidates may lose interest or join another company. If shortlisting is too fast without proper review, weak candidates may move forward and hiring managers may lose confidence in the process. HireScoreAI helps recruiters shortlist faster without losing quality by combining AI resume parsing, JD-based candidate scoring, ranking, matched skills, missing skills, and explainable candidate review.`
      ],
      [
        'Why shortlisting is difficult',
        `Shortlisting is difficult because recruiters need to compare many candidate profiles against one job description. They need to check whether the candidate has the required skills, relevant experience, right education, suitable background, and role alignment. When resumes are reviewed manually, this process takes time. It also becomes inconsistent because different recruiters may evaluate candidates differently. A structured AI-assisted workflow helps recruiters review candidates with more clarity and speed.`
      ],
      [
        'The problem with keyword-only shortlisting',
        `Keyword-only shortlisting can reduce quality. A candidate may mention the right keywords but may not have strong practical experience. Another candidate may have relevant work experience but may use different words from the job description. This creates a risk of selecting the wrong candidates or missing strong candidates. HireScoreAI helps reduce this problem by using JD-based matching, skill coverage, experience relevance, and explainable candidate signals instead of depending only on repeated keywords.`
      ],
      [
        'Start with a clear job description',
        `A good shortlist starts with a clear job description. Recruiters should define the job title, responsibilities, must-have skills, good-to-have skills, experience range, location, work mode, and hiring expectations. HireScoreAI uses the job description as the base for resume matching and scoring. When the JD is clear, the AI can compare candidates more accurately. This helps recruiters create a more relevant shortlist and reduces confusion during candidate review.`
      ],
      [
        'Use AI scoring to prioritize candidates',
        `AI scoring helps recruiters understand which candidates should be reviewed first. It does not mean the highest score should automatically be selected. It means recruiters get a practical priority list. HireScoreAI helps score candidates based on role-fit signals such as matched skills, missing skills, experience relevance, and candidate profile quality. Recruiters can then open top profiles, review explanations, and decide whether the candidate should move forward.`
      ],
      [
        'Use matched skills and missing skills for better decisions',
        `Matched skills and missing skills help recruiters make better shortlisting decisions. Matched skills show where the candidate fits the job. Missing skills show what needs verification. For example, if a role requires React, Node.js, REST APIs, SQL, and Git, the recruiter can quickly see which skills are present and which skills are missing. This saves time and improves the quality of recruiter discussions with hiring managers. HireScoreAI makes skill coverage easier to review in the candidate profile.`
      ],
      [
        'Why explainable AI improves shortlist confidence',
        `Recruiters need confidence before moving candidates forward. A simple score does not explain the full picture. Explainable AI helps recruiters understand why a candidate is a strong match, average match, or weak match. HireScoreAI supports recruiter-friendly explanations that highlight candidate strengths, skill gaps, and role relevance. This helps recruiters explain shortlist decisions to hiring managers and reduces random or unclear candidate movement.`
      ],
      [
        'Move candidates through the hiring pipeline faster',
        `Shortlisting is only useful when the next step is clear. After a candidate is shortlisted, recruiters need to move them to communication, screening tests, or interview scheduling. HireScoreAI helps connect shortlisting with the hiring pipeline so candidates do not get lost in spreadsheets or manual notes. A connected workflow helps recruiters act faster and improves the candidate experience.`
      ],
      [
        'How HireScoreAI supports quality shortlisting',
        `HireScoreAI supports quality shortlisting by connecting job creation, public apply pages, resume upload, AI parsing, JD matching, candidate scoring, candidate ranking, explanations, and pipeline movement. This gives recruiters a full view of candidate fit before making decisions. The platform helps recruiters save time while keeping the recruiter in control. This balance is important because good hiring needs both automation and human judgment.`
      ],
      [
        'Final thoughts',
        `Recruiters need to shortlist faster, but speed should not reduce quality. AI can help when it gives recruiters structured candidate data, JD-based scoring, ranking, matched skills, missing skills, and explanations. HireScoreAI helps recruiters build better shortlists with less manual work and more clarity. For recruitment agencies, HR teams, startups, and staffing companies, AI shortlisting can improve hiring speed and decision quality together.`
      ],
    ],
    links: [
      '/product/ai-shortlisting',
      '/product/ai-candidate-ranking',
      '/product/ai-candidate-scoring',
      '/product/ai-explanation-engine',
      '/product/candidate-communication',
    ],
  },

  {
    slug: '/resources/blogs/complete-guide-to-ai-powered-hiring-automation',
    title: 'Complete Guide to AI-Powered Hiring Automation for Recruiters',
    meta: 'A complete guide to AI hiring automation covering job creation, public apply pages, resume upload, AI resume screening, candidate ranking, shortlisting, communication, tests, and interview scheduling.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    category: 'Hiring Automation',
    readTime: '11 min read',
    sections: [
      [
        'Introduction',
        `Hiring automation helps recruiters reduce manual work and manage candidates in a more organized way. In many hiring teams, job details are stored in one place, resumes come from multiple channels, screening happens manually, shortlists are managed in spreadsheets, and interviews are tracked separately. This creates delays and confusion. AI-powered hiring automation connects these steps into one workflow. HireScoreAI helps recruiters create jobs, collect applications, upload resumes, parse candidate profiles, match resumes with job descriptions, rank candidates, shortlist profiles, and move candidates toward communication, tests, and interviews.`
      ],
      [
        'What is AI-powered hiring automation?',
        `AI-powered hiring automation means using AI and connected workflows to simplify recruitment tasks. It can include job creation, public apply pages, resume collection, AI resume parsing, JD-based candidate scoring, candidate ranking, shortlisting, communication, screening tests, interview scheduling, and pipeline tracking. The goal is not to remove recruiters. The goal is to reduce repetitive work, improve candidate visibility, and help recruiters make faster decisions with better context.`
      ],
      [
        'Why disconnected hiring tools slow recruiters down',
        `Recruiters often use multiple tools at the same time. They may create jobs in one system, collect resumes through email, track candidates in spreadsheets, and schedule interviews manually. This creates duplicate work and makes it difficult to know candidate status. When hiring volume increases, disconnected tools become harder to manage. AI-powered hiring automation helps by connecting job, application, resume, screening, shortlisting, and next-step data in one workflow.`
      ],
      [
        'Step 1: Create a job with a clear JD',
        `The first step in hiring automation is job creation. Recruiters should create a job with the right title, role description, responsibilities, required skills, experience range, location, work mode, and salary range if available. HireScoreAI uses the job description as the foundation for candidate matching. A clear JD improves AI screening because every candidate is compared against the right requirements.`
      ],
      [
        'Step 2: Collect applications through public apply pages',
        `After creating a job, recruiters need a clean way to collect candidates. Public apply pages help candidates apply through a role-specific link. This reduces scattered resume collection and keeps applications connected to the right job. HireScoreAI helps recruiters connect job creation with public apply pages so candidate intake becomes easier to manage. This also helps recruiters track which candidate applied for which role.`
      ],
      [
        'Step 3: Upload resumes and parse candidate profiles',
        `Recruiters may collect resumes from apply pages, job portals, referrals, or manual uploads. AI resume parsing helps convert these resumes into structured candidate profiles. HireScoreAI can extract candidate details such as skills, experience, education, contact information, designation, and role-related signals. This reduces manual data entry and gives recruiters a cleaner view of each candidate.`
      ],
      [
        'Step 4: Match resumes with job descriptions',
        `After parsing, candidates should be matched with the job description. JD-based matching helps recruiters understand candidate fit in context. HireScoreAI compares candidate profiles with the JD and helps identify matched skills, missing skills, experience relevance, and role-fit signals. This is much better than reviewing resumes manually or depending only on keyword matching.`
      ],
      [
        'Step 5: Rank candidates and shortlist faster',
        `AI candidate ranking helps recruiters review stronger profiles first. HireScoreAI can help rank candidates based on JD-based scoring and candidate fit signals. Recruiters can open top profiles, review matched skills, check missing skills, read explanations, and shortlist suitable candidates. This reduces manual comparison and helps teams move faster without losing decision quality.`
      ],
      [
        'Step 6: Move candidates to communication, tests, and interviews',
        `Hiring does not end at shortlisting. Recruiters need to communicate with candidates, validate skills, and schedule interviews. HireScoreAI supports the idea of a connected hiring pipeline where shortlisted candidates can move toward communication, screening tests, and interview scheduling. This keeps candidate status organized and prevents strong profiles from getting lost after screening.`
      ],
      [
        'Why HireScoreAI is more than a resume parser',
        `Many tools only extract resume data. HireScoreAI is built as an AI-powered recruitment and ATS platform for the early hiring workflow. It connects job creation, public apply pages, resume upload, AI resume parsing, JD-based scoring, candidate ranking, explainable AI, shortlisting, communication, tests, interview scheduling, and hiring pipeline automation. This makes it useful for recruiters who want one organized workflow instead of multiple disconnected tools.`
      ],
      [
        'Final thoughts',
        `AI-powered hiring automation helps recruiters save time, improve candidate visibility, and manage hiring more efficiently. It brings structure to job creation, application collection, resume screening, candidate ranking, shortlisting, and next-step movement. HireScoreAI helps recruitment agencies, HR teams, startups, and staffing companies manage the early hiring workflow with AI-powered screening and pipeline automation. For teams that want faster and smarter hiring, connected automation can become a strong advantage.`
      ],
    ],
    links: [
      '/product/hiring-pipeline',
      '/product/create-job',
      '/product/public-apply-page',
      '/product/ai-resume-parsing',
      '/product/interview-scheduling',
    ],
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
  ['What is HireScoreAI?', 'HireScoreAI is an independent AI-powered recruitment workflow platform that helps recruiters create jobs, generate public apply pages, collect candidate applications, upload resumes, screen resumes with AI, rank candidates, view AI fit explanations, track hiring analytics, manage candidate communication, and schedule interviews from one platform.'],
  ['Is HireScoreAI the same as HiredScore or Workday?', 'No. HireScoreAI is an independent recruitment workflow platform and is not affiliated with HiredScore, HireScore.com, or Workday.'],
  ['Where do product CTAs go?', `Login CTAs point to ${APP_URL}. Free pilot access is requested by emailing ${CONTACT_EMAIL}.`],
  ['Can recruiters use it for high-volume roles?', 'Yes. HireScoreAI is designed to help recruiters screen and rank large candidate pools faster.'],
  ['Does HireScoreAI replace recruiters?', 'No. It supports recruiter decisions with structured insights, scores, and explanations. Human review stays important.'],
]

const pricingPlans = [
  {
    name: 'Free Pilot',
    badge: 'Available now',
    price: 'Free',
    period: '7 days',
    jobs: '3 active jobs',
    text: 'Test HireScoreAI with real hiring workflows before choosing a paid plan.',
    items: ['3 active jobs for 7 days', 'Resume screening', 'Candidate ranking', 'Pilot support'],
    cta: 'Start Free Pilot',
    href: PILOT_MAILTO,
  },
  {
    name: 'Starter',
    badge: 'Monthly plan',
    price: '₹599',
    period: 'per month',
    jobs: '5 active jobs',
    text: 'For small teams starting with AI resume screening and structured job workflows.',
    items: ['5 active jobs for 1 month', 'Upload resumes', 'AI scoring', 'Public apply pages'],
    cta: 'Choose Starter',
    href: APP_URL,
  },
  {
    name: 'Growth',
    badge: 'Most popular',
    price: '₹1599',
    period: 'per month',
    jobs: '15 active jobs',
    text: 'For growing teams managing multiple roles, shortlists, and hiring managers.',
    items: ['15 active jobs for 1 month', 'Advanced workflow', 'Communication stages', 'Interview scheduling'],
    cta: 'Choose Growth',
    href: APP_URL,
    featured: true,
  },
  {
    name: 'Enterprise',
    badge: 'Custom plan',
    price: 'Custom',
    period: 'talk to an expert',
    jobs: 'Custom active jobs',
    text: 'For teams that need custom rollout, workflow consultation, and priority support.',
    items: ['Custom active job limits', 'Custom onboarding', 'Team governance', 'Priority support'],
    cta: 'Talk to an expert',
    href: '/contact',
  },
]

const pricingFaqs = [
  ['Does the free pilot require a credit card?', `No. Free pilot access is requested by emailing ${CONTACT_EMAIL}; the team can confirm access and fit before any paid INR plan starts.`],
  ['What happens after the 7-day pilot ends?', 'After the 7-day pilot, teams can choose a monthly INR plan based on active job volume or talk to an expert for a custom rollout.'],
  ['Can I switch plans as my hiring volume changes?', 'Yes. Teams can move to a plan that better matches active job volume as hiring needs change.'],
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

function finalInternalHref(href = '') {
  if (
    !href ||
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('#')
  ) return href

  const [beforeHash, hash = ''] = href.split('#')
  const [pathname, query = ''] = beforeHash.split('?')
  if (!pathname.startsWith('/') || pathname.includes('.')) return href
  const normalized = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
  return `${normalized}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`
}

function Link({ href, children, className, onClick, ...props }) {
  const finalHref = finalInternalHref(href)
  return (
    <a
      href={finalHref}
      className={className}
      onClick={(event) => {
        if (!href.startsWith('http') && !href.startsWith('mailto:')) {
          event.preventDefault()
          navigateTo(finalHref)
        }
        if (onClick) onClick()
      }}
      {...props}
    >
      {children}
    </a>
  )
}

function SEO({ title, description, path = '/', type = 'website', schemaHeadline }) {
  useEffect(() => {
    const config = getSeoConfig(path, { title, description, type })
    const robots = config.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    document.title = config.title
    document.documentElement.lang = 'en'
    setMeta('description', config.description)
    setMeta('robots', robots)
    setMeta('googlebot', robots)
    setMeta('author', BRAND_NAME)
    setMeta('application-name', BRAND_NAME)
    setMeta('theme-color', '#100d18')
    setMeta('referrer', 'strict-origin-when-cross-origin')
    setMeta('format-detection', 'telephone=no')
    setMeta('og:title', config.title, 'property')
    setMeta('og:description', config.description, 'property')
    setMeta('og:url', config.canonical, 'property')
    setMeta('og:type', config.ogType || 'website', 'property')
    setMeta('og:site_name', BRAND_NAME, 'property')
    setMeta('og:locale', 'en_US', 'property')
    setMeta('og:image', config.image, 'property')
    setMeta('og:image:secure_url', config.image, 'property')
    setMeta('og:image:alt', `${BRAND_NAME} – AI recruitment workflow platform`, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', config.title)
    setMeta('twitter:description', config.description)
    setMeta('twitter:image', config.image)
    setMeta('twitter:image:alt', `${BRAND_NAME} – AI recruitment workflow platform`)
    setCanonical(config.canonical)
    setAlternate('en', config.canonical)
    setAlternate('x-default', config.canonical)
    setJsonLd('route-schema', buildRouteSchema({ ...config, renderedH1: schemaHeadline }))
  }, [title, description, path, type, schemaHeadline])
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

function setAlternate(lang, href) {
  let tag = document.head.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'alternate')
    tag.setAttribute('hreflang', lang)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function setJsonLd(id, payload) {
  const matchingTags = [...document.querySelectorAll(`script#${id}[type="application/ld+json"]`)]
  let tag = matchingTags.shift()
  matchingTags.forEach((duplicate) => duplicate.remove())
  if (!payload) {
    if (tag) tag.remove()
    return
  }
  if (!tag) {
    tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.id = id
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(payload)
}

function Logo() {
  return (
    <Link className="logo" href="/" aria-label="HireScoreAI home">
      <span className="logoMark"><img src="/hirescore-logo-mark.png" alt="" /></span>
      <span className="logoText">HireScore <strong>AI</strong></span>
    </Link>
  )
}

function Header({ isHome = false }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="siteHeader">
      <div className="navShell">
        <Link className="homeFullLogo" href="/" aria-label="HireScoreAI home"><img src="/hirescore-logo-white.png" alt="HireScoreAI" /></Link>
        <nav className="desktopNav homeNav unifiedNav" aria-label="Primary navigation">
          <a href={isHome ? '#about' : '/#about'}>About Us</a>
          <Dropdown label="Product" base="/product/hirescore-ai" items={productNavItems} />
          <Dropdown label="Solutions" base="/solutions" items={solutionNavItems} />
          <Link href="/resources">Resources</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
        <div className="navActions">
          <a className="homeLogin" href={APP_URL}>Login</a>
          <a className="btn btnPrimary" href={PILOT_MAILTO}>Start Free Pilot</a>
        </div>
        <button className="menuButton" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="mobileNav" aria-label="Mobile navigation">
          {['/', '/product/hirescore-ai', '/product/jd-manager', '/solutions', '/resources', '/pricing', '/contact'].map((path) => (
            <Link key={path} href={path} onClick={() => setOpen(false)}>{labelFor(path)}</Link>
          ))}
          <a className="btn btnPrimary" href={PILOT_MAILTO}>Start Free Pilot</a>
        </nav>
      )}
    </header>
  )
}

function Dropdown({ label, base, items }) {
  return (
    <div className="dropdown">
      <Link href={base} className="dropTrigger">{label}<ChevronDown size={15} /></Link>
      <div className="dropMenu" role="menu" aria-label={`${label} menu`}>
        {items.map(([href, text]) => <Link href={href} key={href}>{text}</Link>)}
      </div>
    </div>
  )
}

function labelFor(path) {
  const labels = {
    '/': 'Home',
    '/product': 'Product',
    '/product/hirescore-ai': 'HireScoreAI',
    '/product/jd-manager': 'JD Manager',
    '/solutions': 'Solutions',
    '/resources': 'Resources',
    '/resources/user-guide': 'User Guide',
    '/resources/blogs': 'Blogs',
    '/resources/case-studies': 'Case Studies',
    '/pricing': 'Pricing',
    '/contact': 'Contact',
  }
  return labels[path] || path
}

function PageHero({ eyebrow, title, titleHighlight, intro, cta = true, className = '' }) {
  return (
    <section className={`pageHero ${className}`}>
      <div className="container heroGrid">
        <div>
          <span className="eyebrow"><Sparkles size={14} />{eyebrow}</span>
          <h1>{title}{titleHighlight && <span className="titleHighlight">{titleHighlight}</span>}</h1>
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
      <a className="btn btnPrimary btnLarge" href={PILOT_MAILTO}>Start Free Pilot <ArrowRight size={18} /></a>
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
      <img src="/hirescore-logo-white.png" alt="HireScoreAI logo and product identity" className="dashLogo" />
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

function CTASection({ title = 'Start your free HireScoreAI pilot', text = 'Test AI resume screening, candidate ranking, and hiring workflow automation with your real hiring process.' }) {
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
  useEffect(() => {
    const root = document.querySelector('.commandHome')
    const canvas = root?.querySelector('.commandCosmos')
    if (!root || !canvas) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let stars = []
    let animationFrame = 0

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.15,
      }))
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(210, 187, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        star.y -= star.speed
        if (star.y < -2) star.y = window.innerHeight + 2
      })
      animationFrame = window.requestAnimationFrame(drawStars)
    }

    resizeCanvas()
    if (!reducedMotion) drawStars()
    window.addEventListener('resize', resizeCanvas)

    const animateCounter = (element) => {
      if (element.dataset.animated) return
      element.dataset.animated = 'true'
      const target = Number(element.dataset.target)
      const decimals = Number(element.dataset.decimals ?? (Number.isInteger(target) ? 0 : 1))
      if (reducedMotion) {
        element.textContent = target.toFixed(decimals)
        return
      }
      const startTime = performance.now()
      const tick = (time) => {
        const progress = Math.min((time - startTime) / 2000, 1)
        element.textContent = (target * (1 - Math.pow(1 - progress, 3))).toFixed(decimals)
        if (progress < 1) window.requestAnimationFrame(tick)
      }
      window.requestAnimationFrame(tick)
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('active')
        entry.target.querySelectorAll('.counterAnimate').forEach(animateCounter)
        entry.target.querySelectorAll('.commandBar, .commandBarVertical').forEach((bar) => bar.classList.add('active'))
        revealObserver.unobserve(entry.target)
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -45px 0px' })

    root.querySelectorAll('.commandReveal').forEach((element) => revealObserver.observe(element))

    const tiltCard = root.querySelector('#candidate-command-card')
    const tilt = (event) => {
      if (!tiltCard || reducedMotion || !tiltCard.classList.contains('active')) return
      const rect = tiltCard.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      tiltCard.style.transform = `perspective(1200px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) scale(1.005)`
    }
    const resetTilt = () => { if (tiltCard) tiltCard.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)' }
    window.addEventListener('mousemove', tilt)
    tiltCard?.addEventListener('mouseleave', resetTilt)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', tilt)
      tiltCard?.removeEventListener('mouseleave', resetTilt)
      revealObserver.disconnect()
    }
  }, [])

  const advantageCards = [
    [Network, 'HireScoreAI Ingestion', 'Centralize resumes from LinkedIn, Indeed, Naukri, and your own custom “Instant Apply” pages automatically via HireScoreAI Sync.', '01'],
    [BrainCircuit, 'Neural Engine', 'Explainable ranking powered by HireScoreAI Neural Intelligence. Understand exactly why a candidate is or isn’t a match.', 'AI VERIFIED'],
    [BarChart3, 'Executive Reporting', 'Generate board-ready reports tracking ROI, funnel conversion, and source attribution with HireScoreAI Analytics.', 'PREVIEW ANALYTICS'],
    [CalendarCheck, 'HireScoreAI Automation', 'Autonomous booking for top-tier candidates. Zero-friction workflow from shortlist to first interview.', 'LIVE'],
  ]
  const shortlistSteps = [
    [SearchCheck, 'Deep Context Parsing', 'HireScoreAI analyzes resumes against specific scorecard criteria, extracting intent and achievements beyond keywords.'],
    [BrainCircuit, 'Neural Benchmarking', 'Ranking candidates using HireScoreAI cross-industry evidence and peer-performance data to normalize skill levels.'],
    [ShieldCheck, 'Bias-Free Validation', 'Ensuring objective scoring by masking identifying data and applying strict HireScoreAI merit-based logic filters.'],
    [FileSearch, 'Evidence-Based Output', 'Providing the HireScoreAI recruiter insight—instant language explanations for every score assigned.'],
  ]
  return (
    <div className="commandHome">
      <canvas className="commandCosmos" aria-hidden="true" />
      <SEO path="/" />
      <section className="commandHero">
        <div className="commandGlow commandGlowOne" />
        <div className="commandContainer commandHeroGrid">
          <div className="commandHeroCopy">
            <span className="commandPill"><Rocket size={12} /> The recruitment command center</span>
            <h1>{HOME_H1}</h1>
            <p>Use AI recruitment software to screen resumes, apply JD-based candidate scoring, rank stronger applicants, and move hiring forward from one explainable, recruiter-controlled workspace.</p>
            <div className="commandActions">
              <a className="commandButton commandButtonPrimary" href={PILOT_MAILTO}>Start Free Pilot <ArrowRight size={17} /></a>
              <Link className="commandButton commandButtonGhost" href="/contact">Book Product Demo</Link>
            </div>
            <div className="heroProof"><span><BadgeCheck size={15} /> Explainable AI</span><i /><span><Zap size={15} /> Recruiter controlled</span></div>
          </div>
          <div className="commandHeroVisual">
            <div className="commandHeroVisualTop"><span><i /> Live candidate intelligence</span><small>One connected workspace</small></div>
            <ProductHeroDashboard />
            <div className="commandHeroVisualFoot"><span>Resume intelligence</span><span>Explainable ranking</span><span>Pipeline visibility</span></div>
          </div>
        </div>
      </section>
      <AboutCommandSection />
      <CompleteHiringWorkflowSection />
      <ActionAiAgentSection surface="home" />
      <JDMatchIntelligence />
      <section className="commandSection advantageSection" id="advantage">
        <div className="commandContainer">
          <CommandHeading title={<>AI recruitment software built for <span>practical hiring work</span></>} text="Use one connected platform for resume intelligence, evidence-led ranking, recruiter review, communication, and interviews." />
          <div className="advantageGrid commandReveal commandDelay1">
            {advantageCards.map(([Icon, title, text, label], index) => (
              <article className="advantageCard" key={title} style={{ '--card-delay': `${index * 90}ms` }}>
                <div className="commandIcon"><Icon size={22} /></div>
                <h3>{title}</h3><p>{text}</p><small>{label}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="commandSection sourcingSection" id="product">
        <div className="commandContainer sourcingGrid">
          <div className="sourcingCopy commandReveal">
            <h2>Precision Sourcing by<br /><span>HireScoreAI</span></h2>
            <p>Eliminate guesswork. The HireScoreAI Command Center tracks exactly which source yields your highest-quality hires, allowing you to optimize your recruitment spend with total confidence.</p>
            <div className="yieldCard"><small>Yield by channel</small>{[['LinkedIn',76],['Indeed',48],['Naukri',66]].map(([name,value]) => <div className="yieldRow" key={name}><b>{name}</b><i><span className="commandBar" style={{ '--bar-width': `${value}%` }} /></i><em><span className="counterAnimate" data-target={value}>0</span>%</em></div>)}</div>
            <div className="statusPills"><span>● HireScoreAI Command Center Active</span><span>↻ Multi-Source Sync</span></div>
          </div>
          <div className="pipelineCard commandReveal commandDelay2">
            <div className="pipelineTop"><small>HireScoreAI pipeline stream</small><b>Syncing sources...</b></div>
            {[['AS','Alice Smith',88],['RK','Rahul Kumar',82],['LJ','Leo Jackson',71]].map(([initials,name,score], i) => <div className={`pipelineRow p${i+1}`} key={name}><span>{initials}</span><div><strong>{name}</strong><small>via HireScoreAI talent cloud</small></div><b><span className="counterAnimate" data-target={score}>0</span><small>match</small></b></div>)}
          </div>
        </div>
      </section>
      <section className="commandSection shortlistSection">
        <div className="commandContainer">
          <CommandHeading title={<>Candidate ranking software for <span>explainable shortlisting</span></>} text="Turn large applicant pools into prioritized candidates using role-fit evidence, matched skills, and recruiter-controlled decisions." />
          <div className="shortlistGrid commandReveal commandDelay1">
            {shortlistSteps.map(([Icon,title,text], index) => <article className="shortlistCard" key={title}><b className="stepNumber">{index+1}</b><div className="commandIcon"><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="commandSection intelligenceSection" id="intelligence">
        <div className="commandContainer">
          <CommandHeading title={<>Board-Ready <span>HireScoreAI Intelligence</span></>} text="Transform raw recruitment data into sophisticated executive insights. Demonstrate hire quality and efficiency gains with HireScoreAI’s data-driven clarity." />
          <div className="intelligenceGrid commandReveal commandDelay1"><AnalyticsCard /><div className="qualityStack"><MetricCard label="Hire quality index" value="4.9" suffix="/ 5.0" text="Average stakeholder rating for shortlists sourced via HireScoreAI Intelligence." /><MetricCard label="Efficiency multiplier" value="72" suffix="%" text="Reduction in manual screening hours per role since HireScoreAI deployment." /></div></div>
        </div>
      </section>
      <HomepageFaqSection />
      <section className="commandCta"><div className="commandContainer commandCtaBox commandReveal"><h2>Scale Your Global<br /><span>HireScoreAI Talent Engine</span></h2><p>Join hundreds of world-class recruitment teams using the HireScoreAI Command Center to build elite organizations.</p><div className="commandActions"><a className="commandButton commandButtonPrimary" href={PILOT_MAILTO}>Request Free Access</a><Link className="commandButton commandButtonGhost" href="/contact">Consult With Specialists</Link></div></div></section>
    </div>
  )
}

function CommandHeading({ title, text }) { return <div className="commandHeading commandReveal"><h2>{title}</h2><p>{text}</p></div> }

function HomepageFaqSection() {
  return (
    <section className="commandSection homeFaqSection" id="home-faq" aria-labelledby="home-faq-title">
      <div className="commandContainer">
        <div className="commandHeading commandReveal">
          <h2 id="home-faq-title">AI resume screening software FAQs</h2>
          <p>Clear answers about candidate scoring, AI ATS workflows, recruitment automation, and recruiter control.</p>
        </div>
        <div className="homeFaqLayout commandReveal commandDelay1">
          <div className="homeFaqList">
            {HOME_FAQS.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<ChevronDown size={18} /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <aside className="homeSeoLinks">
            <span>Explore connected workflows</span>
            <Link href="/product/hirescore-ai">HireScoreAI product overview <ArrowRight size={15} /></Link>
            <Link href="/product/ai-resume-parsing">AI resume screening <ArrowRight size={15} /></Link>
            <Link href="/product/ai-candidate-scoring">JD-based candidate scoring <ArrowRight size={15} /></Link>
            <Link href="/solutions/bulk-resume-screening">Bulk resume screening <ArrowRight size={15} /></Link>
            <Link href="/resources/user-guide/review-ai-ranked-candidates">Candidate ranking guide <ArrowRight size={15} /></Link>
            <Link href="/resources">Recruitment resources <ArrowRight size={15} /></Link>
            <Link href="/resources/blogs">AI recruitment blog <ArrowRight size={15} /></Link>
            <Link href="/pricing">HireScoreAI pricing <ArrowRight size={15} /></Link>
          </aside>
        </div>
        <nav className="inlineLinks" aria-label="HireScoreAI product capabilities">
          <Link href="/product/public-apply-page">Public apply pages</Link>
          <Link href="/product/resume-upload">Resume upload</Link>
          <Link href="/product/ai-candidate-ranking">Candidate ranking</Link>
          <Link href="/product/ai-shortlisting">Candidate shortlisting</Link>
          <Link href="/product/candidate-communication">Candidate communication</Link>
          <Link href="/product/interview-scheduling">Interview scheduling</Link>
          <Link href="/product/ai-screening-test">AI screening tests</Link>
          <Link href="/product/hiring-pipeline">Hiring pipeline</Link>
        </nav>
        <nav className="inlineLinks" aria-label="HireScoreAI solutions">
          <Link href="/solutions/recruitment-agencies">Recruitment agency screening</Link>
          <Link href="/solutions/staffing-companies">Staffing company workflows</Link>
          <Link href="/solutions/hr-teams">In-house HR teams</Link>
          <Link href="/solutions/startups">Startup hiring</Link>
          <Link href="/solutions/bulk-resume-screening">High-volume resume screening</Link>
          <Link href="/solutions/tech-hiring">Technical hiring</Link>
        </nav>
      </div>
    </section>
  )
}

function AboutCommandSection() {
  const capabilities = [
    [BrainCircuit, 'Explainable by design', 'Every score is supported by role-specific evidence, matched skills, and transparent reasoning.'],
    [Workflow, 'One connected workflow', 'Jobs, applications, resume intelligence, shortlisting, communication, and interviews stay connected.'],
    [ShieldCheck, 'Recruiter-controlled AI', 'AI accelerates the analysis while your hiring team stays in control of every decision.'],
  ]
  return (
    <section className="commandSection aboutCommandSection" id="about">
      <div className="commandContainer aboutCommandGrid">
        <div className="aboutCommandCopy commandReveal">
          <span className="sectionKicker"><Sparkles size={13} /> About HireScoreAI</span>
          <h2>AI recruitment software built for <span>clarity, speed, and better decisions.</span></h2>
          <p>HireScoreAI is an independent AI recruitment workflow platform that turns disconnected hiring activity into one explainable command center—from job creation and resume screening to candidate ranking and interview coordination.</p>
          <div className="aboutFounderIdentity" id="sachin-yadav">
            <span><UsersRound size={18} /></span>
            <div><small>Founder</small><strong>Sachin Yadav</strong><p>Founder of HireScoreAI, focused on building a clearer, connected, and recruiter-controlled AI hiring workflow.</p></div>
          </div>
          <div className="aboutStats">
            <div><strong><span className="counterAnimate" data-target="12">0</span><em>+</em></strong><small>Connected workflow modules</small></div>
            <div><strong><span className="counterAnimate" data-target="1">0</span></strong><small>Unified hiring workspace</small></div>
            <div><strong><span className="counterAnimate" data-target="24">0</span><em>/7</em></strong><small>Recruitment intelligence</small></div>
          </div>
        </div>
        <div className="aboutCapabilityStack commandReveal commandDelay2">
          {capabilities.map(([Icon,title,text],index)=><article key={title} style={{'--about-delay':`${index * 110}ms`}}><div className="commandIcon"><Icon size={20}/></div><div><h3>{title}</h3><p>{text}</p></div><span>{String(index+1).padStart(2,'0')}</span></article>)}
        </div>
      </div>
    </section>
  )
}

function CompleteHiringWorkflowSection() {
  const hiringWorkflow = [
    [BriefcaseBusiness, 'Create Job', 'Define the role and requirements'],
    [Globe2, 'Apply Page', 'Publish and share the opening'],
    [Files, 'Collect Resumes', 'Centralize every applicant'],
    [SearchCheck, 'AI Screening', 'Parse skills and experience'],
    [Target, 'JD Matching', 'Score and rank role fit'],
    [BadgeCheck, 'Shortlist', 'Advance the best candidates'],
    [Send, 'Communicate', 'Keep candidates engaged'],
    [CalendarCheck, 'Schedule Interview', 'Move confidently to interview'],
  ]
  return (
    <section className="commandSection completeWorkflowSection" id="complete-workflow">
      <div className="commandContainer">
        <div className="workflowSectionIntro commandReveal">
          <span className="sectionKicker"><Workflow size={13}/> How HireScoreAI works</span>
          <h2>AI ATS software that keeps <span>every hiring step connected.</span></h2>
          <p>Follow the complete hiring journey from creating a job to scheduling an interview. As the live signal moves, the active stage lights up to show exactly what HireScoreAI is doing.</p>
        </div>
        <div className="aboutWorkflowPanel commandReveal commandDelay1">
          <div className="aboutWorkflowHeading"><div><small>Complete hiring process in one place</small><h3>From job creation to interview scheduling</h3></div><span className="workflowLive"><i/> Live workflow</span></div>
          <div className="workflowRail">
            {hiringWorkflow.map(([Icon,title,text],index)=><div className="workflowNode" key={title} style={{'--workflow-index':index}}><div className="workflowNodeIcon"><Icon size={19}/><span>{index+1}</span></div><strong>{title}</strong><small>{text}</small>{index < hiringWorkflow.length-1 && <ArrowRight className="workflowArrow" size={14}/>}</div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function ActionAiAgentSection({ surface = 'product' }) {
  const capabilities = [
    [Workflow, 'Work across HireScoreAI', 'Use plain English to operate any connected HireScoreAI feature available in your workspace.'],
    [BriefcaseBusiness, 'Create and manage hiring work', 'Create jobs, launch apply pages, review pipelines, or ask the agent to update the next step.'],
    [SearchCheck, 'Ask questions about your data', 'Get answers about jobs, applicants, skills, scores, rankings, shortlists, and hiring activity.'],
    [Zap, 'Take connected actions', 'Turn your request into action across screening, communication, interview, and workflow tools.'],
  ]
  const wrapperClass = surface === 'home'
    ? 'commandSection actionAgentSection actionAgentHome'
    : surface === 'solutions'
      ? 'solutionPage-section actionAgentSection actionAgentSolutions'
      : 'productPage-section actionAgentSection actionAgentProduct'
  const containerClass = surface === 'home' ? 'commandContainer' : 'container'
  const heading = surface === 'home'
    ? <>Recruitment automation software you can operate in <em>plain English.</em></>
    : <>Ask for anything across HireScoreAI in <em>plain English.</em></>

  return (
    <section id="action-ai-agent" className={wrapperClass} aria-labelledby={`action-agent-title-${surface}`}>
      <div className={`${containerClass} actionAgentLayout`}>
        <div className="actionAgentCopy">
          <span className="actionAgentEyebrow"><Bot size={15} /> HireScoreAI Action Agent</span>
          <h2 id={`action-agent-title-${surface}`}>{heading}</h2>
          <p>The HireScoreAI Action Agent is not limited to a fixed list of commands. Tell it what you want to accomplish and it can work across every connected HireScoreAI feature available in your workspace. Creating jobs, generating apply pages, analyzing applicants, shortlisting, emailing, and scheduling interviews are just a few examples.</p>
          <div className="actionAgentCapabilities">
            {capabilities.map(([Icon, title, text]) => (
              <article key={title}>
                <Icon size={18} />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
          <div className="actionAgentControl"><ShieldCheck size={17} /><span><strong>Workspace-wide assistance, with you in control.</strong> The agent can help across HireScoreAI while important actions remain reviewable and final hiring decisions stay with your team.</span></div>
        </div>

        <div className="actionAgentConsole" aria-label="HireScoreAI Action Agent workflow example">
          <header>
            <span><Bot size={18} /></span>
            <div><strong>HireScoreAI Agent</strong><small><i /> Ready to help</small></div>
            <em>Workspace action mode</em>
          </header>
          <div className="actionAgentConversation">
            <div className="actionAgentMessage isUser">
              <small>You</small>
              <p>Create a Senior React Developer job in Bengaluru and make a public apply page.</p>
            </div>
            <div className="actionAgentMessage isAgent">
              <small>AI Agent</small>
              <p>Job and public apply page prepared. I used your role requirements and added the required React, TypeScript, and API skills.</p>
              <div className="actionAgentResult"><CheckCircle2 size={15} /><span><strong>Senior React Developer</strong><small>Job active · Apply page ready</small></span></div>
            </div>
            <div className="actionAgentMessage isUser">
              <small>You</small>
              <p>How many candidates applied? Shortlist everyone scoring above 70, email them, and schedule interviews.</p>
            </div>
            <div className="actionAgentPlan">
              <div><UsersRound size={16} /><span><strong>48 applicants reviewed</strong><small>Skills and JD-fit checked</small></span><CheckCircle2 size={15} /></div>
              <div><BadgeCheck size={16} /><span><strong>12 candidates shortlisted</strong><small>Score threshold: above 70</small></span><CheckCircle2 size={15} /></div>
              <div><MailCheck size={16} /><span><strong>Candidate email prepared</strong><small>Ready for recruiter approval</small></span><CheckCircle2 size={15} /></div>
              <div><CalendarCheck size={16} /><span><strong>Interview slots coordinated</strong><small>Availability matched</small></span><CheckCircle2 size={15} /></div>
            </div>
          </div>
          <footer><MessageSquareText size={16} /><span>Ask anything about your HireScoreAI workspace...</span><button type="button" aria-label="Send example command"><ArrowRight size={16} /></button></footer>
        </div>
      </div>
    </section>
  )
}

function AgentDetailBand({ title, text, prompts = [], note = 'Available actions depend on the connected HireScoreAI features and recruiter permissions in your workspace.' }) {
  return (
    <section className="section agentDetailBand" aria-label="HireScoreAI Action Agent">
      <div className="container agentDetailBandLayout">
        <div className="agentDetailBandCopy">
          <span><Bot size={15} /> HireScoreAI Action Agent</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="agentDetailBandNote"><ShieldCheck size={16} /><small>{note}</small></div>
        </div>
        <div className="agentDetailPromptList" aria-label="Example plain English commands">
          <header><MessageSquareText size={16} /><strong>Try asking in plain English</strong><em>Examples</em></header>
          {prompts.map((prompt, index) => (
            <div key={prompt}><span>{String(index + 1).padStart(2, '0')}</span><p>{prompt}</p><ArrowRight size={15} /></div>
          ))}
          <Link href="/product/hirescore-ai">Explore the Action AI Agent <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  )
}

function JDMatchIntelligence() {
  const presentSkills = [['React / Next.js',96],['Node.js / APIs',92],['TypeScript',88],['PostgreSQL',84]]
  const skillGaps = [['Kubernetes',42],['Terraform',28],['GraphQL federation',18]]
  return (
    <section className="commandSection jdIntelligenceSection" id="jd-match">
      <div className="commandContainer">
        <CommandHeading
          title={<>JD-based candidate scoring and <span>match intelligence</span></>}
          text="See how a candidate matches the job description, which required skills are already present, where gaps remain, and why the profile deserves recruiter attention."
        />
        <div className="jdIntelligenceShell commandReveal commandDelay1">
          <div className="jdTopbar">
            <div>
              <span className="sectionKicker"><Target size={13}/> Live role analysis</span>
              <h3>Senior Full-Stack Engineer</h3>
              <p>Job description × Marcus Chen profile</p>
            </div>
            <div className="jdSignal"><span>Neural evidence synced</span><i/></div>
          </div>
          <div className="jdIntelligenceGrid">
            <div className="jdScorePanel">
              <small>Overall JD matching score</small>
              <div className="jdScoreRing"><div><strong><span className="counterAnimate" data-target="91.8" data-decimals="1">0</span><em>%</em></strong><span>Excellent fit</span></div></div>
              <div className="jdScoreLegend"><span><i/>Required skills</span><b><span className="counterAnimate" data-target="12">0</span>/<span className="counterAnimate" data-target="15">0</span></b></div>
              <p>High-confidence alignment across architecture, backend delivery, product ownership, and scale-up experience.</p>
            </div>
            <div className="skillGraphPanel">
              <div className="graphHeading"><div><small>Skills present</small><strong><span className="counterAnimate" data-target="12">0</span> verified</strong></div><BadgeCheck size={20}/></div>
              <div className="skillBars">
                {presentSkills.map(([skill,value]) => <div className="skillBarRow" key={skill}><div><span>{skill}</span><em><span className="counterAnimate" data-target={value}>0</span>%</em></div><i><span className="commandBar" style={{'--bar-width':`${value}%`}}/></i></div>)}
              </div>
            </div>
            <div className="skillGraphPanel gapPanel">
              <div className="graphHeading"><div><small>Skill gap analysis</small><strong><span className="counterAnimate" data-target="3">0</span> development areas</strong></div><SearchCheck size={20}/></div>
              <div className="skillBars">
                {skillGaps.map(([skill,value]) => <div className="skillBarRow" key={skill}><div><span>{skill}</span><em><span className="counterAnimate" data-target={value}>0</span>% gap</em></div><i><span className="commandBar gapBar" style={{'--bar-width':`${value}%`}}/></i></div>)}
              </div>
              <div className="gapNote"><ShieldCheck size={16}/><span>No critical blocker detected</span></div>
            </div>
            <div className="aiFitExplanation">
              <div className="aiFitHeader"><div className="commandIcon"><BrainCircuit size={22}/></div><div><small>HireScoreAI explanation</small><h3>Why this candidate fits the role</h3></div><span>High confidence</span></div>
              <p>Marcus demonstrates strong full-stack architecture experience, direct ownership of high-scale systems, and measurable product-delivery impact. His React, Node.js, TypeScript, and database expertise closely matches the role’s core requirements.</p>
              <div className="fitReasons"><span><CheckCircle2 size={15}/> Proven scale-up engineering ownership</span><span><CheckCircle2 size={15}/> Strong semantic match beyond keywords</span><span><CheckCircle2 size={15}/> Skill gaps are learnable, not blocking</span></div>
              <div className="aiRecommendation"><Sparkles size={17}/><div><small>Recommended next action</small><strong>Advance to technical leadership interview</strong></div><ArrowRight size={18}/></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CandidateCommandCard() {
  return <div className="candidateCommandCard commandReveal commandDelay5" id="candidate-command-card"><div className="candidateAura" /><div className="candidateScanline" /><div className="candidateHead"><div className="candidateAvatar"><span className="avatarOrbit" /><UsersRound size={34} /><small>HireScoreAI Top <span className="counterAnimate" data-target="1">1</span>%</small></div><div className="candidateIdentity"><div className="candidateNameRow"><h2>Marcus Chen</h2><span><BadgeCheck size={13} /> Neural match verified</span></div><p>Singapore • Senior Full-Stack Engineer (Rust/Node)</p><div className="candidateTags"><span>Exp: <b className="counterAnimate" data-target="8.5" data-decimals="1">8.5</b> Years</span><span>Source: HireScoreAI Sync</span></div></div><div className="candidateScore"><small className="scoreLive">● Live intelligence</small><strong><span className="counterAnimate" data-target="96.4" data-decimals="1">96.4</span><small>%</small></strong><span>HireScoreAI confidence score</span><div className="scoreDots"><i /><i /><i /><i /><i /></div></div></div><div className="candidateBody"><div className="explainPanel"><small><BrainCircuit size={13} /> HireScoreAI explainable intelligence</small><blockquote>“Marcus is a validated high-performer identified by HireScoreAI’s neural matching. He bridges the gap between infrastructure efficiency and product delivery, matching your ‘Scale Phase’ requirement perfectly.”</blockquote><div className="evidenceGrid"><div><b>HireScoreAI evidence</b><span>WASM Runtime Architecture <em>Expert</em></span><i><span className="commandBar" style={{ '--bar-width': '94%' }} /></i><span>Distributed SQL Internals <em>Expert</em></span><i><span className="commandBar" style={{ '--bar-width': '88%' }} /></i></div><div><b>Strategic alignment</b><span>Scale-up experience matches Series C trajectory</span><span>Previous ownership of checkout core (<em><span className="counterAnimate" data-target="40">40</span>% latency reduction</em>)</span></div></div></div><aside><small>Pipeline status</small><div className="shortlisted">Shortlisted <b>Rank #<span className="counterAnimate" data-target="2">2</span> of <span className="counterAnimate" data-target="480">480</span></b></div><i><span className="commandBar" style={{ '--bar-width': '85%' }} /></i><div className="pipelineConfidence"><span>Pipeline confidence</span><b><span className="counterAnimate" data-target="85">85</span>%</b></div><button><Sparkles size={15} /> Approve &amp; Schedule</button><button className="profileButton"><FileSearch size={15} /> View Unified Profile</button></aside></div></div>
}

function AnalyticsCard() { return <div className="analyticsCard"><div><h3>HireScoreAI Performance Analytics</h3><p>Automated analysis of hire quality vs. acquisition cost across all channels</p></div><button>Export Executive Report</button><div className="barChart">{[['LinkedIn','74%'],['Indeed','46%'],['Referrals','91%'],['HireScoreAI ROI','100%']].map(([label,value],i)=><div key={label}><i style={{ '--bar-height': value }} className={`bar${i+1} commandBarVertical`} /><small>{label}</small></div>)}</div></div> }
function MetricCard({ label, value, suffix, text }) { return <div className="qualityCard"><small>{label}</small><strong><span className="counterAnimate" data-target={value} data-decimals={value.includes('.') ? '1' : '0'}>0</span><em>{suffix}</em></strong><p>{text}</p></div> }

function TrustStrip() {
  return (
    <section className="trustStrip">
      <div className="container trustGrid">
        {['AI recruitment software', 'AI resume screening software', 'AI candidate ranking tool', 'AI ATS software', 'Automated hiring pipeline'].map((item) => <span key={item}><CheckCircle2 size={17} />{item}</span>)}
      </div>
    </section>
  )
}

const productWorkflow = [
  [BriefcaseBusiness, 'Create Job', 'Define the role, skills, and hiring criteria.'],
  [Files, 'Upload Resumes', 'Add candidate resumes in bulk to the job.'],
  [SearchCheck, 'AI Screening', 'Parse profiles into structured hiring data.'],
  [Target, 'Fit Scoring', 'Measure each candidate against the JD.'],
  [Trophy, 'Candidate Ranking', 'Bring the strongest matches to the top.'],
  [BadgeCheck, 'Smart Shortlisting', 'Advance candidates with clear evidence.'],
  [MessageSquareText, 'Communication', 'Keep outreach and follow-ups organized.'],
  [ClipboardCheck, 'Assessment Tracking', 'Track tests, scores, and readiness.'],
  [CalendarCheck, 'Interview Pipeline', 'Move candidates into interview stages.'],
  [BarChart3, 'Job Analytics', 'Monitor quality, progress, and bottlenecks.'],
]

const productCapabilities = [
  [SearchCheck, 'AI Resume Screening', 'Parse resumes and extract candidate details, skills, education, experience, and profile insights in seconds.'],
  [Target, 'JD-Based Fit Scoring', 'Compare every candidate against the job description and generate a clear fit score based on skills, experience, and role relevance.'],
  [Trophy, 'Candidate Ranking', 'Automatically rank candidates from strongest fit to weakest fit so recruiters can review the best profiles first.'],
  [BadgeCheck, 'Smart Shortlisting', 'Shortlist the right candidates faster with AI-powered recommendations based on real job fit.'],
  [BrainCircuit, 'AI Recruiter-Ready Explanation', 'Show matched skills, missing skills, relevant experience, seniority fit, and hiring risks in a recruiter-friendly format.'],
  [MessageSquareText, 'AI Communication Workflow', 'Manage candidate outreach, follow-ups, interview updates, and hiring communication from one place.'],
  [ClipboardCheck, 'AI Assessment Tracking', 'Track candidate assessment status, test scores, results, and readiness before moving them to interviews.'],
  [GitBranch, 'Interview & Pipeline Management', 'Move candidates through stages like shortlisted, communication, assessment, interview, and offer from one dashboard.'],
  [BarChart3, 'AI Job Analytics', 'Analyze job performance, candidate quality, source insights, pipeline progress, and hiring bottlenecks.'],
]

const productBenefits = [
  'Save hours of manual resume screening',
  'Improve shortlist quality',
  'Reduce guesswork in candidate selection',
  'Explain every AI recommendation',
  'Keep communication organized',
  'Track assessments and interviews',
  'Understand job-level hiring performance',
]

const productUseCases = [
  [Building2, 'Recruitment Agencies', 'Rank high-volume applicant pools quickly and send stronger shortlists to clients.'],
  [UsersRound, 'HR Teams', 'Keep screening, communication, assessments, and interviews in one shared workflow.'],
  [Network, 'Staffing Firms', 'Manage multiple roles and candidate pipelines without spreadsheet-heavy coordination.'],
  [Rocket, 'Startups & Growing Companies', 'Build a repeatable hiring process without adding more manual admin work.'],
  [ShieldCheck, 'Enterprise Hiring Teams', 'Give recruiters consistent scoring evidence and job-level pipeline visibility.'],
  [Zap, 'Bulk Hiring Drives', 'Screen and prioritize large resume batches while keeping every decision reviewable.'],
]

const productFaqs = [
  ['Is HireScoreAI only a resume parser?', 'No. Resume parsing is one part of HireScoreAI. The platform also supports JD-based scoring, candidate ranking, explanations, shortlisting, communication, assessments, interview pipelines, and job analytics.'],
  ['How does JD-based scoring work?', 'HireScoreAI compares candidate skills, experience, education, seniority, and profile evidence with the requirements in the job description to produce a clear fit score.'],
  ['Can recruiters see why a candidate is recommended?', 'Yes. Each recommendation includes recruiter-ready evidence such as matched skills, missing skills, relevant experience, seniority fit, and potential hiring risks.'],
  ['Can I upload multiple resumes?', 'Yes. Recruiters can add multiple resumes to a job and review the resulting candidate profiles, fit scores, and rankings in one place.'],
  ['Does HireScoreAI support communication workflow?', 'Yes. Teams can organize candidate outreach, follow-ups, interview updates, and hiring communication within the workflow.'],
  ['Can I track assessments?', 'Yes. HireScoreAI can track assessment status, test results, scores, and candidate readiness before interview stages.'],
  ['Does it support interview pipeline management?', 'Yes. Candidates can move through shortlist, communication, assessment, interview, and offer stages from one dashboard.'],
  ['Does it provide job analytics?', 'Yes. Job analytics surface candidate quality, source insights, pipeline progress, and hiring bottlenecks for each role.'],
  ['Is there a free pilot?', 'Yes. Hiring teams can request a free 7-day pilot and test HireScoreAI with a real job and real resumes.'],
]

const productCatalog = {
  hirescore: {
    id: 'hirescore',
    label: 'HireScoreAI',
    eyebrow: 'AI recruitment platform',
    headline: 'HireScoreAI for resume screening and candidate fit decisions',
    intro: 'Screen resumes faster, match candidates against job descriptions, generate shortlist scores, rank applicants, and give recruiters clear AI-backed explanations before they move candidates forward.',
    ctas: [
      ['Request a Demo', '/contact'],
      ['Start Free Pilot', PILOT_MAILTO],
      ['Explore Features', '#product-capabilities'],
    ],
    proof: ['JD-based scoring', 'Recruiter-ready explanations', 'AI screening test support'],
    capabilities: [
      [SearchCheck, 'AI Resume Screening', 'Parse resumes into structured candidate details so recruiters can review skills, experience, education, and role-fit signals faster.'],
      [Target, 'JD-Based Candidate Scoring', 'Compare every profile against the job description and produce shortlist scores grounded in candidate evidence.'],
      [Trophy, 'Candidate Ranking', 'Rank candidates by fit so recruiters can focus first on the strongest matches for each open role.'],
      [BrainCircuit, 'Recruiter-Ready Explanations', 'Show why a candidate scored well or poorly using matched skills, missing skills, relevant experience, and fit notes.'],
      [BadgeCheck, 'Smart Shortlisting', 'Turn screened profiles into clearer shortlist decisions while keeping recruiter review in control.'],
      [Workflow, 'Workflow Clarity', 'Keep jobs, resumes, scores, rankings, communication, screening tests, and interview movement connected.'],
    ],
    workflow: [
      [BriefcaseBusiness, 'Create job', 'Set the role, required skills, must-have criteria, and hiring context.'],
      [Files, 'Upload or receive resumes', 'Collect applications from apply pages or upload resumes in bulk.'],
      [Bot, 'AI parses resumes', 'Extract candidate details and normalize resume content for consistent review.'],
      [Target, 'Score candidate fit', 'Compare every resume against the JD and calculate a clear shortlist score.'],
      [Trophy, 'Rank and shortlist', 'Prioritize candidates and move the strongest profiles into shortlist review.'],
      [Send, 'Recruiter action', 'Review explanations, coordinate outreach, run screening tests, and progress candidates.'],
    ],
    benefits: [
      'Save recruiter time on first-pass resume review',
      'Shortlist faster without losing decision context',
      'Improve consistency across recruiters and roles',
      'Reduce repetitive manual workload',
      'Make candidate fit easier to explain to hiring managers',
      'Keep high-volume applicant review more visible and organized',
    ],
    audiences: [
      [Building2, 'Recruitment agencies', 'Review client roles faster and send better-supported shortlists.'],
      [Network, 'Staffing companies', 'Handle high-volume profiles with clearer fit ranking by requirement.'],
      [UsersRound, 'HR teams', 'Give internal recruiters a consistent screening and decision workflow.'],
      [BriefcaseBusiness, 'Hiring managers', 'Review candidate recommendations with clear evidence instead of raw resume lists.'],
    ],
  },
  jdManager: {
    id: 'jdManager',
    label: 'JD Manager',
    eyebrow: 'Free open-source JD workspace',
    headline: 'JD Manager for Recruitment Agencies',
    intro: 'A free, open-source JD management workspace that helps agencies organize multiple client requirements, track candidate flow per JD, and maintain clearer shortlisting visibility.',
    ctas: [
      ['Explore JD Manager', '#product-capabilities'],
      ['Use Free Tool', '/contact'],
      ['View Workflow', '#product-workflow'],
    ],
    proof: ['Open source', 'Free to use', 'Built for agency operations'],
    capabilities: [
      [Building2, 'Multi-Client JD Management', 'Organize client accounts and keep each client requirement in a clean, searchable workspace.'],
      [Files, 'Multiple JDs per Client', 'Track several open roles under the right client without losing ownership or status context.'],
      [GitBranch, 'Candidate-to-JD Tracking', 'See which candidates were sourced, reviewed, submitted, or rejected for each specific JD.'],
      [BarChart3, 'Shortlisting Score Visibility', 'Keep shortlist scores visible at the JD level so recruiters can compare decisions later.'],
      [ClipboardCheck, 'Submission & Status Tracking', 'Follow candidate movement from sourced to shortlisted, submitted, interviewed, selected, or closed.'],
      [UsersRound, 'Better Recruiter Coordination', 'Help teams understand which recruiter worked on each JD and what action is needed next.'],
    ],
    workflow: [
      [Building2, 'Add client', 'Create the client workspace and centralize all active requirements.'],
      [BriefcaseBusiness, 'Add multiple JDs', 'Create role records under the right client with ownership and active status.'],
      [UsersRound, 'Track incoming candidates', 'Attach candidates to the correct JD and maintain source and recruiter visibility.'],
      [BarChart3, 'See shortlist scores', 'Review candidate scores and shortlist decisions per JD.'],
      [ClipboardCheck, 'Review submissions', 'Track submitted candidates, pipeline stage, and historical decisions.'],
      [Workflow, 'Coordinate actions', 'Keep recruiters aligned on next steps across clients, JDs, and candidates.'],
    ],
    benefits: [
      'Cleaner recruitment agency operations',
      'Better JD tracking across multiple clients',
      'Less confusion about which candidate belongs to which role',
      'Clearer candidate history and shortlist visibility',
      'Easier review of submissions and pipeline status',
      'More organized recruiter coordination',
    ],
    audiences: [
      [Building2, 'Recruitment agencies', 'Manage many client requirements without spreadsheet sprawl.'],
      [Network, 'Staffing teams', 'Keep client JDs, submissions, scores, and candidate status aligned.'],
      [UsersRound, 'Recruiter teams', 'Coordinate who worked on each JD and what needs follow-up.'],
      [ClipboardCheck, 'Delivery managers', 'Review active JDs, candidate pipeline, and shortlist quality in one place.'],
    ],
  },
}

function ProductCandidateRow({ rank, name, score, status }) {
  return (
    <div className="productPage-candidateRow">
      <span className="productPage-rank">{rank}</span>
      <span className="productPage-candidateName"><strong>{name}</strong><small>Data Analyst</small></span>
      <span className="productPage-score">{score}%</span>
      <span className={`productPage-status productPage-status${status.replace(' ', '')}`}>{status}</span>
    </div>
  )
}

function ProductHeroDashboard() {
  return (
    <div className="productPage-heroDashboard" aria-label="HireScoreAI candidate ranking dashboard preview">
      <div className="productPage-dashTop">
        <div><i className="productPage-windowDots"><b /><b /><b /></i><small>Neural match analysis</small></div>
        <span><span className="productPage-liveDot" />Live analysis</span>
      </div>
      <div className="productPage-featuredCandidate">
        <div className="productPage-featuredIdentity"><span><UsersRound size={22} /></span><div><strong>Jane Smith</strong><small>Data Analyst &bull; San Francisco</small></div></div>
        <div className="productPage-fitRing"><div><strong>92%</strong><small>AI fit score</small></div></div>
      </div>
      <div className="productPage-heroInsights">
        <div className="productPage-skillSummary"><small>Matched skills</small><div><span>SQL</span><span>Power BI</span><span>Python</span><span>Reporting</span></div></div>
        <div className="productPage-skillSummary isMissing"><small>Missing skills</small><div><span>Advanced statistics</span></div></div>
        <div className="productPage-insight">
          <BrainCircuit size={19} />
          <div><small>AI shortlist recommendation</small><p>Strong analytics experience, close JD alignment, and proven stakeholder reporting.</p></div>
        </div>
      </div>
      <div className="productPage-dashLabel"><span>Candidate ranking</span><small>AI fit</small></div>
      <div className="productPage-candidates">
        <ProductCandidateRow rank="01" name="Jane Smith" score="92" status="Shortlist" />
        <ProductCandidateRow rank="02" name="Rahul Sharma" score="86" status="Review" />
        <ProductCandidateRow rank="03" name="Ananya Rao" score="79" status="Assessment" />
      </div>
      <div className="productPage-dashFooter">
        <div><span>Applied</span><i /><span>Screened</span><i /><span>Shortlisted</span><i /><span>Interview</span></div>
        <button type="button">Move to Interview <ArrowRight size={15} /></button>
      </div>
    </div>
  )
}

function ProductDashboardPreview() {
  const rows = [
    ['Priya Mehta', 'SQL, Power BI, Python', '92%', 'Shortlisted'],
    ['Rahul Sharma', 'SQL, Tableau, Reporting', '86%', 'Assessment'],
    ['Ananya Rao', 'Excel, Power BI, Statistics', '79%', 'Review'],
    ['Vikram Singh', 'SQL, Excel, ETL', '74%', 'New'],
  ]
  return (
    <div className="productPage-appShell" id="product-dashboard">
      <div className="productPage-appBar"><span><img src="/hirescore-logo-mark.png" alt="" />HireScoreAI</span><small>Recruiter workspace</small><button type="button" aria-label="Open notifications"><MailCheck size={17} /></button></div>
      <div className="productPage-appGrid">
        <aside className="productPage-jobsPanel">
          <div className="productPage-panelTitle"><span>Open jobs</span><button type="button" aria-label="Create job">+</button></div>
          <button type="button" className="isActive"><strong>Data Analyst</strong><small>129 candidates</small></button>
          <button type="button"><strong>Product Manager</strong><small>78 candidates</small></button>
          <button type="button"><strong>Backend Engineer</strong><small>64 candidates</small></button>
          <button type="button"><strong>UX Researcher</strong><small>31 candidates</small></button>
        </aside>
        <section className="productPage-rankingPanel" aria-label="Ranked candidate list">
          <div className="productPage-panelTitle"><span>Candidate ranking</span><small>129 profiles screened</small></div>
          <div className="productPage-tableHead"><span>Candidate</span><span>Matched skills</span><span>Fit</span><span>Status</span></div>
          {rows.map(([name, skills, score, status], index) => (
            <button type="button" className={index === 0 ? 'isActive' : ''} key={name}>
              <span><i>{name.split(' ').map((part) => part[0]).join('')}</i><strong>{name}</strong></span>
              <span>{skills}</span><b>{score}</b><em>{status}</em>
            </button>
          ))}
        </section>
        <aside className="productPage-explainPanel">
          <div className="productPage-panelTitle"><span>AI candidate insight</span><BrainCircuit size={17} /></div>
          <div className="productPage-profile"><span>PM</span><div><strong>Priya Mehta</strong><small>Top candidate for Data Analyst</small></div><b>92%</b></div>
          <div className="productPage-skillGroup"><small>Matched skills</small><div><span>SQL</span><span>Power BI</span><span>Python</span><span>Dashboards</span></div></div>
          <div className="productPage-skillGroup isMissing"><small>Missing skills</small><div><span>Advanced statistics</span></div></div>
          <p>Priya closely matches the role across analytics tooling, reporting ownership, and stakeholder communication. Her recent experience supports a strong shortlist recommendation.</p>
          <button type="button">Shortlist candidate <ArrowRight size={15} /></button>
        </aside>
      </div>
      <div className="productPage-appBottom">
        <div className="productPage-pipeline"><span>Pipeline</span>{[['Applied','129'],['Screened','82'],['Shortlisted','14'],['Assessment','8'],['Interview','5']].map(([label,value]) => <div key={label}><strong>{value}</strong><small>{label}</small></div>)}</div>
        <div className="productPage-analytics"><span>Job health</span><div><i style={{ width: '78%' }} /><small>78% pipeline quality</small></div><strong>12 days<small> average time to shortlist</small></strong></div>
      </div>
    </div>
  )
}

function ProductSuitePreview() {
  return (
    <div className="productPage-suitePreview" aria-label="HireScoreAI product suite preview">
      <div className="productPage-suiteTop">
        <img src="/hirescore-logo-mark.png" alt="" />
        <div><strong>HireScoreAI Suite</strong><small>Independent recruiting software platform</small></div>
      </div>
      <div className="productPage-suiteCards">
        <article>
          <span><SearchCheck size={20} /></span>
          <h2>HireScoreAI</h2>
          <p>AI resume screening, JD-based scoring, ranked shortlists, and candidate-fit explanations.</p>
          <div><b>92%</b><small>top fit score</small></div>
        </article>
        <article>
          <span><BriefcaseBusiness size={20} /></span>
          <h2>JD Manager</h2>
          <p>Free open-source workspace for clients, JDs, candidate tracking, scores, and submissions.</p>
          <div><b>18</b><small>active JDs</small></div>
        </article>
      </div>
      <div className="productPage-suiteFlow">
        {['Client', 'JD', 'Candidates', 'Score', 'Shortlist'].map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  )
}

function JDManagerPreview() {
  const candidates = [
    ['Meera P.', 'Data Analyst', '91', 'Shortlisted'],
    ['Aarav S.', 'Backend Engineer', '84', 'Submitted'],
    ['Karan V.', 'QA Lead', '76', 'Review'],
  ]

  return (
    <div className="productPage-jdPreview" aria-label="JD Manager workspace preview">
      <div className="productPage-jdTopbar">
        <div><BriefcaseBusiness size={17} /><span>JD Manager</span></div>
        <small>Open source & free</small>
      </div>

      <div className="productPage-jdMetricRow">
        <span><strong>18</strong><small>Active JDs</small></span>
        <span><strong>42</strong><small>Candidates</small></span>
        <span><strong>11</strong><small>Shortlisted</small></span>
      </div>

      <div className="productPage-jdSimplePanel">
        <div className="productPage-jdRequirement">
          <span>Client workspace</span>
          <strong>Acme Staffing</strong>
          <p>Senior Data Analyst · JD-1042</p>
        </div>

        <div className="productPage-jdTimeline" aria-label="JD Manager workflow">
          {['Client', 'JD', 'Candidates', 'Shortlist'].map((item, index) => (
            <span key={item}><b>{index + 1}</b>{item}</span>
          ))}
        </div>

        <div className="productPage-jdCandidateList">
          <div className="productPage-panelTitle"><span>Candidate shortlist</span><small>Per JD</small></div>
          {candidates.map(([name, role, score, status]) => (
            <div className="productPage-jdCandidate" key={name}>
              <div><strong>{name}</strong><small>{role}</small></div>
              <b>{score}</b>
              <em>{status}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductOverview() {
  return (
    <>
      <SEO path="/product/hirescore-ai" />
      <div className="productPage-root">
        <section className="productPage-hero">
          <div className="container productPage-heroGrid">
            <div className="productPage-heroCopy">
              <span className="productPage-eyebrow"><Sparkles size={14} />HireScoreAI product</span>
              <h1>One AI hiring workspace for <span>faster, clearer decisions.</span></h1>
              <p>HireScoreAI helps recruiters screen resumes, score candidates against job descriptions, rank top talent, manage communication, track assessments, schedule interviews, and monitor job performance from one intelligent hiring dashboard.</p>
              <div className="productPage-actions">
                <Link className="btn btnPrimary btnLarge" href="/contact">Book Free 7-Day Pilot <ArrowRight size={17} /></Link>
                <a className="btn btnGhost btnLarge" href="#product-dashboard">View Product Demo</a>
              </div>
              <div className="productPage-proof"><span><CheckCircle2 size={15} />Explainable scoring</span><span><CheckCircle2 size={15} />Full pipeline visibility</span><span><CheckCircle2 size={15} />Recruiter controlled</span></div>
            </div>
            <div className="productPage-heroVisual">
              <div className="productPage-heroVisualTop"><span><i /> Live hiring intelligence</span><small>Candidate ranking workspace</small></div>
              <ProductHeroDashboard />
              <div className="productPage-heroVisualFoot"><span>129 profiles screened</span><span>92% top fit</span><span>Explainable evidence</span></div>
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-workflowSection" aria-labelledby="product-workflow-title">
          <div className="container productPage-workflowLayout">
            <aside className="productPage-workflowIntro">
              <div className="productPage-heading productPage-headingLeft"><span>One connected workflow</span><h2 id="product-workflow-title">From Job Description to Interview-Ready Candidates</h2><p>Every hiring step stays connected, reviewable, and ready for recruiter action.</p></div>
              <div className="productPage-workflowVisual" aria-label="HireScoreAI connected workflow map">
                <div className="productPage-visualTop"><span><GitBranch size={15} />Workflow intelligence</span><small><i />Live</small></div>
                <div className="productPage-orbitMap">
                  <span className="productPage-orbit productPage-orbitOne"><BriefcaseBusiness size={18} /></span>
                  <span className="productPage-orbit productPage-orbitTwo"><BrainCircuit size={18} /></span>
                  <span className="productPage-orbit productPage-orbitThree"><MessageSquareText size={18} /></span>
                  <span className="productPage-orbit productPage-orbitFour"><BarChart3 size={18} /></span>
                  <div className="productPage-orbitCore"><img src="/hirescore-logo-mark.png" alt="" /><strong>HireScoreAI</strong><small>Connected command center</small></div>
                </div>
                <div className="productPage-visualFoot"><span><strong>10</strong> stages</span><i /><span><strong>1</strong> workspace</span><i /><span><strong>0</strong> handoffs</span></div>
              </div>
            </aside>
            <div className="productPage-workflowPhases">
              {[
                ['01', 'Source & understand', productWorkflow.slice(0, 5)],
                ['02', 'Engage & decide', productWorkflow.slice(5)],
              ].map(([number, label, stages], phaseIndex) => (
                <section className="productPage-workflowPhase" key={label}>
                  <header><span>{number}</span><div><small>Hiring phase</small><h3>{label}</h3></div></header>
                  <div className="productPage-phaseStages">
                    {stages.map(([Icon, title, text], index) => (
                      <article key={title}>
                        <div><Icon size={18} /><span>{String(phaseIndex * 5 + index + 1).padStart(2, '0')}</span></div>
                        <div><h4>{title}</h4><p>{text}</p></div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <ActionAiAgentSection surface="product" />

        <section className="productPage-section" aria-labelledby="product-capabilities-title">
          <div className="container">
            <div className="productPage-heading"><span>Core capabilities</span><h2 id="product-capabilities-title">Everything Recruiters Need in One AI Hiring Platform</h2><p>Practical AI tools that support recruiter judgment instead of hiding it.</p></div>
            <div className="productPage-capabilityMarquee">
              <div className="productPage-capabilityTrack">
                {[...productCapabilities, ...productCapabilities].map(([Icon, title, text], index) => {
                  const originalIndex = index % productCapabilities.length
                  const duplicate = index >= productCapabilities.length
                  return <article aria-hidden={duplicate ? 'true' : undefined} className={`productPage-capabilityTone${originalIndex % 3 + 1}`} key={`${title}-${duplicate ? 'duplicate' : 'original'}`}><div className="productPage-cardIcon"><Icon size={23} /></div><span>{String(originalIndex + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p><div className="productPage-capabilitySignal"><small>Recruiter-ready intelligence</small><ArrowRight size={15} /></div></article>
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-dashboardSection" aria-labelledby="product-dashboard-title">
          <div className="container">
            <div className="productPage-dashboardLayout">
              <div className="productPage-dashboardCopy">
                <span>Product preview</span>
                <h2 id="product-dashboard-title">A Hiring <em>Command Center</em> Recruiters Can Actually Use</h2>
                <p>Review jobs, rankings, evidence, pipeline stages, and job health without switching tools.</p>
                <div className="productPage-dashboardPoints">
                  <div><CheckCircle2 size={17} /><span><strong>One shared workspace</strong><small>Move from job intake to interview without disconnected tools.</small></span></div>
                  <div><CheckCircle2 size={17} /><span><strong>Explainable decisions</strong><small>See the evidence behind every candidate score and ranking.</small></span></div>
                  <div><CheckCircle2 size={17} /><span><strong>Live hiring visibility</strong><small>Track pipeline progress, job health, and recruiter action in real time.</small></span></div>
                </div>
                <div className="productPage-dashboardStats"><span><strong>129</strong><small>Profiles screened</small></span><span><strong>92%</strong><small>Top candidate fit</small></span></div>
              </div>
              <div className="productPage-dashboardVisual">
                <div className="productPage-dashboardGlow" />
                <div className="productPage-dashboardStageLabel"><span><Sparkles size={14} />Live recruitment intelligence</span><small><i />Updated now</small></div>
                <ProductDashboardPreview />
                <div className="productPage-dashboardStageNote"><ShieldCheck size={14} /><span>Evidence-led</span><i /><span>Recruiter controlled</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-benefitsSection" aria-labelledby="product-benefits-title">
          <div className="container">
            <div className="productPage-benefitsHeader">
              <div className="productPage-heading productPage-headingLeft"><span>The HireScore advantage</span><h2 id="product-benefits-title">Built to Help Recruiters <em>Move Faster</em></h2></div>
              <div className="productPage-benefitsIntro"><Sparkles size={17} /><p>Spend less time sorting profiles and more time talking to the right candidates.</p><span><i />Seven practical workflow gains</span></div>
            </div>
            <div className="productPage-benefitsLayout">
              <div className="productPage-benefitGrid">{productBenefits.map((benefit, index) => <article key={benefit}><span>{String(index + 1).padStart(2, '0')}</span><CheckCircle2 size={19} /><h3>{benefit}</h3></article>)}</div>
              <aside className="productPage-impactPanel">
                <div className="productPage-impactTop"><small>Performance impact</small><span><i />Pilot workflow signal</span></div>
                <div className="productPage-impactHero"><strong>72%</strong><div><b>Faster progression</b><p>Less time spent moving qualified candidates to interview.</p></div></div>
                <div className="productPage-impactBars"><span><small>Resume review</small><b>72%</b><i><em style={{ width: '72%' }} /></i></span><span><small>Screening coverage</small><b>99%</b><i><em style={{ width: '99%' }} /></i></span></div>
                <div className="productPage-impactMetrics"><span><b>4.9/5</b><small>Recruiter clarity</small></span><span><b>99%</b><small>Screening coverage</small></span><span><b>1</b><small>Connected workflow</small></span></div>
              </aside>
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-useCaseSection" aria-labelledby="product-use-cases-title">
          <div className="container productPage-useCaseLayout">
            <div className="productPage-useCaseIntro">
              <div className="productPage-heading productPage-headingLeft">
                <span>Built for your team</span>
                <h2 id="product-use-cases-title">One hiring workspace, shaped around <em>how your team works.</em></h2>
                <p>From specialist recruiting desks to fast-growing internal teams, HireScoreAI keeps every hiring workflow clear, connected, and ready to scale.</p>
              </div>
              <div className="productPage-useCasePromise">
                <div><Sparkles size={16} /><span>Built for real hiring operations</span></div>
                <strong>Flexible enough for every team. Consistent enough for every decision.</strong>
                <div className="productPage-useCaseTags"><span>Explainable AI</span><span>Shared workflow</span><span>Human review</span></div>
              </div>
            </div>
            <div className="productPage-useCaseGrid">
              {productUseCases.map(([Icon, title, text], index) => (
                <article key={title}>
                  <div className="productPage-useCaseCardTop"><span><Icon size={21} /></span><b>{String(index + 1).padStart(2, '0')}</b></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-ctaSection">
          <div className="container productPage-cta">
            <div><span>Free 7-day pilot</span><h2>Try HireScoreAI with Your Real Hiring Workflow</h2><p>Start with one job, upload real resumes, and see how AI screening, ranking, assessment tracking, interview pipeline management, and job analytics can speed up your hiring process.</p></div>
            <Link className="btn btnPrimary btnLarge" href="/contact">Book Your Free 7-Day Pilot Access <ArrowRight size={18} /></Link>
          </div>
        </section>

        <section className="productPage-section" aria-labelledby="product-related-title">
          <div className="container">
            <div className="productPage-heading productPage-headingLeft">
              <span>Connected product workflow</span>
              <h2 id="product-related-title">Explore HireScoreAI capabilities</h2>
            </div>
            <nav className="inlineLinks" aria-label="Related HireScoreAI capabilities">
              <Link href="/product/ai-resume-parsing">AI resume screening</Link>
              <Link href="/product/ai-candidate-scoring">JD-based candidate scoring</Link>
              <Link href="/product/ai-candidate-ranking">Candidate ranking</Link>
              <Link href="/product/ai-shortlisting">Candidate shortlisting</Link>
              <Link href="/product/hiring-pipeline">Hiring pipeline</Link>
              <Link href="/solutions">Hiring solutions</Link>
              <Link href="/pricing">Pricing and pilot options</Link>
            </nav>
          </div>
        </section>

        <section className="productPage-section productPage-faqSection" aria-labelledby="product-faq-title">
          <div className="container productPage-faqLayout">
            <div className="productPage-heading productPage-headingLeft"><span>Product FAQs</span><h2 id="product-faq-title">Questions Before You Start</h2><p>Clear answers about the HireScoreAI product workflow.</p></div>
            <div className="productPage-faqList">{productFaqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>
      </div>
    </>
  )
}

function JDManagerPage() {
  return <ProductLandingPage productId="jdManager" path="/product/jd-manager" />
}

function RedirectPage({ to }) {
  useEffect(() => {
    navigateTo(to)
  }, [to])

  return null
}

function ProductLandingPage({ productId, path }) {
  const product = productCatalog[productId]
  const isHireScoreProduct = productId === 'hirescore'
  const otherProduct = productCatalog[isHireScoreProduct ? 'jdManager' : 'hirescore']
  const otherPath = isHireScoreProduct ? '/product/jd-manager' : '/product/hirescore-ai'

  return (
    <>
      <SEO path={path} />
      <div className="productPage-root">
        <section className="productPage-hero">
          <div className="container productPage-heroGrid">
            <div className="productPage-heroCopy">
              <span className="productPage-eyebrow"><Sparkles size={14} />{product.eyebrow}</span>
              <h1>{product.headline}</h1>
              <p>{product.intro}</p>
              <div className="productPage-actions">
                {product.ctas.slice(0, 3).map(([label, href], index) => (
                  href.startsWith('mailto:')
                    ? <a className={`btn ${index === 0 ? 'btnPrimary' : 'btnGhost'} btnLarge`} href={href} key={label}>{label}{index === 0 && <ArrowRight size={17} />}</a>
                    : href.startsWith('#')
                      ? <a className={`btn ${index === 0 ? 'btnPrimary' : 'btnGhost'} btnLarge`} href={href} key={label}>{label}{index === 0 && <ArrowRight size={17} />}</a>
                      : <Link className={`btn ${index === 0 ? 'btnPrimary' : 'btnGhost'} btnLarge`} href={href} key={label}>{label}{index === 0 && <ArrowRight size={17} />}</Link>
                ))}
              </div>
              <div className="productPage-proof">{product.proof.map((item) => <span key={item}><CheckCircle2 size={15} />{item}</span>)}</div>
            </div>
            <div className="productPage-heroVisual">
              <div className="productPage-heroVisualTop"><span><i /> {product.label}</span><small>{isHireScoreProduct ? 'AI screening workspace' : 'JD operations workspace'}</small></div>
              {isHireScoreProduct ? <ProductHeroDashboard /> : <JDManagerPreview />}
              <div className="productPage-heroVisualFoot">
                {product.proof.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-switchSection" aria-labelledby="product-overview-title">
          <div className="container">
            <div className="productPage-productDirectory" aria-label="HireScoreAI product offerings">
              <article>
                <span>{isHireScoreProduct ? <SearchCheck size={20} /> : <BriefcaseBusiness size={20} />}{product.label}</span>
                <h3>{isHireScoreProduct ? 'AI recruitment and resume screening platform' : 'Free open-source JD workspace'}</h3>
                <p>{isHireScoreProduct ? 'This page focuses only on HireScoreAI: resume screening, JD-based scoring, ranking, explanations, and shortlist workflows.' : 'This page focuses only on JD Manager: multi-client JD tracking, candidate-to-JD visibility, shortlist scores, submissions, and status history.'}</p>
                <a href="#product-capabilities">Explore this product <ArrowRight size={15} /></a>
              </article>
              <article>
                <span>{isHireScoreProduct ? <BriefcaseBusiness size={20} /> : <SearchCheck size={20} />}{otherProduct.label}</span>
                <h3>{isHireScoreProduct ? 'Need JD Manager instead?' : 'Need HireScoreAI instead?'}</h3>
                <p>{isHireScoreProduct ? 'JD Manager has its own separate page for recruitment agencies and staffing teams that need client, JD, and candidate tracking.' : 'HireScoreAI has its own separate page for AI resume screening, candidate scoring, ranking, and recruiter-ready explanations.'}</p>
                <Link href={otherPath}>Open {otherProduct.label} page <ArrowRight size={15} /></Link>
              </article>
            </div>

            <article className="productPage-selectedProduct" id={isHireScoreProduct ? 'hirescore-ai' : 'jd-manager'}>
              <div className="productPage-selectedCopy">
                <span>{product.eyebrow}</span>
                <h2 id="product-overview-title">{product.headline}</h2>
                <p>{product.intro}</p>
                <div className="productPage-selectedActions">
                  {product.ctas.map(([label, href], index) => (
                    href.startsWith('mailto:')
                      ? <a className={`btn ${index === 0 ? 'btnPrimary' : 'btnGhost'}`} href={href} key={label}>{label}{index === 0 && <ArrowRight size={16} />}</a>
                      : href.startsWith('#')
                        ? <a className={`btn ${index === 0 ? 'btnPrimary' : 'btnGhost'}`} href={href} key={label}>{label}{index === 0 && <ArrowRight size={16} />}</a>
                      : <Link className={`btn ${index === 0 ? 'btnPrimary' : 'btnGhost'}`} href={href} key={label}>{label}{index === 0 && <ArrowRight size={16} />}</Link>
                  ))}
                </div>
                <div className="productPage-proof productPage-selectedProof">
                  {product.proof.map((item) => <span key={item}><CheckCircle2 size={15} />{item}</span>)}
                </div>
              </div>
              {isHireScoreProduct ? <ProductHeroDashboard /> : <JDManagerPreview />}
            </article>
          </div>
        </section>

        <section className="productPage-section" id="product-capabilities" aria-labelledby="product-capabilities-title">
          <div className="container">
            <div className="productPage-heading">
              <span>Key capabilities</span>
              <h2 id="product-capabilities-title">{product.label} capabilities recruiters can use every day</h2>
              <p>{isHireScoreProduct ? 'AI screening, scoring, ranking, and explanation tools for faster shortlist decisions.' : 'Operational tools for managing clients, JDs, candidate movement, scores, and recruiter coordination.'}</p>
            </div>
            <div className="productPage-twoProductGrid">
              {product.capabilities.map(([Icon, title, text], index) => (
                <article key={title}>
                  <div className="productPage-cardIcon"><Icon size={22} /></div>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-workflowSection" id="product-workflow" aria-labelledby="product-workflow-title">
          <div className="container">
            <div className="productPage-workflowLayout">
              <aside className="productPage-workflowIntro">
                <div className="productPage-heading productPage-headingLeft">
                  <span>How it works</span>
                  <h2 id="product-workflow-title">{isHireScoreProduct ? 'From job requirement to ranked shortlist' : 'From client requirement to tracked JD pipeline'}</h2>
                  <p>{isHireScoreProduct ? 'A practical screening flow that keeps recruiters in control of review, evidence, and next action.' : 'A clear operating flow for agencies managing many clients, roles, candidates, and submission decisions.'}</p>
                </div>
                <div className="productPage-problemPanel">
                  <span>{isHireScoreProduct ? 'Screening problem' : 'Agency operations problem'}</span>
                  <strong>{isHireScoreProduct ? 'Manual resume review slows down shortlist decisions and makes candidate fit hard to explain.' : 'Recruitment agencies often manage several clients at once, and each client can have many active JDs with candidates, scores, statuses, and recruiter actions spread across tools.'}</strong>
                  <p>{isHireScoreProduct ? 'HireScoreAI structures the review so candidate scoring, ranking, and explanations stay connected to the JD.' : 'JD Manager acts as the operational control layer for tracking active JDs, candidate history, shortlist scores, submissions, and stage movement.'}</p>
                </div>
              </aside>
              <div className="productPage-stepGrid">
                {product.workflow.map(([Icon, title, text], index) => (
                  <article key={title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <Icon size={24} />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-benefitsSection" aria-labelledby="product-benefits-title">
          <div className="container">
            <div className="productPage-benefitsHeader">
              <div className="productPage-heading productPage-headingLeft"><span>Business benefits</span><h2 id="product-benefits-title">{isHireScoreProduct ? 'Built to help recruiters move faster with clearer evidence' : 'Built to make agency JD operations easier to control'}</h2></div>
              <div className="productPage-benefitsIntro"><Sparkles size={17} /><p>{isHireScoreProduct ? 'Spend less time sorting profiles and more time reviewing the candidates most likely to fit the role.' : 'Reduce the daily confusion that comes from tracking many clients, many JDs, and many candidate submissions at once.'}</p><span><i />Practical workflow gains</span></div>
            </div>
            <div className="productPage-benefitGrid">
              {product.benefits.map((benefit, index) => (
                <article key={benefit}><span>{String(index + 1).padStart(2, '0')}</span><CheckCircle2 size={19} /><h3>{benefit}</h3></article>
              ))}
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-useCaseSection" aria-labelledby="product-use-cases-title">
          <div className="container productPage-useCaseLayout">
            <div className="productPage-useCaseIntro">
              <div className="productPage-heading productPage-headingLeft">
                <span>Who it is for</span>
                <h2 id="product-use-cases-title">{isHireScoreProduct ? 'For teams handling resume volume and shortlist decisions' : 'For agencies managing clients, roles, submissions, and recruiter action'}</h2>
                <p>{isHireScoreProduct ? 'HireScoreAI fits recruiting teams that need faster screening, clearer scoring, and more consistent candidate review.' : 'JD Manager fits teams that need practical visibility across clients, active JDs, candidates, scores, submissions, and status history.'}</p>
              </div>
              <div className="productPage-useCasePromise">
                <div><Sparkles size={16} /><span>Built for real hiring operations</span></div>
                <strong>{isHireScoreProduct ? 'Flexible enough for every hiring team. Consistent enough for every screening decision.' : 'Simple enough to adopt quickly. Structured enough to reduce JD and candidate tracking confusion.'}</strong>
                <div className="productPage-useCaseTags">{product.proof.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
            <div className="productPage-useCaseGrid">
              {product.audiences.map(([Icon, title, text], index) => (
                <article key={title}>
                  <div className="productPage-useCaseCardTop"><span><Icon size={21} /></span><b>{String(index + 1).padStart(2, '0')}</b></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="productPage-section productPage-ctaSection">
          <div className="container productPage-cta">
            <div><span>Next step</span><h2>{isHireScoreProduct ? 'Try HireScoreAI with your real hiring workflow' : 'Explore JD Manager for practical agency operations'}</h2><p>{isHireScoreProduct ? 'Start with one job, upload real resumes, and see how AI screening, ranking, explanation, screening test support, and shortlist review can speed up your process.' : 'Use JD Manager to organize clients, JDs, candidates, shortlist scores, submissions, and recruiter actions in a free open-source workflow.'}</p></div>
            <Link className="btn btnPrimary btnLarge" href={isHireScoreProduct ? '/contact' : '/resources/user-guide'}>{isHireScoreProduct ? 'Book Free Pilot Access' : 'View Workflow Guide'} <ArrowRight size={18} /></Link>
          </div>
        </section>

        <section className="productPage-section productPage-faqSection" aria-labelledby="product-faq-title">
          <div className="container productPage-faqLayout">
            <div className="productPage-heading productPage-headingLeft"><span>Product links</span><h2 id="product-faq-title">Explore connected HireScoreAI pages</h2><p>Follow the important product, pricing, solution, and feature paths from one place.</p></div>
            <div className="productPage-faqList">{productFaqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div>
            <div className="inlineLinks productPage-internalLinks">
              <Link href="/pricing">Pricing</Link>
              <Link href="/solutions">Solutions</Link>
              <Link href="/solutions/recruitment-agencies">Recruitment Agencies</Link>
              <Link href="/solutions/staffing-companies">Staffing Companies</Link>
              <Link href="/solutions/hr-teams">HR Teams</Link>
              <Link href="/product/ai-resume-parsing">AI Resume Screening</Link>
              <Link href="/product/ai-candidate-scoring">Candidate Scoring</Link>
              <Link href="/product/ai-screening-test">AI Screening Test</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function ProductDetail({ page }) {
  const contextualLinks = productContextLinks(page)
  return (
    <>
      <SEO title={`${page.title} | HireScoreAI`} description={page.meta} path={page.slug} />
      <PageHero eyebrow="Product feature" title={page.title} intro={page.intro} />
      <Breadcrumbs items={[['/', 'Home'], ['/product/hirescore-ai', 'HireScoreAI'], [page.slug, page.navLabel]]} />
      <section className="section">
        <div className="container detailGrid">
          <InfoBlock title="What this feature does" text={page.does} />
          <InfoBlock title="Why recruiters need it" text={page.need} />
          <InfoBlock title="How HireScoreAI solves it" text={page.solves} />
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
      <AgentDetailBand
        title={`Use ${page.navLabel} through the Action AI Agent`}
        text={`Instead of moving through every screen manually, ask the agent to use connected ${page.navLabel.toLowerCase()} capabilities as part of a wider HireScoreAI workflow. It can answer questions, prepare the next action, and continue into other available modules from the same conversation.`}
        prompts={[
          `Use ${page.navLabel.toLowerCase()} for this job and show me the result.`,
          'Explain what changed and which candidates need my review.',
          'Take the next available HireScoreAI action for the selected candidates.',
        ]}
      />
      <RelatedLinks links={contextualLinks} />
      <CTASection />
    </>
  )
}

function productContextLinks(page) {
  const relatedProducts = page.related.filter((href) => href.startsWith('/product/') && href !== page.slug).slice(0, 2)
  const solution = page.slug.includes('communication') || page.slug.includes('interview') || page.slug.includes('screening-test')
    ? '/solutions/hr-teams'
    : page.slug.includes('create-job') || page.slug.includes('public-apply') || page.slug.includes('hiring-pipeline')
      ? '/solutions/startups'
      : '/solutions/bulk-resume-screening'
  const resource = page.related.find((href) => href.startsWith('/resources/')) || (
    page.slug.includes('create-job') ? '/resources/user-guide/create-a-job'
      : page.slug.includes('public-apply') ? '/resources/blogs/how-to-create-a-public-job-apply-page-for-faster-hiring'
        : page.slug.includes('resume-upload') ? '/resources/user-guide/upload-resumes'
          : page.slug.includes('resume-parsing') ? '/resources/blogs/how-ai-resume-screening-helps-recruiters-save-time'
            : page.slug.includes('candidate-scoring') || page.slug.includes('candidate-ranking') ? '/resources/user-guide/review-ai-ranked-candidates'
              : page.slug.includes('shortlisting') ? '/resources/user-guide/shortlist-candidates'
                : page.slug.includes('communication') ? '/resources/user-guide/move-to-communication'
                  : page.slug.includes('interview') ? '/resources/user-guide/schedule-interviews'
                    : page.slug.includes('screening-test') ? '/resources/user-guide/run-ai-screening-test'
                      : '/resources/blogs/complete-guide-to-ai-powered-hiring-automation'
  )
  return [...new Set(['/product/hirescore-ai', ...relatedProducts, solution, resource, '/pricing'])]
}

function InfoBlock({ title, text }) {
  return <article className="infoCard"><h2>{title}</h2><p>{text}</p></article>
}

function RelatedLinks({ links }) {
  return (
    <section className="section compact">
      <div className="container">
        <h2>Related HireScoreAI features</h2>
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
  const resourceHubItems = [
    {
      href: '/resources/user-guide',
      title: 'User Guide',
      text: 'Step-by-step workflows for jobs, apply links, resume uploads, ranking, shortlisting, and interviews.',
      meta: '8 guides',
      icon: BookOpen,
    },
    {
      href: '/resources/blogs',
      title: 'Recruiting Blog',
      text: 'Practical articles on AI resume screening, JD matching, ranking, shortlisting, and hiring automation.',
      meta: `${blogPosts.length} articles`,
      icon: PenLine,
    },
    {
      href: '/resources/case-studies',
      title: 'Case Studies',
      text: 'Sample hiring scenarios showing how teams can reduce manual screening and improve shortlist quality.',
      meta: `${caseStudies.length} studies`,
      icon: Building2,
    },
    {
      href: '/resources/faqs',
      title: 'FAQs',
      text: 'Answers for recruiters, HR teams, staffing agencies, product access, pilots, and workflow questions.',
      meta: 'Quick answers',
      icon: HelpCircle,
    },
    {
      href: '/resources/release-notes',
      title: 'Release Notes',
      text: 'Product updates for screening, scoring, candidate workflows, and recruiter productivity improvements.',
      meta: 'Updates',
      icon: Rocket,
    },
  ]

  return (
    <>
      <SEO path="/resources" />
      <section className="resourcesHero">
        <div className="container resourcesHeroGrid">
          <div>
            <span className="eyebrow"><BookOpen size={14} />Resource Center</span>
            <h1>Hiring resources for AI-powered recruiting teams</h1>
            <p>Explore practical guides, blogs, case studies, FAQs, and product updates built for recruiters using AI resume screening and candidate ranking.</p>
            <div className="resourcesHeroActions">
              <a className="btn btnPrimary btnLarge" href={PILOT_MAILTO}>Request Free Access <ArrowRight size={18} /></a>
              <Link className="btn btnGhost btnLarge" href="/resources/user-guide">Open User Guide</Link>
            </div>
          </div>
          <div className="resourcesSpotlight" aria-label="Resource highlights">
            <div><FileSearch size={22} /><strong>Resume screening guides</strong><span>Learn faster shortlist workflows</span></div>
            <div><ClipboardCheck size={22} /><strong>Recruiter playbooks</strong><span>Use JD fit, scoring, and explanations</span></div>
            <div><MailCheck size={22} /><strong>Free access</strong><span>Email {CONTACT_EMAIL}</span></div>
          </div>
        </div>
      </section>
      <section className="section resourcesDirectory">
        <div className="container">
          <div className="resourcesSectionHeader">
            <span>Explore the library</span>
            <h2>Everything your team needs to evaluate HireScoreAI</h2>
            <p>Choose a path based on whether you are learning the product, researching AI screening, or preparing a pilot.</p>
          </div>
          <div className="resourceHubGrid">
            {resourceHubItems.map(({ href, title, text, meta, icon: Icon }) => (
              <Link href={href} className="resourceHubCard" key={href}>
                <div><Icon size={24} /></div>
                <span>{meta}</span>
                <h2>{title}</h2>
                <p>{text}</p>
                <strong>Explore <ArrowRight size={15} /></strong>
              </Link>
            ))}
          </div>
          <div className="resourcesAccessPanel">
            <div>
              <span>Free pilot access</span>
              <h2>Want access to HireScoreAI?</h2>
              <p>Email <a href={PILOT_MAILTO}>{CONTACT_EMAIL}</a> with your company name, hiring roles, and expected resume volume. We will help you start the right pilot.</p>
            </div>
            <a className="btn btnPrimary btnLarge" href={PILOT_MAILTO}>Email for Free Access <MailCheck size={18} /></a>
          </div>
        </div>
      </section>
    </>
  )
}

function GuideHub() {
  return (
    <>
      <SEO path="/resources/user-guide" />
      <PageHero eyebrow="User guide" title="Step-by-step guides for using HireScoreAI" intro="Simple instructions for recruiters using HireScoreAI from job setup to interview scheduling." />
      <section className="section"><div className="container resourceGrid">{guidePages.map((guide) => <ResourceCard item={guide} key={guide.slug} />)}</div></section>
    </>
  )
}

function GuidePage({ guide }) {
  return (
    <>
      <SEO title={`${guide.title} | HireScoreAI User Guide`} description={guide.meta} path={guide.slug} />
      <PageHero eyebrow="User guide" title={guide.title} intro="Follow these simple steps to use HireScoreAI in your recruiting workflow." />
      <Breadcrumbs items={[['/resources/user-guide', 'User Guide'], [guide.slug, guide.title]]} />
      <section className="section">
        <div className="container guideLayout">
          <article className="articleCard">
            <h2>Steps</h2>
            {guide.steps.map((step, index) => <p id={`step-${index + 1}`} key={step}><strong>Step {index + 1}:</strong> {step}</p>)}
            <h2>Common mistakes</h2>
            <p>Avoid using the wrong job pipeline, incomplete job descriptions, or skipping AI explanations before shortlisting.</p>
            <h2>Best practices</h2>
            <p>Keep job criteria clear, review AI explanations, and move candidates through the pipeline as soon as decisions are made.</p>
            <a className="btn btnPrimary" href={APP_URL}>Open HireScoreAI</a>
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
      <SEO path="/resources/blogs" />

      <PageHero
        eyebrow="HireScoreAI Blog"
        title="AI recruitment insights for faster, smarter hiring"
        intro="Explore practical guides on AI resume screening, candidate ranking, public apply pages, shortlisting, hiring automation, and modern recruitment workflows."
      />

      <section className="section">
        <div className="container blogGrid">
          {blogPosts.map((post) => (
            <article className="blogCard" key={post.slug}>
              <Link href={post.slug} className="blogImageLink" aria-label={post.title}>
                <img
                  className="blogCardImage"
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                />
              </Link>

              <div className="blogCardBody">
                <div className="blogMetaRow">
                  <span className="blogCategory">{post.category}</span>
                  <span className="blogReadTime">{post.readTime}</span>
                  {post.published && <time dateTime="2026-07-26">{post.published}</time>}
                </div>

                <h2>
                  <Link href={post.slug}>{post.title}</Link>
                </h2>

                <p>{post.meta}</p>

                <Link href={post.slug} className="blogReadMore">
                  Read {post.category} article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}

function BlogPost({ post }) {
  if (post.isActionAgentArticle) return <ActionAgentBlogPost post={post} />
  const contextualLinks = blogContextLinks(post)
  return (
    <>
      <SEO
        title={`${post.title} | HireScoreAI Blog`}
        description={post.meta}
        path={post.slug}
        schemaHeadline={post.title}
      />

      <Breadcrumbs
        items={[
          ['/resources/blogs', 'Blogs'],
          [post.slug, post.title],
        ]}
      />

      <article className="blogDetail">
        <div className="container">
          <div className="blogDetailHero">
            <div className="blogMetaRow">
              <span className="blogCategory">{post.category}</span>
              <span className="blogReadTime">{post.readTime}</span>
              <span>By HireScoreAI</span>
            </div>

            <h1>{post.title}</h1>
            <p className="blogDetailIntro">{post.meta}</p>

            <img
              className="blogDetailImage"
              src={post.image}
              alt={post.title}
            />
          </div>

          <div className="blogContent">
            {post.sections.map(([heading, text]) => (
              <section className="blogContentSection" key={heading}>
                <h2>{heading}</h2>
                <p>{text}</p>
              </section>
            ))}
          </div>

          <div className="blogRelatedBox">
            <h2>Related HireScoreAI pages</h2>
            <div className="blogRelatedLinks">
              {contextualLinks.map((href) => (
                <Link href={href} key={href}>
                  {titleByPath(href)}
                </Link>
              ))}
            </div>
          </div>

          <div className="blogCtaBox">
            <div>
              <span className="blogCtaEyebrow">HireScoreAI</span>
              <h2>Ready to screen resumes faster?</h2>
              <p>
                Use HireScoreAI to create jobs, collect resumes, rank candidates,
                and shortlist better profiles with AI.
              </p>
            </div>

            <Link href="/pricing" className="blogCtaButton">
              Review pricing and pilot options <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}


function CaseStudyList() {
  return (
    <>
      <SEO path="/resources/case-studies" />
      <PageHero eyebrow="Case studies" title="Demo case studies for AI-powered hiring workflows" intro="These generic examples show how recruiting teams can use HireScoreAI. They are sample scenarios, not named client claims." />
      <section className="section"><div className="container resourceGrid">{caseStudies.map((study) => <ResourceCard item={study} key={study.slug} />)}</div></section>
    </>
  )
}

function CaseStudyPage({ study }) {
  return (
    <>
      <SEO title={`${study.title} | HireScoreAI Case Study`} description={study.meta} path={study.slug} />
      <PageHero eyebrow="Sample case study" title={study.title} intro={study.summary} />
      <Breadcrumbs items={[['/resources/case-studies', 'Case Studies'], [study.slug, study.title]]} />
      <section className="section">
        <article className="container articleCard">
          <p><strong>Note:</strong> This is a generic demo case study using placeholder scenarios for product education.</p>
          <h2>Challenge</h2>
          <p>The recruiting team needed to reduce manual screening work while keeping candidate decisions clear and organized.</p>
          <h2>Solution</h2>
          <p>The team used HireScoreAI for structured job setup, resume screening, candidate scoring, ranking, and workflow tracking.</p>
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
  const pricingSummary = [
    ['Free Pilot', 'INR 0', '7 days', '3 active jobs'],
    ['Starter', 'INR 599', 'per month', '5 active jobs'],
    ['Growth', 'INR 1,599', 'per month', '15 active jobs'],
    ['Enterprise', 'Custom', 'talk to an expert', 'Custom active jobs'],
  ]

  return (
    <>
      <SEO path="/pricing" />
      <PageHero eyebrow="Pricing" title="Simple pricing for AI-powered hiring teams" intro="Start with a 7-day free pilot, then choose a monthly plan based on the number of active jobs your hiring team needs." />
      <section className="section compact pricingSeoSection" aria-labelledby="pricing-summary-title">
        <div className="container pricingSeoSummary">
          <div>
            <span className="eyebrow"><CheckCircle2 size={14} />INR pricing</span>
            <h2 id="pricing-summary-title">HireScoreAI pricing starts with a free pilot, then monthly INR plans</h2>
            <p>Choose the plan by active job volume: Free Pilot for 7 days, Starter at INR 599 per month, Growth at INR 1,599 per month, or Enterprise custom pricing for larger hiring workflows.</p>
          </div>
          <div className="pricingSeoGrid" aria-label="HireScoreAI pricing summary">
            {pricingSummary.map(([name, price, period, jobs]) => (
              <article key={name}>
                <span>{name}</span>
                <strong>{price}</strong>
                <small>{period}</small>
                <p>{jobs}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section pricingSection"><div className="container pricingGrid">{pricingPlans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}</div></section>
      <AgentDetailBand
        title="Evaluate the Action AI Agent during your HireScoreAI pilot"
        text="Use the pilot to test how plain-English requests can work across your connected HireScoreAI workflow. Ask the agent questions about jobs and candidates, then review how it prepares or completes available recruiting actions."
        prompts={[
          'Create a job from this role description and prepare its public apply page.',
          'Show me the strongest applicants and explain their relevant skills.',
          'Prepare the next shortlist, communication, and interview actions for review.',
        ]}
        note="Confirm Action Agent access and available workspace actions with the HireScoreAI team for your selected plan."
      />
      <section className="section">
        <div className="container narrow">
          <SectionHeader eyebrow="Pricing FAQ" title="HireScoreAI vs typical ATS pricing models" />
          <div className="faqList">
            {pricingFaqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}

function PricingCard({ plan }) {
  const cta = plan.href.startsWith('/') ? (
    <Link className="btn btnPrimary" href={plan.href}>{plan.cta}</Link>
  ) : (
    <a className="btn btnPrimary" href={plan.href}>{plan.cta}</a>
  )
  return (
    <article className={`pricingCard ${plan.featured ? 'isFeatured' : ''}`}>
      <span>{plan.badge}</span>
      <h2>{plan.name}</h2>
      <div className="pricingAmount">
        <strong>{plan.price}</strong>
        <small>{plan.period}</small>
      </div>
      <div className="pricingJobLimit">{plan.jobs}</div>
      <p>{plan.text}</p>
      <ul>{plan.items.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
      {cta}
    </article>
  )
}

function ContactPage() {
  return (
    <>
      <SEO path="/contact" />
      <PageHero eyebrow="Contact" title="Request a HireScoreAI demo or free pilot" intro="Recruiters, HR teams, startups, staffing agencies, and hiring managers can request pilot access or ask questions about the platform." cta={false} />
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
            <p>For free access, email <a href={PILOT_MAILTO}>{CONTACT_EMAIL}</a> with your company name and expected resume volume.</p>
            <a className="btn btnPrimary" href={PILOT_MAILTO}>Request Free Access</a>
          </aside>
        </div>
      </section>
      <AgentDetailBand
        title="Tell us what you want the Action AI Agent to handle"
        text="When requesting a demo or pilot, describe the hiring work you want to complete in plain English. We can show how the agent uses the relevant connected HireScoreAI features for that workflow."
        prompts={[
          'I want the agent to create jobs and public apply pages.',
          'I want to ask questions about candidate skills, scores, and rankings.',
          'I want recruiter-reviewed shortlist, email, and interview actions.',
        ]}
        note="Your demo can focus on the HireScoreAI features and approval controls that matter to your team."
      />
    </>
  )
}

const actionAgentToc = [
  ['problem', 'The Problem with Complex ATS Dashboards'],
  ['solution', 'The Solution: An ATS You Can Talk To'],
  ['how-it-works', 'How the HireScoreAI Action AI Agent Works'],
  ['create-jobs', 'Create Jobs Through Conversation'],
  ['application-pages', 'Generate and Share Public Application Pages'],
  ['process-resumes', 'Upload and Process Candidate Resumes'],
  ['best-candidates', 'Find and Understand the Best Candidates'],
  ['shortlist', 'Shortlist Candidates and Move Them Forward'],
  ['communication', 'Manage Candidate Communication'],
  ['interviews', 'Schedule Interviews Through Chat'],
  ['screening-tests', 'Run Screening Tests and Continue the Workflow'],
  ['guide-vs-action', 'Guide Agent vs Action Agent'],
  ['control', 'Recruiters Stay in Control'],
  ['benefits', 'Benefits of Hiring Through Conversation'],
  ['future', 'The Future of Recruitment Software Is Conversational'],
  ['start', 'Start Hiring Through Conversation'],
]

function ChatCommand({ children }) {
  return <blockquote className="actionChatCommand"><MessageSquareText size={18} aria-hidden="true" /><span>{children}</span></blockquote>
}

function ActionAgentBlogPost({ post }) {
  const [activeSection, setActiveSection] = useState(actionAgentToc[0][0])

  useEffect(() => {
    const sections = actionAgentToc.map(([id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.2, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const contextualLinks = blogContextLinks(post)
  const workflowCommands = [
    ['Create this job', 'Job creation'],
    ['Process these resumes', 'Resume processing'],
    ['Show me the strongest candidates', 'Candidate ranking'],
    ['Move them to communication', 'Stage update'],
    ['Schedule interviews', 'Interview plan'],
  ]
  const dashboardSteps = ['Job creation', 'Resume upload', 'Candidate review', 'Shortlisting', 'Communication', 'Interview scheduling']
  const actionSteps = [
    ['01', 'Understand recruiter intent', 'Identify the requested outcome, job, candidates and available context.'],
    ['02', 'Prepare an action plan', 'Structure the supported action and surface any missing information.'],
    ['03', 'Request confirmation', 'Show the affected job, candidates, message or schedule for recruiter review.'],
    ['04', 'Execute the approved action', 'Continue only after the recruiter confirms the prepared action.'],
  ]
  const benefits = [
    ['Less dashboard navigation', 'Spend less time moving repeatedly through menus, forms and filters.', Route],
    ['Faster recruiter onboarding', 'Help new users begin supported workflows without learning every screen first.', Rocket],
    ['Reduced repetitive work', 'Make common job, stage and communication tasks easier to prepare.', Zap],
    ['Better feature adoption', 'Reach useful capabilities through natural-language instructions.', Sparkles],
    ['Connected hiring workflows', 'Keep screening, ranking, communication and interviews in one process.', Workflow],
    ['More time for human judgement', 'Preserve recruiter attention for candidates and hiring-manager conversations.', UsersRound],
  ]

  return (
    <>
      <SEO path={post.slug} schemaHeadline={post.title} />

      <article className="actionArticle">
        <header className="actionArticleHero">
          <div className="actionArticleShell actionArticleHeroGrid">
            <div className="actionArticleHeroCopy">
              <div className="blogMetaRow">
                <span className="blogCategory">{post.category}</span>
                <span className="blogReadTime">{post.readTime}</span>
                <time dateTime="2026-07-26">{post.published}</time>
              </div>
              <h1>{post.title}</h1>
              <p>HireScoreAI’s AI ATS Action Agent turns recruitment operations into a conversational hiring workflow: create jobs, review candidates, coordinate communication and schedule interviews through chat—while recruiter approval stays central to consequential actions.</p>
              <ul className="actionHeroHighlights" aria-label="Article highlights">
                <li>Conversational AI ATS</li>
                <li>Connected hiring workflow</li>
                <li>Recruiter-approved actions</li>
              </ul>
              <div className="actionArticleByline"><span className="actionArticleAuthor">H</span><span><strong>By HireScoreAI</strong><small>AI recruitment workflow insights</small></span></div>
              <a className="btn btnPrimary btnLarge" href={PILOT_MAILTO}>Book Your Free 7-Day Pilot <ArrowRight size={18} /></a>
            </div>
            <div className="actionHeroVisual">
              <img
                src={post.image}
                alt="HireScoreAI Action AI Agent conversation connecting recruiter commands to prepared ATS actions and recruiter confirmation"
                width="1200"
                height="630"
                fetchpriority="high"
              />
            </div>
          </div>
        </header>

        <div className="actionArticleShell actionArticleLayout">
          <aside className="actionArticleToc" aria-label="Article contents">
            <strong>In this article</strong>
            <nav>
              {actionAgentToc.map(([id, label]) => (
                <a className={activeSection === id ? 'isActive' : ''} href={`#${id}`} key={id}>{label}</a>
              ))}
            </nav>
          </aside>

          <div className="actionArticleBody">
            <details className="actionMobileToc">
              <summary>Article contents <ChevronDown size={18} /></summary>
              <nav>{actionAgentToc.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
            </details>

            <section className="actionArticleIntro" aria-label="Introduction">
              <p>Recruitment technology has become more powerful, but using it has not always become easier.</p>
              <p>Many applicant tracking systems require recruiters to move between dashboards, forms, filters and candidate profiles. Creating a job happens on one screen, resume processing on another, shortlisting somewhere else, and interview scheduling in a separate workflow.</p>
              <p>Even modern AI recruiting platforms can add isolated AI features without removing the operational complexity recruiters face every day. Recruiters may gain smarter screening and automation while still manually controlling every step.</p>
              <p><Link href="/">HireScoreAI</Link> takes a different approach. Its AI ATS Action Agent lets recruiters manage a connected hiring workflow through conversation. Instead of searching menus or memorising every feature location, recruiters can state what they want to accomplish, review the prepared action and retain final control.</p>
            </section>

            <section className="actionWorkflowVisual" aria-labelledby="conversation-workflow-title">
              <div className="actionSectionLabel">Conversation workflow</div>
              <h2 id="conversation-workflow-title">One conversation, connected ATS actions</h2>
              <div className="actionWorkflowSequence">
                {workflowCommands.map(([command, action], index) => (
                  <div className="actionWorkflowRow" style={{ '--sequence': index }} key={command}>
                    <span className="actionWorkflowNumber">{index + 1}</span>
                    <blockquote>{command}</blockquote>
                    <span className="actionWorkflowConnector"><ArrowRight size={17} /></span>
                    <div><CheckCircle2 size={17} /><span>{action}</span><small>Prepared for review</small></div>
                  </div>
                ))}
              </div>
              <div className="actionConfirmation"><ShieldCheck size={21} /><span><strong>Confirmation first</strong> Consequential actions continue only after recruiter review and approval.</span></div>
            </section>

            <section className="actionArticleSection" id="problem">
              <span className="actionSectionLabel">The operational problem</span>
              <h2>The Problem with Complex ATS Dashboards</h2>
              <p>Traditional ATS platforms were mainly designed to store candidate records and manage hiring stages. As more features were added, dashboards became more powerful—but also more complicated.</p>
              <p>To complete one hiring requirement, a recruiter may need to move through every part of this workflow:</p>
              <div className="actionDashboardFlow">
                {dashboardSteps.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>)}
              </div>
              <p>Each action may require a separate page, form or configuration. This creates friction for recruitment agencies, staffing companies and internal HR teams. Recruiters spend time operating software when they should be evaluating candidates and speaking with hiring managers.</p>
              <p>Agentic recruitment systems can interpret natural language and combine it with defined workflow automation, while keeping hiring teams responsible for decisions. That direction is particularly relevant across <Link href="/solutions">AI hiring solutions for recruitment agencies, staffing companies and HR teams</Link>.</p>
            </section>

            <section className="actionArticleSection" id="solution">
              <span className="actionSectionLabel">A conversational workspace</span>
              <h2>The Solution: An ATS You Can Talk To</h2>
              <p>HireScoreAI’s Action AI Agent converts recruiter instructions into structured hiring actions. A recruiter can begin with:</p>
              <ChatCommand>Create a Data Analyst job using this job description.</ChatCommand>
              <p>The agent can understand the request, extract relevant job details and prepare the job for review. The recruiter can then continue:</p>
              <div className="actionCommandGrid">
                <ChatCommand>Create a public application page for this job.</ChatCommand>
                <ChatCommand>Upload these resumes and process them.</ChatCommand>
                <ChatCommand>Show me the top 10 candidates.</ChatCommand>
                <ChatCommand>Move qualified candidates to communication.</ChatCommand>
                <ChatCommand>Schedule interviews for next Tuesday.</ChatCommand>
              </div>
              <p>Rather than navigating each dashboard area manually, the recruiter manages the workflow through a continuous conversation inside <Link href="/product/hirescore-ai">HireScoreAI’s connected AI recruitment platform</Link>.</p>
            </section>

            <section className="actionArticleSection" id="how-it-works">
              <span className="actionSectionLabel">Intent to approved action</span>
              <h2>How the HireScoreAI Action AI Agent Works</h2>
              <p>The Action AI Agent starts by understanding the recruiter’s intent: the requested action, the relevant job or candidates, the available information, missing details and whether confirmation is required.</p>
              <ChatCommand>Move the top 10 Data Analyst candidates to communication.</ChatCommand>
              <p>For this request, the agent can resolve the job, identify the highest-ranked candidates and prepare the proposed movement. Before completing an important action, it shows what will happen and asks for approval.</p>
              <div className="actionSteps">
                {actionSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
              </div>
              <p>This provides the convenience of AI hiring workflow automation without removing human control.</p>
            </section>

            <section className="actionArticleSection" id="create-jobs">
              <h2>Create Jobs Through Conversation</h2>
              <p>Creating a job usually involves entering a title, required skills, experience level, location, employment type, responsibilities and candidate requirements.</p>
              <p>With the Action AI Agent, a recruiter can provide a job description or explain the requirement conversationally:</p>
              <ChatCommand>Create a Senior Backend Developer role requiring Python, FastAPI, PostgreSQL, AWS and five years of experience.</ChatCommand>
              <p>The agent can structure the requirement, prepare the job details and ask the recruiter to review them before creation. This reduces repetitive form filling and supports a quicker start to the <Link href="/product/create-job">structured job-creation workflow</Link>.</p>
            </section>

            <section className="actionArticleSection" id="application-pages">
              <h2>Generate and Share Public Application Pages</h2>
              <p>Once a job is created, the recruiter can ask the agent to generate a public application page.</p>
              <ChatCommand>Create an application link for this job.</ChatCommand>
              <p>The resulting <Link href="/product/public-apply-page">public job application page</Link> can be shared through LinkedIn, job boards, email campaigns or direct outreach. Candidates can submit applications and resumes directly into the appropriate workflow.</p>
            </section>

            <section className="actionArticleSection" id="process-resumes">
              <h2>Upload and Process Candidate Resumes</h2>
              <p>Recruiters often receive resumes through email, job portals, referrals and shared folders. Instead of manually assigning every file, they can ask:</p>
              <ChatCommand>Upload these resumes to the Backend Developer job.</ChatCommand>
              <p>The Action AI Agent can help associate the resumes with the correct requirement and initiate candidate processing. HireScoreAI can then extract skills, work experience, education, projects, role history and contact details.</p>
              <p><Link href="/product/resume-upload">Connected resume upload and processing</Link> reduces repetitive organisation work and prepares candidate information for more structured evaluation.</p>
            </section>

            <section className="actionArticleSection" id="best-candidates">
              <h2>Find and Understand the Best Candidates</h2>
              <p>A recruiter should not have to open every profile simply to identify the strongest applicants.</p>
              <ChatCommand>Show me the top 10 candidates for this role.</ChatCommand>
              <p>HireScoreAI can surface AI-ranked candidates based on alignment with the job requirements. Recruiters can review matching skills, relevant experience, project evidence, missing requirements, potential risks and areas that need interview verification.</p>
              <ChatCommand>Why did this candidate receive a score of 82?</ChatCommand>
              <p>The agent can help surface the evidence behind the score, making <Link href="/product/ai-candidate-ranking">AI candidate ranking</Link> easier to understand. The score supports review; it does not make the final hiring decision.</p>
            </section>

            <section className="actionArticleSection" id="shortlist">
              <h2>Shortlist Candidates and Move Them Forward</h2>
              <p>Once the recruiter has reviewed the ranking, the workflow can continue through chat.</p>
              <div className="actionCommandGrid">
                <ChatCommand>Shortlist candidates scoring above 75.</ChatCommand>
                <ChatCommand>Move the top five candidates to communication.</ChatCommand>
              </div>
              <p>The Action AI Agent prepares the selected candidate list and asks for confirmation before changing a hiring stage. This can reduce repetitive stage updates when recruiters are managing large candidate volumes.</p>
            </section>

            <section className="actionArticleSection" id="communication">
              <h2>Manage Candidate Communication</h2>
              <p>Recruiters can also use the agent to prepare candidate communication.</p>
              <div className="actionCommandGrid">
                <ChatCommand>Draft an interview invitation for the shortlisted candidates.</ChatCommand>
                <ChatCommand>Prepare a follow-up message for candidates who have not responded.</ChatCommand>
                <ChatCommand>Send the selected candidates the next-step instructions.</ChatCommand>
              </div>
              <p>The recruiter can review the message and recipient list before anything is sent. This supports a faster <Link href="/product/candidate-communication">candidate communication workflow</Link> while leaving tone, content and final approval with the recruiter.</p>
            </section>

            <section className="actionArticleSection" id="interviews">
              <h2>Schedule Interviews Through Chat</h2>
              <p>Interview scheduling normally involves selecting candidates, entering dates, coordinating interviewers and preparing meeting details.</p>
              <ChatCommand>Schedule interviews with the shortlisted candidates next Tuesday afternoon.</ChatCommand>
              <p>The agent can gather missing information, prepare the interview plan and request confirmation before finalising it. This reduces the number of screens involved and helps avoid mistakes concerning the wrong candidate, job or stage.</p>
            </section>

            <section className="actionArticleSection" id="screening-tests">
              <h2>Run Screening Tests and Continue the Workflow</h2>
              <p>Recruiters may also ask the agent to initiate a screening test for selected candidates.</p>
              <ChatCommand>Send a technical screening test to the shortlisted backend candidates.</ChatCommand>
              <p>After the recruiter confirms the action, selected candidates can move into the appropriate assessment workflow. Job creation, screening, shortlisting, communication, testing and interview scheduling remain connected inside one conversation.</p>
            </section>

            <section className="actionArticleSection" id="guide-vs-action">
              <span className="actionSectionLabel">Two assistance modes</span>
              <h2>Guide Agent vs Action Agent</h2>
              <p>HireScoreAI supports two assistance modes for different recruiter needs.</p>
              <div className="agentComparison">
                <article>
                  <div className="agentComparisonIcon"><BookOpen size={22} /></div>
                  <span>Learn and navigate</span>
                  <h3>Guide Agent</h3>
                  <ul>
                    <li><CheckCircle2 size={17} />Explains workflows</li>
                    <li><CheckCircle2 size={17} />Shows the next steps</li>
                    <li><CheckCircle2 size={17} />Makes no changes</li>
                    <li><CheckCircle2 size={17} />Useful for onboarding</li>
                  </ul>
                </article>
                <article className="isAction">
                  <div className="agentComparisonIcon"><Bot size={22} /></div>
                  <span>Prepare and complete</span>
                  <h3>Action Agent</h3>
                  <ul>
                    <li><CheckCircle2 size={17} />Prepares supported actions</li>
                    <li><CheckCircle2 size={17} />Executes after confirmation</li>
                    <li><CheckCircle2 size={17} />Helps complete repetitive workflows</li>
                    <li><CheckCircle2 size={17} />Keeps recruiters in control</li>
                  </ul>
                </article>
              </div>
              <p>The Guide Agent helps recruiters understand the product without changing anything. The Action Agent prepares supported tasks and continues only with the required approval. Together, they make the ATS more approachable for new and experienced recruiters.</p>
            </section>

            <section className="actionArticleSection" id="control">
              <span className="actionSectionLabel">Responsible automation</span>
              <h2>Recruiters Stay in Control</h2>
              <p>An AI recruitment agent should not make important hiring decisions without oversight. HireScoreAI follows a confirmation-first approach for sensitive or consequential actions.</p>
              <div className="actionApprovalPanel">
                <div><ShieldCheck size={27} /><span><small>Action status</small><strong>Ready for recruiter review</strong></span></div>
                <ul>
                  <li>The job being affected</li>
                  <li>The candidates selected</li>
                  <li>The proposed stage change</li>
                  <li>The message that will be sent</li>
                  <li>The interview details</li>
                  <li>The action requiring approval</li>
                </ul>
                <button type="button" disabled aria-label="Example confirmed action button">Confirm approved action</button>
              </div>
              <p>Responsible recruitment automation should handle repetitive workflow preparation while keeping hiring teams accountable for final decisions. The agent supports recruiter decisions—it does not replace recruiters.</p>
            </section>

            <section className="actionArticleSection" id="benefits">
              <span className="actionSectionLabel">Practical advantages</span>
              <h2>Benefits of Hiring Through Conversation</h2>
              <div className="actionBenefitGrid">
                {benefits.map(([title, text, Icon]) => <article key={title}><Icon size={21} /><h3>{title}</h3><p>{text}</p></article>)}
              </div>
            </section>

            <section className="actionArticleSection" id="future">
              <h2>The Future of Recruitment Software Is Conversational</h2>
              <p>The future of recruitment software is not simply another dashboard filled with more buttons. It is an intelligent hiring system that understands what recruiters are trying to achieve and helps them complete supported work.</p>
              <div className="actionFutureFlow">
                {['Create this job', 'Process these resumes', 'Show me the strongest candidates', 'Move them to communication and schedule interviews'].map((command, index) => <div key={command}><span>{index + 1}</span><p>{command}</p></div>)}
              </div>
              <p>HireScoreAI turns complex hiring workflows into simpler conversations while keeping recruiters in control of every important action.</p>
            </section>

            <section className="actionArticleSection actionArticleConclusion" id="start">
              <h2>Start Hiring Through Conversation</h2>
              <p>HireScoreAI combines job creation, public application pages, resume processing, AI candidate scoring, explainable ranking, shortlisting, candidate communication, screening tests and interview scheduling in one connected platform.</p>
              <p>The Action AI Agent makes the workflow easier to manage through simple chat-based instructions. Recruiters can reduce dashboard navigation without giving up review, accountability or final decision-making.</p>
              <p>Ready to stop navigating complex ATS dashboards and start hiring through conversation?</p>
            </section>

            <section className="actionArticleCta" aria-label="Start Hiring Through Conversation">
              <span className="actionSectionLabel">HireScoreAI Action AI Agent</span>
              <h2>Start Hiring Through Conversation</h2>
              <p>Manage jobs, resumes, candidate ranking, communication and interviews through simple chat-based instructions.</p>
              <a href={PILOT_MAILTO} className="btn btnPrimary btnLarge">Book Your Free 7-Day Pilot <ArrowRight size={18} /></a>
            </section>

            <div className="blogRelatedBox">
              <h2>Continue exploring HireScoreAI</h2>
              <div className="blogRelatedLinks">
                {contextualLinks.map((href) => <Link href={href} key={href}>{titleByPath(href)}</Link>)}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

function blogContextLinks(post) {
  const index = blogPosts.findIndex((item) => item.slug === post.slug)
  const relatedArticles = [
    blogPosts[(index + 1) % blogPosts.length].slug,
    blogPosts[(index + 2) % blogPosts.length].slug,
  ]
  const solution = post.category === 'Public Apply Page' ? '/solutions/startups'
    : post.category === 'AI Shortlisting' ? '/solutions/recruitment-agencies'
      : post.category === 'Candidate Ranking' ? '/solutions/bulk-resume-screening'
        : '/solutions/hr-teams'
  const guide = post.category === 'Public Apply Page' ? '/resources/user-guide/share-public-apply-link'
    : post.category === 'AI Shortlisting' ? '/resources/user-guide/shortlist-candidates'
      : post.category === 'Candidate Ranking' ? '/resources/user-guide/review-ai-ranked-candidates'
        : post.category === 'Hiring Automation' ? '/resources/user-guide/create-a-job'
          : '/resources/user-guide/upload-resumes'
  return [...new Set([
    ...post.links,
    solution,
    guide,
    ...relatedArticles,
    '/resources/blogs',
    '/pricing',
  ])]
}

const solutionHeroCards = [
  ['Recruitment Agencies', BriefcaseBusiness],
  ['HR Teams', UsersRound],
  ['Staffing Firms', Building2],
  ['Startup Hiring', Rocket],
  ['Bulk Resume Screening', Files],
]

const solutionPainPoints = [
  ['Too many resumes', 'Recruiters spend hours reviewing profiles manually, especially for high-volume roles.', Files],
  ['Inconsistent screening', 'Different recruiters may judge the same resume differently, making shortlisting inconsistent.', SearchCheck],
  ['Weak shortlist visibility', 'It becomes hard to explain why a candidate was selected, rejected, or moved forward.', BadgeCheck],
  ['Scattered workflow', 'Resumes, notes, emails, interviews, and candidate status often live across different tools.', Network],
]

const solutionCards = [
  {
    title: 'Recruitment Agencies',
    subtitle: 'Screen more resumes. Send better shortlists to clients.',
    text: 'HireScoreAI helps agencies manage multiple jobs, upload candidate resumes, rank applicants by JD fit, and share recruiter-ready insights with clients.',
    bestFor: ['Multiple client roles', 'High-volume resume screening', 'Faster shortlist delivery', 'Recruiter explanation notes'],
    cta: 'Explore Agency Solution',
    slug: '/solutions/recruitment-agencies',
    icon: BriefcaseBusiness,
  },
  {
    title: 'In-House HR Teams',
    subtitle: 'Bring structure to internal hiring.',
    text: 'HR teams can create jobs, collect applications, review AI-ranked candidates, and move shortlisted profiles into the interview pipeline.',
    bestFor: ['Internal hiring teams', 'Department-wise hiring', 'Hiring manager review', 'Interview pipeline tracking'],
    cta: 'Explore HR Solution',
    slug: '/solutions/hr-teams',
    icon: UsersRound,
  },
  {
    title: 'Staffing & Consulting Firms',
    subtitle: 'Manage candidate pipelines for multiple roles.',
    text: 'Staffing firms can process resumes faster, identify role-fit candidates, and keep candidate communication organized from screening to interview.',
    bestFor: ['IT staffing', 'Consulting hiring', 'Bench candidate screening', 'Client-ready candidate lists'],
    cta: 'Explore Staffing Solution',
    slug: '/solutions/staffing-companies',
    icon: Building2,
  },
  {
    title: 'Startups & SMBs',
    subtitle: 'Hire smarter without a large recruitment team.',
    text: 'Small teams can use AI to screen resumes, compare candidates, and focus only on the most relevant applicants.',
    bestFor: ['Small hiring teams', 'Founder-led hiring', 'Fast-growing startups', 'Limited HR bandwidth'],
    cta: 'Explore Startup Solution',
    slug: '/solutions/startups',
    icon: Rocket,
  },
  {
    title: 'Bulk Resume Screening',
    subtitle: 'Upload resumes. Get ranked candidates. Save recruiter time.',
    text: 'HireScoreAI helps teams analyze large resume batches and identify candidates who match the JD requirements.',
    bestFor: ['Resume database screening', 'Walk-in hiring', 'Job fair data', 'Bulk applications'],
    cta: 'Explore Bulk Screening',
    slug: '/solutions/bulk-resume-screening',
    icon: Files,
  },
  {
    title: 'IT & Tech Hiring',
    subtitle: 'Rank technical candidates by role fit.',
    text: 'Screen candidates for Data Analyst, Full Stack, Backend, QA, Salesforce, ML, and other technical roles using JD-based matching.',
    bestFor: ['Tech recruitment', 'Skill-based screening', 'Role similarity matching', 'Candidate skill gap analysis'],
    cta: 'Explore Tech Hiring',
    slug: '/solutions/tech-hiring',
    icon: BrainCircuit,
  },
]

const solutionSteps = [
  ['Understand the job', 'HireScoreAI reads the job description and identifies important skills, experience, role expectations, and hiring criteria.', PenLine],
  ['Analyze candidate profiles', 'The platform extracts candidate details like skills, experience, education, projects, companies, and role signals.', FileSearch],
  ['Rank by job fit', 'Candidates are scored and ranked based on JD relevance, skill match, experience fit, and role similarity.', Trophy],
  ['Explain every decision', 'Recruiters get matched skills, missing skills, candidate strengths, and review-ready explanation notes.', MessageSquareText],
]

const comparisonRows = [
  ['Resume review', 'Manual profile checking', 'AI-assisted resume analysis'],
  ['Candidate comparison', 'Recruiter judgment only', 'JD-based score and ranking'],
  ['Shortlisting', 'Time-consuming filtering', 'Faster shortlist with evidence'],
  ['Client reporting', 'Manual notes', 'Recruiter-ready explanation'],
  ['Candidate outreach', 'Separate email work', 'Built-in communication workflow'],
  ['Interview tracking', 'Sheets or manual follow-up', 'Pipeline and interview management'],
]

const platformComparisonRows = [
  {
    label: 'Primary fit',
    hirescoreAi: 'AI-first resume screening, JD matching, candidate ranking, and explainable shortlist workflows.',
    hireScore: 'Customizable hiring platform for sourcing, screening, assessments, ranking, and interview scheduling.',
    greenhouse: 'Structured ATS and hiring platform for scalable recruiting teams and standardized hiring workflows.',
    workday: 'Enterprise talent acquisition suite connected to broader Workday HCM and workforce data.',
  },
  {
    label: 'Best suited for',
    hirescoreAi: 'Recruitment agencies, HR teams, startups, staffing firms, and high-volume resume screening.',
    hireScore: 'Teams that want tailored hiring processes and job-focused recruiting support.',
    greenhouse: 'Growing companies that need mature ATS process, collaboration, and candidate pipeline management.',
    workday: 'Large organizations that already run HR, workforce, and talent workflows inside Workday.',
  },
  {
    label: 'Screening approach',
    hirescoreAi: 'Reads resumes against the JD, ranks candidates, and shows matched skills, gaps, and fit evidence.',
    hireScore: 'Combines screening, assessments, ranking, and customizable success factors.',
    greenhouse: 'Supports recruiting workflows with structured hiring and built-in AI recruiting tools.',
    workday: 'Supports high-volume hiring, candidate surfacing, automation, and enterprise recruiting workflows.',
  },
  {
    label: 'Decision clarity',
    hirescoreAi: 'Gives recruiter-ready explanations for why candidates move forward or need review.',
    hireScore: 'Focuses on configurable hiring criteria, process analytics, and tailored candidate evaluation.',
    greenhouse: 'Helps teams standardize hiring steps, interviews, and decision-making across the ATS.',
    workday: 'Provides visibility across recruiting and talent acquisition inside an enterprise HR system.',
  },
  {
    label: 'Pilot motion',
    hirescoreAi: 'Lightweight pilot: create a job, upload resumes, and review ranked candidates.',
    hireScore: 'More customizable hiring setup depending on hiring process and service needs.',
    greenhouse: 'ATS implementation and workflow configuration for recruiting operations.',
    workday: 'Enterprise implementation path for organizations using broader Workday products.',
  },
]

const featuredComparisonCards = [
  {
    title: 'HireScoreAI vs HiredScore',
    href: '/compare/hirescoreai-vs-hiredscore',
    text: 'Clarify similarly named products and see why HireScoreAI is positioned for focused, explainable resume screening.',
    points: ['Independent platform', 'JD-based ranking', 'Shortlist explanations'],
  },
  {
    title: 'HireScoreAI vs Zoho Recruit',
    href: '/compare/hirescoreai-vs-zoho-recruit',
    text: 'Compare focused AI screening and candidate ranking with a broader recruiting and applicant tracking workflow.',
    points: ['Screening focus', 'Recruiter control', 'Workflow fit'],
  },
  {
    title: 'HireScoreAI vs Manatal',
    href: '/compare/hirescoreai-vs-manatal',
    text: 'Compare explainable JD-based resume scoring with a broader recruiting suite evaluation.',
    points: ['Resume scoring', 'Setup clarity', 'No AI interviewer claim'],
  },
  {
    title: 'HireScoreAI vs Workable',
    href: '/compare/hirescoreai-vs-workable',
    text: 'Compare HireScoreAI screening with broader ATS and sourcing platform considerations.',
    points: ['Applicant screening', 'Pricing clarity', 'No sourcing database claim'],
  },
  {
    title: 'HireScoreAI vs Greenhouse',
    href: '/compare/hirescoreai-vs-greenhouse',
    text: 'Compare lighter explainable screening workflows with a mature ATS evaluation path.',
    points: ['Lean workflow', 'Screening speed', 'Not enterprise ATS replacement'],
  },
]

const solutionFeatures = [
  ['AI Resume Screening', 'Parse resumes and identify relevant candidate information quickly.', FileSearch],
  ['JD Matching', 'Compare every candidate against the role requirements.', Target],
  ['Candidate Ranking', 'See the strongest candidates at the top with clear scoring.', Trophy],
  ['Recruiter Explanation', 'Understand why a candidate is a good fit or where they may have gaps.', MessageSquareText],
  ['Smart Shortlisting', 'Move qualified candidates forward with a cleaner review process.', BadgeCheck],
  ['Communication Workflow', 'Engage candidates and manage hiring conversations.', Send],
  ['Interview Pipeline', 'Track candidates from shortlist to interview stage.', CalendarCheck],
  ['Hiring Analytics', 'Review job-level candidate quality and hiring progress.', PieChart],
]

const solutionWorkflowCoverage = [
  ['Job intake', 'Create structured hiring requirements before resume screening starts.', PenLine],
  ['Bulk resume review', 'Process large resume batches and surface stronger candidate matches faster.', Files],
  ['JD-fit ranking', 'Rank applicants by role relevance, matched skills, experience, and profile signals.', Target],
  ['Shortlist evidence', 'Give recruiters clear notes for why candidates should move forward or need review.', BadgeCheck],
  ['Client-ready summaries', 'Turn screening output into concise hiring manager or client review context.', ClipboardCheck],
  ['Candidate outreach', 'Keep communication connected to shortlist status and next hiring actions.', Send],
  ['Interview movement', 'Move qualified candidates from review to interview without losing screening context.', CalendarCheck],
  ['Hiring visibility', 'Track pipeline quality, screening progress, and role-level hiring activity.', PieChart],
]

const solutionSegmentContent = {
  '/solutions/recruitment-agencies': {
    cardTitle: 'Recruitment Agencies',
    eyebrow: 'Agency solution',
    h1: 'AI recruiting software for recruitment agencies',
    intro: 'Screen client resumes faster, rank candidates against each job description, and send shortlists that are easier for clients to review and trust.',
    primaryNeed: 'Agency recruiters need speed, quality, and clear candidate evidence across several client roles. HireScoreAI keeps the job requirement, resume batch, ranking, shortlist, and explanation notes in one review workflow.',
    problemTitle: 'Recruitment agency screening software for multi-client hiring',
    proofStats: [['Multi-role', 'Client hiring support'], ['JD-fit', 'Candidate ranking'], ['Pilot', 'Fast agency setup']],
    painPoints: [
      ['Too many roles at once', 'Agency recruiters need to compare resumes across several client requirements without losing context.'],
      ['Shortlists need evidence', 'Clients want to know why a candidate is worth reviewing, not just receive another resume list.'],
      ['Manual screening slows delivery', 'Resume review can consume recruiter hours before qualified profiles reach the client.'],
    ],
    capabilities: [
      ['Client-ready ranking', 'Rank candidates against each job description and prepare a cleaner shortlist for client review.'],
      ['Explainable candidate fit', 'Show matched skills, missing skills, and role-fit evidence before sending profiles forward.'],
      ['Separate job workspaces', 'Keep every client role, resume batch, shortlist, and candidate status organized.'],
      ['Faster agency pilot', 'Start with one client job, upload resumes, and review ranked candidates without a heavy rollout.'],
    ],
    outcomes: ['Screen high-volume candidate pools faster', 'Rank applicants against each client job description', 'Prepare shortlist notes clients can review quickly', 'Keep recruiter decisions supported by clear evidence'],
    workflow: ['Create separate jobs for each client role', 'Upload candidate resumes or collect applications', 'Review AI-ranked candidates with matched skills and gaps', 'Share stronger shortlists with client-ready context'],
    faqs: [
      ['Can recruitment agencies use HireScoreAI for multiple clients?', 'Yes. Agencies can create separate jobs for different client roles, upload resumes, and review ranked candidates for each hiring requirement.'],
      ['Does HireScoreAI explain why candidates are shortlisted?', 'Yes. Recruiters can review matched skills, gaps, score context, and explanation notes before sharing candidates with clients.'],
      ['Is this useful for high-volume agency hiring?', 'Yes. HireScoreAI is designed to reduce manual resume screening time while keeping recruiters in control of the final shortlist.'],
    ],
    relatedLinks: [
      ['/product/ai-candidate-ranking', 'Candidate ranking'],
      ['/product/ai-explanation-engine', 'Explanation engine'],
      ['/resources/user-guide/upload-resumes', 'Upload resumes guide'],
    ],
  },
  '/solutions/staffing-companies': {
    cardTitle: 'Staffing & Consulting Firms',
    eyebrow: 'Staffing solution',
    h1: 'AI resume screening for staffing companies',
    intro: 'Match bench and inbound candidates to active client roles with JD-based ranking, explainable fit signals, and a cleaner recruiter review flow.',
    primaryNeed: 'Staffing teams work across fast-moving requirements where speed and fit evidence both matter. HireScoreAI helps compare profiles against active roles and keep the next candidate action visible.',
    problemTitle: 'AI resume screening for staffing and consulting pipelines',
    proofStats: [['Bench', 'Candidate screening'], ['Role-fit', 'JD matching'], ['Client', 'Shortlist evidence']],
    painPoints: [
      ['Bench profiles are hard to match', 'Staffing teams need to quickly map available candidates to active client requirements.'],
      ['Client submissions need clarity', 'Recruiters need concise evidence before moving profiles into client review.'],
      ['High-volume resumes create noise', 'Large candidate pools make it harder to find the strongest role-fit profiles quickly.'],
    ],
    capabilities: [
      ['Bench candidate matching', 'Compare candidate profiles against active roles to surface stronger matches faster.'],
      ['Staffing shortlist workflow', 'Use scores and explanations to build client-ready lists with less manual review.'],
      ['Role-specific candidate ranking', 'Prioritize profiles by JD relevance, skill match, experience, and profile quality.'],
      ['Connected next steps', 'Move candidates from screening into communication and interview follow-up without losing context.'],
    ],
    outcomes: ['Screen bench and inbound candidates by role fit', 'Build candidate lists for IT staffing and consulting roles', 'Keep shortlist evidence organized for client review', 'Move qualified candidates into communication and interviews'],
    workflow: ['Set up role-specific hiring criteria', 'Upload candidate profiles for each opportunity', 'Use JD-fit scores to prioritize stronger matches', 'Move qualified candidates through communication and interview stages'],
    faqs: [
      ['Can staffing companies screen bench candidates with HireScoreAI?', 'Yes. Teams can upload candidate profiles and compare them against active roles to find stronger matches quickly.'],
      ['Does HireScoreAI support client-ready candidate lists?', 'Yes. Recruiters can use scores, matched skills, and explanation notes to prepare cleaner candidate lists for clients.'],
      ['Can staffing recruiters track communication after screening?', 'Yes. Candidate communication and interview movement can stay connected to the screening workflow.'],
    ],
    relatedLinks: [
      ['/product/hiring-pipeline', 'Hiring pipeline'],
      ['/product/candidate-communication', 'Candidate communication'],
      ['/product/interview-scheduling', 'Interview scheduling'],
    ],
  },
  '/solutions/hr-teams': {
    cardTitle: 'In-House HR Teams',
    eyebrow: 'HR team solution',
    h1: 'AI hiring software for in-house HR teams',
    intro: 'Give HR teams a structured applicant review workflow for creating jobs, collecting resumes, ranking candidates, and preparing hiring-manager-ready shortlists.',
    primaryNeed: 'In-house HR teams need repeatable screening across departments and clear context for hiring managers. HireScoreAI turns incoming applications into ranked candidate views with explanation notes.',
    problemTitle: 'AI hiring software for department-wise applicant screening',
    proofStats: [['HR', 'Hiring manager ready'], ['Apply', 'Candidate intake'], ['Ranked', 'Applicant review']],
    painPoints: [
      ['Hiring managers need context', 'HR teams need to explain why candidates are worth reviewing before interviews begin.'],
      ['Screening differs by department', 'Different roles need consistent JD-based evaluation rather than manual resume guessing.'],
      ['Applications pile up quickly', 'Inbound resumes can slow HR teams when every profile needs manual review.'],
    ],
    capabilities: [
      ['Department-wise job setup', 'Create structured roles with requirements that keep screening aligned to each team.'],
      ['Public apply page intake', 'Collect applications and resumes directly into the right hiring workflow.'],
      ['Hiring manager evidence', 'Share matched skills, gaps, and fit explanations before interview review.'],
      ['Shortlist to interview movement', 'Move qualified candidates into communication and interviews with screening context intact.'],
    ],
    outcomes: ['Structure hiring around each department role', 'Collect applications through public apply pages', 'Review ranked candidates with transparent evidence', 'Move qualified applicants into interview tracking'],
    workflow: ['Create a structured job with role requirements', 'Share a public apply link or upload resumes', 'Review ranked candidates with matched and missing skills', 'Shortlist candidates for hiring manager and interview review'],
    faqs: [
      ['How can HR teams use HireScoreAI with hiring managers?', 'HR teams can review ranked candidates and share clearer shortlist context with hiring managers before interviews.'],
      ['Does HireScoreAI help with department-wise hiring?', 'Yes. Each job can be created around a department role so screening stays aligned with the right requirements.'],
      ['Can HR teams collect applications directly?', 'Yes. HireScoreAI supports public apply pages so candidates can submit details and resumes for the right job.'],
    ],
    relatedLinks: [
      ['/product/public-apply-page', 'Public apply pages'],
      ['/product/ai-shortlisting', 'AI shortlisting'],
      ['/resources/user-guide/review-ai-ranked-candidates', 'Review ranked candidates guide'],
    ],
  },
  '/solutions/startups': {
    cardTitle: 'Startups & SMBs',
    eyebrow: 'Startup solution',
    h1: 'AI resume screening for startups and SMBs',
    intro: 'Help lean hiring teams review applicants faster, compare candidates fairly against the role, and focus interview time on stronger-fit profiles.',
    primaryNeed: 'Startups and SMBs often hire without a large recruiting team. HireScoreAI helps founders and small HR teams move from resume volume to explainable shortlists with less manual review.',
    problemTitle: 'AI resume screening software for lean startup hiring teams',
    proofStats: [['Lean', 'Hiring team fit'], ['7-day', 'Free pilot'], ['Fast', 'Resume review']],
    painPoints: [
      ['Small teams have limited time', 'Founders and lean HR teams cannot spend hours manually comparing every applicant.'],
      ['Early hires need careful review', 'Startups need stronger shortlists without skipping recruiter or founder judgment.'],
      ['No heavy ATS rollout', 'Growing teams need a practical hiring workflow before they commit to complex systems.'],
    ],
    capabilities: [
      ['Founder-friendly shortlist view', 'See ranked candidates with evidence that helps small teams decide who to review first.'],
      ['Simple job setup', 'Create the role, upload resumes, and start screening without a long implementation cycle.'],
      ['Skill match and gaps', 'Understand how applicants align with the job description before interviews.'],
      ['Pilot before scaling', 'Test HireScoreAI on real hiring volume before expanding the workflow.'],
    ],
    outcomes: ['Screen applicants without adding recruiter headcount', 'Compare candidates against the job description', 'See skill matches, gaps, and role-fit evidence', 'Move faster from application review to interviews'],
    workflow: ['Create a job for the role you need to fill', 'Collect or upload resumes in one place', 'Review AI-ranked candidates and shortlist the strongest profiles', 'Use communication and interview steps to keep hiring moving'],
    faqs: [
      ['Is HireScoreAI useful for founder-led hiring?', 'Yes. Small teams can use HireScoreAI to reduce manual resume review and focus on candidates who best match the role.'],
      ['Do startups need a large HR team to use HireScoreAI?', 'No. The workflow is built so lean teams can create jobs, upload resumes, review rankings, and shortlist candidates quickly.'],
      ['Can SMBs start with a free pilot?', 'Yes. You can request free pilot access by contacting HireScoreAI through the website.'],
    ],
    relatedLinks: [
      ['/pricing', 'Pricing'],
      ['/product/create-job', 'Create job'],
      ['/resources/case-studies/startup-reduced-resume-screening-time', 'Startup sample case study'],
    ],
  },
  '/solutions/bulk-resume-screening': {
    cardTitle: 'Bulk Resume Screening',
    eyebrow: 'High-volume screening',
    h1: 'Bulk resume screening software for high-volume hiring',
    intro: 'Turn large resume batches into ranked, review-ready candidate lists with JD-based scoring, skill evidence, and recruiter-friendly explanation notes.',
    primaryNeed: 'High-volume hiring teams need to reduce manual resume review without losing context. HireScoreAI helps recruiters move from bulk uploads to ranked shortlists tied to the job description.',
    problemTitle: 'Bulk resume screening software for large candidate pools',
    proofStats: [['Bulk', 'Resume batches'], ['Ranked', 'Candidate lists'], ['Evidence', 'Shortlist notes']],
    painPoints: [
      ['Resume volume overwhelms recruiters', 'Large batches from job boards, walk-ins, or databases make manual review slow and inconsistent.'],
      ['Keyword filters miss context', 'Recruiters need JD-fit evidence, not just exact keyword matches.'],
      ['Shortlists need to be defendable', 'High-volume hiring still needs clear reasons for why candidates move forward.'],
    ],
    capabilities: [
      ['Batch resume review', 'Upload large resume sets and prioritize profiles by job-fit relevance.'],
      ['JD-based candidate scoring', 'Use role requirements, skills, experience, and profile signals to rank applicants.'],
      ['Explainable shortlist evidence', 'Review matched skills, missing skills, and reasons before contacting candidates.'],
      ['High-volume hiring flow', 'Move from bulk upload to ranked shortlist without spreadsheet-heavy manual review.'],
    ],
    outcomes: ['Process large resume batches with less manual review', 'Rank candidates by JD relevance and skill match', 'Identify stronger profiles for recruiter review', 'Create clearer shortlist evidence for high-volume roles'],
    workflow: ['Create a job with role requirements', 'Upload bulk resumes or collect applications', 'Review AI-ranked candidates and fit explanations', 'Shortlist qualified profiles for communication or interviews'],
    faqs: [
      ['Can HireScoreAI screen bulk resume batches?', 'Yes. HireScoreAI helps teams upload and review large resume batches using JD-based ranking and recruiter-readable explanations.'],
      ['Is bulk screening useful for job fairs or walk-in hiring?', 'Yes. Bulk resume screening can help teams organize larger candidate pools from job fairs, walk-ins, or high-volume application sources.'],
      ['Does HireScoreAI make final hiring decisions?', 'No. HireScoreAI supports recruiter review with structured scores and explanations. Human recruiters remain responsible for final decisions.'],
    ],
    relatedLinks: [
      ['/product/resume-upload', 'Bulk resume upload'],
      ['/product/ai-candidate-ranking', 'Candidate ranking'],
      ['/product/ai-shortlisting', 'AI shortlisting'],
    ],
  },
  '/solutions/tech-hiring': {
    cardTitle: 'IT & Tech Hiring',
    eyebrow: 'Technical hiring',
    h1: 'AI candidate screening for IT and tech hiring',
    intro: 'Review technical resumes faster with skill matching, role-fit ranking, gap visibility, and shortlist notes recruiters can share with hiring managers.',
    primaryNeed: 'Tech recruiters need to compare skills, project context, role fit, experience, and gaps against each job description. HireScoreAI supports technical resume review without replacing recruiter judgment or technical interviews.',
    problemTitle: 'AI technical candidate screening for IT and software roles',
    proofStats: [['Skills', 'Tech resume matching'], ['Gaps', 'Candidate evidence'], ['Review', 'Recruiter controlled']],
    painPoints: [
      ['Technical resumes are dense', 'Recruiters need to understand skills, tools, projects, and role relevance quickly.'],
      ['Skill gaps matter', 'A candidate may match core skills while still missing important requirements for the role.'],
      ['Screening is not the interview', 'Teams need resume intelligence before technical interviews, not a replacement for technical evaluation.'],
    ],
    capabilities: [
      ['Skill-based resume screening', 'Compare technical resumes against required skills, experience, and role expectations.'],
      ['Matched and missing skills', 'Surface skill evidence and gaps so recruiters know what to validate next.'],
      ['Role-fit candidate ranking', 'Prioritize candidates for software, data, QA, Salesforce, ML, and other technical roles.'],
      ['Interview-ready context', 'Send stronger profiles forward with clear screening notes for hiring managers.'],
    ],
    outcomes: ['Screen technical resumes by job-specific skills', 'Compare candidates for IT and software roles', 'Surface matched skills and skill gaps for review', 'Build clearer technical shortlists for hiring managers'],
    workflow: ['Create a technical job with required skills', 'Upload resumes for the role', 'Review matched skills, missing skills, and ranking evidence', 'Shortlist candidates for further technical evaluation'],
    faqs: [
      ['Can HireScoreAI screen technical resumes?', 'Yes. HireScoreAI can help recruiters review technical resumes against role requirements and surface skill matches, gaps, and fit evidence.'],
      ['Does HireScoreAI replace technical interviews?', 'No. HireScoreAI supports resume screening and shortlisting. Teams should still use interviews, assignments, or technical review where needed.'],
      ['Which technical roles can recruiters screen?', 'Recruiters can use HireScoreAI for roles such as data analyst, backend, full stack, QA, Salesforce, ML, and other skill-based technical hiring workflows.'],
    ],
    relatedLinks: [
      ['/product/ai-resume-parsing', 'AI resume parsing'],
      ['/product/ai-candidate-scoring', 'Candidate scoring'],
      ['/product/ai-screening-test', 'AI screening tests'],
    ],
  },
}

const solutionSegmentPages = solutionSegmentRoutes.map((route) => {
  const content = solutionSegmentContent[route.path]
  const card = solutionCards.find((item) => item.title === content.cardTitle)
  return { ...route, ...content, card }
})

const comparisonPageContent = {
  '/compare/hirescoreai-vs-hiredscore': {
    competitorName: 'HiredScore',
    eyebrow: 'Platform comparison',
    h1: 'HireScoreAI vs HiredScore: is HireScoreAI the same platform?',
    intro: 'No. HireScoreAI is an independent AI recruitment platform and is not affiliated with HiredScore, HireScore.com, or Workday.',
    disclosure: 'This page is a high-level factual clarification for users comparing similarly named platforms. It does not claim affiliation, endorsement, partnership, or feature parity with HiredScore, HireScore.com, or Workday.',
    tableTitle: 'How HireScoreAI differs from HiredScore',
    tableIntro: 'This table reuses HireScoreAI positioning from the existing platform comparison content and keeps the HiredScore side factual, cautious, and verification-focused.',
    clarification: 'HireScoreAI is not HiredScore, is not HireScore.com, and is not a Workday product. Users should evaluate each platform separately based on their own requirements.',
    competitorNotes: {
      'Primary fit': 'HiredScore is a separate platform. Review HiredScore and Workday materials directly for current product scope and positioning.',
      'Best suited for': 'Teams evaluating HiredScore should confirm fit directly with HiredScore or Workday based on their organization size, workflow, and talent systems.',
      'Screening approach': 'The screening and talent intelligence approach is different from HireScoreAI and should be assessed from official HiredScore or Workday sources.',
      'Decision clarity': 'Decision support, explainability, and workflow details should be verified with the HiredScore or Workday product team.',
      'Pilot motion': 'Commercial setup, implementation, and support are separate from HireScoreAI and should be confirmed directly with HiredScore or Workday.',
    },
    faqs: [
      ['Is HireScoreAI the same as HiredScore?', 'No. HireScoreAI is independent and is not affiliated with HiredScore, HireScore.com, or Workday.'],
      ['Is HireScoreAI affiliated with Workday?', 'No. HireScoreAI is not affiliated with Workday.'],
      ['Why do HireScoreAI and HiredScore sound similar?', 'The names may sound similar, but they are separate platforms with different positioning and product focus.'],
    ],
  },
  '/compare/hirescoreai-vs-zoho-recruit': {
    competitorName: 'Zoho Recruit',
    eyebrow: 'Platform comparison',
    h1: 'HireScoreAI vs Zoho Recruit',
    intro: 'Compare HireScoreAI with Zoho Recruit at a high level for resume screening, candidate ranking, shortlist review, and recruiting workflow fit.',
    disclosure: 'HireScoreAI is an independent AI recruitment platform and is not affiliated with Zoho Recruit or Zoho Corporation. This page is a high-level comparison for evaluation, not an endorsement or partnership claim.',
    tableTitle: 'How HireScoreAI and Zoho Recruit differ',
    tableIntro: 'This table uses existing HireScoreAI positioning and keeps Zoho Recruit notes factual, cautious, and focused on what buyers should verify during evaluation.',
    clarification: 'HireScoreAI and Zoho Recruit are separate products. Teams should review current Zoho Recruit materials directly and compare them with HireScoreAI based on their hiring process.',
    competitorNotes: {
      'Primary fit': 'Zoho Recruit is a separate recruiting and applicant tracking product. Review Zoho Recruit materials directly for current product scope and positioning.',
      'Best suited for': 'Teams evaluating Zoho Recruit should confirm fit based on their ATS needs, hiring workflow, integrations, and existing Zoho ecosystem usage.',
      'Screening approach': 'Resume screening, candidate matching, and automation details should be verified from current Zoho Recruit product materials.',
      'Decision clarity': 'Decision support, reporting, and candidate review workflows should be assessed directly during a Zoho Recruit evaluation.',
      'Pilot motion': 'Commercial setup, implementation, and support are separate from HireScoreAI and should be confirmed directly with Zoho Recruit.',
    },
    faqs: [
      ['Is HireScoreAI the same as Zoho Recruit?', 'No. HireScoreAI and Zoho Recruit are separate recruiting platforms with different positioning and product focus.'],
      ['Is HireScoreAI affiliated with Zoho Recruit?', 'No. HireScoreAI is not affiliated with Zoho Recruit or Zoho Corporation.'],
      ['How should teams compare HireScoreAI and Zoho Recruit?', 'Teams should compare current product materials, workflow fit, resume screening needs, candidate ranking expectations, integrations, implementation, and support directly.'],
    ],
  },
  '/compare/hirescoreai-vs-manatal': {
    competitorName: 'Manatal',
    eyebrow: 'Platform comparison',
    h1: 'HireScoreAI vs Manatal',
    intro: 'Compare HireScoreAI with Manatal for AI candidate scoring, resume screening focus, setup needs, and recruiting workflow fit.',
    disclosure: 'Manatal is a broader recruiting suite. HireScoreAI is focused on explainable JD-based resume screening, candidate ranking, and shortlist review. HireScoreAI does not currently claim AI Interviewer parity.',
    tableTitle: 'How HireScoreAI and Manatal differ',
    tableIntro: 'This comparison highlights product focus and buyer evaluation points without claiming feature parity or unsupported competitor details.',
    clarification: 'HireScoreAI and Manatal are separate products. Manatal may suit teams looking for a broader recruiting suite, while HireScoreAI is positioned around explainable screening and ranking workflows.',
    competitorNotes: {
      'Primary fit': 'Manatal is positioned as a broader recruiting suite. Buyers should review current Manatal materials for ATS, CRM, sourcing, and automation scope.',
      'Best suited for': 'Teams evaluating Manatal may be looking for a wider recruiting suite beyond focused resume screening. Fit should be confirmed against their workflow needs.',
      'Screening approach': 'Manatal may support recruiting automation and candidate management workflows; specific AI screening behavior should be verified from current Manatal product materials.',
      'Decision clarity': 'Candidate review, scoring, and reporting details should be tested directly during a Manatal evaluation.',
      'Pilot motion': 'Setup, implementation, commercial terms, and support are separate from HireScoreAI and should be confirmed directly with Manatal.',
    },
    faqs: [
      ['Is HireScoreAI the same as Manatal?', 'No. HireScoreAI and Manatal are separate recruiting platforms with different product focus.'],
      ['Does HireScoreAI include an AI Interviewer like some broader suites may promote?', 'HireScoreAI does not currently claim AI Interviewer parity. It focuses on JD-based resume screening, candidate ranking, explanations, and connected hiring workflow.'],
      ['When should teams compare HireScoreAI and Manatal?', 'Teams should compare them when deciding between a focused explainable screening workflow and a broader recruiting suite.'],
    ],
  },
  '/compare/hirescoreai-vs-workable': {
    competitorName: 'Workable',
    eyebrow: 'Platform comparison',
    h1: 'HireScoreAI vs Workable',
    intro: 'Compare HireScoreAI with Workable for AI screening, candidate evaluation, pricing clarity, and hiring workflow fit for growing teams.',
    disclosure: 'Workable is commonly evaluated as a broader ATS and sourcing platform. HireScoreAI focuses on explainable applicant screening and ranking. HireScoreAI does not claim a passive candidate sourcing database.',
    tableTitle: 'How HireScoreAI and Workable differ',
    tableIntro: 'This comparison keeps the focus on product positioning and evaluation criteria, while avoiding unsupported claims about current Workable features.',
    clarification: 'HireScoreAI and Workable are separate products. Workable may suit teams looking for a broader ATS or sourcing workflow, while HireScoreAI focuses on screening and shortlist evidence.',
    competitorNotes: {
      'Primary fit': 'Workable is generally evaluated as a broader ATS and recruiting platform. Buyers should review current Workable materials for sourcing, ATS, and automation scope.',
      'Best suited for': 'Teams evaluating Workable may need broader applicant tracking, collaboration, or sourcing workflows. Fit should be confirmed against current requirements.',
      'Screening approach': 'Candidate evaluation and automation details should be verified directly from current Workable product materials.',
      'Decision clarity': 'Shortlist evidence, review workflows, and reporting should be assessed directly during a Workable evaluation.',
      'Pilot motion': 'Pricing, setup, implementation, and support are separate from HireScoreAI and should be confirmed directly with Workable.',
    },
    faqs: [
      ['Is HireScoreAI the same as Workable?', 'No. HireScoreAI and Workable are separate recruiting products with different positioning.'],
      ['Does HireScoreAI include a passive candidate sourcing database?', 'No. HireScoreAI does not claim a passive candidate sourcing database. It focuses on applicant resume screening, ranking, explanations, and workflow movement.'],
      ['When should teams compare HireScoreAI and Workable?', 'Teams should compare them when choosing between focused explainable applicant screening and a broader ATS or sourcing platform.'],
    ],
  },
  '/compare/hirescoreai-vs-greenhouse': {
    competitorName: 'Greenhouse',
    eyebrow: 'Platform comparison',
    h1: 'HireScoreAI vs Greenhouse',
    intro: 'Compare HireScoreAI with Greenhouse on AI screening, setup effort, pricing clarity, and fit for recruitment teams, startups, staffing firms, and HR teams.',
    disclosure: 'Greenhouse is a mature ATS often evaluated by larger or process-heavy recruiting teams. HireScoreAI is lighter and focused on explainable screening for smaller teams, agencies, and high-volume resume review. HireScoreAI is not positioned as a full enterprise Greenhouse replacement.',
    tableTitle: 'How HireScoreAI and Greenhouse differ',
    tableIntro: "This comparison is intentionally high-level and should be validated against current Greenhouse materials and each team's hiring workflow.",
    clarification: 'HireScoreAI and Greenhouse are separate products. Greenhouse may suit teams needing mature ATS process depth, while HireScoreAI focuses on explainable resume screening and ranking.',
    competitorNotes: {
      'Primary fit': 'Greenhouse is a mature ATS and hiring platform. Buyers should review current Greenhouse materials for structured hiring, collaboration, integrations, and reporting scope.',
      'Best suited for': 'Teams evaluating Greenhouse may need a broader, mature ATS process across departments and hiring stakeholders.',
      'Screening approach': 'Greenhouse screening and AI capabilities should be verified from current Greenhouse product materials and demos.',
      'Decision clarity': 'Structured hiring, interview plans, scorecards, and reporting should be assessed directly during a Greenhouse evaluation.',
      'Pilot motion': 'Implementation, pricing, workflow configuration, and support are separate from HireScoreAI and should be confirmed directly with Greenhouse.',
    },
    faqs: [
      ['Is HireScoreAI a full Greenhouse replacement?', 'No. HireScoreAI should not be positioned as a full enterprise Greenhouse replacement. It focuses on explainable resume screening, candidate ranking, and connected shortlist workflows.'],
      ['Is Greenhouse better for enterprise ATS needs?', 'Greenhouse is commonly evaluated as a mature ATS. Teams with enterprise ATS needs should compare current Greenhouse capabilities directly against their requirements.'],
      ['When should teams compare HireScoreAI and Greenhouse?', 'Teams should compare them when deciding between a focused screening and ranking workflow and a broader mature ATS implementation.'],
    ],
  },
}

const comparisonPages = comparisonRoutes.map((route) => {
  const content = comparisonPageContent[route.path]
  return {
    ...route,
    ...content,
    rows: platformComparisonRows.map((row) => ({
      label: row.label,
      hirescoreAi: row.hirescoreAi,
      competitor: content.competitorNotes[row.label],
    })),
  }
})

function comparisonDetailCards(page) {
  return [
    {
      kicker: 'HireScoreAI advantage',
      title: 'Focused AI screening without heavy ATS complexity',
      text: 'HireScoreAI is built around JD-based resume scoring, candidate ranking, and recruiter-friendly explanations, so teams can move from resume batches to stronger shortlists faster.',
      points: ['Explainable scores', 'Skill match and gap context', 'Shortlist-ready review notes'],
    },
    {
      kicker: `${page.competitorName} fit`,
      title: `Where ${page.competitorName} may make sense`,
      text: page.rows.find((row) => row.label === 'Primary fit')?.competitor || page.clarification,
      points: ['Verify current product scope', 'Check implementation needs', 'Confirm pricing and support directly'],
    },
    {
      kicker: 'Decision guide',
      title: 'Best fit for lean recruiting teams',
      text: `Choose HireScoreAI when your priority is faster, explainable resume screening. Compare ${page.competitorName} directly if you need a broader suite or enterprise workflow depth.`,
      points: ['Recruiter-controlled AI', 'Pilot-friendly setup', 'Focused screening workflow'],
    },
  ]
}

function SolutionsPage() {
  return (
    <>
      <SEO path="/solutions" />
      <section className="solutionPage-hero">
        <div className="container solutionPage-heroGrid">
          <div className="solutionPage-heroCopy">
            <span className="solutionPage-eyebrow"><Sparkles size={14} />AI HIRING SOLUTIONS</span>
            <h1>AI Hiring Solutions for Every Recruiting Team</h1>
            <p>Whether you manage high-volume resumes, client hiring, internal roles, or startup recruitment, HireScoreAI helps you screen candidates faster, rank them by job fit, and move the right talent forward with confidence.</p>
            <div className="buttonRow solutionPage-actions">
              <a className="btn btnPrimary btnLarge" href={PILOT_MAILTO}>Start Free Pilot <ArrowRight size={18} /></a>
              <Link className="btn btnGhost btnLarge" href="/contact">Book Demo</Link>
            </div>
            <div className="solutionPage-supportLine"><CheckCircle2 size={16} />Built for resume screening, JD matching, candidate ranking, shortlisting, outreach, and interview workflow.</div>
          </div>
          <div className="solutionPage-visual" aria-label="HireScoreAI solution areas">
            <div className="solutionPage-visualTop"><span><i />LIVE SOLUTION MAP</span><small>5 hiring motions</small></div>
            <div className="solutionPage-orbit">
              {solutionHeroCards.map(([label, Icon], index) => (
                <article key={label} className={`solutionPage-floatingCard card${index + 1}`}>
                  <Icon size={20} />
                  <span>{label}</span>
                </article>
              ))}
              <div className="solutionPage-core">
                <img src="/hirescore-logo-mark.png" alt="" />
                <strong>HireScoreAI</strong>
                <small>Ranked shortlist engine</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-painSection">
        <div className="container">
          <div className="solutionPage-sectionHeader">
            <span>HIRING BOTTLENECKS</span>
            <h2>Hiring teams don't need more resumes. They need the right shortlist.</h2>
            <p>Manual resume screening slows down hiring, creates inconsistent decisions, and makes it hard to explain why one candidate is better than another. HireScoreAI brings structure, speed, and explainability to the hiring process.</p>
          </div>
          <div className="solutionPage-painGrid">
            {solutionPainPoints.map(([title, text, Icon], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ActionAiAgentSection surface="solutions" />

      <section className="solutionPage-section solutionPage-solutionCardsSection">
        <div className="container">
          <div className="solutionPage-splitHeader">
            <div>
              <span>BUYER USE CASES</span>
              <h2>Solutions built for different hiring needs</h2>
            </div>
            <p>Choose the hiring workflow that matches your team, role volume, and recruitment process.</p>
          </div>
          <div className="solutionPage-cardGrid">
            {solutionCards.map(({ title, subtitle, text, bestFor, cta, slug, icon: Icon }, index) => (
              <article key={title} className="solutionPage-solutionCard">
                <div className="solutionPage-cardTop">
                  <span><Icon size={22} /></span>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </div>
                <h3>{title}</h3>
                <strong>{subtitle}</strong>
                <p>{text}</p>
                <div className="solutionPage-bestFor">
                  <small>Best for</small>
                  {bestFor.map((item) => <em key={item}><CheckCircle2 size={13} />{item}</em>)}
                </div>
                <Link href={slug || '#final-cta'} className="solutionPage-cardLink">{cta}<ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-stepsSection">
        <div className="container solutionPage-stepsLayout">
          <div className="solutionPage-stickyCopy">
            <span>DECISION FLOW</span>
            <h2>From resumes to confident hiring decisions</h2>
            <p>HireScoreAI keeps every step connected so recruiters can move from job criteria to ranked, explainable shortlists without losing context.</p>
          </div>
          <div className="solutionPage-stepGrid">
            {solutionSteps.map(([title, text, Icon], index) => (
              <article key={title}>
                <div><Icon size={22} /><span>Step {index + 1}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-compareSection">
        <div className="container">
          <div className="solutionPage-sectionHeader">
            <span>BEFORE VS AFTER</span>
            <h2>Replace manual screening with AI-assisted hiring workflow</h2>
          </div>
          <div className="solutionPage-compareTable" role="table" aria-label="Manual hiring compared with HireScoreAI">
            <div className="solutionPage-compareHead" role="row">
              <span role="columnheader">Hiring Task</span>
              <span role="columnheader">Without HireScoreAI</span>
              <span role="columnheader">With HireScoreAI</span>
            </div>
            {comparisonRows.map(([task, without, withAi]) => (
              <div className="solutionPage-compareRow" role="row" key={task}>
                <strong role="cell">{task}</strong>
                <span role="cell">{without}</span>
                <span role="cell">{withAi}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-platformSection">
        <div className="container">
          <div className="solutionPage-splitHeader">
            <div>
              <span>PLATFORM COMPARISON</span>
              <h2>How HireScoreAI fits beside common hiring platforms</h2>
            </div>
            <p>This is a high-level positioning view based on public product messaging. HireScoreAI is independent and is not affiliated with HireScore, Greenhouse, Workday, or HiredScore.</p>
          </div>
          <div className="solutionPage-comparisonLoop" aria-label="Featured HireScoreAI comparisons">
            {[...featuredComparisonCards, ...featuredComparisonCards].map((comparison, index) => (
              <Link href={comparison.href} className="solutionPage-comparisonCard" key={`${comparison.title}-${index}`}>
                <span className="solutionPage-comparisonCardKicker">Compare</span>
                <strong>{comparison.title}</strong>
                <p>{comparison.text}</p>
                <ul>
                  {comparison.points.map((point) => <li key={point}><CheckCircle2 size={14} />{point}</li>)}
                </ul>
                <span className="solutionPage-comparisonCardLink">Open detailed comparison <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
          <div className="inlineLinks">
            {featuredComparisonCards.map((comparison) => (
              <Link href={comparison.href} key={comparison.href}>{comparison.title} <ArrowRight size={15} /></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-featureSection">
        <div className="container">
          <div className="solutionPage-splitHeader">
            <div>
              <span>PLATFORM MAPPING</span>
              <h2>One platform. Multiple hiring solutions.</h2>
            </div>
            <p>Each solution is powered by connected modules that help recruiters screen, rank, explain, communicate, and schedule from one workspace.</p>
          </div>
          <div className="solutionPage-featureGrid">
            {solutionFeatures.map(([title, text, Icon]) => (
              <article key={title}>
                <Icon size={21} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-roleSection">
        <div className="container solutionPage-roleLayout">
          <div>
            <span>SOLUTION COVERAGE</span>
            <h2>Support the full hiring workflow, not just one role</h2>
            <p>HireScoreAI is built for different recruiting motions, from first job intake to bulk screening, shortlist evidence, candidate outreach, interview movement, and pipeline visibility.</p>
          </div>
          <div className="solutionPage-roleGrid">
            {solutionWorkflowCoverage.map(([title, text, Icon]) => (
              <article key={title}>
                <Icon size={17} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-finalCta" id="final-cta">
        <div className="container solutionPage-finalCtaBox">
          <span>START THE PILOT</span>
          <h2>Ready to turn resumes into ranked shortlists?</h2>
          <p>Start your free pilot and see how HireScoreAI can help your team screen candidates, explain hiring decisions, and move faster from application to interview.</p>
          <div className="buttonRow solutionPage-actions">
            <a className="btn btnPrimary btnLarge" href={PILOT_MAILTO}>Start Free Pilot <ArrowRight size={18} /></a>
            <Link className="btn btnGhost btnLarge" href="/contact">Book Demo</Link>
          </div>
          <small>No heavy setup required. Create a job, upload resumes, and review AI-ranked candidates.</small>
        </div>
      </section>
    </>
  )
}

function SolutionSegmentPage({ segment }) {
  const Icon = segment.card?.icon || BriefcaseBusiness
  const proofStats = segment.proofStats || [
    ['1', 'Connected hiring workspace'],
    ['JD', 'Role-fit screening logic'],
    ['AI', 'Explainable shortlist support'],
  ]
  const painPoints = segment.painPoints || segment.outcomes.map((item) => [item, 'Turn this hiring bottleneck into a clearer, faster review step with JD-based scoring and recruiter-readable evidence.'])
  const capabilities = segment.capabilities || segment.card.bestFor.map((item) => [item, 'Use HireScoreAI to keep this workflow organized, explainable, and easier for recruiters to act on.'])
  const visualRows = [
    ['Role intake', segment.workflow[0] || 'Create the job and define the hiring requirement', PenLine],
    ['Resume intelligence', segment.workflow[1] || 'Upload resumes and collect candidate profiles', FileSearch],
    ['Ranked shortlist', segment.workflow[2] || 'Review AI-ranked candidates with fit evidence', Trophy],
    ['Next action', segment.workflow[3] || 'Move qualified candidates forward with context', Send],
  ]

  return (
    <>
      <SEO path={segment.path} />
      <Breadcrumbs items={[['/solutions', 'Solutions'], [segment.path, segment.navLabel]]} />

      <section className="solutionDetailHero">
        <div className="container solutionDetailHeroGrid">
          <div className="solutionDetailHeroCopy">
            <span className="solutionDetailEyebrow"><Icon size={15} />{segment.eyebrow}</span>
            <h1>
              {segment.h1}
              {' '}<span>{segment.card.subtitle}</span>
            </h1>
            <p>{segment.intro}</p>
            <div className="solutionDetailTrustRow" aria-label={`${segment.navLabel} key use cases`}>
              {segment.card.bestFor.slice(0, 3).map((item) => (
                <span key={item}><CheckCircle2 size={15} />{item}</span>
              ))}
            </div>
            <div className="buttonRow solutionDetailActions">
              <a className="btn btnPrimary btnLarge" href={PILOT_MAILTO}>Start Free Pilot <ArrowRight size={18} /></a>
              <Link className="btn btnGhost btnLarge" href="/contact">Book a Demo</Link>
            </div>
          </div>

          <aside className="solutionDetailVisual" aria-label={`${segment.navLabel} screening workflow preview`}>
            <div className="solutionDetailVisualTop">
              <div>
                <span>HireScoreAI workspace</span>
                <strong>{segment.navLabel}</strong>
              </div>
              <Icon size={24} />
            </div>
            <div className="solutionDetailScoreCard">
              <small>Screening focus</small>
              <strong>{segment.problemTitle}</strong>
              <p>{segment.primaryNeed}</p>
            </div>
            <div className="solutionDetailVisualRows">
              {visualRows.map(([label, text, RowIcon]) => (
                <div key={label}>
                  <span><RowIcon size={17} /></span>
                  <div>
                    <strong>{label}</strong>
                    <small>{text}</small>
                  </div>
                </div>
              ))}
            </div>
            <div className="solutionDetailStats" aria-label={`${segment.navLabel} highlights`}>
              {proofStats.map(([value, label]) => <span key={label}><strong>{value}</strong><small>{label}</small></span>)}
            </div>
          </aside>
        </div>
      </section>

      <section className="solutionDetailSection solutionDetailProblemSection">
        <div className="container solutionDetailIntroGrid">
          <div>
            <span className="solutionDetailLabel">Hiring bottlenecks</span>
            <h2>{segment.problemTitle || `Built for ${segment.navLabel.toLowerCase()} that need faster shortlist decisions`}</h2>
            <p>{segment.card.text}</p>
          </div>
          <div className="solutionDetailPainGrid">
            {painPoints.slice(0, 3).map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionDetailSection solutionDetailCapabilitiesSection">
        <div className="container">
          <div className="solutionDetailSectionHeader">
            <span>Why HireScoreAI</span>
            <h2>A cleaner way to move from resume volume to qualified shortlists</h2>
            <p>HireScoreAI focuses on JD-based screening, candidate ranking, and explanation notes so recruiters can review faster while keeping human judgment in control.</p>
          </div>
          <div className="solutionDetailCapabilityGrid">
            {capabilities.slice(0, 4).map(([title, text], index) => (
              <article key={title}>
                <div><BadgeCheck size={20} /><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionDetailSection">
        <div className="container">
          <div className="solutionDetailSectionHeader">
            <span>Workflow</span>
            <h2>From job requirement to recruiter-ready shortlist</h2>
            <p>Each page follows the same practical workflow: define the role, bring resumes in, review ranked evidence, and move the right profiles forward.</p>
          </div>
          <div className="solutionDetailWorkflow">
            {segment.workflow.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Workflow size={24} />
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AgentDetailBand
        title={`Use the Action AI Agent for ${segment.navLabel}`}
        text={`Describe the outcome you need and let the agent work across the connected HireScoreAI features relevant to ${segment.navLabel.toLowerCase()}. These are example requests, not a fixed command list.`}
        prompts={[
          'Set up the next job and prepare its public apply workflow.',
          'Show which applicants best match the role and explain their strongest skills.',
          'Prepare the qualified shortlist and next candidate actions for my review.',
        ]}
      />

      <section className="solutionDetailSection solutionDetailOutcomesSection">
        <div className="container solutionDetailOutcomeGrid">
          <div>
            <span className="solutionDetailLabel">Recruiting outcomes</span>
            <h2>What improves when screening becomes structured</h2>
            <p>Use HireScoreAI to reduce repetitive resume review, make shortlist reasoning easier to explain, and keep candidate movement tied to the original job requirement.</p>
          </div>
          <div className="solutionDetailOutcomeList">
            {segment.outcomes.map((item) => (
              <div key={item}><CheckCircle2 size={18} />{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionDetailSection">
        <div className="container narrow">
          <SectionHeader eyebrow="FAQs" title={`${segment.navLabel} FAQs`} text="Clear answers for teams evaluating HireScoreAI for this hiring motion." />
          <div className="faqList">
            {segment.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="solutionDetailSection compact">
        <div className="container narrow">
          <SectionHeader eyebrow="Related workflows" title="Explore connected HireScoreAI modules" />
          <div className="inlineLinks">
            <Link href="/solutions">All solutions</Link>
            {segment.relatedLinks.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
            {!segment.relatedLinks.some(([href]) => href.startsWith('/resources/')) && (
              <Link href={solutionResourceLink(segment.path)}>Relevant recruiting guide</Link>
            )}
            <Link href="/pricing">Pricing and pilot options</Link>
            <Link href="/contact">Contact sales</Link>
          </div>
        </div>
      </section>

      <CTASection
        title={`Start a free pilot for ${segment.navLabel}`}
        text="Create a job, upload resumes, review ranked candidates, and see whether HireScoreAI fits your hiring workflow."
      />
    </>
  )
}

function solutionResourceLink(path) {
  if (path === '/solutions/recruitment-agencies') return '/resources/user-guide/review-ai-ranked-candidates'
  if (path === '/solutions/staffing-companies') return '/resources/user-guide/move-to-communication'
  if (path === '/solutions/hr-teams') return '/resources/user-guide/schedule-interviews'
  if (path === '/solutions/startups') return '/resources/blogs/how-to-create-a-public-job-apply-page-for-faster-hiring'
  if (path === '/solutions/bulk-resume-screening') return '/resources/user-guide/upload-resumes'
  return '/resources/user-guide/run-ai-screening-test'
}

function CompareHubPage() {
  useEffect(() => {
    navigateTo('/compare/hirescoreai-vs-hiredscore/')
  }, [])

  return null
}

function ComparisonPage({ page }) {
  return (
    <>
      <SEO path={page.path} />
      <Breadcrumbs items={[[page.path, page.navLabel]]} />
      <PageHero eyebrow={page.eyebrow} title={page.h1} intro={page.intro} />

      <section className="section">
        <div className="container splitGrid">
          <div className="sectionHeader">
            <span>Quick answer</span>
            <h2>HireScoreAI is independent</h2>
            <p>{page.disclosure}</p>
          </div>
          <article className="infoCard">
            <ShieldCheck size={26} />
            <h2>Important clarification</h2>
            <p>{page.clarification}</p>
          </article>
        </div>
      </section>

      <section className="solutionPage-section solutionPage-platformSection">
        <div className="container">
          <div className="solutionPage-splitHeader">
            <div>
              <span>DETAILED COMPARISON</span>
              <h2>{page.tableTitle}</h2>
            </div>
            <p>{page.tableIntro}</p>
          </div>
          <div className="solutionPage-comparisonCards" aria-label={`HireScoreAI compared with ${page.competitorName}`}>
            {comparisonDetailCards(page).map((card) => (
              <article className="solutionPage-comparisonCard" key={card.title}>
                <span className="solutionPage-comparisonCardKicker">{card.kicker}</span>
                <strong>{card.title}</strong>
                <p>{card.text}</p>
                <ul>
                  {card.points.map((point) => <li key={point}><CheckCircle2 size={14} />{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHeader eyebrow="FAQs" title={`HireScoreAI and ${page.competitorName} FAQs`} />
          <div className="faqList">
            {page.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHeader eyebrow="Related pages" title="Explore HireScoreAI workflows" />
          <div className="inlineLinks">
            <Link href="/solutions">Solutions</Link>
            <Link href="/product/ai-resume-parsing">AI resume screening</Link>
            <Link href="/product/ai-candidate-ranking">Candidate ranking</Link>
            <Link href="/contact">Contact HireScoreAI</Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Evaluate HireScoreAI for your hiring workflow"
        text="Create a job, upload resumes, and review AI-ranked candidates during a focused pilot."
      />
    </>
  )
}

function SimplePage({ type }) {
  const config = {
    '/resources/faqs': ['FAQs', 'Frequently asked questions about HireScoreAI', 'Find answers about AI resume screening, candidate ranking, free pilots, and hiring workflow automation.'],
    '/resources/release-notes': ['Release Notes', 'HireScoreAI release notes', 'Product updates for AI resume screening, candidate ranking, apply pages, and hiring workflow improvements.'],
    '/privacy': ['Privacy Policy', 'HireScoreAI privacy policy', 'This placeholder privacy page can be updated with your final legal policy before launch.'],
    '/terms': ['Terms', 'HireScoreAI terms', 'This placeholder terms page can be updated with your final legal terms before launch.'],
  }[type]
  return (
    <>
      <SEO path={type} />
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
    <footer className="commandFooter professionalFooter">
      <div className="commandContainer professionalFooterTop">
        <div className="footerBrandBlock">
          <Link className="homeFullLogo footerLogo" href="/" aria-label="HireScoreAI home">
            <img src="/hirescore-logo-white.png" alt="HireScoreAI" />
          </Link>
          <p>AI resume screening, JD matching, candidate ranking, and hiring workflow automation for modern recruiting teams.</p>
          <a className="footerMail" href={PILOT_MAILTO}><MailCheck size={16} />Free access: {CONTACT_EMAIL}</a>
          <div className="footerDots">
            <a href={OFFICIAL_SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="HireScoreAI on YouTube"><Youtube size={14} /></a>
            <a href={OFFICIAL_SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="HireScoreAI on LinkedIn"><Linkedin size={14} /></a>
            <a href={OFFICIAL_SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="HireScoreAI on Instagram"><Instagram size={14} /></a>
          </div>
        </div>
        <div className="professionalFooterLinks">
          <div>
            <h3>Product</h3>
            <Link href="/product/hirescore-ai">HireScoreAI</Link>
            <Link href="/product/jd-manager">JD Manager</Link>
            <Link href="/product/ai-resume-parsing">AI Resume Screening</Link>
            <Link href="/product/ai-candidate-ranking">Candidate Ranking</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div>
            <h3>Solutions</h3>
            <Link href="/solutions">Recruiting Teams</Link>
            <a href="/#about">About Us</a>
            <Link href="/contact">Contact Us</Link>
            <a href={PILOT_MAILTO}>Request Free Access</a>
          </div>
          <div>
            <h3>Resources</h3>
            <Link href="/resources">Resource Center</Link>
            <Link href="/resources/user-guide">User Guide</Link>
            <Link href="/resources/blogs">Blogs</Link>
            <Link href="/resources/case-studies">Case Studies</Link>
            <Link href="/resources/faqs">FAQs</Link>
          </div>
        </div>
      </div>
      <div className="commandContainer commandFooterBottom">
        <span>© 2026 HireScoreAI Technologies. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Security</a>
        </div>
      </div>
    </footer>
  )
}

function LegacyFooter({ isHome = false }) {
  if (isHome) return <footer className="commandFooter"><div className="commandContainer commandFooterGrid"><div><Link className="homeFullLogo footerLogo" href="/" aria-label="HireScoreAI home"><img src="/hirescore-logo-white.png" alt="HireScoreAI" /></Link><p>The enterprise-grade HireScoreAI operating system built for the next era of human potential.</p><div className="footerDots"><span>●</span><span>●</span></div></div><div><h3>Company</h3><a href="#about">About Us</a><a href="#product">Product</a><a href="#intelligence">Resources</a><Link href="/pricing">Pricing</Link><Link href="/contact">Contact Us</Link></div><div><h3>Newsletter</h3><label><span className="srOnly">Email address</span><input type="email" aria-label="Email address" /></label><button>Join HireScoreAI Insights</button></div></div><div className="commandContainer commandFooterBottom"><span>© 2026 HireScoreAI Technologies</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Legal Intelligence</Link><a href="mailto:info@hirescoreai.com">Security Policy</a></div></div></footer>
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div>
          <Logo />
          <p>HireScoreAI is an independent AI recruitment workflow platform for recruiters and hiring teams.</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={APP_URL}>App login</a>
          <div className="socialLinks" aria-label="Social links">
            <a href={OFFICIAL_SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="HireScoreAI on YouTube"><Youtube size={17} />YouTube</a>
            <a href={OFFICIAL_SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="HireScoreAI on LinkedIn"><Linkedin size={17} />LinkedIn</a>
            <a href={OFFICIAL_SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="HireScoreAI on Instagram"><Instagram size={17} />Instagram</a>
          </div>
        </div>
        <FooterCol title="Product" links={productPages.slice(0, 8).map((p) => [p.slug, p.navLabel])} />
        <FooterCol title="Resources" links={[['/resources/user-guide', 'User Guide'], ['/resources/blogs', 'Blogs'], ['/resources/case-studies', 'Case Studies'], ['/resources/faqs', 'FAQs']]} />
        <FooterCol title="Company" links={[['/pricing', 'Pricing'], ['/contact', 'Contact'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms']]} />
      </div>
      <div className="container footerBottom">Copyright 2026 HireScoreAI. All rights reserved.</div>
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
      <SEO title="Page Not Found | HireScoreAI" description="The requested HireScoreAI page could not be found." path={window.location.pathname} />
      <PageHero eyebrow="404" title="Page not found" intro="This page does not exist yet. Use the navigation to explore HireScoreAI." />
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
  if (path === '/product') return <RedirectPage to="/product/hirescore-ai" />
  if (path === '/product/hirescore-ai') return <ProductOverview />
  if (path === '/product/jd-manager') return <JDManagerPage />
  if (path === '/solutions') return <SolutionsPage />
  const solutionSegment = solutionSegmentPages.find((page) => page.path === path)
  if (solutionSegment) return <SolutionSegmentPage segment={solutionSegment} />
  if (path === '/compare') return <CompareHubPage />
  const comparisonPage = comparisonPages.find((page) => page.path === path)
  if (comparisonPage) return <ComparisonPage page={comparisonPage} />
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
  const isHome = path === '/'
  const isProductOverview = path === '/product' || path === '/product/hirescore-ai' || path === '/product/jd-manager'
  const isJdManager = path === '/product/jd-manager'
  return (
    <div className={`app ${isHome ? 'stitchHome' : 'commandInner'} ${isProductOverview ? 'productView' : ''} ${isJdManager ? 'jdManagerView' : ''}`}>
      <Header isHome={isHome} />
      <main>{renderRoute(path)}</main>
      <Footer />
    </div>
  )
}
