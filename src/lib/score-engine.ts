import { SERVICES, TIER_BANDS, DOMAINS, OVERALL_COMMENTARY, DOMAIN_COMMENTARY, QUESTIONS } from "./constants";
import type { TierKey } from "./constants";

export type ServiceKey = "mentoring" | "claude" | "website" | "marketing" | "crm" | "automations";

export type AnswerMap = Record<number, string>;

export interface DomainScore {
  id: string;
  label: string;
  shortLabel: string;
  score: number;
  tier: TierKey;
  tierLabel: string;
  commentary: string;
}

export interface ScoreResult {
  key: ServiceKey;
  score: number;
  label: string;
  shortLabel: string;
}

export interface ScorecardResult {
  overallScore: number;
  tier: TierKey;
  tierLabel: string;
  tierColor: string;
  overallCommentary: string;
  domainScores: DomainScore[];
  primary: ScoreResult;
  secondary: ScoreResult;
  allScores: ScoreResult[];
  explanation: string;
}

const ALL_SERVICE_KEYS: ServiceKey[] = [
  "mentoring", "claude", "website", "marketing", "crm", "automations",
];

const GOAL_SERVICE_MAP: Record<string, Record<ServiceKey, number>> = {
  leads:     { mentoring: 1, claude: 2, website: 2, marketing: 5, crm: 5, automations: 3 },
  content:   { mentoring: 2, claude: 5, website: 1, marketing: 3, crm: 1, automations: 2 },
  ops:       { mentoring: 1, claude: 2, website: 1, marketing: 1, crm: 3, automations: 5 },
  learn:     { mentoring: 3, claude: 5, website: 0, marketing: 1, crm: 1, automations: 2 },
  website:   { mentoring: 0, claude: 1, website: 5, marketing: 3, crm: 1, automations: 1 },
  guidance:  { mentoring: 5, claude: 3, website: 1, marketing: 1, crm: 1, automations: 1 },
};

function getTier(score: number) {
  if (score <= TIER_BANDS.beginner.max)   return TIER_BANDS.beginner;
  if (score <= TIER_BANDS.developing.max) return TIER_BANDS.developing;
  if (score <= TIER_BANDS.proficient.max) return TIER_BANDS.proficient;
  return TIER_BANDS.expert;
}

function getExplanation(primary: ServiceKey, secondary: ServiceKey): string {
  const reasons: Record<ServiceKey, string> = {
    mentoring:  "Your answers show you'd benefit most from personalised, 1:1 guidance. Mentoring gives you direct access to expert advice tailored to your specific situation and pace.",
    claude:     "You're at the right stage for structured learning. The Claude Programme will give you hands-on AI skills through a proven 6-week curriculum alongside a cohort of peers.",
    website:    "Your top priority is getting a high-performing online presence. A custom website built by us will give you the foundation you need to grow.",
    marketing:  "You need more customers and a systematic approach to growth. Our digital marketing team can build the infrastructure to attract and convert your ideal audience.",
    crm:        "Your sales process needs structure and automation. A well-designed CRM will transform how you manage leads, follow-ups, and customer relationships.",
    automations:"You're ready to eliminate busywork with custom AI workflows. Our automation builds will save you hours each week and let you focus on what matters.",
  };

  const secondaryNote = primary !== secondary
    ? ` You may also benefit from ${SERVICES[secondary].shortLabel} as a complementary next step.`
    : "";

  return `${reasons[primary]}${secondaryNote}`;
}

export function calculateScorecard(answers: AnswerMap): ScorecardResult {
  // ── Per‑domain scores from Phase 2 (Q4‑11) ──
  const domainRaw: Record<string, { total: number; max: number }> = {};
  for (const d of DOMAINS) {
    domainRaw[d.id] = { total: 0, max: 0 };
  }

  // Collect per‑domain scores from the questions
  for (const q of QUESTIONS) {
    if (q.category !== "phase2" || !("domain" in q) || !q.domain) continue;
    const answer = answers[q.id - 1];
    if (!answer) continue;
    const option = q.options.find((o) => o.value === answer);
    if (!option || option.score === undefined) continue;

    if (!domainRaw[q.domain]) domainRaw[q.domain] = { total: 0, max: 0 };
    domainRaw[q.domain].total += option.score;
    domainRaw[q.domain].max += 8; // max per question
  }

  const domainScores: DomainScore[] = DOMAINS.map((d) => {
    const raw = domainRaw[d.id] ?? { total: 0, max: 16 };
    const score = raw.max > 0 ? Math.round((raw.total / raw.max) * 100) : 0;
    const tier = getTier(score);
    return {
      id: d.id,
      label: d.label,
      shortLabel: d.shortLabel,
      score,
      tier: tier.id as TierKey,
      tierLabel: tier.label,
      commentary: DOMAIN_COMMENTARY[d.id]?.[tier.id as TierKey] ?? "",
    };
  });

  // ── Overall score (sum of all Phase 2 raw / max possible) ──
  let overallTotal = 0;
  let overallMax = 0;
  for (const d of DOMAINS) {
    overallTotal += domainRaw[d.id]?.total ?? 0;
    overallMax += domainRaw[d.id]?.max ?? 0;
  }
  const overallScore = overallMax > 0 ? Math.round((overallTotal / overallMax) * 100) : 0;
  const overallTier = getTier(overallScore);

  // ── Service fit from Phase 3 (Q12) ──
  const goalAnswer = answers[11] ?? "";
  const serviceWeights = GOAL_SERVICE_MAP[goalAnswer] ?? GOAL_SERVICE_MAP.guidance;

  const allScores: ScoreResult[] = ALL_SERVICE_KEYS.map((key) => ({
    key,
    score: Math.min(100, Math.round(((serviceWeights[key] ?? 0) / 5) * 100)),
    label: SERVICES[key].label,
    shortLabel: SERVICES[key].shortLabel,
  }));

  allScores.sort((a, b) => b.score - a.score);

  return {
    overallScore,
    tier: overallTier.id as TierKey,
    tierLabel: overallTier.label,
    tierColor: overallTier.color,
    overallCommentary: OVERALL_COMMENTARY[overallTier.id as TierKey] ?? "",
    domainScores,
    primary: allScores[0],
    secondary: allScores[1],
    allScores,
    explanation: getExplanation(allScores[0].key, allScores[1].key),
  };
}
