"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceNav from "@/components/workspace-navigation";

import { Database } from "@/types/supabase.types";
import { Nav } from "@/components/layouts/sidebar/nav";

import { appNavItems } from "@/config/dashboard.config";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useWorkspace } from "@/lib/store";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const workspaceList = useWorkspace()((state) => state.workspaceList);
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center p-2">
          <div className="w-full">
            <WorkspaceNav
              isCollapsed={isCollapsed}
              workspaces={workspaceList!}
            />
          </div>
        </div>
        <Separator />
        <Nav isCollapsed={isCollapsed} items={appNavItems.header} />
        <Separator />
        <Nav isCollapsed={isCollapsed} items={appNavItems.main} />
        <Separator />
        <Nav isCollapsed={isCollapsed} items={appNavItems.footer} />
      </div>
    </TooltipProvider>
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
