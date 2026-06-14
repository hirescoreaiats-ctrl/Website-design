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
    title: 'How AI Resume Screening Helps Recruiters Save Time and Improve Shortlist Quality',
    meta: 'Learn how AI resume screening helps recruiters reduce manual resume review, parse candidate profiles, match resumes with job descriptions, and shortlist better candidates faster.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Resume Screening',
    readTime: '9 min read',
    sections: [
      [
        'Introduction',
        `Recruiters spend a large part of their day reading resumes, comparing candidate profiles, checking skills, and deciding which applicants should move forward. For one open role, a recruiter may receive dozens or even hundreds of resumes. The problem is not only the volume of resumes. The bigger problem is that every resume has a different format, different wording, different skill placement, and different level of detail. This makes manual screening slow and inconsistent. AI resume screening helps recruiters solve this problem by converting resumes into structured candidate insights and comparing them with the job description. HireScore AI is designed to support this workflow by helping recruiters create jobs, collect resumes, parse profiles, match candidates with the JD, rank profiles, and shortlist better candidates faster.`
      ],
      [
        'Why manual resume screening slows down hiring',
        `Manual resume screening takes time because recruiters need to open every resume, read the candidate summary, check skills, review work experience, understand education, compare the profile with the job description, and then decide whether the candidate should be shortlisted. This process becomes difficult when multiple recruiters are working on multiple roles at the same time. It also creates inconsistency because one recruiter may focus on skills, another may focus on experience, and another may focus on resume presentation. A good candidate can be missed if the resume is not formatted well. A weak candidate can look strong if the resume repeats the right keywords. This is where AI resume screening becomes useful.`
      ],
      [
        'What AI resume screening actually does',
        `AI resume screening is not just keyword searching. A useful AI screening system should read resumes, extract candidate information, identify role-relevant skills, understand experience signals, compare the resume with the job description, and help recruiters review candidates in a structured way. HireScore AI helps turn unstructured resumes into cleaner candidate profiles. Recruiters can review details like skills, education, experience, matched skills, missing skills, AI score, and candidate fit signals. This reduces manual data entry and gives recruiters a better starting point for screening.`
      ],
      [
        'How HireScore AI parses resumes into candidate profiles',
        `HireScore AI includes AI resume parsing to extract important candidate details from resumes. Instead of manually copying data from a PDF or document, recruiters can view candidate information in a structured format. This can include name, contact details, skills, education, total experience, designation, previous company information, and role-related evidence. Structured candidate profiles make screening easier because recruiters no longer have to search every resume line by line. They can quickly understand who the candidate is, what skills they have, and whether the profile is relevant to the open job.`
      ],
      [
        'Why JD-based matching is better than keyword matching',
        `Many basic screening tools rely too much on keywords. Keyword matching can be helpful, but it is not enough for quality hiring. A candidate may repeat a keyword many times without real experience. Another candidate may have strong experience but use different wording. JD-based matching is better because the resume is compared with the actual job requirements. HireScore AI uses the job description as the base for screening. This helps recruiters understand whether the candidate has the right skills, experience, and role relevance for that specific job.`
      ],
      [
        'How AI scoring helps recruiters prioritize candidates',
        `After resumes are parsed and matched with the job description, recruiters need to know which candidates should be reviewed first. AI candidate scoring helps with this. HireScore AI can help recruiters prioritize candidates using role-fit signals such as matched skills, missing skills, experience relevance, and profile strength. This does not mean recruiters should blindly trust a score. Instead, the score gives a starting point. Recruiters can review the top matches first, check the explanation, and then decide whether to shortlist or keep the candidate in review.`
      ],
      [
        'How matched skills and missing skills improve review quality',
        `Matched skills and missing skills are important because they make candidate review more transparent. For example, if a job requires SQL, Excel, Power BI, Python, reporting, and dashboarding, the recruiter can quickly see which of those skills are present in the candidate profile and which need verification. This saves time during screening and improves the quality of recruiter decisions. HireScore AI shows candidate fit in a more explainable way so recruiters can discuss profiles with hiring managers more confidently.`
      ],
      [
        'Where HireScore AI fits in the recruiter workflow',
        `HireScore AI supports the early hiring workflow from job creation to shortlisting. Recruiters can create a job with a clear JD, generate a public apply page, collect candidate applications, upload resumes, parse resumes, match candidates with the JD, rank candidates, and move suitable candidates forward. This makes HireScore AI more than a resume parser. It helps recruiters manage the full screening workflow in one place instead of using scattered folders, spreadsheets, email threads, and manual notes.`
      ],
      [
        'Best practices for using AI resume screening',
        `To get the best result from AI resume screening, recruiters should start with a clear job description. The JD should include required skills, experience range, responsibilities, role expectations, location, work mode, and must-have qualifications. Recruiters should also review AI explanations before making decisions. A candidate should not be rejected only because one keyword is missing. AI should support recruiter judgment, not replace it. HireScore AI works best when recruiters use it as a decision-support system with human review.`
      ],
      [
        'Final thoughts',
        `AI resume screening helps recruiters save time, reduce repetitive work, and improve shortlist quality. It gives hiring teams a structured way to review resumes, compare candidates with job descriptions, and prioritize stronger profiles. HireScore AI helps recruiters create jobs, collect applications, parse resumes, match profiles with the JD, rank candidates, and shortlist faster. For recruitment agencies, HR teams, startups, and staffing companies, AI resume screening can make hiring faster, cleaner, and easier to manage.`
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
    meta: 'Understand candidate ranking, why recruiters need it, and how HireScore AI helps rank candidates using JD-based AI scoring, matched skills, missing skills, and explainable hiring signals.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'Candidate Ranking',
    readTime: '9 min read',
    sections: [
      [
        'Introduction',
        `Candidate ranking is one of the most important parts of modern recruitment. When recruiters receive many applications for a job, they need a practical way to decide which candidates should be reviewed first. Without ranking, recruiters usually open resumes in random order, application order, or upload order. This wastes time and makes shortlisting inconsistent. AI candidate ranking helps recruiters prioritize candidates based on job fit. HireScore AI helps recruiters rank candidates using JD-based scoring, skill match, missing skill analysis, experience relevance, and explainable candidate insights.`
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
        'How HireScore AI ranks candidates',
        `HireScore AI helps rank candidates by connecting resume parsing with JD-based candidate scoring. First, the resume is parsed into a structured candidate profile. Then the profile is compared with the job description. The system can consider matched skills, missing skills, experience relevance, education, role similarity, and profile quality. Recruiters can use the ranking to identify which profiles should be reviewed first. This makes screening faster and helps hiring teams build stronger shortlists.`
      ],
      [
        'Why JD-based ranking is important',
        `A candidate cannot be judged properly without job context. A profile that is excellent for a backend developer role may not be suitable for a data analyst role. A sales candidate may be strong for field sales but not for enterprise SaaS sales. This is why ranking should be based on the job description. HireScore AI ranks candidates against the specific job they are applying for. This keeps candidate evaluation connected to actual hiring requirements rather than generic resume keywords.`
      ],
      [
        'Why explainable ranking matters',
        `A ranking number alone is not enough. Recruiters need to know why a candidate is ranked higher or lower. Explainable ranking helps recruiters understand the evidence behind the score. HireScore AI supports this by showing matched skills, missing skills, and candidate fit signals. This helps recruiters discuss candidates with hiring managers more clearly. Instead of saying “this candidate scored high,” recruiters can explain that the candidate matched key skills, had relevant experience, and aligned with the JD.`
      ],
      [
        'How ranking improves shortlist quality',
        `Candidate ranking improves shortlist quality because it gives recruiters a structured starting point. Strong candidates can be reviewed earlier, average candidates can stay in review, and weak candidates can be deprioritized. This does not remove human judgment. Recruiters still review the candidate profile and final decision. But ranking reduces random review and improves consistency. HireScore AI helps recruiters move from unorganized resume review to evidence-based shortlisting.`
      ],
      [
        'How HireScore AI connects ranking with shortlisting',
        `Candidate ranking becomes more useful when it connects with the next hiring step. HireScore AI helps recruiters move ranked candidates toward shortlisting, communication, tests, and interview scheduling. This means recruiters do not have to rank candidates in one tool and track them somewhere else. The ranking becomes part of the hiring pipeline. This keeps candidate status organized and helps teams avoid losing strong candidates after screening.`
      ],
      [
        'Final thoughts',
        `Candidate ranking matters because recruiters need speed, structure, and clarity. Without ranking, hiring teams spend too much time comparing resumes manually. With AI candidate ranking, recruiters can review stronger matches first and make shortlist decisions faster. HireScore AI combines AI resume parsing, JD-based scoring, candidate ranking, explainable AI, and shortlisting workflows to help recruiters build better candidate pipelines with less manual effort.`
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
        `A public job apply page is one of the simplest ways to make hiring more organized. Instead of collecting resumes from emails, WhatsApp messages, job portals, spreadsheets, and shared folders, recruiters can share one application link for a specific job. Candidates can open the link, read job details, fill in their information, and upload their resume. HireScore AI supports this kind of structured hiring workflow by connecting job creation, public apply pages, resume collection, AI resume parsing, candidate scoring, and shortlisting.`
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
        'How HireScore AI helps create job-based application flows',
        `HireScore AI starts with job creation. Recruiters can create a job with a clear JD, required skills, experience range, location, salary range, and work mode. Once a job is created, the candidate intake can be connected to that role. This helps recruiters track candidates job-wise. When applications are attached to the correct job, AI screening becomes more accurate because each resume is compared with the right job description.`
      ],
      [
        'What a good public apply page should include',
        `A good public apply page should be simple, clear, and candidate-friendly. It should explain the role without making the candidate confused. The page should include the job title, job type, location, experience range, key responsibilities, must-have skills, and application instructions. The application form should collect only useful details. A clean apply page improves candidate experience and helps recruiters receive better-quality applications.`
      ],
      [
        'How public apply pages connect with AI resume screening',
        `A public apply page becomes more powerful when it connects directly with AI resume screening. After a candidate applies, the resume can be parsed into a structured candidate profile. Then the profile can be matched with the job description. HireScore AI helps recruiters move from application collection to resume screening faster by connecting intake with parsing, scoring, ranking, and shortlisting. This reduces manual work and improves hiring speed.`
      ],
      [
        'Why candidate source and role tracking matter',
        `Recruiters often need to know where candidates are coming from and which role they applied for. Candidate source tracking helps recruiters understand which channels are producing applications. Role tracking prevents candidates from getting mixed across jobs. For example, if a recruiter is hiring for backend developer, QA engineer, and data analyst roles at the same time, each candidate should stay connected to the right job. HireScore AI supports a more organized candidate pipeline so recruiters can review candidates with proper context.`
      ],
      [
        'How public apply pages help recruitment agencies',
        `Recruitment agencies can benefit strongly from public apply pages. Agencies often work on multiple client requirements and need to collect resumes quickly. A role-specific apply page allows agencies to share a clean job link with candidates and collect applications in a structured way. Once resumes are collected, AI screening can help identify stronger matches. This improves the speed and quality of candidate submission to clients.`
      ],
      [
        'How HireScore AI improves the full intake workflow',
        `HireScore AI is not limited to collecting resumes. It helps recruiters create jobs, share apply pages, upload resumes, parse candidate profiles, match candidates with the JD, rank profiles, and move suitable candidates forward. This means recruiters can manage candidate intake and screening in one connected workflow. A public apply page is the starting point, but the real value comes when it connects with AI-powered screening and candidate ranking.`
      ],
      [
        'Final thoughts',
        `Public job apply pages make hiring cleaner and faster. They reduce scattered resume collection, improve candidate tracking, and help recruiters collect applications under the right job. HireScore AI connects public apply pages with job creation, resume parsing, JD matching, AI scoring, candidate ranking, and shortlisting. For recruiters who want a more organized hiring workflow, public apply pages are an important first step.`
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
    meta: 'Explore how AI is used in recruitment, the benefits and risks recruiters should understand, and how HireScore AI supports explainable AI resume screening and human review.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Recruitment',
    readTime: '10 min read',
    sections: [
      [
        'Introduction',
        `AI is becoming an important part of modern recruitment. Hiring teams are using AI to reduce manual resume screening, organize candidate data, rank applicants, explain candidate fit, and move candidates faster through the hiring pipeline. But AI in recruitment should be used carefully. It should support recruiters, not replace them. Recruiters still need to review candidate context, understand role requirements, and make final hiring decisions. HireScore AI is built with this idea in mind. It helps recruiters use AI for resume screening, JD-based matching, candidate ranking, and explainable hiring decisions while keeping human review in the workflow.`
      ],
      [
        'How AI is used in recruitment',
        `AI can support many parts of recruitment. It can parse resumes, extract candidate information, match resumes with job descriptions, score candidates, rank applicants, identify matched and missing skills, and help recruiters prepare shortlists. It can also support communication, screening tests, interview scheduling, and hiring pipeline automation. The main value of AI is that it reduces repetitive manual work. Instead of spending hours reading every resume from scratch, recruiters can start with structured candidate insights and focus on reviewing the right profiles.`
      ],
      [
        'Benefits of AI recruitment software',
        `The biggest benefit of AI recruitment software is speed. Recruiters can screen more resumes in less time and focus on stronger candidates first. AI also improves organization by converting resumes into structured profiles. This helps recruiters compare candidates more consistently. AI can also reduce manual errors, especially when recruiters are handling multiple roles at the same time. HireScore AI helps recruiters create jobs, collect resumes, parse candidate profiles, compare resumes with job descriptions, rank candidates, and move suitable candidates forward in a cleaner workflow.`
      ],
      [
        'Why AI resume screening helps hiring teams',
        `Resume screening is one of the most repetitive parts of recruitment. Every resume needs to be reviewed for skills, experience, education, role relevance, and contact details. AI resume screening helps by extracting these details and presenting them in a structured way. HireScore AI helps recruiters move from unstructured resume files to organized candidate profiles. This makes it easier to understand candidate fit, review skill coverage, and decide which candidates should move forward.`
      ],
      [
        'Risks of using AI in recruitment',
        `AI in recruitment also has risks. Recruiters should not blindly trust a score without understanding the reason behind it. If the job description is unclear, the AI matching may also become weak. If a resume is incomplete or poorly written, important candidate details may be missed. AI can also make mistakes when candidate context is not clear. This is why hiring teams should use AI as a decision-support tool, not as a final decision-maker. Human review should always remain part of the process.`
      ],
      [
        'Why explainable AI is important',
        `Explainable AI is important because recruiters need to understand why a candidate is recommended or not recommended. A score alone is not enough. Recruiters need evidence such as matched skills, missing skills, experience relevance, and role-fit signals. HireScore AI focuses on explainable candidate review. This helps recruiters discuss candidate recommendations with hiring managers more confidently. Instead of saying that the AI selected a candidate, recruiters can show the actual reasons behind the recommendation.`
      ],
      [
        'Best practices for using AI in hiring',
        `Recruiters should follow a few best practices when using AI. First, create a clear job description with must-have skills, responsibilities, experience range, location, and role expectations. Second, review AI scores along with explanations. Third, do not reject a candidate only because one skill is missing. Fourth, use AI ranking as a priority guide, not as a final hiring decision. Fifth, keep recruiters involved in every important hiring decision. HireScore AI works best when teams combine AI speed with recruiter judgment.`
      ],
      [
        'How HireScore AI supports responsible AI hiring',
        `HireScore AI helps recruiters use AI in a practical and controlled way. It supports job creation, public apply pages, resume upload, resume parsing, JD-based matching, AI scoring, candidate ranking, matched skills, missing skills, explanations, shortlisting, and hiring pipeline movement. The platform helps recruiters save time, but it does not remove the recruiter from the process. Recruiters can review candidate data, check evidence, and make final decisions with better visibility.`
      ],
      [
        'Who should use AI recruitment tools',
        `AI recruitment tools are useful for recruitment agencies, HR teams, staffing companies, startups, and businesses that receive many resumes. They are especially useful for high-volume hiring, role-wise candidate tracking, and early-stage resume screening. Teams hiring for technical roles, sales roles, analytics roles, QA roles, backend roles, and full-stack roles can use AI to organize candidate review and improve shortlisting speed. HireScore AI is designed for teams that want faster screening with better explanation and workflow control.`
      ],
      [
        'Final thoughts',
        `AI can improve recruitment when it is used responsibly. It can reduce manual work, improve candidate visibility, and help recruiters make faster decisions. But AI should not replace human judgment. The best approach is to use AI for structure, speed, ranking, and explanation while recruiters make final decisions. HireScore AI follows this approach by combining AI resume screening, JD-based scoring, candidate ranking, explainable AI, and hiring pipeline support in one recruitment platform.`
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
    meta: 'Learn how recruiters can shortlist candidates faster using AI scoring, candidate ranking, matched skills, missing skills, and explainable hiring decisions with HireScore AI.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Shortlisting',
    readTime: '9 min read',
    sections: [
      [
        'Introduction',
        `Shortlisting candidates is one of the most important steps in hiring. Recruiters need to move fast, but they also need to maintain quality. If shortlisting is too slow, strong candidates may lose interest or join another company. If shortlisting is too fast without proper review, weak candidates may move forward and hiring managers may lose confidence in the process. HireScore AI helps recruiters shortlist faster without losing quality by combining AI resume parsing, JD-based candidate scoring, ranking, matched skills, missing skills, and explainable candidate review.`
      ],
      [
        'Why shortlisting is difficult',
        `Shortlisting is difficult because recruiters need to compare many candidate profiles against one job description. They need to check whether the candidate has the required skills, relevant experience, right education, suitable background, and role alignment. When resumes are reviewed manually, this process takes time. It also becomes inconsistent because different recruiters may evaluate candidates differently. A structured AI-assisted workflow helps recruiters review candidates with more clarity and speed.`
      ],
      [
        'The problem with keyword-only shortlisting',
        `Keyword-only shortlisting can reduce quality. A candidate may mention the right keywords but may not have strong practical experience. Another candidate may have relevant work experience but may use different words from the job description. This creates a risk of selecting the wrong candidates or missing strong candidates. HireScore AI helps reduce this problem by using JD-based matching, skill coverage, experience relevance, and explainable candidate signals instead of depending only on repeated keywords.`
      ],
      [
        'Start with a clear job description',
        `A good shortlist starts with a clear job description. Recruiters should define the job title, responsibilities, must-have skills, good-to-have skills, experience range, location, work mode, and hiring expectations. HireScore AI uses the job description as the base for resume matching and scoring. When the JD is clear, the AI can compare candidates more accurately. This helps recruiters create a more relevant shortlist and reduces confusion during candidate review.`
      ],
      [
        'Use AI scoring to prioritize candidates',
        `AI scoring helps recruiters understand which candidates should be reviewed first. It does not mean the highest score should automatically be selected. It means recruiters get a practical priority list. HireScore AI helps score candidates based on role-fit signals such as matched skills, missing skills, experience relevance, and candidate profile quality. Recruiters can then open top profiles, review explanations, and decide whether the candidate should move forward.`
      ],
      [
        'Use matched skills and missing skills for better decisions',
        `Matched skills and missing skills help recruiters make better shortlisting decisions. Matched skills show where the candidate fits the job. Missing skills show what needs verification. For example, if a role requires React, Node.js, REST APIs, SQL, and Git, the recruiter can quickly see which skills are present and which skills are missing. This saves time and improves the quality of recruiter discussions with hiring managers. HireScore AI makes skill coverage easier to review in the candidate profile.`
      ],
      [
        'Why explainable AI improves shortlist confidence',
        `Recruiters need confidence before moving candidates forward. A simple score does not explain the full picture. Explainable AI helps recruiters understand why a candidate is a strong match, average match, or weak match. HireScore AI supports recruiter-friendly explanations that highlight candidate strengths, skill gaps, and role relevance. This helps recruiters explain shortlist decisions to hiring managers and reduces random or unclear candidate movement.`
      ],
      [
        'Move candidates through the hiring pipeline faster',
        `Shortlisting is only useful when the next step is clear. After a candidate is shortlisted, recruiters need to move them to communication, screening tests, or interview scheduling. HireScore AI helps connect shortlisting with the hiring pipeline so candidates do not get lost in spreadsheets or manual notes. A connected workflow helps recruiters act faster and improves the candidate experience.`
      ],
      [
        'How HireScore AI supports quality shortlisting',
        `HireScore AI supports quality shortlisting by connecting job creation, public apply pages, resume upload, AI parsing, JD matching, candidate scoring, candidate ranking, explanations, and pipeline movement. This gives recruiters a full view of candidate fit before making decisions. The platform helps recruiters save time while keeping the recruiter in control. This balance is important because good hiring needs both automation and human judgment.`
      ],
      [
        'Final thoughts',
        `Recruiters need to shortlist faster, but speed should not reduce quality. AI can help when it gives recruiters structured candidate data, JD-based scoring, ranking, matched skills, missing skills, and explanations. HireScore AI helps recruiters build better shortlists with less manual work and more clarity. For recruitment agencies, HR teams, startups, and staffing companies, AI shortlisting can improve hiring speed and decision quality together.`
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
        `Hiring automation helps recruiters reduce manual work and manage candidates in a more organized way. In many hiring teams, job details are stored in one place, resumes come from multiple channels, screening happens manually, shortlists are managed in spreadsheets, and interviews are tracked separately. This creates delays and confusion. AI-powered hiring automation connects these steps into one workflow. HireScore AI helps recruiters create jobs, collect applications, upload resumes, parse candidate profiles, match resumes with job descriptions, rank candidates, shortlist profiles, and move candidates toward communication, tests, and interviews.`
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
        `The first step in hiring automation is job creation. Recruiters should create a job with the right title, role description, responsibilities, required skills, experience range, location, work mode, and salary range if available. HireScore AI uses the job description as the foundation for candidate matching. A clear JD improves AI screening because every candidate is compared against the right requirements.`
      ],
      [
        'Step 2: Collect applications through public apply pages',
        `After creating a job, recruiters need a clean way to collect candidates. Public apply pages help candidates apply through a role-specific link. This reduces scattered resume collection and keeps applications connected to the right job. HireScore AI helps recruiters connect job creation with public apply pages so candidate intake becomes easier to manage. This also helps recruiters track which candidate applied for which role.`
      ],
      [
        'Step 3: Upload resumes and parse candidate profiles',
        `Recruiters may collect resumes from apply pages, job portals, referrals, or manual uploads. AI resume parsing helps convert these resumes into structured candidate profiles. HireScore AI can extract candidate details such as skills, experience, education, contact information, designation, and role-related signals. This reduces manual data entry and gives recruiters a cleaner view of each candidate.`
      ],
      [
        'Step 4: Match resumes with job descriptions',
        `After parsing, candidates should be matched with the job description. JD-based matching helps recruiters understand candidate fit in context. HireScore AI compares candidate profiles with the JD and helps identify matched skills, missing skills, experience relevance, and role-fit signals. This is much better than reviewing resumes manually or depending only on keyword matching.`
      ],
      [
        'Step 5: Rank candidates and shortlist faster',
        `AI candidate ranking helps recruiters review stronger profiles first. HireScore AI can help rank candidates based on JD-based scoring and candidate fit signals. Recruiters can open top profiles, review matched skills, check missing skills, read explanations, and shortlist suitable candidates. This reduces manual comparison and helps teams move faster without losing decision quality.`
      ],
      [
        'Step 6: Move candidates to communication, tests, and interviews',
        `Hiring does not end at shortlisting. Recruiters need to communicate with candidates, validate skills, and schedule interviews. HireScore AI supports the idea of a connected hiring pipeline where shortlisted candidates can move toward communication, screening tests, and interview scheduling. This keeps candidate status organized and prevents strong profiles from getting lost after screening.`
      ],
      [
        'Why HireScore AI is more than a resume parser',
        `Many tools only extract resume data. HireScore AI is built as an AI-powered recruitment and ATS platform for the early hiring workflow. It connects job creation, public apply pages, resume upload, AI resume parsing, JD-based scoring, candidate ranking, explainable AI, shortlisting, communication, tests, interview scheduling, and hiring pipeline automation. This makes it useful for recruiters who want one organized workflow instead of multiple disconnected tools.`
      ],
      [
        'Final thoughts',
        `AI-powered hiring automation helps recruiters save time, improve candidate visibility, and manage hiring more efficiently. It brings structure to job creation, application collection, resume screening, candidate ranking, shortlisting, and next-step movement. HireScore AI helps recruitment agencies, HR teams, startups, and staffing companies manage the early hiring workflow with AI-powered screening and pipeline automation. For teams that want faster and smarter hiring, connected automation can become a strong advantage.`
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
  ['What is HireScore AI?', 'HireScore AI is an independent AI-powered recruitment workflow platform that helps recruiters create jobs, generate public apply pages, collect candidate applications, upload resumes, screen resumes with AI, rank candidates, view AI fit explanations, track hiring analytics, manage candidate communication, and schedule interviews from one platform.'],
  ['Is HireScore AI the same as HiredScore or Workday?', 'No. HireScore AI is an independent recruitment workflow platform and is not affiliated with HiredScore, HireScore.com, or Workday.'],
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

function SEO({ title, description, path = '/', type = 'website', schema }) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:type', type, 'property')
    setMeta('og:site_name', 'HireScore AI', 'property')
    setMeta('og:image', `${SITE_URL}/hirescore-logo-full.png`, 'property')
    setMeta('og:image:alt', 'HireScore AI logo', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', `${SITE_URL}/hirescore-logo-full.png`)
    setCanonical(canonical)
    setJsonLd('route-schema', schema || baseSchema(path))
  }, [title, description, path, type, schema])
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

function setJsonLd(id, payload) {
  let tag = document.getElementById(id)
  if (!tag) {
    tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.id = id
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(payload)
}

function baseSchema(path) {
  const routeUrl = `${SITE_URL}${path === '/' ? '/' : path}`
  const softwareDescription = 'HireScore AI is an independent AI recruitment workflow platform for job creation, public apply pages, AI resume screening, candidate ranking, AI fit explanations, hiring analytics, candidate communication, and interview scheduling.'
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'HireScore AI',
        alternateName: ['HireScoreAI', 'HireScore AI ATS'],
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/hirescore-logo-full.png`,
        email: CONTACT_EMAIL,
        description: 'HireScore AI is an independent AI recruitment workflow platform for recruiters, HR teams, staffing agencies, and companies.',
        disambiguatingDescription: 'HireScore AI is independent and is not affiliated with HiredScore, HireScore.com, or Workday.',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'HireScore AI',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'AI recruiting software',
        operatingSystem: 'Web',
        url: routeUrl,
        description: softwareDescription,
        publisher: { '@id': `${SITE_URL}/#organization` },
        featureList: [
          'Job creation',
          'Public apply pages',
          'AI resume screening',
          'JD-based candidate matching',
          'Candidate ranking',
          'AI fit explanation',
          'AI hiring analytics',
          'Candidate communication',
          'Interview scheduling',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: '7-day free pilot access available for selected clients.' },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'HireScore AI',
        url: `${SITE_URL}/`,
        publisher: { '@id': `${SITE_URL}/#organization` },
        description: softwareDescription,
      },
    ],
  }
}

function homeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...baseSchema('/')['@graph'],
      {
        '@type': 'FAQPage',
        mainEntity: faqs.slice(0, 2).map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  }
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
          <Dropdown
            label="Product"
            base="/product"
            items={productNav.map((p) => [p.slug, p.navLabel])}
          />
          <Link href="/solutions">Solutions</Link>
          <Dropdown
            label="Resources"
            base="/resources"
            items={resourceNav}
          />
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
    '/solutions': 'Solutions',
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
      <SEO title="HireScore AI | Independent AI Recruitment Workflow Platform" description="HireScore AI is an independent AI recruitment workflow platform for job creation, public apply pages, AI resume screening, candidate ranking, AI fit explanations, hiring analytics, candidate communication, and interview scheduling." path="/" schema={homeSchema()} />
      <PageHero
        eyebrow="AI recruitment software"
        title="HireScore AI"
        titleHighlight="Independent AI Recruitment Workflow Platform"
        intro="Create jobs, launch public apply pages, collect applications, screen resumes with AI, rank candidates, review AI fit explanations, track hiring analytics, manage communication, and schedule interviews from one AI ATS platform."
        className="homeHero"
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
          <SectionHeader eyebrow="Features" title="Product-focused AI hiring features" text="HireScore AI brings AI resume screening software, JD-based candidate matching, candidate ranking software, AI fit explanation, hiring analytics, communication, and interview workflows together." />
          <div className="featureGrid">{productPages.map((page) => <FeatureCard page={page} key={page.slug} />)}</div>
        </div>
      </section>
      <section className="section splitSection">
        <div className="container splitGrid">
          <div>
            <SectionHeader eyebrow="How it works" title="Simple enough for recruiters, powerful enough for hiring teams" text="Launch a job, collect applications, let AI structure and score candidate profiles, then move the best candidates forward. HireScore AI is independent and is not affiliated with HiredScore, HireScore.com, or Workday." />
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
          <p>HireScore AI is an independent AI recruitment workflow platform for recruiters and hiring teams.</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={APP_URL}>App login and start pilot</a>
          <div className="socialLinks" aria-label="Social links">
            <a href="https://www.linkedin.com/company/hire-score-ai" target="_blank" rel="noreferrer" aria-label="HireScore AI on LinkedIn"><Linkedin size={17} />LinkedIn</a>
            <a href="https://www.instagram.com/hirescore_ai/" target="_blank" rel="noreferrer" aria-label="HireScore AI on Instagram"><Instagram size={17} />Instagram</a>
          </div>
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
