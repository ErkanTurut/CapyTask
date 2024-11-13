"use client";

import { StatusConfig, statusConfig } from "@/components/config/status.config";
import type { Enums } from "@gembuddy/supabase/types";
import { Button } from "@gembuddy/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gembuddy/ui/card";
import { cn } from "@gembuddy/ui/cn";
import { Icons } from "@gembuddy/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gembuddy/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@gembuddy/ui/tabs";
import {
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Play,
  User,
} from "lucide-react";
import { useState } from "react";

export default function TechnicianDashboard() {
  const [filter, setFilter] = useState("all");

  const appointments = [
    {
      id: 1,
      customer: "John Doe",
      location: "123 Main St",
      time: "09:00 AM",
      description: "HVAC Maintenance",
      status: "OPEN" as Enums<"Status">,
    },
    {
      id: 2,
      customer: "Jane Smith",
      location: "456 Elm St",
      time: "11:30 AM",
      description: "Electrical Repair",
      status: "IN_PROGRESS" as Enums<"Status">,
    },
    {
      id: 3,
      customer: "Bob Johnson",
      location: "789 Oak St",
      time: "02:00 PM",
      description: "Plumbing Inspection",
      status: "COMPLETED" as Enums<"Status">,
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") return true;
    return appointment.status.toLowerCase() === filter;
  });

  return (
    <div>
      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
        </TabsList>
        <div className="mt-4 flex justify-end">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="today" className="mt-4">
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => {
              const status = statusConfig[appointment.status];
              const Icon = status.icon ? Icons[status.icon] : undefined;
              return (
                <Card key={appointment.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{appointment.customer}</span>
                      <span
                        className={cn(
                          `px-2 py-0.5 rounded-lg text-xs font-mono flex items-center gap-1 ${statusConfig[appointment.status].color} `,
                        )}
                      >
                        {Icon && <Icon className="size-4" />}
                        {statusConfig[appointment.status].label}
                      </span>
                    </CardTitle>
                    <CardDescription>{appointment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {appointment.location}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      Navigate
                    </Button>
                    <Button variant="default" size="sm">
                      {appointment.status === "OPEN" ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Job
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="tomorrow">
          <p className="text-center text-gray-500">
            No appointments scheduled for tomorrow.
          </p>
        </TabsContent>
        <TabsContent value="week">
          <p className="text-center text-gray-500">
            View your appointments for the rest of the week here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
