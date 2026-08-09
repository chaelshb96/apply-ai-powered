import type { ServiceKey } from "./constants";
import { SERVICES } from "./constants";

export type AnswerMap = Record<number, string>;

const ALL_SERVICE_KEYS: ServiceKey[] = [
  "mentoring",
  "claude",
  "website",
  "marketing",
  "crm",
  "automations",
];

const QUESTION_WEIGHTS: Record<number, number> = {
  1: 8,
  2: 20,
  3: 5,
  4: 12,
  5: 12,
  6: 8,
  7: 10,
  8: 10,
  9: 10,
  10: 5,
};

type ScoreRow = Record<ServiceKey, number>;

const SCORE_MATRIX: Record<number, Record<string, ScoreRow>> = {
  1: {
    founder:     { mentoring: 2, claude: 2, website: 1, marketing: 1, crm: 1, automations: 1 },
    executive:   { mentoring: 1, claude: 1, website: 1, marketing: 2, crm: 2, automations: 2 },
    manager:     { mentoring: 1, claude: 2, website: 1, marketing: 2, crm: 1, automations: 1 },
    ic:          { mentoring: 1, claude: 3, website: 0, marketing: 1, crm: 1, automations: 2 },
    student:     { mentoring: 2, claude: 3, website: 0, marketing: 0, crm: 0, automations: 1 },
    freelancer:  { mentoring: 2, claude: 2, website: 2, marketing: 2, crm: 1, automations: 1 },
  },
  2: {
    "grow-business":  { mentoring: 3, claude: 2, website: 1, marketing: 2, crm: 2, automations: 2 },
    "build-website":  { mentoring: 0, claude: 0, website: 5, marketing: 3, crm: 1, automations: 1 },
    "learn-ai":       { mentoring: 3, claude: 5, website: 0, marketing: 0, crm: 0, automations: 2 },
    automate:         { mentoring: 1, claude: 2, website: 0, marketing: 0, crm: 1, automations: 5 },
    "get-customers":  { mentoring: 1, claude: 1, website: 1, marketing: 5, crm: 4, automations: 2 },
    "need-guidance":  { mentoring: 5, claude: 3, website: 1, marketing: 1, crm: 1, automations: 1 },
  },
  3: {
    solo:    { mentoring: 2, claude: 2, website: 1, marketing: 1, crm: 1, automations: 1 },
    "2-5":   { mentoring: 2, claude: 3, website: 2, marketing: 2, crm: 1, automations: 1 },
    "6-20":  { mentoring: 1, claude: 2, website: 2, marketing: 2, crm: 2, automations: 2 },
    "21-50": { mentoring: 1, claude: 1, website: 2, marketing: 3, crm: 3, automations: 3 },
    "50-plus": { mentoring: 0, claude: 0, website: 3, marketing: 3, crm: 3, automations: 3 },
  },
  4: {
    beginner: { mentoring: 3, claude: 5, website: 1, marketing: 1, crm: 1, automations: 1 },
    casual:   { mentoring: 2, claude: 4, website: 1, marketing: 2, crm: 1, automations: 2 },
    daily:    { mentoring: 1, claude: 3, website: 2, marketing: 3, crm: 2, automations: 3 },
    builder:  { mentoring: 1, claude: 1, website: 2, marketing: 3, crm: 3, automations: 4 },
    advanced: { mentoring: 0, claude: 0, website: 2, marketing: 3, crm: 3, automations: 5 },
  },
  5: {
    "under-250":  { mentoring: 2, claude: 5, website: 0, marketing: 0, crm: 0, automations: 0 },
    "250-1k":     { mentoring: 3, claude: 4, website: 1, marketing: 1, crm: 0, automations: 1 },
    "1k-5k":      { mentoring: 2, claude: 3, website: 2, marketing: 3, crm: 2, automations: 2 },
    "5k-15k":     { mentoring: 1, claude: 2, website: 3, marketing: 4, crm: 3, automations: 3 },
    "15k-50k":    { mentoring: 1, claude: 1, website: 4, marketing: 4, crm: 4, automations: 4 },
    "50k-plus":   { mentoring: 1, claude: 1, website: 5, marketing: 5, crm: 5, automations: 5 },
    unspecified:  { mentoring: 2, claude: 2, website: 2, marketing: 2, crm: 2, automations: 2 },
  },
  6: {
    "this-month": { mentoring: 2, claude: 3, website: 2, marketing: 3, crm: 2, automations: 2 },
    "3-months":   { mentoring: 2, claude: 3, website: 3, marketing: 3, crm: 3, automations: 3 },
    "6-months":   { mentoring: 2, claude: 2, website: 3, marketing: 3, crm: 3, automations: 3 },
    "no-rush":    { mentoring: 3, claude: 2, website: 2, marketing: 2, crm: 2, automations: 2 },
    "not-sure":   { mentoring: 3, claude: 2, website: 1, marketing: 1, crm: 1, automations: 1 },
  },
  7: {
    "need-website":  { mentoring: 0, claude: 0, website: 5, marketing: 2, crm: 1, automations: 1 },
    "need-redesign": { mentoring: 0, claude: 0, website: 5, marketing: 3, crm: 1, automations: 1 },
    "works-well":    { mentoring: 0, claude: 0, website: 0, marketing: 1, crm: 2, automations: 2 },
    "no-results":    { mentoring: 1, claude: 1, website: 4, marketing: 5, crm: 2, automations: 1 },
  },
  8: {
    referrals:     { mentoring: 1, claude: 1, website: 2, marketing: 1, crm: 1, automations: 1 },
    "social-media": { mentoring: 1, claude: 2, website: 1, marketing: 4, crm: 1, automations: 2 },
    "paid-ads":     { mentoring: 0, claude: 1, website: 1, marketing: 5, crm: 2, automations: 1 },
    email:          { mentoring: 0, claude: 1, website: 1, marketing: 4, crm: 4, automations: 3 },
    "no-system":    { mentoring: 1, claude: 2, website: 1, marketing: 5, crm: 4, automations: 2 },
    na:             { mentoring: 2, claude: 3, website: 0, marketing: 0, crm: 0, automations: 1 },
  },
  9: {
    spreadsheets: { mentoring: 0, claude: 1, website: 1, marketing: 1, crm: 5, automations: 2 },
    "basic-crm":  { mentoring: 0, claude: 1, website: 1, marketing: 1, crm: 3, automations: 3 },
    "advanced-crm": { mentoring: 0, claude: 0, website: 0, marketing: 1, crm: 0, automations: 3 },
    chaotic:      { mentoring: 1, claude: 2, website: 1, marketing: 2, crm: 5, automations: 3 },
    na:           { mentoring: 2, claude: 3, website: 1, marketing: 0, crm: 0, automations: 1 },
  },
  10: {
    structured:  { mentoring: 2, claude: 5, website: 0, marketing: 0, crm: 0, automations: 0 },
    "one-on-one": { mentoring: 5, claude: 2, website: 0, marketing: 0, crm: 0, automations: 0 },
    "done-for-me": { mentoring: 0, claude: 0, website: 3, marketing: 3, crm: 2, automations: 3 },
    hybrid:      { mentoring: 2, claude: 3, website: 2, marketing: 2, crm: 2, automations: 2 },
    partner:     { mentoring: 3, claude: 2, website: 2, marketing: 2, crm: 2, automations: 3 },
  },
};

export interface ScoreResult {
  key: ServiceKey;
  score: number;
  label: string;
  shortLabel: string;
}

export interface ScorecardResult {
  primary: ScoreResult;
  secondary: ScoreResult;
  allScores: ScoreResult[];
  explanation: string;
}

function getExplanation(
  primary: ServiceKey,
  secondary: ServiceKey,
): string {
  const reasons: Record<ServiceKey, string> = {
    mentoring:
      "Your answers show you'd benefit most from personalised, 1:1 guidance. Mentoring gives you direct access to expert advice tailored to your specific situation and pace.",
    claude:
      "You're at the right stage for structured learning. The Claude Programme will give you hands-on AI skills through a proven 6-week curriculum alongside a cohort of peers.",
    website:
      "Your top priority is getting a high-performing online presence. A custom website built by our agency team will give you the foundation you need to grow.",
    marketing:
      "You need more customers and a systematic approach to growth. Our digital marketing team can build the infrastructure to attract and convert your ideal audience.",
    crm:
      "Your sales process needs structure and automation. A well-designed CRM system will transform how you manage leads, follow-ups, and customer relationships.",
    automations:
      "You're ready to eliminate busywork with custom AI workflows. Our automation builds will save you hours each week and let you focus on what matters.",
  };

  const secondaryNote =
    primary !== secondary
      ? ` You may also benefit from ${SERVICES[secondary].shortLabel} as a complementary next step.`
      : "";

  return `${reasons[primary]}${secondaryNote}`;
}

export function calculateScorecard(answers: AnswerMap): ScorecardResult {
  const rawScores: Record<ServiceKey, number> = {
    mentoring: 0,
    claude: 0,
    website: 0,
    marketing: 0,
    crm: 0,
    automations: 0,
  };

  let totalWeight = 0;

  for (const [questionIndexStr, answer] of Object.entries(answers)) {
    // The flow stores answers by zero-based index; the scoring matrix uses question IDs.
    const questionId = Number(questionIndexStr) + 1;
    const weight = QUESTION_WEIGHTS[questionId] ?? 0;
    totalWeight += weight;

    const matrixRow = SCORE_MATRIX[questionId]?.[answer];
    if (!matrixRow) continue;

    for (const key of ALL_SERVICE_KEYS) {
      rawScores[key] += (matrixRow[key] ?? 0) * weight;
    }
  }

  const maxPossible = totalWeight * 5;

  const allScores: ScoreResult[] = ALL_SERVICE_KEYS.map((key) => ({
    key,
    score: Math.round((rawScores[key] / maxPossible) * 100),
    label: SERVICES[key].label,
    shortLabel: SERVICES[key].shortLabel,
  }));

  allScores.sort((a, b) => b.score - a.score);

  const primary = allScores[0];
  const secondary = allScores[1];

  return {
    primary,
    secondary,
    allScores,
    explanation: getExplanation(primary.key, secondary.key),
  };
}
