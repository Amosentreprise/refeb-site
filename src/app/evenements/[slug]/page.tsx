import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { EventStatusBadge } from "../../components/ui/Badge";
import { InscriptionForm } from "../../components/evenements/InscriptionForm";
import { getEventBySlug } from "@/lib/firebase/events"; // Import de ta fonction Firestore



interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const rawEvent = await getEventBySlug(slug);
  if (!rawEvent) notFound();

  // Sérialisation des instances de classes Firebase complexes en objets JS natifs
  const serializedEvent = {
    ...rawEvent,
    dateDebut: rawEvent.dateDebut.toDate().toISOString(),
    dateFin: rawEvent.dateFin.toDate().toISOString(),
    createdAt: rawEvent.createdAt ? rawEvent.createdAt.toDate().toISOString() : null,
    updatedAt: rawEvent.updatedAt ? rawEvent.updatedAt.toDate().toISOString() : null,
  };

  const dateDebutJs = new Date(serializedEvent.dateDebut);
  const dateFinJs = new Date(serializedEvent.dateFin);

  return (
    <>
      <Header />
      <main className="bg-slate-50/50 min-h-screen">
        <section className="relative h-80 sm:h-[450px] bg-slate-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url('${serializedEvent.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-6 pb-10 lg:px-8">
            <div className="flex flex-col items-start gap-3">
              <EventStatusBadge status={serializedEvent.statut} />
              <h1 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-tight max-w-3xl">
                {serializedEvent.titre}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium mt-1">
                {serializedEvent.descriptionCourte}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-3 lg:px-8 items-start">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-white p-6 border border-slate-100 shadow-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-0.5">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {format(dateDebutJs, "d MMMM yyyy", { locale: fr })}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Horaires : {format(dateDebutJs, "HH:mm")} - {format(dateFinJs, "HH:mm")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-x border-slate-100 pt-4 sm:pt-0 sm:px-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lieu</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{serializedEvent.lieu}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-0.5">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Disponibilité</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {serializedEvent.placesTotal === null ? "Places illimitées" : `${serializedEvent.placesRestantes} places dispos`}
                    </p>
                    {serializedEvent.placesTotal && (
                      <p className="text-xs text-slate-500 mt-0.5">sur une jauge de {serializedEvent.placesTotal}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-slate-900 border-b border-slate-50 pb-4">
                  À propos de l'événement
                </h2>
                <p className="mt-5 leading-relaxed text-slate-600 whitespace-pre-line">{serializedEvent.description}</p>
              </div>

              {serializedEvent.programme && (
                <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <Clock className="text-primary" size={22} />
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                      Programme des sessions
                    </h2>
                  </div>
                  <p className="mt-5 leading-relaxed text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-xl font-mono text-sm">
                    {serializedEvent.programme}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
                <div className="border-b border-slate-100 pb-4 mb-5">
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    Réserver un pass
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Tarif d'accès : <span className="font-bold text-slate-800 text-sm">{serializedEvent.prix > 0 ? `${serializedEvent.prix.toLocaleString('fr-FR')} FCFA` : "Gratuit"}</span>
                  </p>
                </div>
                <InscriptionForm event={serializedEvent} />
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}