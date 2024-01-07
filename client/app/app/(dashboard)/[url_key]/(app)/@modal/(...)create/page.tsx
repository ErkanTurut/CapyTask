"use client";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreateWorspaceForm } from "@/components/workspace/workspace-create";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useWindowSize from "@/lib/hooks/use-window-size";

interface pageProps {}

const CreateWorkspaceModal: FC<pageProps> = ({}) => {
  const router = useRouter();
  const { isMobile } = useWindowSize();

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
