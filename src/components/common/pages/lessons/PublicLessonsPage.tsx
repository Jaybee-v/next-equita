"use client";
import React, { useEffect, useState } from "react";
import { SearchComponent } from "../../calendar/SearchComponent";
import { LessonRepositoryImpl } from "@/infrastructure/repositories/LessonRepositoryImpl";
import { formatDate } from "@/lib/dates";
import { Lesson } from "@/domain/entities/Lesson";
import { LessonCalendarCard } from "../../calendar/LessonCalendarCard";

export const PublicLessonsPage = () => {
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      console.log("DATE", currentDate);

      const response = await new LessonRepositoryImpl().getLessonsByDate(
        currentDate
      );

      console.log(response);
      setLessons(response);
    };
    fetchLessons();
  }, [currentDate]);

  return (
    <div>
      <SearchComponent
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <section className="grid grid-cols-4">
        {lessons.map((lesson) => (
          <LessonCalendarCard session={null} key={lesson.id} lesson={lesson} />
        ))}
      </section>
    </div>
  );
};
