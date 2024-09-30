import { Session } from "next-auth";
import React from "react";
import { RiderLessonsByClub } from "../../tables/RiderLessonsByClub";

interface RiderLessonsPageProps {
  session: Session;
}

export const RiderLessonsPage = ({ session }: RiderLessonsPageProps) => {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <RiderLessonsByClub session={session} />
    </div>
  );
};
