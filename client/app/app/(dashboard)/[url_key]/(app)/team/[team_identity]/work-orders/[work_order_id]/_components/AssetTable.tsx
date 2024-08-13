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
import { formatDate, formatTimeToNow } from "@/lib/utils";
import { RouterOutput } from "@/trpc/client";

interface AssetTableProps {
  params: {
    work_order_id: string;
  };
  assets: RouterOutput["db"]["work_order"]["get"]["detail"]["asset"];
}

export default async function AssetTable({ params, assets }: AssetTableProps) {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Assets</CardTitle>
        <CardDescription>Related assets to this work order.</CardDescription>
      </CardHeader>
      <CardContent>
        {assets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead className="table-cell">Title</TableHead>
                <TableHead className="hidden md:table-cell">
                  Last update
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset, index) => {
                return (
                  <TableRow key={asset.id}>
                    <TableCell className="">{index + 1}</TableCell>
                    <TableCell className="table-cell max-w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <div className="font-normal sm:font-medium">
                        {asset.name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {asset.description} {asset.id}
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <Tooltip>
                        <TooltipTrigger>
                          {formatTimeToNow(new Date(asset.updated_at))}
                        </TooltipTrigger>
                        <TooltipContent>
                          {formatDate({
                            date: asset.updated_at,
                            format: "LLL",
                          })}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
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
  );
}
