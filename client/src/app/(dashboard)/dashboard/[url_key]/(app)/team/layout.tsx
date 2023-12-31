import { redirect } from "next/navigation";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Shell } from "@/components/shells/shell";
import { getSession } from "@/lib/services/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({
  children,
}: DashboardLayoutProps) {
  const {
    data: { session },
    error,
  } = await getSession();

  if (!session?.user || error) {
    redirect("/signin");
  }
  return <Shell variant="default">{children}</Shell>;
}
