import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    url_key: string;
    team_url_key: string;
  };
}

export default async function RedirectPage({ params }: DashboardLayoutProps) {
  redirect(`./${params.team_url_key}/projects`);
}
