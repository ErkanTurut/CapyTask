"use client";

import { use, useRef, useState } from "react";
import { addHours, addWeeks, endOfWeek, startOfWeek, subWeeks } from "date-fns";
import { formatDateRange } from "little-date";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsTimestamp, useQueryState, useQueryStates } from "nuqs";

import { Event } from "@/components/calendar/types";
import WeekCalendar from "@/components/calendar/week-calendar";
import DayCalendar from "@/components/calendar/day-calendar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api, RouterOutput } from "@/trpc/client";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/time-picker-input";
import { DateRange } from "react-day-picker";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";
import { Icons } from "@/components/icons";
import {
  Command,
  CommandInput,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ServiceAppointmentCalendarProps {
  work_order_id: string;
  initialData: Promise<
    RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]
  >;
}

export default function ServiceAppointmentCalendar({
  work_order_id,
  initialData,
}: ServiceAppointmentCalendarProps) {
  //   const [timestamp, setTimestamp] = useQueryState("ts", parseAsTimestamp);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useQueryStates({
    from: parseAsTimestamp,
    to: parseAsTimestamp,
  });

  const {
    data: { data },
  } = api.db.service_appointment.get.byWorkOrder.useQuery(
    { work_order_id },
    { initialData: use(initialData) },
  );

  const serviceAppointmentEvents: Event[] =
    data?.map((appointment) => ({
      start: new Date(appointment.start_date),
      end: new Date(appointment.end_date),
      title: appointment.id,
      color: "blue",
      id: appointment.id,
    })) ?? [];

  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(date);
  };

  const handleWeekChange = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(
        direction === "prev"
          ? subWeeks(selectedDate, 1)
          : addWeeks(selectedDate, 1),
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {selectedRange && selectedRange.from && (
        <AppointmentDialog
          open={selectedRange != null}
          onOpenChange={(open) =>
            !open && setSelectedRange({ from: null, to: null })
          }
          dateRange={{
            from: selectedRange.from,
            to: selectedRange.to ?? addHours(selectedRange.from, 1),
          }}
          date={selectedRange.from ?? new Date()}
          onDateRangeChange={setSelectedRange}
        />
      )}

      <div className="flex items-center justify-between">
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <WeekNavigator
          onPrevWeek={() => handleWeekChange("prev")}
          onNextWeek={() => handleWeekChange("next")}
        >
          <Button
            variant="outline"
            size="sm"
            className="shadow-none"
            onClick={() => handleWeekChange("today")}
          >
            Today
          </Button>
        </WeekNavigator>
      </div>

      <WeekCalendar
        initialTimeFormat="24h"
        events={serviceAppointmentEvents}
        disabledTimeRanges={[
          {
            start: new Date("2024-09-10T00:00:00"),
            end: new Date("2024-09-10T07:00:00"),
          },
        ]}
        startDate={selectedDate}
        onSlotClick={(date) => {
          setSelectedRange({
            from: date,
            to: addHours(date, 1),
          });
        }}
      />
    </div>
  );
}

function DateSelector({
  selectedDate,
  onDateChange,
}: {
  selectedDate: Date;
  onDateChange: (date: Date | null) => void;
}) {
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

function WeekNavigator({
  onPrevWeek,
  onNextWeek,
  children,
}: {
  onPrevWeek: () => void;
  onNextWeek: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-1">
      {children}
      <Button size="icon" variant="ghost" onClick={onPrevWeek}>
        <ChevronLeft className="size-4 text-muted-foreground" />
      </Button>
      <Button size="icon" variant="ghost" onClick={onNextWeek}>
        <ChevronRight className="size-4 text-muted-foreground" />
      </Button>
    </div>
  );
}

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange: { from?: Date; to?: Date };
  onDateRangeChange: (dateRange: DateRange) => void;
  date: Date;
  events?: Event[];
}

function AppointmentDialog({
  open,
  onOpenChange,
  dateRange,
  onDateRangeChange,
  date,
  events,
}: AppointmentDialogProps) {
  const placeHolderEvent: Event | null =
    dateRange.from && dateRange.to
      ? {
          title: "New appointment",
          start: dateRange.from,
          end: dateRange.to,
          color: "placeholder",
          isPlaceholder: true,
        }
      : null;

  const fromMinuteRef = useRef<HTMLInputElement>(null);
  const fromHourRef = useRef<HTMLInputElement>(null);
  const toMinuteRef = useRef<HTMLInputElement>(null);
  const toHourRef = useRef<HTMLInputElement>(null);

  const [selectedServiceResources, setSelectedServiceResources] = useState<
    RouterOutput["db"]["service_resource"]["get"]["textSearch"] | undefined
  >(undefined);

  const handleServiceResourceSelect = (
    serviceResource: RouterOutput["db"]["service_resource"]["get"]["textSearch"][number],
  ) => {
    if (selectedServiceResources?.some((sr) => sr.id === serviceResource.id)) {
      // Correctly filter out the selected service resource
      setSelectedServiceResources(
        (prev) => prev?.filter((sr) => sr.id !== serviceResource.id) ?? [],
      );
    } else {
      // Add the service resource if not already selected
      setSelectedServiceResources((prev) => [...(prev ?? []), serviceResource]);
    }
  };

  const selectedServiceResourcesEvents: Event[] =
    selectedServiceResources?.map((selectedServiceResource, index) => {
      return {
        start: new Date(),
        end: new Date(),
        title:
          selectedServiceResource.user?.first_name ||
          selectedServiceResource.id,
        color: "blue",
        id: selectedServiceResource.id,
      };
    }) ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-dvh overflow-hidden sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Create appointment</DialogTitle>
        </DialogHeader>
        <div className="grid h-full w-full gap-2 overflow-hidden border-b sm:grid-cols-2">
          <div className="sm:border-r">
            <ScrollArea className="h-[26rem] p-2">
              <DayCalendar
                initialTimeFormat="24h"
                events={
                  placeHolderEvent
                    ? [placeHolderEvent, ...selectedServiceResourcesEvents]
                    : selectedServiceResourcesEvents
                }
                date={date}
              />
            </ScrollArea>
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
          </div>
          <div className="flex h-full flex-col gap-2 overflow-hidden">
            <ServiceResourceComboBox
              onSelect={(serviceResource) => {
                handleServiceResourceSelect(serviceResource);
              }}
              selectedValues={selectedServiceResources?.map((sr) => sr.id)}
            />
            <ScrollArea className="grid h-full overflow-hidden">
              <div className="flex flex-col gap-2">
                {selectedServiceResources?.map(
                  (selectedServiceResource, index) => {
                    const name = "John Doe";
                    const initials = selectedServiceResource.user?.first_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase();
                    return (
                      <div
                        key={index}
                        className="flex w-80 items-center justify-between rounded-md bg-secondary px-2 py-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <Avatar className="h-6 w-6 border">
                            <AvatarImage
                              src={
                                selectedServiceResource.user.image_uri ||
                                `https://avatar.vercel.sh/${name}.svg?text=${initials}`
                              }
                              alt={name}
                            />
                            <AvatarFallback className="text-[0.6rem]">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate text-xs font-medium">
                            {selectedServiceResource.user?.first_name}{" "}
                            {selectedServiceResource.user?.last_name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <Button
                            size="sm"
                            variant={"outline"}
                            className="ml-auto"
                          >
                            Assign
                          </Button>
                          <Button
                            size="icon"
                            variant={"outline"}
                            className="ml-auto h-7 w-7 shadow-none"
                          >
                            <Icons.dotsHorizontal className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ServiceResourceComboBoxProps {
  className?: string;
  selectedValues?: string[];
  onSelect?: (
    value: RouterOutput["db"]["service_resource"]["get"]["textSearch"][number],
  ) => void;
}

export function ServiceResourceComboBox({
  className,
  selectedValues,
  onSelect,
}: ServiceResourceComboBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { data: service_resource, isFetching } =
    api.db.service_resource.get.textSearch.useQuery(
      { search: searchValue },
      { refetchOnMount: false },
    );

  const handleOnSearchChange = useDebouncedCallback(async (e: string) => {
    setIsTyping(false);
    if (e === "") {
      return;
    }
    setSearchValue(e);
  }, 400);

  const handleTyping = async (e: string) => {
    setIsTyping(true);
    handleOnSearchChange(e);
  };

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          isLoading={isFetching}
          className="w-80 font-normal"
          variant={"outline"}
        >
          <Icons.search className="mr-2 h-4 w-4" />
          <span>Select Employee</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-80 rounded-sm p-0", className)}
        align="center"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
      >
        <Command shouldFilter={false} className="rounded-sm">
          <CommandInput
            onValueChange={isFetching ? undefined : handleTyping}
            className="text-xs leading-normal"
            placeholder="Type to search..."
            ref={inputRef}
          />
          <CommandList>
            <CommandGroup>
              {service_resource?.map((service_resource, index) => (
                <CommandItem
                  key={service_resource.id}
                  value={service_resource.id}
                  onSelect={async (value) => {
                    onSelect?.(service_resource);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icons.checkCircled
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues?.includes(service_resource.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span>
                      {service_resource.user?.first_name}{" "}
                      {service_resource.user?.last_name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            {!isFetching && isTyping && (
              <CommandLoading className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                Listening...
              </CommandLoading>
            )}

            {!isFetching && !isTyping && (
              <CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                No results found
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
