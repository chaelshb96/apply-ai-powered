import type { ReactNode } from "react";
import type { IconKey } from "@/lib/constants";

function Glyph({ children, size = "sm" }: { children: ReactNode; size?: "sm" | "lg" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={size === "lg" ? "size-12 shrink-0" : "size-6 shrink-0"}
      fill="none"
      stroke="currentColor"
      strokeWidth={size === "lg" ? "1.5" : "1.75"}
      strokeLinejoin="miter"
      strokeLinecap="square"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function BrandLogos({ srcs }: { srcs: string[] }) {
  const pair = srcs.length > 1;
  const wide = srcs.some((src) => src.includes("ghl"));
  return (
    <span
      className={
        pair || wide
          ? "flex h-11 min-w-[4.25rem] items-center justify-center gap-1.5 rounded-md bg-white px-2 ring-1 ring-black/10"
          : "flex size-11 items-center justify-center rounded-md bg-white ring-1 ring-black/10"
      }
    >
      {srcs.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          width={wide ? 44 : pair ? 22 : 28}
          height={wide ? 20 : pair ? 22 : 28}
          className={
            wide
              ? "h-5 w-11 object-contain"
              : pair
                ? "size-[22px] object-contain"
                : "size-7 object-contain"
          }
        />
      ))}
    </span>
  );
}

export function OptionIcon({ name, size = "sm" }: { name: IconKey; size?: "sm" | "lg" }) {
  switch (name) {
    case "owner":
      return (
        <Glyph size={size}>
          <path d="M4 20V10l8-6 8 6v10" />
          <path d="M10 20v-6h4v6" />
        </Glyph>
      );
    case "side":
      return (
        <Glyph size={size}>
          <rect x="4" y="10" width="16" height="10" />
          <path d="M8 10V7h8v3" />
          <path d="M9 15h6" />
        </Glyph>
      );
    case "team":
      return (
        <Glyph size={size}>
          <circle cx="8" cy="9" r="2.2" />
          <circle cx="16" cy="9" r="2.2" />
          <path d="M4 18c.4-2.4 2.2-3.6 4-3.6s3.6 1.2 4 3.6" />
          <path d="M12 18c.4-2.4 2.2-3.6 4-3.6s3.6 1.2 4 3.6" />
        </Glyph>
      );
    case "founder":
      return (
        <Glyph size={size}>
          <path d="M12 3l2.2 6.6H21l-5.4 4 2.1 6.4L12 16.6 6.3 20l2.1-6.4L3 9.6h6.8z" />
        </Glyph>
      );
    case "consultant":
      return (
        <Glyph size={size}>
          <path d="M5 19V6h10l4 4v9H5z" />
          <path d="M15 6v4h4" />
          <path d="M8 13h8M8 16h5" />
        </Glyph>
      );
    case "freelancer":
      return (
        <Glyph size={size}>
          <rect x="3" y="5" width="18" height="12" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </Glyph>
      );
    case "creative":
      return (
        <Glyph size={size}>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 8v8M8 12h8" />
        </Glyph>
      );
    case "none":
      return (
        <Glyph size={size}>
          <circle cx="12" cy="12" r="8" />
          <path d="M7 7l10 10" />
        </Glyph>
      );
    default:
      return null;
  }
}
