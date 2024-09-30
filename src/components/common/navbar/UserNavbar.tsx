import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import { RiderNavbar } from "./RiderNavbar";
import { StableNavbar } from "./StableNavbar";

interface UserNavbarProps {
  session: Session;
}

export const UserNavbar = ({ session }: UserNavbarProps) => {
  if (session.user.role === "rider") return <RiderNavbar session={session} />;

  if (session.user.role === "stable") return <StableNavbar session={session} />;

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
      <Link href="/">{session.user.name}</Link>
    </nav>
  );
};
