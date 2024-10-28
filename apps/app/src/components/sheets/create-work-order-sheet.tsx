"use client";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { api } from "@gembuddy/trpc/client";
import { Button } from "@gembuddy/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@gembuddy/ui/drawer";
import { Input } from "@gembuddy/ui/input";
import { Label } from "@gembuddy/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@gembuddy/ui/sheet";
import { Textarea } from "@gembuddy/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import { WorkOrderCreateForm } from "../forms/work-order/work-order-create-form";

export function CreateWorkOrderSheet() {
  const params = useParams() as { team_identity: string };
  const [open, setOpen] = useQueryState(
    "create",
    parseAsBoolean.withDefault(false),
  );
  const utils = api.useUtils();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  console.log(params);
  const { data: team } = api.db.team.get.byIdentity.useQuery({
    identity: params.team_identity,
  });

  console.log(team);

  if (!team || !team.data) {
    return null;
  }
  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={() => setOpen(null)}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-xl">Create Work Order</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col justify-between">
            <WorkOrderCreateForm
              team_id={team.data.id}
              workspace_id={team.data.workspace_id}
              onCreated={async (value) => {
                utils.db.work_order.get.byTeam.invalidate();

                await setOpen(null);

                router.push(`./work-orders/${value.data?.id}`);
              }}
            />
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
        <WorkOrderCreateForm
          team_id={team.data.id}
          workspace_id={team.data.workspace_id}
          onCreated={async (value) => {
            utils.db.work_order.get.byTeam.invalidate();

            await setOpen(null);

            router.push(`./work-orders/${value.data?.id}`);
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}
