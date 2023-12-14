import { redirect } from "next/navigation";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Shell } from "@/components/shells/shell";
import { getSession } from "@/lib/auth";

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

  return (
    <Shell variant="left" className="max-w-3xl">
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      {children}
    </Shell>
  );
}
