import { redirect } from "next/navigation";
import TeamList from "@/components/teams/team-list";

export default async function TeamsPage() {
  return <TeamList />;
}
