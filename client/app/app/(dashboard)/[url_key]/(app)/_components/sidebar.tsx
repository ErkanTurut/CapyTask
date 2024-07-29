import { Nav } from "@/components/layouts/side-navigation/nav";
import { Separator } from "@/components/ui/separator";
import WorkspaceSkeleton from "@/components/workspace/workspace-skeleton";
import { appNavItems } from "@/config/dashboard.config";
import { cookies } from "next/headers";
import { Suspense } from "react";
import {
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLayout,
} from "./sidebar-layout";

import TeamListSkeleton from "@/components/team/team-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

import TeamNav from "./sidebar/team-nav";
import UserNav from "./sidebar/user-account-nav";
import WorkspaceSelector from "./sidebar/workspace-selector";
interface sidebarProps {
  params: {
    url_key: string;
  };
}

export default async function Sidebar({ params }: sidebarProps) {
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
    >
      <div>
        <SidebarHeader className="flex flex-col gap-2 pb-2">
          <Suspense fallback={<WorkspaceSkeleton />}>
            <WorkspaceSelector params={params} />
          </Suspense>
          <Nav rootPath={`/${params.url_key}`} items={appNavItems.header} />
          <Separator />
        </SidebarHeader>
        <SidebarBody className="flex flex-col gap-1 overflow-x-auto overflow-ellipsis whitespace-nowrap">
          <Nav
            level={1}
            rootPath={`/${params.url_key}`}
            items={appNavItems.main}
          />
          <Separator />
          <Suspense fallback={<TeamListSkeleton />}>
            <TeamNav params={params} />
          </Suspense>
        </SidebarBody>
      </div>
      <SidebarFooter className="flex flex-col gap-1">
        <Separator />
        <Nav rootPath={`/${params.url_key}`} items={appNavItems.footer} />
        <Separator />
        <Suspense fallback={<Skeleton className="h-9 w-full" />}>
          <UserNav />
        </Suspense>
      </SidebarFooter>
    </SidebarLayout>
  );
}
