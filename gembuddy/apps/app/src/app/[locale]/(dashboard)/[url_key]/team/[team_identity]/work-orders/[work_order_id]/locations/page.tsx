import { trpc } from "@gembuddy/trpc/server";

import { Card, CardContent, CardHeader, CardTitle } from "@gembuddy/ui/card";
import { LocationTable } from "@/components/tables/location/work-order-item-table";
import { Shell } from "@/components/shells";
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
  return (
    <Shell>
      <LocationTable data={data} rowCount={count || 0} />
    </Shell>
  );
}
