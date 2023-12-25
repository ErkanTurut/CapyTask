"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState, FC, useEffect } from "react";
import { Shell } from "@/components/shells/shell";
import { useParams } from "next/navigation";
import { useWorkspace } from "@/lib/store";
import { useSelectedLayoutSegment } from "next/navigation";

interface appProps {
  children: React.ReactNode;
  defaultLayout: number[];
  defaultCollapsed: boolean;
  navCollapsedSize: number;
}

const App: FC<appProps> = ({
  children,
  defaultLayout = [30, 70],
  navCollapsedSize,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const { url_key } = useParams();

  useEffect(() => {
    document.cookie = `gembuddy:workspace_url_key=${JSON.stringify(
      url_key
    )};path=/`;
  }, [url_key]);

  const workspace = useWorkspace()((state) => state.workspace)!;
  const sidebarSegment = useSelectedLayoutSegment();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )};path=/`;
      }}
      className="min-h-screen  items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={14}
        maxSize={30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )};path=/`;
        }}
        onExpand={() => {
          console.log("expanded");
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )};path=/`;
        }}
        className={cn(isCollapsed && "transition-all duration-300 ease-in-out")}
      >
        {/* <Sidebar isCollapsed={isCollapsed} workspace={workspace} /> */}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>
        <Shell
          variant="sidebar"
          className="relative flex-1 flex-col overflow-x-hidden  lg:ml-0 backdrop-blur-[1px]"
        >
          {children}
        </Shell>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default App;
