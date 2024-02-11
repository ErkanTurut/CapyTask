import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { getPlan } from "@/lib/service/plan/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import StepList from "@/components/step/step-list";
import { getSteps } from "@/lib/service/step/fetch";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: plan } = await getPlan({
    plan_id: params.plan_id,
    client: supabase,
  });

  const { data: steps } = await getSteps({
    plan_id: params.plan_id,
    client: supabase,
  });

  if (!plan || !steps) {
    return notFound();
  }

  if (steps.length === 0) {
    return redirect(
      `/${params.url_key}/team/${params.team_identity}/plans/${params.plan_id}/create`,
    );
  }
  // redirect(`./${steps[0].id}`);

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
        <Card className="sticky top-4 h-min">
          <CardHeader>
            <CardTitle>Inspection Plan</CardTitle>
            <CardDescription>
              List of steps for the inspection plan
            </CardDescription>
            <div className=" flex items-center gap-4">
              <Input placeholder="Add a new task" type="text" />
              <Link
                href={`/${params.url_key}/team/${params.team_identity}/plans/${params.plan_id}/create`}
                className={buttonVariants({ className: "shrink-0 gap-1" })}
              >
                Add Step
                <Icons.plusCircled className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {steps?.length === 0 && (
              <div className="flex h-40 items-center justify-center">
                <p className="text-muted-foreground">
                  No steps found for this inspection plan
                </p>
              </div>
            )}

            <StepList steps={steps} />
          </CardContent>
        </Card>
        {children}
      </div>
    </>
  );
}
