import { FC } from "react";
import { Modal } from "../../_components/modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateStepForm from "@/components/step/step-create";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getTeamByIdentity } from "@/lib/service/team/fetch";
interface pageProps {
  params: {
    team_identity: string;
    url_key: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: team } = await getTeamByIdentity({
    identity: params.team_identity,
    supabase,
  });
  if (!team) return null;
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
        <CreateStepForm team_id={team.id} />
      </CardContent>
    </Modal>
  );
};

export default page;
