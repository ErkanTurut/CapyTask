"use client";

import type React from "react";

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
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/client";
import {
  TCreateWorkStepTemplateSchema,
  ZCreateWorkStepTemplateSchema,
} from "@/trpc/server/routes/work_step_template/create.schema";

interface WorkStepTemplateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  work_plan_template_id: string;
}

export function WorkStepTemplateCreateForm({
  work_plan_template_id,
  className,
}: WorkStepTemplateFormProps) {
  const utils = api.useUtils();

  const form = useForm<TCreateWorkStepTemplateSchema>({
    resolver: zodResolver(ZCreateWorkStepTemplateSchema),
    values: {
      name: "",
      description: undefined,
      parent_id: undefined,
      work_plan_template_id,
    },
  });

  const { isPending, mutate } = api.db.work_step_template.create.useMutation({
    onSuccess: async (data, variables) => {
      toast.success("Updated successfully");

      form.reset(variables);
    },
    onError: (err, data, ctx) => {
      catchError(new Error(err.message));
    },
    onSettled: () => {
      utils.db.work_plan_template.get.byId.invalidate({
        id: work_plan_template_id,
      });
    },
  });

  return (
    <Card className={cn("", className)}>
      <Form {...form}>
        <form
          onSubmit={(...args) =>
            void form.handleSubmit((data) => {
              mutate(data);
            })(...args)
          }
        >
          <CardHeader>
            <CardTitle>Create</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-none text-lg font-semibold leading-none tracking-tight shadow-none focus-visible:ring-0"
                      placeholder="example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-1 overflow-y-auto">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="example"
                        className="min-h-full resize-none border-none shadow-none focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              disabled={!form.formState.isDirty || isPending}
              isLoading={isPending}
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
