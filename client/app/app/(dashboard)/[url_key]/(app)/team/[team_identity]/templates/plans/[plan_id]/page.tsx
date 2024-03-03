import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
