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
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
});

export const ForgetPasswordForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: { email: "" },
  });
  return (
    <Form {...form}>
      <form className="grid gap-4">
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
