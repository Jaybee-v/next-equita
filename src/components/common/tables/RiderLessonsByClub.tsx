"use client";
import { Lesson } from "@/domain/entities/Lesson";
import React, { useState } from "react";
import { BaseCalendar } from "../calendar/BaseCalendar";
import { useSearchParams } from "next/navigation";

interface RiderLessonsByClubProps {
  lessons: Lesson[];
}

export const RiderLessonsByClub = ({ lessons }: RiderLessonsByClubProps) => {
  const params = useSearchParams();
  const [selectedLessons, setSelectedLessons] = useState<Lesson[]>([]);
  const searchId = params.get("club");

  React.useEffect(() => {
    if (searchId) {
      const selected = lessons.filter((lesson) => lesson.stableId === searchId);
      setSelectedLessons(selected);
    } else {
      setSelectedLessons(lessons);
    }
  }, [searchId, lessons]);

  return (
    <div>
      {" "}
      <BaseCalendar lessons={selectedLessons} />
    </div>
  );
};
