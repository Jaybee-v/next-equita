"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/auth/helpers";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

export default function AuthButton() {
  const session = useSession();
  const router = useRouter();
  return session?.data?.user ? (
    <Button
      variant="destructive"
      onClick={async () => {
        await signOut();
        router.push("/");
        // router.refresh();
        // await signIn();
      }}
    >
      Déconnexion
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Connexion</Button>
  );
}
