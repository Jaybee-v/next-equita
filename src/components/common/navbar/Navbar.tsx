import AuthButton from "@/app/AuthButton.server";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto py-2">
      <div>
        <Link href="/" className="font-bold tracking-wide">
          Equita-planner
        </Link>
      </div>
      <nav className="flex items-center gap-6">
        <ul className="flex gap-6">
          <li>
            <Link href="/planning">Planning</Link>
          </li>
          <li>
            <Link href="/courses">Cours</Link>
          </li>
          <li>
            <Link href="/students">Élèves</Link>
          </li>
        </ul>
        <div>
          <Link href="/signup">Créer un compte</Link>
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};
