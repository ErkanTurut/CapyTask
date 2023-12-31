import { Separator } from "@/components/ui/separator";

import { Nav } from "@/components/layouts/nav";

import { TooltipProvider } from "@/components/ui/tooltip";
import { settingsNavItems } from "@/config/dashboard.config";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  url_key: string;
}

export async function Sidebar({ url_key }: SidebarProps) {
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
