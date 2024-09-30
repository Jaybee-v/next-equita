import { auth } from "@/auth";
import { UserCard } from "@/components/common/user/UserCard";

import { RiderHomePage } from "@/components/common/pages/home/RiderHomePage";
import { StableHomePage } from "@/components/common/pages/home/StableHomePage";
import PublicHomePage from "@/components/common/pages/home/PublicHomePage";

export default async function Home() {
  const session = await auth();

  if (session && session.user)
    return (
      <main className="p-6">
        {session.user.role === "rider" && <RiderHomePage session={session} />}
        {session.user.role === "teacher" && (
          <div>
            <p className="text-lg">Vous êtes moniteur</p>
            <UserCard session={session} />
          </div>
        )}
        {session.user.role === "stable" && <StableHomePage session={session} />}
      </main>
    );

  return <PublicHomePage />;
}
