import { Separator } from "@gembuddy/ui/separator";
import { Skeleton } from "@gembuddy/ui/skeleton";
import WorkspaceSkeleton from "@/components/workspace/workspace-skeleton";
import { cn } from "@/lib/utils";
import { trpc } from "@gembuddy/trpc/server";
import { Suspense } from "react";
import UserNav from "./selector/user-account-nav";
import WorkspaceSelector from "./selector/workspace-selector";
import { NavItem, NavMenu } from "../navigation/side-nav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  params: {
    url_key: string;
  };
}

const mainNav: NavItem[] = [
  {
    label: "Customers",
    icon: "user",
    href: "/customers",
    subItems: [
      {
        label: "Companies",
        href: "/companies",
        icon: "building",
      },
      {
        label: "Locations",
        href: "/locations",
        icon: "SewingPin",
      },
      {
        label: "Assets",
        icon: "mix",
        href: "/assets",
      },
    ],
  },
  {
    label: "Work Plans",
    icon: "dashboard",
    href: "/work-plans/templates",
  },
];

const headerNav: NavItem[] = [
  {
    label: "Research",
    href: "/research",
    icon: "search",
    disabled: true,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "gear",
    disabled: true,
  },
];

const teamNav: NavItem[] = [
  {
    label: "Work orders",
    icon: "checkCircled",
    href: "/work-orders",
  },
  {
    label: "Service contracts",
    icon: "fileText",
    href: "/service-contracts",
    disabled: true,
  },
];

export async function Sidebar({ className, params }: SidebarProps) {
  const { data: teams } = await trpc.db.team.get.byUrlKey({
    url_key: params.url_key,
  });
  return (
    <aside
      className={cn(
        "z-50 hidden w-full overflow-hidden py-[1px] md:block",
        className
      )}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="w-full border-b p-2">
          <Suspense fallback={<WorkspaceSkeleton />}>
            <WorkspaceSelector params={params} />
          </Suspense>
        </div>

        <nav className="flex w-full flex-1 flex-col gap-2 pt-2">
          <Suspense fallback={<Skeleton className="h-7 w-full" />}>
            <NavMenu items={headerNav} params={params} className="px-2" />
          </Suspense>
          <Separator />
          <Suspense fallback={<Skeleton className="h-7 w-full" />}>
            <NavMenu items={mainNav} params={params} className="px-2" />
          </Suspense>
          <Separator />
          <Suspense fallback={<Skeleton className="h-7 w-full" />}>
            <NavMenu
              items={
                teams?.map((team) => ({
                  label: team.name,
                  href: `/team/${team.identity}`,
                  subItems: teamNav,
                })) || []
              }
              params={params}
              className="px-2"
            />
          </Suspense>
        </nav>
        <Separator />
        <div className="p-2">
          <Suspense fallback={<Skeleton className="h-9 w-full" />}>
            <UserNav />
          </Suspense>
        </div>
      </div>
    </aside>
  );
}
