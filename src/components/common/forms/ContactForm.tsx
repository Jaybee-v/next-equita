"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ContactFormProps {
  session: Session | null;
}

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  lastname: z.string(),
  content: z.string().min(10),
});

export const ContactForm = ({ session }: ContactFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: session ? session.user.email : "",
      name: session ? session.user.name : "",
      lastname: session ? session.user.lastname : "",
      content: "",
    },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email" type="email" />
              </FormControl>
              <FormDescription>
                Votre adresse email ne sera pas partagée, elle servira à vous
                recontacter si besoin.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormDescription>Je renseigne mon nom de famille</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormDescription>Je renseigne mon prénom</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message" {...field} rows={5} />
              </FormControl>
              <FormDescription>
                Votre message doit contenir au moins 10 caractères.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <article className="justify-center flex pt-8">
          <Button>Envoyer</Button>
        </article>
      </form>
    </Form>
  );
};
