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
import { api } from "@/trpc/client";
import { useRouter } from "next/navigation";

interface CreatePlanFormProps extends React.HTMLAttributes<HTMLFormElement> {
  team: Database["public"]["Tables"]["team"]["Row"];
  url_key: string;
}

const CreatePlanForm: FC<CreatePlanFormProps> = ({
  url_key,
  team,
  className,
}) => {
  const router = useRouter();
  const { mutate, isPending } = api.db.template.inspection.create.useMutation({
    onSuccess: (data, variables) => {
      toast.success("Team created successfully");
      form.reset();
      router.refresh();
    },
    onError: (err) => {
      catchError(new Error(err.message));
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
    mutate(data);
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
          <Button isLoading={isPending}>
            Create now
            <span className="sr-only">Create now</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreatePlanForm;
