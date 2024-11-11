import { useRef } from "react";
import { DateRange } from "react-day-picker";
import { Label } from "@gembuddy/ui/label";
import { TimePickerInput } from "@/components/time-picker-input";
import { cn } from "@gembuddy/ui/cn";

interface TimeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date;
  onDateRangeChange: (date: Date | undefined) => void;
}

export default function TimeSelector({
  date,
  onDateRangeChange,
  className,
}: TimeSelectorProps) {
  const hourRef = useRef<HTMLInputElement>(null);

  const minuteRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex w-full items-center gap-1", className)}>
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={(date) => onDateRangeChange(date)}
          ref={hourRef}
          onRightFocus={() => hourRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center ">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={(date) => onDateRangeChange(date)}
          ref={minuteRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  );
}
