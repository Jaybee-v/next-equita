import { Session } from "next-auth";
import React from "react";
import { UserCard } from "../../user/UserCard";

interface RiderHomePageProps {
  session: Session;
}

export const RiderHomePage = async ({ session }: RiderHomePageProps) => {
  return (
    <div>
      <p className="text-lg">Vous êtes cavalier</p>
      <UserCard session={session} />
    </div>
  );
};
