import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Session } from "next-auth";
import AuthButton from "@/app/AuthButton.server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  session: Session;
}

export const UserMenu = ({ session }: UserMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="underline underline-offset-2 border px-4 py-2 rounded-xl font-semibold hover:border-transparent hover:bg-background transition-all duration-300">
        {session.user.lastname
          ? session.user.lastname
          : session.user.name.charAt(0).toUpperCase()}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
          <nav>
            <ul className="flex flex-col justify-center items-center gap-4">
              <li>
                <Link href="/account">
                  <Button variant={"link"}>Mon Compte</Button>
                </Link>
              </li>
              <li>
                {" "}
                <AuthButton />
              </li>
            </ul>
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
