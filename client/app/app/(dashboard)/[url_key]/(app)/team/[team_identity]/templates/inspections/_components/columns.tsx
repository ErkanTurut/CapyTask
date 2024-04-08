"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import type { trpc } from "@/trpc/server";

export const columns: ColumnDef<
  NonNullable<
    Awaited<
      ReturnType<
        (typeof trpc)["db"]["template"]["inspection"]["get"]["byId"]["query"]
      >
    >["data"]
  >
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
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`./inspections/${row.original.id}`}
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "underline",
          )}
        >
          {row.original.name}
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created at" />;
    },
    cell: ({ row }) => {
      return new Date(row.original.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Updated at" />;
    },
    cell: ({ row }) => {
      return new Date(row.original.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
