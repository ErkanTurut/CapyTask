"use client";

import { useFieldArray } from "react-hook-form";

import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";

import { Icons } from "@/components/icons";
import { ModalSearchCommand } from "@/components/modal-search-command";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { api } from "@/trpc/client";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./asset-table/columns";

export function WorkOrderAsset({
  form,
}: {
  form: UseFormReturn<TCreateWorkOrderWithItemsSchema>;
}) {
  const {
    append,
    remove,
    fields: assets,
  } = useFieldArray({
    control: form.control,
    name: "asset",
    keyName: "fieldId",
  });
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { data: assetResult, isPending } = api.db.asset.get.textSearch.useQuery(
    {
      query: inputValue,
    },
    { refetchOnMount: false },
  );

  return (
    <div className="w-full">
      <div className="h-72">
        <Button
          type="button"
          className="w-96 justify-start"
          variant={"outline"}
          onClick={(e) => setOpen(!open)}
        >
          <Icons.search className="mr-2 h-4 w-4" />
          Add new asset
        </Button>
        <ModalSearchCommand
          setInputValue={setInputValue}
          open={open}
          isLoading={isPending}
          setOpen={setOpen}
        >
          {assetResult?.map((asset, index) => (
            <CommandItem
              disabled={assets.some((a) => a.id === asset.id)}
              value={asset.name + asset.description}
              key={index}
              onSelect={() => {
                if (assets.some((a) => a.id === asset.id)) {
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
        {/* 
        <WorkSteps form={form} assetTable={table} /> */}
      </div>
    </div>
  );
}
