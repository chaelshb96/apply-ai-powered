import { Button } from "@/components/ui/button";
import { INTRO } from "@/lib/constants";
import { QuestionFace } from "./stacked-deck";

export function IntroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <QuestionFace className="flex flex-col items-center justify-center text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-section-desc">
        {INTRO.eyebrow}
      </p>
      <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-text-dark tablet:text-[28px]">
        {INTRO.title}
      </h2>
      <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-text-section-desc">
        {INTRO.body}
      </p>
      <Button type="button" onClick={onContinue} className="mt-6 min-h-11">
        {INTRO.cta}
      </Button>
    </QuestionFace>
  );
}
