import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils";
import { MainSidebar } from "./sidebar/main-sidebar";
import { HeaderSidebar } from "./sidebar/header-sidebar";
import { FooterSidebar } from "./sidebar/footer-sidebar";
import { dashboardConfig } from "@/config/dashboard.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceNav from "@/components/workspace-navigation";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  props: {
    user_id: string;
    url_key: string;
  };
}

import { Suspense } from "react";
import ResizeZone from "./resize-zone";
import { getWorkspaces } from "@/lib/services/workspace";
import UserAccountNav from "../user-account-navigation";

export async function SidebarNav({ className, props }: SidebarNavProps) {
  const { data: workspaces } = await getWorkspaces();

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
            <WorkspaceNav url_key={props.url_key} workspaces={workspaces} />
          </Suspense>
          {/* <div className="flex items-center justify-between gap-1">
            <Suspense fallback="loading...">
              <WorkspaceNav workspaces={workspaces} />
            </Suspense>
            <Suspense fallback="loading...">
              <UserAccountNav className="h-7 w-7" user_id={props.user_id} />
            </Suspense>
          </div> */}

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
