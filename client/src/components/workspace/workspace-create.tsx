"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { createWorkspaceSchema } from "@/lib/validations/workspace";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

import { toast } from "sonner";
import { catchError } from "@/utils";
import SubmitButton from "../submit-button";
import { createWorkspace } from "@/lib/services/workspace/actions";

type Inputs = z.infer<typeof createWorkspaceSchema>;

export function CreateWorspaceForm() {
  const router = useRouter();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      urlKey: "",
    },
  });

  async function onSubmit(data: Inputs) {
    try {
      const res = await createWorkspace(data);
      if (res.error) {
        throw new Error(res.error?.message || "Something went wrong");
      }
      toast.success("Workspace created successfully");
      router.refresh();
      router.push(`/${data.urlKey}`);
    } catch (err) {
      catchError(err);
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        action={(...args) => void form.handleSubmit(onSubmit)(...args)}
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
          name="urlKey"
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

        <SubmitButton>
          Create now
          <span className="sr-only">Create now</span>
        </SubmitButton>
      </form>
    </Form>
  );
}
