import { cookies } from "next/headers";

import { TooltipProvider } from "@/components/ui/tooltip";

import ResizableGroup from "./_components/resizableGroup";
import Resizable from "./_components/rezisable";

import { SidebarProvider } from "@/lib/store";

import { Shell } from "@/components/shells";
import Sidebar from "./_components/sidebar";
interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
  modal,
}: DashboardLayoutProps) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;

  return (
    <SidebarProvider isCollapsed={defaultCollapsed || false}>
      <div className="min-h-screen">
        {modal}
        <TooltipProvider delayDuration={0}>
          <ResizableGroup>
            <Sidebar params={params} />
            <Resizable defaultLayout={defaultLayout}>
              <Shell>{children}</Shell>
            </Resizable>
          </ResizableGroup>
        </TooltipProvider>
      </div>
    </SidebarProvider>
  );
}
