import { AssignedResourceTable } from "@/components/tables/assigned-resource/assigned-resource-table";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import TestButton from "./testButton";

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
    <TestButton
      range={{
        from: work_order.sheduled_start!,
        to: work_order.sheduled_end!,
      }}
    />
  );
}
