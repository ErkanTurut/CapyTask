import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { Suspense } from "react";
import WorkPlanTemplateContainer from "./_components/work-plan-template-container";
import { Shell } from "@/components/shells";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";

interface layoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  };
}

export default async function layoutPage({ children, params }: layoutProps) {
  const { data: work_plan_template } =
    await trpc.db.work_plan_template.get.byId({
      id: params.work_plan_template_id,
    });

  if (!work_plan_template) {
    return notFound();
  }

  return (
    <Shell>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          {work_plan_template.name}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {work_plan_template.description}
        </PageHeaderDescription>
      </PageHeader>
      <Tabs defaultValue="step">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            value="general"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            value="step"
          >
            Steps
          </TabsTrigger>
          <TabsTrigger
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            value="ressource"
          >
            Ressources
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
    </Shell>
  );
}
