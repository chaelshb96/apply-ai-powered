"use client";

import { ApplyHeader } from "@/components/layout/apply-header";
import { ApplyFlow } from "@/components/apply/apply-flow";

export function ApplyFlowContainer() {
  return (
    <>
      <ApplyHeader />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-[720px] flex-1 px-5 py-10 tablet:px-[42px] tablet:py-14 desktop:max-w-[1080px] desktop:px-16 desktop:py-20 desktop-xl:px-[88px]">
          <ApplyFlow />
        </div>
      </main>
    </>
  );
}
