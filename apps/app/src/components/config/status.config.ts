import type { Database } from "@gembuddy/supabase/types";
import type { IconType } from "@gembuddy/ui/icons";

export interface StatusConfig {
  value: Database["public"]["Enums"]["Status"];
  label: string;
  icon?: IconType;
}

export const statusConfig: StatusConfig[] = [
  {
    value: "OPEN",
    label: "Open",
    icon: "greenPulse",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: "bluePulse",
  },
  {
    value: "ON_HOLD",
    label: "On Hold",
    icon: "yellowPulse",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: "checkCircled",
  },
  {
    value: "CANCELED",
    label: "Cancelled",
    icon: "CrossCircled",
  },
];
