import { auth } from "@/auth";
import { StableAccountPage } from "@/components/common/pages/account/StableAccountPage";
import { redirect } from "next/navigation";
import React from "react";

export default async function AccountPage() {
  const session = await auth();

  if (!session) redirect("/");

  if (session.user.role === "stable")
    return <StableAccountPage session={session} />;
}
