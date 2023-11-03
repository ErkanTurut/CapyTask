import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils";
import { Icons } from "@/components/icons";
import { MainSideNav } from "./sidebar/mainSideNav";
import { dashboardConfig } from "@/config/dashboard.config";
import { siteConfig } from "@/config/site.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAccountDashboard from "@/components/user-account-dashboard";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user_id: string;
}

import { getUser } from "@/lib/api/users";
import { Suspense } from "react";

export async function SidebarNav({
  user_id,
  className,
  ...props
}: SidebarNavProps) {
  const user = await getUser(user_id);

  return (
    <div className={cn("flex h-full flex-col gap-2 ", className)} {...props}>
      <Suspense fallback="loading...">
        <UserAccountDashboard user={user} />
      </Suspense>
      <div className=" h-[calc(100vh-8rem)] overflow-y-auto ">
        <ScrollArea>
          <MainSideNav items={dashboardConfig.sidebarNav} />
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-2">
        <Separator className="flex" />
        <Link
          aria-label="Dashboard"
          href="/dashboard"
          className="items-center space-x-2 flex"
        >
          <Icons.logo size="m" aria-hidden="true" />
          <span className="font-bold inline-block">{siteConfig.name}</span>
        </Link>
      </div>
    </div>
  );
}
