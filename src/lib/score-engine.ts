import { AGENCY, QUESTIONS, TRACKS, type TrackKey } from "./constants";

export type AnswerValue = string | string[];
export type AnswerMap = Record<string, AnswerValue>;

export interface TrackTally {
  key: TrackKey;
  points: number;
}

export interface ComplementaryCard {
  kind: "website" | "marketing" | "automations" | "mentoring";
  badge: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface GamePlanResult {
  track: TrackKey;
  trackTitle: string;
  trackBadge: string;
  programme: string;
  who: string;
  explanation: string;
  tallies: TrackTally[];
  goal: string | null;
  hours: string | null;
  vision: string[];
  weeklyTime: string | null;
  complementary: ComplementaryCard | null;
  ctaLabel: string;
  ctaHref: string;
  programmeHref: string;
  programmeCta: string;
}

function asList(value: AnswerValue | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function optionLabel(questionId: string, value: string): string | null {
  const option = QUESTIONS[questionId]?.options.find((o) => o.value === value);
  return option?.label ?? null;
}

export function calculateGamePlan(answers: AnswerMap): GamePlanResult {
  const points: Record<TrackKey, number> = { a: 0, b: 0, c: 0 };

  for (const [questionId, raw] of Object.entries(answers)) {
    const question = QUESTIONS[questionId];
    if (!question) continue;
    for (const value of asList(raw)) {
      const option = question.options.find((o) => o.value === value);
      if (!option?.tracks) continue;
      points.a += option.tracks.a ?? 0;
      points.b += option.tracks.b ?? 0;
      points.c += option.tracks.c ?? 0;
    }
  }

  const tallies: TrackTally[] = (["a", "b", "c"] as TrackKey[])
    .map((key) => ({ key, points: points[key] }))
    .sort((x, y) => y.points - x.points);

  let winner = tallies[0].key;
  const lead = tallies[0];
  const runner = tallies[1];
  if (lead.points - runner.points <= 2) {
    winner = "a";
  }

  const track = TRACKS[winner];
  const tools = asList(answers.q08);
  const builds = asList(answers.q11);
  const helper = asList(answers.q14)[0];
  const isolation =
    helper === "nobody" || helper === "youtube" || helper === "bought-course";

  let complementary: ComplementaryCard | null = null;
  if (builds.includes("landing")) {
    complementary = { kind: "website", ...AGENCY.website };
  } else if (builds.includes("leadgen")) {
    complementary = { kind: "marketing", ...AGENCY.marketing };
  } else if (builds.includes("kill-admin")) {
    complementary = { kind: "automations", ...AGENCY.automations };
  } else if (isolation && winner === "a") {
    complementary = { kind: "mentoring", ...AGENCY.mentoring };
  } else if (tools.includes("ghl") && winner !== "b") {
    complementary = {
      kind: "marketing",
      badge: "Operator",
      title: "You already have GoHighLevel",
      body: "That is a strong Operator signal. If the Starting Line is where we begin, GHL is the system we plug Claude into next.",
      ctaLabel: "Book a discovery call",
      ctaHref: track.ctaHref,
    };
  }

  const vision = asList(answers.q16)
    .map((value) => optionLabel("q16", value))
    .filter((label): label is string => Boolean(label));

  const explanations: Record<TrackKey, string> = {
    a: "Your answers put you at the start, which is the honest place. Six weeks, live, with a room that notices when you go quiet.",
    b: "You are already in motion. The gap is a product and a system, not another chat window. We productize what you do and wire it so it sells without you chasing it.",
    c: "This is not a personal hobby. Your team is guessing, or about to be. We put Claude into the company so it does not live in one person's head.",
  };

  return {
    track: winner,
    trackTitle: track.title,
    trackBadge: track.badge,
    programme: track.programme,
    who: track.who,
    explanation: explanations[winner],
    tallies,
    goal: optionLabel("q04", asList(answers.q04)[0] ?? ""),
    hours: optionLabel("q06", asList(answers.q06)[0] ?? ""),
    vision,
    weeklyTime: optionLabel("q18", asList(answers.q18)[0] ?? ""),
    complementary,
    ctaLabel: track.ctaLabel,
    ctaHref: track.ctaHref,
    programmeHref: track.programmeHref,
    programmeCta: track.programmeCta,
  };
}

export function isGamePlanResult(value: unknown): value is GamePlanResult {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return record.track === "a" || record.track === "b" || record.track === "c";
}

export function isAnswerMap(value: unknown): value is AnswerMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every(
    (entry) =>
      typeof entry === "string" ||
      (Array.isArray(entry) && entry.every((item) => typeof item === "string")),
  );
}

export function weeklyCopy(weeklyTime: string | null) {
  if (!weeklyTime) {
    return "Live sessions, a room, and a plan that matches where you actually are.";
  }
  if (/make it work/i.test(weeklyTime)) {
    return "You said you'd make the time. That is enough.";
  }
  return `You said ${weeklyTime.charAt(0).toLowerCase()}${weeklyTime.slice(1)} a week. That is enough.`;
}
