import type { Beat } from "@/lib/constants";
import { cn } from "@/lib/utils";

const THEMES: Record<
  string,
  { wash: string; ink: string; ring: string; border: string }
> = {
  a: {
    wash: "linear-gradient(145deg, #1a242e 0%, #3d5164 48%, #5f778c 100%)",
    ink: "#ffffff",
    ring: "focus-visible:ring-white/80",
    border: "border-white/20",
  },
  b: {
    wash: "linear-gradient(180deg, #0d1218 0%, #1c2834 42%, #3d5164 100%)",
    ink: "#f4f6f8",
    ring: "focus-visible:ring-white/80",
    border: "border-white/12",
  },
  proof: {
    wash: "linear-gradient(210deg, #2d2d2d 0%, #334556 46%, #4a6074 100%)",
    ink: "#ffffff",
    ring: "focus-visible:ring-white/80",
    border: "border-white/15",
  },
  c: {
    wash: "linear-gradient(155deg, #a8b8c6 0%, #c8d0d8 44%, #e8eef4 100%)",
    ink: "#2d2d2d",
    ring: "focus-visible:ring-neutral-800/50",
    border: "border-[#b8c2cc]",
  },
};

export function BeatScreen({
  beat,
  onContinue,
}: {
  beat: Beat;
  onContinue: () => void;
}) {
  const theme = THEMES[beat.id] ?? THEMES.a;

  return (
    <button
      type="button"
      onClick={onContinue}
      aria-label={beat.tag}
      className={cn(
        "block h-full w-full rounded-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        theme.ring,
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-y-auto rounded-[22px] border px-6 py-8 shadow-[0_8px_18px_rgba(45,45,45,0.08)] tablet:px-10 tablet:py-10 dark:shadow-[0_8px_18px_rgba(0,0,0,0.35)]",
          theme.border,
        )}
        style={{ backgroundImage: theme.wash, color: theme.ink }}
      >
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <blockquote className="w-full">
            <p className="text-[26px] font-semibold italic leading-snug tracking-[-0.03em] tablet:text-[32px]">
              {beat.title}
            </p>
          </blockquote>
          <p className="mt-5 max-w-[36ch] text-base leading-relaxed">{beat.body}</p>
        </div>
        <p className="mt-8 text-center text-sm font-medium">Tap to continue</p>
      </div>
    </button>
  );
}
