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
    meta: 'Discover how AI resume screening helps recruiters reduce manual resume review, organize candidate profiles, match resumes with job descriptions, and shortlist candidates faster.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Resume Screening',
    readTime: '8 min read',
    sections: [
      [
        'Why resume screening takes so much time',
        `Resume screening is one of the most time-consuming parts of hiring. Recruiters often receive a large number of resumes for every open position, especially for roles in technology, sales, operations, analytics, customer support, and entry-level hiring. Each resume may have different formatting, different skill sections, different project descriptions, and different experience details. Manually checking every resume takes hours because recruiters need to identify relevant skills, total experience, education, current role, previous companies, and job fit. When the hiring volume increases, the screening process becomes even slower. This is why recruiters need a smarter way to organize resume data and review candidates faster.`
      ],
      [
        'The problem with manual resume review',
        `Manual resume review depends heavily on recruiter time and attention. When recruiters have to open every resume one by one, compare it with the job description, and prepare a shortlist manually, the process can become inconsistent. A strong candidate may be missed because the resume is not formatted properly. Another candidate may look good because of repeated keywords but may not actually match the job requirements. Spreadsheets also make the process more difficult because candidate information becomes scattered. Recruiters need a workflow where resumes are converted into structured candidate profiles and compared with the job description in a clear way.`
      ],
      [
        'How AI resume screening improves recruiter productivity',
        `AI resume screening helps recruiters reduce repetitive manual work. Instead of reading every resume from the beginning, recruiters can start with structured candidate insights. A good AI resume screening tool can parse candidate resumes, extract important details, identify matched skills, highlight missing skills, estimate experience, and generate a candidate score based on job relevance. This allows recruiters to focus on decision-making instead of data entry. AI does not remove the recruiter from the process. It supports the recruiter by making the first-level screening faster, cleaner, and easier to manage.`
      ],
      [
        'Why JD-based matching is important',
        `A resume should not be judged only by keywords. The most useful screening happens when a candidate profile is compared with the actual job description. JD-based matching checks whether the candidate has skills, experience, and role signals that are relevant to the open position. For example, a backend developer role may require REST APIs, database design, authentication, deployment, and Python or Node.js experience. A keyword-only system may miss the context, but JD-based AI matching can help recruiters understand how closely the candidate fits the role. HireScore AI is designed around this JD-based matching approach.`
      ],
      [
        'How HireScore AI helps recruiters save time',
        `HireScore AI helps recruiters manage the early hiring workflow from job creation to candidate shortlisting. Recruiters can create a job with a job description, generate a public apply page, collect resumes, upload resumes in bulk, parse candidate profiles automatically, match resumes with the job description, rank candidates with AI scores, and view matched and missing skills. This reduces the time recruiters spend on opening resumes manually and comparing candidates one by one. With HireScore AI, recruiters can start their review from the strongest profiles and move faster toward shortlisting.`
      ],
      [
        'Structured candidate profiles make screening easier',
        `One of the biggest advantages of AI resume screening is structured candidate data. Instead of reading unorganized resume files, recruiters can view important candidate information in a clean profile format. This may include name, email, phone, location, skills, education, experience, designation, previous companies, matched skills, missing skills, AI score, and review explanation. When candidate data is structured, recruiters can compare profiles more easily. This also helps hiring teams maintain consistency across multiple jobs and multiple recruiters.`
      ],
      [
        'AI ranking helps recruiters review the best matches first',
        `When many candidates apply for the same job, reviewing them in random order wastes time. AI candidate ranking helps recruiters prioritize candidates based on role fit. HireScore AI ranks candidates using JD-based signals so recruiters can review the most relevant profiles first. This is useful for recruitment agencies, HR teams, startups, and staffing companies that handle bulk resumes. Ranking does not mean the recruiter blindly accepts the top score. It simply helps the recruiter know where to start and which profiles deserve faster attention.`
      ],
      [
        'Explainable screening builds recruiter confidence',
        `Recruiters need more than a number. A score is useful only when the reason behind the score is clear. HireScore AI supports explainable candidate review by showing matched skills, missing skills, and role-fit signals. This helps recruiters understand why a candidate is strong, average, or weak for the job. Explainable screening also helps when recruiters need to discuss candidates with hiring managers. Instead of saying that a candidate “looks good,” recruiters can show evidence based on the job description and candidate profile.`
      ],
      [
        'Final thoughts',
        `AI resume screening is not about replacing recruiters. It is about helping recruiters save time, reduce repetitive work, and make faster hiring decisions with better candidate visibility. Manual screening can slow down hiring, especially when resume volume is high. HireScore AI helps recruiters create jobs, collect applications, parse resumes, match profiles with job descriptions, rank candidates, and shortlist faster. For teams that want to improve speed and consistency in hiring, AI resume screening can become a strong advantage.`
      ],
    ],
    links: ['/product/ai-resume-parsing', '/product/ai-candidate-scoring', '/product/ai-candidate-ranking'],
  },
  {
    slug: '/resources/blogs/what-is-candidate-ranking-and-why-it-matters',
    title: 'What Is Candidate Ranking and Why It Matters in Recruitment',
    meta: 'Learn what candidate ranking means, why it matters for recruiters, and how AI candidate ranking tools help improve shortlist quality and hiring speed.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'Candidate Ranking',
    readTime: '8 min read',
    sections: [
      [
        'What is candidate ranking?',
        `Candidate ranking is the process of sorting applicants based on how well they match a specific job role. Instead of reviewing resumes in the order they were uploaded or received, recruiters can review candidates based on role fit. A ranked list helps recruiters identify which profiles deserve attention first. In traditional hiring, ranking is often done manually through resume reading and spreadsheet comparison. With AI candidate ranking, this process becomes more structured because candidate profiles can be compared with the job description, required skills, experience expectations, and hiring criteria.`
      ],
      [
        'Why recruiters need candidate ranking',
        `Recruiters often manage multiple jobs at the same time. Each job may receive many resumes from different sources such as job portals, referrals, public apply pages, emails, agencies, and internal databases. Without ranking, recruiters have to manually decide which resume to open first. This creates delays and makes the process difficult to scale. Candidate ranking gives recruiters a practical starting point. Instead of spending equal time on every profile, recruiters can focus first on candidates who show stronger evidence of job fit.`
      ],
      [
        'The limitation of manual candidate comparison',
        `Manual candidate comparison is difficult because resumes are not standardized. One candidate may write skills clearly, another may mention skills inside project descriptions, and another may hide relevant experience inside long paragraphs. Recruiters have to search for evidence manually. This takes time and can lead to inconsistent decisions. A candidate with good formatting may look stronger than a candidate with deeper experience but weaker resume structure. AI ranking helps reduce this problem by extracting candidate signals and comparing them with the job description in a more consistent way.`
      ],
      [
        'How AI candidate ranking works',
        `AI candidate ranking usually starts with resume parsing. The system reads the resume and extracts important details such as skills, experience, education, designation, company history, project evidence, and contact details. Then the candidate profile is compared with the job description. The system checks matched skills, missing skills, experience relevance, role similarity, and other hiring signals. Based on this comparison, candidates can be scored and ranked. HireScore AI uses this approach to help recruiters review stronger profiles earlier in the hiring workflow.`
      ],
      [
        'Why ranking should be based on the job description',
        `A candidate cannot be called strong or weak without context. A profile that is excellent for a backend developer role may not be suitable for a data analyst role. This is why ranking must be tied to the job description. JD-based ranking helps recruiters understand how well a candidate fits the actual role. It reduces random shortlisting and avoids over-dependence on generic resume keywords. HireScore AI ranks candidates based on the job they are applying for, which makes the shortlist more relevant to the hiring need.`
      ],
      [
        'Why explainable ranking matters',
        `A candidate ranking tool should not only show numbers. Recruiters need to understand why one candidate is ranked higher than another. Explainable ranking shows the evidence behind the score, such as matched skills, missing skills, experience alignment, and role-related signals. This helps recruiters make better decisions and discuss candidates with hiring managers. HireScore AI focuses on ranking with explanation so recruiters are not forced to trust a black-box score. The goal is to support recruiter judgment, not replace it.`
      ],
      [
        'How ranking improves shortlist quality',
        `Shortlist quality improves when recruiters evaluate candidates against consistent criteria. With AI ranking, recruiters can reduce random decisions and focus on profiles that match the job requirements. Strong candidates can be reviewed faster, while weaker or incomplete profiles can be checked later or kept in review. This improves hiring speed and helps teams avoid missing good candidates. For recruitment agencies, ranking also helps when clients expect quick submissions. A ranked candidate list makes the screening process more organized and professional.`
      ],
      [
        'Where HireScore AI fits in candidate ranking',
        `HireScore AI helps recruiters create jobs, collect resumes, parse candidate profiles, match resumes with job descriptions, rank candidates with AI scores, and review matched and missing skills. Recruiters can use the ranking to start screening from the strongest profiles. They can also open each candidate profile to understand the reason behind the score. This makes HireScore AI useful for teams that want faster screening, better candidate visibility, and more consistent shortlisting decisions.`
      ],
      [
        'Final thoughts',
        `Candidate ranking matters because recruiters need speed, structure, and clarity. Without ranking, hiring teams spend too much time reviewing resumes manually and comparing candidates in spreadsheets. AI candidate ranking helps recruiters prioritize better-fit profiles and move faster without losing control of the decision. HireScore AI combines candidate ranking with resume parsing, JD matching, skill coverage, and explainable scoring to help recruiters build better shortlists in less time.`
      ],
    ],
    links: ['/product/ai-candidate-ranking', '/product/ai-explanation-engine', '/product/ai-shortlisting'],
  },
  {
    slug: '/resources/blogs/how-to-create-a-public-job-apply-page-for-faster-hiring',
    title: 'How to Create a Public Job Apply Page for Faster Hiring',
    meta: 'Learn how public job apply pages help recruiters collect applications, organize candidate intake, and connect resumes directly with AI screening workflows.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    category: 'Public Apply Page',
    readTime: '8 min read',
    sections: [
      [
        'What is a public job apply page?',
        `A public job apply page is a dedicated page where candidates can view job details and submit their application for a specific role. It usually includes the job title, company name, location, work mode, experience requirement, job description, and an application form. For recruiters, a public apply page is useful because it collects candidate information in a structured way. Instead of receiving resumes through emails, messages, or scattered folders, recruiters can direct candidates to one clean link for each job.`
      ],
      [
        'Why public apply pages improve hiring speed',
        `When applications come from different places, recruiters spend extra time organizing resumes. One candidate may send a resume on email, another may apply through a job portal, and another may share a file through chat. This creates confusion and makes tracking difficult. Public apply pages improve hiring speed because every candidate applies through the same role-specific flow. Recruiters can quickly see which candidate applied for which job and manage the screening process from one place.`
      ],
      [
        'What a good apply page should include',
        `A good apply page should clearly explain the role. It should include the job title, location, job type, work mode, salary range if available, experience requirement, responsibilities, required skills, and application instructions. The application form should be simple and focused. Candidates should be able to enter basic details and upload their resume without confusion. A clean apply page improves candidate experience and helps recruiters receive better-quality applications. HireScore AI supports this kind of structured application workflow.`
      ],
      [
        'How apply pages reduce manual candidate intake',
        `Manual candidate intake can become messy when recruiters handle many roles at the same time. Without a structured apply page, recruiters may need to download resumes, rename files, enter candidate details into spreadsheets, and remember which job each candidate applied for. Public apply pages reduce this manual work. Candidate details and resumes can be collected under the correct job pipeline. This makes it easier to start resume parsing, AI screening, and candidate ranking without extra data cleaning.`
      ],
      [
        'Connecting apply pages with AI resume screening',
        `A public apply page becomes more powerful when it is connected with AI resume screening. After a candidate applies, the system can parse the resume, extract candidate details, compare the profile with the job description, and generate an AI score. This helps recruiters move from application collection to candidate review faster. HireScore AI connects job creation, public apply pages, resume upload, AI parsing, JD-based matching, and candidate ranking into one early hiring workflow.`
      ],
      [
        'Why role-wise candidate tracking matters',
        `Recruiters often hire for multiple roles at once. If applications are not tracked properly, candidates can easily get mixed across jobs. A frontend developer resume may appear inside a backend role folder, or a sales candidate may be stored in a general spreadsheet without job context. Role-wise tracking prevents this confusion. HireScore AI helps keep candidate applications connected with the correct job, so recruiters can review candidates in the right hiring pipeline and avoid unnecessary mistakes.`
      ],
      [
        'How public apply pages help recruitment agencies',
        `Recruitment agencies need speed and organization because they usually work on multiple client requirements. Public apply pages help agencies collect resumes for specific roles and manage candidate intake more professionally. Instead of asking candidates to send resumes manually, agencies can share a job apply link. Once applications are collected, AI screening can help identify stronger matches. This makes the agency workflow faster and improves the quality of candidate submissions to clients.`
      ],
      [
        'How HireScore AI supports public apply pages',
        `HireScore AI helps recruiters create a job with a job description and use that job as the base for candidate collection and screening. The platform supports the idea of a complete workflow where candidates apply, resumes are parsed, profiles are matched with the JD, and candidates are ranked based on fit. This reduces the gap between application collection and screening. Recruiters can spend less time organizing files and more time reviewing the right candidates.`
      ],
      [
        'Final thoughts',
        `A public job apply page is not just a form. It is the starting point of a cleaner hiring workflow. When applications are collected properly, resume screening becomes easier, candidate tracking improves, and recruiters can shortlist faster. HireScore AI helps recruiters connect job creation, public apply pages, resume parsing, JD matching, and AI candidate ranking in one organized process. For teams that want faster hiring, public apply pages are an important first step.`
      ],
    ],
    links: ['/product/public-apply-page', '/product/create-job', '/resources/user-guide/share-public-apply-link'],
  },
  {
    slug: '/resources/blogs/ai-in-recruitment-benefits-risks-and-best-practices',
    title: 'AI in Recruitment: Benefits, Risks, and Best Practices',
    meta: 'Explore the benefits, risks, and best practices of using AI in recruitment, including resume screening, candidate ranking, explainable scoring, and human review.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Recruitment',
    readTime: '9 min read',
    sections: [
      [
        'How AI is changing recruitment',
        `AI is changing recruitment by helping hiring teams reduce repetitive work and make candidate review more structured. Recruiters can use AI for resume parsing, candidate scoring, skill matching, candidate ranking, interview workflow support, and hiring analytics. The goal is not to remove recruiters from the hiring process. The goal is to help recruiters work faster and make better-informed decisions. When used correctly, AI recruitment software can improve speed, consistency, and visibility across the early hiring workflow.`
      ],
      [
        'Benefits of AI in recruitment',
        `The biggest benefit of AI in recruitment is time saving. Recruiters no longer need to manually read every resume from the beginning. AI tools can extract candidate information, highlight relevant skills, identify missing skills, and organize profiles under the correct job. This helps recruiters handle more applications without losing structure. AI can also improve consistency because candidates are compared against similar job criteria. HireScore AI helps recruiters use these benefits through resume parsing, JD-based matching, candidate ranking, and explainable scoring.`
      ],
      [
        'Why AI resume screening is useful',
        `AI resume screening is useful because resumes are difficult to compare manually. Every resume has a different format, different language, and different way of presenting skills. AI can convert unstructured resumes into structured candidate profiles. Recruiters can then review skills, experience, education, designation, matched skills, missing skills, and role relevance more easily. HireScore AI uses AI screening to help recruiters move from raw resume files to actionable candidate insights. This improves screening speed and reduces manual workload.`
      ],
      [
        'The risks of using AI in hiring',
        `AI in recruitment also has risks. Recruiters should avoid blindly trusting AI scores without reviewing candidate context. A candidate may have relevant experience that is written in an unusual way. Another candidate may have many keywords but weaker actual fit. AI tools can also make mistakes if the job description is unclear or if resume data is incomplete. This is why AI should be used as a decision-support system, not as the final decision-maker. Human review should always remain part of the hiring process.`
      ],
      [
        'Why explainable AI matters',
        `Explainable AI is important because recruiters need to understand how a score was created. A simple number is not enough for hiring decisions. Recruiters need to see matched skills, missing skills, experience relevance, and role-fit signals. Explainable scoring helps recruiters trust the process while still applying their own judgment. HireScore AI focuses on recruiter-friendly explanations so teams can understand why a candidate is recommended, shortlisted, or kept for review. This is especially useful when recruiters need to justify recommendations to hiring managers.`
      ],
      [
        'Best practices for using AI recruitment software',
        `Recruiters should follow practical best practices when using AI in hiring. First, create a clear job description with required skills and experience expectations. Second, review AI scores along with candidate explanations. Third, do not reject candidates only because of one missing skill. Fourth, use AI ranking as a priority guide, not as a final decision. Fifth, keep human review in the workflow. These practices help recruiters get speed from AI while maintaining quality and fairness in hiring decisions.`
      ],
      [
        'How HireScore AI balances speed and review',
        `HireScore AI is designed to support recruiters without removing their control. The platform helps create jobs, collect resumes, parse candidate profiles, match resumes with job descriptions, rank candidates, and show skill coverage. Recruiters can review the strongest candidates first, but they can still inspect the profile and explanation before making a decision. This balance is important because hiring decisions require context, communication, and judgment. AI should make the work easier, not blindly automate everything.`
      ],
      [
        'Who should use AI recruitment tools',
        `AI recruitment tools are useful for recruitment agencies, HR teams, staffing companies, startups, and businesses that receive many resumes. They are especially helpful when teams hire for multiple roles or need to shortlist candidates quickly. AI can support technical hiring, sales hiring, operations hiring, analytics hiring, QA hiring, backend hiring, and other role families. HireScore AI is built for teams that want to organize hiring from job creation to candidate shortlisting in one place.`
      ],
      [
        'Final thoughts',
        `AI can improve recruitment when used responsibly. It can save time, reduce repetitive screening work, improve candidate visibility, and help recruiters make faster decisions. But AI should not replace human review. The best approach is to use AI for structure, speed, and explanation while recruiters make final decisions. HireScore AI follows this approach by combining AI resume screening, JD-based matching, candidate ranking, skill coverage, and recruiter-friendly explanations in one hiring workflow.`
      ],
    ],
    links: ['/product/ai-explanation-engine', '/product/ai-candidate-scoring', '/product/hiring-pipeline'],
  },
  {
    slug: '/resources/blogs/how-to-shortlist-candidates-faster-without-losing-quality',
    title: 'How to Shortlist Candidates Faster Without Losing Quality',
    meta: 'Learn how recruiters can shortlist candidates faster using structured job criteria, AI scoring, candidate ranking, matched skills, and explainable hiring decisions.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Shortlisting',
    readTime: '8 min read',
    sections: [
      [
        'Why shortlisting candidates is difficult',
        `Shortlisting candidates is difficult because recruiters need to balance speed and quality. If the process is too slow, hiring managers may lose strong candidates to competitors. If the process is too fast, recruiters may miss important details and shortlist weak profiles. The challenge becomes bigger when one job receives many applications. Recruiters need to check skills, experience, education, role relevance, notice period, location, and overall fit. Without a structured system, shortlisting can become inconsistent and stressful.`
      ],
      [
        'The problem with keyword-only shortlisting',
        `Many recruiters and basic tools depend too much on keywords. Keyword matching can be helpful, but it is not enough. A candidate may repeat many keywords in the resume without having strong practical experience. Another candidate may have real experience but may not use the exact same words as the job description. This can lead to poor shortlist quality. A better approach is to use JD-based matching, skill coverage, experience relevance, and recruiter review together. HireScore AI is built to support this more balanced approach.`
      ],
      [
        'Start with a clear job description',
        `Shortlisting quality starts with the job description. If the JD is unclear, AI tools and recruiters will both struggle. A good JD should define required skills, responsibilities, experience range, location, work mode, and role expectations. HireScore AI uses the job description as the base for candidate matching. When the job criteria are clear, the system can compare resumes more accurately and help recruiters identify candidates who fit the role better.`
      ],
      [
        'Use AI scoring to prioritize review',
        `AI scoring helps recruiters decide which candidates should be reviewed first. It does not mean the highest score should automatically be selected. It means recruiters get a priority order based on candidate fit. This is useful when there are many resumes and limited time. With HireScore AI, recruiters can view AI scores, matched skills, missing skills, and candidate explanations. This helps them move faster while still reviewing the evidence behind each profile.`
      ],
      [
        'Use matched skills and missing skills',
        `Matched and missing skills make candidate review easier. Matched skills show where the candidate aligns with the role. Missing skills show what recruiters may need to verify. For example, if a full-stack role requires React, Node.js, SQL, Git, and REST APIs, the recruiter can quickly see which skills are present and which skills need review. This reduces guesswork and helps recruiters have better conversations with candidates and hiring managers.`
      ],
      [
        'Review experience relevance, not only total years',
        `Total experience is important, but relevant experience matters more. A candidate may have five years of overall experience but only one year of experience in the required technology or role. Another candidate may have fewer total years but stronger role-specific work. HireScore AI helps recruiters look at candidate fit in relation to the job description. This helps improve shortlist quality because candidates are not judged only by total years or resume length.`
      ],
      [
        'Move shortlisted candidates faster',
        `Once relevant candidates are identified, recruiters need to move them forward quickly. Delays can reduce candidate interest and slow down hiring. HireScore AI supports the hiring workflow by helping recruiters move candidates from screening to communication, tests, or interview scheduling. This creates a cleaner pipeline where shortlisted candidates are not lost in spreadsheets or manual notes. A faster workflow improves the recruiter experience and the candidate experience.`
      ],
      [
        'How HireScore AI helps maintain quality',
        `HireScore AI helps maintain shortlist quality by combining resume parsing, JD-based matching, AI scoring, candidate ranking, matched skills, missing skills, and explanations. Recruiters can use these signals to make better decisions instead of relying only on manual reading. The platform helps hiring teams screen faster, but it still keeps the recruiter in control. This is important because good hiring requires both automation and human judgment.`
      ],
      [
        'Final thoughts',
        `Fast shortlisting should not mean careless shortlisting. Recruiters need tools that help them move quickly while still reviewing candidate evidence. HireScore AI helps recruiters save time, improve shortlist quality, and manage candidates in a more organized way. By using structured job criteria, AI ranking, matched skills, missing skills, and explainable scoring, recruiters can shortlist candidates faster without losing quality.`
      ],
    ],
    links: ['/product/ai-shortlisting', '/product/ai-candidate-ranking', '/product/ai-explanation-engine'],
  },
  {
    slug: '/resources/blogs/complete-guide-to-ai-powered-hiring-automation',
    title: 'Complete Guide to AI-Powered Hiring Automation',
    meta: 'A complete guide to AI-powered hiring automation for job creation, public apply pages, resume screening, candidate ranking, communication, and interview scheduling.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    category: 'Hiring Automation',
    readTime: '10 min read',
    sections: [
      [
        'What is AI-powered hiring automation?',
        `AI-powered hiring automation means using artificial intelligence and connected workflows to reduce manual work in recruitment. It can include job creation, public apply pages, resume collection, resume parsing, JD-based matching, candidate scoring, candidate ranking, shortlisting, communication, screening tests, and interview scheduling. The goal is to help recruiters move faster from job opening to candidate selection. Hiring automation is not only about replacing manual tasks. It is about creating a structured hiring process where recruiters have better visibility and control.`
      ],
      [
        'Why hiring teams need automation',
        `Recruiters often work with disconnected tools. A job may be created in one place, applications may come from different sources, resumes may be stored in folders, screening may happen in spreadsheets, and communication may happen through email or phone. This creates manual handoffs and candidate status confusion. Hiring automation helps connect these steps. When job creation, application collection, resume screening, and candidate movement happen in one workflow, recruiters can save time and reduce errors.`
      ],
      [
        'Step 1: Create a job with a clear JD',
        `The first step in hiring automation is job creation. A recruiter should create a job with a clear job title, location, work mode, experience requirement, required skills, salary range if available, and detailed job description. This information becomes the base for candidate matching. HireScore AI allows recruiters to create jobs with JD details so the AI system can understand what kind of candidate is required. A clear JD improves the quality of resume screening and candidate ranking.`
      ],
      [
        'Step 2: Collect applications through public apply pages',
        `After creating a job, recruiters need a clean way to collect applications. Public apply pages help candidates apply for a specific role through a dedicated link. This keeps applications organized under the right job. Instead of receiving resumes from random emails, chats, and folders, recruiters can collect candidate details and resumes in one structured pipeline. HireScore AI supports the idea of connecting public apply pages with AI screening so recruiters can move from application collection to review faster.`
      ],
      [
        'Step 3: Parse resumes into structured profiles',
        `Resume parsing is an important part of hiring automation. Resumes are usually unstructured files with different layouts and formats. AI resume parsing converts those files into structured candidate profiles. The system can extract information such as name, email, phone, skills, education, experience, designation, and company details. This reduces manual data entry and gives recruiters a cleaner view of each candidate. HireScore AI uses resume parsing as the foundation for candidate matching and scoring.`
      ],
      [
        'Step 4: Match resumes with job descriptions',
        `Once candidate profiles are extracted, the next step is JD-based matching. The system compares candidate skills, experience, and role signals with the job description. This helps recruiters understand how closely a candidate fits the role. Matched skills show strengths, missing skills show gaps, and experience relevance shows whether the candidate has the right background. HireScore AI uses this matching process to help recruiters make faster and more informed screening decisions.`
      ],
      [
        'Step 5: Rank candidates with AI scores',
        `AI candidate ranking helps recruiters prioritize review. Instead of opening every resume in random order, recruiters can review candidates based on AI score and role fit. This is especially useful for high-volume hiring and recruitment agencies. Candidate ranking helps teams identify stronger profiles earlier and reduce time spent on weak matches. HireScore AI combines candidate ranking with matched skills, missing skills, and explanations so recruiters can understand the reason behind the score.`
      ],
      [
        'Step 6: Move shortlisted candidates forward',
        `After screening and ranking, recruiters need to move suitable candidates forward. This may include candidate communication, screening tests, interview scheduling, or sharing profiles with hiring managers. A connected hiring workflow helps recruiters avoid losing candidates after shortlisting. HireScore AI is designed to support the early hiring pipeline from job creation to shortlisting and next-stage movement. This makes the process more organized and reduces manual tracking work.`
      ],
      [
        'Why HireScore AI is more than a resume parser',
        `Many tools only extract resume data. HireScore AI is built as an AI-powered recruitment and ATS platform that supports a larger workflow. It connects job creation, public apply pages, resume upload, AI parsing, JD-based matching, candidate ranking, AI explanations, shortlisting, communication, and interview workflow support. This makes it useful for recruiters who want more than basic resume extraction. The platform helps teams manage the complete early hiring journey in one place.`
      ],
      [
        'Final thoughts',
        `AI-powered hiring automation helps recruiters reduce repetitive work and manage hiring more efficiently. It improves speed, structure, and candidate visibility. HireScore AI helps recruiters create jobs, collect applications, parse resumes, match candidates with job descriptions, rank profiles, and shortlist better candidates faster. For recruitment agencies, HR teams, startups, and staffing companies, connected hiring automation can make the recruitment process faster, smarter, and easier to scale.`
      ],
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
      <SEO
        title="AI Recruitment Blogs | HireScore AI"
        description="Read HireScore AI blogs about AI resume screening, candidate ranking, public apply pages, AI shortlisting, recruitment automation, and hiring workflows."
        path="/resources/blogs"
      />

      <PageHero
        eyebrow="HireScore AI Blog"
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
                </div>

                <h2>
                  <Link href={post.slug}>{post.title}</Link>
                </h2>

                <p>{post.meta}</p>

                <Link href={post.slug} className="blogReadMore">
                  Read article <ArrowRight size={16} />
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
  return (
    <>
      <SEO
        title={`${post.title} | HireScore AI Blog`}
        description={post.meta}
        path={post.slug}
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
            <h2>Related HireScore AI pages</h2>
            <div className="blogRelatedLinks">
              {post.links.map((href) => (
                <Link href={href} key={href}>
                  {titleByPath(href)}
                </Link>
              ))}
            </div>
          </div>

          <div className="blogCtaBox">
            <div>
              <span className="blogCtaEyebrow">HireScore AI</span>
              <h2>Ready to screen resumes faster?</h2>
              <p>
                Use HireScore AI to create jobs, collect resumes, rank candidates,
                and shortlist better profiles with AI.
              </p>
            </div>

            <Link href="/" className="blogCtaButton">
              Try HireScore AI <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </article>
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
