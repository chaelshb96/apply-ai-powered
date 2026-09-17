"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { BeatScreen } from "./beat-screen";
import { CaptureForm } from "./capture-form";
import { GAME_PLAN_LOADING_MS, GamePlanLoading } from "./game-plan-loading";
import { QuestionScreen } from "./question-screen";
import { ResultDeck } from "./result-deck";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { BEATS, FLOW, QUESTIONS, TOTAL_QUESTION_SCREENS } from "@/lib/constants";
import { calculateGamePlan, type AnswerMap, type AnswerValue, type GamePlanResult } from "@/lib/score-engine";
import { cn } from "@/lib/utils";

type Phase = "flow" | "loading" | "result";

const SELECT_HOLD_MS = 280;
const STACK_DEPTH = 3;

function noop() {}
function noopSubmit(_name: string, _email: string) {}

function asList(value: AnswerValue | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ScreenBody({
  index,
  answers,
  onToggle,
  onDone,
  onBeatContinue,
  onCaptureBack,
  onSubmit,
}: {
  index: number;
  answers: AnswerMap;
  onToggle: (value: string) => void;
  onDone: () => void;
  onBeatContinue: () => void;
  onCaptureBack: () => void;
  onSubmit: (name: string, email: string) => void;
}) {
  const screen = FLOW[index];
  const question = screen.questionId ? QUESTIONS[screen.questionId] : null;
  const beat = screen.beatId ? BEATS[screen.beatId] : null;
  const selected = question ? asList(answers[question.id]) : [];

  if (screen.kind === "capture") {
    return <CaptureForm onBack={onCaptureBack} onSubmit={onSubmit} />;
  }
  if (question) {
    return (
      <QuestionScreen
        question={question}
        selected={selected}
        onToggle={onToggle}
        onDone={question.type === "multi" ? onDone : undefined}
      />
    );
  }
  if (beat) {
    return <BeatScreen beat={beat} onContinue={onBeatContinue} />;
  }
  return null;
}

export function ApplyFlow() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [phase, setPhase] = useState<Phase>("flow");
  const [result, setResult] = useState<GamePlanResult | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const selectTimer = useRef<number | null>(null);

  const screen = FLOW[screenIndex];

  const questionProgress = useMemo(() => {
    let seen = 0;
    for (let i = 0; i <= screenIndex; i += 1) {
      if (FLOW[i].kind === "question") seen += 1;
    }
    if (screen.kind !== "question") {
      seen = Math.max(seen, 1);
    }
    return Math.min(seen, TOTAL_QUESTION_SCREENS);
  }, [screen.kind, screenIndex]);

  const clearTimers = useCallback(() => {
    if (selectTimer.current) window.clearTimeout(selectTimer.current);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const moveTo = useCallback((nextIndex: number, dir: "forward" | "back") => {
    if (nextIndex < 0 || nextIndex > FLOW.length - 1) return;
    setDirection(dir);
    setScreenIndex(nextIndex);
  }, []);

  const goNext = useCallback(() => {
    moveTo(screenIndex + 1, "forward");
  }, [moveTo, screenIndex]);

  const goBack = useCallback(() => {
    clearTimers();
    moveTo(screenIndex - 1, "back");
  }, [clearTimers, moveTo, screenIndex]);

  const handleToggle = useCallback(
    (value: string) => {
      const question = screen.questionId ? QUESTIONS[screen.questionId] : null;
      if (!question) return;

      setAnswers((prev) => {
        const current = asList(prev[question.id]);
        if (question.type === "single") {
          return { ...prev, [question.id]: value };
        }
        let next = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        if (question.id === "q08") {
          if (value === "none") next = ["none"];
          else next = next.filter((item) => item !== "none");
        }
        return { ...prev, [question.id]: next };
      });

      if (question.type === "single") {
        if (selectTimer.current) window.clearTimeout(selectTimer.current);
        selectTimer.current = window.setTimeout(() => {
          goNext();
        }, prefersReducedMotion() ? 0 : SELECT_HOLD_MS);
      }
    },
    [goNext, screen.questionId],
  );

  const submitAndGetResult = useCallback(async (name: string, email: string) => {
    setUserName(name);
    setPhase("loading");

    const plan = calculateGamePlan(answers);
    const started = Date.now();

    try {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers, scores: plan }),
      });
    } catch {
      // Email is best-effort. The plan still shows on this page.
    }

    const minShow = prefersReducedMotion() ? 400 : GAME_PLAN_LOADING_MS;
    const wait = Math.max(0, minShow - (Date.now() - started));
    await new Promise((resolve) => window.setTimeout(resolve, wait));

    setResult(plan);
    setPhase("result");
  }, [answers]);

  const handleReset = useCallback(() => {
    clearTimers();
    setScreenIndex(0);
    setAnswers({});
    setPhase("flow");
    setResult(null);
    setShareToken(null);
    setUserName(null);
    setDirection("forward");
  }, [clearTimers]);

  const stackItems = useMemo(() => {
    const items: CardStackItem[] = [];
    for (let delta = 0; delta < STACK_DEPTH; delta += 1) {
      const index = screenIndex + delta;
      if (index >= FLOW.length) break;
      const front = delta === 0;
      items.push({
        key: FLOW[index].id,
        content: (
          <ScreenBody
            index={index}
            answers={answers}
            onToggle={front ? handleToggle : noop}
            onDone={front ? goNext : noop}
            onBeatContinue={front ? goNext : noop}
            onCaptureBack={front ? goBack : noop}
            onSubmit={front ? submitAndGetResult : noopSubmit}
          />
        ),
      });
    }
    return items;
  }, [answers, goBack, goNext, handleToggle, screenIndex, submitAndGetResult]);

  if (phase === "loading") {
    const goalValue = typeof answers.q04 === "string" ? answers.q04 : "";
    const hoursValue = typeof answers.q06 === "string" ? answers.q06 : "";
    return (
      <CardStack cardKey="loading">
        <GamePlanLoading
          goal={QUESTIONS.q04.options.find((o) => o.value === goalValue)?.label ?? null}
          hours={QUESTIONS.q06.options.find((o) => o.value === hoursValue)?.label ?? null}
        />
      </CardStack>
    );
  }

  if (phase === "result" && result) {
    return (
      <ResultDeck
        result={result}
        userName={userName ?? undefined}
        shareToken={shareToken ?? undefined}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="flex flex-col">
      {screen.kind !== "capture" && (
        <div className="mb-4">
          <div className="grid min-h-11 grid-cols-[4.5rem_1fr_4.5rem] items-center">
            <button
              type="button"
              onClick={goBack}
              disabled={screenIndex === 0}
              aria-label="Previous question"
              className={cn(
                "grid size-11 place-items-center justify-self-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800/40 dark:focus-visible:ring-white/40",
                screenIndex === 0
                  ? "text-text-section-desc"
                  : "text-text-dark hover:text-neutral-600",
              )}
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.14em] text-text-section-desc">
              Progress
            </p>
            <p className="whitespace-nowrap text-right text-[11px] font-medium uppercase tracking-[0.14em] text-text-section-desc tabular-nums">
              {questionProgress} / {TOTAL_QUESTION_SCREENS}
            </p>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-sm bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full bg-neutral-950 transition-[width] duration-300 dark:bg-white"
              style={{ width: `${(questionProgress / TOTAL_QUESTION_SCREENS) * 100}%` }}
            />
          </div>
        </div>
      )}

      <CardStack direction={direction} items={stackItems} />
    </div>
  );
}
