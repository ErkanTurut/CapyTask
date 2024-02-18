import StepCreate from "@/components/step/step-create";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveCard } from "@/components/responsive-card";

interface CreatePageProps {
  params: {
    team_identity: string;
    plan_id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CreatePage({ params }: CreatePageProps) {
  return (
    <ResponsiveCard>
      <CardHeader>
        <CardTitle>Create step</CardTitle>
        <CardDescription>Create step</CardDescription>
      </CardHeader>
      <CardContent>
        <StepCreate plan_id={params.plan_id} />
      </CardContent>
    </ResponsiveCard>
  );
}
