import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceNav from "@/components/workspace/workspace-navigation";

import { Database } from "@/types/supabase.types";
import { Nav } from "@/components/layouts/sidebar/nav";

import { appNavItems } from "@/config/dashboard.config";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TeamList } from "./team-list";
import { getTeams } from "@/lib/services/team";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  workspace: Database["public"]["Tables"]["workspace"]["Row"];
}

export function Sidebar({ className, isCollapsed, workspace }: SidebarProps) {
  const teams = null;
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center p-2">
          <div className="w-full">
            <WorkspaceNav isCollapsed={isCollapsed} />
          </div>
        </div>
        <Separator />
        <Nav isCollapsed={isCollapsed} items={appNavItems.header} />
        <Separator />
        {/* <Nav isCollapsed={isCollapsed} items={appNavItems.main} /> */}
        <TeamList
          isCollapsed={isCollapsed}
          items={appNavItems.main}
          teams={teams}
        />
        <Separator />
        <Nav isCollapsed={isCollapsed} items={appNavItems.footer} />
      </div>
    </TooltipProvider>
  );
}
