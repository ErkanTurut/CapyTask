import { FC } from "react";
import { trpc } from "@/trpc/server";
import { TableData } from "./TableData";
import { WorkOrderTable } from "./new/work-order-table";
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
  const initialData = trpc.db.work_order.get.byTeamIdentity({
    team_identity: params.team_identity,
    range: {
      start: (searchParams.page - 1) * searchParams.limit,
      end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
    },
  });

  return (
    // <TableData
    //   initialData={initialData}
    //   params={params}
    //   searchParams={searchParams}
    // />
    <WorkOrderTable initialData={initialData} />
  );
};

export default TableContainer;
