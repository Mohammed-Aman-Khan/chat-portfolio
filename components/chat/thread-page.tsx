"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export function ThreadPage({
  sectionId,
  threadId,
}: {
  sectionId: string;
  threadId: string | null;
}) {
  const section = portfolioData.sections.find((s) => s.id === sectionId);

  if (!section) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p>Section not found</p>
      </div>
    );
  }

  // When threadId is null, show all threads in the section (for education/skills)
  const threads = threadId
    ? section.threads.filter((t) => t.id === threadId)
    : section.threads;

  if (threadId && threads.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p>Thread not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">{section.title}</h1>
        <p className="text-sm text-foreground/50">{section.description}</p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pb-4">
        {threads.map((thread) => (
          <div key={thread.id}>
            <div className="mb-3">
              <h2 className="text-lg font-semibold">{thread.title}</h2>
              {thread.subtitle && (
                <p className="text-sm text-foreground/50">{thread.subtitle}</p>
              )}
            </div>
            <div className="space-y-4">
              {thread.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex w-full gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
