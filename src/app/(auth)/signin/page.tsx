import { SignInForm } from "@/components/common/auth/SignInForm";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import React from "react";

export default function SignInPage() {
  return (
    <main className="lg:pt-24">
      <div className="lg:max-w-sm mx-auto bg-card p-6 lg:rounded lg:drop-shadow-md">
        <h1 className="text-center text-2xl font-bold tracking-wide">
          Equita-planner
        </h1>
        <h2 className="py-2 text-lg underline underline-offset-2">Connexion</h2>
        <SignInForm />
        <section className="pt-4 flex justify-center items-center">
          <LinkSecondary label="Créer un compte" href="/signup" />
        </section>
      </div>
    </main>
  );
}
