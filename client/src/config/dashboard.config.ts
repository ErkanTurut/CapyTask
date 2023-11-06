import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      main: [
        {
          title: "Research",
          href: "/dashboard/research",
          icon: "search",
          items: [],
        },
        {
          title: "Settings",
          href: "/dashboard/account/settings",
          icon: "gear",
          items: [],
        },
        {
          title: "Back to website",
          href: "/",
          icon: "externalLink",
          items: [],
        },
      ],
      sidebar: [
        {
          title: "Projects",
          items: [
            {
              title: "All Projects",
              href: "/dashboard/projects",
              icon: "chevronRight",
              items: [],
            },
          ],
        },
      ],
    },
  ],
};

/*
    {
      title: "Organisations",
      icon: "backpack",
      href: "/dashboard/organisations",
      items: [],
    },
    {
      title: "Profile",
      icon: "user",
      href: "/dashboard/account/preferences",
      items: [],
    },
    {
      title: "Settings",
      icon: "gear",
      href: "/dashboard/account/settings",
      items: [],
    },
    {
      title: "Projects",
      items: [
        {
          title: "All Projects",
          href: "/dashboard/projects",
          items: [],
        },
      ],
    },
    {
      title: "Account",
      href: "/dashboard/account",
      items: [
        {
          title: "My Profile",
          icon: "user",
          href: "/dashboard/account/preferences",
          items: [],
        },
        {
          title: "Settings",
          icon: "gear",
          href: "/dashboard/account/settings",
          items: [],
        },
      ],
    },
    */
