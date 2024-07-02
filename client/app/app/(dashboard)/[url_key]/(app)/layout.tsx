import { cookies } from "next/headers";

import Resizable from "./_components/rezisable";

import Toolbar from "@/components/layouts/toolbar/top-toolbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssistantModal } from "./_components/ai/assistant-modal";
import ResizableGroup from "./_components/resizableGroup";
import Sidebar from "./_components/sidebar";

import { SidebarProvider } from "@/lib/store";
import { AI } from "./_components/ai/actions";
import { LivekitRoomProvider } from "./_components/ai/livekitRoomProvider";
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
          <ResizableGroup>
            <Sidebar params={params} />
            {/* <DotPattern className="absolute top-0 z-[-2] h-screen w-screen bg-background  "> */}
            <Resizable defaultLayout={defaultLayout}>
              <AssistantModal />
              <ScrollArea className="h-screen">
                <Toolbar className="sticky top-0 z-40 hidden p-2 pb-4 sm:block" />

                {children}

                <Toolbar className="sticky bottom-0 z-40 mt-4 block rounded-md border bg-muted p-2 pt-4 sm:hidden" />
              </ScrollArea>
            </Resizable>
            {/* </DotPattern> */}
          </ResizableGroup>
        </SidebarProvider>
      </LivekitRoomProvider>
    </AI>
  );
}
