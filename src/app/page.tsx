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
    </main>
  );
}
