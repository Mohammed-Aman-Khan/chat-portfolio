import type { NextRequest } from "next/server";
import { PORTFOLIO_USER_ID } from "@/lib/constants";
import { deleteAllChatsByUserId, getChatsByUserId } from "@/lib/store";
import { ChatbotError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const limit = Math.min(
    Math.max(Number.parseInt(searchParams.get("limit") || "10", 10), 1),
    50
  );
  const startingAfter = searchParams.get("starting_after");
  const endingBefore = searchParams.get("ending_before");

  if (startingAfter && endingBefore) {
    return new ChatbotError(
      "bad_request:api",
      "Only one of starting_after or ending_before can be provided."
    ).toResponse();
  }

  const chats = await getChatsByUserId({
    id: PORTFOLIO_USER_ID,
    limit,
    startingAfter,
    endingBefore,
  });

  return Response.json(chats);
}

export async function DELETE() {
  const result = await deleteAllChatsByUserId({ userId: PORTFOLIO_USER_ID });

  return Response.json(result, { status: 200 });
}
