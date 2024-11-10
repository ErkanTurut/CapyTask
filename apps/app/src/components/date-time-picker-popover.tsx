"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@gembuddy/ui/button";
import { Calendar } from "@gembuddy/ui/calendar";
import { Label } from "@gembuddy/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@gembuddy/ui/popover";
import { TimePickerInput } from "./time-picker-input";

export function DateTimePickerPopover({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[230px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
          type="button"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="flex items-end gap-2 p-3 pt-0">
          <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs">
              Hours
            </Label>
            <TimePickerInput
              picker="hours"
              date={date}
              setDate={setDate}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs">
              Minutes
            </Label>
            <TimePickerInput
              picker="minutes"
              date={date}
              setDate={setDate}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
