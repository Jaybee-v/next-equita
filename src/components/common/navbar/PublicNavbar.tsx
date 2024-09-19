import AuthButton from "@/app/AuthButton.server";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import Link from "next/link";
import React from "react";

export const PublicNavbar = () => {
  return (
    <nav className="flex items-center gap-6">
      <ul className="flex gap-6">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/about">A propos</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <LinkSecondary label="Créer un compte" href="/signup" />
        <AuthButton />
      </div>
    </nav>
  );
};
