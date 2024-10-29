"use client";

import type { Icons } from "@/components/icons";
import { PopoverComboBox } from "@/components/popoverCombobox";
import { Enums, type Tables } from "@gembuddy/supabase/types";
import {
  type TUpdateWorkOrderItemWithNoteSchema,
  ZUpdateWorkOrderItemWithNoteSchema,
} from "@gembuddy/trpc/schema/work_order_item";
import { Button } from "@gembuddy/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@gembuddy/ui/dialog";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the status configuration type with a generic parameter
export type StatusConfig<T extends string> = {
  value: T;
  label: string;
  icon?: keyof typeof Icons;
};

interface StatusSelectorProps<T extends string> {
  workOrderItem: Tables<"work_order_item">;
  statusConfig: StatusConfig<T>[];
  onStatusChange: (newStatus: T, note?: string) => Promise<void>;
  children: React.ReactNode;
}

export function WorkOrderItemStatus<T extends string>({
  workOrderItem,
  statusConfig,
  onStatusChange,
  children,
}: StatusSelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const initialStatus = statusConfig.find(
    (_status) => _status.value === workOrderItem.status,
  );
  const [selectedStatus, setSelectedStatus] = useState<
    StatusConfig | undefined
  >(undefined);

  if (!initialStatus) return null;

  const handleSelect = (status: StatusConfig<T>) => {
    if (status.value === initialStatus.value) return;
    setSelectedStatus(status);
    setIsOpen(true);
  };

  return (
    <>
      <StatusChangeModal
        prevStatus={initialStatus}
        selectedStatus={selectedStatus}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        work_order_item_id={workOrderItem.id}
        onStatusChange={onStatusChange}
        statusConfig={statusConfig}
      />
      <PopoverComboBox
        className="w-[10rem]"
        options={statusConfig}
        onSelect={handleSelect}
        selected={initialStatus}
      >
        {children}
      </PopoverComboBox>
    </>
  );
}

interface StatusChangeModalProps<T extends string> {
  isOpen?: boolean;
  onClose?: () => void;
  prevStatus?: StatusConfig<T>;
  selectedStatus?: StatusConfig<T>;
  work_order_item_id: string;
  onStatusChange: (newStatus: T, note?: string) => Promise<void>;
  statusConfig: StatusConfig<T>[];
}

function StatusChangeModal<T extends string>({
  isOpen,
  onClose,
  prevStatus,
  selectedStatus,
  work_order_item_id,
  onStatusChange,
  statusConfig,
}: StatusChangeModalProps<T>) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<TUpdateWorkOrderItemWithNoteSchema>({
    resolver: zodResolver(ZUpdateWorkOrderItemWithNoteSchema),
    defaultValues: {
      id: work_order_item_id,
      status: selectedStatus?.value,
      work_order_item_id,
      note: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!data.status) return;

    setIsPending(true);
    try {
      await onStatusChange(data.status, data.note);
      toast.success("Status updated successfully");
      form.reset();
      onClose?.();
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    } finally {
      setIsPending(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                <span className="rounded-full border px-1 text-foreground font-mono">
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
