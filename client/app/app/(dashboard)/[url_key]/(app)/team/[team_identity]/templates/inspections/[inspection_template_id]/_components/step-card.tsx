"use client";
import StepUpdateForm from "@/components/step/step-update";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { trpc } from "@/trpc/server";

import { FC } from "react";

interface StepCardProps {
  step: NonNullable<
    Awaited<
      ReturnType<
        (typeof trpc)["db"]["template"]["step"]["getStepsByInspection"]["query"]
      >
    >
  >;
}

const StepCard: FC<StepCardProps> = ({ step }) => {
  if (!step) {
    return null;
  }
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <StepUpdateForm step={step} />
      </DialogContent>
    </Dialog>
  );
};

export default StepCard;
