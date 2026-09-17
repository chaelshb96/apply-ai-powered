import { ApplyFlowContainer } from "@/components/apply/apply-flow-container";
import { QUIZ_MAX_WIDTH_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <ApplyFlowContainer />
      <footer className="border-t border-accent-line/40 py-6 dark:border-white/10">
        <div className={cn("mx-auto px-5 text-center text-sm text-text-section-desc tablet:px-8", QUIZ_MAX_WIDTH_CLASS)}>
          &copy; {new Date().getFullYear()} AI Powered. All rights reserved.
        </div>
      </footer>
    </>
  );
}
