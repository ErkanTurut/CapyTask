import { cookies } from "next/headers";

import { AppSidebar } from "@/components/layouts/app-sidebar";
import Header from "@/components/layouts/dashboard/header";
import { trpc } from "@gembuddy/trpc/server";
import { SidebarInset, SidebarProvider } from "@gembuddy/ui/sidebar";
import { notFound } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    url_key: string;
  }>;
}

export default async function Layout(props: DashboardLayoutProps) {
  const params = await props.params;

  const { children } = props;

  const sidebarState = (await cookies()).get("sidebar:state")?.value as
    | boolean
    | undefined;

  const { data } = await trpc.db.workspace.get.byUrlKey({
    url_key: params.url_key,
  });

  if (!data) {
    throw notFound();
  }

  return (
    <SidebarProvider
      defaultOpen={sidebarState}
      className="h-dvh"
      style={
        {
          "--sidebar-width": "13rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar params={params} />
      <SidebarInset className="overflow-y-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
