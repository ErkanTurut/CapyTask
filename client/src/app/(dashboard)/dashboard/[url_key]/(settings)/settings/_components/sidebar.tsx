import { Separator } from "@/components/ui/separator";

import { Nav } from "@/components/layouts/nav";

import { TooltipProvider } from "@/components/ui/tooltip";
import { settingsNavItems } from "@/config/dashboard.config";
import { TeamList } from "@/components/team/team-list";
import { getTeamsByUrlKey } from "@/lib/services/team";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  url_key: string;
}

export async function Sidebar({ url_key }: SidebarProps) {
  const { data: teams } = await getTeamsByUrlKey(url_key);

  return (
    <aside className="border-r hidden max-h-[100vh] overflow-y-hidden w-[230px]  shrink-0 lg:sticky lg:top-28 lg:block backdrop-blur-[1px] group/sidebar">
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col h-full w-full">
          <Nav
            rootPath={`/dashboard/${url_key}`}
            isCollapsed={false}
            items={settingsNavItems.header}
            size="lg"
          />
          <Separator />
          <Nav
            rootPath={`/dashboard/${url_key}/settings`}
            isCollapsed={false}
            items={settingsNavItems.main}
          />
          <Separator />
          <TeamList
            rootPath={`/dashboard/${url_key}/settings/team`}
            isCollapsed={false}
            items={[
              {
                title: "General",
                href: "/general",
              },
              {
                title: "Members",
                href: "/members",
              },
            ]}
            teams={teams ? teams.team : null}
          />
          <Separator />
          <Nav
            rootPath={`/dashboard/${url_key}/settings`}
            isCollapsed={false}
            items={settingsNavItems.footer}
          />
        </div>
      </TooltipProvider>
    </aside>
  );
}
