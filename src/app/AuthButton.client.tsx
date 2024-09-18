"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/auth/helpers";

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (
    <Button
      variant="destructive"
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      Déconnexion
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Connexion</Button>
  );
}
