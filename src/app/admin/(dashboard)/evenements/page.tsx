"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Copy, Check, ExternalLink, Loader2, CalendarRange } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "../../../components/ui/Button";
import { EventStatusBadge } from "../../../components/ui/Badge";
import { getAllEvents } from "@/lib/firebase/events";
import { getAllRegistrations } from "@/lib/firebase/registrations";
import type { EventDoc, RegistrationDoc } from "@/types";
import { cn } from "@/lib/utils";

export default function AdminEvenementsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllEvents(), getAllRegistrations()])
      .then(([evts, regs]) => {
        setEvents(evts);
        setRegistrations(regs);
      })
      .catch(() => toast.error("Erreur lors du chargement des événements."))
      .finally(() => setLoading(false));
  }, []);

  function copierLien(slug: string, id: string) {
    const url = `${window.location.origin}/evenements/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Lien d'inscription copié !");
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER AVEC ACTION NEUMORPHIC */}
      <div className="flex flex-col gap-4 border-b border-slate-200/40 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Événements
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Gérez les événements, générez des liens d&apos;inscription et suivez les inscrits.
          </p>
        </div>
        <div className="self-start sm:self-center">
          <Button href="/admin/evenements/nouveau" variant="accent" size="md">
            <Plus size={16} /> Nouvel événement
          </Button>
        </div>
      </div>

      {/* ZONE D'ÉTAT PRINCIPALE (CHARGEMENT, VIDE OU TABLEAU) */}
      {loading ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-xs font-semibold text-slate-400">Synchronisation avec Firestore...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-3xl bg-white/50 border border-slate-200/60 border-dashed p-12 text-center shadow-[4px_4px_15px_rgba(0,0,0,0.01)] backdrop-blur-md">
          <CalendarRange className="mx-auto text-slate-300 mb-3" size={40} />
          <p className="text-sm font-medium text-slate-500">
            Aucun événement pour le moment.{" "}
            <Link href="/admin/evenements/nouveau" className="font-bold text-primary hover:underline">
              Créer le premier événement
            </Link>
          </p>
        </div>
      ) : (
        /* BLOC LISTE - Neumorphism Soft */
        <div className="rounded-3xl bg-white/70 border border-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl">
          
          {/* SCROLL HORIZONTAL DISCRET POUR MOBILE */}
          <div className="overflow-x-auto -mx-5 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-5 sm:px-0">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/60 text-slate-400">
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider">Nom de l&apos;événement</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider">Date planifiée</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider">Statut</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider text-center">Inscriptions</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider">Raccourci</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {events.map((event) => {
                    const inscrits = registrations.filter((r) => r.eventId === event.id).length;
                    const isCopied = copiedId === event.id;

                    return (
                      <tr key={event.id} className="group transition-colors hover:bg-slate-50/50">
                        
                        {/* Titre & Catégorie */}
                        <td className="py-4 pr-3 max-w-xs truncate">
                          <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                            {event.titre}
                          </div>
                          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider text-[10px] mt-0.5">
                            {event.categorie || "Général"}
                          </div>
                        </td>
                        
                        {/* Date formatée */}
                        <td className="py-4 pr-3 text-slate-600 font-semibold text-xs">
                          {format(event.dateDebut.toDate(), "d MMM yyyy", { locale: fr })}
                        </td>
                        
                        {/* Statut Badge */}
                        <td className="py-4 px-2">
                          <EventStatusBadge status={event.statut} />
                        </td>
                        
                        {/* Inscrits / Capacité max */}
                        <td className="py-4 px-3 text-center">
                          <span className="font-mono font-bold text-xs text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {inscrits}
                            {event.placesTotal ? ` / ${event.placesTotal}` : ""}
                          </span>
                        </td>
                        
                        {/* Bouton de copie dynamique */}
                        <td className="py-4 px-2">
                          <button
                            onClick={() => copierLien(event.slug, event.id)}
                            className={cn(
                              "inline-flex items-center gap-1.5 text-xs font-bold transition-all px-2.5 py-1.5 rounded-lg border",
                              isCopied
                                ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.02)]"
                                : "bg-white border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 hover:shadow-sm"
                            )}
                          >
                            {isCopied ? <Check size={12} /> : <Copy size={12} />}
                            <span>{isCopied ? "Copié !" : "Lien"}</span>
                          </button>
                        </td>
                        
                        {/* Actions groupées */}
                        <td className="py-4 pl-3 text-right">
                          <div className="inline-flex items-center gap-3">
                            <Link
                              href={`/admin/evenements/${event.id}`}
                              className="inline-flex h-8 items-center rounded-xl bg-slate-900 px-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 hover:scale-[1.02]"
                            >
                              Voir inscrits
                            </Link>
                            <Link
                              href={`/evenements/${event.slug}`}
                              target="_blank"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 transition-all hover:text-primary hover:border-primary/20 hover:shadow-sm"
                              title="Voir la page publique"
                            >
                              <ExternalLink size={14} />
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

        </div>
      )}
    </div>
  );
}