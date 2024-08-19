import { IconType } from "@/components/icons";

export type Page = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  icon: IconType;
  disabled?: boolean;
  segment: string | null;
  children?: Page[];
};

export const workOrderPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "All assets.",
    href: "/",
    icon: "lightning",
    segment: null,
  },
  {
    title: "Locations",
    description: "All assets.",
    href: "/locations",
    icon: "lightning",
    segment: "locations",
  },
  {
    title: "Ressources",
    description: "All assets.",
    href: "/ressources",
    icon: "lightning",
    segment: "ressources",
  },
];

export const pagesConfig = [
  {
    title: "Work Orders",
    description: "All locations.",
    href: "/work-orders",
    icon: "lightning",
    segment: "work-orders",
    children: workOrderPagesConfig,
  },
] as const satisfies readonly Page[];
