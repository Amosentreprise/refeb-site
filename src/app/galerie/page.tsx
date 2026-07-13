"use client";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GalleryGrid } from "../components/galerie/GalleryGrid";
import { demoGalleryImages } from "@/lib/demo-gallery";

export default function GaleriePage() {
  return (
    <div className="min-h-screen bg-[#0b2240]">
      <Header />
      
      {/* SECTION HÉROS AVEC LE FOND TECHNIQUE EXACT */}
      <section 
        className="relative pt-32 pb-24 px-6 text-center text-white"
        style={{
          background: `
            linear-gradient(to right, rgba(11, 34, 64, 0.4), rgba(11, 34, 64, 0.4)), 
            radial-gradient(circle at center, rgba(17, 50, 93, 0.4) 0%, rgba(11, 34, 64, 1) 70%),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            #0b2240
          `,
          backgroundSize: '100% 100%, 100% 100%, 42px 42px, 42px 42px'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[#e1a924] font-black tracking-[0.3em] uppercase text-xs">Témoignages en images</span>
          <h1 className="mt-8 font-display text-5xl md:text-7xl font-black">Galerie Photos</h1>
          <p className="mt-6 text-slate-300 text-lg max-w-xl mx-auto">
            Revivez à travers nos archives les moments marquants, les rassemblements fraternels et les séminaires de formation du réseau au Bénin.
          </p>
        </div>
      </section>

      {/* SECTION CONTENU (FOND SLATE POUR LE CONTRASTE) */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <GalleryGrid images={demoGalleryImages} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}