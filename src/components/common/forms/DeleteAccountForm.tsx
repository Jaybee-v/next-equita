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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageSquareWarning } from "lucide-react";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { DeleteAccountUseCase } from "@/domain/use-cases/DeleteAccount.usecase";

interface DeleteAccountFormProps {
  session: Session;
}

const schema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const DeleteAccountForm = ({ session }: DeleteAccountFormProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const userRepository = new UserRepositoryImpl();
      const deleteAccountUseCase = new DeleteAccountUseCase(userRepository);
      await deleteAccountUseCase.execute(session.user.id, data.password);
      // Gérer le succès ici (par exemple, rediriger l'utilisateur ou afficher un message)
    } catch (error) {
      console.error(error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 pt-4">
        <Alert variant="destructive" className="bg-red-50">
          <MessageSquareWarning className="h-4 w-4" />
          <AlertTitle className="font-bold">
            Attention! Vous êtes sur le point de supprimer votre compte.
          </AlertTitle>
          <AlertDescription>
            Cette action est irréversible. <br />
            Toutes vos données seront supprimées.
            <br />
            Veuillez confirmer votre mot de passe pour supprimer votre compte.
          </AlertDescription>
        </Alert>
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Saisissez votre mot de passe"
                />
              </FormControl>
              <FormDescription>
                Pour des raisons de sécurité, veuillez confirmer votre mot de
                passe pour supprimer votre compte.
              </FormDescription>
            </FormItem>
          )}
        />
        <AlertDialog>
          <AlertDialogTrigger
            className={`w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2 ${
              !form.formState.isValid ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!form.formState.isValid}
          >
            Supprimer mon compte
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer votre compte?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                Supprimer mon compte
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};
