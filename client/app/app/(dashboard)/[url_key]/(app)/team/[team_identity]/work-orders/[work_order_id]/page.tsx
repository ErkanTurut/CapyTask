import { AssetTable } from "@/components/tables/asset/asset-table";
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
        <AssetTable
          data={work_order.asset}
          rowCount={work_order._asset[0].count}
        />
      </div>
    </div>
  );
}
