import { type SidebarNavItem, type SettingsNavItem } from "@/types";
import { Database } from "@/types/supabase.types";
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
} = {
  isCollapsed: false,
  header: [
    {
      title: "Research",
      href: "/research",
      icon: "search",
    },
    {
      title: "Account",
      href: "/account",
      icon: "user",
    },
  ],
  main: [],
  footer: [
    {
      title: "Notifications",
      href: "/",
      icon: "bell",
    },
    {
      title: "Back to website",
      href: "/",
      icon: "externalLink",
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
    },
  ],
  main: [
    {
      title: "Account",
      icon: "user",
      href: "/account",
      items: [
        {
          title: "Profile",
          href: "/profile",
        },
        {
          title: "Security",
          href: "/security",
        },
        {
          title: "Preferences",
          href: "/preferences",
        },
      ],
    },
    {
      title: "Your teams",
      href: "/team",
      items: [
        {
          title: "Your teams",
          href: "/all",
        },
        {
          title: "Create a team",
          icon: "plusCircled",
          href: "/create",
        },
      ],
    },
    {
      title: "Workspace",
      href: "/workspace",
      items: [
        {
          title: "General",
          href: "/general",
        },
        {
          title: "Billing",
          href: "/billing",
        },
      ],
    },
  ],
  footer: [],
};

export const dashboardConfig: TDashboardConfig = {
  sidebarNav: {
    isCollapsed: false,
    header: [
      {
        title: "Research",
        href: "/research",
        icon: "search",
        items: [],
        variant: "ghost",
      },
      {
        title: "Account",
        href: "/account/settings",
        icon: "user",
        items: [],
        variant: "ghost",
      },
    ],
    main: [
      {
        label: "Teams",
        title: "Your teams",
        icon: "moon",
        items: [],
        variant: "ghost",
      },
    ],
    footer: [
      {
        title: "Notifications",
        href: "/",
        icon: "bell",
        items: [],
        variant: "ghost",
      },
      {
        title: "Back to website",
        href: "/",
        icon: "externalLink",
        items: [],
        variant: "ghost",
      },
    ],
  },

  // settingsNav: {
  //   isCollapsed: false,
  //   items: [
  //     {
  //       title: "Account",
  //       href: "/account/settings",
  //       items: [],
  //       variant: "ghost",
  //     },
  //   ],
  // },
};

// sidebarNav: {
//   header: [
//     {
//       items: [
//         {
//           title: "Research",
//           href: "/research",
//           icon: "search",
//           items: [],
//         },
//         {
//           title: "Account",
//           href: "/account/settings",
//           icon: "user",
//           items: [],
//         },
//       ],
//     },
//   ],
//   main: [
//     {
//       label: "Your teams",
//       items: [],
//     },
//   ],
//   footer: [
//     {
//       items: [
//         {
//           title: "Notifications",
//           href: "/",
//           icon: "bell",
//           items: [],
//         },
//         {
//           title: "Back to website",
//           href: "/",
//           icon: "externalLink",
//           items: [],
//         },
//       ],
//     },
//   ],
// },
// settingsNav: {
//   header: [
//     {
//       label: "Settings",
//       icon: "chevronLeft",
//       href: "/",
//       items: [],
//     },
//   ],
//   main: [
//     {
//       label: "Account",
//       href: "/settings/account",
//       items: [
//         {
//           title: "Profile",
//           href: "/settings/account/profile",
//           items: [],
//         },
//         {
//           title: "Security",
//           href: "/settings/account/security",
//           items: [],
//         },
//         {
//           title: "Preferences",
//           href: "/settings/account/preferences",
//           items: [],
//         },
//       ],
//     },
//     {
//       label: "Teams",
//       items: [
//         {
//           title: "Your teams",
//           href: "/settings/teams",
//           items: [],
//         },
//         {
//           title: "Create a team",
//           icon: "plusCircled",
//           href: "/settings/teams/create",
//           items: [],
//         },
//       ],
//     },
//     {
//       label: "Workspace",
//       items: [
//         {
//           title: "General",
//           href: "/settings/workspace/general",
//           items: [],
//         },
//         {
//           title: "Billing",
//           href: "/settings/workspace/billing",
//           items: [],
//         },
//       ],
//     },
//   ],
// },
