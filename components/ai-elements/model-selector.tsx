"use client";

import type { ComponentProps, ReactNode, HTMLAttributes } from "react";

import { Popover } from "@heroui/react";

const PopoverTrigger = Popover.Trigger;
const PopoverContent = Popover.Content;
import { cn } from "@/lib/utils";

export type ModelSelectorProps = ComponentProps<typeof Popover>;

export const ModelSelector = (props: ModelSelectorProps) => (
  <Popover {...props} />
);

export type ModelSelectorTriggerProps = ComponentProps<typeof PopoverTrigger> & { asChild?: boolean };

export const ModelSelectorTrigger = ({ asChild: _, ...props }: ModelSelectorTriggerProps) => (
  <PopoverTrigger {...props} />
);

export type ModelSelectorContentProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
};

export const ModelSelectorContent = ({
  className,
  children,
  title: _title,
  ...props
}: ModelSelectorContentProps) => (
  <PopoverContent
    className={cn(
      "w-[280px] p-0 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-[var(--shadow-float)]",
      className
    )}
    {...props}
  >
    <div className="w-full">{children}</div>
  </PopoverContent>
);

export type ModelSelectorInputProps = React.ComponentProps<"input">;

export const ModelSelectorInput = ({
  className,
  ...props
}: ModelSelectorInputProps) => (
  <input
    className={cn(
      "h-auto w-full px-3 py-2.5 text-[13px] bg-transparent outline-none border-b border-border/40",
      className
    )}
    placeholder="Search..."
    {...props}
  />
);

export type ModelSelectorListProps = HTMLAttributes<HTMLDivElement>;

export const ModelSelectorList = ({ className, ...props }: ModelSelectorListProps) => (
  <div className={cn("max-h-[280px] overflow-y-auto", className)} {...props} />
);

export type ModelSelectorEmptyProps = HTMLAttributes<HTMLDivElement>;

export const ModelSelectorEmpty = ({ className, ...props }: ModelSelectorEmptyProps) => (
  <div className={cn("px-3 py-6 text-center text-sm text-muted-foreground", className)} {...props} />
);

export type ModelSelectorGroupProps = HTMLAttributes<HTMLDivElement> & { heading?: string };

export const ModelSelectorGroup = ({ className, heading, ...props }: ModelSelectorGroupProps) => (
  <div className={cn(className)} {...props} />
);

export type ModelSelectorItemProps = HTMLAttributes<HTMLDivElement> & { value?: string };

export const ModelSelectorItem = ({ className, ...props }: ModelSelectorItemProps) => (
  <div
    className={cn(
      "w-full px-3 py-2 text-[13px] cursor-pointer hover:bg-accent rounded-lg",
      className
    )}
    {...props}
  />
);

export type ModelSelectorShortcutProps = HTMLAttributes<HTMLSpanElement>;

export const ModelSelectorShortcut = (props: ModelSelectorShortcutProps) => (
  <span {...props} />
);

export type ModelSelectorSeparatorProps = HTMLAttributes<HTMLHRElement>;

export const ModelSelectorSeparator = (props: ModelSelectorSeparatorProps) => (
  <hr className="border-border/40" {...props} />
);

export type ModelSelectorLogoProps = Omit<
  ComponentProps<"img">,
  "src" | "alt"
> & {
  provider:
    | "moonshotai-cn"
    | "lucidquery"
    | "moonshotai"
    | "zai-coding-plan"
    | "alibaba"
    | "xai"
    | "vultr"
    | "nvidia"
    | "upstage"
    | "groq"
    | "github-copilot"
    | "mistral"
    | "vercel"
    | "nebius"
    | "deepseek"
    | "alibaba-cn"
    | "google-vertex-anthropic"
    | "venice"
    | "chutes"
    | "cortecs"
    | "github-models"
    | "togetherai"
    | "azure"
    | "baseten"
    | "huggingface"
    | "opencode"
    | "fastrouter"
    | "google"
    | "google-vertex"
    | "cloudflare-workers-ai"
    | "inception"
    | "wandb"
    | "openai"
    | "zhipuai-coding-plan"
    | "perplexity"
    | "openrouter"
    | "zenmux"
    | "v0"
    | "iflowcn"
    | "synthetic"
    | "deepinfra"
    | "zhipuai"
    | "submodel"
    | "zai"
    | "inference"
    | "requesty"
    | "morph"
    | "lmstudio"
    | "anthropic"
    | "aihubmix"
    | "fireworks-ai"
    | "modelscope"
    | "llama"
    | "scaleway"
    | "amazon-bedrock"
    | "cerebras"
    // oxlint-disable-next-line typescript-eslint(ban-types) -- intentional pattern for autocomplete-friendly string union
    | (string & {});
};

export const ModelSelectorLogo = ({
  provider,
  className,
  ...props
}: ModelSelectorLogoProps) => (
  <img
    {...props}
    alt={`${provider} logo`}
    className={cn("size-4 dark:invert", className)}
    height={16}
    src={`https://models.dev/logos/${provider}.svg`}
    width={16}
  />
);

export type ModelSelectorLogoGroupProps = ComponentProps<"div">;

export const ModelSelectorLogoGroup = ({
  className,
  ...props
}: ModelSelectorLogoGroupProps) => (
  <div
    className={cn(
      "flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:p-px [&>img]:ring-1 [&>img]:ring-border/30",
      className
    )}
    {...props}
  />
);

export type ModelSelectorNameProps = ComponentProps<"span">;

export const ModelSelectorName = ({
  className,
  ...props
}: ModelSelectorNameProps) => (
  <span className={cn("flex-1 truncate text-left", className)} {...props} />
);
