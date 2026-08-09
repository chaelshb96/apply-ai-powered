import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import type { ScorecardResult } from "@/lib/score-engine";
import type { AnswerMap } from "@/lib/score-engine";

function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const segments = [8, 4, 4, 4].map((len) => {
    let segment = "";
    for (let i = 0; i < len; i += 1) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  });
  return segments.join("-");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, answers, scores } = body as {
      name: string;
      email: string;
      answers: AnswerMap;
      scores: ScorecardResult;
    };

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const shareToken = generateToken();

    const { data, error } = await supabase
      .from("responses")
      .insert({
        share_token: shareToken,
        name,
        email,
        answers,
        scores,
      })
      .select("share_token")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save your results." }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002";

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "AI Powered <onboarding@resend.dev>",
        to: email,
        subject: "Your AI Powered match is ready",
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #2d2d2d; margin: 0 0 8px;">
              Hi ${name},
            </h2>
            <p style="font-size: 15px; color: #464646; line-height: 1.6; margin: 0 0 16px;">
              We've analysed your answers and your personalised scorecard is ready.
            </p>
            <p style="font-size: 15px; color: #464646; line-height: 1.6; margin: 0 0 8px;">
              <strong>Your best match:</strong> ${scores.primary.label}
            </p>
            <a href="${baseUrl}/r/${shareToken}" style="display: inline-block; margin-top: 16px; padding: 11px 24px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
              View your full scorecard →
            </a>
            <p style="font-size: 13px; color: #8a8a8a; margin-top: 32px; line-height: 1.5;">
              If you didn't request this, you can safely ignore this email.<br />
              © ${new Date().getFullYear()} AI Powered
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Resend email error:", emailError);
      // Score is already saved; email failure is non-fatal.
    }

    return NextResponse.json({ shareToken: data?.share_token });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
