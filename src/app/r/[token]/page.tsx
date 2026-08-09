import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ScorecardDisplay } from "@/components/apply/scorecard/scorecard-display";
import type { ScorecardResult } from "@/lib/score-engine";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function SharedResultPage({ params }: PageProps) {
  const { token } = await params;

  const { data, error } = await supabase
    .from("responses")
    .select("name, email, scores, created_at")
    .eq("share_token", token)
    .single();

  if (error || !data) {
    notFound();
  }

  const result = data.scores as unknown as ScorecardResult;
  const name = data.name as string;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[56px] max-w-[1440px] items-center px-5 tablet:px-[42px] desktop:h-[64px] desktop:px-16 desktop-xl:px-[88px]">
          <span className="text-lg font-semibold tracking-tight text-text-dark">AI Powered</span>
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-[720px] flex-1 px-5 py-10 tablet:px-[42px] tablet:py-14 desktop:max-w-[1080px] desktop:px-16 desktop:py-20 desktop-xl:px-[88px]">
          <div className="flex flex-col">
            <span className="text-eyebrow text-text-grey">Your Results</span>
            <div className="mt-8 animate-score-fade">
              <ScorecardDisplay result={result} userName={name} readonly />
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-accent-line/30 bg-white py-6">
        <div className="mx-auto max-w-[1440px] px-5 text-center text-sm text-text-grey tablet:px-[42px] desktop:px-16 desktop-xl:px-[88px]">
          &copy; {new Date().getFullYear()} AI Powered. All rights reserved.
        </div>
      </footer>
    </>
  );
}
