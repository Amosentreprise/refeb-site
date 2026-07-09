"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "../../../components/ui/Button";
import { EventStatusBadge } from "../../../components/ui/Badge";
import { demoEvents } from "@/lib/demo-data";
import { demoRegistrations } from "@/lib/demo-registrations";

export default function AdminEvenementsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function copierLien(slug: string, id: string) {
    const url = `${window.location.origin}/evenements/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Lien d'inscription copié !");
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Événements</h1>
          <p className="mt-1 text-sm text-muted">
            Gérez les événements, générez des liens d&apos;inscription et suivez les
            inscrits.
          </p>
        </div>
        {/* TODO : lier vers /admin/evenements/nouveau (formulaire de création) */}
        <Button variant="accent" size="md">
          <Plus size={18} /> Nouvel événement
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-muted/10 bg-bg-alt/50 text-muted">
              <th className="px-6 py-4 font-medium">Événement</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Statut</th>
              <th className="px-6 py-4 font-medium">Inscrits</th>
              <th className="px-6 py-4 font-medium">Lien</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoEvents.map((event) => {
              const inscrits = demoRegistrations.filter((r) => r.eventId === event.id).length;
              return (
                <tr key={event.id} className="border-b border-muted/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-ink">{event.titre}</td>
                  <td className="px-6 py-4 text-muted">
                    {format(event.dateDebut.toDate(), "d MMM yyyy", { locale: fr })}
                  </td>
                  <td className="px-6 py-4">
                    <EventStatusBadge status={event.statut} />
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {inscrits}
                    {event.placesTotal ? ` / ${event.placesTotal}` : ""}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => copierLien(event.slug, event.id)}
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Copy size={14} />
                      {copiedId === event.id ? "Copié !" : "Copier"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/evenements/${event.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        Voir inscrits
                      </Link>
                      <Link
                        href={`/evenements/${event.slug}`}
                        target="_blank"
                        className="text-muted hover:text-primary"
                        title="Voir la page publique"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}