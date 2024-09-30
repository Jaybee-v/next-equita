import { auth } from "@/auth";
import { StableRidersPageView } from "@/components/common/pages/account/riders/StableRidersPageView";
import { TeacherRidersPageView } from "@/components/common/pages/account/riders/TeacherRidersPageView";
import { redirect } from "next/navigation";
import React from "react";

export default async function StableRidersPage() {
  const session = await auth();

  if (!session) redirect("/");

  if (session.user.role === "rider") redirect("/");

  if (session.user.role === "stable")
    return (
      <main className="h-full">
        <StableRidersPageView session={session} />
      </main>
    );

  if (session.user.role === "teacher")
    return (
      <main className="h-full">
        <TeacherRidersPageView session={session} />
      </main>
    );
}
