import type { Database } from "@gembuddy/supabase/types";
import type { IconType } from "@gembuddy/ui/icons";

export interface StatusConfigItem {
  value: Database["public"]["Enums"]["Status"];
  label: string;
  icon?: IconType;
  color: string;
}

// export const statusConfig: StatusConfig[] = [
//   {
//     value: "OPEN",
//     label: "Open",
//     icon: "greenPulse",
//     color: "green-500",
//   },
//   {
//     value: "IN_PROGRESS",
//     label: "In Progress",
//     icon: "bluePulse",
//     color: "blue-500",

//   },
//   {
//     value: "ON_HOLD",
//     label: "On Hold",
//     icon: "yellowPulse",
//     color: "yellow-500",

//   },
//   {
//     value: "COMPLETED",
//     label: "Completed",
//     icon: "checkCircled",
//     color: "green-500",

//   },
//   {
//     value: "CANCELED",
//     label: "Cancelled",
//     icon: "CrossCircled",
//     color: "red-500",

//   },
// ];

export const statusConfig: Record<
  Database["public"]["Enums"]["Status"],
  StatusConfigItem
> = {
  OPEN: {
    value: "OPEN",
    label: "Open",
    icon: "greenPulse",
    color: "bg-green-300 text-green-950 ",
  },
  IN_PROGRESS: {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: "bluePulse",
    color: "bg-green-300 text-green-950 ",
  },
  ON_HOLD: {
    value: "ON_HOLD",
    label: "On Hold",
    icon: "yellowPulse",
    color: "bg-green-300 text-green-950 ",
  },
  COMPLETED: {
    value: "COMPLETED",
    label: "Completed",
    icon: "checkCircled",
    color: "bg-green-300 text-green-950 ",
  },
  CANCELED: {
    value: "CANCELED",
    label: "Cancelled",
    icon: "CrossCircled",
    color: "bg-green-300 text-green-950 ",
  },
};

export const statusConfigArray = Object.values(statusConfig);
export type StatusConfigArrayItem = (typeof statusConfigArray)[number];
export type StatusConfig = typeof statusConfig;
