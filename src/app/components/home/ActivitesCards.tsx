"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Users, HeartHandshake, GraduationCap, ArrowUpRight } from "lucide-react";

const activites = [
  {
    icon: BookOpen,
    number: "01",
    titre: "Formations spirituelles",
    description:
      "Sessions régulières de formation biblique et théologique pour affermir la foi des enseignants.",
  },
  {
    icon: Users,
    number: "02",
    titre: "Rencontres & retraites",
    description:
      "Temps forts de communion fraternelle, de partage et de ressourcement spirituel à travers tout le Bénin.",
  },
  {
    icon: GraduationCap,
    number: "03",
    titre: "Accompagnement pédagogique",
    description:
      "Appui technique et mentorat pour allier la rigueur académique aux valeurs évangéliques.",
  },
  {
    icon: HeartHandshake,
    number: "04",
    titre: "Actions communautaires",
    description:
      "Initiatives solidaires et sociales menées par le réseau au profit des écoles et des localités.",
  },
];

export function ActivitesCards() {
  const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, title: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions((prev) => ({
      ...prev,
      [title]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  return (
    <section className="relative bg-[#0b2240] py-32 text-white w-full">
      
      {/* Subtiles lueurs décoratives d'arrière-plan */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#e1a924]/10 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Changement : Grid robuste sans fioritures de layout complexes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start w-full">
          
          {/* CÔTÉ GAUCHE : ACCROCHE ÉDITORIALE */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#e1a924] shadow-md shadow-[#e1a924]/50" />
              <p className="text-xs font-bold tracking-[0.25em] text-[#e1a924] uppercase">
                Nos piliers d'action
              </p>
            </div>
            
            <h2 className="font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-white">
              Une Vision <br />Une Foi, <br />
              <span className="bg-gradient-to-r from-[#e1a924] via-[#fcdb8a] to-white bg-clip-text text-transparent">
                Pour l&apos;Avenir.
              </span>
            </h2>
            
            <p className="text-base text-slate-200 leading-relaxed max-w-md">
              Découvrez comment notre réseau transforme l&apos;environnement éducatif chrétien au Bénin à travers des axes d&apos;intervention ciblés et porteurs d&apos;impact.
            </p>

            <div className="pt-4">
              <Link
                href="/activites"
                className="group inline-flex items-center gap-3 rounded-full bg-[#e1a924] px-7 py-3.5 text-sm font-bold text-[#0b2240] transition-all duration-300 hover:bg-[#fcdb8a] hover:translate-y-[-2px] shadow-lg shadow-[#e1a924]/10"
              >
                Découvrir nos actions
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* CÔTÉ DROIT : LISTE DES PILIERS INTERACTIFS FLUIDES */}
          <div className="lg:col-span-7 space-y-5 w-full block">
            {activites.map((activite, index) => {
              const Icon = activite.icon;
              const pos = mousePositions[activite.titre] || { x: 0, y: 0 };
              
              return (
                <motion.div
                  key={activite.titre}
                  // Animation au scroll simplifiée et ultra-fiable native
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseMove={(e) => handleMouseMove(e, activite.titre)}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.08] w-full block"
                >
                  {/* EFFET DE COURANT LUMINEUX SUR LE CONTOUR AU SURVOL */}
                  <div
                    className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
                    style={{
                      background: `radial-gradient(130px circle at ${pos.x}px ${pos.y}px, #e1a924, transparent 70%)`,
                      maskImage: 'linear-gradient(white, white)',
                      WebkitMaskImage: 'linear-gradient(white, white)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      padding: '1px'
                    }}
                  />

                  {/* Lueur ambrée diffuse interne */}
                  <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#e1a924]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full">
                    
                    {/* Numéro et Icône */}
                    <div className="flex items-center gap-5 shrink-0">
                      <span className="font-display text-xl font-black text-white/20 group-hover:text-[#e1a924] transition-colors duration-300">
                        {activite.number}
                      </span>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-slate-300 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#e1a924] group-hover:text-[#0b2240] group-hover:border-none group-hover:rotate-3 shadow-md">
                        <Icon size={22} />
                      </div>
                    </div>

                    {/* Titre et Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl font-extrabold text-white transition-colors duration-300 group-hover:text-[#e1a924] truncate">
                        {activite.titre}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300 group-hover:text-white transition-colors duration-300 break-words">
                        {activite.description}
                      </p>
                    </div>

                    {/* Flèche d'action */}
                    <div className="self-end sm:self-center shrink-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-slate-400 border border-white/5 transition-all duration-300 group-hover:bg-[#e1a924]/20 group-hover:text-[#e1a924] group-hover:rotate-45 group-hover:border-[#e1a924]/30">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                  </div>
                  
                  {/* Lien invisible d'accessibilité globale */}
                  <Link href="/activites" className="absolute inset-0 z-30" aria-label={activite.titre} />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}