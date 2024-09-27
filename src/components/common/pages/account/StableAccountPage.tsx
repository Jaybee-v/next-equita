"use client";
import { User } from "@/domain/entities/User";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { UpdateUserForm } from "../../forms/UpdateUserForm";
import { AddressForm } from "../../forms/AddressForm";
import { UpdatePasswordForm } from "../../forms/UpdatePasswordForm";
import { DeleteAccountForm } from "../../forms/DeleteAccountForm";
import { GetUserByIdUseCase } from "@/domain/use-cases/GetUserById.usecase";

interface StableAccoutPageProps {
  session: Session;
}

export const StableAccountPage = ({ session }: StableAccoutPageProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userRepository = new UserRepositoryImpl();
      const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
      const user = await getUserByIdUseCase.execute(session.user.id);
      if (user) setUser(user);
    };
    fetchUser();
  }, [session.user.id]);

  if (!user) return <div>Loading...</div>;

  return (
    <main className="max-w-6xl mx-auto py-6">
      <h1>Stable Account</h1>
      <p>Hi, {user.name}!</p>
      <div className="grid lg:grid-cols-2 gap-4 rounded drop-shadow-md">
        <section className="grid gap-4">
          <section className="max-w-lg bg-card  p-6 h-fit">
            <h2 className="font-semibold text-lg tracking-wide">
              Modifier mes données personnelles
            </h2>
            <UpdateUserForm session={session} user={user} />
          </section>
          <section className="max-w-lg bg-card  p-6">
            <h2 className="font-semibold text-lg tracking-wide">
              Modifier mon mot de passe
            </h2>
            <UpdatePasswordForm session={session} />
          </section>
        </section>
        <section className="grid gap-4">
          <section className="bg-card  p-6 h-fit">
            <h2 className="font-semibold text-lg tracking-wide">
              Modifier mon adresse
            </h2>
            <AddressForm session={session} address={user.address} />
          </section>
          <section className="bg-card  p-6 h-fit">
            <h2 className="font-semibold text-lg tracking-wide">
              Supprimer mon compte
            </h2>
            <DeleteAccountForm session={session} />
          </section>
        </section>
      </div>
    </main>
  );
};
