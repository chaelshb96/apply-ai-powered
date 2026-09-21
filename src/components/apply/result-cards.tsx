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
        delay: 0.2 + i * 0.028,
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

// One glyph per track: a start marker, a system that runs itself, a team all using it.
function TrackGlyph({ track }: { track: TrackKey }) {
  if (track === "b") {
    return (
      <>
        <circle cx="24" cy="24" r="9.8" fill="none" stroke="currentColor" strokeWidth="4.4" />
        <circle cx="24" cy="24" r="3.2" fill="currentColor" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x="21.4"
            y="7.4"
            width="5.2"
            height="5.6"
            rx="1.4"
            fill="currentColor"
            transform={`rotate(${i * 45} 24 24)`}
          />
        ))}
      </>
    );
  }

  if (track === "c") {
    return (
      <>
        <path
          d="M24 13.5 12.5 33.5M24 13.5 35.5 33.5M12.5 33.5h23"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="24" cy="11.5" r="5.6" fill="currentColor" />
        <circle cx="11.5" cy="34.5" r="5.6" fill="currentColor" />
        <circle cx="36.5" cy="34.5" r="5.6" fill="currentColor" />
      </>
    );
  }

  return (
    <>
      <rect x="10.6" y="5.5" width="3.8" height="37" rx="1.7" fill="currentColor" />
      <path
        d="M16 8.2c6.4-3.4 12.8 3.4 19.2 0v14.4c-6.4 3.4-12.8-3.4-19.2 0V8.2Z"
        fill="currentColor"
      />
    </>
  );
}

function TrackMedal({ track, play }: { track: TrackKey; play: boolean }) {
  const reduce = useReducedMotion();
  const still = reduce || !play;

  return (
    <div className="relative grid place-items-center">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute size-[15rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(122,143,166,0.38) 0%, rgba(122,143,166,0.12) 45%, rgba(122,143,166,0) 70%)",
        }}
        initial={still ? false : { opacity: 0, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {!still && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute size-[8rem] rounded-full border border-white/35 tablet:size-[9rem]"
          initial={{ scale: 0.92, opacity: 0.6 }}
          animate={{ scale: 1.85, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <motion.div
        className="relative grid size-[8rem] place-items-center overflow-hidden rounded-full tablet:size-[9rem]"
        style={{
          background:
            "radial-gradient(circle at 34% 26%, #eef3f7 0%, #c5d2dd 18%, #93a7b9 46%, #64809a 72%, #2e4256 100%)",
          boxShadow: [
            "0 26px 40px -16px rgba(6, 10, 15, 0.72)",
            "inset 0 2px 1px rgba(255, 255, 255, 0.62)",
            "inset 0 -20px 28px rgba(9, 13, 19, 0.46)",
            "inset 0 -3px 3px rgba(197, 214, 230, 0.42)",
          ].join(", "),
        }}
        initial={still ? false : { scale: 0.66, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 360, damping: 18, mass: 0.9 }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-[15%] top-[10%] h-[24%] w-[36%] -rotate-[20deg] rounded-[50%] blur-[7px]"
          style={{
            background:
              "linear-gradient(155deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.38) 55%, rgba(255,255,255,0) 100%)",
          }}
        />

        <motion.svg
          viewBox="0 0 48 48"
          fill="none"
          className="relative size-[3.6rem] text-[#f7fafc] tablet:size-[4.1rem]"
          style={{
            filter:
              "drop-shadow(0 2px 3px rgba(8, 13, 20, 0.55)) drop-shadow(0 0 1px rgba(8, 13, 20, 0.5))",
          }}
          aria-hidden
          initial={still ? false : { scale: 0.86, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{
            clipPath: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
            scale: { type: "spring", stiffness: 380, damping: 16, delay: 0.3 },
            opacity: { duration: 0.18, delay: 0.3 },
          }}
        >
          <TrackGlyph track={track} />
        </motion.svg>

        {!still && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-[-40%] left-0 w-[40%] -rotate-[18deg] blur-[10px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)",
            }}
            initial={{ x: "-160%", opacity: 0 }}
            animate={{ x: "300%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.15, delay: 0.62, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </div>
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
        <TrackMedal track={result.track} play={!reduce} />
        <motion.p
          className="mt-8 rounded-sm px-5 py-2.5 text-[14px] font-semibold uppercase leading-none tracking-[0.22em] text-[#eaf1f7]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.28), 0 8px 16px -10px rgba(0,0,0,0.7)",
          }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          {result.trackBadge}
        </motion.p>
        <motion.h3
          className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.035em] tablet:text-[44px]"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
        >
          {result.trackTitle}
        </motion.h3>
        <motion.p
          className="mt-3 max-w-[34ch] text-base leading-relaxed text-[#d5dde4]"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          {hello}
        </motion.p>
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
