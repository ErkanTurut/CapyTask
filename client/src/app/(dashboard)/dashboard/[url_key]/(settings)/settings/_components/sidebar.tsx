import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceNav from "@/components/workspace/workspace-navigation";

import { Database } from "@/types/supabase.types";
import { Nav } from "@/components/layouts/sidebar/nav";

import { appNavItems } from "@/config/dashboard.config";
import { TooltipProvider } from "@/components/ui/tooltip";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({}: SidebarProps) {
  return (
    <aside className="border-r hidden max-h-[100vh] overflow-y-hidden w-[230px]  shrink-0 lg:sticky lg:top-28 lg:block backdrop-blur-[1px] group/sidebar">
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col h-full w-full">
          <Nav isCollapsed={false} items={appNavItems.header} />
          <Separator />
          <Nav isCollapsed={false} items={appNavItems.footer} />
        </div>
      </TooltipProvider>
    </aside>
  );
}
