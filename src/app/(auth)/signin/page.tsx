import { SignInForm } from "@/components/common/auth/SignInForm";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import React from "react";

export default function SignInPage() {
  return (
    <main className="pt-24">
      <div className="max-w-sm mx-auto bg-card p-6 rounded drop-shadow-md">
        <h1>Equita-planner</h1>
        <h2>Se connecter</h2>
        <SignInForm />
        <section className="pt-4 flex justify-center items-center">
          <LinkSecondary label="Créer un compte" href="/signup" />
        </section>
      </div>
    </main>
  );
}
