"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { api } from "@/trpc/client";
import { FC } from "react";
import {
  TCreateInspcetionSchema,
  ZCreateInspcetionSchema,
} from "@/trpc/routes/inspection/create.schema";

interface CreateInspectionFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  team_id: string;
}

const CreateInspectionForm: FC<CreateInspectionFormProps> = ({ className }) => {
  const { mutate, isPending } = api.db.inspection.create.useMutation({
    onSuccess: () => {
      toast.success("Team created successfully");
      form.reset();
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateInspcetionSchema>({
    resolver: zodResolver(ZCreateInspcetionSchema),
    defaultValues: {
      name: "",
      team_id: "",
      description: "",
      inspection_snapshot_id: "",
    },
  });

  async function onSubmit(data: TCreateInspcetionSchema) {
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
              <FormLabel>Inspection name</FormLabel>
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
              <FormLabel>Inspection description</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button isLoading={isPending}>
            Create now
            <span className="sr-only">Create now</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateInspectionForm;
