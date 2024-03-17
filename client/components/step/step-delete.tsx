"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { api } from "@/trpc/client";
import {
  TUpdateStepSchema,
  ZUpdateStepSchema,
} from "@/trpc/routes/template/step/update.schema";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/server";

interface StepDeleteFormProps extends React.HTMLAttributes<HTMLFormElement> {
  step: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["template"]["step"]["get"]["query"]>
    >["data"]
  >;

  size?: "default" | "icon";
}

const StepDeleteForm: FC<StepDeleteFormProps> = ({
  step,
  className,
  size = "default",
}) => {
  const router = useRouter();

  const { mutate, isPending } = api.db.template.step.delete.useMutation({
    onSuccess: () => {
      toast.success("Step deleted successfully");
      router.refresh();
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

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
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" placeholder={step.id} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size={size} variant={"destructive"} isLoading={isPending}>
          <Icons.trash />
          {size === "default" && "Delete the step"}
          <span className="sr-only"> Delete the step </span>
        </Button>
      </form>
    </Form>
  );
};

export default StepDeleteForm;
