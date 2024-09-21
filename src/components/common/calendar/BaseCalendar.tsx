"use client";

import React, { useState } from "react";
import { addDays, startOfWeek, addHours } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lesson } from "@/domain/entities/Lesson";

const START_HOUR = 7;
const END_HOUR = 22;
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => i + START_HOUR
);

interface BaseCalendarProps {
  lessons: Lesson[];
}

export const BaseCalendar = ({ lessons }: BaseCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week">("week");

  const generateTimeSlots = () => {
    return HOURS.map((hour) => ({
      time: `${hour.toString().padStart(2, "0")}:00`,
      date: addHours(currentDate, hour),
    }));
  };

  const generateWeekDays = () => {
    const startDate = startOfWeek(currentDate);
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const navigateDate = (direction: "prev" | "next") => {
    const days = view === "day" ? 1 : 7;
    setCurrentDate((prev) =>
      addDays(prev, direction === "prev" ? -days : days)
    );
  };

  const timeSlots = generateTimeSlots();
  const weekDays = generateWeekDays();

  return (
    <div className="container mx-auto p-4 bg-card rounded drop-shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => navigateDate("prev")}
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => navigateDate("next")}
            variant="outline"
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold capitalize">
            {view === "day"
              ? new Date(currentDate).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : `${new Date(weekDays[0]).toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })} - ${new Date(weekDays[6]).toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}
          </h2>
        </div>
        <Select
          value={view}
          onValueChange={(value: "day" | "week") => setView(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Jour</SelectItem>
            <SelectItem value="week">Semaine</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 bg-gray-100">
          <div className="w-20"></div>
          {view === "week" &&
            weekDays.map((day, index) => (
              <div
                key={index}
                className="flex justify-start gap-4 py-2 font-semibold"
              >
                <div className="capitalize">
                  {new Date(day).toLocaleDateString("fr-FR", {
                    weekday: "short",
                  })}
                </div>
                <div>
                  {new Date(day).toLocaleDateString("fr-FR", {
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-[auto,1fr]">
          <div className="w-20">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className="h-32 border-b text-right pr-2 text-sm text-gray-500"
              >
                {slot.time}
              </div>
            ))}
          </div>
          <div
            className={`grid ${
              view === "week" ? "grid-cols-7" : "grid-cols-1"
            }`}
          >
            {view === "week"
              ? weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="border-l">
                    {timeSlots.map((_, slotIndex) => (
                      <div
                        key={slotIndex}
                        className=" h-32 border-b p-1 overflow-auto"
                      >
                        {lessons.map((lesson) => {
                          if (
                            lesson.start.split(":")[0] ===
                            timeSlots[slotIndex].time.split(":")[0]
                          ) {
                            return (
                              <div
                                key={lesson.id}
                                className="bg-gray-100 text-gray-800 rounded-xl p-2 border-s-4 border-sky-600"
                              >
                                <h4 className="font-bold">{lesson.title}</h4>
                                <p>
                                  {lesson.start} - {lesson.end}
                                </p>
                                <p>{lesson.type}</p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    ))}
                  </div>
                ))
              : timeSlots.map((_, slotIndex) => (
                  <div
                    key={slotIndex}
                    className=" h-32 border-b p-1 overflow-auto"
                  >
                    {lessons.map((lesson) => {
                      if (
                        lesson.start.split(":")[0] ===
                        timeSlots[slotIndex].time.split(":")[0]
                      ) {
                        return (
                          <div
                            key={lesson.id}
                            className="bg-gray-100 text-gray-800 rounded-xl p-2 border-s-4 border-sky-600"
                          >
                            <h4 className="font-bold">{lesson.title}</h4>
                            <p>
                              {lesson.start} - {lesson.end}
                            </p>
                            <p>{lesson.type}</p>
                          </div>
                        );
                      }
                    })}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
