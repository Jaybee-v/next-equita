import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

interface UserNavbarProps {
  session: Session;
}

export const UserNavbar = ({ session }: UserNavbarProps) => {
  return (
    <nav className="flex items-center gap-6">
      <ul className="flex gap-6">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/about">Planning</Link>
        </li>
        <li>
          <Link href="/contact">Cavaliers</Link>
        </li>
      </ul>
      <Link href="/">{session.user.name}</Link>
    </nav>
  );
};
