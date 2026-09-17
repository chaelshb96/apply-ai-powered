"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CARD_OFFSET = 18;
const SCALE_FACTOR = 0.015;
const DEPTH = 3;

export const DECK_HEIGHT_CLASS = "h-[min(36rem,calc(100dvh-12rem))]";

export type CardStackItem = {
  key: string | number;
  content: ReactNode;
};

function PeekFace() {
  return (
    <div
      aria-hidden
      className="h-full rounded-[22px] border border-accent-line bg-white shadow-[0_8px_18px_rgba(45,45,45,0.08)] dark:border-white/12 dark:bg-neutral-900 dark:shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
    />
  );
}

function padItems(items: CardStackItem[]): CardStackItem[] {
  const padded = [...items];
  const fillers = ["peek-a", "peek-b", "peek-c"] as const;
  let i = 0;
  while (padded.length < DEPTH) {
    padded.push({ key: fillers[i], content: <PeekFace /> });
    i += 1;
  }
  return padded;
}

export function CardStack({
  items,
  cardKey,
  direction = "forward",
  offset = CARD_OFFSET,
  scaleFactor = SCALE_FACTOR,
  className,
  children,
  onExitComplete,
}: {
  items?: CardStackItem[];
  cardKey?: string | number;
  direction?: "forward" | "back";
  offset?: number;
  scaleFactor?: number;
  className?: string;
  children?: ReactNode;
  onExitComplete?: () => void;
}) {
  const reduce = useReducedMotion();
  const stack = padItems(
    items?.length ? items : [{ key: cardKey ?? "card", content: children }],
  );
  const peekReserve = offset * (DEPTH - 1) + 6;
  const cardHeight = `calc(100% - ${peekReserve}px)`;
  const flyOut = typeof window === "undefined" ? -1200 : -window.innerWidth;

  return (
    <div className={cn("relative w-full overflow-visible", DECK_HEIGHT_CLASS, className)}>
      <AnimatePresence initial={false} onExitComplete={onExitComplete}>
        {stack.map((item, index) => {
          const front = index === 0;
          return (
            <motion.div
              key={item.key}
              className={cn(
                "absolute inset-x-0 top-0",
                front ? "overflow-visible" : "pointer-events-none overflow-hidden",
              )}
              style={{
                height: cardHeight,
                transformOrigin: "top center",
              }}
              initial={
                reduce
                  ? false
                  : front && direction === "back"
                    ? { x: -120, opacity: 0.4 }
                    : {
                        y: (index + 1) * offset,
                        scale: 1 - (index + 1) * scaleFactor,
                        rotate: (index + 1) * 1.4,
                        opacity: 0.9,
                      }
              }
              animate={{
                x: 0,
                y: index * offset,
                scale: 1 - index * scaleFactor,
                rotate: index * 1.4,
                opacity: 1,
                zIndex: 20 - index,
              }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : direction === "forward"
                    ? { x: flyOut, rotate: -8, zIndex: 40 }
                    : { opacity: 0, scale: 0.96 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      x: { type: "tween", duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                      rotate: { duration: 0.48 },
                      y: { type: "spring", stiffness: 420, damping: 36, mass: 0.9 },
                      scale: { type: "spring", stiffness: 420, damping: 36, mass: 0.9 },
                    }
              }
            >
              <div className="h-full" aria-hidden={!front} inert={front ? undefined : true}>
                {item.content}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
