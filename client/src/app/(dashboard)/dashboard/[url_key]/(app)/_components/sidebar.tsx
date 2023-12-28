import { Separator } from "@/components/ui/separator";

import WorkspaceNav from "@/components/workspace/workspace-navigation";

import { Nav } from "@/components/layouts/nav";
import { Database } from "@/types/supabase.types";

import { TooltipProvider } from "@/components/ui/tooltip";
import { appNavItems } from "@/config/dashboard.config";
import { Suspense } from "react";
import { TeamList } from "./team-list";
import UserAccountNav from "@/components/user-account-navigation";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  workspace: Database["public"]["Tables"]["workspace"]["Row"];
  teams: Database["public"]["Tables"]["team"]["Row"][] | null;
  user: Database["public"]["Tables"]["user"]["Row"];
}

export function Sidebar({
  className,
  isCollapsed,
  workspace,
  teams,
  user,
}: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center p-2">
          <div className="w-full">
            <WorkspaceNav isCollapsed={isCollapsed} />
          </div>
          {!isCollapsed && <UserAccountNav user={user} className="h-6 w-6" />}{" "}
        </div>
        <Separator />
        <Nav isCollapsed={isCollapsed} items={appNavItems.header} />
        <Separator />
        <Suspense fallback={<div>Loading...</div>}>
          <TeamList
            isCollapsed={isCollapsed}
            items={[
              {
                title: "Members",
                icon: "user",
                variant: "ghost",
                href: "/team/all",
              },
              {
                title: "Projects",
                icon: "lightning",
                variant: "ghost",
                href: "/team/all",
              },
              {
                title: "Repports",
                icon: "fileText",
                variant: "ghost",
                href: "/team/all",
              },
            ]}
            teams={teams}
            params={workspace}
          />
        </Suspense>
        <Separator />
        <Nav isCollapsed={isCollapsed} items={appNavItems.footer} />
      </div>
    </TooltipProvider>
  );
}
