import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface modalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export default function Modal({ open, onOpenChange, children }: modalProps) {
  return (
    <Dialog modal={true} open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
}

Modal.Button = DialogTrigger;
