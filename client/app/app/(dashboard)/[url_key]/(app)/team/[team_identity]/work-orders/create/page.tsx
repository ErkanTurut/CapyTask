import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateWorkOrderForm from "@/components/work-order/work-order-create-form";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateWorkOrderWithTemplate } from "@/components/work-order/CreateWorkOrderWithTemplate";
import { trpc } from "@/trpc/server";

interface createWorkOrderProps {
  params: {
    url_key: string;
    team_identity: string;
  };
}

export default async function createWorkOrder({
  params,
}: createWorkOrderProps) {
  const { data: work_plan_template } =
    await trpc.db.work_plan_template.getWorkPlanTemplatesByIdentity({
      team_identity: params.team_identity,
      range: { start: 0, end: 10 },
    });
  return (
    <Shell variant="markdown" className="gap-2">
      <PageHeader
        className="pb-4"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Create a new work order
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">Create</PageHeaderDescription>
      </PageHeader>

      <Tabs defaultValue="auto" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="auto">Auto</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="auto">
          <Card>
            <CardHeader>
              <CardTitle>Auto work order creation</CardTitle>
              <CardDescription>
                Create a work order automatically by selecting a template.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback="loading...">
                <CreateWorkOrderWithTemplate
                  initialData={work_plan_template || []}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Create work order manually</CardTitle>
              <CardDescription>
                Create a work order manually by filling out the form and
                creating steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback="loading...">
                <CreateWorkOrderForm />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
