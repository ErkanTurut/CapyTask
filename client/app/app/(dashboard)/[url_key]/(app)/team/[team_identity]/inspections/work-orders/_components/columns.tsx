"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import type { trpc } from "@/trpc/server";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<
  NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["inspection"]["get"]["byId"]["query"]>
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
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return <Badge variant={"dashed"}>{row.original.status}</Badge>;
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
    header: ({ column, table }) => {
      return (
        (table.getIsSomePageRowsSelected() ||
          table.getIsAllPageRowsSelected()) && (
          <Button
            variant="ghost"
            className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        )
      );
      // const utils = api.useUtils();
      // const { mutate: remove } = api.db.inspection.delete.useMutation({
      //   onSuccess: () => {
      //     toast.success("Inspection deleted successfully!");
      //   },
      //   onError: (err) => {
      //     toast.error(err.message);
      //   },
      //   onSettled: async () => {
      //     utils.db.inspection.get.invalidate();
      //     table.resetRowSelection();
      //   },
      // });
      // const handleDelete = async () => {
      //   const selectedRows = table.getSelectedRowModel().rows;
      //   const selectedRows_id = selectedRows.map((row) => row.original.id);
      //   remove({ id: selectedRows_id });
      // };
      // return (
      //   (table.getIsSomePageRowsSelected() ||
      //     table.getIsAllPageRowsSelected()) && (
      //     <Button
      //       variant="destructive"
      //       size="icon"
      //       onClick={() => handleDelete()}
      //     >
      //       <Icons.trash className=" h-4 w-4" />
      //     </Button>
      //   )
      // );
    },
    cell: ({ row, table }) => {
      return <DataTableRowActions row={row} table={table} />;
    },
  },
];
