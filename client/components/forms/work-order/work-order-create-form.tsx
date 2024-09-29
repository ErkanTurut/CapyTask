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

import { api, RouterOutput } from "@/trpc/client";
import { useRouter } from "next/navigation";

import { Textarea } from "@/components/ui/textarea";
import {
  TCreateWorkOrderSchema,
  ZCreateWorkOrderSchema,
} from "@/trpc/server/routes/work_order/create.schema";
import { CompanySelector } from "./company-selector";

interface WorkOrderCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  workspace_id: string;
  team_id: string;
  onCreated?: (
    workOrder: RouterOutput["db"]["work_order"]["get"]["byId"],
  ) => void;
}

export function WorkOrderCreateForm({
  className,
  workspace_id,
  team_id,
  onCreated,
}: WorkOrderCreateFormProps) {
  const [selectedCompany, setSelectedCompany] = useState<
    RouterOutput["db"]["company"]["get"]["textSearch"][number] | undefined
  >(undefined);
  const { mutate, isPending } = api.db.work_order.create.useMutation({
    onSuccess(data) {
      form.reset();
      onCreated?.(data);
    },
    onError(err) {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateWorkOrderSchema>({
    resolver: zodResolver(ZCreateWorkOrderSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      workspace_id,
      company_id: undefined,
      team_id,
    },
  });

  async function onSubmit(data: TCreateWorkOrderSchema) {
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
                <Textarea
                  className="max-h-32"
                  placeholder="example"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CompanySelector
                  onSelect={(value) => {
                    setSelectedCompany(value);
                    form.setValue("company_id", value.id);
                  }}
                  selectedValue={selectedCompany}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Create
        </Button>
      </form>
    </Form>
  );
}
