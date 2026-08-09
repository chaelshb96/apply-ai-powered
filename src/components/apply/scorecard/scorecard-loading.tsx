"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Reading your answers…",
  "Analysing patterns…",
  "Matching to our services…",
  "Finding the right programme…",
  "Calculating your best fit…",
  "Saving your results…",
];

export function ScorecardLoading() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i < PHRASES.length - 1 ? i + 1 : i));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-8">
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-2 rounded-full bg-neutral-800 animate-dot-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative mb-8 h-2 w-48 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-neutral-800" />
      </div>

      <h2 className="text-[20px] font-semibold tracking-tight tablet:text-[24px]">
        Building your scorecard
      </h2>

      <p
        key={phraseIndex}
        className="mt-3 text-text-grey animate-score-fade"
      >
        {PHRASES[phraseIndex]}
      </p>

      <p className="mt-10 max-w-xs text-sm text-text-grey">
        We&apos;re saving your results and sending a copy to your email.
      </p>
    </div>
  );
}
