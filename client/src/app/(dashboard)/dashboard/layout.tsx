import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/auth";
import { WorkspaceProvider, UserProvider, TeamProvider } from "@/lib/store";
import { getUser } from "@/lib/services/user";
import { getWorkspaces } from "@/lib/services/workspace";

import { cookies } from "next/headers";
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

  if (!session || !session.user || error) {
    redirect("/signin");
  }

  const [userData, workspacesData] = await Promise.all([
    getUser(session.user.id),
    getWorkspaces(),
  ]);

  const { data: user } = userData;
  if (!user) {
    redirect("/signin");
  }
  const { data: workspaces } = workspacesData;
  if (!workspaces) {
    redirect("/dashboard/create");
  }

  const workspaceCookie = cookies().get("gembuddy:workspace_url_key");

  const latestWorkspaceUrlKey: string | undefined = workspaceCookie
    ? JSON.parse(workspaceCookie.value)
    : undefined;

  const latestWorkspace =
    workspaces?.find(
      (workspace) => workspace?.url_key === latestWorkspaceUrlKey
    ) ?? workspaces?.[0];

  return (
    <UserProvider user={user}>
      <WorkspaceProvider workspace={latestWorkspace} workspaceList={workspaces}>
        <TeamProvider team={null} teamList={null}>
          {children}
        </TeamProvider>
      </WorkspaceProvider>
    </UserProvider>
  );
}
