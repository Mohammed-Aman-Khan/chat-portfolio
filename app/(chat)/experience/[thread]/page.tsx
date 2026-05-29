import { ThreadPage } from "@/components/chat/thread-page";

export default async function ExperienceThreadPage({
  params,
}: {
  params: Promise<{ thread: string }>;
}) {
  const { thread } = await params;
  return <ThreadPage sectionId="experience" threadId={thread} />;
}
