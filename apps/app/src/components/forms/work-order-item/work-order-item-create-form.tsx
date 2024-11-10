"use client";

import type React from "react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gembuddy/ui/form";
import { Input } from "@gembuddy/ui/input";

import { catchError, cn } from "@/lib/utils";

import { Button } from "@gembuddy/ui/button";

import { type RouterOutput, api } from "@gembuddy/trpc/client";

import {
  type TCreateWorkOrderItemSchema,
  ZCreateWorkOrderItemSchema,
} from "@gembuddy/trpc/schema/work_order_item";
import { Textarea } from "@gembuddy/ui/textarea";
import { toast } from "sonner";
import { AssetSelector } from "../asset-selector";
import { LocationSelector } from "../location-selector";
interface WorkOrderItemCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  work_order_id: string;
  onCreated?: (
    workOrder: RouterOutput["db"]["work_order_item"]["create"],
  ) => void;
}

export function WorkOrderItemCreateForm({
  className,
  work_order_id,
  onCreated,
}: WorkOrderItemCreateFormProps) {
  const [selectedLocation, setSelectedLocation] = useState<
    | NonNullable<
        RouterOutput["db"]["location"]["get"]["textSearch"]["data"]
      >[number]
    | undefined
  >(undefined);

  const [selectedAsset, setSelectedAsset] = useState<
    | NonNullable<
        RouterOutput["db"]["asset"]["get"]["textSearch"]["data"]
      >[number]
    | undefined
  >(undefined);

  const utils = api.useUtils();

  const { mutate, isPending } = api.db.work_order_item.create.useMutation({
    onSuccess(data) {
      form.reset();

      if (data) {
        onCreated?.(data);
      }
      toast.success("Work order item created successfully");
      utils.db.work_order_item.get.byWorkOrder.invalidate({ work_order_id });
    },
    onError(err) {
      catchError(new Error(err.message));
    },
  });

  // react-hook-form
  const form = useForm<TCreateWorkOrderItemSchema>({
    resolver: zodResolver(ZCreateWorkOrderItemSchema),
    defaultValues: {
      location_id: undefined,
      asset_id: undefined,
      work_order_id,
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: TCreateWorkOrderItemSchema) {
    mutate(data);
  }

  const handleLocationSelect = (
    location: NonNullable<
      RouterOutput["db"]["location"]["get"]["textSearch"]["data"]
    >[number],
  ) => {
    if (selectedLocation?.id === location.id) {
      setSelectedLocation(undefined);
      form.resetField("location_id");
    } else {
      setSelectedLocation(location);
      form.setValue("location_id", location.id);
    }
  };

  const handleAssetSelect = (
    asset: NonNullable<
      RouterOutput["db"]["asset"]["get"]["textSearch"]["data"]
    >[number],
  ) => {
    if (selectedAsset?.id === asset.id) {
      setSelectedAsset(undefined);
      form.resetField("asset_id");
    } else {
      setSelectedAsset(asset);
      form.setValue("asset_id", asset.id);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-32"
                  placeholder="example"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="location_id"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <LocationSelector
                  onSelect={handleLocationSelect}
                  selectedValue={selectedLocation}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="asset_id"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <AssetSelector
                  onSelect={handleAssetSelect}
                  selectedValue={selectedAsset}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isPending}>
          Create
        </Button>
      </form>
    </Form>
  );
}
