import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    team_id: string;
  };
}

export default async function DashboardPage({ params }: DashboardLayoutProps) {
  return <div>{params.team_id}</div>;
}
