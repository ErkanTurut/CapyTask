"use client";

import React from "react";

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
import { Database } from "@/types/supabase.types";
import { FC } from "react";
import {
  TUpdateTeamSchema,
  ZUpdateTeamSchema,
} from "@/trpc/routes/team/update.schema";

interface UpdateTeamFormProps extends React.HTMLAttributes<HTMLFormElement> {
  team: Database["public"]["Tables"]["team"]["Row"];
}

const UpdateTeamForm: FC<UpdateTeamFormProps> = ({ team, className }) => {
  const { isPending, mutate } = api.db.team.update.useMutation({
    onSuccess: ({ data }) => {
      if (!data) return;
      toast.success("Team created successfully");
      form.reset({
        name: data.name,
        identity: data.identity,
        id: data.id,
        description: data.description || "",
        image_uri: data.image_uri || "",
      });
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  const form = useForm<TUpdateTeamSchema>({
    resolver: zodResolver(ZUpdateTeamSchema),
    defaultValues: {
      name: team.name,
      identity: team.identity,
      id: team.id,
      description: team.description || "",
      image_uri: team.image_uri || "",
    },
  });

  async function onSubmit(data: TUpdateTeamSchema) {
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
                <Input placeholder={"example"} {...field} />
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

export default UpdateTeamForm;
