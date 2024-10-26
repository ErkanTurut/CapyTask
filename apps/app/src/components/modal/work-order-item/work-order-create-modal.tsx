"use client";
import { WorkOrderItemCreateForm } from "@/components/forms/work-order-item/work-order-item-create-form";
import { Dialog, DialogContent, DialogTitle } from "@gembuddy/ui/dialog";
import { parseAsBoolean, useQueryState } from "nuqs";

interface AppointmentDialogProps {
  work_order_id: string;
}

export function WorkOrderItemCreateModal({
  work_order_id,
}: AppointmentDialogProps) {
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
        <WorkOrderItemCreateForm work_order_id={work_order_id} />
      </DialogContent>
    </Dialog>
  );
}
