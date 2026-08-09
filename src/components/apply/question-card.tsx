"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface QuestionCardProps {
  questionNumber: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function QuestionCard({
  questionNumber,
  title,
  subtitle,
  children,
  className,
}: QuestionCardProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-eyebrow mb-3 inline-block text-text-grey">
        Question {questionNumber}
      </span>
      <h2 className="text-[24px] font-semibold leading-[1.2] tracking-tight tablet:text-[28px] desktop:text-[32px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-text-grey text-body">{subtitle}</p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}
