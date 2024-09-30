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

interface LessonCalendarCardProps {
  lesson: Lesson;
  session: Session;
}

export const LessonCalendarCard = ({
  lesson,
  session,
}: LessonCalendarCardProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <div className="bg-gray-100 text-gray-800 h-full w-full rounded-xl p-2 border-s-4 border-sky-600">
          <article className="max-lg:flex justify-between">
            <h4 className="font-bold text-sm">{lesson.title}</h4>
            <p className="text-sm">
              {lesson.start} - {lesson.end}
            </p>
          </article>
          <p className="text-xs">{lesson.type}</p>
        </div>
      </PopoverTrigger>
      {session.user.role === "rider" && (
        <PopoverContent className="grid gap-4">
          <Link href={`/lessons/${lesson.id}`} className="w-full">
            <Button variant={"outline"} className="font-semibold w-full">
              + d&apos;infos sur l&apos;activité
            </Button>
          </Link>
          <Link href={`/lessons/${lesson.id}/book`} className="w-full">
            <Button className="font-semibold w-full">
              S&apos;inscrire à l&apos;activité
            </Button>
          </Link>
        </PopoverContent>
      )}
      {session.user.role !== "rider" && (
        <PopoverContent className="grid gap-4">
          <Link href={`/lessons/${lesson.id}`} className="w-full">
            <Button variant={"outline"} className="font-semibold w-full">
              + d&apos;infos sur l&apos;activité
            </Button>
          </Link>
          <Link href={`/lessons/${lesson.id}/book`} className="w-full">
            <Button className="font-semibold w-full">
              S&apos;inscrire à l&apos;activité
            </Button>
          </Link>
        </PopoverContent>
      )}
    </Popover>
  );
};
