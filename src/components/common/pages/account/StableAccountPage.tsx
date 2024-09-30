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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <Card className="max-w-lg ">
            <CardHeader>
              <CardTitle>Modifier mes données personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateUserForm session={session} user={user} />
            </CardContent>
          </Card>
          <Card className="max-w-lg bg-card  p-6 h-fit">
            <CardHeader>
              <CardTitle>Modifier mon mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
              <UpdatePasswordForm session={session} />
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-4">
          <Card className="bg-card  p-6 h-fit">
            <CardHeader>
              <CardTitle>Modifier mon adresse</CardTitle>
            </CardHeader>
            <CardContent>
              <AddressForm session={session} address={user.address} />
            </CardContent>
          </Card>
          <Card className="bg-card  p-6 h-fit">
            <CardHeader>
              <CardTitle>Supprimer mon compte</CardTitle>
            </CardHeader>
            <CardContent>
              <DeleteAccountForm session={session} />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};
