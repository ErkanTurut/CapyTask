"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/client";
import {
  TCreateWorkOrderWithStepsSchema,
  ZCreateWorkOrderWithStepsSchema,
} from "@/trpc/server/routes/work_order/create.schema";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import type { UseFormReturn } from "react-hook-form";

interface WorkOrderCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  workspace_id: string;
}

export function WorkOrderCreateForm({ className }: WorkOrderCreateFormProps) {
  const router = useRouter();

  const { mutate, isPending } = api.db.work_order.create.withSteps.useMutation({
    onSuccess(data) {
      form.reset();
      router.push(`./${data?.work_order.id}`);
    },
    onError(err) {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateWorkOrderWithStepsSchema>({
    resolver: zodResolver(ZCreateWorkOrderWithStepsSchema),
    values: {
      company_id: "4doRuGC8pE",
      asset: [],
      name: "",
      description: "",
      location_id: "xc9zBwVtbm",
      source: "MANUAL_ENTRY",
      team_id: "4pGki9KGYX",
      type: "MAINTENANCE",
      work_step: [],
    },
    defaultValues: {
      asset: [],
      work_step: [],
      company_id: undefined,
      description: "",
      location_id: "",
      name: "",

      source: "MANUAL_ENTRY",
      team_id: "",
      type: "MAINTENANCE",
    },
  });

  async function onSubmit(data: TCreateWorkOrderWithStepsSchema) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent>
            <General form={form} />
            <Tabs defaultValue="work-steps" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="work-steps">Work steps</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="ressources">Ressources</TabsTrigger>
              </TabsList>
              <TabsContent value="work-steps">
                <WorkSteps form={form} />
              </TabsContent>
              <TabsContent value="assets"></TabsContent>
              <TabsContent value="ressources"></TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              isLoading={isPending}
              disabled={!form.formState.isDirty || !form.formState.isValid}
            >
              Create now
              <span className="sr-only">Create now</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

interface workStepFormProps {
  form: UseFormReturn<TCreateWorkOrderWithStepsSchema>;
}

export function General({ form }: workStepFormProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                className="max-h-60"
                placeholder="example"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export function WorkSteps({ form }: workStepFormProps) {
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "work_step",
    keyName: "fieldId",
  });

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="h-8"
        size={"sm"}
        onClick={() =>
          append({
            name: "",
            description: "",
          })
        }
        type="button"
      >
        <Icons.plusCircled className="mr-2 size-4" />
        Add new
      </Button>
      <Sortable
        value={fields}
        onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
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
