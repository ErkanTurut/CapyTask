import { cookies } from "next/headers";

import { TooltipProvider } from "@/components/ui/tooltip";

import ResizableGroup from "./_components/resizableGroup";
import Resizable from "./_components/rezisable";

import { SidebarProvider } from "@/lib/store";

import DotPattern from "@/components/dot-pattern";
import Toolbar from "@/components/layouts/toolbar/top-toolbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "./_components/sidebar";
import { Suspense } from "react";
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
        <ResizableGroup>
          <Sidebar params={params} />
          {/* <DotPattern className="absolute top-0 z-[-2] h-screen w-screen bg-background  "> */}
          <Resizable defaultLayout={defaultLayout}>
            <ScrollArea className="h-screen">
              <Toolbar className="sticky top-0 z-40 hidden p-2 pb-4 sm:block  " />
              {children}
              <Toolbar className="sticky bottom-0 z-40 mt-4 block rounded-md border bg-muted p-2 pt-4 sm:hidden " />
            </ScrollArea>
          </Resizable>
          {/* </DotPattern> */}
        </ResizableGroup>
      </TooltipProvider>
    </SidebarProvider>
  );
}
