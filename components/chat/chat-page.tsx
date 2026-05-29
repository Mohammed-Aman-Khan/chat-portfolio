"use client";

import { ActiveChatProvider } from "@/hooks/use-active-chat";
import { DataStreamProvider } from "@/components/chat/data-stream-provider";
import { ChatShell } from "@/components/chat/shell";
import { Greeting } from "@/components/chat/greeting";
import { usePathname } from "next/navigation";

export function ChatPage() {
  return (
    <DataStreamProvider>
      <ActiveChatProvider>
        <ChatContent />
      </ActiveChatProvider>
    </DataStreamProvider>
  );
}

function ChatContent() {
  // ChatShell shows messages. When no chatId, Greeting shows.
  return (
    <>
      <ChatShell />
    </>
  );
}
