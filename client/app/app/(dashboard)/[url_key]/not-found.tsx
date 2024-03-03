"use client";
import { Shell } from "@/components/shells";
import Image from "next/image";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <PageHeader className=" space-y-2 text-center" id="account-header">
        <PageHeaderHeading size="lg">Page not Found</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Ooops ! The page you were looking for could not be found.
        </PageHeaderDescription>
      </PageHeader>

      <Button onClick={() => router.back()}>Go back</Button>
      <Image
        alt="https://illustrations.popsy.co/orange/crashed-error.svg"
        src="https://illustrations.popsy.co/orange/crashed-error.svg"
        width={400}
        height={400}
      />
    </div>
  );
}
