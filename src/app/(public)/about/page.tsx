import { Footer } from "@/components/ui/Footer";
import React from "react";

export default function PublicAboutPage() {
  return (
    <main>
      <div className="bg-background pt-16">
        {/* Section principale */}
        <section className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl font-bold drop-shadow-xl">
              À propos d&apos;
              <span className="text-sky-700 font-black">Equita-planner</span>
            </h1>
            <h2 className="text-xl mt-4 text-gray-700">
              Simplifiez la gestion des leçons et activités équestres grâce à
              une solution moderne et intuitive.
            </h2>
            <p className="mt-4 text-gray-800">
              Equita-planner combine passion, expérience équestre et technologie
              pour moderniser la gestion des centres équestres, tout en rendant
              la vie plus simple aux cavaliers.
            </p>
          </div>
        </section>

        {/* Mon parcours */}
        <section className="bg-white py-12 mx-auto">
          <div className="container mx-auto px-4  max-w-6xl w-full">
            <article className=" mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-wide drop-shadow-md text-center text-sky-700">
                Mon parcours
              </h2>
              <p className="mt-6 text-lg text-gray-700 text-center lg:px-20">
                Je m&apos;appelle Jean-Baptiste, et après 10 ans en tant que
                moniteur d&apos;équitation, je me suis reconverti dans le
                développement web. Aujourd&apos;hui, je mets mes compétences au
                service des centres équestres avec <br className="lg:hidden" />{" "}
                Equita-planner.
              </p>
            </article>

            {/* Détails du parcours */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="p-6 bg-background rounded-lg drop-shadow-md">
                <h3 className="text-2xl font-semibold text-sky-700">
                  Formation et expérience équestre
                </h3>
                <p className="mt-4 text-gray-600">
                  Diplômé du Village Équestre de Conches en Normandie en 2011,
                  j&apos;ai passé une décennie à enseigner l&apos;équitation
                  dans des centres équestres. Cette expérience m&apos;a donné
                  une compréhension profonde des besoins des enseignants, des
                  gestionnaires et des cavaliers.
                </p>
              </article>

              <article className="p-6 bg-background rounded-lg drop-shadow-md">
                <h3 className="text-2xl font-semibold text-sky-700">
                  Transition vers la technologie
                </h3>
                <p className="mt-4 text-gray-600">
                  Parallèlement à ma carrière équestre, ma passion pour la
                  technologie m&apos;a poussé à me former en développement web.
                  Aujourd&apos;hui, je mets mes compétences à contribution pour
                  transformer l&apos;organisation des centres équestres grâce à
                  Equita-planner.
                </p>
              </article>
            </section>
          </div>
        </section>

        {/* Pourquoi Equita-planner */}
        <section className="container mx-auto px-4 py-12">
          <article className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-wide drop-shadow-md text-sky-700">
              Pourquoi Equita-planner ?
            </h2>
            <p className="mt-6 text-lg text-gray-700">
              J&apos;ai observé des lacunes dans la gestion des plannings
              équestres, souvent source d&apos;erreurs et de frustration pour
              les enseignants et les cavaliers. Equita-planner est né de cette
              volonté de simplifier les réservations et de réduire la charge
              administrative, pour que chacun puisse se concentrer sur
              l&apos;essentiel : la pratique de l&apos;équitation.
            </p>
          </article>
        </section>

        {/* Vision */}
        <section className="bg-white  py-12">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-sky-700">Notre vision</h2>
              <p className="mt-6 text-lg text-gray-600">
                Chez Equita-planner, nous croyons fermement que
                l&apos;innovation doit servir à simplifier le quotidien sans
                dénaturer l&apos;essence de l&apos;équitation. Notre mission est
                d&apos;offrir une plateforme fluide et intuitive qui automatise
                la gestion des activités équestres, pour que les cavaliers,
                enseignants et gestionnaires puissent se concentrer sur leur
                passion : les chevaux.
              </p>
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
