import type { Metadata } from "next";
import { Shell } from "@/components/shells/shell";

import { SettingsForm } from "@/components/forms/accountSettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function AccountPage() {
  return (
    <Shell variant="sidebar">
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 id="user-account-info-heading">Account Info</h2>
            </CardTitle>
            <CardDescription>
              <p>Update your account information.</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm />
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}
