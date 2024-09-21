import { auth } from "@/auth";
import { ContactForm } from "@/components/common/forms/ContactForm";
import { Footer } from "@/components/ui/Footer";
import React from "react";

export default async function PublicContactPage() {
  const session = await auth();
  return (
    <main className="">
      <div className="bg-card max-w-6xl min-h-screen w-full h-full mx-auto p-6 flex flex-col justify-center">
        <h1 className="text-sky-700 text-2xl font-semibold tracking-wide text-center">
          Contactez-nous
        </h1>
        <p className="py-6 px-2 text-gray-600">
          Vous avez une question, une suggestion ou une demande particulière ?
          N&apos;hésitez pas à nous contacter en remplissant le formulaire
          ci-dessous.
        </p>
        <ContactForm session={session} />
      </div>
      <Footer />
    </main>
  );
}
