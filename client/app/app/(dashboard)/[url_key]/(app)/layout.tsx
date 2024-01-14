import { cookies } from "next/headers";

import { getTeams, getTeamsByUrlKey } from "@/lib/service/team/fetch";
import { TooltipProvider } from "@/components/ui/tooltip";

import Resizable from "./_components/rezisable";
import ResizableGroup from "./_components/resizableGroup";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
} from "./_components/sidebar";
import UserAccountNav from "@/components/user/user-account-nav";
import { getSession } from "@/lib/service/auth/fetch";
import { getUser } from "@/lib/service/user/fetch";
import { Suspense } from "react";
import { SidebarProvider, useTeam } from "@/lib/store";
import WorkspaceNav from "@/components/workspace/workspace-navigation";
import { TeamList } from "@/components/team/team-list";
import { Nav } from "@/components/layouts/side-navigation/nav";
import { appNavItems } from "@/config/dashboard.config";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { getWorkspaces } from "@/lib/service/workspace/fetch";
import { Shell } from "@/components/shells";

interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
  modal,
}: DashboardLayoutProps) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;

  const { data: workspaces } = await getWorkspaces();
  if (!workspaces) {
    redirect("/create");
  }
  const workspace = workspaces.find(
    (workspace) => workspace.url_key === params.url_key,
  );

  if (!workspace) {
    redirect("/create");
  }
  // const { data: teams } = await getTeamsByUrlKey(params.url_key);
  const { data: teams } = await getTeams(workspace.id);

  const {
    data: { session },
    error,
  } = await getSession();
  if (!session || error) {
    redirect("/login");
  }
  const { data: user } = await getUser(session.user.id);
  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider isCollapsed={defaultCollapsed || false}>
      <div className="min-h-screen">
        {modal}
        <TooltipProvider delayDuration={0}>
          <ResizableGroup>
            <Sidebar
              defaultLayout={defaultLayout}
              defaultCollapsed={defaultCollapsed}
            >
              <div>
                <SidebarHeader className="grid gap-1 p-2">
                  <Suspense fallback={<div>Loading...</div>}>
                    <WorkspaceNav />
                  </Suspense>
                  <Nav
                    rootPath={`/${params.url_key}`}
                    items={appNavItems.header}
                  />
                  <Separator />
                </SidebarHeader>
                <SidebarBody className="px-2">
                  <Suspense fallback={<div>Loading...</div>}>
                    <TeamList
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
                </SidebarBody>
              </div>
              <SidebarFooter className="flex flex-col gap-1 p-2">
                <Separator />
                <Nav
                  rootPath={`/${params.url_key}`}
                  items={appNavItems.footer}
                />
                <Separator />
                <Suspense fallback={<div>Loading...</div>}>
                  <UserAccountNav className="w-full" user={user} />
                </Suspense>
              </SidebarFooter>
            </Sidebar>
            <Resizable defaultLayout={defaultLayout}>
              <Shell>{children}</Shell>
            </Resizable>
          </ResizableGroup>
        </TooltipProvider>
      </div>
    </SidebarProvider>
  );
}
