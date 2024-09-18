import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (session && session.user)
    return (
      <main className="flex flex-col gap-y-4 pt-24 justify-center items-center">
        <h1 className="text-4xl font-bold tracking-wide">Equita-planner</h1>
        <p className="text-lg">
          Bienvenue, {session.user.name} / {session.user.role}
        </p>
        <pre>{JSON.stringify(session)}</pre>
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
