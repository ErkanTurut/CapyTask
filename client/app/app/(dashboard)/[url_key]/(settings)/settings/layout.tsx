import { Shell } from "@/components/shells";
import { Sidebar } from "./_components/sidebar";
import { getWorkspace } from "@/lib/service/workspace/fetch";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getTeams } from "@/lib/service/team/fetch";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: workspace } = await getWorkspace({
    url_key: params.url_key,
    supabase,
  });
  if (!workspace) {
    redirect("/create");
  }
  const { data: teams } = await getTeams({
    workspace_id: workspace.id,
    supabase,
  });

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 gap-2 lg:gap-1">
        <Sidebar url_key={params.url_key} workspace={workspace} teams={teams} />
        <main className="z-10 flex w-full flex-1 flex-col items-start">
          <Shell variant="markdown">{children}</Shell>
        </main>
      </div>
    </div>
  );
}
