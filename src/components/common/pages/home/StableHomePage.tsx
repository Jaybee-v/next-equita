import { Session } from "next-auth";
import React from "react";
import { UserCard } from "../../user/UserCard";
import { StableCheckAddress } from "./StableCheckAddress";

interface StableHomePageProps {
  session: Session;
}

export const StableHomePage = async ({ session }: StableHomePageProps) => {
  return (
    <div>
      <StableCheckAddress session={session} />
      <p className="text-lg">Vous êtes gestionnaire de centre équestre</p>
      <UserCard session={session} />
    </div>
  );
};
