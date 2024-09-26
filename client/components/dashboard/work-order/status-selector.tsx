"use client";
import { Icons, IconType } from "@/components/icons";
import { Database } from "@/types/supabase.types";
import { PopoverComboBox } from "@/components/popoverCombobox";
import { useEffect, useState } from "react";
import { api } from "@/trpc/client";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [open, setOpen] = useState(false);
  const params = useParams() as { work_order_id: string };
  const initialStatus = statusConfig.find(
    (_status) => _status.value === status,
  );
  if (!initialStatus) {
    return null;
  }

  const [selectedStatus, setSelectedStatus] =
    useState<StatusConfig>(initialStatus);

  useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [status]);

  const Icon = initialStatus.icon ? Icons[initialStatus.icon] : null;

  const utils = api.useUtils();
  const { mutate } = api.db.work_order.update.status.useMutation({
    onSuccess: () => {
      toast.success("Status updated successfully");
      utils.db.work_order.get.byId.invalidate();
    },
  });

  const handleSelect = async (status: StatusConfig) => {
    if (status.value === initialStatus.value) {
      return;
    }
    setSelectedStatus(status);
    setOpen(true);

    // mutate({
    //   id: params.work_order_id,
    //   status: status.value,
    // });
  };

  return (
    <>
      <StatusChangeModal
        prevStatus={initialStatus}
        nextStatus={selectedStatus}
        open={open}
        onClose={() => setOpen(!open)}
        onSubmit={() => {
          setOpen(false);
          mutate({
            id: params.work_order_id,
            status: selectedStatus.value,
          });
        }}
      />
      <PopoverComboBox
        className="w-[10rem]"
        options={statusConfig}
        onSelect={({ prevValue, value }) => {
          handleSelect(value);
        }}
      >
        <div className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
          {Icon && <Icon className="size-4 text-muted-foreground" />}
          {initialStatus.label}
          <Icons.caretSort className="size-4 text-muted-foreground group-hover:text-accent-foreground" />
        </div>
      </PopoverComboBox>
    </>
  );
};

export function StatusChangeModal({
  open,
  onClose,
  prevStatus,
  nextStatus,
  onSubmit,
}: {
  open?: boolean;
  onClose?: () => void;
  prevStatus?: StatusConfig;
  nextStatus?: StatusConfig;
  onSubmit?: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Confirm</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col text-sm font-normal text-muted-foreground">
            <span>Are you sure you want to change the status?</span>
            <div className="flex items-center gap-1">
              <span>From</span>
              <span className="rounded-full border px-1 font-medium text-foreground">
                {prevStatus?.label}
              </span>
              <span>To</span>
              <span className="rounded-full border px-1 font-medium text-foreground">
                {nextStatus?.label}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note" className="text-left font-semibold">
              Note
            </Label>
            <Textarea
              placeholder="Add note"
              className="h-48 max-h-64 shadow-none"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button onClick={onClose} variant={"secondary"}>
              Cancel
            </Button>

            <Button onClick={onSubmit}>Change status</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
