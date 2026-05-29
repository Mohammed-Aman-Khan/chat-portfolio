import { ThreadPage } from "@/components/chat/thread-page";

export default async function ProjectsThreadPage({
  params,
}: {
  params: Promise<{ thread: string }>;
}) {
  const { thread } = await params;
  return <ThreadPage sectionId="projects" threadId={thread} />;
}
