import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/service/auth/fetch";
import { WorkspaceProvider, UserProvider, TeamProvider } from "@/lib/store";
import { getUser } from "@/lib/service/user/fetch";
import { getWorkspaces } from "@/lib/service/workspace/fetch";

import { getTeams, getTeamsByUrlKey } from "@/lib/service/team/fetch";
interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { url_key: string };
}

export default async function AccountLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const {
    data: { session },
    error,
  } = await getSession();

  if (!session || !session.user || error) {
    redirect("/login");
  }

  const [userData, workspacesData] = await Promise.all([
    getUser(session.user.id),
    getWorkspaces(),
  ]);

  const { data: user } = userData;
  if (!user) {
    redirect("/login");
  }
  const { data: workspaces } = workspacesData;
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
  const { data: team } = await getTeams(workspace.id);

  return (
    <UserProvider user={user}>
      <WorkspaceProvider workspace={workspace} workspaceList={workspaces}>
        <TeamProvider team={null} teamList={team}>
          {children}
        </TeamProvider>
      </WorkspaceProvider>
    </UserProvider>
  );
}
