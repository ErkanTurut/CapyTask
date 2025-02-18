import { formatDate } from "@/lib/utils";
import { RouterOutput } from "@gembuddy/trpc/client";
import { Separator } from "@gembuddy/ui/separator";
import Link from "next/link";

interface WorkOrderMainProps {
  params: {
    work_order_id: string;
  };
  work_order: NonNullable<
    RouterOutput["db"]["work_order"]["get"]["byId"]["data"]
  >;
}

export async function WorkOrderMain({
  params,
  work_order,
}: WorkOrderMainProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-start bg-muted/50 px-6 py-4">
        <div className="grid gap-2">
          <div className="group flex items-center gap-2 font-semibold">
            ID : {work_order.id}
            {/* <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => {
                navigator.clipboard.writeText(work_order.id);
              }}
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button> */}
          </div>
          <div className="text-sm text-muted-foreground">
            Created at
            {formatDate({ date: work_order.created_at, format: "LLLL" })}
          </div>
        </div>
      </div>
      <div className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Contract Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Service contract</dt>
              <dd>ABC</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Activity line</dt>
              <dd>ABC</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">WBS</dt>
              <dd>ABC-123</dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{work_order.company?.name} </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a className="underline" href="mailto:">
                  contact@acme.com
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a className="underline" href="tel:">
                  +1 234 567 890
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Requestor</dt>
              <dd>
                <Link
                  className="text-sm font-medium text-primary underline"
                  href={"#"}
                >
                  {/* {work_order.user?.first_name} {work_order.user?.last_name} */}
                </Link>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Start date</div>
            <div className="text-muted-foreground">
              {work_order.sheduled_start
                ? formatDate({
                    date: work_order.sheduled_start,
                    format: "lll",
                  })
                : "Not scheduled yet"}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="font-semibold">End date</div>
            <div className="text-muted-foreground">
              {work_order.sheduled_end
                ? formatDate({ date: work_order.sheduled_end, format: "lll" })
                : "Not scheduled yet"}
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Work order details</div>

          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Source</dt>
              <dd>{work_order.source} </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Work Plan</dt>
              <dd>{work_order.work_plan_id}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-auto flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated at{" "}
          <time dateTime="2023-11-23">
            {formatDate({ date: work_order.updated_at, format: "LLL" })}
          </time>
        </div>
      </div>
    </div>
  );
}
