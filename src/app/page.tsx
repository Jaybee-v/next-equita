import { auth } from "@/auth";
import { UserCard } from "@/components/common/user/UserCard";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import AuthButton from "./AuthButton.server";
import { Footer } from "@/components/ui/Footer";
import {
  CalendarCheck2,
  CalendarDays,
  MousePointerClick,
  UserRoundPen,
} from "lucide-react";
import { LessonForm } from "@/components/common/forms/LessonForm";

export default async function Home() {
  const session = await auth();

  if (session && session.user)
    return (
      <main className="p-6">
        <h1 className="text-4xl font-bold tracking-wide">Equita-planner</h1>
        {session.user.role === "rider" && (
          <div>
            <p className="text-lg">Vous êtes cavalier</p>
            <UserCard session={session} />
            <LessonForm />
          </div>
        )}
        {session.user.role === "teacher" && (
          <div>
            <p className="text-lg">Vous êtes moniteur</p>
            <UserCard session={session} />
          </div>
        )}
        {session.user.role === "stable" && (
          <div>
            <p className="text-lg">Vous êtes gestionnaire de centre équestre</p>
            <UserCard session={session} />
          </div>
        )}
        <p className="text-lg">
          Bienvenue, {session.user.name} / {session.user.role}
        </p>
      </main>
    );

  return (
    <main className="flex flex-col gap-y-4 pt-24 justify-center items-center ">
      {/* Hero Section */}
      <h1 className="max-lg:text-4xl text-7xl text-center font-bold tracking-wide cursor-default">
        Simplifiez les réservations de <br />
        <span className="font-black text-sky-700 tracking-tight">
          vos cours et activités équestres
        </span>
      </h1>
      <h2 className="mb-6 mt-4 max-lg:text-lg max-lg:text-center text-2xl text-gray-700 cursor-default">
        Un outil complet pour centres équestres, moniteurs et cavaliers.
      </h2>
      <section className="w-full flex justify-center gap-12">
        <article>
          <LinkSecondary label="Créer un compte" href="/signup" />
        </article>
        <AuthButton />
      </section>

      {/* Introduction */}
      <section className="w-full my-10 max-w-7xl mx-auto">
        <p className="text-lg text-gray-600 mt-4 px-4 max-w-4xl mx-auto text-center cursor-default">
          Découvrez une plateforme conçue pour faciliter la gestion des{" "}
          <b>leçons d&apos;équitation.</b> Que vous soyez <b>un cavalier</b>{" "}
          cherchant de nouvelles expériences, <b>un moniteur</b> partageant
          votre passion, ou un <b>centre équestre</b> optimisant vos
          réservations, <b>Equita-planner est fait pour vous !</b>
        </p>
        {/* Features Section */}
        <div className="p-6 mt-10 cursor-default">
          <h3 className="text-2xl font-bold tracking-wide text-center text-sky-800">
            Ce que propose <span>Equita-planner</span>
          </h3>
          <section className="grid md:grid-cols-4 gap-6 py-6 mt-6">
            <article className="p-6 shadow-md hover:shadow-lg bg-white flex flex-col justify-between rounded-lg transition-all duration-300">
              <article className="flex justify-center p-4 bg-primary rounded-full w-fit mx-auto">
                <UserRoundPen size={50} className="text-background" />
              </article>
              <h4 className="text-xl font-semibold text-sky-800">
                Créez votre compte
              </h4>
              <p className="mt-2 text-gray-600">
                Inscrivez-vous en toute sécurité et accédez à votre espace
                personnel.
              </p>
            </article>
            <article className="p-6 shadow-md hover:shadow-lg bg-white flex flex-col justify-between rounded-lg transition-all duration-300">
              <article className="flex justify-center p-4 bg-primary rounded-full w-fit mx-auto">
                <MousePointerClick size={50} className="text-background" />
              </article>
              <h4 className="text-xl font-semibold text-sky-800">
                Gérez vos réservations en quelques clics
              </h4>
              <p className="mt-2 text-gray-600">
                Suivez vos réservations et organisez vos activités sans tracas.
              </p>
            </article>
            <article className="p-6 shadow-md hover:shadow-lg bg-white flex flex-col justify-between rounded-lg transition-all duration-300">
              <article className="flex justify-center p-4 bg-primary rounded-full w-fit mx-auto">
                <CalendarCheck2 size={50} className="text-background" />
              </article>
              <h4 className="text-xl font-semibold text-sky-800">
                Améliorez la communication
              </h4>
              <p className="mt-2 text-gray-600">
                Facilitez la prise de rendez-vous avec vos cavaliers et
                enseignez en toute tranquillité.
              </p>
            </article>
            <article className="p-6 shadow-md hover:shadow-lg bg-white flex flex-col justify-between rounded-lg transition-all duration-300">
              <article className="flex justify-center p-4 bg-primary rounded-full w-fit mx-auto">
                <CalendarDays size={50} className="text-background" />
              </article>
              <h4 className="text-xl font-semibold text-sky-800">
                Un planning clair
              </h4>
              <p className="mt-2 text-gray-600">
                Bénéficiez d&apos;un planning organisé et d&apos;une
                confirmation par email pour chaque réservation.
              </p>
            </article>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
