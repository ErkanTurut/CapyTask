import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MainSidebar } from "./sidebar/main-sidebar";
import { HeaderSidebar } from "./sidebar/header-sidebar";
import { FooterSidebar } from "./sidebar/footer-sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceNav from "@/components/workspace/workspace-navigation";

import { Suspense } from "react";
import ResizeZone from "./resize-zone";
import { Database } from "@/types/supabase.types";
import { TDashboardConfig } from "@/config/dashboard.config";
import { SidebarNavItem } from "@/types";
import UserAccountNav from "../user-account-navigation";
import { TeamSidebar } from "./sidebar/team-sidebar";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  props: {
    workspaces: Database["public"]["Tables"]["workspace"]["Row"][];
    teams?: Database["public"]["Tables"]["team"]["Row"][] | null;
    sidebarNav: TDashboardConfig["sidebarNav"];
    user?: Database["public"]["Tables"]["user"]["Row"];
  };
}

export async function Sidebar({ className, props }: SidebarProps) {
  return (
    <>
      <div className="flex items-center p-2">
        <div
          className="w-full"
          // className={cn("w-full flex-1", isCollapsed ? "w-full" : "w-[80%]")}
        >
          <WorkspaceNav workspaces={props.workspaces} />
        </div>
      </div>
    </>
  );
}

{
  /* <div className={cn("flex w-full h-full", className)} {...props}>
<div className="flex flex-col w-full h-full gap-1">
  <div className="flex gap-1 items-center">
    {props.workspaces && (
      <Suspense fallback="loading...">
        <WorkspaceNav
          className="max-w-s overflow-x-hidden"
          workspaces={props.workspaces}
        />
      </Suspense>
    )}
    {props.user && (
      <Suspense fallback="loading...">
        <UserAccountNav
          className="w-7 h-7 flex-grow"
          user={props.user}
        />
      </Suspense>
    )}
  </div>
  <nav className="flex w-full flex-col gap-1 flex-grow">
    <div className="flex w-full flex-col gap-1">
      <HeaderSidebar items={props.sidebarnav} />
      <Separator className="flex" />
      <div className="flex-grow overflow-y-auto">
        <ScrollArea>
          <MainSidebar items={props.sidebarnav} />
          {props.teams && <TeamSidebar items={{ team: props.teams }} />}
        </ScrollArea>
      </div>
    </div>
  </nav>

  {props.sidebarnav && <FooterSidebar items={props.sidebarnav} />}
</div>
</div> */
}
