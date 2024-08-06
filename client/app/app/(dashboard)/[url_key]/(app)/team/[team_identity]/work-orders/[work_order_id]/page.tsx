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
import { Shell } from "@/components/shells";

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
    <Shell className="grid flex-1 items-start sm:px-6 lg:grid-cols-3 xl:grid-cols-5">
      <div className="grid auto-rows-max items-start gap-6 lg:col-span-2 xl:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2">
          <WorkOrderHeader params={params} work_order={work_order} />
        </div>
        <Tabs defaultValue="step">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="step">Steps</TabsTrigger>
              <TabsTrigger value="asset">Assets</TabsTrigger>
              <TabsTrigger disabled value="service_ressource">
                Service Ressources
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="step">
            <Suspense fallback={<CardSkeleton />}>
              <StepTable work_step_item={work_order.work_step_item} />
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
    </Shell>
  );
}
