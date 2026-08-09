"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const LABEL_CLASSES = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(LABEL_CLASSES, className)}
      {...props}
    />
  );
}

export { Label };
