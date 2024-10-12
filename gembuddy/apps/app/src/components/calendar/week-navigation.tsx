import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@gembuddy/ui/button";

interface WeekNavigatorProps {
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export default function WeekNavigator({
  onPrevWeek,
  onNextWeek,
  onToday,
}: WeekNavigatorProps) {
  return (
    <div className="flex items-center justify-between gap-1">
      <Button
        variant="outline"
        size="sm"
        className="shadow-none"
        onClick={onToday}
      >
        Today
      </Button>
      <Button size="icon" variant="ghost" onClick={onPrevWeek}>
        <ChevronLeft className="size-4 text-muted-foreground" />
      </Button>
      <Button size="icon" variant="ghost" onClick={onNextWeek}>
        <ChevronRight className="size-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
