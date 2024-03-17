"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/types/supabase.types";
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

import {
  TUpdateStepSchema,
  ZUpdateStepSchema,
} from "@/trpc/routes/template/step/update.schema";
import { api } from "@/trpc/client";
import { Textarea } from "@/ui/textarea";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/server";

interface StepUpdateFormProps extends React.HTMLAttributes<HTMLFormElement> {
  step: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["template"]["step"]["get"]["query"]>
    >["data"]
  >;
}

const StepUpdateForm: FC<StepUpdateFormProps> = ({ step, className }) => {
  const router = useRouter();
  const { mutate, isPending } = api.db.template.step.update.useMutation({
    onSuccess: ({ data }) => {
      if (!data) return;
      toast.success("Step updated successfully");
      form.reset({
        name: data.name,
        description: data.description || "",
        id: data.id,
      });
      router.refresh();
    },
    onError: (err) => {
      catchError(new Error(err.message));
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
  const form = useForm<TUpdateStepSchema>({
    resolver: zodResolver(ZUpdateStepSchema),
    defaultValues: {
      name: step.name,
      description: step.description || "",
      id: step.id,
    },
  });

  async function onSubmit(data: TUpdateStepSchema) {
    console.log(data);
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
