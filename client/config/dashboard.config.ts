import { IconType } from "@/components/icons";
import { Database } from "@/types/supabase.types";

export interface StatusConfig {
  value: Database["public"]["Enums"]["Status"];
  label: string;
  icon?: IconType;
}

export const statusConfig: StatusConfig[] = [
  {
    value: "OPEN",
    label: "Open",
    icon: "check",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: "check",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: "check",
  },
  {
    value: "CANCELED",
    label: "Cancelled",
    icon: "check",
  },
  {
    value: "ON_HOLD",
    label: "On Hold",
    icon: "check",
  },
];
