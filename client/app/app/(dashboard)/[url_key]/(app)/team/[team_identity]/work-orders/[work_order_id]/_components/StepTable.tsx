import { Icons } from "@/components/icons";
import { Badge, BadgeProps } from "@/components/ui/badge";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Database } from "@/lib/supabase/server";
import { formatDate, formatTimeToNow } from "@/lib/utils";
import { RouterOutput } from "@/trpc/client";
import { trpc } from "@/trpc/server";

interface StepTableProps {
  asset: RouterOutput["db"]["work_order"]["get"]["detail"]["asset"];
}

export const status_config: Record<
  Database["public"]["Enums"]["Status"],
  { icon: keyof typeof Icons; label: string; variant: BadgeProps["variant"] }
> = {
  OPEN: {
    icon: "view",
    label: "Open",
    variant: "secondary",
  },
  IN_PROGRESS: {
    icon: "timer",
    label: "In progress",
    variant: "secondary",
  },
  COMPLETED: {
    icon: "check",
    label: "Completed",
    variant: "success",
  },
  ON_HOLD: {
    icon: "pause",
    label: "On hold",
    variant: "dashed",
  },
  CANCELED: {
    icon: "CrossCircled",
    label: "Canceled",
    variant: "destructive",
  },
};

const options = Object.entries(status_config).map(
  ([status, { icon, label }]) => ({
    value: status as Database["public"]["Enums"]["Status"],
    label,
    icon,
  }),
);

export default async function StepTable({ asset }: StepTableProps) {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Work steps</CardTitle>
        <CardDescription>
          Current status of the work steps in this order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead className="table-cell">Title</TableHead>
              <TableHead className="table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Last update
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {asset.flatMap((asset, assetIndex) => {
              return asset.work_step.sort().map((step, stepIndex) => {
                return (
                  <TableRow key={step.id}>
                    <TableCell className="">
                      {(step.step_order || stepIndex) + 1}
                    </TableCell>
                    <TableCell className="table-cell max-w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <div className="font-normal sm:font-medium">
                        {step.name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {step.description} {step.id}
                      </div>
                    </TableCell>
                    <TableCell className="table-cell">
                      <Badge
                        className="text-xs"
                        variant={status_config[step.status].variant}
                      >
                        {status_config[step.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Tooltip>
                        <TooltipTrigger>
                          {formatTimeToNow(new Date(step.updated_at))}
                        </TooltipTrigger>
                        <TooltipContent>
                          {formatDate({
                            date: step.updated_at,
                            format: "LLL",
                          })}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// const Icon = Icons[status_config[step.status].icon];
// return (
//   <TableRow key={step.id}>
//     <TableCell className="">{index + 1}</TableCell>
//     <TableCell className="table-cell max-w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
//       <div className="font-normal sm:font-medium">
//         {step.name}
//       </div>
//       <div className="hidden text-sm text-muted-foreground md:inline">
//         {step.description} {step.id}
//       </div>
//     </TableCell>
//     <TableCell className="table-cell">
//       <Badge
//         className="text-xs"
//         variant={status_config[step.status].variant}
//       >
//         {status_config[step.status].label}
//       </Badge>
//     </TableCell>
//     <TableCell className="hidden sm:table-cell">
//       <Tooltip>
//         <TooltipTrigger>
//           {formatTimeToNow(new Date(step.updated_at))}
//         </TooltipTrigger>
//         <TooltipContent>
//           {formatDate({
//             date: step.updated_at,
//             format: "LLL",
//           })}
//         </TooltipContent>
//       </Tooltip>
//     </TableCell>
//   </TableRow>
// );
