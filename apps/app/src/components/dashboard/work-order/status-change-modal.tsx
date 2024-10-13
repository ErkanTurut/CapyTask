"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@gembuddy/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@gembuddy/ui/dialog";
import { Label } from "@gembuddy/ui/label";
import { Textarea } from "@gembuddy/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@gembuddy/ui/form";
import { api } from "@gembuddy/trpc/client";
import {
  TUpdateWorkOrderSchema,
  ZUpdateWorkOrderSchema,
} from "@gembuddy/trpc/schema/work_order";
import { StatusConfig } from "./status-config";

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
  const { mutate, isPending } = api.db.work_order.update.status.useMutation({
    onSuccess: () => {
      toast.success("Status updated successfully");
      utils.db.work_order.get.byId.invalidate();
      form.reset();
      onClose?.();
    },
  });

  const form = useForm<TUpdateWorkOrderSchema>({
    resolver: zodResolver(ZUpdateWorkOrderSchema),
    defaultValues: {
      // note: undefined,
      status: selectedStatus?.value,
      id: params.work_order_id,
    },
  });

  useEffect(() => {
    if (!selectedStatus) return;
    form.setValue("status", selectedStatus.value);
  }, [selectedStatus, form]);

  const handleSubmit = form.handleSubmit((data) => {
    mutate({
      id: data.id,
      status: data.status,
      work_order_id: data.work_order_id,
      // note: data.note,
    });
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
              <div className="flex items-center gap-1">
                <span>From</span>
                <span className="rounded-full border px-1 font-medium text-foreground">
                  {prevStatus?.label}
                </span>
                <span>To</span>
                <span className="rounded-full border px-1 font-medium text-foreground">
                  {selectedStatus?.label}
                </span>
              </div>
            </div>
            {/* <FormField
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
            /> */}
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
