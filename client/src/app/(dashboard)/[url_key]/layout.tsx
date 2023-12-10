import { SidebarNav } from "@/components/layouts/app-sidebar";
import { Shell } from "@/components/shells/shell";
import { getUser } from "@/lib/services/user";
import { getWorkspace, getWorkspaces } from "@/lib/services/workspace";
import { redirect } from "next/navigation";
import workosClient from "@/lib/workos/client";
import { getTeams } from "@/lib/services/team";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { data: user } = await getUser();
  if (!user) {
    redirect("/signin");
  }
  const { data: workspaces, error } = await getWorkspaces();
  const isInclude = workspaces?.some((workspace) => {
    return workspace.url_key === params.url_key;
  });

  if (!workspaces || error || !workspaces.length || !isInclude) {
    redirect("/create");
  }

  const { data: teams } = await getTeams();

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 gap-2 lg:gap-1">
        <SidebarNav props={{ workspaces: workspaces, teams: teams }} />
        <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
          <Shell
            variant="sidebar"
            className="relative flex-1 flex-col overflow-x-hidden  lg:ml-0 backdrop-blur-[1px]"
          >
            {children}
          </Shell>
        </main>
      </div>

      {/* <SiteFooter /> */}
    </div>
  );
}
