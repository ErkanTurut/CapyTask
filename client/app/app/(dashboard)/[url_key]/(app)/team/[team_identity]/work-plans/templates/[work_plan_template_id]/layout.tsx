import { NavTabs } from "@/components/dashboard/navigation/nav-tabs";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface layoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  };
}

export default async function layoutPage({ children, params }: layoutProps) {
  const work_plan_template = await trpc.db.work_plan_template.get.byId({
    id: params.work_plan_template_id,
  });

  if (!work_plan_template) {
    return notFound();
  }

  return (
    <Shell className="gap-4">
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
      <Separator />
      <NavTabs
        items={[
          {
            id: "general",
            title: "General",
            href: `/${params.url_key}/team/${params.team_identity}/work-plans/templates/${params.work_plan_template_id}`,
          },
          {
            id: "step",
            title: "Steps",
            href: `/${params.url_key}/team/${params.team_identity}/work-plans/templates/${params.work_plan_template_id}/steps`,
          },
          {
            id: "ressource",
            title: "Ressources",
            href: `/${params.url_key}/team/${params.team_identity}/work-plans/templates/${params.work_plan_template_id}/ressources`,
          },
        ]}
      />

      <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
    </Shell>
  );
}
