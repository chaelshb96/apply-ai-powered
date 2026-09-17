import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function QuestionFace({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full overflow-y-auto rounded-[22px] border border-accent-line bg-white p-6 shadow-[0_8px_18px_rgba(45,45,45,0.08)] tablet:p-7 dark:border-white/12 dark:bg-neutral-900 dark:shadow-[0_8px_18px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
