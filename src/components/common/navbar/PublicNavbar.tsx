import AuthButton from "@/app/AuthButton.server";
import { Button } from "@/components/ui/button";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import Link from "next/link";
import React from "react";

export const PublicNavbar = () => {
  return (
    <nav className="flex items-center gap-6">
      <ul className="flex items-center gap-6">
        <li>
          <Link href="/">
            <Button variant={"link"}>Accueil</Button>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <Button variant={"link"}>A propos</Button>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <Button variant={"link"}>Contact</Button>
          </Link>
        </li>
        <li>
          <Link
            href="/lessons"
            className="text-sky-600 font-semibold drop-shadow-[0px_2px_2px_rgba(100,149,237,1)] hover:drop-shadow-md transition-all duration-300"
          >
            Trouver une leçon
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <LinkSecondary label="Créer un compte" href="/signup" />
        <AuthButton />
      </div>
    </nav>
  );
};
