export interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color: "blue" | "pink" | "indigo" | "placeholder";
  isPlaceholder?: boolean;
}

export interface WeekCalendarProps {
  events: Event[];
  initialTimeFormat?: "24h" | "12h";
  disabledTimeRanges?: { start: Date; end: Date }[];
  disabledSlots?: Date[];
  startDate: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onEventClick?: (event: Event) => void;
  onSlotClick?: (slotDate: Date) => void;
}
export interface DayCalendarProps {
  events: Event[];
  initialTimeFormat?: "24h" | "12h";
  disabledTimeRanges?: { start: Date; end: Date }[];
  disabledSlots?: Date[];
  date: Date;
  onEventClick?: (event: Event) => void;
  onSlotClick?: (slotDate: Date) => void;
  onPlaceholderUpdate?: (event: Event) => void;
}
export type ColorClasses = {
  [key in Event["color"]]: string;
};
