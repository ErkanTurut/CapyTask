"use client";

import { Checkbox } from "@gembuddy/ui/checkbox";
import {
  ColumnDef,
  AccessorColumnDef,
  RowData,
  ColumnDefBase,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

import { RouterOutput } from "@gembuddy/trpc/client";
import { statuses } from "./service-appointment-table";
import { Leaves } from "../types";

interface ColumnType<TData extends RowData, TValue = unknown>
  extends Omit<ColumnDef<TData, TValue>, "accessoryKey"> {
  accessorKey: (string & {}) | Leaves<TData>;
}

export function getColumns(): ColumnType<
  NonNullable<
    RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]["data"]
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
      accessorKey: "id",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="ID" />;
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[11.25rem] truncate font-medium">
              {row.original.id}
            </span>
          </div>
        );
      },
      enableHiding: false,
      filterFn: (row, id, value) => {
        return value.includes(row.original.id);
      },
    },
    {
      accessorKey: "work_order_item_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title="Work Order Item" />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[11.25rem] truncate font-medium">
              {row.original.work_order_item_id}
            </span>
          </div>
        );
      },
      enableHiding: false,
      filterFn: (row, id, value) => {
        return value.includes(row.original.work_order_item_id);
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status"),
        );

        if (!status) {
          return null;
        }

        return (
          <div className="flex max-w-[6.25rem] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "start_date",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Start Date" />;
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[21.25rem] truncate font-medium">
              {row.original.start_date}
            </span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "end_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Date" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[8.25rem] truncate">
              {row.original.end_date}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];
}
