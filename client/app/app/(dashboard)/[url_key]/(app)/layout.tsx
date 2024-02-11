import { cookies } from "next/headers";

import { TooltipProvider } from "@/components/ui/tooltip";

import ResizableGroup from "./_components/resizableGroup";
import Resizable from "./_components/rezisable";

import { SidebarProvider } from "@/lib/store";

import { Shell } from "@/components/shells";
import Sidebar from "./_components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import DotPattern from "@/components/dot-pattern";
import { Breadcrumb } from "@/components/layouts/breadcrumb";
import useCookie from "@/lib/hooks/use-cookie";
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
      <DotPattern className="absolute top-0 z-[-2] h-screen w-screen bg-background  ">
        <div className="min-h-screen">
          {modal}
          <TooltipProvider delayDuration={0}>
            <ResizableGroup>
              <Sidebar params={params} />
              <Resizable defaultLayout={defaultLayout}>
                <ScrollArea className="h-screen ">
                  {/* <div className="flex h-11 items-center border-b bg-background/30 p-2 backdrop-blur-[2px]">
                    <Breadcrumb />
                  </div> */}

                  {children}
                </ScrollArea>
              </Resizable>
            </ResizableGroup>
          </TooltipProvider>
        </div>
      </DotPattern>
    </SidebarProvider>
  );
}
