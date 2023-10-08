import { dashboardConfig } from "@/config/dashboard.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "@/components/layouts/sidebarNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AppNav } from "@/components/layouts/appNav";
import type { user } from "@prisma/client";
import { redirect } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrganizationSelector from "@/components/organizationSelector";

import { Icons } from "@/components/icons";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const items = [
    {
      title: "Project 1",
      href: "/project-1",
    },
    {
      title: "Project 2",
      href: "/project-2",
    },
    {
      title: "Project 3",
      href: "/project-3",
    },
  ];

  const { data: user, error }: { data: user | null; error: any } =
    await supabase.from("user").select().single();

  return (
    <div className="flex min-h-screen flex-col">
      {/* <AppNav user={user} /> */}
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] ">
        <aside className="fixed px-4 py-4 z-30 -ml-2 hidden h-full w-full shrink-0 overflow-y-auto border-r md:sticky md:flex flex-col justify-between">
          <ScrollArea>
            <SidebarNav items={dashboardConfig.sidebarNav} className="p-1" />
          </ScrollArea>
          <OrganizationSelector className="h-12 bottom-0" items={items} />
        </aside>
        <ScrollArea>
          <main className="flex container w-full flex-col overflow-hidden">
            {children}
          </main>
        </ScrollArea>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
