export type TrackKey = "a" | "b" | "c";
export type IconKey =
  | "owner"
  | "side"
  | "team"
  | "founder"
  | "consultant"
  | "freelancer"
  | "creative"
  | "none";

export type QuestionType = "single" | "multi";

export interface TrackWeight {
  a?: number;
  b?: number;
  c?: number;
}

export interface QuestionOption {
  label: string;
  value: string;
  tracks?: TrackWeight;
  icon?: IconKey;
  logos?: string[];
}

export interface Question {
  id: string;
  number: number | null;
  prompt: string;
  subtitle?: string;
  type: QuestionType;
  options: QuestionOption[];
}

export interface Beat {
  id: string;
  tag: string;
  title: string;
  body: string;
}

export type ScreenKind = "intro" | "question" | "beat" | "capture";

export interface FlowScreen {
  id: string;
  kind: ScreenKind;
  questionId?: string;
  beatId?: string;
}

export const CONTACT_HREF = "https://aipowered.xyz/contact";
export const QUIZ_MAX_WIDTH_CLASS = "max-w-[720px]";

export const INTRO = {
  eyebrow: "Before we start",
  title: "Let's find out where you're at on your AI journey.",
  body: "A few quick questions, then I'll build your plan.",
  cta: "Let's go",
};

export const TRACKS: Record<
  TrackKey,
  {
    key: TrackKey;
    badge: string;
    title: string;
    programme: string;
    who: string;
    ctaLabel: string;
    ctaHref: string;
    programmeHref: string;
    programmeCta: string;
  }
> = {
  a: {
    key: "a",
    badge: "Track A",
    title: "The Starting Line",
    programme: "Claude Accelerator, six weeks",
    who: "You are not technical, you do not have a system yet, and AI is still a side habit.",
    ctaLabel: "Book a discovery call",
    ctaHref: CONTACT_HREF,
    programmeHref: "https://aipowered.xyz/programmes/claude",
    programmeCta: "See the programme",
  },
  b: {
    key: "b",
    badge: "Track B",
    title: "The Operator",
    programme: "Productize Yourself with Claude and GoHighLevel",
    who: "You already use AI most days. You have an offer. You want to sell it and stop running it by hand.",
    ctaLabel: "Book a discovery call",
    ctaHref: CONTACT_HREF,
    programmeHref: "https://aipowered.xyz/programmes/claude",
    programmeCta: "See the programme",
  },
  c: {
    key: "c",
    badge: "Track C",
    title: "The Multiplier",
    programme: "Claude for Leaders and Teams",
    who: "You have a team of three or more, and you want the whole company using this, not just you.",
    ctaLabel: "Book a discovery call",
    ctaHref: CONTACT_HREF,
    programmeHref: "https://aipowered.xyz/programmes/ai-future-leaders",
    programmeCta: "See the programme",
  },
};

export const QUESTIONS: Record<string, Question> = {
  entry: {
    id: "entry",
    number: null,
    prompt: "Which one sounds most like you right now?",
    subtitle: "Start here. We will talk to you the way you actually work.",
    type: "single",
    options: [
      { label: "I run my own business", value: "owner", icon: "owner", tracks: { a: 1, b: 1 } },
      { label: "Building on the side", value: "side", icon: "side", tracks: { a: 2 } },
      { label: "I lead a team", value: "team", icon: "team", tracks: { c: 2 } },
    ],
  },
  q01: {
    id: "q01",
    number: 1,
    prompt: "What best describes what you do?",
    type: "single",
    options: [
      { label: "Founder or business owner", value: "founder", icon: "founder", tracks: { a: 1, b: 1 } },
      { label: "Consultant or coach", value: "consultant", icon: "consultant", tracks: { b: 2 } },
      { label: "Freelancer or agency", value: "freelancer", icon: "freelancer", tracks: { b: 2 } },
      { label: "Creative or media", value: "creative", icon: "creative", tracks: { a: 1 } },
      { label: "Leading a team", value: "leading-team", icon: "team", tracks: { c: 2 } },
    ],
  },
  q02: {
    id: "q02",
    number: 2,
    prompt: "Where's the business at right now?",
    type: "single",
    options: [
      { label: "Idea stage", value: "idea", tracks: { a: 2 } },
      { label: "Just launched", value: "launched", tracks: { a: 2 } },
      { label: "Steady, want to grow", value: "steady", tracks: { a: 1, b: 1 } },
      { label: "Established, want to scale", value: "scale", tracks: { b: 2 } },
      { label: "Inside a company", value: "company", tracks: { c: 2 } },
    ],
  },
  q03: {
    id: "q03",
    number: 3,
    prompt: "Who's actually in it with you?",
    type: "single",
    options: [
      { label: "Just me", value: "solo", tracks: { a: 2 } },
      { label: "Me plus freelancers", value: "freelancers", tracks: { a: 1, b: 1 } },
      { label: "Team of 3 to 10", value: "team-3-10", tracks: { c: 2 } },
      { label: "Team of 10+", value: "team-10", tracks: { c: 3 } },
    ],
  },
  q04: {
    id: "q04",
    number: 4,
    prompt: "What would make the biggest difference in the next 90 days?",
    type: "single",
    options: [
      { label: "Getting my time back", value: "time", tracks: { a: 2 } },
      { label: "More leads and sales", value: "leads", tracks: { b: 2 } },
      { label: "Launching the stuck thing", value: "launch", tracks: { a: 2, b: 1 } },
      { label: "Delivering without hiring", value: "deliver", tracks: { b: 1, c: 1 } },
      { label: "Chaos into a system", value: "system", tracks: { b: 1, c: 1 } },
      { label: "Automating the repetitive stuff", value: "automate", tracks: { a: 1, c: 1 } },
    ],
  },
  q05: {
    id: "q05",
    number: 5,
    prompt: "Where does most of your week actually go?",
    type: "single",
    options: [
      { label: "Admin and inbox", value: "admin", tracks: { a: 1 } },
      { label: "Making content", value: "content", tracks: { a: 1 } },
      { label: "Client delivery", value: "delivery", tracks: { b: 1 } },
      { label: "Sales and follow-up", value: "sales", tracks: { b: 1 } },
      { label: "Repetitive daily tasks", value: "repetitive", tracks: { a: 1 } },
      { label: "Whatever's on fire", value: "fire", tracks: { a: 1 } },
    ],
  },
  q06: {
    id: "q06",
    number: 6,
    prompt: "How many hours a week go on admin that could be automated?",
    type: "single",
    options: [
      { label: "Under 5", value: "under-5", tracks: { a: 1 } },
      { label: "5 to 10", value: "5-10", tracks: { a: 1 } },
      { label: "10 to 20", value: "10-20", tracks: { a: 2 } },
      { label: "More than 20", value: "20-plus", tracks: { a: 2 } },
    ],
  },
  q07: {
    id: "q07",
    number: 7,
    prompt: "Where are you with AI right now?",
    subtitle: "Most people are further back than they admit. Say it straight.",
    type: "single",
    options: [
      { label: "Haven't properly started", value: "not-started", tracks: { a: 3 } },
      { label: "Like a search engine", value: "search", tracks: { a: 3 } },
      { label: "Daily, small stuff only", value: "daily-small", tracks: { a: 1, b: 1 } },
      { label: "Building already", value: "building", tracks: { b: 3 } },
    ],
  },
  q08: {
    id: "q08",
    number: 8,
    prompt: "Which of these have you actually used?",
    subtitle: "Pick every one that is true.",
    type: "multi",
    options: [
      { label: "ChatGPT", value: "chatgpt", logos: ["/logos/chatgpt.svg"], tracks: { a: 1 } },
      { label: "Claude", value: "claude", logos: ["/logos/claude.svg"], tracks: { a: 1, b: 1 } },
      { label: "Gemini", value: "gemini", logos: ["/logos/gemini.svg"], tracks: { a: 1 } },
      { label: "Notion AI", value: "notion", logos: ["/logos/notion.svg"], tracks: { a: 1 } },
      { label: "Canva AI", value: "canva", logos: ["/logos/canva.svg"], tracks: { a: 1 } },
      {
        label: "Zapier / Make",
        value: "zapier",
        logos: ["/logos/zapier.svg", "/logos/make.svg"],
        tracks: { b: 2 },
      },
      { label: "GoHighLevel", value: "ghl", logos: ["/logos/ghl.svg"], tracks: { b: 3 } },
      { label: "None yet", value: "none", icon: "none", tracks: { a: 3 } },
    ],
  },
  q09: {
    id: "q09",
    number: 9,
    prompt: "When you use AI, what usually happens?",
    subtitle: "Pick every one that is true.",
    type: "multi",
    options: [
      { label: "Usable straight away", value: "usable", tracks: { b: 2 } },
      { label: "70% there, I rewrite the rest", value: "rewrite", tracks: { a: 2 } },
      { label: "It's generic", value: "generic", tracks: { a: 2 } },
      { label: "Won't sound like me", value: "voice", tracks: { a: 2 } },
      { label: "It's frustrating", value: "frustrating", tracks: { a: 2 } },
      { label: "I start, then give up", value: "give-up", tracks: { a: 2 } },
    ],
  },
  q10: {
    id: "q10",
    number: 10,
    prompt: "Have you built anything with AI?",
    type: "single",
    options: [
      { label: "Use it daily", value: "daily", tracks: { b: 3 } },
      { label: "Built one, never reopened", value: "abandoned", tracks: { a: 2 } },
      { label: "Started, never finished", value: "unfinished", tracks: { a: 2 } },
      { label: "Not yet", value: "not-yet", tracks: { a: 2 } },
    ],
  },
  q11: {
    id: "q11",
    number: 11,
    prompt: "If you knew how, what would you build first?",
    subtitle: "Pick every one that is true.",
    type: "multi",
    options: [
      { label: "A landing page", value: "landing", tracks: { a: 1 } },
      { label: "A product to sell", value: "product", tracks: { b: 2 } },
      { label: "Internal hub or dashboard", value: "hub", tracks: { c: 1 } },
      { label: "A content system", value: "content-system", tracks: { a: 1, b: 1 } },
      { label: "Lead gen and follow-up", value: "leadgen", tracks: { b: 2 } },
      { label: "Kill the admin", value: "kill-admin", tracks: { a: 1 } },
    ],
  },
  q12: {
    id: "q12",
    number: 12,
    prompt: "What's actually stopped you so far?",
    type: "single",
    options: [
      { label: "No clear place to start", value: "no-start", tracks: { a: 2 } },
      { label: "No time", value: "no-time", tracks: { a: 1 } },
      { label: "Too many tools, no system", value: "too-many", tracks: { b: 2 } },
      { label: "Not technical enough", value: "not-tech", tracks: { a: 2 } },
      { label: "I lose momentum", value: "momentum", tracks: { a: 2 } },
    ],
  },
  q13: {
    id: "q13",
    number: 13,
    prompt: "How do you actually learn best?",
    type: "single",
    options: [
      { label: "Live, walked through it", value: "live", tracks: { a: 2 } },
      { label: "Watch then do", value: "watch", tracks: { a: 1 } },
      { label: "In a group", value: "group", tracks: { a: 1, c: 1 } },
      { label: "Alone, reading", value: "alone", tracks: { a: 1 } },
      { label: "Never finished a course", value: "never-finished", tracks: { a: 2 } },
    ],
  },
  q14: {
    id: "q14",
    number: 14,
    prompt: "Who's helping you figure AI out right now?",
    type: "single",
    options: [
      { label: "Nobody, on my own", value: "nobody", tracks: { a: 2 } },
      { label: "YouTube and Instagram", value: "youtube", tracks: { a: 2 } },
      { label: "A mate who's into it", value: "mate", tracks: { a: 1 } },
      { label: "My team, all guessing", value: "team-guessing", tracks: { c: 2 } },
      { label: "Bought a course, never finished", value: "bought-course", tracks: { a: 2 } },
    ],
  },
  q15: {
    id: "q15",
    number: 15,
    prompt: "If nothing changes in 12 months, what would bother you most?",
    type: "single",
    options: [
      { label: "Competitors moving faster", value: "competitors", tracks: { b: 1 } },
      { label: "More work, same money", value: "same-money", tracks: { a: 1, b: 1 } },
      { label: "Missing the window", value: "window", tracks: { a: 1 } },
      { label: "My team falling behind", value: "team-behind", tracks: { c: 2 } },
      { label: "Still the bottleneck", value: "bottleneck", tracks: { a: 1, c: 1 } },
    ],
  },
  q16: {
    id: "q16",
    number: 16,
    prompt: "Six months from now, what would tell you it worked?",
    subtitle: "Pick every one that is true.",
    type: "multi",
    options: [
      { label: "Getting my time back", value: "hours-back", tracks: { a: 1 } },
      { label: "Shipping new things all the time", value: "ship-fast", tracks: { b: 1 } },
      { label: "A new offer selling", value: "new-offer", tracks: { b: 2 } },
      { label: "Fewer tools, less mess", value: "fewer-tools", tracks: { a: 1, b: 1 } },
      { label: "My team running and using it without me", value: "team-without-me", tracks: { c: 2 } },
      { label: "The one people go to for AI now", value: "the-person", tracks: { a: 1 } },
    ],
  },
  q17: {
    id: "q17",
    number: 17,
    prompt: "How much of a priority is this right now?",
    type: "single",
    options: [
      { label: "Top of the list", value: "top", tracks: { a: 1, b: 1 } },
      { label: "Need a push", value: "push", tracks: { a: 1 } },
      { label: "Keep pushing it back", value: "pushed-back", tracks: { a: 1 } },
      { label: "Looking for the right thing", value: "looking", tracks: { a: 1 } },
    ],
  },
  q18: {
    id: "q18",
    number: 18,
    prompt: "How much time could you give it each week?",
    type: "single",
    options: [
      { label: "2 to 3 hours", value: "2-3", tracks: { a: 1 } },
      { label: "3 to 5 hours", value: "3-5", tracks: { a: 1 } },
      { label: "5+ hours", value: "5-plus", tracks: { b: 1 } },
      { label: "I'd make it work", value: "make-it-work", tracks: { a: 1 } },
    ],
  },
  q19: {
    id: "q19",
    number: 19,
    prompt: "When would you want to start?",
    type: "single",
    options: [
      { label: "As soon as it opens", value: "now", tracks: { a: 1, b: 1 } },
      { label: "Next month", value: "month", tracks: { a: 1 } },
      { label: "Within three months", value: "three-months", tracks: { a: 1 } },
      { label: "Details first", value: "details", tracks: { a: 1 } },
    ],
  },
};

export const BEATS: Record<string, Beat> = {
  a: {
    id: "a",
    tag: "Beat A",
    title: "That's the first thing I take off your plate.",
    body: "Most people come to me doing somewhere between 8 and 15 hours a week of work they never needed to touch. Week one is finding yours and getting rid of it.",
  },
  b: {
    id: "b",
    tag: "Beat B",
    title: "Nearly everyone tells me the same thing.",
    body: "The tech was never the hard part. Self-paced courses die on the sofa. Live programmes finish because there is a room, a deadline, and me noticing when you go quiet.",
  },
  proof: {
    id: "proof",
    tag: "Proof",
    title: "I've taught [REAL DATA] people to build with Claude.",
    body: "Founders, consultants, creatives and teams, all inside my programmes. Almost none of them were technical when they walked in.",
  },
  c: {
    id: "c",
    tag: "Beat C",
    title: "This is the easiest it will ever be to start.",
    body: "Every person I've taught started exactly where you are now. The ones who pull ahead over the next six months will be the ones who had a plan and someone to follow it with.",
  },
};

export const FLOW: FlowScreen[] = [
  { id: "intro", kind: "intro" },
  { id: "entry", kind: "question", questionId: "entry" },
  { id: "q01", kind: "question", questionId: "q01" },
  { id: "q02", kind: "question", questionId: "q02" },
  { id: "q03", kind: "question", questionId: "q03" },
  { id: "q04", kind: "question", questionId: "q04" },
  { id: "q05", kind: "question", questionId: "q05" },
  { id: "q06", kind: "question", questionId: "q06" },
  { id: "beat-a", kind: "beat", beatId: "a" },
  { id: "q07", kind: "question", questionId: "q07" },
  { id: "q08", kind: "question", questionId: "q08" },
  { id: "q09", kind: "question", questionId: "q09" },
  { id: "q10", kind: "question", questionId: "q10" },
  { id: "q11", kind: "question", questionId: "q11" },
  { id: "q12", kind: "question", questionId: "q12" },
  { id: "beat-b", kind: "beat", beatId: "b" },
  { id: "q13", kind: "question", questionId: "q13" },
  { id: "q14", kind: "question", questionId: "q14" },
  { id: "proof", kind: "beat", beatId: "proof" },
  { id: "q15", kind: "question", questionId: "q15" },
  { id: "beat-c", kind: "beat", beatId: "c" },
  { id: "q16", kind: "question", questionId: "q16" },
  { id: "q17", kind: "question", questionId: "q17" },
  { id: "q18", kind: "question", questionId: "q18" },
  { id: "q19", kind: "question", questionId: "q19" },
  { id: "capture", kind: "capture" },
];

// Numbered questions only — the opening fork (number: null) isn't part of the step count.
export const NUMBERED_QUESTION_COUNT = Object.values(QUESTIONS).filter(
  (q) => q.number !== null,
).length;
// +1 for the email capture screen, which gets its own final step per the spec.
export const TOTAL_STEPS = NUMBERED_QUESTION_COUNT + 1;

export const AGENCY = {
  website: {
    badge: "Agency",
    title: "We can build the site",
    body: "You said a landing page is on the list. If you want that done while you learn the rest, we build it.",
    ctaLabel: "Talk about a website",
    ctaHref: "https://aipowered.xyz/solutions#website",
  },
  marketing: {
    badge: "Agency",
    title: "Lead gen, handled",
    body: "You asked for lead gen and follow-up. We can put that system in while you get fluent in Claude.",
    ctaLabel: "Talk about growth",
    ctaHref: "https://aipowered.xyz/solutions#marketing",
  },
  automations: {
    badge: "Agency",
    title: "Kill the admin",
    body: "You want the busywork gone. We build the automations so you are not wiring them at midnight.",
    ctaLabel: "Talk about automations",
    ctaHref: "https://aipowered.xyz/solutions#ai-automations",
  },
  mentoring: {
    badge: "Mentoring",
    title: "Someone in the room",
    body: "You are figuring this out alone. 1:1 mentoring sits beside the programme if you want a tighter loop.",
    ctaLabel: "Book a mentoring call",
    ctaHref: CONTACT_HREF,
  },
};
