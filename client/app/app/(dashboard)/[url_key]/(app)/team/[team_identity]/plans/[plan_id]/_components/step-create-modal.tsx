import { Icons } from "@/components/icons";
import StepCreate from "@/components/step/step-create";
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

interface StepCreateModalProps {
  plan_id: string;
}

export function StepCreateModal({ plan_id }: StepCreateModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shrink-0 gap-1">
          Add Step
          <Icons.plusCircled className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <StepCreate plan_id={plan_id} />

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
