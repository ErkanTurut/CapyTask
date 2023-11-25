import type { Metadata } from "next";

import { LogOutButtons } from "@/components/auth/logoutButton";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Shell } from "@/components/shells/shell";
import { getUserSession } from "@/lib/services/user";
import { redirect } from "next/navigation";
import { getWorkspace } from "@/lib/services/workspace";
interface DashboardLayoutProps {
  params: {
    url_key: string;
  };
}

export default async function DashboardPage({ params }: DashboardLayoutProps) {
  const { data } = await getUserSession();

  if (!data.session) {
    redirect("/signin");
  }

  const { workspace } = await getWorkspace(params.url_key);
  if (workspace) {
    redirect(`/${params.url_key}/team`);
  }

  return null;
}
