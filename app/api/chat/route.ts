import { frontendTools } from "@assistant-ui/react-ai-sdk";
import {
  type JSONSchema7,
  streamText,
  convertToModelMessages,
  type UIMessage,
  type UIMessageChunk,
  tool,
  stepCountIs,
  zodSchema,
  gateway,
  createUIMessageStreamResponse,
} from "ai";
import { z } from "zod";
import { readFile } from "fs/promises";
import { join } from "path";
import type { KnowledgeIndex, KnowledgeDoc } from "@/lib/types";
import knowledgeIndex from "@/knowledge/index.json";

export const maxDuration = 30;
// ---- Off-topic guard rail ----

// Generic intro phrases that combine with portfolio keywords
const GENERIC_INTROS = [
  "what", "tell me", "how", "can you", "do you", "who",
  "where", "about you", "yourself", "your background",
  "your work", "your experience", "your skills", "your education",
  "your projects", "your portfolio",
];

function isOnTopic(text: string): boolean {
  const lower = text.toLowerCase();

  // Check against the knowledge index keywords
  const index = knowledgeIndex as KnowledgeIndex;
  const matchesDoc = index.documents.some((doc) =>
    doc.keywords.some((kw) => lower.includes(kw.toLowerCase())),
  );
  if (matchesDoc) return true;

  // Check generic intro phrases combined with portfolio signals
  const hasIntro = GENERIC_INTROS.some((intro) =>
    lower.includes(intro),
  );
  const hasPortfolioSignal = /portfolio|resume|cv|hire|contact|background|career/i.test(lower);
  if (hasIntro && hasPortfolioSignal) return true;

  return false;
}

function offTopicResponse(): Response {
  const messageId = `offtopic-${Date.now()}`;
  const stream = new ReadableStream<UIMessageChunk>({
    start(controller) {
      controller.enqueue({ type: "start" });
      controller.enqueue({ type: "text-start", id: messageId });
      controller.enqueue({
        type: "text-delta",
        id: messageId,
        delta:
          "I'm a portfolio assistant — I can tell you about work experience, technical skills, education, and projects. Is there something specific you'd like to know?",
      });
      controller.enqueue({ type: "text-end", id: messageId });
      controller.enqueue({ type: "finish", finishReason: "stop" });
      controller.close();
    },
  });
  return createUIMessageStreamResponse({ stream });
}

// ---- Knowledge lookup ----

async function loadDoc(doc: KnowledgeDoc): Promise<string> {
  const filePath = join(process.cwd(), "knowledge", doc.path);
  return readFile(filePath, "utf-8");
}

function findRelevantDocs(query: string, limit = 3): KnowledgeDoc[] {
  const index = knowledgeIndex as KnowledgeIndex;
  const lower = query.toLowerCase();
  const scored = index.documents.map((doc) => ({
    doc,
    matchCount: doc.keywords.filter((kw) =>
      lower.includes(kw.toLowerCase()),
    ).length,
  }));
  return scored
    .filter((s) => s.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((s) => s.doc);
}

// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  const {
    messages,
    system,
    tools: clientTools,
  }: {
    messages: UIMessage[];
    system?: string;
    tools?: Record<string, { description?: string; parameters: JSONSchema7 }>;
  } = await req.json();

  // Off-topic guard: check the latest user message
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  if (lastUserMsg) {
    const textParts = lastUserMsg.parts.filter(
      (p): p is { type: "text"; text: string } => p.type === "text",
    );
    const text = textParts.map((p) => p.text).join(" ");
    if (!isOnTopic(text)) {
      return offTopicResponse();
    }
  }

  const result = streamText({
    model: gateway("deepseek/deepseek-v4-flash"),
    messages: await convertToModelMessages(messages),
    ...(system ? { system } : {}),
    stopWhen: stepCountIs(5),
    tools: {
      ...frontendTools(clientTools ?? {}),
      lookup_portfolio: tool({
        description:
          "Search the portfolio knowledge base for detailed information. Use when asked about experience, skills, education, or projects.",
        inputSchema: zodSchema(
          z.object({
            query: z.string().describe("What the visitor is asking about"),
          }),
        ),
        execute: async ({ query }) => {
          const docs = findRelevantDocs(query);
          if (docs.length === 0) {
            return "No specific information found on that topic. Try asking about experience, skills, education, or projects.";
          }
          const contents = await Promise.all(docs.map(loadDoc));
          return contents.join("\n\n---\n\n");
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
