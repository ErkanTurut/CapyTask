"use client";

import { DataTableColumnHeader } from "@/components/tables/general/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";
import { ColumnDef } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<
  NonNullable<TCreateWorkOrderWithItemsSchema["asset"]>[number]
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
    cell: ({ row }) => {
      return <div className="w-40">{row.original.name}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-52 truncate font-medium">
            {row.original.description}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Location" />;
    },
    cell: ({ row }) => {
      return (
        <div className="h-10 w-40 overflow-hidden overflow-ellipsis">
          {row.original.location?.name}
        </div>
      );
    },
    enableHiding: false,
  },
];
