"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader } from "@gembuddy/ui/drawer";
import { useQueryState, parseAsBoolean } from "nuqs";
import { WorkOrderCreateForm } from "../forms/work-order/work-order-create-form";
import { api } from "@/trpc/client";
import { useParams, useRouter } from "next/navigation";

export function CreateWorkOrderSheet() {
  const params = useParams() as { team_identity: string };
  const [open, setOpen] = useQueryState(
    "create",
    parseAsBoolean.withDefault(false)
  );
  const utils = api.useUtils();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const { data: team } = api.db.team.getByIdentity.useQuery({
    identity: params.team_identity,
  });

  if (!team) {
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
              team_id={team.id}
              workspace_id={team.workspace_id}
              onCreated={async (value) => {
                utils.db.work_order.get.byTeamIdentity.invalidate();

                await setOpen(null);

                router.push(`./work-orders/${value.id}`);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open>
      <DrawerContent className="p-6">
        <DrawerHeader className="mb-8 flex flex-row items-center justify-between">
          <h2 className="text-xl">Create Project</h2>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
