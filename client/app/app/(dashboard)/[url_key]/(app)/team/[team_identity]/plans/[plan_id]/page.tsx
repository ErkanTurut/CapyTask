import StepUpdate from "@/components/step/step-update";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStep } from "@/lib/service/step/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import { ResponsiveCard } from "./_components/responsive-card";
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    team_identity: string;
    plan_id: string;
    step_id: string;
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

  const { data: step } = await getStep({
    client: supabase,
    id: searchParams.step_id,
  });
  if (!step) {
    return "Step not found";
  }

  return (
    <ResponsiveCard>
      <CardHeader>
        <CardTitle>{step.name}</CardTitle>
        <CardDescription>List of steps for the inspection plan</CardDescription>
      </CardHeader>
      <CardContent>
        <StepUpdate step={step} />
      </CardContent>
    </ResponsiveCard>
  );
}
