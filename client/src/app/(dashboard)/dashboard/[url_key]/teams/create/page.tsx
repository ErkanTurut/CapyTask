import type { Metadata } from "next";
import { CreateTeamForm } from "@/components/teams/team-create";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function CreatePage() {
  return (
    <section
      id="user-account-info"
      aria-labelledby="user-account-info-heading"
      className="max-w-xl"
    >
      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>Update your account information.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateTeamForm />
        </CardContent>
      </Card>
    </section>
  );
}
