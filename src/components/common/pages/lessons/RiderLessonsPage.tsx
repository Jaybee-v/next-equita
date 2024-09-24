import { LessonRepositoryImpl } from "@/infrastructure/repositories/LessonRepositoryImpl";
import { Session } from "next-auth";
import React from "react";
import { RiderLessonsByClub } from "../../tables/RiderLessonsByClub";

interface RiderLessonsPageProps {
  session: Session;
}

export const RiderLessonsPage = async ({ session }: RiderLessonsPageProps) => {
  const lessons = await new LessonRepositoryImpl().getLessonsForRider(
    session.user.id
  );

  console.log(lessons);

  return (
    <div>
      <RiderLessonsByClub lessons={lessons} />
    </div>
  );
};
