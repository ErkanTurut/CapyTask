"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gembuddy/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gembuddy/ui/form";
import { Input } from "@gembuddy/ui/input";

import { toast } from "sonner";
import { catchError, cn } from "@/lib/utils";

import { Button } from "@gembuddy/ui/button";

import { api } from "@gembuddy/trpc/client";
import { useRouter } from "next/navigation";
import {
  TCreateWorkPlanTemplateSchema,
  ZCreateWorkPlanTemplateSchema,
} from "@gembuddy/trpc/schema/work_plan_template";
import { Textarea } from "@gembuddy/ui/textarea";

interface WorkPlanTemplateCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  workspace_id: string;
}

export function WorkPlanTemplateCreateForm({
  workspace_id,
  className,
}: WorkPlanTemplateCreateFormProps) {
  const router = useRouter();

  const utils = api.useUtils();

  const { mutate, isPending } = api.db.work_plan_template.create.useMutation({
    onSuccess() {
      toast.success("Updated successfully");

      utils.db.work_plan_template.get.byWorkspace.invalidate(
        {
          workspace_id,
        },
        { type: "all" },
      );
      form.reset();
    },
    onError(err) {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateWorkPlanTemplateSchema>({
    resolver: zodResolver(ZCreateWorkPlanTemplateSchema),
    values: {
      name: "",
      description: "",
      workspace_id,
    },
  });

  async function onSubmit(data: TCreateWorkPlanTemplateSchema) {
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
            <CardTitle>Create</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <Textarea placeholder="example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button isLoading={isPending} disabled={!form.formState.isDirty}>
              Create now
              <span className="sr-only">Create now</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
