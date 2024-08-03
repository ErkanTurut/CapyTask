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
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <div className="relative flex h-screen w-full justify-center bg-muted/40">
          {/* <Sidebar className="sticky top-0 flex" params={params} /> */}
          <main className="m-1 flex w-full flex-1 flex-col rounded-md border bg-background">
            <div className="flex w-full border-b border-transparent p-2 shadow-none transition-all duration-200 hover:border-border">
              <Breadcrumb className="flex h-7 items-center rounded-md border p-2 hover:bg-muted/40">
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
            <ScrollArea className="flex-1">{children}</ScrollArea>
          </main>
        </div>
      </LivekitRoomProvider>
    </AI>
  );
}
