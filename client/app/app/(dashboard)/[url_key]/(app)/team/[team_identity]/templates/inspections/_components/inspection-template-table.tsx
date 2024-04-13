import { DataTable } from "./data-table";
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

const InspectionTemplateTable: FC<plansTableProps> = async ({
  props,
  params,
}) => {
  const initialData = await trpc.db.template.inspection.get.byTeamId.query({
    team_identity: params.team_identity,
    range: { start: props.offset, end: props.offset + props.limit * 2 },
  });

  return (
    <DataTable
      columns={columns}
      initialData={initialData || { data: [], count: 0 }}
      params={params}
    />
  );
};

export default InspectionTemplateTable;
