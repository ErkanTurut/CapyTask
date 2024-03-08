"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/types/supabase.types";
import React, { FC, use, useEffect } from "react";

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

import { useAction } from "@/lib/hooks/use-actions";
import {
  TUpdateStep,
  ZUpdateStep,
  updateStep,
} from "@/lib/service/step/actions/update";
import { Textarea } from "@/ui/textarea";
import { revalidateTag } from "next/cache";

interface StepUpdateFormProps extends React.HTMLAttributes<HTMLFormElement> {
  step: Database["public"]["Tables"]["step"]["Row"];
}

const StepUpdateForm: FC<StepUpdateFormProps> = ({ step, className }) => {
  const { run, isLoading } = useAction(updateStep, {
    onSuccess: (data) => {
      toast.success("Step updated successfully");
      form.reset({
        name: data.name,
        description: data.description || "",
        id: data.id,
      });
    },
    onError: (err) => {
      catchError(new Error(err));
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
  const form = useForm<TUpdateStep>({
    resolver: zodResolver(ZUpdateStep),
    defaultValues: {
      name: step.name,
      description: step.description || "",
      id: step.id,
    },
  });

  async function onSubmit(data: TUpdateStep) {
    await run(data);
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
          <Button isLoading={isLoading}>
            Update now
            <span className="sr-only">Update now</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default StepUpdateForm;
