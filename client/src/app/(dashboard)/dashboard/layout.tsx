import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/auth";
import { WorkspaceProvider, UserProvider } from "@/lib/store";
import { getUser } from "@/lib/services/user";
import { getWorkspaces } from "@/lib/services/workspace";

import { getTeams } from "@/lib/services/team";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({
  children,
}: DashboardLayoutProps) {
  const {
    data: { session },
    error,
  } = await getSession();
  const [userData, workspacesData, teamsData] = await Promise.all([
    getUser(),
    getWorkspaces(),
    getTeams(),
  ]);
  const { data: user } = userData;
  const { data: workspaces } = workspacesData;

  if (!user || !session?.user || error) {
    redirect("/signin");
  }
  if (!workspaces) {
    redirect("/dashboard/create");
  }

  return (
    <UserProvider user={user}>
      <WorkspaceProvider workspace={workspaces[0]} workspaceList={workspaces}>
        {children};
      </WorkspaceProvider>
    </UserProvider>
  );
}
