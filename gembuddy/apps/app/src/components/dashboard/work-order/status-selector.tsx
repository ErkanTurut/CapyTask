"use client";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { PopoverComboBox } from "@/components/popoverCombobox";
import { StatusChangeModal } from "./status-change-modal";
import { StatusConfig, statusConfig } from "./status-config";
import { Database } from "@/types/supabase.types";

interface StatusSelectorProps {
  status: Database["public"]["Enums"]["Status"];
}

export function StatusSelector({ status }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initialStatus = statusConfig.find(
    (_status) => _status.value === status,
  );
  const [selectedStatus, setSelectedStatus] = useState<
    StatusConfig | undefined
  >(undefined);

  if (!initialStatus) return null;

  const handleSelect = (status: StatusConfig) => {
    if (status.value === initialStatus.value) return;
    setSelectedStatus(status);
    setIsOpen(true);
  };

  const Icon = initialStatus.icon ? Icons[initialStatus.icon] : null;

  return (
    <>
      <StatusChangeModal
        prevStatus={initialStatus}
        selectedStatus={selectedStatus}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <PopoverComboBox
        className="w-[10rem]"
        options={statusConfig}
        onSelect={handleSelect}
        selected={initialStatus}
      >
        <div className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
          {Icon && <Icon className="size-4 text-muted-foreground" />}
          {initialStatus.label}
          <Icons.caretSort className="size-4 text-muted-foreground group-hover:text-accent-foreground" />
        </div>
      </PopoverComboBox>
    </>
  );
}
