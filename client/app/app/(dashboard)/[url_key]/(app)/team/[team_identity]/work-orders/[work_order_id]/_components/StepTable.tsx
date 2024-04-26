import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StepStatusSelector from "@/components/work-step-status/StepStatusSelector";
import { Database } from "@/lib/supabase/server";
import { formatTimeToNow } from "@/lib/utils";
import { trpc } from "@/trpc/server";

interface StepTableProps {
  params: {
    work_order_id: string;
  };
  work_step_status: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["work_order"]["get"]["withSteps"]["query"]>
    >["data"]
  >["work_step_status"];
}

const status_config: Record<
  Database["public"]["Enums"]["Status"],
  { icon: keyof typeof Icons; label: string }
> = {
  OPEN: {
    icon: "view",
    label: "Open",
  },
  IN_PROGRESS: {
    icon: "timer",
    label: "In progress",
  },
  COMPLETED: {
    icon: "check",
    label: "Completed",
  },
  ON_HOLD: {
    icon: "pause",
    label: "On hold",
  },
  CANCELED: {
    icon: "CrossCircled",
    label: "Canceled",
  },
};

const options = Object.entries(status_config).map(
  ([status, { icon, label }]) => ({
    value: status as Database["public"]["Enums"]["Status"],
    label,
    icon,
  }),
);

export default async function StepTable({
  params,
  work_step_status,
}: StepTableProps) {
  return (
    <TooltipProvider>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Work steps</CardTitle>
          <CardDescription>
            Current status of the work steps in this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          {work_step_status && work_step_status.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead className="table-cell">Title</TableHead>
                  <TableHead className="table-cell">Status</TableHead>
                  <TableHead className="table-cell">Last update</TableHead>
                  {/* <TableHead className="hidden md:table-cell">
                    Last update
                  </TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {work_step_status.map((step, index) => {
                  if (!step.work_step) {
                    return null;
                  }
                  return (
                    <TableRow key={step.id}>
                      <TableCell className="">{index + 1}</TableCell>
                      <TableCell className="table-cell max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
                        <div className="font-normal sm:font-medium">
                          {step.work_step?.name}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {step.work_step.description} {step.work_step.id}
                        </div>
                      </TableCell>
                      <TableCell className="table-cell ">
                        {/* <Badge className="text-xs " variant="secondary">
                          {step.status}
                        </Badge> */}
                        <StepStatusSelector
                          status={options}
                          work_step_status_id={step.id}
                          initialStatus={step.status}
                        />
                      </TableCell>
                      <Tooltip>
                        <TableCell className="table-cell ">
                          <TooltipTrigger>
                            {formatTimeToNow(new Date(step.updated_at))}
                          </TooltipTrigger>
                        </TableCell>
                        <TooltipContent>{step.updated_at}</TooltipContent>
                      </Tooltip>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="p-6 text-center text-muted-foreground">
              No orders found.
            </p>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
