"use client";

import { useCallback, useState } from "react";
import { StepIndicator } from "./step-indicator";
import { StepQuestion } from "./steps/step-question";
import { Interstitial } from "./interstitial";
import { DetailsForm } from "./details-form";
import { SkillsLoading } from "./skills-loading";
import { ScorecardDisplay } from "./scorecard/scorecard-display";
import { Button } from "@/components/ui/button";
import { INTERSTITIALS, QUESTIONS } from "@/lib/constants";
import { calculateScorecard, type AnswerMap, type ScorecardResult } from "@/lib/score-engine";
import { ArrowRight, ArrowLeft } from "lucide-react";

const TOTAL_QUESTIONS = QUESTIONS.length;
const INTERSTITIAL_AFTER_STEPS = new Set(Object.keys(INTERSTITIALS).map(Number));

type Phase = "questions" | "interstitial" | "details" | "loading" | "result";
type Direction = "forward" | "back";

export function ApplyFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [phase, setPhase] = useState<Phase>("questions");
  const [result, setResult] = useState<ScorecardResult | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [interstitialAfterStep, setInterstitialAfterStep] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>("forward");
  const [animationKey, setAnimationKey] = useState(0);

  const currentValue = answers[currentStep] ?? "";

  const handleValueChange = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
  }, [currentStep]);

  const goBack = useCallback(() => {
    if (phase === "interstitial") {
      setPhase("questions");
      return;
    }
    setDirection("back");
    setAnimationKey((k) => k + 1);
    setCurrentStep((s) => Math.max(0, s - 1));
  }, [phase]);

  const handleInterstitialContinue = useCallback(() => {
    if (interstitialAfterStep !== null) {
      setDirection("forward");
      setAnimationKey((k) => k + 1);
      setCurrentStep(interstitialAfterStep);
      setInterstitialAfterStep(null);
      setPhase("questions");
    }
  }, [interstitialAfterStep]);

  const goNext = useCallback(() => {
    const nextStepIndex = currentStep + 1;

    if (INTERSTITIAL_AFTER_STEPS.has(nextStepIndex)) {
      setInterstitialAfterStep(nextStepIndex);
      setPhase("interstitial");
      return;
    }

    setDirection("forward");
    setAnimationKey((k) => k + 1);

    if (currentStep < TOTAL_QUESTIONS - 1) {
      setCurrentStep(nextStepIndex);
    } else {
      setPhase("details");
    }
  }, [currentStep]);

  const submitAndGetResult = useCallback(async (name: string, email: string) => {
    setUserName(name);
    setPhase("loading");

    const scorecard = calculateScorecard(answers);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers, scores: scorecard }),
      });

      const data = await response.json();
      if (response.ok && data.shareToken) {
        setShareToken(data.shareToken);
      }
    } catch {
      // Save/share is best-effort; the result still shows.
    }

    setResult(scorecard);
    setPhase("result");
  }, [answers]);

  const handleReset = useCallback(() => {
    setDirection("forward");
    setAnimationKey(0);
    setCurrentStep(0);
    setAnswers({});
    setPhase("questions");
    setResult(null);
    setShareToken(null);
    setUserName(null);
    setInterstitialAfterStep(null);
  }, []);

  const canGoNext = currentValue !== "";
  const showPrevious = currentStep > 0;

  const slideClass =
    direction === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left";

  if (phase === "interstitial" && interstitialAfterStep !== null) {
    const data = INTERSTITIALS[interstitialAfterStep];
    if (!data) return null;

    return (
      <div className="flex flex-col">
        <div key={`interstitial-${interstitialAfterStep}-${animationKey}`} className={`mt-4 ${slideClass}`}>
          <Interstitial
            quote={data.quote}
            author={data.author}
            fact={data.fact}
            onContinue={handleInterstitialContinue}
          />
        </div>
        <div className="mt-10">
          <button
            onClick={goBack}
            className="text-sm font-medium text-text-dark transition-colors hover:text-neutral-600"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (phase === "details") {
    return (
      <div className="animate-slide-in-right">
        <DetailsForm onBack={() => setPhase("questions")} onSubmit={submitAndGetResult} />
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="flex flex-col">
        <SkillsLoading />
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="flex flex-col">
        <div className="mt-8 animate-score-fade">
          <ScorecardDisplay
            result={result}
            userName={userName ?? undefined}
            shareToken={shareToken ?? undefined}
            onReset={handleReset}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <StepIndicator currentStep={currentStep + 1} totalSteps={TOTAL_QUESTIONS} />

      <div key={`q-${currentStep}-${animationKey}`} className={`mt-8 tablet:mt-10 ${slideClass}`}>
        <StepQuestion
          questionIndex={currentStep}
          value={currentValue}
          onValueChange={handleValueChange}
        />
      </div>

      <div className="mt-10 flex items-center justify-between gap-3">
        <div>
          {showPrevious && (
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-neutral-600"
            >
              <ArrowLeft className="size-4" />
              Previous
            </button>
          )}
        </div>
        <Button
          variant="primary"
          size="default"
          disabled={!canGoNext}
          onClick={goNext}
        >
          {currentStep < TOTAL_QUESTIONS - 1 ? "Next" : "Continue"}
          {currentStep < TOTAL_QUESTIONS - 1 && <ArrowRight className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
