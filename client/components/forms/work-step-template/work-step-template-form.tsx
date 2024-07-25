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
import {
  TUpdateWorkStepTemplateSchema,
  ZUpdateWorkStepTemplateSchema,
} from "@/trpc/server/routes/work_step_template/update.schema";
import { Textarea } from "@/components/ui/textarea";

interface WorkStepTemplateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  work_step_template: NonNullable<
    RouterOutput["db"]["work_step_template"]["get"]["byId"]["data"]
  >;
}

export function WorkStepTemplateForm({
  work_step_template,
  className,
}: WorkStepTemplateFormProps) {
  const form = useForm<TUpdateWorkStepTemplateSchema>({
    resolver: zodResolver(ZUpdateWorkStepTemplateSchema),
    values: {
      id: work_step_template.id,
      name: work_step_template.name,
      description: work_step_template.description || "",
    },
  });

  const { isPending, mutate } = api.db.work_step_template.update.useMutation({
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step name</FormLabel>
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
                    <Textarea placeholder="example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
