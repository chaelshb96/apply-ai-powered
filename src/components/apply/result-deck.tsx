"use client";

import { useState } from "react";
import { MotionCardStack, type MotionStackItem } from "@/components/ui/motion-card-stack";
import { QuestionFace } from "./stacked-deck";
import {
  ResultCallCard,
  ResultDetailsCard,
  ResultHeroCard,
  ResultProgrammeCard,
  ResultStatsCard,
} from "./result-cards";
import type { GamePlanResult } from "@/lib/score-engine";

interface ResultDeckProps {
  result: GamePlanResult;
  userName?: string;
  shareToken?: string;
  readonly?: boolean;
  onReset?: () => void;
}

export function ResultDeck({
  result,
  userName,
  shareToken,
  readonly = false,
  onReset,
}: ResultDeckProps) {
  const [copied, setCopied] = useState(false);

  const items: MotionStackItem[] = [
    {
      id: "result",
      content: <ResultHeroCard result={result} userName={userName} />,
    },
    {
      id: "stats",
      content: <ResultStatsCard result={result} />,
    },
    {
      id: "details",
      content: <ResultDetailsCard result={result} userName={userName} />,
    },
    {
      id: "programme",
      content: <ResultProgrammeCard result={result} />,
    },
    {
      id: "call",
      content: <ResultCallCard result={result} />,
    },
  ];

  const handleCopy = () => {
    if (!shareToken) return;
    const link = `${window.location.origin}/r/${shareToken}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="flex flex-col gap-6">
      <MotionCardStack key={result.track} items={items} />

      {shareToken && (
        <QuestionFace className="h-auto p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
            Share
          </p>
          <p className="mt-2 text-sm text-text-section-desc">
            A copy is on its way to your email. Keep this link.
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-4 min-h-11 w-full rounded-md border border-accent-line bg-white text-sm font-medium text-text-dark hover:bg-neutral-50 dark:border-white/12 dark:bg-neutral-950 dark:hover:bg-neutral-800"
          >
            {copied ? "Copied" : "Copy share link"}
          </button>
        </QuestionFace>
      )}

      {!readonly && onReset && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="min-h-11 text-sm font-medium text-text-section-desc hover:text-text-dark"
          >
            Retake the quiz
          </button>
        </div>
      )}
    </div>
  );
}
