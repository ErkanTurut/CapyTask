"use client";

import { Table } from "@tanstack/react-table";
import { Icons } from "@/components/icons";

import { Button, buttonVariants } from "@gembuddy/ui/button";
import { Input } from "@gembuddy/ui/input";
import { DataTableViewOptions } from "@/components/tables/general/data-table-view-options";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DefinedUseTRPCQueryResult } from "@trpc/react-query/shared";
import { useState } from "react";

interface DataTableToolbarProps<TDataRow, TData, TError> {
  table: Table<TDataRow>;
  queryResult?: DefinedUseTRPCQueryResult<TData, TError>;
}

export function DataTableToolbar<TDataRow, TData, TError>({
  table,
  queryResult,
}: DataTableToolbarProps<TDataRow, TData, TError>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const pathname = usePathname() ?? "";

  //disable refetch for 1 minute before enabling it again
  const [isRefetchDisabled, setIsRefetchDisabled] = useState(false);

  const FetchButton = () => {
    if (!queryResult) {
      return null;
    }
    const { isFetching, refetch, isStale } = queryResult;

    return (
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        disabled={isRefetchDisabled || !isStale}
        onClick={() => {
          refetch();
        }}
      >
        <Icons.spinner
          className={cn(
            "h-4 w-4",
            isFetching && "animate-spin duration-700 ease-in-out"
          )}
        />
      </Button>
    );
  };

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
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            <Icons.cross className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {<FetchButton />}

        <DataTableViewOptions table={table} />
        <Link
          className={buttonVariants({ size: "sm" })}
          href={`${pathname}/create`}
        >
          <Icons.plusCircled className="mr-2 h-4 w-4" />
          Create
        </Link>
      </div>
    </div>
  );
}
