import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { WorkOrderTabs } from "@/components/dashboard/work-order/work-order-tabs";
import type { RouterOutput } from "@gembuddy/trpc/client";

import { Suspense } from "react";
import { WorkOrderActions } from "./work-order-actions";
interface WorkOrderHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  workOrder: NonNullable<RouterOutput["db"]["work_order"]["get"]["byId"]>;
}

export async function WorkOrderHeader({
  workOrder,
  children,
}: WorkOrderHeaderProps) {
  if (!workOrder.data) {
    return null;
  }

  return (
    <div className="grid gap-4 border-b bg-background p-6 pb-0 sm:grid-cols-2">
      <PageHeader
        id="work-order-header"
        aria-labelledby="work-order-header-heading"
        as="header"
      >
        <PageHeaderHeading size="xs">
          {workOrder.data.name}/{children}
        </PageHeaderHeading>
        <PageHeaderDescription size="xs">
          {workOrder.data.description}
        </PageHeaderDescription>
      </PageHeader>

      <Suspense>
        <WorkOrderActions workOrderQuery={workOrder} />
      </Suspense>
      <Suspense>
        <WorkOrderTabs className="col-span-full" />
      </Suspense>
    </div>
  );
}
