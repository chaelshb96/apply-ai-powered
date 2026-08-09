import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-clip-padding font-medium text-sm tracking-[0.25px] whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-neutral-950 text-white hover:bg-neutral-800",
        secondary:
          "border-current/30 bg-transparent text-current hover:border-current/50 hover:bg-current/10",
        tertiary: "text-current underline-offset-4 hover:underline",
        ghost: "text-text-grey hover:text-text-dark hover:bg-neutral-100",
      },
      size: {
        default: "h-[42px] min-h-[42px] desktop:h-[48px] desktop:min-h-[48px] px-6",
        sm: "h-[42px] min-h-[42px] desktop:h-[48px] desktop:min-h-[48px] px-4",
        icon: "size-[42px] min-h-[42px] min-w-[42px] desktop:size-[48px] desktop:min-h-[48px] desktop:min-w-[48px] px-0",
      },
    },
    compoundVariants: [
      {
        variant: "tertiary",
        class: "h-auto w-auto self-start rounded-none border-none bg-transparent p-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
