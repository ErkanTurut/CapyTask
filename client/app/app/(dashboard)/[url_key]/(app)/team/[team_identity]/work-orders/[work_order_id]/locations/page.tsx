import { trpc } from "@/trpc/server";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const location = await trpc.db.location.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });

  console.log(location);
  return <div>locations</div>;
}
