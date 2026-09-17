"use client";

import type { ReactNode } from "react";
import { ApplyHeader } from "@/components/layout/apply-header";

export function QuizShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#e7edf3] dark:bg-neutral-950">
      <div className="quiz-shell flex min-h-dvh w-full max-w-[430px] flex-1 flex-col tablet:my-8 tablet:min-h-0 tablet:rounded-[36px] tablet:shadow-[0_28px_64px_rgba(45,45,45,0.22)] dark:tablet:shadow-[0_28px_64px_rgba(0,0,0,0.55)]">
        <ApplyHeader />
        <main className="flex flex-1 flex-col px-5 pb-6 pt-3">{children}</main>
        <p className="px-5 pb-6 text-center text-xs text-text-section-desc tablet:pb-8">
          &copy; {new Date().getFullYear()} AI Powered. All rights reserved.
        </p>
      </div>
    </div>
  );
}
