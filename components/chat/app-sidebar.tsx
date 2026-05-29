"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MessageSquare, Briefcase, GraduationCap, Code2, FolderGit2 } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="size-4" />,
  GraduationCap: <GraduationCap className="size-4" />,
  Code2: <Code2 className="size-4" />,
  FolderGit2: <FolderGit2 className="size-4" />,
};

function SectionLink({ section }: { section: (typeof portfolioData.sections)[number] }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const hasMultipleThreads = section.threads.length > 1;

  const isActive = (route: string) => pathname === route || pathname.startsWith(route + "/");

  if (!hasMultipleThreads) {
    const firstThread = section.threads[0];
    const href = firstThread ? `${section.route}/${firstThread.id}` : section.route;
    return (
      <Link
        href={href}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
          isActive(section.route)
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground/60 hover:text-foreground hover:bg-default-100"
        }`}
      >
        <span className="shrink-0">{iconMap[section.icon]}</span>
        <span>{section.title}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={`flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
          isActive(section.route)
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground/60 hover:text-foreground hover:bg-default-100"
        }`}
      >
        <span className="shrink-0">{iconMap[section.icon]}</span>
        <span className="flex-1 text-left">{section.title}</span>
        <ChevronDown className={`size-3 transition-transform ${expanded ? "" : "-rotate-90"}`} />
      </button>
      {expanded && (
        <div className="ml-4 mt-0.5 flex flex-col gap-0.5">
          {section.threads.map((thread) => {
            const threadRoute = `${section.route}/${thread.id}`;
            const isThreadActive = pathname === threadRoute;
            return (
              <Link
                key={thread.id}
                href={threadRoute}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  isThreadActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/50 hover:text-foreground hover:bg-default-100"
                }`}
              >
                <div className="font-medium">{thread.title}</div>
                {thread.subtitle && (
                  <div className="text-xs text-foreground/40">{thread.subtitle}</div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AppSidebar() {
  const { owner, sections } = portfolioData;

  return (
    <div className="flex h-dvh w-[260px] shrink-0 flex-col bg-background border-r border-divider">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-divider">
        <MessageSquare className="size-4 text-primary" />
        <span className="font-semibold text-sm">{owner.name}</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {sections.map((section) => (
          <SectionLink key={section.id} section={section} />
        ))}
      </div>

      <div className="border-t border-divider p-3">
        <p className="text-xs text-foreground/40 text-center">{owner.title}</p>
      </div>
    </div>
  );
}
