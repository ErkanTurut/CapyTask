import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils";
import { MainSidebar } from "./sidebar/main-sidebar";
import { HeaderSidebar } from "./sidebar/header-sidebar";
import { FooterSidebar } from "./sidebar/footer-sidebar";
import { dashboardConfig } from "@/config/dashboard.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceNav from "@/components/workspace-navigation";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  props: {
    workspaces: Database["public"]["Tables"]["workspace"]["Row"][];
    teams: Database["public"]["Tables"]["team"]["Row"][] | null;
  };
}

import { Suspense } from "react";
import ResizeZone from "./resize-zone";
import { Database } from "@/types/supabase.types";

export async function Sidebar({ className, props }: SidebarProps) {
  return (
    <ResizeZone>
      <div
        className={cn(
          "flex w-full h-full flex-grow overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="flex flex-col w-full h-full gap-1">
          <Suspense fallback="loading...">
            <WorkspaceNav workspaces={props.workspaces} />
          </Suspense>
          {/* <ThemeToggle toggle={true} /> */}
          <nav className="flex w-full flex-col gap-1 flex-grow overflow-hidden">
            <div className="flex w-full flex-col gap-1 overflow-hidden">
              <HeaderSidebar items={dashboardConfig.sidebarNav} />
              <Separator className="flex" />
              <div className="flex-grow overflow-y-auto">
                <ScrollArea>
                  <MainSidebar items={dashboardConfig.sidebarNav} />
                </ScrollArea>
              </div>
            </div>
          </nav>
          <FooterSidebar items={dashboardConfig.sidebarNav} />
        </div>
      </div>
    </ResizeZone>
  );
}
