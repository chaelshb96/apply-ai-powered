import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ApplyHeader } from "@/components/layout/apply-header";
import { ResultDeck } from "@/components/apply/result-deck";
import { isGamePlanResult } from "@/lib/score-engine";
import { QUIZ_MAX_WIDTH_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

  const result = data.scores;
  const name = data.name as string;

  return (
    <>
      <ApplyHeader />
      <main className="flex flex-1 flex-col">
        <div className={cn("mx-auto w-full flex-1 px-5 py-8 tablet:px-8 tablet:py-10", QUIZ_MAX_WIDTH_CLASS)}>
          {isGamePlanResult(result) ? (
            <ResultDeck result={result} userName={name} readonly />
          ) : (
            <p className="text-text-section-desc">
              This link is from an older quiz format and cannot be shown as a Game Plan.
            </p>
          )}
        </div>
      </main>
      <footer className="border-t border-accent-line/40 py-6 dark:border-white/10">
        <div className={cn("mx-auto px-5 text-center text-sm text-text-section-desc tablet:px-8", QUIZ_MAX_WIDTH_CLASS)}>
          &copy; {new Date().getFullYear()} AI Powered. All rights reserved.
        </div>
      </footer>
    </>
  );
}
