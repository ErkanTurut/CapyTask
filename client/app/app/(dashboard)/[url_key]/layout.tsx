import { redirect } from "next/navigation";
import { getSession } from "@/lib/service/auth/fetch";
import { WorkspaceProvider, UserProvider, TeamProvider } from "@/lib/store";
import { getUser } from "@/lib/service/user/fetch";
import { getWorkspaces } from "@/lib/service/workspace/fetch";
import { getTeams } from "@/lib/service/team/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { url_key: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
    error,
  } = await getSession(supabase);
  if (!session?.user || error) {
    redirect("/login");
  }
  const { data: user } = await getUser(session.user.id, supabase);
  if (!user) {
    redirect("/login");
  }
  const { data: workspaces } = await getWorkspaces(supabase);
  if (!workspaces) {
    redirect("/create");
  }
  const workspace = workspaces.find((w) => w.url_key === params.url_key);
  if (!workspace) {
    redirect("/create");
  }

  const { data: teams } = await getTeams(workspace.id, supabase);

  return (
    <UserProvider user={user}>
      <WorkspaceProvider workspace={workspace} workspaceList={workspaces}>
        <TeamProvider teamList={teams}>{children}</TeamProvider>
      </WorkspaceProvider>
    </UserProvider>
  );
}
