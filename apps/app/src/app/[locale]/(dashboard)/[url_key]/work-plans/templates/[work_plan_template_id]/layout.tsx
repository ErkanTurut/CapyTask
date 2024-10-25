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
} from "@gembuddy/ui/breadcrumb";
import { Separator } from "@gembuddy/ui/separator";
import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface layoutProps {
  children: React.ReactNode;
  params: Promise<{
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  }>;
}

export default async function layoutPage(props: layoutProps) {
  const params = await props.params;

  const {
    children
  } = props;

  const { data: work_plan_template } =
    await trpc.db.work_plan_template.get.byId({
      id: params.work_plan_template_id,
    });

  if (!work_plan_template) {
    return notFound();
  }

  return (
    <Shell>
      <PageHeader
        id="work-plan-template-header"
        aria-labelledby="work-plan-template-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          {work_plan_template.name}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {work_plan_template.description}
        </PageHeaderDescription>
        <Separator />
        <NavTabs
          items={[
            {
              id: "general",
              title: "General",
              href: `/${params.url_key}/work-plans/templates/${params.work_plan_template_id}`,
            },
            {
              id: "step",
              title: "Steps",
              href: `/${params.url_key}/work-plans/templates/${params.work_plan_template_id}/steps`,
            },
            {
              id: "ressource",
              title: "Ressources",
              href: `/${params.url_key}/work-plans/templates/${params.work_plan_template_id}/ressources`,
            },
          ]}
        />
      </PageHeader>

      <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
    </Shell>
  );
}
