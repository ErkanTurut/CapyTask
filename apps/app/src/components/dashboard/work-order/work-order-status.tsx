"use client";
import { Icons } from "@/components/icons";
import { StatusChangeModal } from "@/components/modal/work-order/work-order-status-update-modal";
import { PopoverComboBox } from "@/components/popoverCombobox";
import type { RouterOutput } from "@gembuddy/trpc/client";
import { useState } from "react";
import { type StatusConfig, statusConfig } from "../../config/status.config";
interface StatusSelectorProps {
  workOrder: NonNullable<
    RouterOutput["db"]["work_order"]["get"]["byId"]["data"]
  >;
}

export function WorkOrderStatus({ workOrder }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initialStatus = statusConfig.find(
    (status) => status.value === workOrder.status,
  );
  if (!initialStatus) {
    throw new Error("Invalid status");
  }

  const [selectedStatus, setSelectedStatus] =
    useState<StatusConfig>(initialStatus);

  const handleSelect = (status: StatusConfig) => {
    if (status.value === initialStatus.value) return;
    setSelectedStatus(status);
    setIsOpen(true);
  };

  const Icon = initialStatus.icon ? Icons[initialStatus.icon] : null;

  return (
    <>
      <StatusChangeModal
        isOpen={isOpen}
        initialStatus={initialStatus}
        newStatus={selectedStatus}
        onOpenChange={setIsOpen}
        work_order_id={workOrder.id}
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
