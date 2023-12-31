import { redirect } from "next/navigation";
import TeamList from "@/components/team/team-list";

export default async function TeamsPage() {
  return (
    <>
      <TeamList />
    </>
  );
}
