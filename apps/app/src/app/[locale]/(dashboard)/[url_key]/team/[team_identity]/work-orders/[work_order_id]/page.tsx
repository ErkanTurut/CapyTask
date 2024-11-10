import { WorkOrderItemCreateSheet } from "@/components/sheets/work-order-item/work-ordre-item-create-scheet";
import { Shell } from "@/components/shells";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { WorkOrderItemTable } from "@/components/tables/work-order-item/work-order-item-table";
import { trpc } from "@gembuddy/trpc/server";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    url_key: string;
    team_identity: string;
    work_order_id: string;
  }>;
  searchParams: Promise<{
    wo_item: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const asyncWorkOrderItemQuery = trpc.db.work_order_item.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });
  return (
    <Shell>
      <WorkOrderItemCreateSheet work_order_id={params.work_order_id} />
      <Suspense fallback={<TableSkeleton />}>
        <WorkOrderItemTable
          work_order_id={params.work_order_id}
          asyncWorkOrderItemQuery={asyncWorkOrderItemQuery}
        />
      </Suspense>
    </Shell>
  );
}
