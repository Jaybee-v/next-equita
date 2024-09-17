import { auth } from "@/auth";
import WhoAmIServerAction from "./WhoAmIServerAction";
import WhoAmIAPI from "./WhoAmIAPI";
import WhoAmIRSC from "./WhoAmIRSC";

export default async function TestRoute() {
  const session = await auth();

  async function onGetUserAction() {
    "use server";
    const session = await auth();
    return session?.user?.name ?? null;
  }

  return (
    <main>
      <h1>Test Route</h1>
      <div>User: {session?.user?.name}</div>
      <WhoAmIServerAction onGetUserAction={onGetUserAction} />
      <WhoAmIAPI />
      <WhoAmIRSC />
    </main>
  );
}
