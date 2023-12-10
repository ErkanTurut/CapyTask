import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem;
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: {
    header: [
      {
        items: [
          {
            title: "Research",
            href: "/research",
            icon: "search",
            items: [],
          },
          {
            title: "Account",
            href: "/account/settings",
            icon: "user",
            items: [],
          },
        ],
      },
    ],
    main: [
      {
        label: "Your teams",
        items: [
          {
            title: "All Teams",
            href: "/teams",
            items: [],
          },
          {
            title: "New Team",
            href: "/teams/new",
            icon: "plus",
            items: [],
          },
        ],
      },
    ],
    footer: [
      {
        items: [
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
