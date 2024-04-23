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
                  console.log(step);
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
                        <Badge className="text-xs " variant="secondary">
                          {step.status}
                        </Badge>
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
