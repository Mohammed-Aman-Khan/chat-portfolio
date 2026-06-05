"use client";

import ReactMarkdown from "react-markdown";
import "@assistant-ui/react-markdown/styles/dot.css";

import remarkGfm from "remark-gfm";
import { Text } from "@/components/retroui/Text";
import type { PrepopulatedMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PrepopulatedChatProps {
  messages: PrepopulatedMessage[];
  className?: string;
}

export function PrepopulatedChat({ messages, className }: PrepopulatedChatProps) {
  if (messages.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-y-6 pb-6", className)}>
      {messages.map((msg) => (
        <PrepopulatedMessageBubble key={msg.id} message={msg} />
      ))}
      <div className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1 bg-border" />
        <Text as="p" className="text-xs text-muted-foreground shrink-0">
          Preview — ask your own question below
        </Text>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}

function PrepopulatedMessageBubble({
  message,
}: {
  message: PrepopulatedMessage;
}) {
  const isUser = message.role === "user";
  const text = message.parts.map((p) => p.text).join("");

  return (
    <div
      className={cn(
        "fade-in slide-in-from-bottom-1 animate-in duration-150",
        isUser ? "self-end max-w-[80%]" : "self-start",
      )}
    >
      {isUser ? (
        <div className="bg-muted text-foreground rounded px-4 py-2.5 text-sm">
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
      ) : (
        <div className="text-foreground px-2 text-sm leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {text}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
