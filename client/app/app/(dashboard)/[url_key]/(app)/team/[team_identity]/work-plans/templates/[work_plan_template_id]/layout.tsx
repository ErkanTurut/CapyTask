import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { Suspense } from "react";
import WorkPlanTemplateContainer from "./_components/work-plan-template-container";
import { Shell } from "@/components/shells";

interface layoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  };
}

export default async function layoutPage({ children, params }: layoutProps) {
  return (
    <Shell>
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Your Work Plans
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          List of your work Plans
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid flex-1 items-start gap-4 sm:py-0 lg:grid-cols-5 xl:grid-cols-5">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
          <Suspense fallback={<CardSkeleton />}>
            <WorkPlanTemplateContainer params={params} />
          </Suspense>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </Shell>
  );
}
