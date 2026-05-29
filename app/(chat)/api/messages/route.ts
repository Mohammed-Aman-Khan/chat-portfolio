import { PORTFOLIO_USER_ID } from "@/lib/constants";
import { getChatById, getMessagesByChatId } from "@/lib/store";
import { convertToUIMessages } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return Response.json({ error: "chatId required" }, { status: 400 });
  }

  const [chat, messages] = await Promise.all([
    getChatById({ id: chatId }),
    getMessagesByChatId({ id: chatId }),
  ]);

  if (!chat) {
    return Response.json({
      messages: [],
      visibility: "private",
      userId: null,
      isReadonly: false,
    });
  }

  if (
    chat.visibility === "private" &&
    PORTFOLIO_USER_ID !== chat.userId
  ) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  const isReadonly = PORTFOLIO_USER_ID !== chat.userId;

  return Response.json({
    messages: convertToUIMessages(messages),
    visibility: chat.visibility,
    userId: chat.userId,
    isReadonly,
  });
}
