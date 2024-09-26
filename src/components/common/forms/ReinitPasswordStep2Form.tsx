"use client";
import React from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { ReinitPasswordUseCase } from "@/domain/use-cases/ReinitPassword.usecase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface ReinitPasswordStep2FormProps {
  userId: string;
}

const schema = z
  .object({
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

export const ReinitPasswordStep2Form = ({
  userId,
}: ReinitPasswordStep2FormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      console.log(data);
      const userRepository = new UserRepositoryImpl();
      const reinitPasswordUseCase = new ReinitPasswordUseCase(userRepository);
      await reinitPasswordUseCase.execute(userId, data.password);
      toast({
        title: "Mot de passe réinitialisé avec succès",
        description:
          "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe",
      });
    } catch (error) {
      toast({
        title: "Une erreur est survenue",
        description: "Veuillez réessayer plus tard",
        variant: "destructive",
      });
    } finally {
      form.reset();
      router.push("/signin");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Mot de passe" type="password" {...field} />
              </FormControl>
              <FormDescription className="px-6">
                Pour plus de sécurité, mon mot de passe doit contenir :
                <br />
                <span className="px-4">- entre 8 et 15 caractères</span>
                <br />
                <span className="px-4">- au moins une majuscule</span>
                <br />
                <span className="px-4">- au moins un chiffre</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirmez le mot de passe"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Je répète mon mot de passe</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Valider</Button>
      </form>
    </Form>
  );
};
