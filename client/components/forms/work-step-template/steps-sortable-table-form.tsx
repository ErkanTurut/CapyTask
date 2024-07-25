"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api, RouterOutput } from "@/trpc/client";
import {
  TUpdateWorkPlanTemplateSchema,
  ZUpdateWorkPlanTemplateSchema,
} from "@/trpc/server/routes/work_plan_template/update.schema";
import {
  TUpsertWorkStepTemplateSchema,
  ZUpsertWorkStepTemplateSchema,
} from "@/trpc/server/routes/work_step_template/upsert.schema";
import {
  ChevronRightIcon,
  DragHandleDots2Icon,
  EyeOpenIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

interface StepsSortableTableFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  work_step_templates: NonNullable<
    RouterOutput["db"]["work_step_template"]["get"]["byWorkPlanTemplate"]["data"]
  >;
}

export function StepsSortableTableForm({
  work_step_templates,
  className,
}: StepsSortableTableFormProps) {
  console.log(work_step_templates);
  const form = useForm<TUpsertWorkStepTemplateSchema>({
    resolver: zodResolver(ZUpsertWorkStepTemplateSchema),
    values: {
      work_step_templates,
    },
  });

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "work_step_templates",
  });

  const { isPending, mutate } = api.db.work_step_template.upsert.useMutation({
    onSuccess: async (data, variables) => {
      toast.success("Updated successfully");
      form.reset(variables);
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  return (
    <Form {...form}>
      <form
        className={cn("", className)}
        onSubmit={(...args) =>
          void form.handleSubmit((data) => {
            mutate(data);
          })(...args)
        }
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent>
            <Sortable
              value={fields}
              onMove={({ activeIndex, overIndex }) =>
                move(activeIndex, overIndex)
              }
              overlay={
                <div className="grid grid-cols-[2rem,1fr,auto,auto,auto] items-center gap-2">
                  <div className="h-8 w-full rounded-full bg-primary/10" />
                  <div className="h-8 w-full rounded-sm bg-primary/10" />
                  <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                  <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                </div>
              }
            >
              <div className="flex w-full flex-col gap-2">
                {fields.map(
                  (field, index) => (
                    console.log(field),
                    form.setValue(
                      `work_step_templates.${index}.step_order`,
                      index + 1,
                    ),
                    (
                      <SortableItem key={field.id} value={field.id} asChild>
                        <div className="grid grid-cols-[2rem,1fr,auto,auto,auto] items-center gap-2">
                          <div
                            key={index}
                            className="flex h-8 items-center justify-center rounded-full border bg-muted text-center text-sm"
                          >
                            {index + 1}
                          </div>
                          <FormField
                            control={form.control}
                            name={`work_step_templates.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input className="h-8" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <SortableDragHandle
                            variant="outline"
                            size="icon"
                            className="size-8 shrink-0"
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
                          <Link
                            href={{ query: { step_id: field.id } }}
                            className={cn(
                              buttonVariants({
                                size: "icon",
                                variant: "ghost",
                              }),
                              "size-8 shrink-0",
                            )}
                          >
                            <ChevronRightIcon
                              className="size-4"
                              aria-hidden="true"
                            />
                            <span className="sr-only">open</span>
                          </Link>
                        </div>
                      </SortableItem>
                    )
                  ),
                )}
              </div>
            </Sortable>
          </CardContent>
          <CardFooter>
            <Button isLoading={isPending} disabled={!form.formState.isDirty}>
              Save
              <span className="sr-only">Save update</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
