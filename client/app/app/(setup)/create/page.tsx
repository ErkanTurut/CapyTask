import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateWorspaceForm } from "@/components/workspace/workspace-create";
import { getSession } from "@/lib/service/auth/fetch";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await getSession(supabase);

  if (!data.session) {
    redirect("/login");
  }

  return (
    <div className="grid min-h-screen">
      <div className="container my-auto max-w-3xl ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create workspace</CardTitle>
            <CardDescription>
              Create a new workspace to work on.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CreateWorspaceForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <Link
              aria-label="Return to home page"
              href="/"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Return to home page
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
