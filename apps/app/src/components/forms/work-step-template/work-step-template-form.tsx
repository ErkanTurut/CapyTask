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
} from "@gembuddy/ui/form";
import { Input } from "@gembuddy/ui/input";

import { Button } from "@gembuddy/ui/button";
import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gembuddy/ui/card";
import { Textarea } from "@gembuddy/ui/textarea";
import { api, RouterOutput } from "@gembuddy/trpc/client";
import {
  TUpdateWorkStepTemplateSchema,
  ZUpdateWorkStepTemplateSchema,
} from "@gembuddy/trpc/schema/work_step_template";

interface WorkStepTemplateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  initialData: NonNullable<
    RouterOutput["db"]["work_step_template"]["get"]["byId"]
  >;
  work_step_template_id: string;
}

export function WorkStepTemplateForm({
  initialData,
  work_step_template_id,
  className,
}: WorkStepTemplateFormProps) {
  const utils = api.useUtils();

  const { data: work_step_template, refetch } =
    api.db.work_step_template.get.byId.useQuery(
      { id: work_step_template_id },
      { initialData: initialData },
    );
  if (!work_step_template || !work_step_template.data) return null;

  const form = useForm<TUpdateWorkStepTemplateSchema>({
    resolver: zodResolver(ZUpdateWorkStepTemplateSchema),
    values: {
      id: work_step_template.data.id,
      name: work_step_template.data.name,
      description: work_step_template.data.description || "",
    },
  });

  const { isPending, mutate } = api.db.work_step_template.update.useMutation({
    onSuccess: async (data, variables) => {
      toast.success("Updated successfully");

      form.reset(variables);
    },
    onError: (err, data, ctx) => {
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
            <CardTitle>{work_step_template.data.name}</CardTitle>
            <CardDescription>
              {work_step_template.data.description}
            </CardDescription>
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
              disabled={!form.formState.isDirty || isPending}
              isLoading={isPending}
            >
              Save
              <span className="sr-only">Save update</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
