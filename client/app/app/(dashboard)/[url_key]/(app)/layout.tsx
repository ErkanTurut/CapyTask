import { cookies } from "next/headers";

import { Sidebar } from "@/components/dashboard/sidebar/sidebar";

import { SidebarProvider } from "@/lib/store";
import { AI } from "./_components/ai/actions";
import { LivekitRoomProvider } from "./_components/ai/livekitRoomProvider";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function DashboardLayout({
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

  return (
    <AI>
      <LivekitRoomProvider>
        <SidebarProvider isCollapsed={defaultCollapsed || false}>
          <div className="relative flex h-screen w-full justify-center">
            <Sidebar
              className="sticky top-0 flex rounded-md border-r bg-muted/40 transition-shadow duration-300 hover:shadow-md"
              params={params}
            />
            <main className="flex h-screen w-full flex-1 flex-col rounded-md">
              <div className="flex w-full border-b p-2">
                <Breadcrumb className="flex h-9 items-center rounded-md border p-2">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/components">
                        Components
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </LivekitRoomProvider>
    </AI>
  );
}
