"use client";

import { cn } from "@/lib/utils";

export interface ScoreBarProps {
  label: string;
  score: number;
  highlighted?: boolean;
  delay?: number;
}

export function ScoreBar({ label, score, highlighted = false, delay = 0 }: ScoreBarProps) {
  return (
    <div
      className="animate-score-fade"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className={cn(
          "text-sm font-medium",
          highlighted ? "text-text-dark" : "text-text-grey",
        )}>
          {label}
        </span>
        <span className={cn(
          "text-sm font-semibold tabular-nums",
          highlighted ? "text-text-dark" : "text-text-grey",
        )}>
          {score}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className={cn(
            "h-full rounded-full animate-score-bar",
            highlighted ? "bg-neutral-800" : "bg-accent-blue/50",
          )}
          style={{
            width: `${score}%`,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
