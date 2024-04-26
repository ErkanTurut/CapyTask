import { File, ListFilter } from "lucide-react";

import CardSkeleton from "@/components/skeletons/card-skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import StepTable from "./_components/StepTable";
import WorkOrderDetail from "./_components/WorkOrderDetail";
import WorkOrderHeader from "./_components/WorkOrderHeader";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { data: work_order } = await trpc.db.work_order.get.withSteps.query({
    id: params.work_order_id,
  });

  if (!work_order) {
    return notFound();
  }

  return (
    <main className="container grid flex-1 items-start gap-4 px-4 sm:px-8 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4">
          <WorkOrderHeader params={params} work_order={work_order} />
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList className="border shadow-inner">
              <TabsTrigger value="week">Steps</TabsTrigger>
              <TabsTrigger value="month">Assigned</TabsTrigger>
              <TabsTrigger value="year">Comments</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Suspense fallback={<CardSkeleton />}>
              <StepTable
                params={params}
                work_step_status={work_order.work_step_status}
              />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <WorkOrderDetail />
      </div>
    </main>
  );
}
