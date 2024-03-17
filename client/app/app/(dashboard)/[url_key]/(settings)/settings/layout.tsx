import { Shell } from "@/components/shells";
import { trpc } from "@/trpc/server";
import { Sidebar } from "./_components/sidebar";

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
  const { data: teams } = await trpc.db.team.getByWorkspaceUrlKey.query({
    url_key: params.url_key,
  });

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 gap-2 lg:gap-1">
        <Sidebar url_key={params.url_key} teams={teams} />
        <main className="z-10 flex w-full flex-1 flex-col items-start">
          <Shell variant="markdown">{children}</Shell>
        </main>
      </div>
    </div>
  );
}
