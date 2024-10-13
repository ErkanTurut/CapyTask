import { useRef } from "react";
import { DateRange } from "react-day-picker";
import { Label } from "@gembuddy/ui/label";
import { TimePickerInput } from "@/components/time-picker-input";

interface TimeSelectorProps {
  dateRange: { from?: Date; to?: Date };
  onDateRangeChange: (dateRange: DateRange) => void;
}

export default function TimeSelector({
  dateRange,
  onDateRangeChange,
}: TimeSelectorProps) {
  const fromMinuteRef = useRef<HTMLInputElement>(null);
  const fromHourRef = useRef<HTMLInputElement>(null);
  const toMinuteRef = useRef<HTMLInputElement>(null);
  const toHourRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full items-center justify-between p-2">
      <div className="flex w-full items-start gap-1">
        <div className="grid gap-1 text-center">
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
          <TimePickerInput
            picker="hours"
            date={dateRange.from}
            setDate={(date) =>
              onDateRangeChange({
                ...dateRange,
                from: date,
              })
            }
            ref={fromHourRef}
            onRightFocus={() => fromMinuteRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
          <TimePickerInput
            picker="minutes"
            date={dateRange.from}
            setDate={(date) =>
              onDateRangeChange({
                ...dateRange,
                from: date,
              })
            }
            ref={fromMinuteRef}
            onLeftFocus={() => fromHourRef.current?.focus()}
          />
        </div>
      </div>

      <div className="flex items-start gap-2">
        <div className="grid gap-1 text-center">
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
          <TimePickerInput
            picker="hours"
            date={dateRange.to}
            setDate={(date) =>
              onDateRangeChange({
                from: dateRange.from ?? undefined,
                to: date,
              })
            }
            ref={toHourRef}
            onRightFocus={() => toMinuteRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
          <TimePickerInput
            picker="minutes"
            date={dateRange.to}
            setDate={(date) =>
              onDateRangeChange({
                from: dateRange.from ?? undefined,
                to: date,
              })
            }
            ref={toMinuteRef}
            onLeftFocus={() => toHourRef.current?.focus()}
          />
        </div>
      </div>
    </div>
  );
}
