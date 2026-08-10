"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface InterstitialProps {
  quote: string;
  author?: string;
  fact?: string;
  onContinue: () => void;
}

const UNSPLASH_QUERIES = [
  "technology",
  "artificial-intelligence",
  "digital",
  "future",
  "innovation",
  "abstract",
];

function getRandomImageUrl(): string {
  const query = UNSPLASH_QUERIES[Math.floor(Math.random() * UNSPLASH_QUERIES.length)];
  return `https://source.unsplash.com/featured/?${query}`;
}

export function Interstitial({ quote, author, fact, onContinue }: InterstitialProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl] = useState(getRandomImageUrl);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // fallback
  }, [imageUrl]);

  return (
    <div className="relative overflow-hidden rounded-2xl transition-opacity duration-500"
      style={{ opacity: imageLoaded ? 1 : 0 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" aria-hidden />

      <div className="relative flex flex-col px-6 py-16 tablet:px-10 tablet:py-20">
        <div className="flex flex-col gap-6">
          {fact && (
            <span className="text-eyebrow inline-block text-white/70">
              Did you know?
            </span>
          )}
          <blockquote className={cn(fact ? "mt-1" : "")}>
            <p className="text-[22px] font-medium leading-[1.4] tracking-tight text-white tablet:text-[26px] desktop:text-[28px]">
              &ldquo;{quote}&rdquo;
            </p>
            {author && (
              <footer className="mt-4 text-base text-white/60">
                — {author}
              </footer>
            )}
          </blockquote>
          {fact && (
            <p className="text-base leading-relaxed text-white/75">
              {fact}
            </p>
          )}
        </div>

        <button
          onClick={onContinue}
          className="mt-10 inline-flex items-center gap-2 text-base font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          Continue
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
