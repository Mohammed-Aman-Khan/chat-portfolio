export type ThreadCategory =
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "contact"
  | "custom";

export const THREAD_CATEGORIES: { key: ThreadCategory; label: string }[] = [
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
  { key: "custom", label: "Custom" },
];

// ---- Threads ----

export interface ChatThread {
  id: string;
  title: string;
  icon: string;
  category: ThreadCategory;
  systemPrompt: string;
  isPrepopulated: boolean;
  createdAt: string;
}

// ---- Knowledge base ----

/** A single knowledge document (.md file) */
export interface KnowledgeDoc {
  id: string;
  title: string;
  category: ThreadCategory;
  /** Path relative to knowledge/ folder */
  path: string;
  /** Keywords for the guard-rail matcher and tool lookup */
  keywords: string[];
}

/** The knowledge index — maps categories/topics to their .md files */
export interface KnowledgeIndex {
  documents: KnowledgeDoc[];
}

// ---- Prepopulated messages ----

/** A single message part (text only for now) */
export interface PrepopulatedMessagePart {
  type: "text";
  text: string;
}

/** A message in a prepopulated thread conversation */
export interface PrepopulatedMessage {
  id: string;
  role: "user" | "assistant";
  parts: PrepopulatedMessagePart[];
}

/** The prepopulated conversation for a thread */
export interface PrepopulatedChat {
  threadId: string;
  messages: PrepopulatedMessage[];
}
