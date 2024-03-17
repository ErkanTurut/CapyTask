import { ResponsiveCard } from "@/components/responsive-card";
import StepUpdateForm from "@/components/step/step-update";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/server";

interface PageProps {
  searchParams: {
    step_id: string | null;
  };
  params: {
    url_key: string;
    team_identity: string;
    inspection_template_id: string;
  };
}

export default async function Page({ searchParams, params }: PageProps) {
  // const { data } = await trpc.db.template.inspection.get.withSteps.query({
  //   id: params.inspection_template_id,
  // });
  if (searchParams.step_id) {
    const { data: step } = await trpc.db.template.step.get.query({
      id: searchParams.step_id,
    });
    if (!step) return null;
    return (
      <ResponsiveCard>
        <StepUpdateForm step={step} />
      </ResponsiveCard>
    );
  }

  return (
    <Card className="sticky top-4 h-min">
      <CardHeader>
        <CardTitle>Plan detail</CardTitle>
        <CardDescription>
          Update the details below to update your plan template. You will be
          able to use this plan in your inspections.
        </CardDescription>
      </CardHeader>
      <CardContent>settings plan</CardContent>
    </Card>
  );
}
