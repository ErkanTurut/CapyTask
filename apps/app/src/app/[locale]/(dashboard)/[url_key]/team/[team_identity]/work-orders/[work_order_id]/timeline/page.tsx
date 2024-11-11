import { TimelineList } from "@/components/dashboard/work-order/components/timeline-list";
import { Shell } from "@/components/shells";
import { formatTimeToNow } from "@/lib/utils";
import type { Database, Tables } from "@gembuddy/supabase/types";
import { trpc } from "@gembuddy/trpc/server";
import { Icons } from "@gembuddy/ui/icons";
import { Separator } from "@gembuddy/ui/separator";
type PageProps = {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { data } = await trpc.db.work_order_history.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });
  if (!data || data.length === 0) {
    return "No data";
  }
  return (
    <Shell>
      <TimelineList workOrderHistory={data} />
    </Shell>
  );
}
