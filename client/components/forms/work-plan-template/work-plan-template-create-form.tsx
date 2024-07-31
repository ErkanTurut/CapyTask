"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { catchError, cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { api } from "@/trpc/client";
import { useRouter } from "next/navigation";
import {
  TCreateWorkPlanTemplateSchema,
  ZCreateWorkPlanTemplateSchema,
} from "@/trpc/server/routes/work_plan_template/create.schema";
import { Textarea } from "@/components/ui/textarea";

interface WorkPlanTemplateCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  url_key: string;
}

export function WorkPlanTemplateCreateForm({
  url_key,

  className,
}: WorkPlanTemplateCreateFormProps) {
  const router = useRouter();

  const utils = api.useUtils();

  // react-hook-form
  const form = useForm<TCreateWorkPlanTemplateSchema>({
    resolver: zodResolver(ZCreateWorkPlanTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      workspace_id: "",
    },
  });

  async function onSubmit(data: TCreateWorkPlanTemplateSchema) {
    // mutate(data);
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <Card>
          <CardHeader>
            <CardTitle>Create</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="example" {...field} />
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
                    <Input type="hidden" placeholder="example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button isLoading={false} disabled={!form.formState.isDirty}>
              Create now
              <span className="sr-only">Create now</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
