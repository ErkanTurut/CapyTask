import { DataTable } from "./data-table";
import { FC } from "react";
import { columns } from "./columns";
import { trpc } from "@/trpc/server";
interface plansTableProps {
  searchParams: {
    limit: number;
    page: number;
  };
  params: {
    team_identity: string;
  };
}

const WorkOrderTable: FC<plansTableProps> = async ({
  searchParams,
  params,
}) => {
  const data = await trpc.db.work_order.get.byTeamIdentity.query({
    team_identity: params.team_identity,
    range: {
      start: (searchParams.page - 1) * searchParams.limit,
      end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
    },
  });
  return <DataTable params={params} columns={columns} initialData={data} />;
};

export default WorkOrderTable;
