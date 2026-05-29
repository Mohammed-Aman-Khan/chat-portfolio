"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { ArrowUpIcon } from "lucide-react";
import { type Dispatch, memo, type SetStateAction, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "../ai-elements/prompt-input";

type MultimodalInputProps = {
  chatId: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: UseChatHelpers<ChatMessage>["status"];
  stop: () => void;
  messages: Parameters<UseChatHelpers<ChatMessage>["sendMessage"]>[0][];
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  className?: string;
  editingMessage?: ChatMessage | null;
  onCancelEdit?: () => void;
  isLoading?: boolean;
};

function PureMultimodalInput({
  input,
  setInput,
  status,
  stop,
  sendMessage,
  chatId,
  className,
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submitForm = () => {
    if (!input.trim()) return;

    window.history.pushState(
      {},
      "",
      `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/chat/${chatId}`
    );

    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });

    setInput("");
  };

  return (
    <div className={cn("w-full", className)}>
      <PromptInput
        onSubmit={() => {
          if (status === "ready" || status === "error") {
            submitForm();
          }
        }}
      >
        <PromptInputTextarea
          className="min-h-[56px] w-full text-[14px] leading-relaxed px-4 pt-3 pb-2 placeholder:text-muted-foreground/40"
          data-testid="multimodal-input"
          placeholder="Ask me anything..."
          ref={textareaRef}
          value={input}
        />
        <PromptInputFooter className="px-3 pb-2">
          <div />
          {status === "submitted" ? (
            <PromptInputSubmit
              className="h-8 w-8 rounded border-2 border-black bg-foreground text-background"
              data-testid="stop-button"
              status={status}
              onStop={stop}
            >
              <span className="block size-3 bg-current" />
            </PromptInputSubmit>
          ) : (
            <PromptInputSubmit
              className={cn(
                "h-8 w-8 rounded border-2 border-black transition-all",
                input.trim()
                  ? "bg-foreground text-background hover:opacity-85"
                  : "bg-muted text-muted-foreground/25"
              )}
              data-testid="send-button"
              disabled={!input.trim()}
              status={status}
            >
              <ArrowUpIcon className="size-4" />
            </PromptInputSubmit>
          )}
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}

export const MultimodalInput = memo(PureMultimodalInput);
