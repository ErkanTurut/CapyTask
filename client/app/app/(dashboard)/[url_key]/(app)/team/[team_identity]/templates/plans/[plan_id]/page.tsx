import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStep } from "@/lib/service/step/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import { ResponsiveCard } from "@/components/responsive-card";
import { Suspense } from "react";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import StepUpdateForm from "@/components/step/step-update";
import StepDeleteForm from "@/components/step/step-delete";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: {
    team_identity: string | null;
    plan_id: string | null;
    step_id: string | null;
  };
  params: {
    url_key: string;
    team_identity: string;
    plan_id: string;
  };
}

export default async function Page({ searchParams, params }: PageProps) {
  if (!searchParams.step_id) {
    return null;
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <Suspense fallback={<CardSkeleton />}>
      {(async () => {
        if (!searchParams.step_id) {
          return null;
        }
        const { data: step } = await getStep({
          client: supabase,
          id: searchParams.step_id,
        });
        if (!step) {
          return notFound();
        }
        return (
          <ResponsiveCard>
            <CardHeader>
              <CardTitle>{step.name}</CardTitle>
              <CardDescription>
                List of steps for the inspection plan
              </CardDescription>
            </CardHeader>

            <CardContent>
              <StepUpdateForm step={step} />
              <StepDeleteForm size="icon" step={step} />
            </CardContent>
          </ResponsiveCard>
        );
      })()}
    </Suspense>
  );
}
