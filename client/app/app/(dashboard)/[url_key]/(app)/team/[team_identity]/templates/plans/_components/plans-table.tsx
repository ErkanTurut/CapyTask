import { DataTable } from "@/components/table/data-table";
import { FC } from "react";
import { columns } from "./columns";
import { trpc } from "@/trpc/server";
import { sleep } from "@/lib/utils";
interface plansTableProps {
  props: {
    offset: number;
    limit: number;
    page: number;
  };
  params: {
    team_identity: string;
  };
}

const PlansTable: FC<plansTableProps> = async ({ props, params }) => {
  const { data: plans, count } = await trpc.db.plan.getPlansByIdentity.query({
    team_identity: params.team_identity,
    range: { start: props.offset, end: props.offset + props.limit * 2 },
  });
  return <DataTable columns={columns} count={count || 0} data={plans || []} />;
};

export default PlansTable;
