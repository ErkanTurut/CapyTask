"use client";

import React, { use } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { catchError, cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { api, RouterInput } from "@/trpc/client";
import {
  TCreateWorkOrderWithItemsSchema,
  ZCreateWorkOrderWithItemsSchema,
} from "@/trpc/server/routes/work_order/create.schema";
import { notFound, useParams, useRouter } from "next/navigation";
import { WorkOrderGeneralForm } from "./work-order-general-form";
import { WorkOrderItemsForm } from "./work-order-items-form";

interface WorkOrderCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  initialData?: RouterInput["db"]["work_order"]["create"];
}

export function WorkOrderCreateForm({
  className,
  initialData,
}: WorkOrderCreateFormProps) {
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
      company_id: undefined,
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

  console.log(form.formState.errors);
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
          <CardContent className="flex flex-col gap-8 pt-6">
            <WorkOrderGeneralForm form={form} />
            <WorkOrderItemsForm form={form} />
          </CardContent>

          <CardFooter>
            <Button isLoading={isPending} disabled={!form.formState.isDirty}>
              Create now
              <span className="sr-only">Create now</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
