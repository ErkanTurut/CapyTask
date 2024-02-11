"use client";

import { Table } from "@tanstack/react-table";
import { Icons } from "@/components/icons";

import { Button, buttonVariants } from "@/ui/button";
import { Input } from "@/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Database } from "@/types/supabase.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<Database["public"]["Tables"]["plan"]["Row"]>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
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
        <Link
          className={buttonVariants({ size: "sm" })}
          href={`${pathname}/create`}
        >
          Create Plan
          <Icons.plusCircled className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
