"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROGRAMS, SERVICES } from "@/lib/constants";
import type { ScorecardResult } from "@/lib/score-engine";
import { RadarChart } from "./radar-chart";
import { DomainBreakdown } from "./domain-breakdown";

export interface ScorecardDisplayProps {
  result: ScorecardResult;
  userName?: string;
  shareToken?: string;
  readonly?: boolean;
  onReset?: () => void;
}

function ProgramCard({ label, description, href, icon }: (typeof PROGRAMS)[number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-accent-line/40 bg-white p-4 transition-colors hover:border-accent-blue/60 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white/20 dark:hover:bg-neutral-800"
    >
      <span className="text-xl" aria-hidden>{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-text-dark">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-text-grey">{description}</span>
      </div>
      <ArrowRight className="mt-0.5 size-4 shrink-0 text-text-grey transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function ScorecardDisplay({ result, userName, shareToken, readonly = false, onReset }: ScorecardDisplayProps) {
  const [showServices, setShowServices] = useState(false);
  const [copied, setCopied] = useState(false);
  const primary = SERVICES[result.primary.key];
  const otherPrograms = PROGRAMS.filter((p) => p.key !== result.primary.key);

  const radarData = result.domainScores.map((d) => ({
    label: d.shortLabel,
    score: d.score,
  }));

  const handleCopyLink = () => {
    if (!shareToken) return;
    const link = `${window.location.origin}/r/${shareToken}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="flex flex-col gap-10">
      {userName && (
        <p className="animate-score-fade text-2xl font-medium tracking-tight text-text-dark tablet:text-3xl">
          Nice one, {userName} — here&apos;s your AI score
        </p>
      )}

      {/* ── HERO: score + tier + radar ── */}
      <section className="grid gap-10 desktop:grid-cols-[1.1fr_0.9fr] desktop:items-start desktop:gap-16">
        <div className="animate-score-fade">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[clamp(100px,15vw,180px)] font-black leading-none tracking-[-0.04em] text-text-dark">
              {result.overallScore}
            </span>
            <span className="text-[clamp(24px,4vw,40px)] font-semibold tracking-[-0.02em] text-text-grey">/100</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-[clamp(20px,3vw,32px)] font-medium tracking-[-0.01em] text-text-grey">You&apos;re</span>
            <span
              className="inline-flex rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white"
              style={{ background: result.tierColor }}
            >
              {result.tierLabel}
            </span>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-section-desc">
            {result.overallCommentary}
          </p>
          <Button variant="primary" size="default" className="mt-7" asChild>
            <a href={primary.ctaHref} target="_blank" rel="noopener noreferrer">
              Level up with {primary.shortLabel}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>

        <div className="animate-score-fade rounded-2xl border border-accent-line/40 bg-white p-6 tablet:p-8 dark:border-white/10 dark:bg-neutral-900">
          <RadarChart data={radarData} primaryColor={result.tierColor} />
        </div>
      </section>

      {/* ── DOMAIN BREAKDOWN ── */}
      <DomainBreakdown domains={result.domainScores} />

      {/* ── RECOMMENDED PROGRAMMES ── */}
      <section>
        <span className="text-eyebrow text-text-grey">Recommended for you</span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight tablet:text-2xl">
          Programmes & services to level up
        </h3>
        <p className="mt-1 text-text-grey text-body">
          Based on your AI skills and goals, here&apos;s what we recommend.
        </p>

        <div className="mt-6 grid gap-4 tablet:grid-cols-2">
          <div className="animate-score-fade rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-white tablet:p-7">
            <div className="flex items-center gap-2 text-sm text-white/65">
              <span aria-hidden>{primary.icon}</span>
              <span>{primary.category === "programme" ? "Programme" : "Service"}</span>
              {result.primary.score >= 60 && (
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                  Top match
                </span>
              )}
            </div>
            <h4 className="mt-3 text-[24px] font-semibold tracking-tight">{primary.label}</h4>
            <p className="mt-3 text-base leading-relaxed text-white/70">{result.explanation}</p>
            <Button variant="primary" size="default" className="mt-6 bg-white text-neutral-950 hover:bg-white/85" asChild>
              <a href={primary.ctaHref} target="_blank" rel="noopener noreferrer">
                {primary.ctaLabel}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {otherPrograms.slice(0, 2).map((program) => (
              <ProgramCard
                key={program.key}
                label={program.label}
                description={program.description}
                href={program.href}
                icon={program.icon}
              />
            ))}
            <div className="animate-score-fade rounded-xl border border-accent-line/40 bg-white p-4 dark:border-white/10 dark:bg-neutral-900">
              <p className="text-sm text-text-grey">
                <strong className="font-semibold text-text-dark">{result.secondary.label}</strong> is your second-best match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section>
        <button
          type="button"
          onClick={() => setShowServices((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-accent-line/40 bg-white p-5 text-left transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          aria-expanded={showServices}
        >
          <span>
            <span className="text-eyebrow block text-text-grey">Other services</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight">Services for your next move</span>
          </span>
          {showServices ? <ArrowUp className="size-5 text-text-grey" /> : <ArrowDown className="size-5 text-text-grey" />}
        </button>
        {showServices && (
              <div className="mt-3 flex flex-col gap-3 rounded-xl border border-accent-line/40 bg-white p-5 tablet:p-6 dark:border-white/10 dark:bg-neutral-900">
            <p className="text-sm leading-relaxed text-text-grey">Your answers create a fit across our other services.</p>
            {result.allScores.map((s, i) => (
              <div key={s.key} className="animate-score-fade" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-text-dark">{s.label}</span>
                  <span className="text-xs font-semibold tabular-nums text-text-grey">{s.score}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                  <div className="h-full rounded-full bg-accent-blue animate-score-bar" style={{ width: `${s.score}%`, animationDelay: `${i * 70 + 150}ms` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── BEFORE → AFTER TABLE ── */}
      <section>
        <span className="text-eyebrow text-text-grey">What changes when you start</span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight tablet:text-2xl">Before → After with {primary.shortLabel}</h3>
        <div className="mt-5 overflow-hidden rounded-xl border border-accent-line/30 dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-accent-line/30 bg-neutral-50 dark:border-white/10 dark:bg-neutral-800">
                <th className="px-4 py-3 font-semibold text-text-dark">Before</th>
                <th className="w-10 px-0 py-3" aria-hidden />
                <th className="px-4 py-3 font-semibold text-text-dark">After</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-line/20 dark:divide-white/5">
              {primary.comparisons.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900" : "bg-neutral-50/50 dark:bg-neutral-850"}>
                  <td className="px-4 py-3 text-text-grey">{row.before}</td>
                  <td className="px-0 py-3 text-center text-accent-blue">
                    <ArrowRight className="mx-auto size-3.5" />
                  </td>
                  <td className="px-4 py-3 font-medium text-text-dark">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SHARE ── */}
      {shareToken && (
        <section className="rounded-2xl border border-accent-line/50 bg-white p-5 tablet:p-7 dark:border-white/10 dark:bg-neutral-900">
          <span className="text-eyebrow text-text-grey">Share your result</span>
          <p className="mt-2 text-sm leading-relaxed text-text-section-desc">
            A copy has been sent to your email. Share this link anytime.
          </p>
          <button
            onClick={handleCopyLink}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-accent-line bg-white px-4 h-[36px] text-sm font-medium text-text-dark transition-colors hover:bg-neutral-50 dark:border-white/15 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            {copied ? (
              <><Check className="size-3.5 text-emerald-600" />Copied</>
            ) : (
              <><Copy className="size-3.5" />Copy share link</>
            )}
          </button>
        </section>
      )}

      {/* ── RETAKE ── */}
      {!readonly && onReset && (
        <div className="flex flex-col items-center gap-3 border-t border-accent-line/40 pt-7 text-center">
          <p className="text-sm text-text-grey">Want to compare your answers again?</p>
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-2 text-text-dark">
            <RefreshCw className="size-3.5" />
            Retake the quiz
          </Button>
        </div>
      )}
    </div>
  );
}
