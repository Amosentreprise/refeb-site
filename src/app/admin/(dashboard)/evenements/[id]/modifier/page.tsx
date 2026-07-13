import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventForm } from "../../../../../components/admin/EventForm";
import { getEventByIdAdmin } from "@/lib/firebase/admin-queries";



interface Props {
  params: Promise<{ id: string }>;
}

export default async function ModifierEvenementPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventByIdAdmin(id);

  if (!event) notFound();

  // Les Timestamp du SDK Admin sont des instances de classe : impossible de
  // les transmettre telles quelles à un Client Component. On les convertit
  // en chaînes ISO ; EventForm sait lire ce format pour un événement existant.
  const eventForClient = {
    ...event,
    dateDebut: event.dateDebut.toDate().toISOString(),
    dateFin: event.dateFin.toDate().toISOString(),
    createdAt: event.createdAt?.toDate().toISOString() ?? null,
    updatedAt: event.updatedAt?.toDate().toISOString() ?? null,
  };

  return (
    <div>
      <Link
        href={`/admin/evenements/${id}`}
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft size={16} /> Retour à l&apos;événement
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-primary">
        Modifier l&apos;événement
      </h1>
      <p className="mt-1 mb-6 text-sm text-muted">{event.titre}</p>

      <EventForm existingEvent={eventForClient} />
    </div>
  );
}