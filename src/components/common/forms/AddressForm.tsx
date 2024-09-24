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
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddressFormProps {
  session: Session;
  setOpen?: (open: boolean) => void;
}

const schema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
  userId: z.string(),
});

export const AddressForm = ({ session, setOpen }: AddressFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      street: "",
      city: "",
      zipCode: "",
      country: "FRANCE",
      userId: session.user.id,
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);

    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="street"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input {...field} placeholder="25 allée des grands champs" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Paris" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="zipCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code postal</FormLabel>
              <FormControl>
                <Input {...field} placeholder="75000" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
