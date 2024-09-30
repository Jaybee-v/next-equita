import { LinkRepositoryImpl } from "@/infrastructure/repositories/LinkRepositoryImpl";
import { Session } from "next-auth";
import React from "react";
import { LinksTable } from "../../tables/LinksTable";
import { Loader } from "../../Loader";

interface RiderLinksPageProps {
  session: Session;
}

export const RiderLinksPage = async ({ session }: RiderLinksPageProps) => {
  const riderLinks = await new LinkRepositoryImpl().getRiderLink(
    session.user.id
  );

  if (!riderLinks) return <Loader />;

  return (
    <main className="max-w-6xl mx-auto py-6">
      <LinksTable session={session} links={riderLinks} />
    </main>
  );
};
