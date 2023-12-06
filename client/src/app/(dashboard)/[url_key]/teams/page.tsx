import { redirect } from "next/navigation";
import TeamList from "@/components/teams/team-list";
import { getUserSession } from "@/lib/services/user";

export default async function TeamsPage() {
  const {
    data: { session },
    error,
  } = await getUserSession();

  if (!session?.user || error) redirect("/signin");

  return <TeamList />;
}
