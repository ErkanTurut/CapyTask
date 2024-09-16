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
    title: "Appointments",
    description: "All assets.",
    href: "/appointments",
    icon: "lightning",
    segment: "appointments",
  },
  {
    title: "Resources",
    description: "All assets.",
    href: "/resources",
    icon: "lightning",
    segment: "resources",
    disabled: true,
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
