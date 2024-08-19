import { WorkOrderItemTable } from "@/components/tables/work-order-item/work-order-item-table";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const work_order = await trpc.db.work_order.get.detail({
    id: params.work_order_id,
  });

  if (!work_order) {
    return notFound();
  }
  return (
    <div className="flex h-full flex-col gap-2 rounded-md">
      <div className="grid h-full">
        <WorkOrderItemTable
          data={work_order.work_order_item}
          rowCount={work_order._work_order_item[0].count}
        />
      </div>
    </div>
  );
}
