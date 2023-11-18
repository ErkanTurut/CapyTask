import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem;
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: {
    header: [
      {
        label: "Dashboard",
        items: [
          {
            title: "Research",
            href: "/dashboard/research",
            icon: "search",
            items: [],
          },
          {
            title: "Account",
            href: "/dashboard/account/settings",
            icon: "user",
            items: [],
          },
        ],
      },
    ],
    main: [
      {
        title: "Projects",
        items: [
          {
            title: "All Projects",
            href: "/dashboard/projects",
            items: [],
          },
          {
            title: "New Project",
            href: "/dashboard/projects/new",
            icon: "plus",
            items: [],
          },
        ],
      },
      {
        title: "Teams",
        items: [
          {
            title: "All Teams",
            href: "/dashboard/teams",
            items: [],
          },
          {
            title: "New Team",
            href: "/dashboard/teams/new",
            icon: "plus",
            items: [],
          },
        ],
      },
    ],
    footer: [
      {
        title: "Notifications",
        href: "/",
        icon: "bell",
        items: [],
      },
      {
        title: "Back to website",
        href: "/",
        icon: "externalLink",
        items: [],
      },
    ],
  },
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
