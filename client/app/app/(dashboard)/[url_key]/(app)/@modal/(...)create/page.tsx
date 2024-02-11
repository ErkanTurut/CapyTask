"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateWorspaceForm } from "@/components/workspace/workspace-create";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const CreateWorkspaceModal: FC<pageProps> = ({}) => {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} modal={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to collaborate with your buddies.
          </DialogDescription>
        </DialogHeader>
        <CreateWorspaceForm />
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
};

export default CreateWorkspaceModal;
