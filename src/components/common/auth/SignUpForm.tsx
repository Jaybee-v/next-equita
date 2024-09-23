"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { ArrowRightFromLine } from "lucide-react";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserTypeSelectorProps {
  title: string;
  description: string;
  image: string;
  isSelected: boolean;
  onSelect: () => void;
}

const schema = z
  .object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    lastname: z.string(),
    email: z.string().email("Une adresse email valide est requise"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(15, "Le mot de passe ne doit pas dépasser 15 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string(),
    level: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type UserType = "rider" | "teacher" | "stable";

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  title,
  description,
  image,
  isSelected,
  onSelect,
}) => (
  <article className="cursor-pointer group mx-auto" onClick={onSelect}>
    <Image
      src={image}
      alt={title}
      width={100}
      height={100}
      className={`rounded drop-shadow ${
        isSelected ? "brightness-105" : "brightness-50 hover:brightness-105"
      } transition`}
    />
    <section
      className={`${
        isSelected ? "" : "lg:hidden group-hover:block"
      } w-full lg:absolute`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p
        className={`${
          isSelected ? "hidden" : ""
        } text-sm text-muted-foreground`}
      >
        {description}
      </p>
    </section>
  </article>
);

export const SignUpForm = () => {
  const { toast } = useToast();
  const [userType, setUserType] = useState<UserType>("rider");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      level: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      const user = await new UserRepositoryImpl().save({
        email: values.email,
        password: values.password,
        name: values.name,
        lastname: values.lastname,
        role: userType,
        level:
          userType === "rider" && values.level ? parseInt(values.level) : null,
      });

      if (user) {
        const result = await signIn("credentials", {
          username: values.email,
          password: values.password,
        });

        if (result?.error) {
          console.log(result.error);

          toast({
            title: "Erreur de connexion",
            description:
              "Impossible de vous connecter automatiquement. Veuillez réessayer.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Inscription réussie",
            description: "Vous êtes maintenant connecté.",
          });
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Erreur d'inscription",
          description:
            error.message || "Une erreur est survenue lors de l'inscription.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const userTypeOptions: {
    type: UserType;
    title: string;
    description: string;
    image: string;
  }[] = [
    {
      type: "rider",
      title: "Cavalier",
      description: "Je suis un cavalier",
      image: "/images/rider_1.jpg",
    },
    {
      type: "teacher",
      title: "Moniteur",
      description: "Je suis moniteur indépendant",
      image: "/images/teacher_1.jpg",
    },
    {
      type: "stable",
      title: "Centre équestre",
      description: "Je représente un centre équestre",
      image: "/images/center_2.jpg",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method="post">
        <section className="max-w-md mx-auto">
          <FormLabel className="lg:flex justify-center items-baseline gap-2">
            Je suis{" "}
            <span className="text-lg font-black tracking-wide text-green-600">
              {userType === "rider" && "Cavalier"}
              {userType === "teacher" && "Moniteur indépendant"}
              {userType === "stable" && "représentant d'un Centre équestre"}
            </span>
          </FormLabel>

          <section className="flex max-lg:flex-col justify-center items-center gap-4 w-full relative py-6 max-w-xl mx-auto lg:mb-6">
            {userTypeOptions.map((option) => (
              <UserTypeSelector
                key={option.type}
                {...option}
                isSelected={userType === option.type}
                onSelect={() => setUserType(option.type)}
              />
            ))}
          </section>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom" {...field} />
                </FormControl>
                <FormDescription>
                  {userType === "stable"
                    ? "Je renseigne le nom de mon écurie"
                    : "Je renseigne mon nom"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {userType !== "stable" && (
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
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  Je renseigne une adresse email valide
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mot de passe"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="px-6">
                  Pour plus de sécurité, mon mot de passe doit contenir :
                  <br />
                  <span className="px-4">- entre 8 et 15 caractères</span>
                  <br />
                  <span className="px-4">- au moins une majuscule</span>
                  <br />
                  <span className="px-4">- au moins un chiffre</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirmez le mot de passe"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Je répète mon mot de passe</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {userType === "rider" && (
            <FormField
              name="level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="type">Niveau requis</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Niveau requis pour la leçon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
          )}
        </section>
        <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting
            ? "Inscription en cours..."
            : "Je poursuis mon inscription"}
          <ArrowRightFromLine className="ms-4" />
        </Button>
      </form>
    </Form>
  );
};
