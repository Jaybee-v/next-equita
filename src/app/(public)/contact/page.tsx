import { auth } from "@/auth";
import { ContactForm } from "@/components/common/forms/ContactForm";
import { Footer } from "@/components/ui/Footer";
import React from "react";

export default async function PublicContactPage() {
  const session = await auth();
  return (
    <main className="lg:pt-8">
      <div className="bg-card max-w-lg mx-auto p-6 lg:rounded lg:drop-shadow-md lg:mb-16">
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
