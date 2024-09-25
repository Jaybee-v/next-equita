"use client";
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
import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { LessonRepositoryImpl } from "@/infrastructure/repositories/LessonRepositoryImpl";
import { Session } from "next-auth";
import { CreateLessonUseCase } from "@/domain/use-cases/CreateLesson.usecase";

interface LessonFormProps {
  session: Session;
  start?: string;
  end?: string;
  dateState?: Date;
}

const schema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  type: z.string(),
  date: z.string(),
  start: z.string(),
  end: z.string(),
  // price: z.number().int().positive(),
  isPublic: z.boolean(),
  emptyPlaces: z.string(),
  stableId: z.string(),
  requiredLevel: z.string(),
});

export const LessonForm = ({
  session,
  start,
  end,
  dateState,
}: LessonFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      type: "",
      date: dateState
        ? new Date(dateState).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      start: start || "",
      end: end || "",
      // price: 0,
      isPublic: false,
      emptyPlaces: "",
      stableId: session.user.id as string,
      requiredLevel: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      console.log(data);

      const lessontReporitory = new LessonRepositoryImpl();
      const createLessonUseCase = new CreateLessonUseCase(lessontReporitory);

      const lesson = await createLessonUseCase.execute({
        title: data.title,
        description: data.description || "",
        type: data.type,
        date: new Date(data.date),
        start: data.start.toString(),
        end: data.end.toString(),
        isPublic: data.isPublic,
        emptyPlaces: parseInt(data.emptyPlaces),
        stableId: data.stableId,
        requiredLevel: parseInt(data.requiredLevel),
      });
      console.log("RESULT LESSON HERE", lesson);
      if (lesson) {
        toast({
          title: "Leçon créée",
          description: `La leçon ${data.title} a bien été créée.`,
        });
        form.reset();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        console.log("ICI ERROR ?");

        toast({
          title: "Erreur",
          description: "Impossible de créer la leçon.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Titre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Titre" />
              </FormControl>
              <FormDescription>
                Vous pouvez donner un titre à la leçon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Description" />
              </FormControl>
              <FormDescription>
                Vous pouvez donner une description à la leçon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="type">Discipline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[250px]">
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="date">Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormDescription>Déterminez la date de la leçon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="start">Heure de début</FormLabel>
                <FormControl>
                  <Input className="w-fit" {...field} type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="end">Heure de fin</FormLabel>
                <FormControl>
                  <Input className="w-fit" {...field} type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          name="emptyPlaces"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="type">Places disponibles</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Combien de places libres ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Cours particulier (1 place)</SelectItem>
                  <SelectItem value="2">2 cavaliers</SelectItem>
                  <SelectItem value="3">3 cavaliers</SelectItem>
                  <SelectItem value="4">4 cavaliers</SelectItem>
                  <SelectItem value="5">5 cavaliers</SelectItem>
                  <SelectItem value="6">6 cavaliers</SelectItem>
                  <SelectItem value="7">7 cavaliers</SelectItem>
                  <SelectItem value="8">8 cavaliers</SelectItem>
                  <SelectItem value="9">9 cavaliers</SelectItem>
                  <SelectItem value="10">10 cavaliers</SelectItem>
                  <SelectItem value="100">+ de 10 cavaliers</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="requiredLevel"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="type">Niveau requis</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Niveau requis pour la leçon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10">Tous niveaux</SelectItem>
                  <SelectItem value="0">Débutant</SelectItem>
                  <SelectItem value="1">Galop 1</SelectItem>
                  <SelectItem value="2">Galop 2</SelectItem>
                  <SelectItem value="3">Galop 3</SelectItem>
                  <SelectItem value="4">Galop 4</SelectItem>
                  <SelectItem value="5">Galop 5</SelectItem>
                  <SelectItem value="6">Galop 6</SelectItem>
                  <SelectItem value="7">Galop 7</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="price">Prix</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start ">
              <FormControl>
                <Input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Public</FormLabel>
              <FormDescription>
                Cette leçon sera-t-elle publique ?
              </FormDescription>
            </FormItem>
          )}
        /> */}
        <Button className="w-full mt-6" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours de traitement ..." : "Créer la leçon"}
        </Button>
      </form>
    </Form>
  );
};
