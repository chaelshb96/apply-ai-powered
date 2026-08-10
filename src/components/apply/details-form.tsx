"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/apply/question-card";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface DetailsFormProps {
  onBack: () => void;
  onSubmit: (name: string, email: string) => void;
}

export function DetailsForm({ onBack, onSubmit }: DetailsFormProps) {
  const [step, setStep] = useState<"name" | "email">("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canGoToEmail = name.trim() !== "";
  const canSubmit = email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (step === "name") {
    return (
      <div className="flex flex-col animate-slide-in-right">
        <QuestionCard
          title="What's your name?"
          subtitle="We'll use this to personalise your results."
        >
          <div>
            <input
              id="apply-name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              autoFocus
              className="w-full rounded-xl border border-accent-line/60 bg-white px-5 py-4 text-lg text-text-dark outline-none transition-colors placeholder:text-text-grey focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800/10 dark:border-white/10 dark:bg-neutral-900 dark:focus:border-white dark:focus:ring-white/10"
            />
          </div>
        </QuestionCard>

        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-neutral-600"
          >
            <ArrowLeft className="size-4" />
            Previous
          </button>
          <Button
            variant="primary"
            size="default"
            disabled={!canGoToEmail}
            onClick={() => setStep("email")}
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-slide-in-right">
      <QuestionCard
        title="What's your email?"
        subtitle="We'll send your results and a shareable link."
      >
        <div>
          <input
            id="apply-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            className="w-full rounded-xl border border-accent-line/60 bg-white px-5 py-4 text-lg text-text-dark outline-none transition-colors placeholder:text-text-grey focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800/10 dark:border-white/10 dark:bg-neutral-900 dark:focus:border-white dark:focus:ring-white/10"
          />
        </div>
      </QuestionCard>

      <div className="mt-10 flex items-center justify-between gap-3">
        <button
          onClick={() => setStep("name")}
          className="flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-neutral-600"
        >
          <ArrowLeft className="size-4" />
          Previous
        </button>
        <Button
          variant="primary"
          size="default"
          disabled={!canSubmit}
          onClick={() => onSubmit(name.trim(), email.trim())}
        >
          See My Results
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
