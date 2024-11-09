"use client";

import React from "react";

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

import { type Content, Editor } from "@gembuddy/ui/editor";

import { type RouterOutput, api } from "@gembuddy/trpc/client";

import {
  type TUpdateWorkOrderWithNoteSchema,
  ZUpdateWorkOrderWithNoteSchema,
} from "@gembuddy/trpc/schema/work_order";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
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
        utils.db.note.get.byWorkOrder.invalidate();
        form.reset();
        onFinish?.();
      },
    });

  const { mutate: createHistory } =
    api.db.work_order_history.create.one.useMutation({});

  const form = useForm<TUpdateWorkOrderWithNoteSchema>({
    resolver: zodResolver(ZUpdateWorkOrderWithNoteSchema),
    defaultValues: {
      content: undefined,
      text: undefined,
    },
    values: {
      work_order_id,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createHistory({
      work_order_id: data.work_order_id,
      field: "status",
      new_value: newStatus.value,
      old_value: initialStatus.value,
      created_at: new Date().toISOString(),
    });
    mutate({
      work_order_id: data.work_order_id,
      status: newStatus.value,
      content: data.content?.toString(),
      text: data.text,
    });
  });

  const [editorContent, setEditorContent] = React.useState<Content>(null);

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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="note" className="text-left font-semibold">
                Note
              </FormLabel>
              <FormControl>
                <ScrollArea className="h-32 max-h-32 border rounded-md">
                  <Editor
                    content={editorContent}
                    onChange={(content) => {
                      setEditorContent(content.content);
                      form.setValue("content", JSON.stringify(content.content));
                      form.setValue("text", content.text);
                    }}
                  />
                </ScrollArea>

                {/* <Textarea
                  placeholder="Add note"
                  className="h-24 max-h-24 shadow-none"
                  {...field}
                /> */}
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
