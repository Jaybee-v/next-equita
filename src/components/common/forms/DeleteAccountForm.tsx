"use client";
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

interface DeleteAccountFormProps {
  session: Session;
}

const schema = z.object({
  password: z.string().min(8),
});

export const DeleteAccountForm = ({ session }: DeleteAccountFormProps) => {
  const [password, setPassword] = useState<string>("");
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Saissisez votre mot de passe"
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
          <AlertDialogTrigger>
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              disabled={password.length < 8}
            >
              Supprimer mon compte
            </Button>
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
              <AlertDialogAction>Supprimer mon compte</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};
