import { Separator } from "@/components/ui/separator";

import { Nav } from "./nav";

import { TooltipProvider } from "@/components/ui/tooltip";
import { settingsNavItems } from "@/config/dashboard.config";
import { TeamList } from "./team-list";
import { getTeamsByUrlKey } from "@/lib/service/team/fetch";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  url_key: string;
}

export async function Sidebar({ url_key }: SidebarProps) {
  const { data: teams } = await getTeamsByUrlKey(url_key);

  return (
    <aside className="group/sidebar hidden max-h-[100vh] w-[230px] shrink-0  overflow-y-hidden border-r p-2 backdrop-blur-[1px] lg:sticky lg:top-28 lg:block">
      <TooltipProvider delayDuration={0}>
        <div className="flex h-full w-full flex-col gap-1">
          <Nav
            rootPath={`/${url_key}`}
            isCollapsed={false}
            items={settingsNavItems.header}
            size="lg"
          />
          <Separator />
          <Nav
            rootPath={`/${url_key}/settings`}
            isCollapsed={false}
            items={settingsNavItems.main}
          />
          <Separator />
          <TeamList
            rootPath={`/${url_key}/settings/team`}
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
            rootPath={`/${url_key}/settings`}
            isCollapsed={false}
            items={settingsNavItems.footer}
          />
        </div>
      </TooltipProvider>
    </aside>
  );
}
