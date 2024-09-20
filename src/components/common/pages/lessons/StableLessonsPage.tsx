import { Session } from "next-auth";
import React from "react";
import { LessonForm } from "../../forms/LessonForm";
import { UserCard } from "../../user/UserCard";

interface StableLessonsPageProps {
  session: Session;
}

export const StableLessonsPage = ({ session }: StableLessonsPageProps) => {
  return (
    <main className="lg:py-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center tracking-wide py-2 text-sky-700">
        Gérez vos leçons en toute simplicité
      </h1>
      <div className="flex justify-between">
        <section className="max-w-md w-full bg-card p-6 rounded drop-shadow-md">
          <h2 className="tetx-center font-semibold text-center text-sky-700">
            Ajouter une leçon
          </h2>
          <LessonForm />
        </section>
        <section className="max-w-md w-full">
          <UserCard session={session} />
        </section>
      </div>
    </main>
  );
};
