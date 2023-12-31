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
import { useTeam, useUser, useWorkspace } from "@/lib/store";
import { Sidebar } from "./sidebar";
import { Database } from "@/types/supabase.types";
import { TooltipProvider } from "@/components/ui/tooltip";

interface AppProps {
  children: React.ReactNode;
  teams: Database["public"]["Tables"]["team"]["Row"][] | null;
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

const App: FC<AppProps> = ({
  children,
  teams,
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
  const user = useUser()((state) => state.user)!;
  const setTeamList = useTeam()((state) => state.setTeamList);
  setTeamList(teams);

  // Handler for ResizablePanel collapse/expand
  const handlePanelChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      collapsed
    )};path=/`;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )};path=/`;
        }}
        className="min-h-screen"
      >
        {/* Sidebar */}
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={13}
          maxSize={20}
          onCollapse={() => handlePanelChange(true)}
          onExpand={() => handlePanelChange(false)}
          className={cn(
            "min-w-[120px]",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            teams={teams}
            workspace={workspace}
            user={user}
          />
        </ResizablePanel>

        {/* Resizable handle */}
        <ResizableHandle withHandle />

        {/* Main content */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Shell
            variant="default"
            className="relative flex-1 flex-col overflow-x-hidden lg:ml-0 backdrop-blur-[1px]"
          >
            {children}
          </Shell>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default App;
