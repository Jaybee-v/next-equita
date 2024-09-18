import { auth } from "@/auth";
import { UserCard } from "@/components/common/user/UserCard";

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
    <main className="flex flex-col gap-y-4 pt-24 justify-center items-center">
      <h1 className="max-lg:text-4xl text-7xl text-center font-bold tracking-wide">
        Simplifiez les réservations de <br />
        <span className="font-black text-sky-700 tracking-tight">
          vos cours et activités équestres
        </span>
      </h1>
      <h2 className="mb-6 mt-4 max-lg:text-lg max-lg:text-center text-2xl">
        Avec notre plateforme intuitive, réservez vos séances en quelques clics.
      </h2>
      <section className="bg-card w-full my-10">
        <p className="text-lg text-gray-600 mt-4 px-4 max-w-4xl mx-auto">
          Rejoignez-nous et découvrez une plateforme dédiée à la gestion des{" "}
          <b>leçons d&apos;équitation.</b>
          <br />
          Que vous soyez <b>un cavalier</b> à la recherche de nouvelles
          expériences, <b>un enseignant indépendant</b> souhaitant partager
          votre savoir-faire, ou <b>un centre équestre</b> désireux
          d&apos;optimiser vos réservations,{" "}
          <b>Equita-planner est fait pour vous !</b>
        </p>
        <div>
          <h3>Les étapes</h3>
          <section className="grid md:grid-cols-4 gap-6 p-6">
            <article className="p-4 shadow flex flex-col justify-evenly">
              <h4 className="text-lg font-bold tracking-wide">
                Créez votre compte
              </h4>
              <p>
                Inscrivez-vous en quelques clics pour accéder à notre plateforme
                de gestion de réservations.
              </p>
            </article>
            <article className="p-4 shadow flex flex-col justify-evenly">
              <h4 className="text-lg font-bold tracking-wide">
                Configurez votre profil
              </h4>
              <p>Renseignez vos informations personnelles.</p>
            </article>
            <article className="p-4 shadow flex flex-col justify-evenly">
              <h4 className="text-lg font-bold tracking-wide">
                Planifiez vos séances
              </h4>
              <p>
                Consultez les disponibilités des moniteurs et centres équestres
                pour réserver vos cours.
              </p>
            </article>
            <article className="p-4 shadow flex flex-col justify-evenly">
              <h4 className="text-lg font-bold tracking-wide">
                Validez votre réservation
              </h4>
              <p>
                Confirmez votre réservation et recevez une confirmation par
                email.
              </p>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
