import { Session } from "next-auth";
import React from "react";
import { LessonForm } from "../../forms/LessonForm";
import { UserCard } from "../../user/UserCard";
import { BaseCalendar } from "../../calendar/BaseCalendar";
import { AddLessonButton } from "./AddLessonButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StableLessonsPageProps {
  session: Session;
}

export const StableLessonsPage = async ({
  session,
}: StableLessonsPageProps) => {
  return (
    <main className="lg:py-4 max-w-6xl mx-auto grid gap-y-6">
      <h1 className="text-4xl font-bold text-center tracking-wide py-2 text-sky-700">
        Gérez vos leçons en toute simplicité
      </h1>
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Que souhaitez-vous faire ?</CardTitle>
        </CardHeader>
        <CardContent>
          <AddLessonButton session={session} />
        </CardContent>
      </Card>
      <BaseCalendar session={session} />
      <div className="flex max-lg:flex-col justify-between w-full">
        <Card className="max-w-md w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">
              Ajouter une leçon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LessonForm session={session} />
          </CardContent>
        </Card>
        <section className="max-w-md w-full">
          <UserCard session={session} />
        </section>
      </div>
    </main>
  );
};
