"use client";
import { Separator } from "@/components/ui/separator";

import WorkspaceNav from "@/components/workspace/workspace-navigation";

import { Nav } from "@/components/layouts/side-navigation/nav";
import { Database } from "@/types/supabase.types";
import { useParams } from "next/navigation";

import { appNavItems } from "@/config/dashboard.config";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";
import { TeamList } from "@/components/team/team-list";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  teams: Database["public"]["Tables"]["team"]["Row"][] | null;
  children: React.ReactNode;
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

export function Sidebar({
  className,
  teams,
  children,
  defaultLayout = [20, 80],
  navCollapsedSize,
  defaultCollapsed = false,
}: SidebarProps) {
  const params = useParams();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handlePanelChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      collapsed,
    )};path=/`;
  };

  return (
    <>
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={13}
        maxSize={20}
        onCollapse={() => handlePanelChange(true)}
        onExpand={() => handlePanelChange(false)}
        className={cn(
          "flex min-w-[120px] flex-col justify-between",
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
        )}
        data-collapsed={isCollapsed}
      >
        <div>
          <div className={cn("flex items-center justify-start gap-1 p-2 ")}>
            <WorkspaceNav isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <Nav
            rootPath={`/${params.url_key}`}
            isCollapsed={isCollapsed}
            items={appNavItems.header}
          />
          <Separator />
          <Suspense fallback={<div>Loading...</div>}>
            <TeamList
              isCollapsed={isCollapsed}
              rootPath={`/${params.url_key}/team`}
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
            />
          </Suspense>
        </div>

        <div>
          <Separator />
          <Nav
            rootPath={`/${params.url_key}`}
            isCollapsed={isCollapsed}
            items={appNavItems.footer}
          />
          <Separator />
          {children}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
    </>
  );
}
