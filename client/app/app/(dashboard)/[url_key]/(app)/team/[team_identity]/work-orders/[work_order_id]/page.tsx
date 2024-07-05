import { File } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CardSkeleton from "@/components/skeletons/card-skeleton";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import StepTable from "./_components/StepTable";
import WorkOrderDetail from "./_components/WorkOrderDetail";
import WorkOrderHeader from "./_components/WorkOrderHeader";
import BuddyComment from "./_components/BuddyComment";
import AssetTable from "./_components/AssetTable";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  // const { data: work_order } = await trpc.db.work_order.get.withSteps({
  //   id: params.work_order_id,
  // });

  const { data: work_order } = await trpc.db.work_order.get.detail({
    id: params.work_order_id,
  });

  console.log(work_order);

  if (!work_order) {
    return notFound();
  }
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 lg:grid-cols-3 xl:grid-cols-5">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2">
          <WorkOrderHeader params={params} work_order={work_order} />
        </div>
        <Tabs defaultValue="step">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="step">Steps</TabsTrigger>
              <TabsTrigger value="asset">Assets</TabsTrigger>
              <TabsTrigger value="service_ressource">
                Service Ressources
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              {/* <DropdownMenu>
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
              </DropdownMenu> */}
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="step">
            <Suspense fallback={<CardSkeleton />}>
              <StepTable work_step_status={work_order.work_step_status} />
            </Suspense>
          </TabsContent>
          <TabsContent value="asset">
            <AssetTable params={params} assets={work_order.asset} />
          </TabsContent>
          <TabsContent value="service_ressource">
            <p className="p-6 text-center text-muted-foreground">
              No orders found.
            </p>
          </TabsContent>
        </Tabs>
      </div>
      <div className="grid auto-rows-max items-start gap-4 xl:col-span-2">
        {/* <BuddyComment /> */}
        <WorkOrderDetail params={params} work_order={work_order} />
      </div>
    </main>
  );
}
