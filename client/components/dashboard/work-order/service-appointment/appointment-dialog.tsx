"use client";

import DayCalendar from "@/components/calendar/day-calendar";
import { Event } from "@/components/calendar/types";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getWorkShiftsFromDateRange } from "@/lib/service-appointment/utils";
import { Shift } from "@/lib/types";
import { cn } from "@/lib/utils";
import { api, RouterOutput } from "@/trpc/client";
import {
  createServiceAppointmentSchema,
  TCreateServiceAppointmentSchema,
} from "@/trpc/server/routes/service_appointment/create.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { experimental_useObject as useObject } from "ai/react";
import { endOfDay, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LocationSelector } from "./location-selector";
import ServiceResourceSelector from "./service-resource-selector";
import TimeSelector from "./time-selector";
import { WorkItemSelector } from "./work-item-selector";

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
  const [selectedServiceResources, setSelectedServiceResources] = useState<
    RouterOutput["db"]["service_resource"]["get"]["textSearch"] | undefined
  >(undefined);
  const [assignedResources, setAssignedResources] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocations] = useState<
    RouterOutput["db"]["location"]["get"]["textSearch"][number] | undefined
  >(undefined);
  const [selectedWorkItem, setSelectedWorkItem] = useState<
    | RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"][number]
    | undefined
  >(undefined);

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
      location_id: undefined,
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

  useEffect(() => {
    form.reset({
      work_order_id,
      date_range: {
        from: dateRange.from?.toISOString(),
        to: dateRange.to?.toISOString(),
      },
      work_order_item_id: undefined,
      service_resource: [],
    });
  }, [dateRange.from, dateRange.to, work_order_id]);

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
          .map((sr) => sr.id) ?? [],
      );
    } else {
      setAssignedResources((prev) => [...prev, serviceResource]);
      form.setValue(
        "service_resource",
        selectedServiceResources
          ?.map((sr) => sr.id)
          .filter((sr) => sr !== serviceResource) ?? [],
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
              title:
                selectedServiceResource.first_name +
                " " +
                selectedServiceResource.last_name,
              color: "blue",
              id: assignedResource.service_appointment.id,
            };
          },
        ) ?? [],
    ) ?? [];

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

  const handleWorkItemSelect = (
    workItem: RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"][number],
  ) => {
    if (selectedWorkItem?.id === workItem.id) {
      setSelectedWorkItem(undefined);
      form.resetField("work_order_item_id");
    } else {
      setSelectedWorkItem(workItem);
      form.setValue("work_order_item_id", workItem.id);
    }
  };

  const shift: Shift = {
    start_time: "07:00",
    end_time: "19:00",
    days: [1, 2, 3, 4, 5], // Monday to Friday
  };

  const workShit = getWorkShiftsFromDateRange(
    startOfDay(date),
    endOfDay(date),
    shift,
  );

  const { data } = api.db.service_resource.get.recommendation.useQuery(
    {
      team_identity,
      from: workShit[0].start.toISOString(),
      to: workShit[0].end.toISOString(),
    },
    { enabled: Boolean(dateRange.from) && Boolean(dateRange.to) },
  );

  const { object, submit, isLoading } = useObject({
    api: "/api/ai/service-resource",
    schema: z.object({
      recommendations: z.array(
        z.object({
          id: z.string(),
          is_active: z.boolean(),
          availableSlots: z.array(
            z.object({
              start: z.string(),
              end: z.string(),
            }),
          ),
          first_name: z.string(),
          last_name: z.string(),
        }),
      ),
    }),
    // onFinish(event) {
    //   if (!event.object || event.object.recommendations.length === 0 || !data) {
    //     return;
    //   }
    //   const foundResources = event.object.recommendations
    //     .map((recommendation) => {
    //       return data.find((item) => item.id === recommendation.id);
    //     })
    //     .filter((resource) => resource !== undefined);
    //   setSelectedServiceResources(foundResources);
    // },
  });

  const { data: work_order_item } =
    api.db.work_order_item.get.byWorkOrder.useQuery({
      work_order_id,
    });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        onOpenChange(open);
      }}
    >
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
                <ScrollArea className="h-[26rem]">
                  <div className="grid px-2">
                    <DayCalendar
                      initialTimeFormat="24h"
                      events={
                        placeHolderEvent
                          ? [
                              placeHolderEvent,
                              ...selectedServiceResourcesEvents,
                            ]
                          : selectedServiceResourcesEvents
                      }
                      date={date}
                    />
                  </div>
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
              <div className="flex h-full flex-col justify-between gap-2 overflow-hidden pb-2">
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
                  <Button
                    type="button"
                    size="sm"
                    variant={"ghost"}
                    onClick={() => {
                      submit(JSON.stringify(data));
                    }}
                    className={`shrink-0 text-muted-foreground hover:bg-transparent ${isLoading && "animate-pulse text-primary hover:text-primary"} `}
                  >
                    <Icons.sparkles className="mr-2 size-4" />
                    <span className="text-xs font-medium">Recommend</span>
                  </Button>

                  <ScrollArea className="grid h-full overflow-hidden">
                    <div className="flex flex-col gap-1">
                      {/* <div className="flex flex-col gap-1">
                        {object?.recommendations?.map(
                          (recommendation, index) => {
                            if (!recommendation) {
                              return null;
                            }
                            return ServiceRessourceCard(
                              {
                                id: recommendation.id,
                                is_assigned: assignedResources.includes(
                                  recommendation?.id || "",
                                ),
                                first_name:
                                  recommendation?.user?.first_name || undefined,
                                last_name:
                                  recommendation?.user?.last_name || undefined,
                                image_uri:
                                  recommendation?.user?.image_uri || undefined,
                              },
                              handleAssignResource,
                              true,
                            );
                          },
                        )}
                      </div> */}
                      {selectedServiceResources?.map(
                        (selectedServiceResource) => {
                          return ServiceRessourceCard(
                            {
                              id: selectedServiceResource.id,
                              is_assigned: assignedResources.includes(
                                selectedServiceResource.id,
                              ),
                              first_name:
                                selectedServiceResource.first_name || undefined,
                              last_name:
                                selectedServiceResource.last_name || undefined,
                            },
                            handleAssignResource,
                          );
                        },
                      )}
                      {/* {selectedServiceResources?.map(
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
                      )} */}
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
                <FormField
                  control={form.control}
                  name="work_order_item_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        <WorkItemSelector
                          onSelect={handleWorkItemSelect}
                          selectedValue={selectedWorkItem}
                          workOrderItems={work_order_item?.data ?? []}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button isLoading={isPending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function ServiceRessourceCard(
  serviceResource: {
    id?: string;
    is_assigned?: boolean;
    first_name?: string;
    last_name?: string;
    image_uri?: string;
  },
  onAssign: (id: string) => void,
  is_recommended?: boolean,
) {
  const initials =
    `${serviceResource.first_name?.[0] ?? ""}${serviceResource.last_name?.[0] ?? ""}`.toUpperCase();

  return (
    <div
      key={serviceResource.id}
      className={cn(
        "flex w-80 items-center justify-between rounded-md border border-transparent bg-secondary px-2 py-1",
        {
          "border-dashed border-border": is_recommended,
        },
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Avatar className="h-6 w-6 border">
          <AvatarImage
            src={
              serviceResource.image_uri ||
              `https://avatar.vercel.sh/${initials}.svg?text=${initials}`
            }
            alt={initials}
          />
          <AvatarFallback className="text-[0.6rem]">{initials}</AvatarFallback>
        </Avatar>
        <span
          className={`truncate text-xs font-medium ${is_recommended && "text-primary"}`}
        >
          {serviceResource.first_name} {serviceResource.last_name}
        </span>
      </div>
      <div className="flex grow-0 items-center justify-between gap-1">
        <Button
          type="button"
          size="sm"
          variant={"outline"}
          className="ml-auto"
          onClick={() => {
            serviceResource.id && onAssign(serviceResource.id);
          }}
        >
          {serviceResource.is_assigned ? "Unassign" : "Assign"}
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
}
