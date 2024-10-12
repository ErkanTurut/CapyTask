import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@gembuddy/ui/card";

import { Suspense } from "react";

import { CreatWorkStepTemplateModal } from "@/components/modals/CreateWorkStepTemplateModal";

interface PageProps {
  params: {
    team_identity: string;
    url_key: string;
    work_plan_template_id: string;
    team_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return <CreatWorkStepTemplateModal />;
}
