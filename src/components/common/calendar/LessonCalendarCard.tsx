import { Lesson } from "@/domain/entities/Lesson";
import React from "react";

interface LessonCalendarCardProps {
  lesson: Lesson;
}

export const LessonCalendarCard = ({ lesson }: LessonCalendarCardProps) => {
  return (
    <div
      key={lesson.id}
      className="bg-gray-100 text-gray-800 h-full w-full rounded-xl p-2 border-s-4 border-sky-600"
    >
      <h4 className="font-bold">{lesson.title}</h4>
      <p>
        {lesson.start} - {lesson.end}
      </p>
      <p>{lesson.type}</p>
    </div>
  );
};
