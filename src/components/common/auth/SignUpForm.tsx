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

const schema = z
  .object({
    name: z.string(),
    lastname: z.string().nonempty("Le nom est requis"),
    email: z.string().email("Une adresse email valide est requis"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(15, "Le mot de passe ne doit pas dépasser 15 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const SignUpForm = () => {
  // const router = useRouter()
  const [userType, setUserType] = useState("rider");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values);
    try {
      const user = await new UserRepositoryImpl().save({
        email: values.email,
        password: values.password,
        name: values.name,
        lastname: values.lastname,
        role: userType,
      });
      console.log(user);
      if (user) {
        const result = await signIn("credentials", {
          username: values.email,
          password: values.password,
          redirect: true,
        });
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method="post">
        <section className="max-w-md mx-auto">
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
        </section>
        <FormLabel className="lg:flex justify-center items-baseline gap-2">
          Je suis{" "}
          {userType === "rider" ? (
            <span className="text-lg font-black tracking-wide text-green-600">
              Cavalier
            </span>
          ) : userType === "teacher" ? (
            <span className="text-lg font-black tracking-wide text-green-600">
              Moniteur indépendant
            </span>
          ) : userType === "stable" ? (
            <span className="text-lg font-black tracking-wide text-green-600">
              répresentant d&apos;un Centre équestre
            </span>
          ) : null}
        </FormLabel>
        <section className="flex max-lg:flex-col justify-center items-center gap-4 w-full relative py-6 max-w-4xl mx-auto">
          <article
            className="cursor-pointer group mx-auto"
            onClick={() => setUserType("rider")}
          >
            <Image
              src="/images/rider_1.jpg"
              alt="logo"
              width={100}
              height={100}
              className={`rounded drop-shadow ${
                userType === "rider"
                  ? "brightness-105"
                  : "brightness-50 hover:brightness-105"
              } transition`}
            />
            <section
              className={`${
                userType === "rider" ? "" : "hidden group-hover:block"
              }  w-full lg:absolute`}
            >
              <h3 className="text-lg font-semibold">Cavalier</h3>
              <p
                className={`${
                  userType === "rider" ? "hidden" : ""
                } text-sm text-muted-foreground`}
              >
                Je suis un cavalier
              </p>
            </section>
          </article>
          <article
            className="cursor-pointer group mx-auto"
            onClick={() => setUserType("teacher")}
          >
            <Image
              src="/images/teacher_1.jpg"
              alt="logo"
              width={100}
              height={100}
              className={`rounded drop-shadow ${
                userType === "teacher"
                  ? "brightness-105"
                  : "brightness-50 hover:brightness-105"
              } transition`}
            />
            <section
              className={`${
                userType === "teacher" ? "" : "hidden group-hover:block"
              }  w-full lg:absolute`}
            >
              <h3 className="text-lg font-semibold">Moniteur</h3>
              <p
                className={`${
                  userType === "teacher" ? "hidden" : ""
                } text-sm text-muted-foreground`}
              >
                Je suis moniteur indépendant
              </p>
            </section>
          </article>
          <article
            className="cursor-pointer group mx-auto"
            onClick={() => setUserType("stable")}
          >
            <Image
              src="/images/center_2.jpg"
              alt="logo"
              width={100}
              height={100}
              className={`rounded drop-shadow ${
                userType === "stable"
                  ? "brightness-105"
                  : "brightness-50 hover:brightness-105"
              } transition`}
            />
            <section
              className={`${
                userType === "stable" ? "" : "hidden group-hover:block"
              }  w-full lg:absolute`}
            >
              <h3 className="text-lg font-semibold">Centre équestre</h3>
              <p
                className={`${
                  userType === "stable" ? "hidden" : ""
                } text-sm text-muted-foreground`}
              >
                Je représente un centre équestre
              </p>
            </section>
          </article>
        </section>
        <article className="lg:mt-8 max-w-md mx-auto">
          <Button type="submit" className="w-full">
            Je poursuis mon inscription <ArrowRightFromLine className="ms-4" />
          </Button>
        </article>
      </form>
    </Form>
  );
};
