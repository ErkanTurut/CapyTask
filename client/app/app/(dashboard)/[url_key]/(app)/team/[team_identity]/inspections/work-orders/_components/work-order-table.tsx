import { DataTable } from "@/components/table/data-table";
import { FC } from "react";
import { columns } from "./columns";
import { trpc } from "@/trpc/server";
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

const WorkOrderTable: FC<plansTableProps> = async ({ props, params }) => {
  const { data: inspection, count } =
    await trpc.db.inspection.get.byTeamIdentity.query({
      team_identity: params.team_identity,
      range: { start: props.offset, end: props.offset + props.limit * 2 },
    });

  return (
    <DataTable columns={columns} count={count || 0} data={inspection || []} />
  );
};

export default WorkOrderTable;
