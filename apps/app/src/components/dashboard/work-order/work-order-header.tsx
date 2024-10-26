import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { WorkOrderTabs } from "@/components/dashboard/work-order/work-order-tabs";
import type { RouterOutput } from "@gembuddy/trpc/client";
import { api } from "@gembuddy/trpc/client";
import { PrioritySelector } from "./priority-selector";
import { StatusSelector } from "./status-selector";
import { WorkOrderStatus } from "./work-order-status";

interface WorkOrderHeaderProps {
  workOrder: NonNullable<RouterOutput["db"]["work_order"]["get"]["byId"]>;
}

export async function WorkOrderHeader({ workOrder }: WorkOrderHeaderProps) {
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
        <PageHeaderHeading size="xs">{workOrder.data.name}</PageHeaderHeading>
        <PageHeaderDescription size="xs">
          {workOrder.data.description}
        </PageHeaderDescription>
      </PageHeader>
      <section className="flex items-center gap-2 rounded-sm">
        <WorkOrderStatus workOrderQuery={workOrder} />
        {/* <PrioritySelector status={work_order.priority} /> */}
      </section>
      <WorkOrderTabs className="col-span-full" />
    </div>
  );
}
