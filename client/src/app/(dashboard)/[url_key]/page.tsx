import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  params: {
    url_key: string;
  };
}

export default async function DashboardPage({ params }: DashboardLayoutProps) {
  redirect(`/${params.url_key}/teams`);
}
