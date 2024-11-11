import { Shell } from "@/components/shells";
import { formatTimeToNow } from "@/lib/utils";
import type { RouterOutput } from "@gembuddy/trpc/client";
import { Icons } from "@gembuddy/ui/icons";

interface PageProps {
  workOrderHistory: RouterOutput["db"]["work_order_history"]["get"]["byWorkOrder"]["data"];
}

export function TimelineList({ workOrderHistory }: PageProps) {
  if (!workOrderHistory) {
    return <div>no data</div>;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col gap-4 p-1">
        {workOrderHistory.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 ">
                <Icons.checkCircled className="size-6 text-muted-foreground z-20 bg-muted p-1 " />
                <span className="text-xs flex items-center gap-2">
                  {item.old_value} <Icons.arrowRight className="size-3" />{" "}
                  {item.new_value}
                </span>
              </div>
              <span className="text-xs">
                {formatTimeToNow(new Date(item.created_at))}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute w-0.5 h-full left-4 bottom-2 z-10 bg-border " />
      <div className="absolute top-0 h-full  w-8 bg-muted border rounded-md shadow-inner flex justify-items-center items-center flex-col pb-1">
        <div className="w-0.5 h-full bg-border " />
      </div>
    </div>
  );
}
