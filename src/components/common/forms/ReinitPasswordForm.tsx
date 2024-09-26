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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReinitPasswordStep2Form } from "./ReinitPasswordStep2Form";
import { ReinitPasswordRepositoryImpl } from "@/infrastructure/repositories/ReinitPasswordRepositoryImpl";
import { GetReinitPasswordByIdUseCase } from "@/domain/use-cases/GetReinitPasswordById.usecase";

const schema = z.object({
  token: z.string(),
});

export const ReinitPasswordForm = () => {
  const [step, setStep] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: { token: "" },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    const reinitPasswordRepository = new ReinitPasswordRepositoryImpl();
    const getReinitPasswordUseCase = new GetReinitPasswordByIdUseCase(
      reinitPasswordRepository
    );
    const reinitPassword = await getReinitPasswordUseCase.execute(data.token);
    console.log(reinitPassword);
    if (reinitPassword) {
      setUserId(reinitPassword.id);
      setStep(1);
    }
  };
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {step === 0 && (
          <section className="grid gap-4">
            <FormField
              name="token"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code reçu par email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Entrez votre code ici"
                    />
                  </FormControl>
                  <FormDescription>
                    Veuillez entrer le code reçu par email
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Je valide mon code</Button>
          </section>
        )}
      </form>
      {step === 1 && userId ? (
        <ReinitPasswordStep2Form userId={userId} />
      ) : null}
    </Form>
  );
};
