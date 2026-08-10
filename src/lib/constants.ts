import type { ServiceKey } from "./score-engine";

export { type ServiceKey };

export interface Comparison {
  before: string;
  after: string;
}

export interface Service {
  key: ServiceKey;
  label: string;
  shortLabel: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  icon: string;
  category: "programme" | "service";
  before: string;
  after: string;
  comparisons: Comparison[];
}

export const SERVICES: Record<ServiceKey, Service> = {
  mentoring: {
    key: "mentoring",
    label: "1:1 Mentoring",
    shortLabel: "Mentoring",
    description:
      "Personalised guidance to help you and your team adopt AI effectively. Weekly sessions tailored to your pace and goals.",
    ctaLabel: "Book a Mentoring Call",
    ctaHref: "https://aipowered.xyz/contact",
    icon: "\ud83e\udde0",
    category: "programme",
    before: "AI feels fragmented and difficult to apply consistently.",
    after: "Clear, personalised AI workflows you can use with confidence.",
    comparisons: [
      { before: "Unclear AI strategy", after: "Personalised AI roadmap" },
      { before: "Learning alone with YouTube", after: "Weekly expert 1:1 sessions" },
      { before: "Can't measure AI impact", after: "Trackable skill progression" },
      { before: "Ad-hoc AI usage", after: "Consistent AI workflows" },
      { before: "Guesswork with tools", after: "Proven tool stack & methods" },
      { before: "No accountability", after: "Dedicated mentor & peer group" },
    ],
  },
  claude: {
    key: "claude",
    label: "Claude Programme",
    shortLabel: "Claude",
    description:
      "A structured 6-week cohort programme to master AI tools and workflows. Hands-on learning with proven frameworks.",
    ctaLabel: "Join Claude Programme",
    ctaHref: "https://aipowered.xyz/programmes/claude",
    icon: "\ud83c\udf93",
    category: "programme",
    before: "Low confidence with Claude and inconsistent prompting.",
    after: "Strong Claude prompting skills and repeatable AI workflows.",
    comparisons: [
      { before: "Basic Claude prompting", after: "Advanced prompt engineering" },
      { before: "Trial-and-error approach", after: "Structured learning path" },
      { before: "Working in isolation", after: "Cohort of 15+ peers" },
      { before: "One-off AI experiments", after: "Repeatable AI processes" },
      { before: "No integration know-how", after: "Claude-to-tools workflows" },
      { before: "Guess if AI is suitable", after: "Know when & how to deploy AI" },
    ],
  },
  website: {
    key: "website",
    label: "Website Development",
    shortLabel: "Website",
    description:
      "Custom, high-performance websites that convert. From landing pages to full platforms — built fast and optimised for growth.",
    ctaLabel: "Start Your Website",
    ctaHref: "https://aipowered.xyz/solutions#website",
    icon: "\ud83d\udcbb",
    category: "service",
    before: "A website that does not clearly communicate your value.",
    after: "A focused, high-performing website built to convert.",
    comparisons: [
      { before: "Slow page loads", after: "Sub-2 second load times" },
      { before: "Not mobile-friendly", after: "Flawless on every device" },
      { before: "Confusing navigation", after: "Clear, intuitive UX" },
      { before: "Low conversion rates", after: "Optimised conversion paths" },
      { before: "Hard to update content", after: "Easy self-service CMS" },
      { before: "Poor SEO visibility", after: "First-page search rankings" },
    ],
  },
  marketing: {
    key: "marketing",
    label: "Digital Marketing",
    shortLabel: "Marketing",
    description:
      "AI-powered marketing strategies, content systems, and paid ad management to scale your reach and revenue.",
    ctaLabel: "Grow with Marketing",
    ctaHref: "https://aipowered.xyz/solutions#marketing",
    icon: "\ud83d\udcc8",
    category: "service",
    before: "Marketing activity without a reliable growth system.",
    after: "A measurable marketing engine that attracts better leads.",
    comparisons: [
      { before: "Random social posting", after: "Strategic content calendar" },
      { before: "Can't attribute results", after: "Full funnel analytics" },
      { before: "Low-quality leads", after: "Qualified lead generation" },
      { before: "No email automation", after: "Automated nurture sequences" },
      { before: "Wasted ad spend", after: "ROI-positive campaigns" },
      { before: "DIY trial and error", after: "Expert-led strategy sessions" },
    ],
  },
  crm: {
    key: "crm",
    label: "CRM & Sales Workflows",
    shortLabel: "CRM",
    description:
      "Streamline your sales pipeline with intelligent CRM setups, automated follow-ups, and customer journey mapping.",
    ctaLabel: "Optimise Your CRM",
    ctaHref: "https://aipowered.xyz/solutions#crm",
    icon: "\ud83d\udd04",
    category: "service",
    before: "Manual follow-ups, scattered information, and missed opportunities.",
    after: "A clear pipeline with automated customer journeys and follow-ups.",
    comparisons: [
      { before: "Leads fall through cracks", after: "Automated pipeline tracking" },
      { before: "Data spread across tools", after: "Centralised customer view" },
      { before: "Manual follow-ups", after: "Triggered email & SMS flows" },
      { before: "No deal visibility", after: "Real-time pipeline dashboard" },
      { before: "Inconsistent sales process", after: "Standardised playbook" },
      { before: "Guessing customer needs", after: "Data-driven insights" },
    ],
  },
  automations: {
    key: "automations",
    label: "AI Automations & Builds",
    shortLabel: "AI Automations",
    description:
      "Custom AI agents, workflow automations, and integrations that save hours every week and eliminate manual busywork.",
    ctaLabel: "Build Your AI",
    ctaHref: "https://aipowered.xyz/solutions#ai-automations",
    icon: "\ud83e\udd16",
    category: "service",
    before: "Hours lost to repetitive manual work every week.",
    after: "Connected AI automations that remove busywork from your team.",
    comparisons: [
      { before: "Manual data entry", after: "Auto-synced across tools" },
      { before: "Emails typed one by one", after: "AI-personalised at scale" },
      { before: "Reporting takes hours", after: "Instant dashboards" },
      { before: "Repetitive admin tasks", after: "Fully automated workflows" },
      { before: "Siloed business tools", after: "Connected tool ecosystem" },
      { before: "Reactive problem-solving", after: "Proactive AI alerts" },
    ],
  },
};

export interface Program {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: string;
}

export const PROGRAMS: Program[] = [
  {
    key: "claude",
    label: "Claude Programme",
    description: "A practical 6-week programme for confident Claude prompting and AI workflows.",
    href: "https://aipowered.xyz/programmes/claude",
    icon: "\ud83c\udf93",
  },
  {
    key: "microsoft-365",
    label: "Microsoft 365 Programme",
    description: "Build smarter team systems with Copilot, Microsoft 365, and connected workflows.",
    href: "https://aipowered.xyz/programmes/microsoft",
    icon: "\u25c8",
  },
  {
    key: "company-programme",
    label: "Company AI Programme",
    description: "A tailored team programme to make AI useful, safe, and repeatable across your organisation.",
    href: "https://aipowered.xyz/programmes/ai-future-leaders",
    icon: "\u2726",
  },
];

export interface InterstitialData {
  quote: string;
  author?: string;
  fact?: string;
}

export const INTERSTITIALS: Record<number, InterstitialData> = {
  3: {
    quote: "AI will not replace you. A person using AI will.",
    author: "Ross Halomoan",
    fact: "Companies using AI-powered marketing see an average 32% increase in lead conversion.",
  },
  7: {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    fact: "Businesses that automate workflows save an average of 10 hours per employee per week.",
  },
};

/* =========================================================================
   QUESTION DATA — 3 phases: Role, Skill Assessment, Goals & Fit
   ========================================================================= */

export type QuestionType = "radio" | "text";
export type QuestionCategory = "phase1" | "phase2" | "phase3";

export interface Question {
  id: number;
  category: QuestionCategory;
  domain?: string;
  question: string;
  subtitle?: string;
  type: QuestionType;
  options: QuestionOption[];
  inputType?: string;
  placeholder?: string;
}

export interface QuestionOption {
  label: string;
  value: string;
  score?: number;
  description?: string;
}

export const QUESTIONS: Question[] = [
  // ────────── PHASE 1: About You (Q1-3) ──────────
  {
    id: 1,
    category: "phase1",
    question: "What best describes your role?",
    type: "radio",
    options: [
      { label: "Founder / Owner", value: "founder" },
      { label: "Executive / C-Suite", value: "executive" },
      { label: "Manager / Team Lead", value: "manager" },
      { label: "Individual Contributor", value: "ic" },
      { label: "Student / Learner", value: "student" },
      { label: "Freelancer / Solopreneur", value: "freelancer" },
    ],
  },
  {
    id: 2,
    category: "phase1",
    question: "How many people are in your team or company?",
    type: "radio",
    options: [
      { label: "Just me", value: "solo" },
      { label: "2 – 5 people", value: "2-5" },
      { label: "6 – 20 people", value: "6-20" },
      { label: "21 – 50 people", value: "21-50" },
      { label: "50+ people", value: "50-plus" },
    ],
  },
  {
    id: 3,
    category: "phase1",
    question: "How would you rate your current AI usage?",
    type: "radio",
    options: [
      { label: "Beginner — just starting out", value: "beginner" },
      { label: "Casual — use AI occasionally", value: "casual" },
      { label: "Daily user — AI is part of my workflow", value: "daily" },
      { label: "Builder — I use APIs and tools", value: "builder" },
      { label: "Advanced — already scaling AI", value: "advanced" },
    ],
  },

  // ────────── PHASE 2: AI Skill Assessment (Q4-11, 8 questions) ──────────
  // Domain: prompt_style (Q4-5)
  {
    id: 4,
    category: "phase2",
    domain: "prompt_style",
    question: "When I open an AI tool, I usually...",
    type: "radio",
    options: [
      { label: "Type a quick question like it's Google", value: "google", score: 1 },
      { label: "Add a sentence or two of context", value: "context", score: 3 },
      { label: "Write a proper prompt with role and goal", value: "prompt", score: 5 },
      { label: "Run from templates with Memory dialled in", value: "templates", score: 8 },
    ],
  },
  {
    id: 5,
    category: "phase2",
    domain: "prompt_style",
    question: "My prompts and custom instructions are...",
    type: "radio",
    options: [
      { label: "Barely customised — I use defaults", value: "defaults", score: 1 },
      { label: "I tweak the tone or length sometimes", value: "tweak", score: 3 },
      { label: "I have custom instructions saved for different tasks", value: "saved", score: 5 },
      { label: "Fully dialled in with tone, structure, and output format", value: "dialled", score: 8 },
    ],
  },

  // Domain: create_build (Q6-7)
  {
    id: 6,
    category: "phase2",
    domain: "create_build",
    question: "The last thing I built with AI was...",
    type: "radio",
    options: [
      { label: "A document or a simple email", value: "document", score: 1 },
      { label: "A no-code automation or workflow", value: "nocode", score: 3 },
      { label: "A landing page or web app", value: "page", score: 5 },
      { label: "An app or dashboard, deployed live", value: "deployed", score: 8 },
    ],
  },
  {
    id: 7,
    category: "phase2",
    domain: "create_build",
    question: "When I produce docs, decks, or content with AI...",
    type: "radio",
    options: [
      { label: "Feels slower than doing it myself", value: "slower", score: 1 },
      { label: "Takes hours, lots of editing needed", value: "edits", score: 3 },
      { label: "Much faster, but I still tweak final output", value: "faster", score: 5 },
      { label: "Ships immediately — polished and ready", value: "ships", score: 8 },
    ],
  },

  // Domain: connect_integrate (Q8-9)
  {
    id: 8,
    category: "phase2",
    domain: "connect_integrate",
    question: "With AI and my other tools (email, drive, calendar)...",
    type: "radio",
    options: [
      { label: "I copy-paste between them", value: "copypaste", score: 1 },
      { label: "I've connected one or two", value: "connected", score: 3 },
      { label: "I have several connectors running", value: "several", score: 5 },
      { label: "AI is the hub — everything flows through it", value: "hub", score: 8 },
    ],
  },
  {
    id: 9,
    category: "phase2",
    domain: "connect_integrate",
    question: "When something happens in another tool, AI...",
    type: "radio",
    options: [
      { label: "Has no idea", value: "noidea", score: 1 },
      { label: "Only knows if I tell it", value: "tell", score: 3 },
      { label: "Picks it up for some setups", value: "picks", score: 5 },
      { label: "Reacts automatically every time", value: "auto", score: 8 },
    ],
  },

  // Domain: automate_command (Q10-11)
  {
    id: 10,
    category: "phase2",
    domain: "automate_command",
    question: "With agents and automations, I...",
    type: "radio",
    options: [
      { label: "Haven't used them — not sure what they are", value: "noagent", score: 1 },
      { label: "I've tried a scheduled task or simple automation", value: "scheduled", score: 3 },
      { label: "I run several automations on a schedule", value: "severalauto", score: 5 },
      { label: "I run agentic workflows that operate while I sleep", value: "agentic", score: 8 },
    ],
  },
  {
    id: 11,
    category: "phase2",
    domain: "automate_command",
    question: "My repeatable workflows and scheduled tasks are...",
    type: "radio",
    options: [
      { label: "Non-existent — I do everything manually", value: "none", score: 1 },
      { label: "A few one-off automations I set up", value: "oneoff", score: 3 },
      { label: "A system of tasks that run on their own", value: "system", score: 5 },
      { label: "A full command centre with live agents and plugins", value: "full", score: 8 },
    ],
  },

  // ────────── PHASE 3: Goals & Fit (Q12) ──────────
  {
    id: 12,
    category: "phase3",
    question: "What do you most want AI to help with right now?",
    subtitle: "Your recommendation will be tuned around this.",
    type: "radio",
    options: [
      { label: "Generate more leads or sales", value: "leads" },
      { label: "Create content better and faster", value: "content" },
      { label: "Streamline operations and admin", value: "ops" },
      { label: "Learn AI skills and upskill my team", value: "learn" },
      { label: "Get a website or digital presence built", value: "website" },
      { label: "Not sure — I need guidance", value: "guidance" },
    ],
  },
];

/* =========================================================================
   DOMAINS — 4 domain groups (2 Claude reference levels merged into each)
   ========================================================================= */

export interface Domain {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const DOMAINS: Domain[] = [
  {
    id: "prompt_style",
    label: "Prompt & Style",
    shortLabel: "Prompting",
    description: "How well you direct AI with prompts, context, and custom instructions.",
  },
  {
    id: "create_build",
    label: "Create & Build",
    shortLabel: "Building",
    description: "Your ability to produce polished artifacts, apps, and deployed output with AI.",
  },
  {
    id: "connect_integrate",
    label: "Connect & Integrate",
    shortLabel: "Integrating",
    description: "How you connect AI to your tools, data, and workflows.",
  },
  {
    id: "automate_command",
    label: "Automate & Command",
    shortLabel: "Automating",
    description: "Your use of agents, scheduled tasks, and hands-free workflows.",
  },
];

/* =========================================================================
   TIER BAND DEFINITIONS
   ========================================================================= */

export const TIER_BANDS = {
  beginner:    { id: "beginner",    label: "Beginner",    min: 0,  max: 25, color: "#FF8C8C" },
  developing:  { id: "developing",  label: "Developing",  min: 26, max: 50, color: "#FFC078" },
  proficient:  { id: "proficient",  label: "Proficient",  min: 51, max: 75, color: "#B8C5D6" },
  expert:      { id: "expert",      label: "Expert",      min: 76, max: 100, color: "#4ADE80" },
} as const;

export type TierKey = keyof typeof TIER_BANDS;

/* =========================================================================
   DOMAIN COMMENTARY — what each tier means per domain
   ========================================================================= */

export const DOMAIN_COMMENTARY: Record<string, Record<TierKey, string>> = {
  prompt_style: {
    beginner:   "You're using AI like a search engine. Structuring prompts with role, context, and specific output formats will be a game-changer for you.",
    developing: "You're adding context, which is great. The next step is making prompts reusable with templates, Projects, and Memory.",
    proficient: "Your prompting is solid and structured. The unlock now is encoding your voice, tone, and standards into custom instructions so AI works to your spec every time.",
    expert:     "You direct AI with precision. Templates, custom instructions, and Memory are fully dialled in. Every conversation ships work.",
  },
  create_build: {
    beginner:   "You're still producing content the manual way. AI can produce the artifact itself — not just the words, but the full deliverable.",
    developing: "You're drafting with AI but finishing elsewhere. The leap is producing branded, structured output directly from AI.",
    proficient: "You're shipping fast. Now build reusable Skills that generate ready-to-ship artifacts on demand. No more starting from blank.",
    expert:     "You ship in minutes what used to take a weekend. From docs to deployed apps — all produced by your AI workflow.",
  },
  connect_integrate: {
    beginner:   "AI is on its own island, disconnected from your tools. The first integration will save you hours of copy-pasting every week.",
    developing: "A few connectors are live. The compound comes when your main tools all feed context into AI automatically.",
    proficient: "AI reads across your stack. The next move: automatic triggers so AI reacts the moment things happen in other tools.",
    expert:     "AI is the hub of your workflow. Every tool feeds it, every action runs through it. Triggers are fully wired.",
  },
  automate_command: {
    beginner:   "Everything you do, you do manually. Recurring work eats your week. Even one scheduled automation will free up hours.",
    developing: "You've tasted automation with a few tasks. Now build a stack of scheduled agents that run whether you're at your desk or not.",
    proficient: "You have agents running on schedule. The next level is wiring Skills, plugins, and agents into one coherent system that compounds week after week.",
    expert:     "AI works for you now. Agents on schedules, Skills firing, plugins talking. Work ships while you sleep.",
  },
};

/* =========================================================================
   OVERALL COMMENTARY
   ========================================================================= */

export const OVERALL_COMMENTARY: Record<TierKey, string> = {
  beginner:   "You're at the start of your AI journey — and that's exciting. The gap is wide open, which means every bit of progress you make will feel like a superpower. Start with structured prompting and one automation.",
  developing: "You're in the game and seeing real value from AI. But you're still missing a lot of what's possible. Focus on making your workflows repeatable and connecting your tools.",
  proficient: "You've built a system that works. Your AI skills are strong across the board. The next level is about removing yourself from the loop — agents, triggers, and full command centre.",
  expert:     "You're operating at the top of the stack. You've done what most haven't. Now it's about compounding — turning your skill into income, systems, and leverage that grows without you.",
};
