import { redirect } from "next/navigation";
import portfolioData from "@/data/portfolio.json";

export default function ExperiencePage() {
  const section = portfolioData.sections.find((s) => s.id === "experience");
  const firstThread = section?.threads[0];
  if (firstThread) redirect(`${section!.route}/${firstThread.id}`);
  return null;
}
