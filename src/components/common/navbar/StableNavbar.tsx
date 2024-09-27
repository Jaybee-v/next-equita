import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";
import { Session } from "next-auth";

interface StableNavbarProps {
  session: Session;
}

export const StableNavbar = ({ session }: StableNavbarProps) => {
  return (
    <nav className="flex items-center gap-6">
      <ul className="flex gap-6">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/lessons">Planning</Link>
        </li>
        <li>
          <Link href="/account/riders">Cavaliers</Link>
        </li>
      </ul>
      <UserMenu session={session} />
    </nav>
  );
};
