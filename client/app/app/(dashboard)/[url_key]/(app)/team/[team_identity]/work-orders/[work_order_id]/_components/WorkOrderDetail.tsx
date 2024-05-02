import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/server";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface WorkOrderDetailProps {
  params: {
    work_order_id: string;
  };
  work_order: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["work_order"]["get"]["withSteps"]>
    >["data"]
  >;
}

export default async function WorkOrderDetail({
  params,
  work_order,
}: WorkOrderDetailProps) {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {work_order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            {formatDate({ date: work_order.created_at })}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>ACME CORP</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">contact@acme.com</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Status and Timeline</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Status</span>
              <span>{work_order.status}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">SLA</span>
              <span>2d left</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Start date</div>
                  <div className="text-muted-foreground">
                    {formatDate({ date: work_order.created_at, format: "lll" })}
                  </div>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">End date</div>
                  <div className="text-muted-foreground">
                    {formatDate({ date: work_order.created_at, format: "lll" })}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Location name</div>
            <Link
              className="text-xs font-medium text-primary underline underline-offset-4"
              href="/app/team/1/work-orders/1"
            >
              ACME CORP - Main Office
            </Link>
          </div>
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>Liam Johnson</span>
              <span>1234 Main St.</span>
              <span>Anytown, CA 12345</span>
            </address>
          </div>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          <time dateTime="2023-11-23">
            {formatDate({ date: work_order.updated_at, format: "LLL" })}
          </time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
