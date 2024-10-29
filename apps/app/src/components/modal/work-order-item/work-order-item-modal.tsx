"use client";
import { WorkOrderItemCreateForm } from "@/components/forms/work-order-item/work-order-item-create-form";
import { Dialog, DialogContent, DialogTitle } from "@gembuddy/ui/dialog";
import { parseAsBoolean, useQueryState } from "nuqs";

interface AppointmentDialogProps {
  wo_item: string;
}

export function WorkOrderItemCreateModal({ wo_item }: AppointmentDialogProps) {
  const [open, setOpen] = useQueryState(
    "create",
    parseAsBoolean.withDefault(false),
  );
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        open ? setOpen(true) : setOpen(null);
      }}
    >
      <DialogContent className="overflow-hidden sm:max-w-lg">
        <DialogTitle>Create Service Appointment</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
