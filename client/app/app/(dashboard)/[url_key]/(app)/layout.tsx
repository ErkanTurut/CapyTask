import { cookies } from "next/headers";

import Sidebar from "./_components/sidebar_2/sidebar";

import { SidebarProvider } from "@/lib/store";
import { AI } from "./_components/ai/actions";
import { LivekitRoomProvider } from "./_components/ai/livekitRoomProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
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
          <div className="relative flex min-h-screen w-full justify-center gap-2">
            <Sidebar
              className="sticky top-0 flex h-screen border"
              params={params}
            />
            <main className="w-full flex-1 rounded-md border bg-muted/40">
              {children}
            </main>
          </div>
          {/* <ResizableGroup> */}
          {/* <DotPattern className="absolute top-0 z-[-2] h-screen w-screen bg-background  "> */}
          {/* <Resizable defaultLayout={defaultLayout}>
              <AssistantModal />
              <ScrollArea className="h-screen"> */}
          {/* <Toolbar className="sticky top-0 z-40 hidden p-2 pb-4 sm:block" /> */}

          {/* <Toolbar className="sticky bottom-0 z-40 mt-4 block rounded-md border bg-muted p-2 pt-4 sm:hidden" /> */}
          {/* </ScrollArea>
            </Resizable> */}
          {/* </DotPattern> */}
          {/* </ResizableGroup> */}
        </SidebarProvider>
      </LivekitRoomProvider>
    </AI>
  );
}
