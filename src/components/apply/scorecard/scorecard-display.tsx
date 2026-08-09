"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, Copy, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROGRAMMES, SERVICES } from "@/lib/constants";
import type { ScorecardResult } from "@/lib/score-engine";

export interface ScorecardDisplayProps {
  result: ScorecardResult;
  userName?: string;
  shareToken?: string;
  readonly?: boolean;
  onReset?: () => void;
}

function MatchRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 43;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex size-28 shrink-0 items-center justify-center tablet:size-32">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="43" fill="none" stroke="#e8ebee" strokeWidth="5" />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-score-bar"
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <strong className="text-3xl leading-none tracking-tight">{score}%</strong>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-grey">match</span>
      </div>
    </div>
  );
}

function OtherProgrammeCard({ label, description, href, icon }: (typeof PROGRAMMES)[number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-accent-line/40 bg-white p-4 transition-colors hover:border-accent-blue/60 hover:bg-neutral-50"
    >
      <span className="text-xl" aria-hidden>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-text-dark">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-text-grey">{description}</span>
      </span>
      <ArrowRight className="mt-0.5 size-4 shrink-0 text-text-grey transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function ScorecardDisplay({ result, userName, shareToken, readonly = false, onReset }: ScorecardDisplayProps) {
  const [showServices, setShowServices] = useState(true);
  const [copied, setCopied] = useState(false);
  const primary = SERVICES[result.primary.key];
  const otherProgrammes = PROGRAMMES.filter((programme) => programme.key !== result.primary.key);

  const handleCopyLink = () => {
    if (!shareToken) return;
    const link = `${window.location.origin}/r/${shareToken}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 desktop:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] desktop:items-start desktop:gap-10">
        <div className="flex flex-col gap-8">
          {userName && (
            <p className="animate-score-fade text-xl font-medium tracking-tight text-text-dark tablet:text-2xl">
              Nice one, {userName} — here&apos;s your match
            </p>
          )}

          <section className="animate-score-fade rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-white tablet:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <span className="text-eyebrow text-white/55">01 · Your match</span>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/65">
                  <span aria-hidden>{primary.icon}</span>
                  <span>{primary.category === "programme" ? "Programme" : "Service"}</span>
                </div>
                <h2 className="mt-2 max-w-lg text-[28px] font-semibold leading-tight tracking-tight tablet:text-[38px]">
                  {primary.label}
                </h2>
              </div>
              <MatchRing score={result.primary.score} />
            </div>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70">{result.explanation}</p>
            <Button variant="primary" size="default" className="mt-7 bg-white text-neutral-950 hover:bg-white/85" asChild>
              <a href={primary.ctaHref} target="_blank" rel="noopener noreferrer">
                {primary.ctaLabel}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <span className="text-eyebrow text-text-grey">02 · Explore more</span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight tablet:text-2xl">Other programmes</h3>
              </div>
              <span className="hidden text-sm text-text-grey tablet:block">Not your top match, still worth exploring.</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {otherProgrammes.map((programme) => (
                <OtherProgrammeCard
                  key={programme.key}
                  label={programme.label}
                  description={programme.description}
                  href={programme.href}
                  icon={programme.icon}
                />
              ))}
            </div>
          </section>

          <section>
            <button
              type="button"
              onClick={() => setShowServices((visible) => !visible)}
              className="flex w-full items-center justify-between rounded-xl border border-accent-line/40 bg-white p-5 text-left transition-colors hover:bg-neutral-50"
              aria-expanded={showServices}
            >
              <span>
                <span className="text-eyebrow block text-text-grey">03 · Other services</span>
                <span className="mt-1 block text-lg font-semibold tracking-tight">Services for your next move</span>
              </span>
              {showServices ? <ArrowUp className="size-5 text-text-grey" /> : <ArrowDown className="size-5 text-text-grey" />}
            </button>
            {showServices && (
              <div className="mt-3 flex flex-col gap-3 rounded-xl border border-accent-line/40 bg-white p-5 tablet:p-6">
                <p className="text-sm leading-relaxed text-text-grey">Your answers create a fit across our other services.</p>
                {result.allScores.map((score, index) => (
                  <div key={score.key} className="animate-score-fade" style={{ animationDelay: `${index * 70}ms` }}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-text-dark">{SERVICES[score.key].label}</span>
                      <span className="text-xs font-semibold tabular-nums text-text-grey">{score.score}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                      <div className="h-full rounded-full bg-accent-blue animate-score-bar" style={{ width: `${score.score}%`, animationDelay: `${index * 70 + 150}ms` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="flex flex-col gap-6 desktop:sticky desktop:top-24">
          <section className="rounded-2xl border border-accent-line/50 bg-white p-5 tablet:p-7">
            <span className="text-eyebrow text-text-grey">What changes when you start</span>
            <h3 className="mt-2 text-xl font-semibold tracking-tight tablet:text-2xl">Before → After</h3>
            <div className="mt-5 overflow-hidden rounded-xl border border-accent-line/30">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-accent-line/30 bg-neutral-50">
                    <th className="px-4 py-3 font-semibold text-text-dark">Before</th>
                    <th className="w-10 px-0 py-3" aria-hidden />
                    <th className="px-4 py-3 font-semibold text-text-dark">After</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-line/20">
                  {primary.comparisons.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}>
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
            <div className="mt-4 border-t border-accent-line/40 pt-4">
              <p className="text-sm leading-relaxed text-text-grey">
                Your second-best fit is <strong className="font-semibold text-text-dark">{result.secondary.label}</strong>, a strong follow-on once you have momentum.
              </p>
            </div>
          </section>

          {shareToken && (
            <section className="rounded-2xl border border-accent-line/50 bg-white p-5 tablet:p-7">
              <span className="text-eyebrow text-text-grey">Share your result</span>
              <p className="mt-2 text-sm leading-relaxed text-text-section-desc">
                A copy of these results has been sent to your email. You can also share this link anytime.
              </p>
              <button
                onClick={handleCopyLink}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-accent-line bg-white px-4 h-[36px] text-sm font-medium text-text-dark transition-colors hover:bg-neutral-50"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy share link
                  </>
                )}
              </button>
            </section>
          )}
        </aside>
      </div>

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
