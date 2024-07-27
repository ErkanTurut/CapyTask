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

import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

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

interface WorkPlanTemplateGeneralFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  work_plan_template: NonNullable<
    RouterOutput["db"]["work_plan_template"]["get"]["byId"]
  >;
}

export function WorkPlanTemplateGeneralForm({
  work_plan_template,
  className,
}: WorkPlanTemplateGeneralFormProps) {
  const { mutate, isPending } = api.db.work_plan_template.update.useMutation({
    onSuccess: async (data, variables) => {
      toast.success("Updated successfully");
      form.reset(variables);
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TUpdateWorkPlanTemplateSchema>({
    resolver: zodResolver(ZUpdateWorkPlanTemplateSchema),
    values: {
      id: work_plan_template.id,
      name: work_plan_template.name,
      description: work_plan_template.description || "",
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
                  <FormLabel>Plan name</FormLabel>
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
                  <FormLabel>Plan description</FormLabel>
                  <FormControl>
                    <Input placeholder="example" {...field} />
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
