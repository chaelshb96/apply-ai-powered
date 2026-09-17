import { NextResponse } from "next/server";
import {
  gamePlanEmailHtml,
  gamePlanEmailSubject,
  gamePlanEmailText,
} from "@/lib/game-plan-email";
import { resend } from "@/lib/resend";
import { calculateGamePlan, isAnswerMap } from "@/lib/score-engine";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM = (process.env.RESEND_FROM ?? "AI Powered <onboarding@resend.dev>").replace(
  /^["']|["']$/g,
  "",
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, answers } = body as {
      name?: unknown;
      email?: unknown;
      answers?: unknown;
    };

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!isAnswerMap(answers)) {
      return NextResponse.json({ error: "Answers are required." }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const plan = calculateGamePlan(answers);

    if (!process.env.RESEND_API_KEY) {
      console.error("Resend email error: RESEND_API_KEY is missing.");
      return NextResponse.json({ ok: true, emailed: false });
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: trimmedEmail,
      subject: gamePlanEmailSubject(plan),
      html: gamePlanEmailHtml(trimmedName, plan),
      text: gamePlanEmailText(trimmedName, plan),
    });

    if (error) {
      console.error("Resend email error:", error);
      return NextResponse.json({ ok: true, emailed: false });
    }

    return NextResponse.json({ ok: true, emailed: true });
  } catch (error) {
    console.error("Apply route error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
