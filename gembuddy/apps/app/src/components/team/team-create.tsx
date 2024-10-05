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
  TCreateTeamSchema,
  ZCreateTeamSchema,
} from "@/trpc/server/routes/team/create.schema";

interface CreateTeamFormProps extends React.HTMLAttributes<HTMLFormElement> {
  workspace_id: string;
}

const CreateTeamForm: FC<CreateTeamFormProps> = ({
  workspace_id,
  className,
}) => {
  const { mutate, isPending } = api.db.team.create.useMutation({
    onSuccess: () => {
      toast.success("Team created successfully");
      form.reset();
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateTeamSchema>({
    resolver: zodResolver(ZCreateTeamSchema),
    defaultValues: {
      name: "",
      identity: "",
      workspace_id: workspace_id,
    },
  });

  async function onSubmit(data: TCreateTeamSchema) {
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
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="identity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifier</FormLabel>
              <FormDescription>
                The identifier is used to create a unique URL for your team.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder={isGenerating ? "Loading..." : "example"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workspace_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={isGenerating ? "Loading..." : "example"}
                  type="hidden"
                  {...field}
                />
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

export default CreateTeamForm;
