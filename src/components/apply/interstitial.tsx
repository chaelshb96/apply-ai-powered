"use client";

import { cn } from "@/lib/utils";

export interface InterstitialProps {
  quote: string;
  author?: string;
  fact?: string;
  onContinue: () => void;
}

export function Interstitial({ quote, author, fact, onContinue }: InterstitialProps) {
  return (
    <div className="flex flex-col py-12">
      <div className="flex flex-col gap-6">
        {fact && (
          <span className="text-eyebrow inline-block text-accent-blue">
            Did you know?
          </span>
        )}
        <blockquote className={cn(fact ? "mt-1" : "")}>
          <p className="text-[22px] font-medium leading-[1.4] tracking-tight text-text-dark tablet:text-[26px] desktop:text-[28px]">
            &ldquo;{quote}&rdquo;
          </p>
          {author && (
            <footer className="mt-4 text-base text-text-grey">
              — {author}
            </footer>
          )}
        </blockquote>
        {fact && (
          <p className="text-base leading-relaxed text-text-section-desc">
            {fact}
          </p>
        )}
      </div>

      <button
        onClick={onContinue}
        className="mt-10 inline-flex items-center gap-2 text-base font-medium text-text-dark underline-offset-4 transition-colors hover:text-neutral-600 hover:underline"
      >
        Continue
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}
