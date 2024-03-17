import { cookies } from "next/headers";

import { TooltipProvider } from "@/components/ui/tooltip";

import ResizableGroup from "./_components/resizableGroup";
import Resizable from "./_components/rezisable";

import { SidebarProvider } from "@/lib/store";

import DotPattern from "@/components/dot-pattern";
import Toolbar from "@/components/layouts/toolbar/top-toolbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "./_components/sidebar";
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
  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;

  return (
    <SidebarProvider isCollapsed={defaultCollapsed || false}>
      <TooltipProvider delayDuration={0}>
        <DotPattern className="absolute top-0 z-[-2] h-screen w-screen bg-background  ">
          <ResizableGroup>
            <Sidebar params={params} />
            <Resizable defaultLayout={defaultLayout}>
              <ScrollArea className="h-screen ">
                <Toolbar />
                {children}
              </ScrollArea>
            </Resizable>
          </ResizableGroup>
        </DotPattern>{" "}
      </TooltipProvider>
    </SidebarProvider>
  );
}
