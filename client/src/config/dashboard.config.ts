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
        create: "/teams/create",
        items: [],
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
