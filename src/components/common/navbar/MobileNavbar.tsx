"use client";
import { Session } from "next-auth";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import { DoorClosed } from "lucide-react";

interface MobileNavbarProps {
  session: Session;
}

export const MobileNavbar = ({ session }: MobileNavbarProps) => {
  const path = usePathname();
  const router = useRouter();
  const lettersName =
    session.user.name.charAt(0) + "." + session.user.lastname.charAt(0);
  return (
    <Drawer>
      <DrawerTrigger className="border border-primary/60 p-2 rounded-full bg-gray-200 font-semibold">
        {lettersName}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        {session.user.role !== "rider" && (
          <DrawerFooter>
            <nav className="">
              <ul className="grid gap-2">
                <li className="">
                  <Link href="/" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={path === "/" ? "default" : "outline"}
                      >
                        Accueil
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <li className="">
                  <Link href="/lessons" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={path === "/lessons" ? "default" : "outline"}
                      >
                        Planning
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <li className="">
                  <Link href="/account/riders" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={
                          path === "/account/riders" ? "default" : "outline"
                        }
                      >
                        Cavaliers
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <Separator />
                <li>
                  <Link href="/account" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={path === "/account" ? "default" : "outline"}
                      >
                        Mon compte
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <li>
                  <Button
                    variant="destructive"
                    className="w-full gap-4"
                    onClick={async () => {
                      await signOut();
                      router.push("/");
                      // router.refresh();
                      // await signIn();
                    }}
                  >
                    <DoorClosed className="w-6 h-6" />
                    Déconnexion
                  </Button>
                </li>
              </ul>
              {/* <UserMenu session={session} /> */}
            </nav>
          </DrawerFooter>
        )}
        {session.user.role === "rider" && (
          <DrawerFooter>
            <nav className="">
              <ul className="grid gap-2">
                <li className="">
                  <Link href="/" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={path === "/" ? "default" : "outline"}
                      >
                        Accueil
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <li className="">
                  <Link href="/lessons" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={path === "/lessons" ? "default" : "outline"}
                      >
                        Mon club / Moniteur
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <li className="">
                  <Link href="/account/riders" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={
                          path === "/account/riders" ? "default" : "outline"
                        }
                      >
                        Cavaliers
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <Separator />
                <li>
                  <Link href="/account" className="w-full">
                    <DrawerClose className="w-full">
                      <Button
                        className="w-full"
                        variant={path === "/account" ? "default" : "outline"}
                      >
                        Mon compte
                      </Button>
                    </DrawerClose>
                  </Link>
                </li>
                <li>
                  <Button
                    variant="destructive"
                    className="w-full gap-4"
                    onClick={async () => {
                      await signOut();
                      router.push("/");
                      // router.refresh();
                      // await signIn();
                    }}
                  >
                    <DoorClosed className="w-6 h-6" />
                    Déconnexion
                  </Button>
                </li>
              </ul>
              {/* <UserMenu session={session} /> */}
            </nav>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
