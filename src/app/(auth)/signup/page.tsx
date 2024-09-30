import { SignUpForm } from "@/components/common/auth/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/ui/Footer";
import React from "react";

export default function SignUpPage() {
  return (
    <>
      <main className="max-w-6xl w-full mx-auto md:py-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Je m&apos;inscris sur
              <br className="lg:hidden" />{" "}
              <span className="font-bold tracking-wide text-primary">
                Equita-planner
              </span>
            </CardTitle>
            <CardDescription>
              Rejoignez-nous et découvrez une plateforme dédiée à la gestion des{" "}
              <b>leçons d&apos;équitation.</b>
              <br />
              Que vous soyez <b>un cavalier</b> à la recherche de nouvelles
              expériences, <b>un enseignant indépendant</b> souhaitant partager
              votre savoir-faire, ou <b>un centre équestre</b> désireux
              d&apos;optimiser vos réservations,{" "}
              <b>Equita-planner est fait pour vous !</b>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
