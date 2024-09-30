"use client";
import { Lesson } from "@/domain/entities/Lesson";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LessonRepositoryImpl } from "@/infrastructure/repositories/LessonRepositoryImpl";
import { GetLessonByIdUseCase } from "@/domain/use-cases/GetLessonById.usecase";
import { Loader } from "@/components/common/Loader";

interface RiderLessonPageProps {
  lessonId: string;
}

export const RiderLessonPage = ({ lessonId }: RiderLessonPageProps) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const LessonRepository = new LessonRepositoryImpl();
      const getLessonByIdUseCase = new GetLessonByIdUseCase(LessonRepository);
      const lesson = await getLessonByIdUseCase.execute(lessonId);
      setLesson(lesson);
    };
    fetchLesson();
  }, [lessonId]);

  if (!lesson) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{lesson.title}</CardTitle>
          <div className="flex justify-between items-center mt-2">
            <Badge variant={lesson.type === "group" ? "secondary" : "default"}>
              {lesson.type}
            </Badge>
            {/* <Badge variant={lesson.isPublic ? "outline" : "secondary"}>
              {lesson.isPublic ? "Public" : "Private"}
            </Badge> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{lesson.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Date</h3>
              <p className="capitalize">
                {new Date(lesson.date).toLocaleString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Horaires</h3>
              <p>
                {lesson.start} - {lesson.end}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Places disponibles</h3>
              <p>{lesson.emptyPlaces}</p>
            </div>
            <div>
              <h3 className="font-semibold">Stable</h3>
              {/* <p>{lesson.stableName}</p> */}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              Niveau requis pour participer
            </h3>
            <div className="flex">
              {lesson.requiredLevel === 0 ? (
                <span>Débutant</span>
              ) : (
                <span>Galop {lesson.requiredLevel}</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <div className="w-full flex justify-between">
            <span>
              Créée: {new Date(lesson.createdAt).toLocaleDateString()}
            </span>
            <span>
              Mis à jour: {new Date(lesson.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
