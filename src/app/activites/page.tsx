"use client";

import { Layers, ChevronRight } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { activites } from "@/lib/demo-data";

export default function ActivitesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg">
        
        {/* HERO SECTION - INSTITUTIONNEL ET SOLENNEL */}
        <section className="relative bg-primary-dark py-36 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Layers size={14} className="text-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Domaines d'intervention
              </p>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl text-white">
              Notre Action au Quotidien
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              Quatre grands piliers structurent l&apos;action du REFEB pour servir l&apos;éducation chrétienne et l&apos;épanouissement des enseignants au Bénin.
            </p>
          </div>
        </section>

        {/* LISTE DES ACTIVITÉS - DESIGN BENTO-GRID */}
        <section className="py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-8">
            {activites.map((activite, index) => {
              const Icon = activite.icon;
              return (
                <div
                  key={activite.titre}
                  className="group relative flex flex-col items-start gap-8 rounded-3xl bg-white p-8 sm:p-10 border border-primary/5 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                      <Icon size={30} />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-primary">
                      {activite.titre}
                    </h2>
                  </div>
                  
                  <div className="border-t border-primary/5 pt-8 w-full">
                    <p className="leading-relaxed text-muted font-medium text-lg">
                      {activite.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION CTA - CALL TO ACTION DÉDIÉ */}
        <section className="py-24 bg-primary-dark text-white text-center">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-accent">
              Prêt à nous rejoindre ?
            </h2>
            <p className="mt-4 text-white/70">
              Découvrez nos prochaines dates de rencontres et formations à travers le Bénin.
            </p>
            <div className="mt-10">
              <Button href="/evenements" variant="accent" size="lg" className="rounded-full px-8 py-6 font-bold flex items-center gap-2">
                Explorer le calendrier
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}