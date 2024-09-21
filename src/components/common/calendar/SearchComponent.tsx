"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import disciplines from "@/resources/disciplines.json";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/dates";

const schema = z.object({
  type: z.string().optional(),
  date: z.string().optional(),
  city: z.string().optional(),
});

interface SearchComponentProps {
  currentDate: string;
  setCurrentDate: (date: string) => void;
}

export const SearchComponent = ({
  currentDate,
  setCurrentDate,
}: SearchComponentProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      type: "",
      date: new Date(currentDate).toISOString().split("T")[0],
      city: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    if (data.date) {
      setCurrentDate(formatDate(new Date(data.date)));
    }
  };

  return (
    <div className="bg-gray-200 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl mx-auto"
        >
          <section className="grid grid-cols-2 gap-4">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="type">Discipline</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[250px] bg-card">
                        <SelectValue placeholder="Définissez la discipline ..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {disciplines.map((d, i) => (
                        <SelectItem value={d.nom} key={"discipline_" + i + d}>
                          {d.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recherche par ville</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ville" className="bg-card" />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
          <article className="flex justify-center">
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selectionnez une date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-fit bg-card"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </article>
          <article className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Rechercher
            </Button>
          </article>
        </form>
      </Form>
    </div>
  );
};
