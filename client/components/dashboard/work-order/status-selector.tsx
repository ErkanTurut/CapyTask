"use client";
import { Icons, IconType } from "@/components/icons";
import { Database } from "@/types/supabase.types";
import { ComboBox } from "@/components/popoverCombobox";
import { useState } from "react";
import { api } from "@/trpc/client";
import { useParams } from "next/navigation";
import { toast } from "sonner";

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

export const StatusSelector = ({
  status,
}: {
  status: Database["public"]["Enums"]["Status"];
}) => {
  const params = useParams() as { work_order_id: string };
  const initialStatus = statusConfig.find(
    (_status) => _status.value === status,
  );
  if (!initialStatus) {
    return null;
  }

  const [selectedStatus, setSelectedStatus] =
    useState<StatusConfig>(initialStatus);

  const Icon = selectedStatus.icon ? Icons[selectedStatus.icon] : null;

  const { mutate } = api.db.work_order.update.status.useMutation({
    onSuccess: () => {
      toast.success("Status updated successfully");
    },
  });

  const handleSelect = async (status: StatusConfig) => {
    setSelectedStatus(status);
    mutate({
      id: params.work_order_id,
      status: status.value,
    });
  };

  return (
    <ComboBox
      className="w-[10rem]"
      options={statusConfig}
      onSelect={handleSelect}
    >
      <div className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
        {Icon && <Icon className="size-4 text-muted-foreground" />}
        {selectedStatus.label}
        <Icons.caretSort className="size-4 text-muted-foreground group-hover:text-accent-foreground" />
      </div>
    </ComboBox>
  );
};
