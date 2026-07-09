"use client";

import { Image as ImageIcon, Sparkles } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GalleryGrid } from "../components/galerie/GalleryGrid";
import { demoGalleryImages } from "@/lib/demo-gallery";

export default function GaleriePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg">
        
        {/* HERO SECTION DE PRESTIGE */}
        <section className="relative bg-primary-dark py-36 text-white overflow-hidden">
          {/* Filigrane géométrique institutionnel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 backdrop-blur-sm">
              <ImageIcon size={14} className="text-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Témoignages en images
              </p>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl text-white">
              Galerie Photos
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              Revivez à travers nos archives les moments marquants, les rassemblements fraternels et les séminaires de formation du réseau au Bénin.
            </p>
          </div>
        </section>

        {/* SECTION GRILLE DE VISUELS */}
        <section className="relative py-24 px-6 lg:px-8 -mt-10 z-10">
          <div className="mx-auto max-w-6xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-primary/10 pb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-primary flex items-center gap-2">
                  <Sparkles size={20} className="text-accent-dark" />
                  Retour sur nos événements
                </h2>
                <p className="text-muted text-sm mt-1">L&apos;histoire visuelle et les souvenirs précieux de la communauté.</p>
              </div>
              <div className="mt-4 md:mt-0 text-xs font-bold text-accent-dark bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
                {demoGalleryImages.length} clichés partagés
              </div>
            </div>

            {/* INTEGRATION DE LA GRILLE INTERACTIVE */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/5 shadow-md shadow-ink/5">
              <GalleryGrid images={demoGalleryImages} />
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}