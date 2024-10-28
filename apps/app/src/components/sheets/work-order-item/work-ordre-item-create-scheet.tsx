"use client";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@gembuddy/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@gembuddy/ui/sheet";
import { parseAsBoolean, useQueryState } from "nuqs";
import { WorkOrderItemCreateForm } from "../../forms/work-order-item/work-order-item-create-form";

interface WorkOrderItemCreateSheetProps {
  work_order_id: string;
}

export function WorkOrderItemCreateSheet({
  work_order_id,
}: WorkOrderItemCreateSheetProps) {
  const [open, setOpen] = useQueryState(
    "create",
    parseAsBoolean.withDefault(false),
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={() => setOpen(null)}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-xl">Create Work Order Item</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col justify-between">
            <WorkOrderItemCreateForm work_order_id={work_order_id} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={() => setOpen(null)}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle>Create Work Order Item</DrawerTitle>
        </DrawerHeader>
        <WorkOrderItemCreateForm work_order_id={work_order_id} />
      </DrawerContent>
    </Drawer>
  );
}
