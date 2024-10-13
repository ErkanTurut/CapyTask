import { FC } from "react";
import { trpc } from "@gembuddy/trpc/server";
import { TableData } from "./TableData";
import { WorkOrderTable } from "./new/work-order-table";
interface TableProps {
  // searchParams: { [key: string]: string | string[] | undefined };
  params: {
    team_identity: string;
  };
  searchParams: {
    limit: string;
    page: string;
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
  from: z.number().optional(),
  to: z.number().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

const TableContainer: FC<TableProps> = async ({ searchParams, params }) => {
  // const search = searchParamsSchema.parse(searchParams);
  // console.log(searchParams);

  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;

  const initialData = trpc.db.work_order.get.byTeam({
    team_identity: params.team_identity,
    range: {
      from: 1,
      to: 10,
    },
  });

  return (
    <TableData
      initialData={initialData}
      params={params}
      searchParams={{
        page: page,
        limit: limit,
      }}
    />
    // <WorkOrderTable initialData={initialData} />
  );
};

export default TableContainer;
