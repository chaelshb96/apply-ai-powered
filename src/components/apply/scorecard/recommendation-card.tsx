"use client";

import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RecommendationCardProps {
  service: Service;
  variant: "primary" | "secondary";
  explanation?: string;
  delay?: number;
}

export function RecommendationCard({
  service,
  variant,
  explanation,
  delay = 0,
}: RecommendationCardProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "animate-score-fade rounded-xl border p-5 tablet:p-7",
        isPrimary
          ? "border-neutral-800 bg-neutral-50 ring-1 ring-neutral-800/10"
          : "border-accent-line/40 bg-white",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className={cn(
        "text-eyebrow mb-2 inline-block",
        isPrimary ? "text-neutral-600" : "text-text-grey",
      )}>
        {isPrimary ? "Best Match" : "Runner Up"}
      </span>
      <h3 className="text-[22px] font-semibold tracking-tight tablet:text-[26px]">
        {service.label}
      </h3>
      <p className="mt-3 text-text-section-desc leading-relaxed">
        {service.description}
      </p>
      {explanation && (
        <p className="mt-3 text-sm leading-relaxed text-text-grey">
          {explanation}
        </p>
      )}
      <Button
        variant={isPrimary ? "primary" : "secondary"}
        size="default"
        className="mt-6"
        asChild
      >
        <a href={service.ctaHref} target="_blank" rel="noopener noreferrer">
          {service.ctaLabel}
          <ArrowUpRight className="size-4" />
        </a>
      </Button>
    </div>
  );
}
