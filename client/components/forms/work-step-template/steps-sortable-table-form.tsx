"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api, RouterOutput } from "@/trpc/client";
import {
  TUpsertWorkStepTemplateSchema,
  ZUpsertWorkStepTemplateSchema,
} from "@/trpc/server/routes/work_step_template/upsert.schema";
import {
  ChevronRightIcon,
  DragHandleDots2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icons } from "@/components/icons";
import { CreatWorkStepTemplateModal } from "@/components/modals/CreateWorkStepTemplateModal";
interface StepsSortableTableFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  initialData: NonNullable<
    RouterOutput["db"]["work_step_template"]["get"]["byWorkPlanTemplate"]
  >;
  work_plan_template_id: string;
}

export function StepsSortableTableForm({
  initialData,
  work_plan_template_id,
  className,
}: StepsSortableTableFormProps) {
  const { isPending, mutate } = api.db.work_step_template.upsert.useMutation({
    onSuccess: async (data, variables) => {
      toast.success("Updated successfully");
      form.reset(variables);
      refetch();
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  const { data: work_step_template, refetch } =
    api.db.work_step_template.get.byWorkPlanTemplate.useQuery(
      {
        work_plan_template_id: work_plan_template_id,
      },
      { initialData: initialData },
    );
  if (!work_step_template) return notFound();

  const form = useForm<TUpsertWorkStepTemplateSchema>({
    resolver: zodResolver(ZUpsertWorkStepTemplateSchema),
    values: {
      work_step_template,
    },
  });

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "work_step_template",
    keyName: "fieldId",
  });

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Steps</CardTitle>
          <Link
            className={buttonVariants({ variant: "outline", size: "sm" })}
            href={"./create"}
          >
            <Icons.plusCircled className="mr-2 h-4 w-4" />
            New
          </Link>
        </div>
      </CardHeader>
      <Form {...form}>
        <form
          className={cn("", className)}
          onSubmit={(...args) =>
            void form.handleSubmit((data) => {
              mutate(data);
            })(...args)
          }
        >
          <CardContent>
            <Sortable
              value={fields}
              onMove={({ activeIndex, overIndex }) =>
                move(activeIndex, overIndex)
              }
              overlay={
                <div className="grid grid-cols-[2rem,1fr] items-center gap-2">
                  <div className="h-8 w-full rounded-full bg-primary/10 outline-dashed outline-ring" />
                  <div className="h-8 w-full rounded-sm bg-primary/10 outline-dashed outline-ring" />
                  {/* <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                  <div className="size-8 shrink-0 rounded-sm bg-primary/10" /> */}
                </div>
              }
            >
              <div className="flex w-full flex-col gap-2">
                {fields.map(
                  (field, index) => (
                    form.setValue(
                      `work_step_template.${index}.step_order`,
                      index + 1,
                    ),
                    (
                      <SortableItem
                        key={field.fieldId}
                        value={field.fieldId}
                        asChild
                      >
                        <div className="grid grid-cols-[2rem,1fr,auto,auto,auto] items-center gap-2">
                          <SortableDragHandle
                            variant="outline"
                            size="icon"
                            key={index}
                            className="size-8 shrink-0 rounded-full"
                          >
                            {index + 1}
                          </SortableDragHandle>
                          <Link
                            href={{
                              query: { step_id: field.id },
                            }}
                          >
                            <FormField
                              control={form.control}
                              name={`work_step_template.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      readOnly
                                      className="h-8"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </Link>
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
                          <Link
                            href={{
                              query: { step_id: field.id },
                            }}
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
          <CardFooter className="flex justify-end gap-2">
            {form.formState.isDirty && (
              <Button
                variant={"outline"}
                isLoading={isPending}
                onClick={() => {
                  form.reset();
                }}
                type="reset"
              >
                Cancel
                <span className="sr-only">Cancel update</span>
              </Button>
            )}
            <Button
              isLoading={isPending}
              disabled={!form.formState.isDirty || isPending}
            >
              Save
              <span className="sr-only">Save update</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
