"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";

import { Tooltip } from "@/components/retroui/Tooltip";
import { Button } from "@/components/retroui/Button";
import { cn } from "@/lib/utils";

export type TooltipIconButtonProps = ComponentPropsWithRef<typeof Button> & {
  tooltip: string;
  side?: "top" | "bottom" | "left" | "right";
};

export const TooltipIconButton = forwardRef<
  HTMLButtonElement,
  TooltipIconButtonProps
>(({ children, tooltip, side = "bottom", className, ...rest }, ref) => {
  return (
    <Tooltip.Provider delay={0}>
      <Tooltip>
        <Tooltip.Trigger
          render={
            <Button
              variant="ghost"
              size="icon"
              {...rest}
              className={cn("aui-button-icon size-6 p-1", className)}
              ref={ref}
            >
              {children}
              <span className="aui-sr-only sr-only">{tooltip}</span>
            </Button>
          }
        />
        <Tooltip.Content side={side}>{tooltip}</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  );
});

TooltipIconButton.displayName = "TooltipIconButton";
