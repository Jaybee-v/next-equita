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
import { Address } from "@/domain/entities/Address";
import { CreateAddressUseCase } from "@/domain/use-cases/CreateAddress.usecase";
import { UpdateAddressUseCase } from "@/domain/use-cases/UpdateAddress.usecase";
import { useToast } from "@/hooks/use-toast";
import { AddressRepositoryImpl } from "@/infrastructure/repositories/AddressRepositoryImpl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddressFormProps {
  session: Session;
  setOpen?: (open: boolean) => void;
  address?: Address;
}

const schema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
  userId: z.string(),
});

export const AddressForm = ({
  session,
  setOpen,
  address,
}: AddressFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      street: address?.street || "",
      city: address?.city || "",
      zipCode: address?.zipCode || "",
      country: address?.country || "FRANCE",
      userId: session.user.id,
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      if (!address) {
        const addressRepository = new AddressRepositoryImpl();
        const createAddressUseCase = new CreateAddressUseCase(
          addressRepository
        );
        const createAddress = createAddressUseCase.execute(data);
        console.log(createAddress);
        toast({
          title: "Adresse ajoutée",
          description: "Votre adresse a bien été ajoutée",
        });
      }
      if (address) {
        const addressRepository = new AddressRepositoryImpl();
        const updateAddressUseCase = new UpdateAddressUseCase(
          addressRepository
        );
        const updateAddress = updateAddressUseCase.execute(address.id, data);
        console.log(updateAddress);
        toast({
          title: "Adresse modifiée",
          description: "Votre adresse a bien été modifiée",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de votre adresse",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        if (setOpen) {
          setOpen(false);
        }
        setIsSubmitting(false);
      }, 3000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
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
        <Button type="submit">
          {isSubmitting
            ? "Adresse en cours d'enregistrement"
            : "Enregistrer l'adresse"}
        </Button>
      </form>
    </Form>
  );
};
