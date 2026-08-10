"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Analysing your AI skills…",
  "Measuring domain knowledge…",
  "Comparing against benchmarks…",
  "Finding your tier…",
  "Building your breakdown…",
  "Almost there…",
];

export function SkillsLoading() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i < PHRASES.length - 1 ? i + 1 : i));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-8">
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-3 rounded-full bg-neutral-800 animate-dot-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative mb-8 h-2 w-56 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-neutral-800" />
      </div>

      <h2 className="text-[24px] font-semibold tracking-tight tablet:text-[30px]">
        Calculating your AI score
      </h2>

      <p
        key={phraseIndex}
        className="mt-4 text-base text-text-grey animate-score-fade"
      >
        {PHRASES[phraseIndex]}
      </p>

      <p className="mt-12 max-w-xs text-sm text-text-grey">
        We&apos;re mapping your skills across four domains and finding where you fit.
      </p>
    </div>
  );
}
