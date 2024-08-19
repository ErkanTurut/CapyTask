import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { WorkOrderTabs } from "@/components/dashboard/work-order/work-order-tabs";
import { RouterOutput } from "@/trpc/server/trpc";
import { PrioritySelector } from "./priority-selector";
import { StatusSelector } from "./status-selector";

interface WorkOrderHeaderProps {
  work_order: NonNullable<RouterOutput["db"]["work_order"]["get"]["detail"]>;
}

export default async function WorkOrderHeader({
  work_order,
}: WorkOrderHeaderProps) {
  return (
    <div className="grid gap-4 border-b sm:grid-cols-2">
      <PageHeader
        id="work-order-header"
        aria-labelledby="work-order-header-heading"
        as="header"
      >
        <PageHeaderHeading size="xs">{work_order.name}</PageHeaderHeading>
        <PageHeaderDescription size="xs">
          {work_order.description}
        </PageHeaderDescription>
      </PageHeader>
      <section className="flex items-center gap-2 rounded-sm">
        <StatusSelector status={work_order.status} />
        <PrioritySelector status={work_order.priority} />
      </section>

      <WorkOrderTabs />
    </div>
  );
}
