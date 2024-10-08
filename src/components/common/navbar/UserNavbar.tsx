import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import { RiderNavbar } from "./RiderNavbar";
import { StableNavbar } from "./StableNavbar";
import { UserMenu } from "./UserMenu";
import { MobileNavbar } from "./MobileNavbar";

interface UserNavbarProps {
  session: Session;
}

export const UserNavbar = ({ session }: UserNavbarProps) => {
  if (session.user.role === "rider") return <RiderNavbar session={session} />;

  if (session.user.role === "stable") return <StableNavbar session={session} />;

  return (
    <>
      <nav className="flex max-lg:hidden items-center gap-6">
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
      <div className="lg:hidden">
        <MobileNavbar session={session} />
      </div>
    </>
  );
};
