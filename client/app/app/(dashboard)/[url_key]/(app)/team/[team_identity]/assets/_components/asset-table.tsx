import { FC } from "react";
import { columns } from "./columns";
import { trpc } from "@/trpc/server";
import { DataTable } from "@/components/table/data-table";
interface TableProps {
  searchParams: {
    limit: number;
    page: number;
  };
  params: {
    team_identity: string;
  };
}

const AssetTable: FC<TableProps> = async ({ searchParams, params }) => {
  const { data, count } = await trpc.db.asset.get.byTeam({
    team_identity: params.team_identity,
    range: {
      start: (searchParams.page - 1) * searchParams.limit,
      end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
    },
  });

  return (
    <DataTable
      filter={{ columnVisibility: { description: false } }}
      columns={columns}
      data={data}
      count={count || 0}
    />
  );
};

export default AssetTable;
