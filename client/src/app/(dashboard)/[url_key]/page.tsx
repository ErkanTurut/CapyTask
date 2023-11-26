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
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    redirect("/signin");
  }

  const { data } = await getWorkspace(params.url_key);
  if (data?.length) {
    redirect(`/${params.url_key}/team`);
  }
  return null;
}
