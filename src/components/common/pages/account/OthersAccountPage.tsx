"use client";
import { GetUserByIdUseCase } from "@/domain/use-cases/GetUserById.usecase";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { Loader } from "../../Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdatePasswordForm } from "../../forms/UpdatePasswordForm";
import { UpdateUserForm } from "../../forms/UpdateUserForm";
import { User } from "@/domain/entities/User";
import { DeleteAccountForm } from "../../forms/DeleteAccountForm";

interface OthersAccoutPageProps {
  session: Session;
}

export const OthersAccountPage = ({ session }: OthersAccoutPageProps) => {
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

  if (!user) return <Loader />;

  return (
    <main className="max-w-6xl mx-auto py-6 max-lg:px-2">
      <h1>Stable Account</h1>
      <p>Hi, {user.name}!</p>
      <section className="flex max-lg:flex-col justify-between gap-4">
        <Card className="max-w-lg w-full h-fit ">
          <CardHeader>
            <CardTitle>Modifier mes données personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateUserForm session={session} user={user} />
          </CardContent>
        </Card>
        <Card className="max-w-lg w-full h-fit">
          <CardHeader>
            <CardTitle>Modifier mon mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdatePasswordForm session={session} />
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 mt-4">
        {/* <Card className="bg-card  p-6 h-fit">
            <CardHeader>
              <CardTitle>Modifier mon adresse</CardTitle>
            </CardHeader>
            <CardContent>
              <AddressForm session={session} address={user.address} />
            </CardContent>
          </Card> */}
        <Card className="max-w-xl mx-auto  h-fit">
          <CardHeader>
            <CardTitle>Supprimer mon compte</CardTitle>
          </CardHeader>
          <CardContent>
            <DeleteAccountForm session={session} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
