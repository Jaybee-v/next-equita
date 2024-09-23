import { Session } from "next-auth";
import React from "react";
import { UserCard } from "../../user/UserCard";
import { LinkRepositoryImpl } from "@/infrastructure/repositories/LinkRepositoryImpl";
import { SearchStableTeacherComponent } from "../../user/SearchStableTeacherComponent";

interface RiderHomePageProps {
  session: Session;
}

export const RiderHomePage = async ({ session }: RiderHomePageProps) => {
  const getRiderLinks = await new LinkRepositoryImpl().getRiderLink(
    session.user.id
  );

  if (getRiderLinks.length === 0)
    return <SearchStableTeacherComponent session={session} />;

  return (
    <div>
      <p className="text-lg">Vous êtes cavalier</p>
      <UserCard session={session} />
    </div>
  );
};
