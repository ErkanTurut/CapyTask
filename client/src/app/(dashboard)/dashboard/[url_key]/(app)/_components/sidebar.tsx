"use client";
import { Separator } from "@/components/ui/separator";

import WorkspaceNav from "@/components/workspace/workspace-navigation";

import { Nav } from "@/components/layouts/nav";
import { Database } from "@/types/supabase.types";
import { useParams } from "next/navigation";

import { TooltipProvider } from "@/components/ui/tooltip";
import { appNavItems } from "@/config/dashboard.config";
import { Suspense } from "react";
import { TeamList } from "./team-list";
import UserAccountNav from "@/components/user-account-navigation";
import { cn } from "@/lib/utils";

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
  const params = useParams();

  return (
    <div className="flex flex-col">
      <div
        className={cn("flex flex-shrink  items-center p-2 justify-start gap-1")}
      >
        <WorkspaceNav isCollapsed={isCollapsed} />
        {!isCollapsed && <UserAccountNav user={user} className="h-6 w-6 " />}
      </div>
      <Separator />
      <Nav
        rootPath={`/dashboard/${params.url_key}`}
        isCollapsed={isCollapsed}
        items={appNavItems.header}
      />
      <Separator />
      <Suspense fallback={<div>Loading...</div>}>
        <TeamList
          isCollapsed={isCollapsed}
          rootPath={`/dashboard/${params.url_key}/team`}
          items={[
            {
              title: "Members",
              icon: "user",
              variant: "ghost",
              href: "/members",
            },
            {
              title: "Projects",
              icon: "lightning",
              variant: "ghost",
              href: "/projects",
            },
            {
              title: "Repports",
              icon: "fileText",
              variant: "ghost",
              href: "/repports",
            },
          ]}
          teams={teams}
          params={workspace}
        />
      </Suspense>
      <Separator />
      <Nav
        rootPath={`/dashboard/${params.url_key}`}
        isCollapsed={isCollapsed}
        items={appNavItems.footer}
      />
    </div>
  );
}
