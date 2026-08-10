"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { DomainScore } from "@/lib/score-engine";

interface DomainBreakdownProps {
  domains: DomainScore[];
}

export function DomainBreakdown({ domains }: DomainBreakdownProps) {
  const [open, setOpen] = useState(false);

  if (!domains || domains.length === 0) return null;

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-accent-line/40 bg-white p-4 text-left transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        aria-expanded={open}
      >
        <span>
          <span className="text-eyebrow block text-text-grey">Skill breakdown</span>
          <span className="mt-1 flex flex-wrap items-center gap-2">
            {domains.map((d) => (
              <span
                key={d.id}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white"
                style={{ background: domainLabelColor(d.tier) }}
              >
                {d.shortLabel}: {d.score}%
              </span>
            ))}
          </span>
        </span>
        {open ? <ArrowUp className="size-5 text-text-grey" /> : <ArrowDown className="size-5 text-text-grey" />}
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-3">
          {domains.map((domain, i) => (
            <div
              key={domain.id}
              className="animate-score-fade rounded-xl border border-accent-line/40 bg-white p-4 tablet:p-5 dark:border-white/10 dark:bg-neutral-900"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold tracking-tight text-text-dark">
                      {domain.label}
                    </h4>
                    <span
                      className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
                      style={{ background: domainLabelColor(domain.tier) }}
                    >
                      {domain.tierLabel}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-grey">{domain.commentary}</p>
                </div>
                <span className="shrink-0 text-lg font-bold tabular-nums tracking-tight text-text-dark">
                  {domain.score}%
                </span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full animate-score-bar"
                  style={{
                    width: `${domain.score}%`,
                    background: domainBarColor(domain.tier),
                    animationDelay: `${i * 80 + 150}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function domainLabelColor(tier: string): string {
  switch (tier) {
    case "beginner":   return "#FF8C8C";
    case "developing": return "#FFC078";
    case "proficient": return "#7a8fa6";
    case "expert":     return "#4ADE80";
    default:           return "#8a8a8a";
  }
}

function domainBarColor(tier: string): string {
  switch (tier) {
    case "beginner":   return "#FF8C8C";
    case "developing": return "#FFC078";
    case "proficient": return "#7a8fa6";
    case "expert":     return "#4ADE80";
    default:           return "#c8d0d8";
  }
}
