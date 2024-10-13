"use client";

import { Event } from "@/components/calendar/types";
import { ServiceAppointmentCreateForm } from "@/components/forms/service-appointment/service-appointment-create-form";
import { Dialog, DialogContent, DialogTitle } from "@gembuddy/ui/dialog";
import { DateRange } from "react-day-picker";
interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange: { from?: Date; to?: Date };
  onDateRangeChange: (dateRange: DateRange) => void;
  date: Date;
  events?: Event[];
  work_order_id: string;
  team_identity: string;
}

export default function AppointmentDialog({
  open,
  onOpenChange,
  dateRange,
  onDateRangeChange,
  date,
  events,
  work_order_id,
  team_identity,
}: AppointmentDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      <DialogContent className="overflow-hidden sm:max-w-[925px]">
        <DialogTitle>Create Service Appointment</DialogTitle>
        <ServiceAppointmentCreateForm
          date={date}
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          team_identity={team_identity}
          work_order_id={work_order_id}
          onFinish={() => {
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
