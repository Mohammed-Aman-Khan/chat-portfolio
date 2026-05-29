"use client"

import * as React from "react"
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"

import { cn } from "@/lib/utils"

const Collapsible = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof BaseCollapsible.Root>) => (
  <BaseCollapsible.Root
    ref={ref}
    className={cn("border-2 border-border", className)}
    {...props}
  />
)

const CollapsibleTrigger = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof BaseCollapsible.Trigger>) => (
  <BaseCollapsible.Trigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between border-b-2 border-border bg-primary px-4 py-2 text-left text-primary-foreground font-head cursor-pointer",
      className,
    )}
    {...props}
  />
)

const CollapsibleContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof BaseCollapsible.Panel>) => (
  <BaseCollapsible.Panel
    ref={ref}
    className={cn("bg-background p-4", className)}
    {...props}
  />
)

const CollapsibleObject = Object.assign(Collapsible, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})

export { CollapsibleObject as Collapsible, CollapsibleTrigger, CollapsibleContent }
