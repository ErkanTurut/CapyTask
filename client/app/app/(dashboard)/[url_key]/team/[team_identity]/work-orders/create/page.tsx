import { WorkOrderCreateForm } from "@/components/forms/work-order/work-order-create-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

interface createWorkOrderProps {
  params: {
    url_key: string;
    team_identity: string;
  };
}

export default async function createWorkOrder({
  params,
}: createWorkOrderProps) {
  return (
    <ScrollArea className="h-full">
      <Shell>
        <PageHeader
          id="work-plan-template-header"
          aria-labelledby="work-plan-template-header-heading"
        >
          <PageHeaderHeading size="sm">Create work order</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Work plan template are reusable templates that can be used to create
            work plans for your work orders.
          </PageHeaderDescription>
          <Separator />
        </PageHeader>

        <Suspense fallback={<CardSkeleton />}>
          {/* <WorkOrderCreateForm /> */}
        </Suspense>
      </Shell>
    </ScrollArea>
  );
}
