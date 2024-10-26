import { cookies } from "next/headers";

import Header from "@/components/layouts/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@gembuddy/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Separator } from "@gembuddy/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gembuddy/ui/breadcrumb";
import { Suspense } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    url_key: string;
  }>;
}

export default async function Layout(props: DashboardLayoutProps) {
  const params = await props.params;

  const { children } = props;

  const sidebarState = (await (await cookies()).get("sidebar:state")?.value) as
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
      <Suspense>
        <AppSidebar params={params} />
      </Suspense>
      {/* <main className="flex w-full flex-col rounded-md border bg-background">
              <Header />
              
              <div className="flex-1 overflow-hidden">{children}</div>
            </main> */}

      <SidebarInset className="overflow-y-hidden">
        <Header />

        <div className="flex flex-1 overflow-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
