"use client";

import { cn } from "@/lib/utils";

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <span className="text-sm font-medium text-text-grey">
        {String(currentStep).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
      </span>
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i < currentStep ? "bg-neutral-800 dark:bg-white" : "bg-accent-line/40 dark:bg-white/15",
            )}
          />
        ))}
      </div>
    </div>
  );
}
