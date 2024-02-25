import { Icons } from "@/components/icons";
import { buttonVariants } from "@/ui/button";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSteps, getStepsByPlan } from "@/lib/service/step/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import StepList from "./steps-list";
import { Suspense } from "react";
interface StepsContainerProps {
  params: {
    url_key: string;
    team_identity: string;
    plan_id: string;
  };
}
const StepsContainer: React.FC<StepsContainerProps> = async ({ params }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <Card className="sticky top-4 h-min">
      <CardHeader>
        <CardTitle>Inspection Plan</CardTitle>
        <CardDescription>List of steps for the inspection plan</CardDescription>
        <div className=" flex items-center gap-4">
          <Input placeholder="Add a new task" type="text" />
          <Link
            href={`/${params.url_key}/team/${params.team_identity}/plans/${params.plan_id}/create`}
            className={buttonVariants({
              className: "shrink-0 gap-1",
            })}
          >
            Add Step
            <Icons.plusCircled className="h-4 w-4" />
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          {(async () => {
            const { data } = await getStepsByPlan({
              client: supabase,
              plan_id: params.plan_id,
            });

            if (!data || data.step.length === 0) {
              return (
                <div className="flex h-40 items-center justify-center">
                  <p className="text-muted-foreground">
                    No steps found for this inspection plan
                  </p>
                </div>
              );
            }
            return <StepList data={data} />;
          })()}
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default StepsContainer;
