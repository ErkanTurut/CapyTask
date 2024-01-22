"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
  createTeam,
  TCreateTeam,
  ZCreateTeam,
} from "@/lib/service/team/actions/create";
import { useAction } from "@/lib/hooks/use-actions";
import { Button } from "@/components/ui/button";

import { FC } from "react";
import { useTeam, useUser, useWorkspace } from "@/lib/store";
import { revalidateTag } from "next/cache";

interface CreateTeamFormProps extends React.HTMLAttributes<HTMLFormElement> {
  workspace_id: string;
  url_key: string;
}

const CreateTeamForm: FC<CreateTeamFormProps> = ({
  url_key,
  workspace_id,
  className,
}) => {
  const { run, isLoading } = useAction(createTeam, {
    onSuccess: (data) => {
      toast.success("Team created successfully");
      form.reset();
    },
    onError: (err) => {
      catchError(new Error(err));
    },
  });

  // react-hook-form
  const form = useForm<TCreateTeam>({
    resolver: zodResolver(ZCreateTeam),
    defaultValues: {
      name: "",
      identity: "",
      workspace_id: workspace_id,
    },
  });

  async function onSubmit(data: TCreateTeam) {
    run({
      name: data.name,
      identity: data.identity,
      workspace_id: workspace_id,
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
                  maxLength={
                    //@ts-ignore
                    ZCreateTeam["shape"]["identity"]["_def"]["checks"].find(
                      (check) => check.kind === "max",
                      // @ts-ignore
                    ).value || 0
                  }
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
          <Button isLoading={isLoading}>
            Create now
            <span className="sr-only">Create now</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateTeamForm;
