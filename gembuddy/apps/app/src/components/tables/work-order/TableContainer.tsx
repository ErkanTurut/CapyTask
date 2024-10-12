import { FC } from "react";
import { trpc } from "@gembuddy/trpc/server";
import { TableData } from "./TableData";
import { WorkOrderTable } from "./new/work-order-table";
interface TableProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {
    team_identity: string;
  };
}

import * as z from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

const TableContainer: FC<TableProps> = async ({ searchParams, params }) => {
  const search = searchParamsSchema.parse(searchParams);
  console.log(search);
  console.log(searchParams);

  const initialData = trpc.db.work_order.get.byTeamIdentity({
    team_identity: params.team_identity,
    range: {
      start: 1,
      end: 10,
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
