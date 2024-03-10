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
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function CreatePage() {
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
