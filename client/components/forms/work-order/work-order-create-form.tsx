"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { catchError, cn, formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/client";
import {
  TCreateWorkOrderWithItemsSchema,
  ZCreateWorkOrderWithItemsSchema,
} from "@/trpc/server/routes/work_order/create.schema";
import { notFound, useParams, useRouter } from "next/navigation";
import { General } from "./general";
import { WorkSteps } from "./work-steps";

interface WorkOrderCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

export function WorkOrderCreateForm({ className }: WorkOrderCreateFormProps) {
  const router = useRouter();
  const { team_identity, url_key } = useParams() as {
    team_identity: string;
    url_key: string;
  };

  const [team, {}] = api.db.team.getByIdentity.useSuspenseQuery({
    identity: team_identity,
  });
  const [{ data: workspace }, {}] =
    api.db.workspace.getByUrlKey.useSuspenseQuery({
      url_key,
    });

  if (!team || !workspace) {
    throw notFound();
  }

  if (!team_identity || !url_key) {
    throw new Error("Missing team_identity or url_key");
  }

  const { mutate, isPending } = api.db.work_order.create.useMutation({
    onSuccess(data) {
      router.push(`./${data?.work_order.id}`);
      form.reset();
    },
    onError(err) {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateWorkOrderWithItemsSchema>({
    resolver: zodResolver(ZCreateWorkOrderWithItemsSchema),
    defaultValues: {
      company_id: "4doRuGC8pE",
      name: undefined,
      description: undefined,
      location_id: "xc9zBwVtbm",
      source: "MANUAL_ENTRY",
      team_id: team.id,
      type: "MAINTENANCE",
      work_step: [],
      asset: [],
      priority: "LOW",
      status: "OPEN",
      workspace_id: workspace.id,
      sheduled_start: undefined,
      sheduled_end: undefined,
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
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,0.1rem,1fr]">
              <General form={form} />
              <Separator orientation="vertical" className="hidden md:block" />
              <Separator orientation="horizontal" className="block md:hidden" />
              <Tabs defaultValue="work-steps" className="w-full grid-cols-2">
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
