"server-only";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";

import {
  TabsContainer,
  TabsLink,
} from "@/components/dashboard/navigation/tabs-link";
import WorkOrderMain from "@/components/dashboard/work-order/work-order-main";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const work_order = await trpc.db.work_order.get.detail({
    id: params.work_order_id,
  });

  if (!work_order) {
    return notFound();
  }
  return (
    <Shell>
      <div className="grid gap-4 border-b sm:grid-cols-2">
        <PageHeader
          id="work-order-header"
          aria-labelledby="work-order-header-heading"
          as="header"
        >
          <PageHeaderHeading size="xs">{work_order.name}</PageHeaderHeading>
          <PageHeaderDescription size="xs">
            {work_order.description}
          </PageHeaderDescription>
        </PageHeader>
        <section className="flex items-center gap-2 rounded-sm">
          <div className="inline-flex items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {work_order.status}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {work_order.priority}
          </div>
        </section>
        <TabsContainer>
          <TabsLink
            href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}`}
            active
          >
            Details
          </TabsLink>
          <TabsLink
            href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}`}
          >
            Details
          </TabsLink>
          <TabsLink
            href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}`}
          >
            Details
          </TabsLink>
        </TabsContainer>
      </div>
      <div className="grid h-full grid-cols-[1fr,0.4fr] gap-4">
        <div className="flex h-full flex-col gap-2 rounded-md">
          <div className="h-16 rounded-md border"></div>
          <div className="flex-1 rounded-md border"></div>
        </div>
        <div>
          <WorkOrderMain work_order={work_order} params={params} />
        </div>
      </div>
      {/* <div className="grid auto-rows-max items-start gap-6 lg:col-span-2 xl:col-span-3">
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
              <StepTable asset={work_order.asset} />
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
        
        <WorkOrderDetail params={params} work_order={work_order} />
      </div> */}
    </Shell>
  );
}
