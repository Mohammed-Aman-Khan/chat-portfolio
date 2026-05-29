"use client";

import { PanelLeftIcon } from "lucide-react";

type ChatHeaderProps = {
  chatId: string;
};

export function ChatHeader({ chatId: _chatId }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 flex h-14 items-center bg-sidebar px-3">
      <div className="md:hidden flex items-center">
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded border-2 border-black"
          aria-label="Toggle sidebar"
        >
          <PanelLeftIcon className="size-4" />
        </button>
      </div>
    </header>
  );
}
