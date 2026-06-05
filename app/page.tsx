"use client";

import { useMemo } from "react";
import { Thread } from "@/components/assistant-ui/thread";
import {
  AssistantRuntimeProvider,
  useAui,
  AuiProvider,
  Suggestions,
} from "@assistant-ui/react";
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";
import { Sidebar } from "@/components/Sidebar";
import { useThreadStore } from "@/lib/store";
import { MessageSquare } from "lucide-react";
import { Text } from "@/components/retroui/Text";
import type { PrepopulatedChat as PrepopulatedChatType } from "@/lib/types";

import experienceChat from "@/knowledge/prepopulated/experience.json";
import skillsChat from "@/knowledge/prepopulated/skills.json";
import educationChat from "@/knowledge/prepopulated/education.json";
import projectsChat from "@/knowledge/prepopulated/projects.json";
import contactChat from "@/knowledge/prepopulated/contact.json";

const PREPOPULATED_CHATS: Record<string, PrepopulatedChatType> = {
  experience: experienceChat as PrepopulatedChatType,
  skills: skillsChat as PrepopulatedChatType,
  education: educationChat as PrepopulatedChatType,
  projects: projectsChat as PrepopulatedChatType,
  contact: contactChat as PrepopulatedChatType,
};

export default function Home() {
  return <ChatLayout />;
}

function ChatLayout() {
  const activeThreadId = useThreadStore((s) => s.activeThreadId);
  const threads = useThreadStore((s) => s.threads);
  const thread = threads.find((t) => t.id === activeThreadId);

  const aui = useAui({
    suggestions: Suggestions([
      {
        title: "Tell me about",
        label: thread?.title.toLowerCase() ?? "yourself",
        prompt: `Tell me about your ${(thread?.title ?? "background").toLowerCase()}.`,
      },
      {
        title: "What makes you",
        label: "stand out?",
        prompt: "What makes you stand out from other candidates?",
      },
      {
        title: "Can you share",
        label: "a specific example?",
        prompt: "Can you share a specific example of your work?",
      },
    ]),
  });

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 min-w-0 h-full">
        <AuiProvider value={aui}>
          {activeThreadId ? (
            <ChatArea
              key={activeThreadId}
              threadId={activeThreadId}
              title={thread?.title ?? "Chat"}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-accent">
                <MessageSquare size={28} />
              </div>
              <Text as="h2">Portfolio Chat</Text>
              <Text as="p" className="max-w-sm text-center text-sm">
                Select a thread from the sidebar or create a new one to start
                exploring this portfolio.
              </Text>
            </div>
          )}
        </AuiProvider>
      </main>
    </div>
  );
}

function ChatArea({
  threadId,
  title,
}: {
  threadId: string;
  title: string;
}) {
  const threads = useThreadStore((s) => s.threads);
  const thread = threads.find((t) => t.id === threadId);
  const prepopulated = PREPOPULATED_CHATS[threadId] ?? null;

  const transport = useMemo(
    () =>
      new AssistantChatTransport({
        api: "/api/chat",
        body: () => {
          const state = useThreadStore.getState();
          const t = state.threads.find((th) => th.id === state.activeThreadId);
          return {
            system: t?.systemPrompt ?? "You are a helpful assistant.",
          };
        },
      }),
    [],
  );

  const runtime = useChatRuntime({
    transport,
    messages: prepopulated?.messages ?? undefined,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
