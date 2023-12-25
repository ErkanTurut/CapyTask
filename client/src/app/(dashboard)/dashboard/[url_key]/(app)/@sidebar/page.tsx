import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceNav from "@/components/workspace/workspace-navigation";

import { Database } from "@/types/supabase.types";
import { Nav } from "@/components/layouts/sidebar/nav";

import { appNavItems } from "@/config/dashboard.config";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TeamList } from "../_components/team-list";
import { getTeams } from "@/lib/services/team";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  workspace: Database["public"]["Tables"]["workspace"]["Row"];
}

export default async function Sidebar({
  className,
  isCollapsed,
  workspace,
}: SidebarProps) {
  return <p> hello</p>;
}
