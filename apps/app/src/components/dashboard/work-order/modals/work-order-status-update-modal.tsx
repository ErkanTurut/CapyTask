import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@gembuddy/ui/dialog";
import type { StatusConfig } from "../../../config/status.config";
import { WorkOrderStatusUpdateForm } from "../forms/work-order-update-status-form";
interface StatusChangeModalProps {
  isOpen?: boolean;
  initialStatus: StatusConfig;
  newStatus: StatusConfig;
  onOpenChange: (value: boolean) => void;
  work_order_id: string;
}

export function StatusChangeModal({
  isOpen,
  initialStatus,
  newStatus,
  onOpenChange,
  work_order_id,
}: StatusChangeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Status Change</DialogTitle>
        </DialogHeader>
        <WorkOrderStatusUpdateForm
          work_order_id={work_order_id}
          initialStatus={initialStatus}
          newStatus={newStatus}
          onFinish={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
