import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

interface RiderNavbarProps {
  session: Session;
}

export const RiderNavbar = ({ session }: RiderNavbarProps) => {
  return (
    <nav className="flex items-center gap-6">
      <ul className="flex gap-6">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/links">Mon club / moniteur</Link>
        </li>
        <li>
          <Link href="/contact">Cavaliers</Link>
        </li>
      </ul>
      <Link href="/">{session.user.name}</Link>
    </nav>
  );
};
