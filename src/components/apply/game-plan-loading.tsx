"use client";

import { useEffect, useMemo, useState } from "react";
import { QuestionFace } from "./stacked-deck";

export const GAME_PLAN_LOADING_MS = 5600;

interface GamePlanLoadingProps {
  goal: string | null;
  hours: string | null;
}

export function GamePlanLoading({ goal, hours }: GamePlanLoadingProps) {
  const [percent, setPercent] = useState(0);

  const stages = useMemo(
    () => [
      {
        at: 0,
        line: goal
          ? `You said: ${goal}.`
          : "Reading what you actually want in 90 days.",
      },
      {
        at: 22,
        line: hours
          ? `${hours} a week on work a machine could do.`
          : "Looking at where the hours go.",
      },
      {
        at: 46,
        line: "Weighing Starting Line, Operator, and Multiplier.",
      },
      {
        at: 72,
        line: "Writing the plan for the track you landed on.",
      },
      {
        at: 91,
        line: "Packing the cards.",
      },
    ],
    [goal, hours],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPercent(100);
      return;
    }

    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / GAME_PLAN_LOADING_MS);
      const eased = 1 - (1 - t) ** 2.15;
      setPercent(Math.round(eased * 100));
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const current = [...stages].reverse().find((stage) => percent >= stage.at) ?? stages[0];
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <QuestionFace className="flex flex-col items-center justify-center text-center">
      <div
        className="relative grid size-[168px] place-items-center"
        role="progressbar"
        aria-label="Building your Game Plan"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <svg
          className="absolute inset-0 size-full -rotate-90"
          viewBox="0 0 136 136"
          aria-hidden
        >
          <circle
            cx="68"
            cy="68"
            r={radius}
            fill="none"
            className="stroke-neutral-200 dark:stroke-neutral-700"
            strokeWidth="8"
          />
          <circle
            cx="68"
            cy="68"
            r={radius}
            fill="none"
            className="stroke-text-dark"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <p className="text-[56px] font-semibold tabular-nums leading-none tracking-tight text-text-dark">
          {percent}
          <span className="ml-0.5 text-[22px] font-medium text-text-section-desc">%</span>
        </p>
      </div>

      <p
        key={current.line}
        className="mt-7 min-h-[3.25rem] max-w-[28ch] text-lg font-medium text-text-dark animate-score-fade"
      >
        {current.line}
      </p>
    </QuestionFace>
  );
}
