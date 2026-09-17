"use client";

import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DECK_HEIGHT_CLASS } from "@/components/ui/card-stack";

const StackFrontContext = createContext(false);

export function useStackFront() {
  return useContext(StackFrontContext);
}

export type MotionStackItem = {
  id: string;
  content: ReactNode;
};

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

function progress(from: number, to: number, value: number) {
  if (from === to) return 1;
  return (value - from) / (to - from);
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

const PEEK = 18;
const SCALE_STEP = 0.015;
const VISIBLE = 3;

function StackCard({
  children,
  index,
  currentIndex,
  total,
  setNext,
  minDistance,
}: {
  children: ReactNode;
  index: number;
  currentIndex: number;
  total: number;
  setNext: () => void;
  minDistance: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const offset = wrap(0, total, index - currentIndex);
  const isTop = offset === 0;
  const zIndex = total - offset;
  const hidden = offset >= VISIBLE;
  const scale = mix(1 - (VISIBLE - 1) * SCALE_STEP, 1, clamp(0, 1, progress(VISIBLE - 1, 0, offset)));
  const y = offset * PEEK;

  const onDragEnd = () => {
    const distance = Math.abs(x.get());
    const speed = Math.abs(x.getVelocity());
    if (distance > minDistance || speed > 50) {
      setNext();
      animate(x, 0, { type: "spring", stiffness: 600, damping: 50 });
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 50 });
    }
  };

  return (
    <motion.li
      aria-hidden={!isTop}
      inert={!isTop}
      className={cn(
        "absolute inset-x-0 top-0 list-none overflow-visible",
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
        hidden && "pointer-events-none",
      )}
      style={{
        height: `calc(100% - ${(VISIBLE - 1) * PEEK + 6}px)`,
        zIndex,
        x: reduce ? 0 : x,
        y,
      }}
      initial={false}
      animate={{
        opacity: hidden ? 0 : 1,
        scale: reduce ? 1 : scale,
      }}
      whileTap={isTop && !reduce ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      drag={isTop && !reduce ? "x" : false}
      dragElastic={0.18}
      onDragEnd={onDragEnd}
    >
      <StackFrontContext.Provider value={isTop}>{children}</StackFrontContext.Provider>
    </motion.li>
  );
}

export function MotionCardStack({
  items,
  className,
}: {
  items: MotionStackItem[];
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stackRef = useRef<HTMLUListElement>(null);
  const [minDistance, setMinDistance] = useState(160);

  useEffect(() => {
    setCurrentIndex(0);
  }, [items[0]?.id, items.length]);

  useEffect(() => {
    if (stackRef.current) setMinDistance(stackRef.current.offsetWidth * 0.45);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentIndex((i) => wrap(0, items.length, i + 1));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentIndex((i) => wrap(0, items.length, i - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  const total = items.length;
  const goNext = () => setCurrentIndex((i) => wrap(0, total, i + 1));
  const goPrev = () => setCurrentIndex((i) => wrap(0, total, i - 1));

  return (
    <div className={cn("w-full overflow-visible", className)}>
      <ul ref={stackRef} className={cn("relative overflow-visible", DECK_HEIGHT_CLASS)}>
        {items.map((item, index) => (
          <StackCard
            key={item.id}
            index={index}
            currentIndex={currentIndex}
            total={total}
            minDistance={minDistance}
            setNext={goNext}
          >
            {item.content}
          </StackCard>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="min-h-11 text-sm font-medium text-text-dark"
        >
          Previous card
        </button>
        <p className="text-sm tabular-nums text-text-section-desc">
          {currentIndex + 1} / {total}
        </p>
        <button
          type="button"
          onClick={goNext}
          className="min-h-11 text-sm font-medium text-text-dark"
        >
          Next card
        </button>
      </div>
      <p className="mt-1 text-center text-xs text-text-section-desc">
        Swipe the card left or right to send it to the back.
      </p>
    </div>
  );
}

export default MotionCardStack;
