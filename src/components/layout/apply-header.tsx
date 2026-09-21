"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { headerChrome } from "@/components/layout/header-chrome";
import { cn } from "@/lib/utils";

export function ApplyHeader() {
  return (
    <header className="z-40 bg-transparent">
      <div className="flex h-14 items-center justify-between px-5">
        <Link
          href="https://aipowered.xyz"
          className={cn(
            headerChrome,
            "flex size-9 items-center justify-center text-sm font-medium min-[400px]:w-auto min-[400px]:justify-start min-[400px]:px-4",
          )}
          aria-label="Home"
        >
          <ArrowLeft className="size-4" />
          <span className="ml-1 hidden min-[400px]:inline">Home</span>
        </Link>

        <Image
          src="/ai-powered-logo.png"
          alt="AI Powered"
          width={140}
          height={24}
          priority
          className="h-5 w-auto brightness-0 dark:invert"
        />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="https://aipowered.xyz/contact" className={cn(headerChrome, "flex h-9 items-center px-4 text-sm font-medium")}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
