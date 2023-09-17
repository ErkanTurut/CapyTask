import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Organisations",
      icon: "home",
      items: [
        {
          title: "ACME",
          href: "/dashboard/ACME",
          items: [],
        },
      ],
    },
    {
      title: "Projects",
      icon: "backpack",
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
      icon: "user",
      items: [
        {
          title: "Preferences",
          href: "/dashboard/account/preferences",
          items: [],
        },
        {
          title: "Settings",
          href: "/dashboard/account/settings",
          items: [],
        },
        {
          title: "Notifications",
          href: "/dashboard/account/notifications",
          items: [],
        },
      ],
    },
    {
      title: "Billing",
      icon: "banknote",
      disabled: true,
      items: [
        {
          title: "Invoices",
          href: "/dashboard/billing/invoices",
          items: [],
        },
        {
          title: "Payments",
          href: "/dashboard/billing/payments",
          items: [],
        },
      ],
    },
  ],
};
