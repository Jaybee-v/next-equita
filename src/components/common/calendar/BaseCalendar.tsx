"use client";

import React, { useEffect, useState } from "react";
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
import { Session } from "next-auth";
import { LessonRepositoryImpl } from "@/infrastructure/repositories/LessonRepositoryImpl";
import { GetLessonByStableIdUseCase } from "@/domain/use-cases/GetLessonByStableId.usecase";
import { GetLessonsForRiderUseCase } from "@/domain/use-cases/GetLessonsForRider.usecase";
import { Loader } from "../Loader";
import { GetLessonByTeacherUseCase } from "@/domain/use-cases/GetLessonByTeacher.usecase";

interface BaseCalendarProps {
  session: Session;
  searchId?: string | null;
}

const START_HOUR = 7;
const END_HOUR = 22;
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => i + START_HOUR
);

export const BaseCalendar = ({ session, searchId }: BaseCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week">("week");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 640) setView("day");
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true);
      try {
        const lessonRepository = new LessonRepositoryImpl();
        let results: Lesson[] = [];

        if (session.user.role === "stable") {
          const getLessonByStableIdUseCase = new GetLessonByStableIdUseCase(
            lessonRepository
          );
          results = await getLessonByStableIdUseCase.execute(session.user.id);
        } else if (session.user.role === "rider") {
          const getLessonsForRider = new GetLessonsForRiderUseCase(
            lessonRepository
          );
          results = await getLessonsForRider.execute(session.user.id);
          if (searchId) {
            results = results.filter((lesson) => lesson.stableId === searchId);
          }
        } else if (session.user.role === "teacher") {
          const getLessonByTeacherUseCase = new GetLessonByTeacherUseCase(
            lessonRepository
          );
          results = await getLessonByTeacherUseCase.execute(session.user.id);
        }

        setLessons(results);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, [session, searchId]);

  const navigateDate = (direction: "prev" | "next") => {
    const days = view === "day" ? 1 : 7;
    setCurrentDate((prev) =>
      addDays(prev, direction === "prev" ? -days : days)
    );
  };

  const timeSlots = generateTimeSlots(currentDate, START_HOUR, END_HOUR);
  const weekDays = generateWeekDays(currentDate);

  const getLessonsForDay = (day: Date) => {
    return lessons.filter((lesson) => isSameDay(new Date(lesson.date), day));
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
        className="absolute rounded-md overflow-hidden shadow-sm transition-all hover:shadow-md"
        style={{
          top: `${(startSlot * 100) / HOURS.length}%`,
          height: `${(duration * 100) / HOURS.length}%`,
          left: `${left}%`,
          width: `${width}%`,
          zIndex: 10,
        }}
      >
        <LessonCalendarCard lesson={lesson} session={session} />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-card rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigateDate("prev")}
            variant="outline"
            size="icon"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
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
                })} - ${new Date(weekDays[6]).toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}
          </h2>
          <Button
            onClick={() => navigateDate("next")}
            variant="outline"
            size="icon"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
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

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-card">
          <div className="grid grid-cols-8 bg-muted">
            <div className="w-20"></div>
            {view === "week" &&
              weekDays.map((day, index) => (
                <div
                  key={index}
                  className="py-2 px-2 font-semibold text-center"
                >
                  <div className="capitalize text-sm">
                    {new Date(day).toLocaleDateString("fr-FR", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-lg">
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
                  className="h-28 border-b text-right pr-2 text-sm text-muted-foreground py-1"
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
              {(view === "week" ? weekDays : [currentDate]).map(
                (day, dayIndex) => {
                  const dayLessons = getLessonsForDay(day);
                  const { overlaps, maxOverlap } = calculateOverlap(dayLessons);
                  return (
                    <div key={dayIndex} className="border-l relative">
                      {timeSlots.map((_, slotIndex) => (
                        <div key={slotIndex} className="h-28 border-b" />
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
                }
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
