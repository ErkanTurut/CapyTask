import { Modal } from "../../_components/modal";
import StepUpdateForm from "@/components/step/step-update";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStep } from "@/lib/service/step/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    step_id: string;
    plan_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: step } = await getStep({
    client: supabase,
    id: params.step_id,
  });
  if (!step) return notFound();
  return (
    <Modal>
      <CardHeader>
        <CardTitle>Update step template</CardTitle>
        <CardDescription>
          Update the details below to update your step template. You will be
          able to use this step in your plans.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepUpdateForm step={step} />
      </CardContent>
    </Modal>
  );
}
