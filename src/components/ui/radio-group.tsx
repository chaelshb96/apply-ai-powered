"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioGroupOption {
  label: string;
  value: string;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  name?: string;
  large?: boolean;
}

export function RadioGroup({
  options,
  value,
  onValueChange,
  className,
  name = "radio-group",
  large = false,
}: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} role="radiogroup">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-xl border transition-all select-none",
              large ? "p-5 tablet:p-6" : "p-4",
              isSelected
                ? "border-neutral-800 bg-neutral-50 ring-1 ring-neutral-800/20"
                : "border-accent-line/40 bg-white hover:border-accent-line hover:bg-neutral-50/50",
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex shrink-0 items-center justify-center rounded-full border transition-colors",
                large ? "size-5" : "size-4",
              )}
              style={{ borderColor: isSelected ? "#1a1a1a" : "#c8d0d8" }}
            >
              {isSelected && (
                <div className={cn(
                  "rounded-full bg-neutral-800",
                  large ? "size-2.5" : "size-2",
                )} />
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={cn(
                "font-medium leading-snug transition-colors",
                large ? "text-lg" : "text-base",
                isSelected ? "text-text-dark" : "text-text-dark",
              )}>
                {option.label}
              </span>
              {option.description && (
                <span className="text-sm leading-snug text-text-grey">
                  {option.description}
                </span>
              )}
            </div>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onValueChange(option.value)}
              className="sr-only"
            />
          </label>
        );
      })}
    </div>
  );
}
