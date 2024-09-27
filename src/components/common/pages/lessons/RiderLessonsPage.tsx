import { Session } from "next-auth";
import React from "react";
import { RiderLessonsByClub } from "../../tables/RiderLessonsByClub";

interface RiderLessonsPageProps {
  session: Session;
}

export const RiderLessonsPage = ({ session }: RiderLessonsPageProps) => {
  return (
    <div>
      <RiderLessonsByClub session={session} />
    </div>
  );
};
