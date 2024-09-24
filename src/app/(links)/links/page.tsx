import { auth } from "@/auth";
import { RiderLinksPage } from "@/components/common/pages/links/RiderLinksPage";
import { redirect } from "next/navigation";
import React from "react";

export default async function LinksPage() {
  const session = await auth();

  if (!session) redirect("/");

  if (session.user.role === "rider")
    return <RiderLinksPage session={session} />;
}
