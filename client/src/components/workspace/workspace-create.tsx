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
import { catchError } from "@/utils";

import {
  createWorkspace,
  TCreateWorkspace,
  ZCreateWorkspace,
} from "@/lib/actions/workspace";
import { useAction } from "@/hooks/use-actions";
import { Button } from "../ui/button";

export function CreateWorspaceForm() {
  const router = useRouter();
  const { run, isLoading } = useAction(createWorkspace, {
    onSuccess: (data) => {
      toast.success("Workspace created successfully");
      router.refresh();
      router.push(`/dashboard/${data.url_key}`);
    },
    onError: (err) => {
      catchError(err);
    },
  });

  // react-hook-form
  const form = useForm<TCreateWorkspace>({
    resolver: zodResolver(ZCreateWorkspace),
    defaultValues: {
      name: "",
      url_key: "",
    },
  });

  async function onSubmit(data: TCreateWorkspace) {
    run({ name: data.name, url_key: data.url_key });
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
              <FormLabel>Workspace name</FormLabel>
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
              <FormLabel>Workspace Url</FormLabel>
              <FormControl>
                <Input
                  className="lowercase"
                  placeholder="gembuddy.app/"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button isLoading={isLoading}>
          Create now
          <span className="sr-only">Create now</span>
        </Button>
      </form>
    </Form>
  );
}
