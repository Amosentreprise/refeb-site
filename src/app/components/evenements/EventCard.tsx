import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { EventStatusBadge } from "../../components/ui/Badge";
import type { DemoEvent } from "@/lib/demo-data";

export function EventCard({ event }: { event: DemoEvent }) {
  const placesInfo =
    event.placesTotal !== null
      ? `${event.placesRestantes} places restantes / ${event.placesTotal}`
      : "Places illimitées";

  return (
    <Link
      href={`components/evenements/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div
        className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${event.imageUrl}')` }}
      />
      <div className="flex flex-1 flex-col p-6">
        <EventStatusBadge status={event.statut} />
        <h3 className="mt-3 font-display text-lg font-semibold text-primary">
          {event.titre}
        </h3>
        <p className="mt-2 text-sm text-muted line-clamp-2">
          {event.descriptionCourte}
        </p>
        <div className="mt-4 flex flex-col gap-1.5 text-sm text-muted">
          <span className="flex items-center gap-2">
            <CalendarDays size={16} />
            {format(event.dateDebut.toDate(), "d MMMM yyyy", { locale: fr })}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} />
            {event.lieu} 
          </span>
          {event.statut !== "passe" && (
            <span className="flex items-center gap-2">
              <Users size={16} />
              {placesInfo}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="text-sm font-semibold text-accent-dark">
            {event.prix > 0 ? `${event.prix.toLocaleString("fr-FR")} FCFA` : "Gratuit"}
          </p>
          <span className="text-sm font-semibold text-primary group-hover:underline">
            Détails
          </span>
        </div>
      </div>
    </Link>
  );
}