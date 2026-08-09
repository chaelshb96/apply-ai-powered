export type ServiceKey =
  | "mentoring"
  | "claude"
  | "website"
  | "marketing"
  | "crm"
  | "automations";

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
    icon: "🧠",
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
    icon: "🎓",
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
    icon: "💻",
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
    icon: "📈",
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
    icon: "🔄",
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
    icon: "🤖",
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

export interface Programme {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: string;
}

export const PROGRAMMES: Programme[] = [
  {
    key: "claude",
    label: "Claude Programme",
    description: "A practical 6-week programme for confident Claude prompting and AI workflows.",
    href: "https://aipowered.xyz/programmes/claude",
    icon: "🎓",
  },
  {
    key: "microsoft-365",
    label: "Microsoft 365 Programme",
    description: "Build smarter team systems with Copilot, Microsoft 365, and connected workflows.",
    href: "https://aipowered.xyz/programmes/microsoft",
    icon: "◈",
  },
  {
    key: "company-programme",
    label: "Company AI Programme",
    description: "A tailored team programme to make AI useful, safe, and repeatable across your organisation.",
    href: "https://aipowered.xyz/programmes/ai-future-leaders",
    icon: "✦",
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

export interface Question {
  id: number;
  question: string;
  subtitle?: string;
  type: "radio" | "select" | "text";
  options: QuestionOption[];
  inputType?: string;
  placeholder?: string;
}

export interface QuestionOption {
  label: string;
  value: string;
  description?: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
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
    question: "What's your primary goal right now?",
    subtitle: "Pick the one that matters most.",
    type: "radio",
    options: [
      { label: "Grow my business", value: "grow-business", description: "Scale revenue, team, or operations" },
      { label: "Build or improve my website", value: "build-website", description: "New site or redesign" },
      { label: "Learn AI tools & skills", value: "learn-ai", description: "Hands-on learning and upskilling" },
      { label: "Automate workflows", value: "automate", description: "Save time with AI and automations" },
      { label: "Get more customers", value: "get-customers", description: "Marketing, leads, and sales systems" },
      { label: "I need guidance", value: "need-guidance", description: "Not sure where to start, need a partner" },
    ],
  },
  {
    id: 3,
    question: "How many people are in your team?",
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
    id: 4,
    question: "How would you rate your AI knowledge?",
    type: "radio",
    options: [
      { label: "Beginner — just starting out", value: "beginner" },
      { label: "Casual — use ChatGPT sometimes", value: "casual" },
      { label: "Daily user — AI is part of my workflow", value: "daily" },
      { label: "Builder — I use APIs and tools", value: "builder" },
      { label: "Advanced — already scaling AI", value: "advanced" },
    ],
  },
  {
    id: 5,
    question: "What's your approximate budget range?",
    type: "radio",
    options: [
      { label: "Under £250", value: "under-250" },
      { label: "£250 – £1,000", value: "250-1k" },
      { label: "£1,000 – £5,000", value: "1k-5k" },
      { label: "£5,000 – £15,000", value: "5k-15k" },
      { label: "£15,000 – £50,000", value: "15k-50k" },
      { label: "£50,000+", value: "50k-plus" },
      { label: "Prefer not to say", value: "unspecified" },
    ],
  },
  {
    id: 6,
    question: "How soon do you need results?",
    type: "radio",
    options: [
      { label: "This month", value: "this-month" },
      { label: "Within 3 months", value: "3-months" },
      { label: "Within 6 months", value: "6-months" },
      { label: "No rush — exploring options", value: "no-rush" },
      { label: "Not sure yet", value: "not-sure" },
    ],
  },
  {
    id: 7,
    question: "Do you currently have a website?",
    type: "radio",
    options: [
      { label: "No, I need one built", value: "need-website" },
      { label: "Yes, but it needs a redesign", value: "need-redesign" },
      { label: "Yes, it works well for me", value: "works-well" },
      { label: "I have one but it doesn't generate results", value: "no-results" },
    ],
  },
  {
    id: 8,
    question: "How do you get customers today?",
    type: "radio",
    options: [
      { label: "Referrals / word of mouth", value: "referrals" },
      { label: "Social media", value: "social-media" },
      { label: "Paid advertising", value: "paid-ads" },
      { label: "Email outreach", value: "email" },
      { label: "No system — it's random", value: "no-system" },
      { label: "Not applicable", value: "na" },
    ],
  },
  {
    id: 9,
    question: "How do you manage your sales or client process?",
    type: "radio",
    options: [
      { label: "Spreadsheets / manual tracking", value: "spreadsheets" },
      { label: "Basic CRM or pipeline tool", value: "basic-crm" },
      { label: "Advanced CRM with automations", value: "advanced-crm" },
      { label: "It's chaotic — no real system", value: "chaotic" },
      { label: "Not applicable", value: "na" },
    ],
  },
  {
    id: 10,
    question: "What's your preferred way to learn or work?",
    type: "radio",
    options: [
      { label: "Structured programme with a cohort", value: "structured" },
      { label: "1:1 personalised guidance", value: "one-on-one" },
      { label: "Done-for-me — I want experts to handle it", value: "done-for-me" },
      { label: "Hybrid — mix of learning and done-for-me", value: "hybrid" },
      { label: "I want a long-term partner", value: "partner" },
    ],
  },
];
