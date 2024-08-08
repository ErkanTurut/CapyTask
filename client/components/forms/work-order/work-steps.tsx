"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Textarea } from "@/components/ui/textarea";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";

import {
  TCreateWorkStepSchema,
  ZCreateWorkStepSchema,
} from "@/trpc/server/routes/work_step/create.schema";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { VisuallyHidden } from "@/components/ui/vizually-hidden";

function StepModal({
  onSubmit,
  children,
}: {
  onSubmit: (data: TCreateWorkStepSchema) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<TCreateWorkStepSchema>({
    resolver: zodResolver(ZCreateWorkStepSchema),
    defaultValues: {
      name: "",
      description: "",
      parent_step_id: undefined,
      step_order: undefined,
      work_plan_id: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
    form.reset();
    setOpen(false);
  });

  const handleOpen = () => {
    setOpen(!open);
    form.reset();
  };

  return (
    <Dialog onOpenChange={handleOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-[28rem] flex-col justify-start p-0 pt-4 sm:max-w-[625px]">
        <VisuallyHidden>
          <DialogTitle>Add step</DialogTitle>
        </VisuallyHidden>
        <Form {...form}>
          <fieldset
            onSubmit={(...args) => void handleSubmit(...args)}
            className="flex flex-1 flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="p-2">
                  <FormControl>
                    <Input
                      placeholder="Add title..."
                      className="border-none text-lg font-semibold leading-none tracking-tight shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-4 h-full p-2">
                  <FormControl>
                    <Textarea
                      placeholder="And add description..."
                      className="h-full resize-none border-none shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
            <DialogFooter className="mr border-t p-2">
              <Button
                onClick={(...args) => void handleSubmit(...args)}
                type="button"
                disabled={!form.formState.isDirty}
              >
                Create step
              </Button>
            </DialogFooter>
          </fieldset>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function WorkSteps({
  form,
}: {
  form: UseFormReturn<TCreateWorkOrderWithItemsSchema>;
}) {
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "work_step",
    keyName: "fieldId",
  });

  return (
    <div className="flex flex-col items-end gap-4 p-2">
      <StepModal onSubmit={(data) => append(data)}>
        <Button type="button" variant="outline" size="sm" className="">
          Add step
          <Icons.plusCircled className="ml-2 h-4 w-4" />
        </Button>
      </StepModal>

      <Sortable
        value={fields}
        onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
        overlay={
          <div className="grid grid-cols-[2rem,1fr] items-center gap-2">
            <div className="h-8 w-full rounded-full bg-primary/10 outline-dashed outline-ring" />
            <div className="h-8 w-full rounded-sm bg-primary/10 outline-dashed outline-ring" />
          </div>
        }
      >
        <div className="flex w-full flex-col gap-2">
          {fields.length === 0 && (
            <div className="h-8 w-full rounded-md border border-dashed p-2 text-center text-sm text-muted-foreground">
              No work steps added yet
            </div>
          )}
          {fields.map(
            (field, index) => (
              form.setValue(`work_step.${index}.step_order`, index + 1),
              (
                <SortableItem key={field.fieldId} value={field.fieldId} asChild>
                  <div className="grid grid-cols-[2rem,1fr,auto,auto,auto] items-center gap-2">
                    <SortableDragHandle
                      variant="outline"
                      size="icon"
                      key={index}
                      className="size-8 shrink-0 rounded-full"
                    >
                      {index + 1}
                    </SortableDragHandle>

                    <FormField
                      control={form.control}
                      name={`work_step.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-8" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <SortableDragHandle
                      variant="ghost"
                      size="icon"
                      className="size-8 w-6 shrink-0"
                    >
                      <DragHandleDots2Icon
                        className="size-4"
                        aria-hidden="true"
                      />
                    </SortableDragHandle>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon
                        className="size-4 text-destructive"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </SortableItem>
              )
            ),
          )}
        </div>
      </Sortable>
    </div>
  );
}
