"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { UpdatePasswordUseCase } from "@/domain/use-cases/UpdatePassword.usecase";

interface UpdatePasswordFormProps {
  session: Session;
}

const schema = z
  .object({
    actualPassword: z.string(),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(15, "Le mot de passe ne doit pas dépasser 15 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const UpdatePasswordForm = ({ session }: UpdatePasswordFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      actualPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    try {
      const userRepository = new UserRepositoryImpl();
      const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository);
      await updatePasswordUseCase.execute(
        session.user.id,
        data.actualPassword,
        data.password
      );
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier votre mot de passe",
        variant: "destructive",
      });
    } finally {
      form.reset();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          name="actualPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre mot de passe actuel</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Mot de passe actuel"
                />
              </FormControl>
              <FormDescription>
                Veuillez saisir votre mot de passe actuel
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Nouveau mot de passe"
                />
              </FormControl>
              <FormDescription>
                Votre mot de passe doit contenir au moins 8 caractères, une
                majuscule et un chiffre
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirmer mot de passe"
                />
              </FormControl>
              <FormDescription>
                Veuillez confirmer votre mot de passe
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Modifier mon mot de passe</Button>
      </form>
    </Form>
  );
};
