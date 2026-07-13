"use client";

import { useMemo, useState, useEffect } from "react";
import { CalendarDays, Sparkles, Loader2 } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { EventCard } from "../components/evenements/EventCard";
import { EventFilter, type EventFilterValue } from "../components/evenements/EventFilter";
import { getAllEvents } from "@/lib/firebase/events";
import { toast } from "sonner";
import type { EventDoc } from "@/types";

export default function EvenementsPage() {
  const [filter, setFilter] = useState<EventFilterValue>("tous");
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupération des vrais événements depuis Firestore au chargement
  useEffect(() => {
    async function fetchEvents() {
      try {
        const realEvents = await getAllEvents();
        setEvents(realEvents);
      } catch (error) {
        console.error("Erreur lors du chargement des événements:", error);
        toast.error("Impossible de récupérer l'agenda. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Filtrage basé sur les données réelles de Firestore
  const filteredEvents = useMemo(() => {
    if (filter === "tous") return events;
    return events.filter((e) => e.statut === filter);
  }, [filter, events]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg">
        
        {/* HERO BANNER INSTITUTIONNEL */}
        <section className="relative bg-primary-dark py-36 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 backdrop-blur-sm">
              <CalendarDays size={14} className="text-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Agenda Officiel
              </p>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl text-white">
              Événements & Rencontres
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Retrouvez l&apos;ensemble de nos rassemblements, séminaires de formation et conférences. Réservez votre place et participez à la dynamique du réseau au Bénin.
            </p>
          </div>
        </section>

        {/* SECTION FILTRES ET AGENDA */}
        <section className="relative py-24 px-6 lg:px-8 -mt-10 z-10">
          <div className="mx-auto max-w-6xl">
            
            {/* Barre de tri stylisée */}
            <div className="bg-white rounded-3xl p-6 border border-primary/5 shadow-md shadow-ink/5 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 self-start md:self-center">
                <Sparkles size={18} className="text-accent-dark" />
                <span className="text-sm font-bold text-primary">Filtrer les sessions :</span>
              </div>
              <EventFilter active={filter} onChange={setFilter} />
            </div>

            {/* GESTION DE L'ÉTAT DE CHARGEMENT OU DU CONTENU */}
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-sm text-muted font-medium">Chargement de l'agenda en temps réel...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-primary/20 bg-white p-16 text-center">
                <CalendarDays size={40} className="mx-auto text-muted/40 mb-4" />
                <p className="text-base font-medium text-muted">
                  Aucun événement planifié dans cette catégorie pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 rounded-2xl overflow-hidden"
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}