import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils";
import { Icons } from "@/components/icons";
import { MainSidebar } from "./sidebar/main-sidebar";
import { HeaderSidebar } from "./sidebar/header-sidebar";
import { FooterSidebar } from "./sidebar/footer-sidebar";
import { dashboardConfig } from "@/config/dashboard.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAccountDashboard from "@/components/user-account-dashboard";
import ShimmerButton from "@/components/magicui/shimmer-button";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user_id: string;
}

import { getUser } from "@/lib/services/user";
import { Suspense } from "react";
import MinimizeButton from "../minimize-button";
import ThemeToggle from "../themeToggle";

export async function SidebarNav({
  user_id,
  className,
  ...props
}: SidebarNavProps) {
  const user = await getUser(user_id);
  if (!user) return null;

  return (
    <div
      className={cn("flex w-full h-full flex-grow overflow-hidden", className)}
      {...props}
    >
      <span className="flex flex-col w-full h-full gap-1">
        <Suspense fallback="loading...">
          <UserAccountDashboard user={user} />
        </Suspense>
        {/* <ThemeToggle toggle={true} /> */}

        <nav className="flex w-full flex-col gap-1 flex-grow overflow-hidden">
          <div className="flex w-full flex-col gap-1 overflow-hidden">
            <HeaderSidebar items={dashboardConfig.sidebarNav} />
            <Separator className="flex" />
            <div className="flex-grow overflow-y-auto">
              <ScrollArea>
                <MainSidebar items={dashboardConfig.sidebarNav} />
              </ScrollArea>
            </div>
          </div>
        </nav>

        <Separator className="flex" />
        <FooterSidebar items={dashboardConfig.sidebarNav} />
      </span>
    </div>
  );
}
