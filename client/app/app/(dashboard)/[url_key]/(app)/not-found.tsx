"use client";
import { Shell } from "@/components/shells";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();

  return (
    <Shell variant="centered">
      <PageHeader>
        <PageHeaderHeading className="text-center" size={"lg"}>
          Are you lost buddy?
        </PageHeaderHeading>
        <PageHeaderDescription className="mx-auto text-center" size={"lg"}>
          The page you are looking for does not exist. Please check the URL or
          click the button below to go back to the home page.
        </PageHeaderDescription>
      </PageHeader>
      <Button onClick={() => router.back()}>
        Go back
        {/* <Icons.arrowRight className="ml-2 h-4 w-4" /> */}
      </Button>
    </Shell>
  );
}
