"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Briefcase, GraduationCap, Code2, FolderGit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import portfolioData from "@/data/portfolio.json";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="size-4" />,
  GraduationCap: <GraduationCap className="size-4" />,
  Code2: <Code2 className="size-4" />,
  FolderGit2: <FolderGit2 className="size-4" />,
};

export function AppSidebar() {
  const pathname = usePathname();
  const { owner, sections } = portfolioData;

  return (
    <div className="flex h-dvh w-[240px] shrink-0 flex-col border-r-2 border-black bg-sidebar">
      <div className="flex items-center gap-2 border-b-2 border-black px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded border-2 border-black bg-primary">
          <MessageSquare className="size-4 text-primary-foreground" />
        </div>
        <div className="font-bold text-sm leading-tight truncate">
          {owner.name}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {sections.map((section) => {
          const isActive = pathname === section.route;
          return (
            <Link
              key={section.id}
              href={section.route}
              className={cn(
                "flex items-center gap-3 rounded border-2 border-transparent px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "border-black bg-primary text-primary-foreground"
                  : "text-sidebar-foreground/70 hover:border-black hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <span className="shrink-0">
                {iconMap[section.icon] || <Code2 className="size-4" />}
              </span>
              <span className="truncate">{section.title}</span>
              <span className="ml-auto text-xs text-muted-foreground/50 tabular-nums">
                {section.threads.length}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t-2 border-black p-3">
        <p className="text-xs text-muted-foreground/60 text-center">
          {owner.title}
        </p>
      </div>
    </div>
  );
}
