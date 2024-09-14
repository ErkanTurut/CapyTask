"use client";

import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { Event } from "@/components/calendar/types";
import DayCalendar from "@/components/calendar/day-calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import TimeSelector from "./time-selector";
import ServiceResourceSelector from "./service-resource-selector";
import { api, RouterOutput } from "@/trpc/client";
import { LocationSelector } from "./location-selector";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  createServiceAppointmentSchema,
  TCreateServiceAppointmentSchema,
} from "@/trpc/server/routes/service_appointment/create.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange: { from?: Date; to?: Date };
  onDateRangeChange: (dateRange: DateRange) => void;
  date: Date;
  events?: Event[];
  work_order_id: string;
}

export default function AppointmentDialog({
  open,
  onOpenChange,
  dateRange,
  onDateRangeChange,
  date,
  events,
  work_order_id,
}: AppointmentDialogProps) {
  const params = useParams() as { team_identity: string };
  const utils = api.useUtils();
  const { mutate, isPending } = api.db.service_appointment.create.useMutation({
    onSuccess: () => {
      toast.success("Appointment created");
      onOpenChange(false);
      utils.db.service_appointment.get.byWorkOrder.invalidate({
        work_order_id,
      });
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to create appointment");
    },
  });

  const form = useForm<TCreateServiceAppointmentSchema>({
    resolver: zodResolver(createServiceAppointmentSchema),
    defaultValues: {
      work_order_id,
      date_range: {
        from: dateRange.from?.toISOString(),
        to: dateRange.to?.toISOString(),
      },
      work_order_item_id: undefined,
      service_resource: [],
    },
  });
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

  const [selectedServiceResources, setSelectedServiceResources] = useState<
    RouterOutput["db"]["service_resource"]["get"]["textSearch"] | undefined
  >(undefined);

  const [assignedResources, setAssignedResources] = useState<string[]>([]);

  const handleServiceResourceSelect = (
    serviceResource: RouterOutput["db"]["service_resource"]["get"]["textSearch"][number],
  ) => {
    if (selectedServiceResources?.some((sr) => sr.id === serviceResource.id)) {
      setSelectedServiceResources(
        (prev) => prev?.filter((sr) => sr.id !== serviceResource.id) ?? [],
      );
      setAssignedResources((prev) =>
        prev.filter((resource) => resource !== serviceResource.id),
      );
    } else {
      setSelectedServiceResources((prev) => [...(prev ?? []), serviceResource]);
    }
  };

  const handleAssignResource = (serviceResource: string) => {
    if (assignedResources.includes(serviceResource)) {
      setAssignedResources((prev) =>
        prev.filter((resource) => resource !== serviceResource),
      );
      form.setValue(
        "service_resource",
        selectedServiceResources
          ?.filter((sr) => sr.id !== serviceResource)
          .map((sr) => sr.id),
      );
    } else {
      setAssignedResources((prev) => [...prev, serviceResource]);
      form.setValue(
        "service_resource",
        selectedServiceResources?.map((sr) => sr.id).concat(serviceResource),
      );
    }
  };

  const selectedServiceResourcesEvents: Event[] =
    selectedServiceResources?.flatMap(
      (selectedServiceResource) =>
        selectedServiceResource.assigned_resource?.flatMap(
          (assignedResource) => {
            if (!assignedResource || !assignedResource.service_appointment) {
              return [];
            }
            return {
              start: new Date(assignedResource.service_appointment.start_date),
              end: new Date(assignedResource.service_appointment.end_date),
              title: assignedResource.service_appointment.id,
              color: "blue",
              id: assignedResource.service_appointment.id,
            };
          },
        ) ?? [],
    ) ?? [];

  const [selectedLocation, setSelectedLocations] = useState<
    RouterOutput["db"]["location"]["get"]["textSearch"][number] | undefined
  >(undefined);

  const handleLocationSelect = (
    location: RouterOutput["db"]["location"]["get"]["textSearch"][number],
  ) => {
    if (selectedLocation?.id === location.id) {
      setSelectedLocations(undefined);
      form.resetField("location_id");
    } else {
      setSelectedLocations(location);
      form.setValue("location_id", location.id);
    }
  };

  const { data } = api.db.service_resource.get.recommendation.useQuery(
    {
      team_identity: params.team_identity,
      from: dateRange.from?.toISOString(),
      to: dateRange.to?.toISOString(),
    },
    { enabled: Boolean(dateRange.from) && Boolean(dateRange.to) },
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-dvh overflow-hidden sm:max-w-[825px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Create appointment</DialogTitle>
            </DialogHeader>

            <div className="grid h-full w-full gap-2 overflow-hidden border-b sm:grid-cols-[1fr,0.8fr]">
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
                <FormField
                  control={form.control}
                  name="date_range"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimeSelector
                          dateRange={{
                            from: dateRange.from,
                            to: dateRange.to,
                          }}
                          onDateRangeChange={(dateRange) => {
                            if (!dateRange.from || !dateRange.to) {
                              return form.resetField("date_range");
                            }
                            form.setValue("date_range", {
                              from: dateRange.from.toISOString(),
                              to: dateRange.to.toISOString(),
                            });
                            onDateRangeChange(dateRange);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex h-full flex-col justify-between overflow-hidden pb-2">
                <div className="flex h-full flex-col gap-2 overflow-hidden">
                  <FormField
                    control={form.control}
                    name="service_resource"
                    render={({ field }) => (
                      <FormItem>
                        <FormMessage />
                        <FormControl>
                          <ServiceResourceSelector
                            onSelect={handleServiceResourceSelect}
                            selectedValues={selectedServiceResources}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <ScrollArea className="grid h-full overflow-hidden">
                    <div className="flex flex-col gap-1">
                      {selectedServiceResources?.map(
                        (selectedServiceResource) => {
                          const initials =
                            selectedServiceResource.user?.first_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase();
                          return (
                            <div
                              key={selectedServiceResource.id}
                              className="flex w-80 items-center justify-between rounded-md bg-secondary px-2 py-1"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <Avatar className="h-6 w-6 border">
                                  <AvatarImage
                                    src={
                                      selectedServiceResource.user.image_uri ||
                                      `https://avatar.vercel.sh/${initials}.svg?text=${initials}`
                                    }
                                    alt={initials}
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
                              <div className="flex grow-0 items-center justify-between gap-1">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant={"outline"}
                                  className="ml-auto"
                                  onClick={() =>
                                    handleAssignResource(
                                      selectedServiceResource.id,
                                    )
                                  }
                                >
                                  {assignedResources.includes(
                                    selectedServiceResource.id,
                                  )
                                    ? "Unassign"
                                    : "Assign"}
                                </Button>
                                <Button
                                  type="button"
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

                <FormField
                  control={form.control}
                  name="location_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        <LocationSelector
                          onSelect={handleLocationSelect}
                          selectedValue={selectedLocation}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
