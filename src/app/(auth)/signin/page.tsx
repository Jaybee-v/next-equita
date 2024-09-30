import { DialogForgetPassword } from "@/components/common/auth/DialogForgetPassword";
import { SignInForm } from "@/components/common/auth/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/ui/Footer";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import { Logo } from "@/components/ui/Logo";
import { RouterButton } from "@/components/ui/RouterButton";
import React from "react";

export default function SignInPage() {
  return (
    <>
      <main className="lg:pt-24 min-h-screen">
        <Card className="lg:max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>
              Equita-planner
              <article className="flex justify-center pt-4">
                <Logo size="large" />
              </article>
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Connexion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter>
            <section className="pt-4 flex flex-col justify-center items-center w-full gap-4">
              <DialogForgetPassword />
              <LinkSecondary label="Créer un compte" href="/signup" />
              <RouterButton
                type="default"
                label="Retour à l'accueil"
                href="/"
              />
            </section>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </>
  );
}
