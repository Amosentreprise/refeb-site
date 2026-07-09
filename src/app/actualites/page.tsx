"use client";

import { Newspaper, Sparkles } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ArticleCard } from "../components/actualites/ArticleCard";
import { demoArticles } from "@/lib/demo-data";

export default function ActualitesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg">
        
        {/* HERO SECTION BANNER ÉDITORIAL */}
        <section className="relative bg-primary-dark py-36 text-white overflow-hidden">
          {/* Filigrane géométrique institutionnel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Newspaper size={14} className="text-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Chroniques & Partages
              </p>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl text-white">
              Actualités du Réseau
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Suivez l&apos;évolution et la vie de notre communauté : annonces officielles, formations pédagogiques, rencontres fraternelles et projets au Bénin.
            </p>
          </div>
        </section>

        {/* SECTION DE LA GRILLE D'ARTICLES (Légèrement surélevée sur le fond) */}
        <section className="relative py-24 px-6 lg:px-8 -mt-10 z-10">
          <div className="mx-auto max-w-6xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-primary/10 pb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-primary flex items-center gap-2">
                  <Sparkles size={20} className="text-accent-dark" />
                  Publications Récentes
                </h2>
                <p className="text-muted text-sm mt-1">Découvrez les derniers événements et ressources partagés par le REFEB.</p>
              </div>
              <div className="mt-4 md:mt-0 text-xs font-bold text-accent-dark bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
                {demoArticles.length} articles disponibles
              </div>
            </div>

            {/* GRILLE D'ARTICLES ÉPURÉE */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {demoArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 rounded-2xl overflow-hidden"
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}