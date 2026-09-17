"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { useStackFront } from "@/components/ui/motion-card-stack";
import { QuestionFace } from "./stacked-deck";
import { TRACKS, type TrackKey } from "@/lib/constants";
import { weeklyCopy, type GamePlanResult } from "@/lib/score-engine";
import { cn } from "@/lib/utils";

const CHIP_COLORS = ["#7a8fa6", "#2d2d2d", "#c8d0d8", "#e8eef4"];

function HoldDrag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} onPointerDown={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
}

function MedalBurst({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  const chips = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: (i % 2 === 0 ? -1 : 1) * (18 + ((i * 19) % 86)),
        y: 28 + ((i * 23) % 96),
        rotate: (i * 41) % 160,
        color: CHIP_COLORS[i % CHIP_COLORS.length],
        delay: i * 0.028,
      })),
    [],
  );

  if (!play || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
      {chips.map((chip) => (
        <motion.span
          key={chip.id}
          className="absolute left-1/2 top-[38%] h-2 w-[5px] rounded-[1px]"
          style={{ backgroundColor: chip.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{ x: chip.x, y: chip.y, opacity: 0, scale: 0.55, rotate: chip.rotate }}
          transition={{ duration: 0.95, delay: chip.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

function TrophyMedal({ play }: { play: boolean }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative grid size-[5.5rem] place-items-center rounded-full text-[#1a242e]"
      style={{
        background: "radial-gradient(circle at 32% 28%, #c5d0da 0%, #7a8fa6 48%, #3d5164 100%)",
        boxShadow:
          "0 12px 28px rgba(12, 16, 22, 0.38), inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -10px 18px rgba(12,16,22,0.28)",
      }}
      initial={reduce || !play ? false : { scale: 0.72, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <svg viewBox="0 0 32 32" className="size-9" aria-hidden>
        <path
          fill="currentColor"
          d="M9 5h14v3.2c0 3.4-2.3 6.3-5.4 7.1V18h3.2v2.2H11.2V18H14.4v-2.7C11.3 14.5 9 11.6 9 8.2V5Zm-2.2 1.4H5.2v2.6c0 1.9 1.2 3.5 2.9 4.1-.2-.8-.3-1.6-.3-2.5V6.4Zm20 0h1.6v2.6c0 1.9-1.2 3.5-2.9 4.1.2-.8.3-1.6.3-2.5V6.4ZM12.2 22.4h7.6L18.2 26h-4.4l-1.6-3.6Z"
        />
      </svg>
    </motion.div>
  );
}

export function ResultHeroCard({
  result,
  userName,
}: {
  result: GamePlanResult;
  userName?: string;
}) {
  const reduce = useReducedMotion();
  const hello = userName ? `${userName}, this is your track.` : "This is your track.";

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/12 px-6 py-8 text-center text-[#f4f6f8] shadow-[0_8px_18px_rgba(0,0,0,0.35)] tablet:px-10 tablet:py-10"
      style={{ backgroundImage: "linear-gradient(165deg, #0d1218 0%, #1c2834 46%, #3d5164 100%)" }}
    >
      <MedalBurst play={!reduce} />
      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center">
        <TrophyMedal play={!reduce} />
        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-[#c8d0d8]">
          {result.trackBadge}
        </p>
        <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] tablet:text-[36px]">
          {result.trackTitle}
        </h3>
        <p className="mt-3 max-w-[34ch] text-base leading-relaxed text-[#d5dde4]">{hello}</p>
      </div>
    </div>
  );
}

export function ResultStatsCard({ result }: { result: GamePlanResult }) {
  const front = useStackFront();
  const [fill, setFill] = useState(false);

  useEffect(() => {
    if (front) setFill(true);
  }, [front]);

  const total = result.tallies.reduce((sum, row) => sum + row.points, 0);
  const rows = (["a", "b", "c"] as TrackKey[]).map((key) => {
    const points = result.tallies.find((row) => row.key === key)?.points ?? 0;
    const pct = total > 0 ? Math.round((points / total) * 100) : 0;
    return { key, label: TRACKS[key].title, pct, winner: result.track === key };
  });

  const facts = [
    result.goal ? { label: "90 days", value: result.goal } : null,
    result.hours ? { label: "Hours a machine could take", value: result.hours } : null,
    result.weeklyTime ? { label: "Time you can give", value: result.weeklyTime } : null,
  ].filter((row): row is { label: string; value: string } => Boolean(row));

  return (
    <QuestionFace className="flex min-h-full flex-col">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
        Stats
      </p>
      <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-text-dark tablet:text-[28px]">
        How your answers leaned
      </h3>
      <div className="mt-6 flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.key}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-text-dark">{row.label}</span>
              <span className="tabular-nums text-text-section-desc">{row.pct}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-sm bg-neutral-200 dark:bg-neutral-800">
              <div
                className={cn("h-full rounded-sm", row.winner ? "bg-neutral-950 dark:bg-white" : "bg-[#7a8fa6]")}
                style={{
                  width: fill ? `${row.pct}%` : "0%",
                  transition: "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {facts.length > 0 && (
        <dl className="mt-8 grid gap-4 border-t border-accent-line pt-5 dark:border-white/12 tablet:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-section-desc">
                {fact.label}
              </dt>
              <dd className="mt-1 text-base font-medium text-text-dark">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </QuestionFace>
  );
}

export function ResultDetailsCard({
  result,
  userName,
}: {
  result: GamePlanResult;
  userName?: string;
}) {
  const greeting = userName
    ? `${userName}, ${result.who.charAt(0).toLowerCase()}${result.who.slice(1)}`
    : result.who;

  return (
    <QuestionFace className="flex min-h-full flex-col">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
        The reading
      </p>
      <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-text-dark tablet:text-[28px]">
        Why {result.trackTitle}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-text-section-desc">{greeting}</p>
      <p className="mt-3 text-base leading-relaxed text-text-section-desc">{result.explanation}</p>
      {result.vision.length > 0 && (
        <div className="mt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-section-desc">
            Six months
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-base text-text-dark">
            {result.vision.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </QuestionFace>
  );
}

export function ResultProgrammeCard({ result }: { result: GamePlanResult }) {
  const timeLine = weeklyCopy(result.weeklyTime);

  return (
    <QuestionFace className="flex min-h-full flex-col items-center justify-center text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
        Programme
      </p>
      <h3 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-text-dark tablet:text-[32px]">
        {result.programme}
      </h3>
      <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-text-section-desc">{timeLine}</p>
      <HoldDrag className="mt-8 w-full max-w-xs">
        <a
          href={result.programmeHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "primary" }), "min-h-11 w-full text-white")}
        >
          {result.programmeCta}
        </a>
      </HoldDrag>
    </QuestionFace>
  );
}

export function ResultCallCard({ result }: { result: GamePlanResult }) {
  return (
    <QuestionFace className="flex min-h-full flex-col items-center justify-center text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
        Next
      </p>
      <h3 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-text-dark tablet:text-[32px]">
        Book a discovery call
      </h3>
      <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-text-section-desc">
        The next step is a conversation, not another course tab.
      </p>
      <HoldDrag className="mt-8 w-full max-w-xs">
        <a
          href={result.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "primary" }), "min-h-11 w-full text-white")}
        >
          {result.ctaLabel}
        </a>
      </HoldDrag>
    </QuestionFace>
  );
}
