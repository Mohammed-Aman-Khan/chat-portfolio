"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

type Section = (typeof portfolioData.sections)[number];
type Thread = Section["threads"][number];

export function PortfolioPage({ sectionId }: { sectionId: string }) {
  const section = portfolioData.sections.find((s) => s.id === sectionId);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(
    new Set()
  );

  if (!section) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-bold">Section not found</h2>
          <Link href="/" className="text-primary hover:underline mt-2 block">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  if (activeThread) {
    return (
      <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="tertiary"
            size="sm"
            className="shrink-0"
            onPress={() => setActiveThread(null)}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div>
            <h2 className="font-bold text-lg">{activeThread.title}</h2>
            {activeThread.subtitle && (
              <p className="text-sm text-muted-foreground">
                {activeThread.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pb-4">
          {activeThread.messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex w-full gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black bg-primary font-bold text-xs text-primary-foreground">
                  A
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded border-2 border-black px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground"
                )}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black bg-secondary font-bold text-xs text-secondary-foreground">
                  Y
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/"
            className="flex size-8 items-center justify-center rounded border-2 border-black hover:bg-muted transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-2xl font-black tracking-tight">
            {section.title}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {section.description}
        </p>
      </div>

      <div className="grid gap-4 flex-1 content-start">
        {section.threads.map((thread) => (
          <button
            key={thread.id}
            type="button"
            className="group flex w-full items-start gap-4 rounded border-2 border-black bg-card p-4 text-left shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm"
            onClick={() => setActiveThread(thread)}
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base">{thread.title}</h3>
              {thread.subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {thread.subtitle}
                </p>
              )}
              <p className="text-sm text-muted-foreground/70 mt-2 line-clamp-2">
                {thread.messages[0]?.content}
              </p>
            </div>
            <div className="shrink-0 text-muted-foreground text-xs tabular-nums">
              {thread.messages.length} msgs
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
