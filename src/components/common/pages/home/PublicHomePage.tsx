import AuthButton from "@/app/AuthButton.server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/Footer";
import { LinkSecondary } from "@/components/ui/LinkSecondary";
import {
  UserRoundPen,
  MousePointerClick,
  CalendarCheck2,
  CalendarDays,
} from "lucide-react";

export default function PublicHomePage() {
  const features = [
    {
      icon: <UserRoundPen size={40} />,
      title: "Créez votre compte",
      description:
        "Inscrivez-vous en toute sécurité et accédez à votre espace personnel.",
    },
    {
      icon: <MousePointerClick size={40} />,
      title: "Gérez vos réservations en quelques clics",
      description:
        "Suivez vos réservations et organisez vos activités sans tracas.",
    },
    {
      icon: <CalendarCheck2 size={40} />,
      title: "Améliorez la communication",
      description:
        "Facilitez la prise de rendez-vous avec vos cavaliers et enseignez en toute tranquillité.",
    },
    {
      icon: <CalendarDays size={40} />,
      title: "Un planning clair",
      description:
        "Bénéficiez d'un planning organisé et d'une confirmation par email pour chaque réservation.",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Hero Section */}
      <section className="text-center px-4 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Simplifiez les réservations de <br />
          <span className="text-primary">vos cours et activités équestres</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-10">
          Un outil complet pour centres équestres, moniteurs et cavaliers.
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <LinkSecondary label="Créer un compte" href="/signup" />
          <AuthButton />
        </div>
      </section>

      {/* Introduction */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">
          Découvrez une plateforme conçue pour faciliter la gestion des{" "}
          <strong>leçons d&apos;équitation.</strong> Que vous soyez{" "}
          <strong>un cavalier</strong> cherchant de nouvelles expériences,{" "}
          <strong>un moniteur</strong> partageant votre passion, ou un{" "}
          <strong>centre équestre</strong> optimisant vos réservations,{" "}
          <strong>Equita-planner est fait pour vous !</strong>
        </p>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-primary">
          Ce que propose{" "}
          <span className="underline decoration-secondary decoration-4 underline-offset-4">
            Equita-planner
          </span>
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="h-full transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
