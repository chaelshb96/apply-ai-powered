"use client";

import { ReactNode } from "react";

export interface QuestionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  phaseLabel?: string;
}

export function QuestionCard({
  title,
  subtitle,
  children,
  className,
  phaseLabel,
}: QuestionCardProps) {
  return (
    <div className={className}>
      {phaseLabel && (
        <span className="text-eyebrow mb-3 inline-block text-accent-blue">
          {phaseLabel}
        </span>
      )}
      <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.015em]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-text-grey">{subtitle}</p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}
