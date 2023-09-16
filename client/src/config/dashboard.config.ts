import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user",
      items: [],
    },
    {
      title: "Stores",
      items: [],
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      disabled: true,
      items: [],
    },
    {
      title: "Purchases",
      href: "/dashboard/purchases",

      items: [],
    },
  ],
};
