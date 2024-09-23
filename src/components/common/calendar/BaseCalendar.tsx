"use client";

import React, { useState } from "react";
import {
  addDays,
  isSameDay,
  parseTime,
  generateWeekDays,
  generateTimeSlots,
} from "@/lib/dates";
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
import { LessonCalendarCard } from "./LessonCalendarCard";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { LessonForm } from "../forms/LessonForm";
import { Session } from "next-auth";

interface BaseCalendarProps {
  lessons: Lesson[];
  session: Session;
}

const START_HOUR = 7;
const END_HOUR = 22;
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => i + START_HOUR
);

export const BaseCalendar = ({ lessons }: BaseCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week">("week");

  const navigateDate = (direction: "prev" | "next") => {
    const days = view === "day" ? 1 : 7;
    setCurrentDate((prev) =>
      addDays(prev, direction === "prev" ? -days : days)
    );
  };

  const timeSlots = generateTimeSlots(currentDate, START_HOUR, END_HOUR);
  const weekDays = generateWeekDays(currentDate);

  const getLessonsForDay = (day: Date) => {
    return lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date);
      return isSameDay(lessonDate, day);
    });
  };

  const calculateOverlap = (dayLessons: Lesson[]) => {
    const sortedLessons = dayLessons.sort(
      (a, b) => parseTime(a.start).getTime() - parseTime(b.start).getTime()
    );
    const overlaps: { [key: string]: number } = {};
    const maxOverlap: { [key: string]: number } = {};

    sortedLessons.forEach((lesson, i) => {
      const lessonStart = parseTime(lesson.start);
      const lessonEnd = parseTime(lesson.end);
      overlaps[lesson.id] = 0;
      maxOverlap[lesson.id] = 1;

      for (let j = 0; j < i; j++) {
        const otherLesson = sortedLessons[j];
        const otherStart = parseTime(otherLesson.start);
        const otherEnd = parseTime(otherLesson.end);

        if (lessonStart < otherEnd && otherStart < lessonEnd) {
          overlaps[lesson.id]++;
          overlaps[otherLesson.id]++;
          maxOverlap[lesson.id] = Math.max(
            maxOverlap[lesson.id],
            overlaps[lesson.id] + 1
          );
          maxOverlap[otherLesson.id] = Math.max(
            maxOverlap[otherLesson.id],
            overlaps[otherLesson.id] + 1
          );
        }
      }
    });

    return { overlaps, maxOverlap };
  };

  const renderLesson = (
    lesson: Lesson,
    dayStart: Date,
    overlap: number,
    maxOverlap: number
  ) => {
    const startTime = parseTime(lesson.start);
    const endTime = parseTime(lesson.end);
    const lessonStartHour = startTime.getHours() + startTime.getMinutes() / 60;
    const lessonEndHour = endTime.getHours() + endTime.getMinutes() / 60;
    const startSlot = lessonStartHour - START_HOUR;
    const duration = lessonEndHour - lessonStartHour;

    if (startSlot < 0 || startSlot >= HOURS.length) return null;

    const width = 100 / maxOverlap;
    const left = overlap * width;

    return (
      <div
        key={lesson.id}
        className="absolute bg-blue-200 rounded p-1 overflow-hidden"
        style={{
          top: `${(startSlot * 100) / HOURS.length}%`,
          height: `${(duration * 100) / HOURS.length}%`,
          left: `0%`,
          width: `100%`,
          zIndex: 10,
        }}
      >
        <LessonCalendarCard lesson={lesson} />
      </div>
    );
  };

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
                className="h-20 border-b text-right pr-2 text-sm text-gray-500"
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
              ? weekDays.map((day, dayIndex) => {
                  const dayLessons = getLessonsForDay(day);
                  const { overlaps, maxOverlap } = calculateOverlap(dayLessons);
                  return (
                    <div key={dayIndex} className="border-l relative ">
                      {timeSlots.map((_, slotIndex) => (
                        <div key={slotIndex} className="h-20 border-b" />
                      ))}
                      {dayLessons.map((lesson) =>
                        renderLesson(
                          lesson,
                          day,
                          overlaps[lesson.id],
                          maxOverlap[lesson.id]
                        )
                      )}
                    </div>
                  );
                })
              : (() => {
                  const dayLessons = getLessonsForDay(currentDate);
                  const { overlaps, maxOverlap } = calculateOverlap(dayLessons);
                  console.log(
                    " combien de leçons ce jour ,",
                    dayLessons.length
                  );

                  return (
                    <div className={`relative`}>
                      {timeSlots.map((_, slotIndex) => (
                        <div key={slotIndex} className="h-20 border-b" />
                      ))}
                      {dayLessons.map((lesson) =>
                        renderLesson(
                          lesson,
                          currentDate,
                          overlaps[lesson.id],
                          maxOverlap[lesson.id]
                        )
                      )}
                    </div>
                  );
                })()}
          </div>
        </div>
        {/* <div className="grid grid-cols-[auto,1fr]">
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
            {view === "week" ? (
              weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="border-l relative">
                  {timeSlots.map((_, slotIndex) => (
                    <div key={slotIndex} className="h-32 border-b" />
                  ))}
                  {getLessonsForDay(day).map((lesson) =>
                    renderLesson(lesson, day)
                  )}
                </div>
              ))
            ) : (
              <div className="relative">
                {timeSlots.map((_, slotIndex) => (
                  <div key={slotIndex} className="h-32 border-b" />
                ))}
                {getLessonsForDay(currentDate).map((lesson) =>
                  renderLesson(lesson, currentDate)
                )}
              </div>
            )}
          </div>
        </div> */}
        {/* <div className="grid grid-cols-[auto,1fr]">
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
                    {timeSlots.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className="h-32 border-b p-1 overflow-auto"
                      >
                        {getLessonsForDay(day, slot.time).map((lesson) => (
                          <LessonCalendarCard key={lesson.id} lesson={lesson} />
                        ))}
                        <article className="flex justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="bg-green-600 hover:bg-green-500"
                                size={"sm"}
                              >
                                <Plus />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card">
                              <DialogHeader>
                                <DialogTitle>
                                  Créer une leçon pour <br />{" "}
                                  <span className="capitalize">
                                    {new Date(day).toLocaleDateString("fr-FR", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}{" "}
                                  </span>
                                  à {slot.time}
                                </DialogTitle>
                              </DialogHeader>
                              <LessonForm
                                session={session}
                                dateState={new Date(day)}
                                start={slot.time}
                              />
                            </DialogContent>
                          </Dialog>
                        </article>
                      </div>
                    ))}
                  </div>
                ))
              : timeSlots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="h-32 border-b p-1 overflow-auto"
                  >
                    {getLessonsForDay(currentDate, slot.time).map((lesson) => (
                      <LessonCalendarCard key={lesson.id} lesson={lesson} />
                    ))}
                  </div>
                ))}
          </div>
        </div> */}
        {/* <div className="grid grid-cols-[auto,1fr]">
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
                              <LessonCalendarCard
                                key={lesson.id}
                                lesson={lesson}
                              />
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
                            <p className="text-orange-400">
                              {lesson.requiredLevel === 10
                                ? "Tous niveaux"
                                : lesson.requiredLevel === 0
                                ? "Débutant"
                                : lesson.requiredLevel === 1
                                ? "G1"
                                : lesson.requiredLevel === 2
                                ? "G2"
                                : lesson.requiredLevel === 3
                                ? "G3"
                                : lesson.requiredLevel === 4
                                ? "G4"
                                : lesson.requiredLevel === 5
                                ? "G5"
                                : lesson.requiredLevel === 6
                                ? "G6"
                                : lesson.requiredLevel === 7
                                ? "G7"
                                : null}
                            </p>
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
        </div> */}
      </div>
    </div>
  );
};
