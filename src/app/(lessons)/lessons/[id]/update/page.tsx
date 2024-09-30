import { auth } from "@/auth";
import { UpdateLessonPageView } from "@/components/common/pages/lessons/id/update/UpdateLessonPage";
import { redirect } from "next/navigation";
import React from "react";

export default async function UpdateLessonPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) redirect("/");

  if (session && session.user.role === "rider") redirect("/");

  return <UpdateLessonPageView session={session} lessonId={params.id} />;
}
