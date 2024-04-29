"use client";

import { Icons } from "@/components/icons";
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button, buttonVariants } from "@/ui/button";
import { Input } from "@/ui/input";

import { trpc } from "@/trpc/server";
import Link from "next/link";

interface DataTableToolbarProps {
  table: Table<
    NonNullable<
      Awaited<
        ReturnType<(typeof trpc)["db"]["work_order"]["get"]["byId"]>
      >["data"]
    >
  >;
}

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h- w-[150px] lg:w-[250px]"
        />
        {/* {
          <DataTableFacetedFilter
            column={table.getColumn("")}
            title="Status"
            options={table.get}
          />
        } */}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Icons.cross className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <Link className={buttonVariants({ size: "sm" })} href={`./create`}>
          Create
          <Icons.plusCircled className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
