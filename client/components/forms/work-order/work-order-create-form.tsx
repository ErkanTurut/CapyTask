"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { catchError, cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { api } from "@/trpc/client";
import {
  TCreateWorkOrderSchema,
  TCreateWorkOrderWithStepsSchema,
  ZCreateWorkOrderSchema,
  ZCreateWorkOrderWithStepsSchema,
} from "@/trpc/server/routes/work_order/create.schema";
import { useRouter } from "next/navigation";
import { General } from "./general";
import { WorkSteps } from "./work-steps";
import { Separator } from "@/components/ui/separator";

interface WorkOrderCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  workspace_id: string;
}

export function WorkOrderCreateForm({ className }: WorkOrderCreateFormProps) {
  const router = useRouter();

  const { mutate, isPending } = api.db.work_order.create.useMutation({
    onSuccess(data) {
      form.reset();
      router.push(`./${data?.work_order.id}`);
    },
    onError(err) {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateWorkOrderSchema>({
    resolver: zodResolver(ZCreateWorkOrderSchema),
    defaultValues: {
      company_id: "4doRuGC8pE",
      name: undefined,
      description: undefined,
      location_id: "xc9zBwVtbm",
      source: "MANUAL_ENTRY",
      team_id: "4pGki9KGYX",
      type: "MAINTENANCE",
      work_step: [],
      asset: [],
      priority: "LOW",
      status: "OPEN",
    },
  });

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...args) =>
          void form.handleSubmit((data) => {
            mutate(data);
          })(...args)
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>
              Fill in the general information about the work order
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <General form={form} />
              <Tabs defaultValue="work-steps" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="work-steps">Work steps</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="ressources">Ressources</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="work-steps"
                  className="rounded-md border bg-muted/40"
                >
                  <WorkSteps form={form} />
                </TabsContent>
                <TabsContent value="assets"></TabsContent>
                <TabsContent value="ressources"></TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              isLoading={isPending}
              disabled={!form.formState.isDirty || !form.formState.isValid}
            >
              Create now
              <span className="sr-only">Create now</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
