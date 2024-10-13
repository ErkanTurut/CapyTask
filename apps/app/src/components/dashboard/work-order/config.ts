import { IconType } from "@gembuddy/ui/icons";

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
