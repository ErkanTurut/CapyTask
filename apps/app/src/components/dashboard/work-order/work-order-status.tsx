"use client";
import { Icons } from "@/components/icons";
import { PopoverComboBox } from "@/components/popoverCombobox";
import { type RouterOutput, api } from "@gembuddy/trpc/client";
import {
  type TUpdateWorkOrderWithNoteSchema,
  ZUpdateWorkOrderWithNoteSchema,
} from "@gembuddy/trpc/schema/work_order";
import { Button } from "@gembuddy/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@gembuddy/ui/dialog";
import { Editor } from "@gembuddy/ui/editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@gembuddy/ui/form";
import { Label } from "@gembuddy/ui/label";
import { Textarea } from "@gembuddy/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type StatusConfig, statusConfig } from "./status-config";
interface StatusSelectorProps {
  workOrder: NonNullable<
    RouterOutput["db"]["work_order"]["get"]["byId"]["data"]
  >;
}

export function WorkOrderStatus({ workOrder }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initialStatus = statusConfig.find(
    (_status) => _status.value === workOrder.status,
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

interface StatusChangeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  prevStatus?: StatusConfig;
  selectedStatus?: StatusConfig;
}

export function StatusChangeModal({
  isOpen,
  onClose,
  prevStatus,
  selectedStatus,
}: StatusChangeModalProps) {
  const params = useParams() as { work_order_id: string };

  const utils = api.useUtils();
  const { mutate, isPending } =
    api.db.work_order.update.statusWithNote.useMutation({
      onSuccess: () => {
        toast.success("Status updated successfully");
        utils.db.work_order.get.byId.invalidate();
        form.reset();
        onClose?.();
      },
    });

  const form = useForm<TUpdateWorkOrderWithNoteSchema>({
    resolver: zodResolver(ZUpdateWorkOrderWithNoteSchema),
    defaultValues: {
      note: undefined,
    },
    values: {
      id: params.work_order_id,
      status: selectedStatus?.value,

      work_order_id: params.work_order_id,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutate({
      id: data.id,
      status: data.status,
      work_order_id: data.work_order_id,
      note: data.note,
    });
  });
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose?.();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Status Change</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col text-sm font-normal text-muted-foreground">
              <span>Are you sure you want to change the status?</span>
              <div className="flex items-center gap-1 text-foreground">
                <span>From</span>
                <span className="rounded-full border px-1 font-mono bg-secondary text-muted-foreground border-dashed">
                  {prevStatus?.label}
                </span>
                <span>To</span>
                <span className="rounded-full border px-1 text-foreground   font-mono">
                  {selectedStatus?.label}
                </span>
              </div>
            </div>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="note" className="text-left font-semibold">
                    Note
                  </Label>
                  <FormControl>
                    <Textarea
                      placeholder="Add note"
                      className="h-24 max-h-24 shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-2">
              <Button onClick={onClose} variant="secondary" type="button">
                Cancel
              </Button>
              <Button isLoading={isPending} type="submit">
                Save change
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
