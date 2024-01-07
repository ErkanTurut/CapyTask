import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    url_key: string;
    team_identity: string;
  };
}

export default async function RedirectPage({ params }: DashboardLayoutProps) {
  redirect(`./${params.team_identity}/projects`);
}
