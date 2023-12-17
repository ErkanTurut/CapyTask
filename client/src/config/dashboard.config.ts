import { type SidebarNavItem } from "@/types";
import { Database } from "@/types/supabase.types";

export interface TDashboardConfig {
  sidebarNav: SidebarNavItem;
  settingsNav: SidebarNavItem;
}

export const dashboardConfig: TDashboardConfig = {
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
  settingsNav: {
    header: [
      {
        label: "Settings",
        icon: "chevronLeft",
        href: "/",
        items: [],
      },
    ],
    main: [
      {
        label: "Account",
        items: [
          {
            title: "Profile",
            href: "/settings/account/profile",
            items: [],
          },
          {
            title: "Security",
            href: "/settings/account/security",
            items: [],
          },
          {
            title: "Preferences",
            href: "/settings/account/preferences",
            items: [],
          },
        ],
      },
      {
        label: "Teams",
        items: [
          {
            title: "Your teams",
            href: "/settings/teams",
            items: [],
          },
          {
            title: "Create a team",
            icon: "plusCircled",
            href: "settings/teams/create",
            items: [],
          },
        ],
      },
      {
        label: "Workspace",
        items: [
          {
            title: "General",
            href: "/settings/workspace/general",
            items: [],
          },
          {
            title: "Billing",
            href: "/settings/workspace/billing",
            items: [],
          },
        ],
      },
    ],
  },
};
