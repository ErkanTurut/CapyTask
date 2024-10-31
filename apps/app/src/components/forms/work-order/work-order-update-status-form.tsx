"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gembuddy/ui/form";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@gembuddy/ui/button";

import { type RouterOutput, api } from "@gembuddy/trpc/client";

import {
  type TUpdateWorkOrderWithNoteSchema,
  ZUpdateWorkOrderWithNoteSchema,
} from "@gembuddy/trpc/schema/work_order";
import { Textarea } from "@gembuddy/ui/textarea";
import type { StatusConfig } from "../../config/status.config";

interface WorkOrderStatusUpdateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  initialStatus: StatusConfig;
  newStatus: StatusConfig;
  work_order_id: string;
  onFinish?: () => void;
}

export function WorkOrderStatusUpdateForm({
  className,
  initialStatus,
  newStatus,
  work_order_id,
  onFinish,
}: WorkOrderStatusUpdateFormProps) {
  const utils = api.useUtils();
  const { mutate, isPending } =
    api.db.work_order.update.statusWithNote.useMutation({
      onSuccess: (updatedOrder) => {
        toast.success("Status updated successfully");
        utils.db.work_order.get.byId.invalidate();
        form.reset();
        onFinish?.();
      },
    });

  const form = useForm<TUpdateWorkOrderWithNoteSchema>({
    resolver: zodResolver(ZUpdateWorkOrderWithNoteSchema),
    defaultValues: {
      note: undefined,
    },
    values: {
      work_order_id,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate({
      work_order_id: data.work_order_id,
      status: newStatus.value,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
        <div className="flex flex-col text-sm font-normal text-muted-foreground">
          <span>Are you sure you want to change the status?</span>
          <div className="flex items-center gap-1 text-foreground">
            <span>From</span>
            <span className="rounded-full border px-1 font-mono bg-secondary text-muted-foreground border-dashed">
              {initialStatus.label}
            </span>
            <span>To</span>
            <span className="rounded-full border px-1 text-foreground font-mono">
              {newStatus.label}
            </span>
          </div>
        </div>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="note" className="text-left font-semibold">
                Note
              </FormLabel>
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
          <Button
            onClick={() => {
              form.reset;
              onFinish?.();
            }}
            variant="secondary"
            type="button"
          >
            Cancel
          </Button>
          <Button isLoading={isPending} type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
