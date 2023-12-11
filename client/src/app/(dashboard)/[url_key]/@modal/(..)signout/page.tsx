"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SignOutButtons } from "@/components/auth/SignOutButtons";
interface pageProps {}

const AutModal: FC<pageProps> = ({}) => {
  const router = useRouter();
  return (
    <Dialog defaultOpen={true} modal={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign out</DialogTitle>
          <DialogDescription>Are you sure buddy?</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <SignOutButtons />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AutModal;
