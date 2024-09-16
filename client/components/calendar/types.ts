export interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color: "blue" | "pink" | "indigo" | "placeholder";
  isPlaceholder?: boolean;
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
