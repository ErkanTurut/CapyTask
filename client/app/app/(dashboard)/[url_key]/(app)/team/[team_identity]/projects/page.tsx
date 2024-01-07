import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    team_identity: string;
  };
}

export default async function DashboardPage({ params }: DashboardLayoutProps) {
  return <div>{params.team_identity}</div>;
}
