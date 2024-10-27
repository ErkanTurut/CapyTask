"use client";
import { type IconType, Icons } from "@/components/icons";
import { PopoverComboBox } from "@/components/popoverCombobox";
import type { Database } from "@gembuddy/supabase/types";
import { useState } from "react";

export interface StatusConfig {
  value: Database["public"]["Enums"]["Priority"];
  label: string;
  icon?: IconType;
}

export const statusConfig: StatusConfig[] = [
  {
    value: "HIGH",
    label: "High Priority",
    icon: "arrowUp",
  },
  {
    value: "MEDIUM",
    label: "Medium Priority",
    icon: "arrowLeft",
  },
  {
    value: "LOW",
    label: "Low Priority",
    icon: "arrowBottomLeft",
  },
];

export const PrioritySelector = ({
  status,
}: {
  status: Database["public"]["Enums"]["Priority"];
}) => {
  const initialStatus = statusConfig.find(
    (_status) => _status.value === status,
  );
  if (!initialStatus) {
    return null;
  }

  const [selectedStatus, setSelectedStatus] =
    useState<StatusConfig>(initialStatus);

  const Icon = selectedStatus.icon ? Icons[selectedStatus.icon] : null;
  return (
    <PopoverComboBox
      className="w-[10rem]"
      options={statusConfig}
      onSelect={setSelectedStatus}
    >
      <div className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
        {Icon && <Icon className="size-4 text-muted-foreground" />}
        {selectedStatus.label}
        <Icons.caretSort className="size-4 text-muted-foreground group-hover:text-accent-foreground" />
      </div>
    </PopoverComboBox>
  );
};
