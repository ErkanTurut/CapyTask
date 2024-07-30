import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NavItem, navItemVariants, NavLink, NavMenu } from "./nav-link";
import { trpc } from "@/trpc/server";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  params: {
    url_key: string;
  };
}

const items: NavItem[] = [
  {
    href: "#",
    label: "Dashboard",
    icon: "PaperPlane",
  },
  {
    href: "#",
    label: "Dashboard",
    icon: "PaperPlane",
    subItems: [
      {
        href: "#",
        label: "Dashboard",
        icon: "PaperPlane",
      },
    ],
  },
];

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

export default async function Sidebar({ className, params }: SidebarProps) {
  const { data: teams } = await trpc.db.team.getByWorkspaceUrlKey({
    url_key: params.url_key,
  });
  return (
    <aside className={cn("hidden w-[240px] rounded-md md:block", className)}>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="w-full p-2">
          <Button variant={"outline"} className="w-full shadow-none">
            dd
          </Button>
        </div>
        <nav className="flex w-full flex-1 flex-col gap-1 p-2">
          <NavMenu items={headerNav} params={params} />
          <Separator />
          <NavMenu items={mainNav} params={params} />
          <Separator />
          <NavMenu
            items={[
              {
                label: "team",
                href: `/team`,
                subItems: teams?.map((team) => ({
                  label: team.name,
                  href: `/${team.identity}`,
                  subItems: teamNav,
                })),
              },
            ]}
            params={params}
          />
        </nav>
        <Separator />
        <Separator />
        <div className="p-2">
          <Button variant={"outline"} className="w-full shadow-none">
            dd
          </Button>
        </div>
      </div>
    </aside>
  );
}
