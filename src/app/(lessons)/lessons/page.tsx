import { auth } from "@/auth";
import { PublicLessonsPage } from "@/components/common/pages/lessons/PublicLessonsPage";
import { RiderLessonsPage } from "@/components/common/pages/lessons/RiderLessonsPage";
import { StableLessonsPage } from "@/components/common/pages/lessons/StableLessonsPage";
import React from "react";

export default async function LessonsPage() {
  const session = await auth();

  if (!session) return <PublicLessonsPage />;

  if (session && session.user.role === "stable")
    return <StableLessonsPage session={session} />;

  if (session && session.user.role === "rider")
    return <RiderLessonsPage session={session} />;
}
