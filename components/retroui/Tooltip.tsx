"use client";

import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const tooltipContentVariants = cva(
  "z-50 overflow-hidden border-2 border-border bg-background px-3 py-1.5 text-xs text-primary-foreground data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        solid: "bg-black text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const TooltipProvider = BaseTooltip.Provider;

const Tooltip = BaseTooltip.Root;

const TooltipTrigger = BaseTooltip.Trigger;

const TooltipContent = ({
  className,
  variant,
  side = "top",
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof BaseTooltip.Popup> &
  VariantProps<typeof tooltipContentVariants> & {
    side?: "top" | "bottom" | "left" | "right"
  }) => (
  <BaseTooltip.Portal>
    <BaseTooltip.Positioner side={side}>
      <BaseTooltip.Popup
        ref={ref}
        className={cn(
          tooltipContentVariants({
            variant,
            className,
          }),
        )}
        {...props}
      />
    </BaseTooltip.Positioner>
  </BaseTooltip.Portal>
);

const TooltipObject = Object.assign(Tooltip, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Provider: TooltipProvider,
});

export { TooltipObject as Tooltip };
