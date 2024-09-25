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
      <UserCard session={session} />
    </div>
  );
};
