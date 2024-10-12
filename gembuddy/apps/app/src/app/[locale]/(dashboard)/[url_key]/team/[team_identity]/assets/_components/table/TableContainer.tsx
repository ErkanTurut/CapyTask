import { FC } from "react";
import { trpc } from "@gembuddy/trpc/server";
import { TableData } from "./TableData";
interface TableProps {
  searchParams: {
    limit: number;
    page: number;
  };
  params: {
    team_identity: string;
  };
}

const TableContainer: FC<TableProps> = async ({ searchParams, params }) => {
  const initialData = await trpc.db.asset.get.byTeam({
    team_identity: params.team_identity,
    range: {
      start: (searchParams.page - 1) * searchParams.limit,
      end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
    },
  });

  return (
    <TableData
      initialData={initialData}
      params={params}
      searchParams={searchParams}
    />
  );
};

export default TableContainer;
