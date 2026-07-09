import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { EventStatusBadge } from "../../components/ui/Badge";
import { InscriptionForm } from "../../components/evenements/InscriptionForm";
import { demoEvents } from "@/lib/demo-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return demoEvents.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = demoEvents.find((e) => e.slug === slug);

  if (!event) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="relative">
          <div
            className="h-72 bg-cover bg-center sm:h-96"
            style={{ backgroundImage: `url('${event.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-6 pb-8 lg:px-8">
            <EventStatusBadge status={event.statut} />
            <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              {event.titre}
            </h1>
          </div>
        </section>

        <section className="bg-bg py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-3 lg:px-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-6 rounded-xl bg-white p-6 text-sm text-muted shadow-sm">
                <span className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-primary" />
                  {format(event.dateDebut.toDate(), "d MMMM yyyy", { locale: fr })}
                  {" — "}
                  {format(event.dateFin.toDate(), "d MMMM yyyy", { locale: fr })}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  {event.lieu}
                </span>
                {event.placesTotal !== null && (
                  <span className="flex items-center gap-2">
                    <Users size={18} className="text-primary" />
                    {event.placesRestantes} places restantes / {event.placesTotal}
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h2 className="font-display text-2xl font-bold text-primary">
                  À propos de l&apos;événement
                </h2>
                <p className="mt-4 leading-relaxed text-ink/80">{event.description}</p>
              </div>

              {event.programme && (
                <div className="mt-8">
                  <h2 className="font-display text-2xl font-bold text-primary">Programme</h2>
                  <p className="mt-4 leading-relaxed text-ink/80">{event.programme}</p>
                </div>
              )}
            </div>

            {/* Bloc inscription (sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="font-display text-xl font-bold text-primary">
                  Inscription
                </h2>
                <p className="mt-1 mb-6 text-sm text-muted">
                  Remplissez le formulaire pour réserver votre place.
                </p>
                <InscriptionForm event={event} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}