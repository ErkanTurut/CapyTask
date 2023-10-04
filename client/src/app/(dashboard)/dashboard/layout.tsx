import { dashboardConfig } from "@/config/dashboard.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "@/components/layouts/sidebarNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AppNav } from "@/components/layouts/appNav";
import type { user } from "@prisma/client";
import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user, error }: { data: user | null; error: any } =
    await supabase.from("user").select().single();

  return (
    <div className="flex min-h-screen flex-col">
      <AppNav user={user} />
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] ">
        <aside className="fixed px-4 z-30 -ml-2 hidden h-full w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-2 lg:py-4">
            <SidebarNav items={dashboardConfig.sidebarNav} className="p-1" />
          </ScrollArea>
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
