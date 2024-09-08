"use client";
import React, { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

interface WeeklyCalendarProps {
  events: Event[];
  onSlotClick: (date: Date) => void;
}

export default function WeeklyCalendar({
  events = [],
  onSlotClick,
}: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate);

  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventForDateAndHour = (date: Date, hour: number) => {
    return events.find(
      (event) =>
        isSameDay(event.start, date) &&
        event.start.getHours() <= hour &&
        event.end.getHours() > hour,
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          <div className="h-16 bg-white"></div>
          {days.map((day, index) => (
            <div key={index} className="bg-white p-2 text-center">
              <div className="font-medium">{format(day, "EEE")}</div>
              <div
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                  isSameDay(day, new Date()) ? "bg-purple-500 text-white" : ""
                }`}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="bg-white p-2 text-right text-sm text-gray-500">
                {format(new Date().setHours(hour), "ha")}
              </div>
              {days.map((day, dayIndex) => {
                const event = getEventForDateAndHour(day, hour);
                return (
                  <div
                    key={dayIndex}
                    className="border-t border-gray-100 bg-white p-1"
                    onClick={() => onSlotClick(new Date(day.setHours(hour)))}
                  >
                    {event && (
                      <div
                        className={`rounded p-1 text-xs ${event.color} overflow-hidden`}
                        style={{
                          height: `${(event.end.getHours() - event.start.getHours()) * 100}%`,
                          marginTop: `${(event.start.getMinutes() / 60) * 100}%`,
                        }}
                      >
                        {event.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
