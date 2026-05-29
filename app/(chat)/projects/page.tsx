import { redirect } from "next/navigation";
import portfolioData from "@/data/portfolio.json";

export default function ProjectsPage() {
  const section = portfolioData.sections.find((s) => s.id === "projects");
  const firstThread = section?.threads[0];
  if (firstThread) redirect(`${section!.route}/${firstThread.id}`);
  return null;
}
