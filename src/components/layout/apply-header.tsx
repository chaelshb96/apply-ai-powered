"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function ApplyHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent-line/30 bg-white/95 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:bg-neutral-950/95">
      <div className="mx-auto flex h-[56px] max-w-[1440px] items-center justify-between px-5 tablet:px-[42px] desktop:h-[64px] desktop:px-16 desktop-xl:px-[88px]">
        <Link
          href="https://aipowered.xyz"
          className="flex h-[36px] items-center gap-1.5 rounded-full border border-accent-line bg-white px-4 text-sm font-medium text-text-dark transition-colors hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          aria-label="Back to AI Powered"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden tablet:inline">Back</span>
        </Link>

        <Image
          src="/ai-powered-logo.png"
          alt="AI Powered"
          width={140}
          height={24}
          priority
          className="h-6 w-auto dark:invert"
          style={{ filter: "brightness(0)" }}
        />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="https://aipowered.xyz/contact"
            className="flex h-[36px] items-center rounded-full border border-accent-line bg-white px-5 text-sm font-medium text-text-dark transition-colors hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
