import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeScript } from "@/components/theme-script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Your Game Plan | AI Powered",
  description: "Twenty questions. A plan for where you actually are with AI, and what to do next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col text-text-dark">{children}</body>
    </html>
  );
}
