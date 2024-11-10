import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
import { Separator } from "@gembuddy/ui/separator";
import { Suspense } from "react";

interface createWorkOrderProps {
  params: Promise<{
    url_key: string;
    team_identity: string;
  }>;
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
