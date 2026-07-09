import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "../ui/Button";
import { EventStatusBadge } from "../ui/Badge";
import type { EventDoc } from "../../../types";

interface Props {
  /** Liste des événements à venir, triés par date. Vide = affiche un état vide propre. */
  events: Pick<
    EventDoc,
    "id" | "titre" | "slug" | "lieu" | "dateDebut" | "statut" | "imageUrl" | "prix"
  >[];
}

export function ProchainsEvenements({ events }: Props) {
  return (
    <section className="bg-bg-alt py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-accent-dark uppercase">
              Agenda
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
              Prochains événements
            </h2>
          </div>
          <Button href="/evenements" variant="ghost" size="sm">
            Tous les événements <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="mt-10 rounded-xl border border-dashed border-muted/30 bg-white p-10 text-center text-muted">
            Aucun événement à venir pour le moment. Revenez bientôt !
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/evenements/${event.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${event.imageUrl}')` }}
                />
                <div className="p-6">
                  <EventStatusBadge status={event.statut} />
                  <h3 className="mt-3 font-display text-lg font-semibold text-primary">
                    {event.titre}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {format(event.dateDebut.toDate(), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {event.lieu}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-accent-dark">
                    {event.prix > 0 ? `${event.prix.toLocaleString("fr-FR")} FCFA` : "Gratuit"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}