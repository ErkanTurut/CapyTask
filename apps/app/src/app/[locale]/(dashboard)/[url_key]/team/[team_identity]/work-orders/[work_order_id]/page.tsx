import { WorkOrderItemCreateModal } from "@/components/modal/work-order-item/work-order-create-modal";
import { Shell } from "@/components/shells";
import { WorkOrderItemTable } from "@/components/tables/work-order-item/work-order-item-table";
import { trpc } from "@gembuddy/trpc/server";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { data: work_order_item, count } =
    await trpc.db.work_order_item.get.byWorkOrder({
      work_order_id: params.work_order_id,
    });

  if (!work_order_item) {
    return null;
  }
  return (
    <Shell>
      <WorkOrderItemCreateModal work_order_id={params.work_order_id} />
      <WorkOrderItemTable data={work_order_item} rowCount={count ?? 0} />
    </Shell>
  );
}
