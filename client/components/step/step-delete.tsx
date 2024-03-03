"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/types/supabase.types";
import React, { FC, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import { useAction } from "@/lib/hooks/use-actions";
import {
  TUpdateStep,
  ZUpdateStep,
  updateStep,
} from "@/lib/service/step/actions/update";
import { Icons } from "@/components/icons";
import { deleteStep } from "@/lib/service/step/actions/delete";
import { useRouter } from "next/navigation";

interface StepDeleteFormProps extends React.HTMLAttributes<HTMLFormElement> {
  step: Database["public"]["Tables"]["step"]["Row"];
  size?: "default" | "icon";
}

const StepDeleteForm: FC<StepDeleteFormProps> = ({
  step,
  className,
  size = "default",
}) => {
  const router = useRouter();

  const { run, isLoading } = useAction(deleteStep, {
    onSuccess: (data) => {
      toast.success("Step deleted successfully");
      router.push(`./steps`);
    },
    onError: (err) => {
      catchError(new Error(err));
    },
  });

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
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" placeholder={step.id} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size={size} variant={"destructive"} isLoading={isLoading}>
          <Icons.trash />
          {size === "default" && "Delete the step"}
          <span className="sr-only"> Delete the step </span>
        </Button>
      </form>
    </Form>
  );
};

export default StepDeleteForm;
