import { formatDateRange } from "little-date";
import { startOfWeek, endOfWeek } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date | null) => void;
}

export default function DateSelector({
  selectedDate,
  onDateChange,
}: DateSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start rounded-md text-left font-normal shadow-none"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          {formatDateRange(
            startOfWeek(selectedDate, { weekStartsOn: 1 }),
            endOfWeek(selectedDate, { weekStartsOn: 1 }),
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          weekStartsOn={1}
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateChange(date)}
          className="border-b border-dashed"
        />
      </PopoverContent>
    </Popover>
  );
}
