"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateReinitPasswordUseCase } from "@/domain/use-cases/CreateReinitPassword.usecase";
import { ReinitPasswordRepositoryImpl } from "@/infrastructure/repositories/ReinitPasswordRepositoryImpl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
});

export const ForgetPasswordForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    const reinitPasswordRepository = new ReinitPasswordRepositoryImpl();
    const createReinitPasswordUseCase = new CreateReinitPasswordUseCase(
      reinitPasswordRepository
    );
    const reinitPassword = await createReinitPasswordUseCase.execute(data);
    console.log(reinitPassword);

    if (reinitPassword) {
      console.log("Reinit password created successfully");
      router.push("/forget-password");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="lesecuriesdusentier@example.com"
                />
              </FormControl>
              <FormDescription>
                Nous vous enverrons un lien pour réinitialiser votre mot de
                passe.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Réinitialiser mon mot de passe</Button>
      </form>
    </Form>
  );
};
