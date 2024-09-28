import { auth } from "@/auth";
import { StableRidersPageView } from "@/components/common/pages/account/riders/StableRidersPageView";
import { redirect } from "next/navigation";
import React from "react";

export default async function StableRidersPage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <main className="py-6">
      <StableRidersPageView session={session} />
    </main>
  );
}
