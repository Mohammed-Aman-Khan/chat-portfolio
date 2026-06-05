"use client";

import { useState } from "react";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Tooltip } from "@/components/retroui/Tooltip";
import { cn } from "@/lib/utils";
import { useThreadStore } from "@/lib/store";
import type { ChatThread } from "@/lib/types";
import {
  MessageSquare,
  Plus,
  Trash2,
  PanelLeftClose,
  PanelLeft,
  Briefcase,
  Zap,
  GraduationCap,
  FolderKanban,
  Mail,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  Zap,
  GraduationCap,
  FolderKanban,
  Mail,
  MessageSquare,
};

function ThreadIcon({ name, size = 16 }: { name: string; size?: number }) {
  const Icon = ICON_MAP[name] ?? MessageSquare;
  return <Icon size={size} />;
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const threads = useThreadStore((s) => s.threads);
  const activeThreadId = useThreadStore((s) => s.activeThreadId);
  const setActiveThread = useThreadStore((s) => s.setActiveThread);
  const createThread = useThreadStore((s) => s.createThread);
  const deleteThread = useThreadStore((s) => s.deleteThread);

  if (collapsed) {
    return (
      <aside className="flex h-full flex-col items-center border-r-2 border-border bg-background py-3 w-14 shrink-0">
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Expand sidebar"
                  className="mb-4"
                  onClick={() => setCollapsed(false)}
                >
                  <PanelLeft size={18} />
                </Button>
              }
            />
            <Tooltip.Content side="right">Expand sidebar</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>

        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="New chat"
                  onClick={() => createThread()}
                >
                  <Plus size={18} />
                </Button>
              }
            />
            <Tooltip.Content side="right">New chat</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>

        <div className="mt-4 flex w-full flex-col items-center gap-1">
          {threads.map((thread) => (
            <Tooltip.Provider key={thread.id}>
              <Tooltip>
                <Tooltip.Trigger
                  render={
                    <button
                      aria-label={thread.title}
                      onClick={() => setActiveThread(thread.id)}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded transition-colors",
                        activeThreadId === thread.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <ThreadIcon name={thread.icon} size={18} />
                    </button>
                  }
                />
                <Tooltip.Content side="right">{thread.title}</Tooltip.Content>
              </Tooltip>
            </Tooltip.Provider>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r-2 border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b-2 border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
            <MessageSquare size={14} className="text-primary-foreground" />
          </div>
          <Text as="h3" className="text-sm tracking-tight">
            Portfolio Chat
          </Text>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose size={16} />
        </Button>
      </div>

      {/* New Thread */}
      <div className="px-3 pt-3 pb-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => createThread()}
        >
          <Plus size={14} />
          New Chat
        </Button>
      </div>

      {/* Thread List */}
      <nav className="flex-1 overflow-y-auto px-2">
        <div className="flex flex-col gap-0.5">
          {threads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isActive={activeThreadId === thread.id}
              onSelect={() => setActiveThread(thread.id)}
              onDelete={
                thread.isPrepopulated
                  ? undefined
                  : () => deleteThread(thread.id)
              }
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t-2 border-border px-3 py-2.5">
        <p className="font-sans text-xs text-muted-foreground">
          Built with RetroUI + AI SDK
        </p>
      </div>
    </aside>
  );
}

function ThreadItem({
  thread,
  isActive,
  onSelect,
  onDelete,
}: {
  thread: ChatThread;
  isActive: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex items-center rounded transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent text-foreground",
      )}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button
        onClick={onSelect}
        className="flex flex-1 items-center gap-2 px-2 py-1.5 text-left text-sm min-w-0"
      >
        <ThreadIcon name={thread.icon} size={14} />
        <span className="truncate">{thread.title}</span>
      </button>
      {onDelete && showDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={cn(
            "mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors",
            isActive
              ? "hover:bg-primary-foreground/20"
              : "hover:bg-destructive/10 text-muted-foreground hover:text-destructive",
          )}
          aria-label={`Delete ${thread.title}`}
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
}
