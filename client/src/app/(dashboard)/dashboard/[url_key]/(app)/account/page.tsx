import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    url_key: string;
  };
}

export default async function Page({ params }: DashboardLayoutProps) {
  redirect(`/dashboard/${params.url_key}/account/settings`);
}
