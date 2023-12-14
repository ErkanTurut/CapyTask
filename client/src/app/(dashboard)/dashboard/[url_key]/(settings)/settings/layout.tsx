import { Sidebar } from "@/components/layouts/app-sidebar";
import { Shell } from "@/components/shells/shell";
import { getUser } from "@/lib/services/user";
import { getWorkspaces } from "@/lib/services/workspace";
import { redirect } from "next/navigation";
import { getTeams } from "@/lib/services/team";
import { dashboardConfig } from "@/config/dashboard.config";

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
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 gap-2 lg:gap-1">
        <Sidebar
          props={{
            sidebarnav: dashboardConfig.settingsNav,
          }}
        />
        <main className="z-10 flex w-full flex-1 flex-col items-start">
          <Shell variant="markdown">{children}</Shell>
        </main>
      </div>

      {/* <SiteFooter /> */}
    </div>
  );
}
