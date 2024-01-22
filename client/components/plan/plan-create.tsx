"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { catchError, cn } from "@/lib/utils";

import {
  createPlan,
  TCreatePlan,
  ZCreatePlan,
} from "@/lib/service/plan/actions/create";
import { useAction } from "@/lib/hooks/use-actions";
import { Button } from "@/components/ui/button";

import { FC } from "react";
import { Database } from "@/types/supabase.types";

interface CreatePlanFormProps extends React.HTMLAttributes<HTMLFormElement> {
  team: Database["public"]["Tables"]["team"]["Row"];
  url_key: string;
}

const CreatePlanForm: FC<CreatePlanFormProps> = ({
  url_key,
  team,
  className,
}) => {
  const { run, isLoading } = useAction(createPlan, {
    onSuccess: (data) => {
      toast.success("Team created successfully");
      form.reset();
    },
    onError: (err) => {
      catchError(new Error(err));
    },
  });

  // react-hook-form
  const form = useForm<TCreatePlan>({
    resolver: zodResolver(ZCreatePlan),
    defaultValues: {
      name: "",
      description: "",
      team_id: team.id,
    },
  });

  async function onSubmit(data: TCreatePlan) {
    run({
      name: data.name,
      description: data.description,
      team_id: data.team_id,
    });
  }

  const [isGenerating, setIsGenerating] = useState(false);

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
        <FormField
          control={form.control}
          name="team_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button isLoading={isLoading}>
            Create now
            <span className="sr-only">Create now</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreatePlanForm;
