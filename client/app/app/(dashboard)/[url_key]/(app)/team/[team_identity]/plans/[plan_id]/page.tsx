import { Database } from "@/types/supabase.types";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StepList from "@/components/step/step-list";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import StepUpdate from "@/components/step/step-update";
import { Icons } from "@/components/icons";
import { StepCreateModal } from "./_components/step-create-modal";
import { getSteps } from "@/lib/service/step/fetch";

interface PlanPageProps {
  params: {
    team_identity: string;
    plan_id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PlanPage({
  params,
  searchParams,
}: PlanPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: steps } = await getSteps({
    plan_id: params.plan_id,
    client: supabase,
  });
  const step = steps?.find((step) => step.id === searchParams.step_id);
  console.log();

  return (
    <>
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

      <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
        <Card>
          <CardHeader>
            <CardTitle>Inspection Plan</CardTitle>
            <CardDescription>
              List of steps for the inspection plan
            </CardDescription>
            <div className=" flex items-center gap-4">
              <Input placeholder="Add a new task" type="text" />
              <StepCreateModal plan_id={params.plan_id} />
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
        {step && (
          <Card className="sticky top-4 h-min">
            <CardHeader>
              <CardTitle>{step.name}</CardTitle>
              <CardDescription>
                List of steps for the inspection plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StepUpdate step={step} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
