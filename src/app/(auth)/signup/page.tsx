import { SignUpForm } from "@/components/common/auth/SignUpForm";
import React from "react";

export default function SignUpPage() {
  return (
    <main className="lg:py-4">
      <div className="bg-card max-w-3xl w-full mx-auto p-6 lg:rounded lg:drop-shadow-md">
        <h1 className="text-center text-2xl">
          Je m&apos;inscris sur{" "}
          <span className="font-bold tracking-wide text-primary">
            Equita-planner
          </span>
        </h1>
        <p className="text-sm text-gray-600 mt-4 px-4">
          Rejoignez-nous et découvrez une plateforme dédiée à la gestion des{" "}
          <b>leçons d&apos;équitation.</b>
          <br />
          Que vous soyez <b>un cavalier</b> à la recherche de nouvelles
          expériences, <b>un enseignant indépendant</b> souhaitant partager
          votre savoir-faire, ou <b>un centre équestre</b> désireux
          d&apos;optimiser vos réservations,{" "}
          <b>Equita-planner est fait pour vous !</b>
        </p>

        <SignUpForm />
      </div>
    </main>
  );
}
