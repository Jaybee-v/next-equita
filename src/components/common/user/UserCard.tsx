import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Mail } from "lucide-react";
import AuthButton from "@/app/AuthButton.server";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import { Session } from "next-auth";
import React from "react";

interface UserCardProps {
  session: Session;
}

export const UserCard = ({ session }: UserCardProps) => {
  const isNewUser =
    new Date(session.user.createdAt) >
    new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        {isNewUser && (
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Bienvenue sur{" "}
            <span className="font-bold tracking-wide text-primary">
              Equita-planner
            </span>
          </p>
        )}
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name || ""}
            />
            <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">
              {session.user.name}{" "}
              {session.user.role !== "stable" && session.user.lastname}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {session.user.role === "rider"
                ? "Cavalier"
                : session.user.role === "stable"
                ? "Gérant de centre équestre"
                : "Moniteur indépendant            "}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{session.user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>
              Compte créé le{" "}
              {new Date(session.user.createdAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 gap-4">
        <LinkSecondary label="Mon compte" href="/account" />
        <AuthButton />
      </CardFooter>
    </Card>
  );
};
