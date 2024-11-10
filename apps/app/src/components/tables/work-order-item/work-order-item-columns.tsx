"use client";

import { Checkbox } from "@gembuddy/ui/checkbox";
import {
  AccessorColumnDef,
  type ColumnDef,
  ColumnDefBase,
  type RowData,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

import { WorkOrderItemStatus } from "@/components/dashboard/work-order-item/work-order-item-status";
import { type RouterOutput, api } from "@gembuddy/trpc/client";
import Link from "next/link";
import { toast } from "sonner";
import type { Leaves } from "../types";
import { statuses } from "./work-order-item-table";

interface ColumnType<TData extends RowData, TValue = unknown>
  extends Omit<ColumnDef<TData, TValue>, "accessoryKey"> {
  accessorKey: (string & {}) | Leaves<TData>;
}

export function getColumns(): ColumnType<
  NonNullable<
    RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"]
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Link href={`./${row.original.work_order_id}/${row.original.id}`}>
              <span className="max-w-[8.25rem] truncate text-primary underline-offset-2 underline">
                {row.original.name}
              </span>
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[8.25rem] truncate">
              {row.original.description}
            </span>
          </div>
        );
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
        const utils = api.useUtils();
        const { mutate, isPending } =
          api.db.work_order_item.update.withNote.useMutation({
            onSuccess: () => {
              toast.success("Status updated successfully");
              utils.db.work_order_item.get.byWorkOrder.invalidate();
            },
          });

        return (
          <div className="flex max-w-[6.25rem] items-center">
            {row.original.status}
            {/* <WorkOrderItemStatus workOrderItem={row.original} statusConfig={} onStatusChange={(newStatus, note)=> {mutate(
              {
                id: row.original.id,
                status: newStatus,
                work_order_item_id:  row.original.id,
                note: note,
              }
            )} } /> */}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "location_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[8.25rem] truncate">
              {row.original.location?.name}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "location_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location type" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[8.25rem] truncate">
              {row.original.location?.location_type}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.original.location?.location_type);
      },
    },
  ];
}
