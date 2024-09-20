import AuthButton from "@/app/AuthButton.server";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import { Session } from "next-auth";
import React from "react";

interface UserCardProps {
  session: Session;
}

export const UserCard = ({ session }: UserCardProps) => {
  return (
    <article className="shadow p-6 rounded max-w-sm bg-card h-fit w-full">
      {new Date(session.user.createdAt) >
        new Date(Date.now() - 24 * 60 * 60 * 1000) && (
        <p>
          Bienvenue sur{" "}
          <span className="font-bold tracking-wide">Equita-planner</span>
        </p>
      )}
      <section className="grid gap-2 py-2">
        <h2 className="font-semibold text-xl text-center">
          {session.user.name}{" "}
          {session.user.role !== "stable" && session.user.lastname}
        </h2>
        <p>Email {session.user.email}</p>
        <p>
          Compte créé le{" "}
          {new Date(session.user.createdAt).toLocaleDateString("fr-FR")}
        </p>
      </section>
      <article className="flex justify-end items-center gap-2">
        <LinkSecondary label="Mon compte" href="/account" />
        <AuthButton />
      </article>
    </article>
  );
};
