import { ButtonProps } from "@gembuddy/ui/button";
import { IconType } from "@gembuddy/ui/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: IconType;
  image_url?: string;
  label?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  variant?: ButtonProps["variant"];
  items?: NavItem[];
  id: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface SideNavItem {
  isCollapsed: boolean;
  items: NavItemWithOptionalChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

// import { productCategories } from "@/config/products"
// import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: "https://twitter.com/simplyerkan",
  githubAccount: "https://github.com/ErkanTurut",
};

export const siteConfig = {
  name: "Gembuddy",
  description:
    "An open source e-commerce skateshop build with everything new in Next.js 13.",
  url: "https://skateshop.sadmn.com",
  ogImage: "https://skateshop.sadmn.com/opengraph-image.png",
  mainNav: [
    {
      id: "home",
      title: "Home",
      variant: "default",
      items: [
        {
          id: "products",
          title: "Products",
          href: "/products",
          description: "All the products we have to offer.",
          items: [],
          variant: "ghost",
        },
        {
          id: "build-a-board",
          title: "Build a Board",
          href: "/build-a-board",
          description: "Build your own custom skateboard.",
          items: [],
          variant: "ghost",
        },
        {
          id: "blog",
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: [],
          variant: "ghost",
        },
      ],
    },
    {
      id: "about",
      title: "About",
      variant: "ghost",
      items: [
        {
          id: "about-us",
          title: "About Us",
          href: "/about",
          description: "Learn more about us.",
          items: [],
          variant: "ghost",
        },
        {
          id: "contact",
          title: "Contact",
          href: "/contact",
          description: "Get in touch with us.",
          items: [],
          variant: "ghost",
        },
      ],
    },
    {
      id: "blog",
      title: "Blog",
      variant: "ghost",
      items: [
        {
          id: "blog",
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: [],
          variant: "ghost",
        },
      ],
    },
  ] satisfies MainNavItem[],
  //   links,
  //   footerNav: [
  //     {
  //       title: "Credits",
  //       items: [
  //         {
  //           title: "OneStopShop",
  //           href: "https://onestopshop.jackblatch.com",
  //           external: true,
  //         },
  //         {
  //           title: "Acme Corp",
  //           href: "https://acme-corp.jumr.dev",
  //           external: true,
  //         },
  //         {
  //           title: "craft.mxkaske.dev",
  //           href: "https://craft.mxkaske.dev",
  //           external: true,
  //         },
  //         {
  //           title: "Taxonomy",
  //           href: "https://tx.shadcn.com/",
  //           external: true,
  //         },
  //         {
  //           title: "shadcn/ui",
  //           href: "https://ui.shadcn.com",
  //           external: true,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Help",
  //       items: [
  //         {
  //           title: "About",
  //           href: "/about",
  //           external: false,
  //         },
  //         {
  //           title: "Contact",
  //           href: "/contact",
  //           external: false,
  //         },
  //         {
  //           title: "Terms",
  //           href: "/terms",
  //           external: false,
  //         },
  //         {
  //           title: "Privacy",
  //           href: "/privacy",
  //           external: false,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Social",
  //       items: [
  //         {
  //           title: "Twitter",
  //           href: links.twitter,
  //           external: true,
  //         },
  //         {
  //           title: "GitHub",
  //           href: links.githubAccount,
  //           external: true,
  //         },
  //         {
  //           title: "Discord",
  //           href: links.discord,
  //           external: true,
  //         },
  //         {
  //           title: "cal.com",
  //           href: links.calDotCom,
  //           external: true,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Lofi",
  //       items: [
  //         {
  //           title: "beats to study to",
  //           href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  //           external: true,
  //         },
  //         {
  //           title: "beats to chill to",
  //           href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
  //           external: true,
  //         },
  //         {
  //           title: "a fresh start",
  //           href: "https://www.youtube.com/watch?v=rwionZbOryo",
  //           external: true,
  //         },
  //         {
  //           title: "coffee to go",
  //           href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
  //           external: true,
  //         },
  //       ],
  //     },
  //   ] satisfies FooterItem[],
};
