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

type NoteCardProps = {
  content: string;
  created_at: string;
  created_by: string;
};

export function NoteCard({ content, created_at, created_by }: NoteCardProps) {
  return (
    <div className="border p-2 rounded-md bg-muted flex flex-col gap-2 w-full overflow-hidden ">
      <div className="flex items-center">
        <p className="text-xs text-muted-foreground font-mono">
          work order{" "}
          <span className="font-bold text-primary">#{created_by}</span>
        </p>
      </div>
      <p className="text-sm">{content}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">
          written by{" "}
          <span className="font-bold text-primary">{created_by}</span>,{" "}
          {formatTimeToNow(new Date(created_at))}
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
  );
}
