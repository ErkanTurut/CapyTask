import { TimelineList } from "@/components/dashboard/work-order/components/timeline-list";
import { Shell } from "@/components/shells";
import { formatTimeToNow } from "@/lib/utils";
import type { Database, Tables } from "@gembuddy/supabase/types";
import { trpc } from "@gembuddy/trpc/server";
import { Button } from "@gembuddy/ui/button";
import { Icons } from "@gembuddy/ui/icons";
import { Separator } from "@gembuddy/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@gembuddy/ui/tooltip";
type PageProps = {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { data } = await trpc.db.work_order_history.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });

  const { data: notes } = await trpc.db.note.get.byEntity({
    entity_id: params.work_order_id,
    entity_type: "work_order",
  });
  if (!data || data.length === 0) {
    return "No data";
  }
  return (
    <Shell>
      <div className="border p-2 rounded-md bg-muted flex flex-col gap-2 w-full overflow-hidden ">
        <div className="flex items-center">
          <p className="text-xs text-muted-foreground font-mono">
            work order <span className="font-bold text-primary">#32434</span>
          </p>
        </div>
        <p className="text-sm">
          lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
          veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur excepteur sint
          occaecat cupidatat non proident sunt in culpa qui officia deserunt
          mollit anim id est laborum
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            written by <span className="font-bold text-primary">Mike</span>,{" "}
            {formatTimeToNow(new Date())}
          </span>
          <Tooltip delayDuration={900}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={"ghost"}
                className="h-5 w-5 text-muted-foreground"
              >
                <Icons.PaperPlane className="size-4 -rotate-45" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>reply to this note</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <TimelineList workOrderHistory={data} />
    </Shell>
  );
}
