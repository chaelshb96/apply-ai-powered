"use client";

import type { DomainScore } from "@/lib/score-engine";

interface DomainBreakdownProps {
  domains: DomainScore[];
}

export function DomainBreakdown({ domains }: DomainBreakdownProps) {
  if (!domains || domains.length === 0) return null;

  return (
    <section>
      <span className="text-eyebrow text-text-grey">Skill breakdown</span>
      <h3 className="mt-2 text-xl font-semibold tracking-tight tablet:text-2xl">Where you stand on each domain</h3>

      <div className="mt-6 flex flex-col gap-4">
        {domains.map((domain, i) => (
          <div
            key={domain.id}
            className="animate-score-fade rounded-xl border border-accent-line/40 bg-white p-5 tablet:p-6"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold tracking-tight text-text-dark tablet:text-lg">
                    {domain.label}
                  </h4>
                  <span
                    className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ background: domainLabelColor(domain.tier), color: "#fff" }}
                  >
                    {domain.tierLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-grey">{domain.commentary}</p>
              </div>
              <span className="shrink-0 text-2xl font-bold tabular-nums tracking-tight text-text-dark tablet:text-3xl">
                {domain.score}%
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full animate-score-bar"
                style={{
                  width: `${domain.score}%`,
                  background: domainBarColor(domain.tier),
                  animationDelay: `${i * 100 + 200}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
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
