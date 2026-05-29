import "server-only";

import type { VisibilityType } from "@/lib/types";
import { PORTFOLIO_USER_ID } from "@/lib/constants";
import { generateUUID } from "@/lib/utils";
import type {
  Chat,
  DBMessage,
  Document,
  Suggestion,
  Vote,
} from "./types-db";

// In-memory store — data persists during server lifetime
const chats = new Map<string, Chat>();
const messages = new Map<string, DBMessage[]>();
const votes = new Map<string, Vote[]>();
const documents = new Map<string, Document[]>();
const suggestions = new Map<string, Suggestion[]>();
const streams = new Map<string, string[]>();

export async function saveChat({
  id,
  userId,
  title,
  visibility,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: VisibilityType;
}) {
  chats.set(id, { id, createdAt: new Date(), userId, title, visibility });
}

export async function deleteChatById({ id }: { id: string }) {
  messages.delete(id);
  votes.delete(id);
  streams.delete(id);
  const chat = chats.get(id);
  chats.delete(id);
  return chat;
}

export async function deleteAllChatsByUserId({ userId }: { userId: string }) {
  let deletedCount = 0;
  for (const [id, chat] of chats) {
    if (chat.userId === userId) {
      messages.delete(id);
      votes.delete(id);
      streams.delete(id);
      chats.delete(id);
      deletedCount++;
    }
  }
  return { deletedCount };
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  let userChats = [...chats.values()]
    .filter((c) => c.userId === id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (startingAfter) {
    const idx = userChats.findIndex((c) => c.id === startingAfter);
    if (idx >= 0) userChats = userChats.slice(idx + 1);
  } else if (endingBefore) {
    const idx = userChats.findIndex((c) => c.id === endingBefore);
    if (idx >= 0) userChats = userChats.slice(0, idx);
  }

  const hasMore = userChats.length > limit;
  return { chats: hasMore ? userChats.slice(0, limit) : userChats, hasMore };
}

export async function getChatById({ id }: { id: string }) {
  return chats.get(id) ?? null;
}

export async function saveMessages({ messages: msgs }: { messages: DBMessage[] }) {
  for (const msg of msgs) {
    const existing = messages.get(msg.chatId) ?? [];
    existing.push(msg);
    messages.set(msg.chatId, existing);
  }
}

export async function updateMessage({
  id,
  parts,
}: {
  id: string;
  parts: DBMessage["parts"];
}) {
  for (const [, msgs] of messages) {
    const msg = msgs.find((m) => m.id === id);
    if (msg) {
      msg.parts = parts;
      break;
    }
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  return messages.get(id) ?? [];
}

export async function getMessageById({ id }: { id: string }) {
  for (const [, msgs] of messages) {
    const msg = msgs.find((m) => m.id === id);
    if (msg) return [msg];
  }
  return [];
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  const msgs = messages.get(chatId) ?? [];
  const remaining = msgs.filter((m) => m.createdAt < timestamp);
  messages.set(chatId, remaining);
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  const existing = votes.get(chatId) ?? [];
  const idx = existing.findIndex((v) => v.messageId === messageId);
  if (idx >= 0) {
    existing[idx].isUpvoted = type === "up";
  } else {
    existing.push({ chatId, messageId, isUpvoted: type === "up" });
  }
  votes.set(chatId, existing);
}

export async function getVotesByChatId({ id }: { id: string }) {
  return votes.get(id) ?? [];
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: string;
  content: string;
  userId: string;
}) {
  const doc: Document = {
    id,
    createdAt: new Date(),
    title,
    kind: kind as Document["kind"],
    content,
    userId,
  };
  const existing = documents.get(id) ?? [];
  existing.push(doc);
  documents.set(id, existing);
}

export async function updateDocumentContent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const existing = documents.get(id) ?? [];
  if (existing.length > 0) {
    const latest = existing[existing.length - 1];
    latest.content = content;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  return documents.get(id) ?? [];
}

export async function getDocumentById({ id }: { id: string }) {
  const existing = documents.get(id) ?? [];
  return existing.length > 0 ? existing[existing.length - 1] : undefined;
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  const existing = documents.get(id) ?? [];
  const remaining = existing.filter((d) => d.createdAt <= timestamp);
  documents.set(id, remaining);
  return existing.filter((d) => d.createdAt > timestamp);
}

export async function saveSuggestions({
  suggestions: suggs,
}: {
  suggestions: Suggestion[];
}) {
  for (const s of suggs) {
    const existing = suggestions.get(s.documentId) ?? [];
    existing.push(s);
    suggestions.set(s.documentId, existing);
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  return suggestions.get(documentId) ?? [];
}

export async function getMessageCountByUserId({
  id: _id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  let count = 0;
  const cutoff = Date.now() - differenceInHours * 3600000;
  for (const [, msgs] of messages) {
    count += msgs.filter(
      (m) => m.role === "user" && m.createdAt.getTime() > cutoff
    ).length;
  }
  return count;
}

export async function updateChatVisibilityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  const chat = chats.get(chatId);
  if (chat) chat.visibility = visibility;
}

export async function updateChatTitleById({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  const chat = chats.get(chatId);
  if (chat) chat.title = title;
}

export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  const existing = streams.get(chatId) ?? [];
  existing.push(streamId);
  streams.set(chatId, existing);
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
  return streams.get(chatId) ?? [];
}
