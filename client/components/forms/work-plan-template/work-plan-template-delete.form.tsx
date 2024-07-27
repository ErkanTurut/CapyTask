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
  CardDescription,
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
  TDeleteWorkPlanTemplateSchema,
  ZDeleteWorkPlanTemplateSchema,
} from "@/trpc/server/routes/work_plan_template/delete.schema";
import { useRouter } from "next/navigation";
import { z } from "zod";

interface WorkPlanTemplateDeleteFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  work_plan_template: NonNullable<
    RouterOutput["db"]["work_plan_template"]["get"]["byId"]
  >;
}

export function WorkPlanTemplateDeleteForm({
  work_plan_template,
  className,
}: WorkPlanTemplateDeleteFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate, isPending } = api.db.work_plan_template.delete.useMutation({
    onSuccess: async (data, variables) => {
      toast.success("Work plan template deleted successfully");
      router.back();
      utils.db.work_plan_template.get.byTeamId.invalidate();
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });
  const DeleteWorkPlanTemplateFormSchema = ZDeleteWorkPlanTemplateSchema.merge(
    z.object({
      name: z.string(),
      confirm_name: z
        .string()
        .refine((value) => value === work_plan_template.name, {
          message: "Name does not match",
        }),
    }),
  );
  // react-hook-form
  const form = useForm<z.infer<typeof DeleteWorkPlanTemplateFormSchema>>({
    resolver: zodResolver(DeleteWorkPlanTemplateFormSchema),
    values: {
      id: work_plan_template.id,
      confirm_name: "",
      name: work_plan_template.name,
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
        <Card className="border-destructive shadow-sm">
          <CardHeader>
            <CardTitle>Delete Work Plan Template</CardTitle>
            <CardDescription>
              Permanently delete this work plan template. This action cannot be
              undone. Please type the name of the work plan template to confirm.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="confirm_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm work plan template name to delete
                  </FormLabel>
                  <FormControl>
                    <Input className="max-w-80" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-destructive">
            <Button
              variant={"destructive"}
              isLoading={isPending}
              disabled={!form.formState.isValid}
            >
              Delete
              <span className="sr-only">Delete</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
