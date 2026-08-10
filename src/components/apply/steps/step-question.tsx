"use client";

import { useEffect, useState } from "react";
import { RadioGroup, type RadioGroupOption } from "@/components/ui/radio-group";
import { QuestionCard } from "@/components/apply/question-card";
import { QUESTIONS, type QuestionCategory } from "@/lib/constants";

export interface StepQuestionProps {
  questionIndex: number;
  value: string;
  onValueChange: (value: string) => void;
}

const PHASE_LABELS: Record<QuestionCategory, string> = {
  phase1: "Phase 1 · About you",
  phase2: "Phase 2 · AI skill assessment",
  phase3: "Phase 3 · Your goals",
};

export function StepQuestion({ questionIndex, value, onValueChange }: StepQuestionProps) {
  const q = QUESTIONS[questionIndex];
  const [options, setOptions] = useState<RadioGroupOption[]>(q?.options ?? []);

  useEffect(() => {
    if (!q || q.type !== "radio") return;

    const frame = requestAnimationFrame(() => {
      const shuffled = [...q.options];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setOptions(shuffled);
    });

    return () => cancelAnimationFrame(frame);
  }, [q]);

  if (!q) return null;

  const isFirstInPhase =
    questionIndex === 0 ||
    QUESTIONS[questionIndex - 1]?.category !== q.category;

  return (
    <QuestionCard
      title={q.question}
      subtitle={q.subtitle}
      phaseLabel={isFirstInPhase ? PHASE_LABELS[q.category] : undefined}
    >
      {q.type === "radio" && (
        <RadioGroup
          options={options}
          value={value}
          onValueChange={onValueChange}
          name={`q-${q.id}`}
          large
        />
      )}
      {q.type === "text" && (
        <input
          type={q.inputType ?? "text"}
          placeholder={q.placeholder}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          autoComplete={q.inputType === "email" ? "email" : "name"}
          className="w-full rounded-xl border border-accent-line/60 bg-white px-5 py-4 text-lg text-text-dark outline-none transition-colors placeholder:text-text-grey focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800/10"
        />
      )}
    </QuestionCard>
  );
}
