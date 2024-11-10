import DayCalendar from "@/components/calendar/day-calendar";
import type { Event } from "@/components/calendar/types";
import { Avatar, AvatarFallback, AvatarImage } from "@gembuddy/ui/avatar";
import { Button } from "@gembuddy/ui/button";
import { Icons } from "@gembuddy/ui/icons";

import type { Shift } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getWorkShiftsFromDateRange } from "@gembuddy/lib/utils";
import { type RouterOutput, api } from "@gembuddy/trpc/client";
import {
  type TCreateServiceAppointmentWithItemsSchema,
  ZCreateServiceAppointmentWithItemsSchema,
} from "@gembuddy/trpc/schema/service_appointment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@gembuddy/ui/form";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { endOfDay, startOfDay } from "date-fns";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Label } from "@gembuddy/ui/label";
import { LocationSelector } from "../location-selector";
import ServiceResourceSelector from "./service-resource-selector";
import TimeSelector from "./time-selector";
import { WorkItemSelector } from "./work-item-selector";

interface ServiceAppointmentCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  dateRange: { from?: Date; to?: Date };
  onDateRangeChange: (dateRange: DateRange) => void;
  date: Date;
  work_order_id: string;
  team_identity: string;
  onFinish?: (
    data:
      | RouterOutput["db"]["service_appointment"]["create"]["withItems"]
      | undefined,
  ) => void;
}

export function ServiceAppointmentCreateForm({
  className,
  dateRange,
  onDateRangeChange,
  date,
  work_order_id,
  team_identity,
  onFinish,
}: ServiceAppointmentCreateFormProps) {
  const [selectedServiceResources, setSelectedServiceResources] = useState<
    | NonNullable<RouterOutput["db"]["service_resource"]["get"]["textSearch"]>
    | undefined
  >(undefined);
  const [assignedResources, setAssignedResources] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocations] = useState<
    | NonNullable<
        RouterOutput["db"]["location"]["get"]["textSearch"]["data"]
      >[number]
    | undefined
  >(undefined);
  const [selectedWorkItem, setSelectedWorkItem] = useState<
    | NonNullable<
        RouterOutput["db"]["work_order_item"]["get"]["textSearch"]["data"]
      >[number]
    | undefined
  >(undefined);

  const startDateMinuteRef = useRef<HTMLInputElement>(null);
  const startDateHourRef = useRef<HTMLInputElement>(null);

  const utils = api.useUtils();
  const { mutate, isPending } =
    api.db.service_appointment.create.withItems.useMutation({
      onSuccess: (data) => {
        toast.success("Appointment created");
        onFinish?.(data);
        utils.db.service_appointment.get.byWorkOrder.invalidate({
          work_order_id,
        });
        form.reset();
      },
      onError: (error) => {
        toast.error("Failed to create appointment");
      },
    });

  const form = useForm<TCreateServiceAppointmentWithItemsSchema>({
    resolver: zodResolver(ZCreateServiceAppointmentWithItemsSchema),
    defaultValues: {
      work_order_id,
      start_date: dateRange.from?.toISOString(),
      end_date: dateRange.to?.toISOString(),

      work_order_item_id: undefined,

      service_resources: {
        service_resource_id: [],
      },
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
      // date_range: {
      //   from: dateRange.from?.toISOString(),
      //   to: dateRange.to?.toISOString(),
      // },
      start_date: dateRange.from?.toISOString(),
      end_date: dateRange.to?.toISOString(),
      service_resources: {
        service_resource_id: [],
      },
      location_id: undefined,
      work_order_item_id: undefined,
      // service_resource: [],
    });
  }, [dateRange.from, dateRange.to, work_order_id]);

  const handleServiceResourceSelect = (
    serviceResource: NonNullable<
      RouterOutput["db"]["service_resource"]["get"]["textSearch"]["data"]
    >[number],
  ) => {
    if (
      selectedServiceResources?.data?.some((sr) => sr.id === serviceResource.id)
    ) {
      setSelectedServiceResources((prev) => ({
        data: prev?.data?.filter((sr) => sr.id !== serviceResource.id) ?? [],
      }));
      setAssignedResources((prev) =>
        prev.filter((resource) => resource !== serviceResource.id),
      );
    } else {
      setSelectedServiceResources((prev) => ({
        data: [...(prev?.data ?? []), serviceResource],
      }));
    }
  };

  const handleAssignResource = (serviceResource: string) => {
    if (assignedResources.includes(serviceResource)) {
      setAssignedResources((prev) =>
        prev.filter((resource) => resource !== serviceResource),
      );
      form.setValue("service_resources", {
        service_resource_id: assignedResources,
      });
    } else {
      setAssignedResources((prev) => [...prev, serviceResource]);
      form.setValue("service_resources", {
        service_resource_id: assignedResources,
      });
    }
  };

  const selectedServiceResourcesEvents: Event[] =
    selectedServiceResources?.data?.flatMap(
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
    location: NonNullable<
      RouterOutput["db"]["location"]["get"]["textSearch"]["data"]
    >[number],
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
    workItem: NonNullable<
      RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"]
    >[number],
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

  // const { data } = api.db.service_resource.get.recommendation.useQuery(
  //   {
  //     team_identity,
  //     from: workShit[0].start.toISOString(),
  //     to: workShit[0].end.toISOString(),
  //   },
  //   { enabled: Boolean(dateRange.from) && Boolean(dateRange.to) }
  // );

  // const { object, submit, isLoading } = useObject({
  //   api: "/api/ai/service-resource",
  //   schema: z.object({
  //     recommendations: z.array(
  //       z.object({
  //         id: z.string(),
  //         is_active: z.boolean(),
  //         availableSlots: z.array(
  //           z.object({
  //             start: z.string(),
  //             end: z.string(),
  //           })
  //         ),
  //         first_name: z.string(),
  //         last_name: z.string(),
  //       })
  //     ),
  //   }),
  // });

  const { data: work_order_item } =
    api.db.work_order_item.get.byWorkOrder.useQuery({
      work_order_id,
    });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="flex flex-col gap-4"
      >
        <div className="grid h-full w-full gap-2 overflow-hidden border-b sm:grid-cols-[1fr,0.8fr] pb-2">
          <div className="sm:border-r">
            <ScrollArea className="h-[28rem]">
              <div className="grid px-2">
                <DayCalendar
                  initialTimeFormat="24h"
                  events={
                    placeHolderEvent
                      ? [placeHolderEvent, ...selectedServiceResourcesEvents]
                      : selectedServiceResourcesEvents
                  }
                  date={date}
                />
              </div>
            </ScrollArea>
            <div className="flex items-center justify-evenly">
              <div className="flex items-center gap-2">
                <Label htmlFor="start_date" className="text-xs font-mono pt-4">
                  from :
                </Label>
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimeSelector
                          date={new Date(field.value)}
                          onDateRangeChange={(date) => {
                            if (!date) {
                              return form.resetField("start_date");
                            }
                            form.setValue("start_date", date?.toISOString());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="start_date" className="text-xs font-mono pt-4">
                  to :
                </Label>
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimeSelector
                          date={new Date(field.value)}
                          onDateRangeChange={(date) => {
                            if (!date) {
                              return form.resetField("end_date");
                            }
                            form.setValue("end_date", date?.toISOString());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-between gap-2 overflow-hidden">
            <div className="flex h-full flex-col gap-2 overflow-hidden">
              <FormField
                control={form.control}
                name="service_resources"
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
                  // submit(JSON.stringify(data));
                }}
                className={`shrink-0 text-muted-foreground hover:bg-transparent 
                  ${true && "animate-pulse text-primary hover:text-primary"} 
                  `}
              >
                <Icons.sparkles className="mr-2 size-4" />
                <span className="text-xs font-medium">Recommend</span>
              </Button>

              <ScrollArea className="grid h-full overflow-hidden">
                <div className="flex flex-col gap-1">
                  {selectedServiceResources?.data?.map(
                    (selectedServiceResource) => {
                      return ServiceRessourceItem(
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
        <div className="flex items-center justify-end gap-2">
          <Button
            variant={"secondary"}
            type="reset"
            onClick={() => onFinish?.(undefined)}
          >
            Cancel
          </Button>
          <Button isLoading={isPending} type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}

function ServiceRessourceItem(
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
  const initials = `${serviceResource.first_name?.[0] ?? ""}${
    serviceResource.last_name?.[0] ?? ""
  }`.toUpperCase();

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
          className={`truncate text-xs font-medium ${
            is_recommended && "text-primary"
          }`}
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
