import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    url_key: string;
  };
}

export default async function RedirectPage({ params }: DashboardLayoutProps) {
  redirect(`/dashboard/${params.url_key}/team`);
}
