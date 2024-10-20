import { trpc } from "@gembuddy/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "@gembuddy/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gembuddy/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gembuddy/ui/dropdown-menu";
import { Icons, IconType } from "@gembuddy/ui/icons";
import { Separator } from "@gembuddy/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarRail,
} from "@gembuddy/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

// Components
const NavMenuItem: React.FC<NavItem> = ({
  title,
  url,
  icon,
  isActive,
  items,
  disabled,
  image_url,
}) => {
  const Icon = icon ? Icons[icon] : null;
  return (
    <Collapsible key={title} asChild defaultOpen={isActive}>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="sm"
          asChild
          tooltip={title}
          disabled={disabled}
        >
          <Link href={url}>
            {image_url ? (
              <Avatar className="h-4 w-4 rounded-md">
                <AvatarImage src={image_url} alt={title} />
                <AvatarFallback className="rounded-lg">
                  {title.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : icon && Icon ? (
              <Icon />
            ) : null}

            <span>{title}</span>
          </Link>
        </SidebarMenuButton>
        {items?.length ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle {title} submenu</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {items.map((subItem) => (
                  <NavMenuItem key={subItem.title} {...subItem} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
};

// Types
type NavItem = {
  title: string;
  url: string;
  icon?: IconType;
  isActive?: boolean;
  items?: NavItem[];
  image_url?: string;
  disabled?: boolean;
};

type AppSidebarProps = {
  params: {
    url_key: string;
  };
};

const mainNav: NavItem[] = [
  {
    title: "Customers",
    icon: "user",
    url: "/customers",
    items: [
      {
        title: "Companies",
        url: "/companies",
        icon: "building",
      },
      {
        title: "Locations",
        url: "/locations",
        icon: "SewingPin",
      },
      {
        title: "Assets",
        icon: "mix",
        url: "/assets",
      },
    ],
  },
  {
    title: "Work Plans",
    icon: "dashboard",
    url: "/work-plans/templates",
  },
];

const headerNav: NavItem[] = [
  {
    title: "Research",
    url: "/research",
    icon: "search",
    disabled: true,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: "gear",
    disabled: true,
  },
];

const teamNav: NavItem[] = [
  {
    title: "Work orders",
    icon: "checkCircled",
    url: "/work-orders",
  },
  {
    title: "Service contracts",
    icon: "fileText",
    url: "/service-contracts",
    disabled: true,
  },
];

export async function AppSidebar({ params }: AppSidebarProps) {
  // const { data: teams } = await trpc.db.team.get.byUrlKey({
  //   url_key: params.url_key,
  // })

  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Suspense fallback={<SidebarMenuSkeleton />}>
              <WorkspaceSelector params={params} />
            </Suspense>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Suspense fallback={<SidebarMenuSkeleton />}>
              <NavMenu items={headerNav} params={params} />
            </Suspense>
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <Suspense fallback={<SidebarMenuSkeleton />}>
              <NavMenu items={mainNav} params={params} />
            </Suspense>
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Teams</SidebarGroupLabel>
          <SidebarMenu>
            <Suspense fallback={<SidebarMenuSkeleton />}>
              <TeamNav items={teamNav} params={params} />
            </Suspense>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Suspense fallback={<SidebarMenuSkeleton />}>
              <UserDropdown />
            </Suspense>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// New components to handle the navigation menu
function NavMenu({
  items,
  params,
}: { items: NavItem[]; params: { url_key: string } }) {
  return (
    <>
      {items.map((item) => (
        <NavMenuItem
          key={item.title}
          {...item}
          url={`/${params.url_key}${item.url}`}
          items={item.items?.map((subItem) => ({
            ...subItem,
            url: `/${params.url_key}${item.url}${subItem.url}`,
          }))}
        />
      ))}
    </>
  );
}

async function TeamNav({
  items,
  params,
}: { items: NavItem[]; params: { url_key: string } }) {
  const { data: teams } = await trpc.db.team.get.byUrlKey({
    url_key: params.url_key,
  });

  return (
    <NavMenu
      items={
        teams?.map((team) => ({
          title: team.name,
          url: `/team/${team.identity}`,
          icon: "user",
          image_url:
            team.image_uri ?? `https://avatar.vercel.sh/${team.name}.svg`,
          items: teamNav,
        })) || []
      }
      params={params}
    />
  );
}

async function UserDropdown() {
  const { data: user } = await trpc.db.user.get.currentUser();

  if (!user) {
    return null;
  }

  const avatar_url =
    user.image_uri ??
    `https://avatar.vercel.sh/${user.first_name || user.last_name || user.email}.svg`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          variant="outline"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-md"
        >
          <Avatar className="h-6 w-6 rounded-full">
            <AvatarImage src={avatar_url} alt={user.email} />
            <AvatarFallback className="rounded-lg">
              {user.first_name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-xs leading-tight">
            <span className="truncate font-semibold">
              {user.first_name} {user.last_name}
            </span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
        side="top"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={avatar_url} alt={user.email} />
              <AvatarFallback className="rounded-lg">
                {user.first_name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user.first_name} {user.last_name}
              </span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// You'll need to implement this component
function WorkspaceSelector({ params }: { params: { url_key: string } }) {
  // Implement the workspace selector here
  return (
    <SidebarMenuButton asChild>
      <a href="#">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Command className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Workspace</span>
          <span className="truncate text-xs">{params.url_key}</span>
        </div>
      </a>
    </SidebarMenuButton>
  );
}
