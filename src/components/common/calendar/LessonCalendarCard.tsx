"use client";

import { Lesson } from "@/domain/entities/Lesson";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Info, PenBoxIcon, UserPlus } from "lucide-react";

interface LessonCalendarCardProps {
  lesson: Lesson;
  session: Session | null;
}

export const LessonCalendarCard = ({
  lesson,
  session,
}: LessonCalendarCardProps) => {
  if (!session)
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-card text-card-foreground h-full w-full rounded-md p-2 border-l-4 border-primary hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
            <article className="flex flex-col h-full justify-between">
              <h4 className="font-semibold text-sm line-clamp-2">
                {lesson.title}
              </h4>
              <div className="mt-1">
                <p className="text-xs flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {lesson.start} - {lesson.end}
                </p>
                <p className="text-xs mt-1 capitalize">{lesson.type}</p>
              </div>
            </article>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-4">
            <h3 className="font-semibold text-lg">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(lesson.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {lesson.start} - {lesson.end}
            </p>
            <div className="flex flex-col gap-2">
              <Link href={`/lessons/${lesson.id}`} passHref>
                <Button variant="outline" className="w-full justify-start">
                  <Info className="mr-2 h-4 w-4" />
                  Plus d&apos;informations
                </Button>
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );

  const isRider = session.user.role === "rider";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="bg-card text-card-foreground h-full w-full rounded-md p-2 border-l-4 border-primary hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
          <article className="flex flex-col h-full justify-between">
            <h4 className="font-semibold text-sm line-clamp-2">
              {lesson.title}
            </h4>
            <div className="mt-1">
              <p className="text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {lesson.start} - {lesson.end}
              </p>
              <p className="text-xs mt-1 capitalize">{lesson.type}</p>
            </div>
          </article>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-4">
          <h3 className="font-semibold text-lg">{lesson.title}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(lesson.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-sm flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {lesson.start} - {lesson.end}
          </p>
          <div className="flex flex-col gap-2">
            <Link href={`/lessons/${lesson.id}`} passHref>
              <Button variant="outline" className="w-full justify-start">
                <Info className="mr-2 h-4 w-4" />
                Plus d&apos;informations
              </Button>
            </Link>
            {isRider && (
              <Link href={`/lessons/${lesson.id}/book`} passHref>
                <Button className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  S&apos;inscrire à l&apos;activité
                </Button>
              </Link>
            )}
            {!isRider && (
              <Link href={`/lessons/${lesson.id}/update`} passHref>
                <Button className="w-full justify-start">
                  <PenBoxIcon className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </Link>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
