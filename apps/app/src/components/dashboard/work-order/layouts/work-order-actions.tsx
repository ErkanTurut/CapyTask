"use client";

import { type RouterOutput, api } from "@gembuddy/trpc/client";
import { useParams } from "next/navigation";
import { WorkOrderStatus } from "../components/status-selector";

type workOrderActionsProps = {
  workOrderQuery: NonNullable<RouterOutput["db"]["work_order"]["get"]["byId"]>;
};

export function WorkOrderActions({ workOrderQuery }: workOrderActionsProps) {
  const params = useParams() as { work_order_id: string | undefined };
  if (!params.work_order_id) {
    return null;
  }
  const {
    data: { data: workOrder },
  } = api.db.work_order.get.byId.useQuery(
    {
      id: params.work_order_id,
    },
    {
      initialData: workOrderQuery,
    },
  );

  if (!workOrder) {
    return null;
  }
  return (
    <section className="flex items-center gap-2 rounded-sm">
      <WorkOrderStatus workOrder={workOrder} />
      {/* <PrioritySelector status={work_order.priority} /> */}
    </section>
  );
}
