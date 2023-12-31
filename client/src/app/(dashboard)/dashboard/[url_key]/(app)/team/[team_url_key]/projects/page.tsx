import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    team_url_key: string;
  };
}

export default async function DashboardPage({ params }: DashboardLayoutProps) {
  return <div>{params.team_url_key}</div>;
}
