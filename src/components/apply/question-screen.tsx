"use client";

import { BrandLogos, OptionIcon } from "./option-icon";
import { QuestionFace } from "./stacked-deck";
import type { Question } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface QuestionScreenProps {
  question: Question;
  selected: string[];
  onToggle: (value: string) => void;
  onDone?: () => void;
}

export function QuestionScreen({ question, selected, onToggle, onDone }: QuestionScreenProps) {
  const isEntry = question.id === "entry";
  const isTools = question.id === "q08";
  const isMulti = question.type === "multi";

  return (
    <QuestionFace>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
        {question.number === null
          ? "Start"
          : `Question ${String(question.number).padStart(2, "0")}`}
        {isMulti ? " · pick all that apply" : " · tap one"}
      </p>
      <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-text-dark tablet:text-[28px]">
        {question.prompt}
      </h2>
      {question.subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-text-section-desc">{question.subtitle}</p>
      )}

      <div
        role={isMulti ? "group" : "radiogroup"}
        aria-label={question.prompt}
        className={cn(
          "mt-6 grid grid-cols-2 gap-3",
          isTools && "tablet:grid-cols-4",
        )}
      >
        {question.options.map((option) => {
          const active = selected.includes(option.value);
          const showIcon = Boolean(option.icon);
          const showLogos = Boolean(option.logos?.length);

          return (
            <button
              key={option.value}
              type="button"
              role={isMulti ? "checkbox" : "radio"}
              aria-checked={active}
              onClick={() => onToggle(option.value)}
              className={cn(
                "flex min-h-16 items-center gap-2 rounded-md border px-5 py-4 text-left text-[17px] font-medium leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800/40 dark:focus-visible:ring-white/40",
                isEntry && "min-h-[136px] flex-col items-center justify-center gap-3 px-4 py-5 text-center",
                isTools && "min-h-[120px] flex-col items-center justify-center gap-3 px-4 py-5 text-center",
                (showIcon || showLogos) && !isEntry && !isTools && "min-h-[112px] flex-col items-center justify-center gap-2 px-4 py-5 text-center",
                active
                  ? "border-neutral-800 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950"
                  : "border-accent-line bg-neutral-50 text-text-dark hover:border-neutral-400 dark:border-white/12 dark:bg-neutral-800 dark:hover:border-white/30",
              )}
            >
              {showLogos && option.logos ? (
                <BrandLogos srcs={option.logos} />
              ) : (
                showIcon && option.icon && (
                  <OptionIcon name={option.icon} size={isEntry ? "lg" : "sm"} />
                )
              )}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      {isMulti && onDone && (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onDone}
            disabled={selected.length === 0}
            className="min-h-11 text-sm font-medium text-text-dark disabled:text-text-section-desc"
          >
            That&apos;s all
          </button>
        </div>
      )}
    </QuestionFace>
  );
}
