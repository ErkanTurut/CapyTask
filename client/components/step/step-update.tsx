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

import { TUpdateStep, ZUpdateStep } from "@/lib/service/step/actions/update";
import { api } from "@/trpc/client";
import { Textarea } from "@/ui/textarea";
import { useRouter } from "next/navigation";

interface StepUpdateFormProps extends React.HTMLAttributes<HTMLFormElement> {
  step: Database["public"]["Tables"]["step"]["Row"];
}

const StepUpdateForm: FC<StepUpdateFormProps> = ({ step, className }) => {
  const router = useRouter();
  const { mutate, isPending } = api.db.step.update.useMutation({
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
  const form = useForm<TUpdateStep>({
    resolver: zodResolver(ZUpdateStep),
    defaultValues: {
      name: step.name,
      description: step.description || "",
      id: step.id,
    },
  });

  async function onSubmit(data: TUpdateStep) {
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
