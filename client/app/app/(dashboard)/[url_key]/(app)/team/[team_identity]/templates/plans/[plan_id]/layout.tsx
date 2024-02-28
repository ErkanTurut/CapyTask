import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { Suspense } from "react";
import StepsContainer from "./_components/steps-container";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface layoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
    team_identity: string;
    plan_id: string;
  };
  modal: React.ReactNode;
}

export default async function layoutPage({
  children,
  params,
  modal,
}: layoutProps) {
  return (
    <>
      {modal}
      <PageHeader
        className="pt-10"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Your Inspection Plans
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          List of your inspection Plans
        </PageHeaderDescription>
      </PageHeader>

      <div className={"grid grid-cols-1 gap-4 lg:grid-cols-2"}>
        <Suspense fallback={<CardSkeleton />}>
          <StepsContainer params={params} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
      </div>
    </>
  );
}
