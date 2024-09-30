import { RiderLessonPage } from "@/components/common/pages/lessons/id/RiderLessonPage";

import React from "react";

export default async function LessonByIdPage({
  params,
}: {
  params: { id: string };
}) {
  return <RiderLessonPage lessonId={params.id} />;
}
