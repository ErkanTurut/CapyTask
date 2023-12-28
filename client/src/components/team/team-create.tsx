"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { catchError } from "@/lib/utils";

import { createTeam, TCreateTeam, ZCreateTeam } from "@/lib/actions/team";
import { useAction } from "@/hooks/use-actions";
import { Button } from "../ui/button";

import { FC } from "react";

interface CreateTeamFormProps {
  workspace_id: string;
}

const CreateTeamForm: FC<CreateTeamFormProps> = ({ workspace_id }) => {
  const router = useRouter();
  const { run, isLoading } = useAction(createTeam, {
    onSuccess: (data) => {
      toast.success("Team created successfully");
      router.refresh();
      // router.push(`/${data.url_key}`);
    },
    onError: (err) => {
      catchError(err);
    },
  });

  // react-hook-form
  const form = useForm<TCreateTeam>({
    resolver: zodResolver(ZCreateTeam),
    defaultValues: {
      name: "",
      url_key: "",
      workspace_id: workspace_id,
    },
  });

  async function onSubmit(data: TCreateTeam) {
    console.log("ok");
    run({
      name: data.name,
      url_key: data.url_key,
      workspace_id,
    });
  }
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
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
          name="url_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifier</FormLabel>
              <FormControl>
                <Input
                  className="lowercase"
                  placeholder="exmpl"
                  {...field}
                  maxLength={
                    //@ts-ignore
                    ZCreateTeam["shape"]["url_key"]["_def"]["checks"].find(
                      (check) => check.kind === "max"
                      // @ts-ignore
                    ).value || 0
                  }
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
