"use client";

import { Table } from "@tanstack/react-table";
import { Icons } from "@/components/icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table?: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          // value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("title")?.setFilterValue(event.target.value)
          // }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <Button variant="default" className="gap-1">
        Create case
        <Icons.plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
