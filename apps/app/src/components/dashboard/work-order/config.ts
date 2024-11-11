import type { IconType } from "@gembuddy/ui/icons";

export type Page = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  icon?: IconType;
  disabled?: boolean;
  segment: string | null;
  children?: Page[];
};
export const workOrderPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "All work order items.",
    href: "/",
    segment: null,
  },
  {
    title: "Appointments",
    description: "All appointments.",
    href: "/appointments",
    segment: "appointments",
  },
  {
    title: "Timeline",
    description: "Timeline",
    href: "/timeline",
    icon: "timeline",
    segment: "timeline",
  },
  {
    title: "Knowledge",
    description: "Knowledge base",
    href: "/knowledge",
    icon: "sparkles",
    segment: "knowledge",
  },
];
