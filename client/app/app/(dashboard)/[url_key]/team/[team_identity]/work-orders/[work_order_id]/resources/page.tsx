import { trpc } from "@/trpc/server";
import { CreateServiceAppointment } from "./create-service-appointment";
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
  return <CreateServiceAppointment work_order={work_order} />;
}
