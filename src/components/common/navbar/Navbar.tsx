import { auth } from "@/auth";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import React from "react";
import { PublicNavbar } from "./PublicNavbar";
import { UserNavbar } from "./UserNavbar";

export const Navbar = async () => {
  const session = await auth();
  return (
    <div className="w-full bg-card shadow">
      <header className="flex justify-between items-center max-w-6xl mx-auto py-2">
        <div>
          <Link
            href="/"
            className="font-bold tracking-wide flex items-center gap-2"
          >
            <Logo size="small" />
            Equita-planner
          </Link>
        </div>
        {!session ? <PublicNavbar /> : <UserNavbar session={session} />}
      </header>
    </div>
  );
};
