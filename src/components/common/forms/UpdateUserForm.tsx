"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/domain/entities/User";
import { UpdateUserAccount } from "@/domain/use-cases/UpdateUserAccount.usecase";
import { useToast } from "@/hooks/use-toast";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  lastname: z.string().optional(),
});

interface UpdateUserFormProps {
  session: Session;
  user: User;
}

export const UpdateUserForm = ({ session, user }: UpdateUserFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: user.name,
      email: user.email,
      lastname: user.lastname,
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    if (data.name === user.name && data.email === user.email) return;
    try {
      const userRepository = new UserRepositoryImpl();
      const updateUserAccountUseCase = new UpdateUserAccount(
        userRepository
      ).execute(session.user.id, data);

      console.log(updateUserAccountUseCase);
      toast({
        title: "Compte mis à jour",
        description: "Votre compte a été mis à jour avec succès",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite lors de la mise à jour du compte",
        variant: "destructive",
      });
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 grid">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {user.role === "stable" ? "Nom de l'écurie" : "Nom"}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {user.role !== "stable" && (
          <FormField
            name="lastname"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de contact</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Modifier</Button>
      </form>
    </Form>
  );
};
