"use client";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Database } from "@/types/supabase.types";
import React, { useState } from "react";
import { notFound } from "next/navigation";

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

import { toast } from "sonner";
import { catchError, cn } from "@/lib/utils";

import {
  updateTeam,
  TUpdateTeam,
  ZUpdateTeam,
} from "@/lib/service/team/actions/update";
import { useAction } from "@/lib/hooks/use-actions";

interface StepUpdateFormProps extends React.HTMLAttributes<HTMLFormElement> {
  step: Database["public"]["Tables"]["step"]["Row"];
}

const StepUpdateForm: FC<StepUpdateFormProps> = ({ step, className }) => {
  return null;

  // const { run, isLoading } = useAction(updateTeam, {
  //   onSuccess: (data) => {
  //     toast.success("Team created successfully");
  //     form.reset({
  //       name: data.name,
  //       identity: data.identity,
  //     });
  //   },
  //   onError: (err) => {
  //     catchError(new Error(err));
  //   },
  // });

  // // react-hook-form
  // const form = useForm<TUpdateTeam>({
  //   resolver: zodResolver(ZUpdateTeam),
  //   defaultValues: {
  //     name: team.name,
  //     identity: team.identity,
  //     id: team.id,
  //   },
  // });

  // async function onSubmit(data: TUpdateTeam) {
  //   if (!team) return notFound();
  //   await run({
  //     name: data.name,
  //     identity: data.identity,
  //     id: team.id,
  //   });
  // }

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
                    ZUpdateTeam["shape"]["identity"]["_def"]["checks"].find(
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

export default StepUpdateForm;
