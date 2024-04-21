"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FC, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import { api } from "@/trpc/client";
import {
  TUpdateWorkStepTemplateSchema,
  ZUpdateWorkStepTemplateSchema,
} from "@/trpc/routes/work_step_template/update.schema";
import { trpc } from "@/trpc/server";
import { Textarea } from "@/ui/textarea";

interface StepUpdateFormProps extends React.HTMLAttributes<HTMLFormElement> {
  step: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["work_step_template"]["get"]["query"]>
    >["data"]
  >;
}

const StepUpdateForm: FC<StepUpdateFormProps> = ({ step, className }) => {
  const utils = api.useUtils();

  const { mutate, isPending } = api.db.work_step_template.update.useMutation({
    onSuccess: ({ data }) => {
      toast.success("Step updated successfully");
      if (!data) return;
      form.reset({
        name: data.name,
        description: data.description || "",
        id: step.id,
      });
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
    onSettled: () => {
      utils.db.work_step_template.getStepsByWorkPlanTemplate.invalidate({
        work_plan_template_id: step.work_plan_template_id,
      });
    },
  });

  useEffect(() => {
    form.reset({
      name: step.name,
      description: step.description || "",
      id: step.id,
    });
  }, [step]);

  // react-hook-form
  const form = useForm<TUpdateWorkStepTemplateSchema>({
    resolver: zodResolver(ZUpdateWorkStepTemplateSchema),
    defaultValues: {
      name: step.name,
      description: step.description || "",
      id: step.id,
    },
  });

  async function onSubmit(data: TUpdateWorkStepTemplateSchema) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
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
              <FormLabel>Step description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your step here..."
                  className="max-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" placeholder={step.id} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button isLoading={isPending}>
            Update now
            <span className="sr-only">Update now</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default StepUpdateForm;
