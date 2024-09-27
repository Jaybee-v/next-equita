import { auth } from "@/auth";
import { StableRidersTable } from "@/components/common/tables/StableRidersTable";
import { redirect } from "next/navigation";
import React from "react";

export default async function StableRidersPage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <main className="py-6">
      <article className="max-w-lg mx-auto bg-card p-6 rounded drop-shadow-md">
        <StableRidersTable session={session} />
      </article>
    </main>
  );
}
