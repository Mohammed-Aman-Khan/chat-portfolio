"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  MessageSquare,
} from "lucide-react";
import portfolioData from "@/data/portfolio.json";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="size-5" />,
  GraduationCap: <GraduationCap className="size-5" />,
  Code2: <Code2 className="size-5" />,
  FolderGit2: <FolderGit2 className="size-5" />,
};

export const Greeting = () => {
  const { owner, sections } = portfolioData;

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10"
      >
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded border-2 border-black bg-primary shadow-md">
          <MessageSquare className="size-7 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-black tracking-tight">
          {owner.name}
        </h1>
        <p className="mt-1 text-base text-muted-foreground">
          {owner.title}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground/70 leading-relaxed">
          Hi! I&apos;m a full-stack developer passionate about building
          great products. Browse my portfolio sections below or ask me
          anything directly.
        </p>
      </motion.div>

      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        {sections.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + i * 0.08,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={section.route}
              className="group flex items-start gap-4 rounded border-2 border-black bg-card p-5 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded border-2 border-black bg-primary text-primary-foreground">
                {iconMap[section.icon] || <Code2 className="size-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base">{section.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {section.description}
                </p>
                <p className="text-xs text-muted-foreground/50 mt-1">
                  {section.threads.length} threads &middot;{" "}
                  {section.threads.reduce(
                    (acc, t) => acc + t.messages.length,
                    0
                  )}{" "}
                  messages
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-10 text-center text-xs text-muted-foreground/50"
      >
        Or start typing below to chat with me directly &rarr;
      </motion.p>
    </div>
  );
};
