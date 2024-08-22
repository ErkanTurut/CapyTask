import { trpc } from "@/trpc/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationTable } from "@/components/tables/location/work-order-item-table";
interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { data, count } = await trpc.db.location.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });
  if (!data) {
    return null;
  }
  return <LocationTable data={data} rowCount={count || 0} />;
}
