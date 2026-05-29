"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { Briefcase, GraduationCap, Code2, FolderGit2 } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="size-5" />,
  GraduationCap: <GraduationCap className="size-5" />,
  Code2: <Code2 className="size-5" />,
  FolderGit2: <FolderGit2 className="size-5" />,
};

export function Greeting() {
  const { owner, sections } = portfolioData;

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">{owner.name}</h1>
        <p className="mt-1 text-base text-foreground/60">{owner.title}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground/50 leading-relaxed">
          Hi! Browse my portfolio below or ask me anything directly.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {sections.map((section) => {
          const firstThread = section.threads[0];
          const linkHref = section.threads.length > 1 && firstThread
            ? `${section.route}/${firstThread.id}`
            : section.route;

          return (
            <Link key={section.id} href={linkHref}>
              <Card className="w-full p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {iconMap[section.icon]}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-base">{section.title}</h2>
                    <p className="text-sm text-foreground/50 mt-0.5">{section.description}</p>
                    <p className="text-xs text-foreground/40 mt-1">
                      {section.threads.length} thread{section.threads.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
