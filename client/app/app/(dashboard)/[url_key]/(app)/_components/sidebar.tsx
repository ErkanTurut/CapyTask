import { Nav } from "@/components/layouts/side-navigation/nav";
import { Separator } from "@/components/ui/separator";
import UserAccountNav from "@/components/user/user-account-nav";
import WorkspaceNav from "@/components/workspace/workspace-navigation";
import WorkspaceSkeleton from "@/components/workspace/workspace-skeleton";
import { appNavItems } from "@/config/dashboard.config";
import { cookies } from "next/headers";
import { FC, Suspense } from "react";
import {
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLayout,
} from "./sidebar-layout";

import TeamListSkeleton from "@/components/team/team-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { generateAvatar } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";
import { SheetSide } from "./sheet";

interface sidebarProps {
  params: {
    url_key: string;
  };
}

const Sidebar: FC<sidebarProps> = async ({ params }) => {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;

  return (
    <SidebarLayout
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      className=" hidden h-screen bg-muted/50 backdrop-blur-[2px] lg:flex"
    >
      <div>
        <SidebarHeader className="flex flex-col gap-2 p-2">
          <Suspense fallback={<WorkspaceSkeleton />}>
            {(async () => {
              const { data: workspaces } =
                await trpc.db.workspace.getByCurrentUser.query();
              if (!workspaces) {
                redirect("/create");
              }
              const workspace = workspaces.find(
                (workspace) => workspace.url_key === params.url_key,
              );

              if (!workspace) {
                redirect("/create");
              }
              return (
                <WorkspaceNav workspaces={workspaces} workspace={workspace} />
              );
            })()}
          </Suspense>
          <Nav rootPath={`/${params.url_key}`} items={appNavItems.header} />
          <Separator />
        </SidebarHeader>
        <SidebarBody className="flex flex-col gap-2 overflow-x-auto overflow-ellipsis whitespace-nowrap	 p-2	">
          <Suspense fallback={<TeamListSkeleton />}>
            {(async () => {
              const { data: teams } =
                await trpc.db.team.getByWorkspaceUrlKey.query({
                  url_key: params.url_key,
                });
              return (
                <Nav
                  size={"sm"}
                  items={[
                    {
                      title: "Teams",
                      icon: "plusCircled",
                      id: "all",
                      variant: "default",
                      items: teams?.map((team) => ({
                        image_url: generateAvatar({
                          name: team.name,
                        }).image_url,
                        title: team.name,
                        href: `/${team.identity}`,
                        items: appNavItems.teamNav,
                        id: team.identity,
                      })),
                    },
                  ]}
                  rootPath={`/${params.url_key}/team`}
                />
              );
            })()}
          </Suspense>
        </SidebarBody>
      </div>
      <SidebarFooter className="flex flex-col gap-1 p-2">
        <Separator />
        <Nav rootPath={`/${params.url_key}`} items={appNavItems.footer} />
        <Separator />
        <Suspense fallback={<Skeleton className="h-9 w-full" />}>
          {(async () => {
            const { data: user } = await trpc.db.user.getCurrentUser.query();
            if (!user) {
              redirect("/login");
            }
            return <UserAccountNav className="w-full" user={user} />;
          })()}
        </Suspense>
      </SidebarFooter>
    </SidebarLayout>
  );
};

export default Sidebar;
