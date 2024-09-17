import { auth } from "@/auth";
import AuthButton from "./AuthButton.server";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex flex-col gap-y-4 pt-24 justify-center items-center">
      <h1 className="text-4xl font-bold tracking-wide">Next-Boilerplate</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AuthButton />
    </main>
  );
}
