import { Session } from "next-auth";
import React from "react";
import { LessonForm } from "../../forms/LessonForm";
import { UserCard } from "../../user/UserCard";
import { BaseCalendar } from "../../calendar/BaseCalendar";
import { AddLessonButton } from "./AddLessonButton";

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
      <section className="bg-card w-fit p-6 rounded drop-shadow-md">
        <h2 className="text-lg font-bold tracking-wide">
          Que souhaitez-vous faire ?
        </h2>
        <AddLessonButton session={session} />
      </section>
      <BaseCalendar session={session} />
      <div className="flex max-lg:flex-col justify-between w-full">
        <section className="max-w-md w-full bg-card p-6 lg:rounded lg:drop-shadow-md">
          <h2 className="font-semibold text-center text-sky-700">
            Ajouter une leçon
          </h2>
          <LessonForm session={session} />
        </section>
        <section className="max-w-md w-full">
          <UserCard session={session} />
        </section>
      </div>
    </main>
  );
};
