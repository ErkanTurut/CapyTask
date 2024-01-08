import { redirect } from "next/navigation";
import { getSession } from "@/lib/service/auth/fetch";
import { WorkspaceProvider, UserProvider, TeamProvider } from "@/lib/store";
import { getUser } from "@/lib/service/user/fetch";
import { getWorkspaces } from "@/lib/service/workspace/fetch";
import { getTeams } from "@/lib/service/team/fetch";

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

  if (!session?.user || error) {
    redirect("/login");
  }

  const { data: user } = await getUser(session.user.id);

  if (!user) {
    redirect("/login");
  }

  const { data: workspaces } = await getWorkspaces();

  if (!workspaces) {
    redirect("/create");
  }

  const workspace = workspaces.find((w) => w.url_key === params.url_key);

  if (!workspace) {
    redirect("/create");
  }

  const { data: teams } = await getTeams(workspace.id);

  return (
    <UserProvider user={user}>
      <WorkspaceProvider workspace={workspace} workspaceList={workspaces}>
        <TeamProvider teamList={teams}>{children}</TeamProvider>
      </WorkspaceProvider>
    </UserProvider>
  );
}
