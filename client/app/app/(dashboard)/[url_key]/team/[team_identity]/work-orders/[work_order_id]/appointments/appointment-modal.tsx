"use client";

import { PropsWithChildren, useState } from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/client";
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";

export function AppointmentModal({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const params = useParams() as { work_order_id: string };

  const createAppointment = api.db.service_appointment.create.useMutation({
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      toast({
        title: "Selected Date",
        description: date.toLocaleDateString(),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create Service Appointment</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Service Appointment</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
