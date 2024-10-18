import { cookies } from "next/headers";

import Header from "@/components/layouts/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";
import {SidebarProvider, SidebarInset, SidebarTrigger} from "@gembuddy/ui/sidebar"
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Separator } from "@gembuddy/ui/separator";
import { Breadcrumb

, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
 } from "@gembuddy/ui/breadcrumb";


interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function Layout({
  children,
  params,
}: DashboardLayoutProps) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;
  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;

  const { data } = await trpc.db.workspace.get.byUrlKey({
    url_key: params.url_key,
  });

  if (!data) {
    throw notFound();
  }

  return (
      <SidebarProvider>
        <AppSidebar />
            {/* <main className="flex w-full flex-col rounded-md border bg-background">
              <Header />
              
              <div className="flex-1 overflow-hidden">{children}</div>
            </main> */}


            <SidebarInset  >

   
            <Header />

        <div className="flex flex-1 overflow-hidden">
              {children}
        </div>
    
        </SidebarInset>
      </SidebarProvider>

  );
}
