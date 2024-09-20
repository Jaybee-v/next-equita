import { Session } from "next-auth";
import React from "react";
import { LessonForm } from "../../forms/LessonForm";
import { UserCard } from "../../user/UserCard";
import { LessonRepositoryImpl } from "@/infrastructure/repositories/LessonRepositoryImpl";
import { LessonsTable } from "../../tables/LessonsTable";

interface StableLessonsPageProps {
  session: Session;
}

export const StableLessonsPage = async ({
  session,
}: StableLessonsPageProps) => {
  const lessons = await new LessonRepositoryImpl().getLessonByStableId(
    session.user.id
  );

  return (
    <main className="lg:py-4 max-w-6xl mx-auto grid gap-y-6">
      <h1 className="text-4xl font-bold text-center tracking-wide py-2 text-sky-700">
        Gérez vos leçons en toute simplicité
      </h1>
      <section className="bg-card p-6 rounded drop-shadow-md">
        <h2 className="font-semibold pb-6 text-xl text-sky-700">
          Vos prochaines leçons
        </h2>
        <LessonsTable lessons={lessons} />
      </section>
      <div className="flex justify-between w-full">
        <section className="max-w-md w-full bg-card p-6 rounded drop-shadow-md">
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
