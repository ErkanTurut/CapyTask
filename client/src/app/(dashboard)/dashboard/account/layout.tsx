import { dashboardConfig } from "@/config/dashboard.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "@/components/layouts/app-sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { user } from "@prisma/client";
import { redirect } from "next/navigation";

import OrganizationSelector from "@/components/organizationSelector";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shells/shell";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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
