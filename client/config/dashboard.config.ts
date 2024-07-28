import { NavItem } from "@/types";

export interface TDashboardConfig {
  sidebarNav: {
    isCollapsed: boolean;
    header: NavItem[];
    main: NavItem[];
    footer: NavItem[];
  };
  settingsNav?: {
    isCollapsed: boolean;
    header: NavItem[];
    main: NavItem[];
    footer: NavItem[];
  };
}

export const appNavItems: {
  isCollapsed: boolean;
  header: NavItem[];
  main: NavItem[];
  footer: NavItem[];
  teamNav: NavItem[];
} = {
  isCollapsed: false,
  header: [
    {
      title: "Research",
      href: "/research",
      icon: "search",
      id: "research",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "gear",
      id: "settings",
    },
  ],
  main: [
    {
      title: "Customers",
      variant: "ghost",
      icon: "user",
      id: "customer",
      href: "/customers",
      items: [
        {
          title: "Companies",
          href: "/companies",
          icon: "building",
          variant: "ghost",
          id: "companies",
        },
        {
          title: "Locations",
          href: "/locations",
          icon: "SewingPin",
          variant: "ghost",
          id: "maps",
        },
        {
          title: "Assets",
          icon: "mix",
          variant: "ghost",
          href: "/assets",
          id: "assets",
        },
      ],
    },
    {
      title: "Work Plans",
      id: "work-plan-template",
      icon: "dashboard",
      variant: "ghost",
      href: "/work-plans/templates",
    },
  ],
  teamNav: [
    {
      title: "Work orders",
      icon: "checkCircled",
      variant: "ghost",
      href: "/work-orders",
      id: "work-orders",
      items: [
        {
          title: "Reports",
          href: "/reports",
          icon: "fileText",
          variant: "ghost",
          id: "reports",
        },
      ],
    },
    {
      title: "Service contracts",
      icon: "fileText",
      variant: "ghost",
      href: "/service-contracts",
      id: "service-contracts",
      disabled: true,
    },
  ],
  footer: [
    {
      title: "Notifications",
      href: "/",
      icon: "bell",
      id: "notifications",
    },
    {
      title: "Back to website",
      href: "/",
      icon: "externalLink",
      id: "back-to-website",
    },
  ],
};

export const settingsNavItems: {
  header: NavItem[];
  main: NavItem[];
  footer: NavItem[];
} = {
  header: [
    {
      title: "Settings",
      icon: "chevronLeft",
      href: "/",
      id: "settings",
    },
  ],
  main: [
    {
      title: "Account",
      icon: "user",
      href: "/account",
      id: "account",
      items: [
        {
          title: "Profile",
          href: "/profile",
          id: "profile",
        },
        {
          title: "Security",
          href: "/security",
          id: "security",
        },
        {
          title: "Preferences",
          href: "/preferences",
          id: "preferences",
        },
      ],
    },
    {
      title: "Your teams",
      href: "/team",
      id: "team",
      items: [
        {
          title: "Your teams",
          href: "/all",
          id: "all",
        },
        {
          title: "Create a team",
          icon: "plusCircled",
          href: "/create",
          id: "create",
        },
      ],
    },
    {
      title: "Workspace",
      href: "/workspace",
      id: "workspace",
      items: [
        {
          title: "General",
          href: "/general",
          id: "general",
        },
        {
          title: "Billing",
          href: "/billing",
          id: "billing",
        },
      ],
    },
  ],
  footer: [],
};
