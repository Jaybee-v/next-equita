"use client";
import { LessonForm } from "@/components/common/forms/LessonForm";
import { Loader } from "@/components/common/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lesson } from "@/domain/entities/Lesson";
import { GetLessonByIdUseCase } from "@/domain/use-cases/GetLessonById.usecase";
import { LessonRepositoryImpl } from "@/infrastructure/repositories/LessonRepositoryImpl";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";

interface UpdateLessonPageProps {
  lessonId: string;
  session: Session;
}

export const UpdateLessonPageView = ({
  lessonId,
  session,
}: UpdateLessonPageProps) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      const lessonRepository = new LessonRepositoryImpl();
      const getLessonByIdUseCase = new GetLessonByIdUseCase(lessonRepository);
      const lesson = await getLessonByIdUseCase.execute(lessonId);
      setLesson(lesson);
      setIsLoading(false);
    };
    fetchLesson();
  }, [lessonId]);

  if (isLoading) return <Loader />;

  return (
    <div className="lg:py-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Modifier les informations de {lesson?.title}</CardTitle>
          <CardDescription>
            Vous pouvez modifier les informations de cette leçon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {lesson ? <LessonForm lesson={lesson} session={session} /> : null}
        </CardContent>
      </Card>
    </div>
  );
};
