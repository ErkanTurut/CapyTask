"use client";

import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gembuddy/ui/form";

import { Input } from "@gembuddy/ui/input";
import { catchError, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@gembuddy/ui/button";

import { api } from "@/trpc/client";

import { useRouter } from "next/navigation";
import {
  TAssetCreateSchema,
  ZAssetCreateSchema,
} from "@gembuddy/trpc/server/routes/asset/create.schema";

interface AssetCreateFormProps extends React.HTMLAttributes<HTMLFormElement> {
  team_id: string;
  workspace_id: string;
}

export default function AssetCreateForm({
  className,
  team_id,
  workspace_id,
}: AssetCreateFormProps) {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate, isPending } = api.db.asset.create.useMutation({
    onSuccess: async ({ data }) => {
      toast.success("Team created successfully");
      form.reset();
      utils.db.asset.get.invalidate(undefined, {
        refetchType: "all",
      });
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TAssetCreateSchema>({
    resolver: zodResolver(ZAssetCreateSchema),
    defaultValues: {
      name: "",

      description: "",
      workspace_id,
    },
  });

  async function onSubmit(data: TAssetCreateSchema) {
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
              <FormLabel>Asset name</FormLabel>
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
              <FormLabel>Asset description</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={!form.formState.isDirty} isLoading={isPending}>
          Create now
          <span className="sr-only">Create now</span>
        </Button>
      </form>
    </Form>
  );
}
