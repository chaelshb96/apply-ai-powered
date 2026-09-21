"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TOTAL_STEPS } from "@/lib/constants";
import { QuestionFace } from "./stacked-deck";

interface CaptureFormProps {
  onBack: () => void;
  onSubmit: (email: string) => void;
  error?: string | null;
}

export function CaptureForm({ onBack, onSubmit, error }: CaptureFormProps) {
  const [email, setEmail] = useState("");

  const canSubmit = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <QuestionFace>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
          {TOTAL_STEPS} / {TOTAL_STEPS}
        </p>
        <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-text-dark tablet:text-[28px]">
          Your Game Plan is ready.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-section-desc">
          Tell us where to send it. We email the plan and a link you can open again.
        </p>

        <form
          className="mt-6 flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSubmit) return;
            onSubmit(email.trim());
          }}
        >
          <div>
            <label htmlFor="game-plan-email" className="text-base font-medium text-text-dark">
              Email
            </label>
            <input
              id="game-plan-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 min-h-14 w-full rounded-md border border-accent-line bg-white px-4 text-[17px] text-text-dark outline-none focus-visible:ring-2 focus-visible:ring-neutral-800/40 dark:border-white/12 dark:bg-neutral-950 dark:focus-visible:ring-white/40"
            />
            <p className="mt-2 text-xs leading-relaxed text-text-section-desc">
              We only use this to send your plan and what comes after it. Nothing else.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="mt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="min-h-11 text-sm font-medium text-text-dark hover:text-neutral-600"
            >
              Back
            </button>
            <Button type="submit" disabled={!canSubmit} className="min-h-11">
              Send my Game Plan
            </Button>
          </div>
        </form>
      </QuestionFace>
  );
}
