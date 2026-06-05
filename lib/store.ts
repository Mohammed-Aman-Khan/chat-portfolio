"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatThread, ThreadCategory } from "@/lib/types";
import prepopulatedThreads from "@/lib/prepopulated-threads.json";

interface ThreadStore {
  threads: ChatThread[];
  activeThreadId: string | null;
  customCount: number;
  setActiveThread: (id: string) => void;
  createThread: () => ChatThread;
  deleteThread: (id: string) => void;
  getActiveThread: () => ChatThread | undefined;
}

const prepopulated = prepopulatedThreads as ChatThread[];

export const useThreadStore = create<ThreadStore>()(
  persist(
    (set, get) => ({
      threads: [...prepopulated],
      activeThreadId: prepopulated[0]?.id ?? null,
      customCount: 0,

      setActiveThread: (id: string) => set({ activeThreadId: id }),

      createThread: () => {
        const state = get();
        const next = state.customCount + 1;
        const id = `custom-${Date.now()}`;
        const thread: ChatThread = {
          id,
          title: `Chat ${next}`,
          icon: "MessageSquare",
          category: "custom" as ThreadCategory,
          systemPrompt:
            "You are a friendly portfolio assistant. Answer the visitor's questions conversationally and helpfully. Be engaging and provide detailed, thoughtful responses about professional background, skills, and experience.",
          isPrepopulated: false,
          createdAt: new Date().toISOString(),
        };
        set({
          threads: [...state.threads, thread],
          activeThreadId: id,
          customCount: next,
        });
        return thread;
      },

      deleteThread: (id: string) => {
        set((state) => {
          const thread = state.threads.find((t) => t.id === id);
          if (!thread || thread.isPrepopulated) return state;

          const remaining = state.threads.filter((t) => t.id !== id);
          const newActive =
            state.activeThreadId === id
              ? (remaining[0]?.id ?? null)
              : state.activeThreadId;

          return { threads: remaining, activeThreadId: newActive };
        });
      },

      getActiveThread: () => {
        const state = get();
        return state.threads.find((t) => t.id === state.activeThreadId);
      },
    }),
    {
      name: "chat-portfolio-threads",
      partialize: (state) => ({
        threads: state.threads.filter((t) => !t.isPrepopulated),
        activeThreadId: state.activeThreadId,
        customCount: state.customCount,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<ThreadStore>),
        threads: [
          ...prepopulated,
          ...((persisted as Partial<ThreadStore>).threads ?? []),
        ],
      }),
    },
  ),
);
