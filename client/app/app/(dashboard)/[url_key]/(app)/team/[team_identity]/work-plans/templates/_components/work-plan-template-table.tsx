import { trpc } from "@/trpc/server";
import { FC } from "react";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

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

const WorkPlanTemplateTable: FC<plansTableProps> = async ({
  props,
  params,
}) => {
  const initialData = await trpc.db.work_plan_template.get.byTeamId.query({
    team_identity: params.team_identity,
    range: { start: props.offset, end: props.offset + props.limit * 2 },
  });

  return (
    <DataTable params={params} columns={columns} initialData={initialData} />
  );
};

export default WorkPlanTemplateTable;
