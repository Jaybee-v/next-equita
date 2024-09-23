"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/domain/entities/User";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";

interface SearchStableOrTeacherFormProps {
  setTargets: (targets: User[]) => void;
  setError: (error: string) => void;
}

const schema = z.object({
  name: z.string(),
});

export const SearchStableOrTeacherForm = ({
  setTargets,
  setError,
}: SearchStableOrTeacherFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    const search: User[] | { message: string; users: User[] } =
      await new UserRepositoryImpl().getUserByName(data.name);
    console.log(search);
    if ("message" in search) {
      setError(search.message);
      setTargets(search.users);
    } else {
      setError(
        "Voici une liste de moniteurs ou de centres équestres correspondant à votre recherche"
      );
      setTargets(search as User[]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Rechercher avec le nom du centre équestre / moniteur"
            />
          )}
        />
        <Button type="submit"> Rechercher</Button>
      </form>
    </Form>
  );
};
