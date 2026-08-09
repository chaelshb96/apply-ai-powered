import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const CONTAINER_PADDING_X =
  "px-5 tablet:px-[42px] desktop:px-16 desktop-xl:px-[88px]";

export const CONTAINER_PADDING_Y =
  "py-12 tablet:py-14 desktop:py-20 desktop-xl:py-[108px]";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  verticalPadding?: boolean;
}

export function Container({
  children,
  className,
  as: Component = "div",
  verticalPadding = true,
}: ContainerProps) {
  return (
    <Component
      data-slot="container"
      className={cn(
        "mx-auto w-full max-w-[1440px]",
        CONTAINER_PADDING_X,
        verticalPadding && CONTAINER_PADDING_Y,
        className,
      )}
    >
      {children}
    </Component>
  );
}
