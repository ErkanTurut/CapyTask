import { AssignedResourceTable } from "@/components/tables/assigned-resource/assigned-resource-table";
import { trpc } from "@/trpc/server";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { data, count } = await trpc.db.assigned_resource.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });
  if (!data) {
    return null;
  }
  return <AssignedResourceTable data={data} rowCount={count || 0} />;
}
