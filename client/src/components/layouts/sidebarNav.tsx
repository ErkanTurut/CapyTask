import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MainSideNav } from "./sidebar/mainSideNav";
import type { User } from "@supabase/supabase-js";
import { dashboardConfig } from "@/config/dashboard.config";
import { siteConfig } from "@/config/site.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAccountSideNav from "@/components/userAccountSideNav";
import { prefetchUser } from "@/hooks/useUser";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | null;
}

const dehydratedState = async (user_id: string) => {
  return await prefetchUser(user_id);
};

export function SidebarNav({ user, className, ...props }: SidebarNavProps) {
  if (!user) return null;
  return (
    <div className={cn("flex h-full flex-col gap-2 ", className)} {...props}>
      <UserAccountSideNav user_id={user?.id} />
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
