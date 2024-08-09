"use client";

import { useFieldArray } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";

import type { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { ModalSearchCommand } from "@/components/modal-search-command";
import { CommandItem } from "@/components/ui/command";
import { Icons } from "@/components/icons";
import { api, RouterOutput } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./asset-table/data-table";
import { columns } from "./asset-table/columns";
import { Shell } from "@/components/shells";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { StepModal, WorkSteps } from "./work-steps";

export function WorkOrderAsset({
  form,
}: {
  form: UseFormReturn<TCreateWorkOrderWithItemsSchema>;
}) {
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "asset",
    keyName: "fieldId",
  });
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { data, isPending } = api.db.asset.get.textSearch.useQuery(
    {
      query: inputValue,
    },
    { refetchOnMount: false },
  );

  const table = useReactTable({
    data: fields,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="grid h-72 grid-cols-2 gap-8">
        <div>
          <Button
            type="button"
            className="w-full justify-start"
            variant={"outline"}
            onClick={(e) => setOpen(!open)}
          >
            <Icons.search className="mr-2 h-4 w-4" />
            Search for an asset
          </Button>
          <ModalSearchCommand
            setInputValue={setInputValue}
            open={open}
            isLoading={isPending}
            setOpen={setOpen}
          >
            {data?.map((asset, index) => (
              <CommandItem
                disabled={fields.some((a) => a.id === asset.id)}
                value={asset.name + asset.description}
                key={index}
                onSelect={() => {
                  if (fields.some((a) => a.id === asset.id)) {
                    return;
                  }
                  append(asset);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <span>{asset.name}</span>
              </CommandItem>
            ))}
          </ModalSearchCommand>
          <DataTable columns={columns} table={table} />
        </div>

        <WorkSteps form={form} assetTable={table} />
      </div>
    </div>
  );
}
