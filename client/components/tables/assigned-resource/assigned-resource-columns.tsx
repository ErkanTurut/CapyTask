"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  AccessorColumnDef,
  RowData,
  ColumnDefBase,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

import { RouterOutput } from "@/trpc/client";
import { Leaves } from "@/types";

interface ColumnType<TData extends RowData, TValue = unknown>
  extends Omit<ColumnDef<TData, TValue>, "accessoryKey"> {
  accessorKey: (string & {}) | Leaves<TData>;
}

export function getColumns(): ColumnType<
  NonNullable<
    RouterOutput["db"]["assigned_resource"]["get"]["byWorkOrder"]["data"]
  >[number]
>[] {
  return [
    {
      id: "select",
      accessorKey: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "service_resource.user_id",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="user id" />;
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[11.25rem] truncate font-medium">
              {row.original.service_resource?.user_id}
            </span>
          </div>
        );
      },
      enableHiding: false,
      filterFn: (row, id, value) => {
        return value.includes(row.original.service_resource?.user_id);
      },
    },
  ];
}
