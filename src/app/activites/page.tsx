"use client";

import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { BookOpen, Users, GraduationCap, HeartHandshake, Mic, Calendar, Target, BookMarked } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const activites = [
  { icon: BookMarked, titre: "Cours bibliques", detail: "Formations par correspondance pour approfondir la connaissance des Écritures." },
  { icon: Mic, titre: "Conférences", detail: "Temps d'échanges sur les thématiques pédagogiques et bibliques." },
  { icon: GraduationCap, titre: "Animations mensuelles", detail: "Espaces de partage et de renforcement des capacités professionnelles." },
  { icon: HeartHandshake, titre: "Évangélisation", detail: "Semaines dédiées à porter le message de l'Évangile aux collègues." },
  { icon: Target, titre: "Séminaires & Camps", detail: "Camps de formation pour apprenants et séminaires de leadership." },
  { icon: Calendar, titre: "Universités de vacances", detail: "Cadres intensifs de formation, de ressourcement et de mobilisation." },
  { icon: BookOpen, titre: "Formation certifiante", detail: "Cursus spécialisé en éducation chrétienne pour les membres." }
];

export default function ActivitesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Header />
      
      {/* HERO SECTION - STYLE HISTORIQUE */}
      <section className="relative bg-[#0b2240] pt-40 pb-48 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1 mb-6">
            <span className="text-[#e1a924] text-xs font-bold uppercase tracking-widest">Nos activités</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-8 h-[150px]">
            <Typewriter
              options={{
                strings: ['Former pour impacter', 'Transformer une génération', 'Nos missions éducatives'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </div>
      </section>

      {/* SECTION BLANCHE DES ACTIVITÉS */}
      <section className="relative -mt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activites.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#e1a924]/30 transition-all group"
                >
                  <div className="mb-4 p-3 inline-block rounded-xl bg-white shadow-sm border border-slate-100 group-hover:bg-[#e1a924] group-hover:text-white transition-all">
                    <Icon size={24} className="text-[#0b2240] group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0b2240] mb-2">{item.titre}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}