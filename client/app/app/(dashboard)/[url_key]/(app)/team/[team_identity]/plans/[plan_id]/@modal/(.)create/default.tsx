"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StepCreate from "@/components/step/step-create";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
interface CreatePageProps {
  params: {
    team_identity: string;
    plan_id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CreatePage({
  params,
  searchParams,
}: CreatePageProps) {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} modal={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create step</DialogTitle>
          <DialogDescription>Create a new step</DialogDescription>
        </DialogHeader>
        <StepCreate plan_id={params.plan_id} />
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              router.back();
            }}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
