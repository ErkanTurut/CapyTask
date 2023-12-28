"use client";

import { Shell } from "@/components/shells/shell";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Database } from "@/types/supabase.types";
import { FC, useState } from "react";

interface SidebarResizableProps {
  children: React.ReactNode;
  defaultLayout: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const SidebarResizable: FC<SidebarResizableProps> = ({
  children,
  defaultLayout = [30, 70],
  navCollapsedSize,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  function cn(arg0: string | boolean): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={12}
        maxSize={30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )};path=/`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )};path=/`;
        }}
        className={cn(isCollapsed && "transition-all duration-300 ease-in-out")}
      >
        <Shell
          variant="sidebar"
          className="relative flex-1 flex-col overflow-x-hidden  lg:ml-0 backdrop-blur-[1px]"
        >
          {children}
        </Shell>
      </ResizablePanel>
      <ResizableHandle withHandle />
    </>
  );
};

export default SidebarResizable;
