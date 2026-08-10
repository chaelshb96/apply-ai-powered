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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canSubmit = name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <div className="flex flex-col">
      <QuestionCard
        title="Almost done — who are you?"
        subtitle="We'll personalise your results and send a copy to your inbox."
      >
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="apply-name" className="mb-2 block text-sm font-medium text-text-dark">
              Your name
            </label>
            <input
              id="apply-name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-lg border border-accent-line/60 bg-white px-4 py-3 text-base text-text-dark outline-none transition-colors placeholder:text-text-grey focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800/10 dark:border-white/10 dark:bg-neutral-900 dark:focus:border-white dark:focus:ring-white/10"
            />
          </div>
          <div>
            <label htmlFor="apply-email" className="mb-2 block text-sm font-medium text-text-dark">
              Your email
            </label>
            <input
              id="apply-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-lg border border-accent-line/60 bg-white px-4 py-3 text-base text-text-dark outline-none transition-colors placeholder:text-text-grey focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800/10 dark:border-white/10 dark:bg-neutral-900 dark:focus:border-white dark:focus:ring-white/10"
            />
          </div>
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
