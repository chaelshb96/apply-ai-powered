"use client";

import { ApplyHeader } from "@/components/layout/apply-header";
import { ApplyFlow } from "@/components/apply/apply-flow";
import { QUIZ_MAX_WIDTH_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ApplyFlowContainer() {
  return (
    <>
      <ApplyHeader />
      <main className="flex flex-1 flex-col">
        <div className={cn("mx-auto w-full flex-1 px-5 py-8 tablet:px-8 tablet:py-10", QUIZ_MAX_WIDTH_CLASS)}>
          <ApplyFlow />
        </div>
      </main>
    </>
  );
}
