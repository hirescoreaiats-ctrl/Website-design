import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";
import { motion, AnimatePresence } from "framer-motion";
import dashboardImage from "../assets/hirescore-ai-dashboard.png";
import {
  Activity,
  AreaChart,
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  CheckCheck,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Copy,
  DatabaseZap,
  FileScan,
  FileSearch,
  Files,
  Gauge,
  Globe,
  Handshake,
  Kanban,
  Layers,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquare,
  Minus,
  Plus,
  Rocket,
  ScanSearch,
  SearchX,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TimerOff,
  RadioTower,
  Share2,
  Users,
  Workflow,
} from "lucide-react";

const html = htm.bind(React.createElement);

const pages = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "product", label: "Product", href: "product.html" },
  { key: "pricing", label: "Pricing", href: "pricing.html" },
  { key: "resources", label: "Resources", href: "resources.html" },
  { key: "contact", label: "Contact Us", href: "contact.html" }
];

const pageMeta = {
  home: ["HireScore AI | AI-Powered Hiring Intelligence", "index.html"],
  product: ["Product | HireScore AI", "product.html"],
  pricing: ["Pricing | HireScore AI", "pricing.html"],
  resources: ["Resources | HireScore AI", "resources.html"],
  contact: ["Contact Us | HireScore AI", "contact.html"]
};

function currentRoute() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  return Object.entries(pageMeta).find(([, value]) => value[1] === file)?.[0] || "home";
}

function IconBox({ icon: Icon }) {
  return html`<span className="card-icon"><${Icon} size=${21} /></span>`;
}

function Reveal({ children, className = "", delay = 0 }) {
  return html`
    <${motion.div}
      className=${className}
      initial=${{ opacity: 0, y: 18 }}
      whileInView=${{ opacity: 1, y: 0 }}
      viewport=${{ once: true, amount: 0.18 }}
      transition=${{ duration: 0.48, delay }}
    >
      ${children}
    </${motion.div}>
  `;
}

function Nav({ route }) {
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return html`
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="index.html" aria-label="HireScore AI home">
          <span className="brand-mark"><${ScanSearch} size=${23} /></span>
          <span>HireScore AI</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          ${pages.map(
            (page) => html`
              <a
                key=${page.key}
                className=${`nav-link ${route === page.key ? "active" : ""}`}
                href=${page.href}
                onClick=${() => setOpen(false)}
              >
                ${page.label}
              </a>
            `
          )}
        </nav>
        <a className="btn btn-primary" href="contact.html"><${CalendarCheck} size=${18} />Book a Demo</a>
        <button className="menu-button" type="button" aria-label="Open navigation" aria-expanded=${open} onClick=${() => setOpen(!open)}>
          <${Menu} size=${22} />
        </button>
      </div>
    </header>
  `;
}

function HeroDashboard() {
  return html`
    <${motion.div}
      className="hero-visual"
      initial=${{ opacity: 0, x: 28, scale: 0.98 }}
      animate=${{ opacity: 1, x: 0, scale: 1 }}
      transition=${{ duration: 0.68, delay: 0.12 }}
    >
      <div className="dashboard-frame">
        <img src=${dashboardImage} alt="AI hiring dashboard with candidate ranking, score gauges, and analytics" />
      </div>
      <${motion.div} className="floating-card" animate=${{ y: [0, -8, 0] }} transition=${{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <strong>AI recommendation ready</strong>
        <div className="score-row">
          <div className="scorebar"><span></span></div>
          <span>88% match</span>
        </div>
      </${motion.div}>
    </${motion.div}>
  `;
}

function AppPreview() {
  const candidates = [
    ["AR", "Anika Rao", "Senior Data Analyst", "92"],
    ["ML", "Marcus Lee", "Analytics Engineer", "86"],
    ["SC", "Sofia Chen", "BI Specialist", "79"]
  ];
  const metrics = [
    ["Matched skills", "91%", "91%"],
    ["Experience match", "84%", "84%"],
    ["Education signal", "76%", "76%"],
    ["Risk flags", "Low", "28%"]
  ];

  return html`
    <div className="app-preview">
      <div className="app-top">
        <div className="dots"><span></span><span></span><span></span></div>
        <span className="app-label">Candidate intelligence</span>
      </div>
      <div className="app-body">
        <div className="candidate-list">
          ${candidates.map(
            (candidate) => html`
              <div className="candidate" key=${candidate[0]}>
                <span className="avatar">${candidate[0]}</span>
                <div><strong>${candidate[1]}</strong><br /><small>${candidate[2]}</small></div>
                <span className="score-pill">${candidate[3]} score</span>
              </div>
            `
          )}
        </div>
        <div className="evidence-panel">
          <strong>Recruiter evidence panel</strong><br />
          <small>Matched skills, missing skills, experience depth, shortlist recommendation.</small>
          <div className="evidence-list" style=${{ marginTop: "16px" }}>
            ${metrics.map(
              (metric) => html`
                <div className="metric" key=${metric[0]}>
                  <div className="metric-row"><span>${metric[0]}</span><span>${metric[1]}</span></div>
                  <div className="scorebar"><span style=${{ width: metric[2] }}></span></div>
                </div>
              `
            )}
          </div>
        </div>
      </div>
    </div>
  `;
}

function FeatureCard({ icon, title, text }) {
  return html`
    <${Reveal} className="card">
      <${IconBox} icon=${icon} />
      <h3>${title}</h3>
      <p>${text}</p>
    </${Reveal}>
  `;
}

function SectionHead({ eyebrow, title, text, center = false }) {
  return html`
    <div className=${`section-head ${center ? "center" : ""}`}>
      <p className="eyebrow"><span className="dot"></span>${eyebrow}</p>
      <h2>${title}</h2>
      ${text ? html`<p className="muted">${text}</p>` : null}
    </div>
  `;
}

function HomePage() {
  const pain = [
    [Clock, "Manual screening", "Recruiters lose hours reading resumes before they can focus on top talent."],
    [SearchX, "Weak resume matching", "Keyword systems miss context, adjacent skills, and real experience quality."],
    [Copy, "Duplicate candidates", "Candidate records spread across jobs, sources, and manual spreadsheets."],
    [TimerOff, "Slow shortlisting", "The best candidates wait while teams debate incomplete hiring signals."]
  ];
  const features = [
    [FileScan, "AI Resume Parsing", "Extract contact details, skills, experience, education, projects, and roles."],
    [Target, "JD Matching", "Compare resumes against any job description with semantic matching."],
    [BarChart3, "Candidate Ranking", "Rank large candidate pools by job fit and confidence signals."],
    [Gauge, "Skill Gap Analysis", "Identify matched skills, missing requirements, and experience depth."],
    [ClipboardCheck, "Decision Evidence", "Explain why a candidate is strong, average, or risky."],
    [CheckCheck, "Shortlist Workflow", "Move candidates forward with clean review and shortlist stages."],
    [MessageSquare, "Communication Pipeline", "Track outreach and follow-up inside the hiring process."],
    [AreaChart, "Analytics Dashboard", "Monitor job performance, candidate quality, and source performance."]
  ];
  const useCases = [
    [BriefcaseBusiness, "Recruitment agencies", "Process high-volume resume pools and send sharper shortlists to clients."],
    [Users, "Internal HR teams", "Standardize screening and align hiring managers with evidence."],
    [Rocket, "Startups", "Move quickly from applications to interviews without process drag."],
    [DatabaseZap, "Enterprises", "Support multi-user workflows, auditability, and database flexibility."]
  ];

  return html`
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <${motion.div} className="hero-copy" initial=${{ opacity: 0, x: -24 }} animate=${{ opacity: 1, x: 0 }} transition=${{ duration: 0.58 }}>
            <p className="eyebrow"><span className="dot"></span>AI recruitment intelligence platform</p>
            <h1><span>AI Hiring Intelligence</span> for Modern Recruiters</h1>
            <p className="lead">HireScore AI helps recruiters screen resumes, rank candidates, analyze job fit, and move the best talent through the hiring pipeline faster.</p>
            <div className="actions">
              <a className="btn btn-primary" href="contact.html"><${CalendarCheck} size=${18} />Book a Demo</a>
              <a className="btn btn-dark" href="product.html"><${ArrowRight} size=${19} />Explore Product</a>
            </div>
            <div className="hero-pills">
              <span className="pill"><${FileSearch} size=${17} />AI Resume Screening</span>
              <span className="pill"><${BarChart3} size=${17} />Smart Candidate Ranking</span>
              <span className="pill"><${Workflow} size=${17} />Recruiter Workflow Automation</span>
            </div>
            <div className="hero-proof">
              <div className="proof-card"><strong>70%</strong><span>less screening time</span></div>
              <div className="proof-card"><strong>88%</strong><span>fit confidence signals</span></div>
              <div className="proof-card"><strong>1</strong><span>connected shortlist workflow</span></div>
            </div>
          </${motion.div}>
          <${HeroDashboard} />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <${SectionHead} center=${true} eyebrow="The recruiter bottleneck" title="Hiring teams need speed, clarity, and evidence before interviews begin." text="HireScore AI turns scattered resume review into a ranked, explainable, and recruiter-friendly workflow." />
          <div className="grid four">${pain.map((item) => html`<${FeatureCard} key=${item[1]} icon=${item[0]} title=${item[1]} text=${item[2]} />`)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container grid two" style=${{ alignItems: "center" }}>
          <${Reveal}>
            <${SectionHead} eyebrow="The HireScore AI solution" title="Screen, rank, explain, and move candidates with confidence." text="Recruiters see fit signals, missing skills, risk notes, shortlist status, and AI recommendations in one modern ATS workspace." />
            <div className="actions">
              <a className="btn btn-primary" href="product.html"><${Sparkles} size=${18} />Explore Product</a>
              <a className="btn btn-soft" href="contact.html"><${MessageSquare} size=${18} />Talk to Sales</a>
            </div>
          </${Reveal}>
          <${Reveal}><${AppPreview} /></${Reveal}>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <${SectionHead} center=${true} eyebrow="Platform features" title="Everything modern recruiters expect from an AI hiring system." />
          <div className="grid four">${features.map((item) => html`<${FeatureCard} key=${item[1]} icon=${item[0]} title=${item[1]} text=${item[2]} />`)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <${SectionHead} center=${true} eyebrow="How it works" title="From role intake to shortlist in four focused steps." />
          <div className="flow">
            ${["Create a job", "Upload or collect resumes", "AI analyzes candidates", "Recruiters shortlist and move forward"].map(
              (title, index) => html`<${Reveal} className="card step" delay=${index * 0.04} key=${title}><h3>${title}</h3><p>${["Add role criteria and ideal candidate signals.", "Import resumes in bulk or from your workflow.", "Parse, match, score, and explain every applicant.", "Review evidence and coordinate next steps."][index]}</p></${Reveal}>`
            )}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <${SectionHead} center=${true} eyebrow="Use cases" title="Flexible for agencies, HR teams, startups, and enterprises." />
          <div className="grid four">${useCases.map((item) => html`<${FeatureCard} key=${item[1]} icon=${item[0]} title=${item[1]} text=${item[2]} />`)}</div>
        </div>
      </section>

      <${CTA} title="Ready to upgrade your hiring workflow?" text="Hire smarter, faster, and with AI-powered confidence." primary="Book a Demo" secondary="View Pricing" secondaryHref="pricing.html" />
    </main>
  `;
}

function ProductPage() {
  const modules = [
    ["Resume Parser", FileScan, "Extracts name, email, phone, skills, experience, education, company, designation, and projects.", ["Structured candidate profiles", "Cleaner records for recruiters", "Bulk-ready parsing workflow"]],
    ["JD Matching Engine", Target, "Compares resumes with any job description using semantic and weighted matching.", ["Matched and missing skills", "Experience and role context", "Shortlist-ready fit evidence"]],
    ["AI Candidate Score", Gauge, "Weighted scoring based on skills, experience, education, and semantic match.", ["Transparent scoring signals", "Ranked candidate pools", "Consistent role-by-role comparison"]],
    ["Recruiter Evidence Panel", ClipboardCheck, "Explains why a candidate is strong, average, or risky before recruiters decide.", ["Strengths and risk notes", "Decision support for hiring managers", "Clear shortlist recommendations"]]
  ];
  const cards = [
    [Kanban, "Candidate Pipeline", "Applied, Review, Shortlisted, Communication, and Rejected stages."],
    [Files, "Bulk Resume Analyzer", "Upload many resumes and get ranked results quickly."],
    [AreaChart, "Analytics & Insights", "Job-level performance, candidate quality, skill gaps, and source performance."],
    [ShieldCheck, "Enterprise Controls", "Multi-user access, audit logs, database flexibility, and privacy-first architecture."]
  ];

  return html`
    <main>
      <${PageHero} eyebrow="Product platform" title="A complete AI ATS workspace for resume screening and recruitment intelligence." text="HireScore AI combines parsing, matching, scoring, evidence, pipeline control, bulk analysis, and analytics in one modern product experience." visual=${html`<${AppPreview} />`} />
      <section className="section soft">
        <div className="container">
          <${SectionHead} center=${true} eyebrow="Product modules" title="Built for every step of intelligent candidate review." />
          ${modules.map(
            (module) => html`
              <${Reveal} className="module" key=${module[0]}>
                <div>
                  <${IconBox} icon=${module[1]} />
                  <h2>${module[0]}</h2>
                  <p className="muted" style=${{ marginTop: "12px" }}>${module[2]}</p>
                  <ul className="check-list">${module[3].map((item) => html`<li key=${item}><${Check} size=${18} />${item}</li>`)}</ul>
                </div>
                <${AppPreview} />
              </${Reveal}>
            `
          )}
          <div className="grid four" style=${{ marginTop: "22px" }}>${cards.map((item) => html`<${FeatureCard} key=${item[1]} icon=${item[0]} title=${item[1]} text=${item[2]} />`)}</div>
        </div>
      </section>
      <section className="section dark">
        <div className="container grid two" style=${{ alignItems: "start" }}>
          <${Reveal}>
            <${SectionHead} eyebrow="Traditional ATS vs HireScore AI" title="Move from applicant storage to hiring intelligence." text="Traditional systems store candidates. HireScore AI analyzes, explains, ranks, and helps recruiters act." />
          </${Reveal}>
          <${Reveal} className="card">
            <${IconBox} icon=${ShieldCheck} />
            <h3>Security and privacy</h3>
            <p>Candidate data is handled securely. Enterprise customers can discuss custom database options, audit logs, API integrations, and privacy-first architecture.</p>
            <a className="btn btn-primary" href="contact.html" style=${{ marginTop: "18px" }}><${MessageSquare} size=${18} />See HireScore AI in Action</a>
          </${Reveal}>
        </div>
      </section>
      <${CTA} title="See HireScore AI in action." text="Book a product walkthrough built around your recruiting process." primary="Book a Demo" />
    </main>
  `;
}

function PricingPage() {
  const plans = [
    ["Starter", "For small recruiters and early-stage teams", "Contact", "Limited active jobs, Resume parsing, Candidate ranking, Basic dashboard, Email support"],
    ["Growth", "For recruitment agencies and growing HR teams", "Demo", "More active jobs, Bulk resume upload, Advanced scoring, Communication pipeline, Analytics dashboard, Priority support"],
    ["Enterprise", "For large companies and agencies", "Custom", "Custom database option, Multi-user access, Audit logs, Custom workflows, API integrations, Dedicated support"]
  ];
  return html`
    <main>
      <${PageHero} compact=${true} eyebrow="Pricing" title="Plans for every hiring team, from first shortlist to enterprise scale." text="Choose the workflow that fits your hiring volume, team structure, and data architecture." />
      <section className="section soft">
        <div className="container grid three">
          ${plans.map(
            (plan, index) => html`
              <${Reveal} className=${`card pricing-card ${index === 1 ? "featured" : ""}`} key=${plan[0]}>
                ${index === 1 ? html`<span className="tag">Most popular</span>` : null}
                <div><h3>${plan[0]}</h3><p>${plan[1]}</p></div>
                <div className="price">${plan[2]} <small>/ ${index === 2 ? "pricing" : "month"}</small></div>
                <ul className="plan-list">${plan[3].split(", ").map((item) => html`<li key=${item}><${Check} size=${18} />${item}</li>`)}</ul>
                <a className=${`btn ${index === 1 ? "btn-primary" : "btn-soft"}`} href="contact.html"><${index === 2 ? MessageSquare : Layers} size=${18} />${index === 2 ? "Talk to Sales" : "Choose Your Plan"}</a>
              </${Reveal}>
            `
          )}
        </div>
      </section>
      <${FAQ}
        title="Pricing FAQ"
        items=${[
          ["Can I start with a free trial?", "Yes. Contact the team to set up a trial or guided product walkthrough."],
          ["Can I use my own database?", "Enterprise setup can include database flexibility based on your internal requirements."],
          ["Is candidate data secure?", "HireScore AI is designed around secure candidate data handling and privacy-first workflows."],
          ["Can I upload resumes in bulk?", "Yes. Growth and Enterprise workflows support bulk resume analysis."],
          ["Can HireScore AI work for any job role?", "Yes. The JD matching engine evaluates candidates against role-specific requirements."],
          ["Do you support recruitment agencies?", "Yes. Agencies can process high resume volume and present stronger shortlists to clients."]
        ]}
      ></${FAQ}>
      <${CTA} title="Find the right HireScore AI plan." text="Talk to us about your hiring volume and workflow." primary="Choose Your Plan" secondary="Talk to Sales" />
    </main>
  `;
}

function ResourcesPage() {
  const [filter, setFilter] = useState("all");
  const resources = [
    ["blog", "Blog Posts", "How AI Resume Screening Helps Recruiters Save Time", "Learn how AI parsing and ranking reduce manual review without removing recruiter judgment.", "May 28, 2026"],
    ["blog", "Blog Posts", "Why Keyword Matching Is Not Enough in Modern Hiring", "Semantic job fit helps surface candidates with relevant adjacent experience.", "May 22, 2026"],
    ["guide", "Hiring Guides", "How to Rank Candidates Using AI", "A practical guide to candidate scoring, evidence signals, and shortlist workflows.", "May 16, 2026"],
    ["blog", "Blog Posts", "The Future of Recruitment Automation", "What AI recruiting systems can automate and where human judgment still matters most.", "May 8, 2026"],
    ["case", "Case Studies", "How a Recruitment Agency Reduced Resume Screening Time by 70%", "A staffing team used ranked candidate pools and evidence panels to move faster.", "April 18, 2026"],
    ["case", "Case Studies", "How HireScore AI Improved Candidate Matching for a Data Analyst Role", "Semantic matching surfaced candidates with the right analytics depth.", "April 10, 2026"],
    ["launch", "Launch News", "Introducing HireScore AI", "AI-powered candidate ranking for modern recruiters.", "April 2, 2026"],
    ["update", "Product Updates", "New Feature: Bulk Resume Analyzer", "Upload many resumes and get ranked results faster.", "March 28, 2026"],
    ["update", "Product Updates", "New Feature: Recruiter Decision Evidence Panel", "Explain candidate fit with structured evidence.", "March 20, 2026"]
  ];
  const tabs = [["all", "All"], ["blog", "Blog Posts"], ["case", "Case Studies"], ["launch", "Launch News"], ["guide", "Hiring Guides"], ["update", "Product Updates"]];
  const visible = filter === "all" ? resources : resources.filter((item) => item[0] === filter);

  return html`
    <main>
      <${PageHero} compact=${true} eyebrow="Resource hub" title="Hiring Intelligence Resources" text="Educational content, case studies, launch news, hiring guides, and product updates for modern recruiting teams." />
      <section className="section soft">
        <div className="container">
          <div className="tabs">${tabs.map((tab) => html`<button className=${`tab ${filter === tab[0] ? "active" : ""}`} type="button" onClick=${() => setFilter(tab[0])} key=${tab[0]}>${tab[1]}</button>`)}</div>
          <div className="grid three">
            <${AnimatePresence} mode="popLayout">
              ${visible.map(
                (item) => html`
                  <${motion.article}
                    className="card resource-card"
                    key=${item[2]}
                    layout=${true}
                    initial=${{ opacity: 0, y: 14 }}
                    animate=${{ opacity: 1, y: 0 }}
                    exit=${{ opacity: 0, y: 14 }}
                  >
                    <div className="meta"><strong>${item[1]}</strong><span>${item[4]}</span></div>
                    <h3>${item[2]}</h3>
                    <p>${item[3]}</p>
                    <a className="btn btn-soft" href="#"><${BookOpen} size=${18} />Read More</a>
                  </${motion.article}>
                `
              )}
            </${AnimatePresence}>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container newsletter">
          <div><h2>Get smarter hiring insights in your inbox.</h2><p className="muted">Receive product updates, hiring guides, and AI recruiting ideas.</p></div>
          <${SignupForm} label="Subscribe" />
        </div>
      </section>
      <${CTA} title="Explore HireScore AI." text="Turn hiring resources into faster recruiter workflows." primary="Explore Product" primaryHref="product.html" />
    </main>
  `;
}

function ContactPage() {
  return html`
    <main>
      <${PageHero} compact=${true} eyebrow="Contact HireScore AI" title="Let's transform your hiring workflow." text="Book a product demo, discuss pricing, ask product questions, or explore enterprise setup." />
      <section className="section soft">
        <div className="container contact-layout">
          <${Reveal} className="card">
            <${SectionHead} eyebrow="Book a demo" title="Tell us about your hiring workflow." />
            <${ContactForm} />
          </${Reveal}>
          <${Reveal} className="card">
            <h2>How can we help?</h2>
            ${[
              [CalendarCheck, "Book a demo", "See candidate scoring and ranking live."],
              [BriefcaseBusiness, "Talk to sales", "Discuss plans, team size, and rollout."],
              [Mail, "Product support", "Get help with setup or workflows."],
              [Handshake, "Partnership inquiry", "Explore agency or integration opportunities."]
            ].map((item) => html`<a className="contact-option" href="#" key=${item[1]}><${IconBox} icon=${item[0]} /><span><strong>${item[1]}</strong><br /><span className="muted">${item[2]}</span></span></a>`)}
          </${Reveal}>
        </div>
      </section>
      <${FAQ}
        title="Contact FAQ"
        items=${[
          ["How does HireScore AI score candidates?", "It evaluates skills, experience, education, semantic matching, and recruiter-visible evidence."],
          ["Can it work for different job roles?", "Yes. The platform compares candidates to each job description and role context."],
          ["Is it suitable for recruitment agencies?", "Yes. Agencies can process high candidate volume and improve client shortlists."],
          ["Can we integrate it with our existing system?", "Enterprise plans can discuss custom workflows and API integrations."],
          ["Can we use our own database?", "Enterprise setup can include database flexibility for internal architecture requirements."]
        ]}
      ></${FAQ}>
      <${CTA} title="Schedule a demo." text="Bring AI-powered confidence to your next shortlist." primary="Schedule a Demo" />
    </main>
  `;
}

function PageHero({ eyebrow, title, text, visual, compact = false }) {
  return html`
    <section className="page-hero">
      <div className=${`container page-hero-inner ${compact ? "compact" : ""}`}>
        <${Reveal} className="hero-copy">
          <p className="eyebrow"><span className="dot"></span>${eyebrow}</p>
          <h1>${title}</h1>
          <p className="lead">${text}</p>
          <div className="actions"><a className="btn btn-primary" href="contact.html"><${CalendarCheck} size=${18} />Book a Demo</a><a className="btn btn-dark" href="product.html"><${ArrowRight} size=${18} />Explore Product</a></div>
        </${Reveal}>
        ${visual ? html`<${Reveal}>${visual}</${Reveal}>` : html`<${Reveal}><${HeroDashboard} /></${Reveal}>`}
      </div>
    </section>
  `;
}

function FAQ({ title, items }) {
  const [open, setOpen] = useState(0);
  return html`
    <section className="section">
      <div className="container">
        <${SectionHead} center=${true} eyebrow="FAQ" title=${title} />
        <div className="faq">
          ${items.map(
            (item, index) => html`
              <div className="faq-item" key=${item[0]}>
                <button className="faq-q" type="button" aria-expanded=${open === index} onClick=${() => setOpen(open === index ? -1 : index)}>
                  ${item[0]} <${open === index ? Minus : Plus} size=${18} />
                </button>
                <${AnimatePresence}>
                  ${open === index ? html`<${motion.div} className="faq-a" initial=${{ height: 0, opacity: 0 }} animate=${{ height: "auto", opacity: 1 }} exit=${{ height: 0, opacity: 0 }}>${item[1]}</${motion.div}>` : null}
                </${AnimatePresence}>
              </div>
            `
          )}
        </div>
      </div>
    </section>
  `;
}

function SignupForm({ label }) {
  const [message, setMessage] = useState("");
  return html`
    <form onSubmit=${(event) => { event.preventDefault(); setMessage("Thanks. Your request is captured for this demo site."); event.currentTarget.reset(); }}>
      <input type="email" placeholder="Work email" aria-label="Work email" required />
      <button className="btn btn-primary" type="submit"><${Send} size=${18} />${label}</button>
      ${message ? html`<span className="muted">${message}</span>` : null}
    </form>
  `;
}

function ContactForm() {
  const [message, setMessage] = useState("");
  return html`
    <form className="form" onSubmit=${(event) => { event.preventDefault(); setMessage("Thanks. Your demo request is captured for this demo site."); event.currentTarget.reset(); }}>
      <div className="form-grid">
        ${[
          ["Full Name", "text"],
          ["Work Email", "email"],
          ["Company Name", "text"],
          ["Phone Number", "tel"]
        ].map((field) => html`<label className="field" key=${field[0]}>${field[0]}<input type=${field[1]} required=${field[0] !== "Phone Number"} /></label>`)}
        <label className="field">Company Size<select><option>1-10</option><option>11-50</option><option>51-200</option><option>201-1000</option><option>1000+</option></select></label>
        <label className="field">I am interested in<select><option>Demo</option><option>Pricing</option><option>Partnership</option><option>Support</option><option>Enterprise Setup</option></select></label>
        <label className="field full">Message<textarea placeholder="Share your hiring volume, current process, or questions."></textarea></label>
      </div>
      <button className="btn btn-primary" type="submit"><${Send} size=${18} />Schedule a Demo</button>
      ${message ? html`<span className="muted">${message}</span>` : null}
    </form>
  `;
}

function CTA({ title, text, primary, primaryHref = "contact.html", secondary, secondaryHref = "contact.html" }) {
  return html`
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow"><span className="dot"></span>HireScore AI</p>
          <h2>${title}</h2>
          <p className="lead">${text}</p>
        </div>
        <div className="actions">
          <a className="btn btn-primary" href=${primaryHref}><${CalendarCheck} size=${18} />${primary}</a>
          ${secondary ? html`<a className="btn btn-dark" href=${secondaryHref}><${ArrowRight} size=${18} />${secondary}</a>` : null}
        </div>
      </div>
    </section>
  `;
}

function Footer() {
  return html`
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <a className="brand" href="index.html"><span className="brand-mark"><${ScanSearch} size=${23} /></span><span>HireScore AI</span></a>
          <p>AI ATS and recruitment intelligence for faster, evidence-backed hiring decisions.</p>
          <div className="social"><a href="#" aria-label="LinkedIn"><${Globe} size=${18} /></a><a href="#" aria-label="Twitter"><${Share2} size=${18} /></a><a href="#" aria-label="YouTube"><${RadioTower} size=${18} /></a></div>
        </div>
        <div className="footer-col"><h3>Product</h3><a href="product.html">Resume Parser</a><a href="product.html">JD Matching</a><a href="product.html">Candidate Ranking</a><a href="product.html">Analytics</a></div>
        <div className="footer-col"><h3>Company</h3><a href="contact.html">Contact Us</a><a href="pricing.html">Pricing</a><a href="contact.html">Book a Demo</a><a href="contact.html">Partnerships</a></div>
        <div className="footer-col"><h3>Resources</h3><a href="resources.html">Blog Posts</a><a href="resources.html">Case Studies</a><a href="resources.html">Launch News</a><a href="resources.html">Hiring Guides</a></div>
        <div className="footer-col"><h3>Contact</h3><p>sales@hirescore.ai</p><p>support@hirescore.ai</p><p>Built for recruiters, HR teams, and agencies.</p></div>
      </div>
      <div className="container footer-bottom"><span>Copyright 2026 HireScore AI. All rights reserved.</span><span>Privacy-first recruitment intelligence.</span></div>
    </footer>
  `;
}

function App() {
  const route = currentRoute();
  React.useEffect(() => {
    document.title = pageMeta[route][0];
  }, [route]);

  const Page = useMemo(() => ({
    home: HomePage,
    product: ProductPage,
    pricing: PricingPage,
    resources: ResourcesPage,
    contact: ContactPage
  })[route], [route]);

  return html`
    <div className="app">
      <${Nav} route=${route} />
      <${Page} />
      <${Footer} />
    </div>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
