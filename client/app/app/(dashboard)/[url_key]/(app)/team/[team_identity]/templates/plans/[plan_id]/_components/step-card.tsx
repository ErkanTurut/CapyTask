"use client";
import StepUpdateForm from "@/components/step/step-update";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/types/supabase.types";

import { FC } from "react";

interface StepCardProps {
  step: Database["public"]["Tables"]["step"]["Row"] | null;
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
