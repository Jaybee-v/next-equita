"use client";
import React, { useEffect } from "react";
import { BaseCalendar } from "../calendar/BaseCalendar";
import { useSearchParams } from "next/navigation";
import { Session } from "next-auth";

interface RiderLessonsByClubProps {
  session: Session;
}

export const RiderLessonsByClub = ({ session }: RiderLessonsByClubProps) => {
  const params = useSearchParams();
  const searchId = params.get("club");

  useEffect(() => {
    const fetchLessons = async () => {};
    fetchLessons();
  }, [searchId, session]);

  return (
    <div>
      {" "}
      <BaseCalendar session={session} searchId={searchId || null} />
    </div>
  );
};
