"use client";

import { useRef } from "react";
import Link from "next/link";
import { BookOpen, Users, HeartHandshake, GraduationCap, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(
  () => {

    gsap.from(".activity-row", {
      opacity: 0,
      y: 80,
      rotateX: -15,
      duration: 1,
      stagger: 0.18,
      ease: "expo.out",
    });


    gsap.from(".activity-icon", {
      scale: 0,
      rotate: -180,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out",
    });


    gsap.from(".reveal-text", {
      opacity: 0,
      x: -40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

  },
  {
    scope: containerRef,
  }
);

  return (
    <section ref={containerRef} className="bg-primary-dark py-32 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
          
          {/* CÔTÉ GAUCHE : ACCROCHE ÉDITORIALE INSTITUTIONNELLE */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 reveal-text">
              <span className="h-1.5 w-8 rounded-full bg-accent" />
              <p className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
                Nos piliers d'action
              </p>
            </div>
            
            <h2 className="reveal-text mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              Une Vision Une Foi, <br />
              <span className="bg-gradient-to-r from-accent via-accent/70 to-white bg-clip-text text-transparent">
                Pour l&apos;Avenir.
              </span>
            </h2>
            
            <p className="reveal-text mt-6 text-base text-slate-300 leading-relaxed max-w-md font-medium">
              Découvrez comment notre réseau transforme l&apos;environnement éducatif chrétien au Bénin à travers des axes d&apos;intervention ciblés et porteurs d&apos;impact.
            </p>

            <div className="reveal-text mt-10">
              <Link
                href="/activites"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-primary transition-all hover:bg-accent/90 shadow-lg shadow-accent/10 cursor-pointer"
              >
                Découvrir nos actions
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* CÔTÉ DROIT : LISTE DES PILIERS INTERACTIFS */}
          <div className="lg:col-span-7 space-y-4">
            {activites.map((activite) => {
              const Icon = activite.icon;
              return (
                <div
                  key={activite.titre}
                  className="
activity-row
group
relative
overflow-hidden
rounded-3xl
border
border-white/10
bg-gradient-to-br
from-white/[0.06]
to-white/[0.01]
p-8
backdrop-blur-xl
transition-all
duration-500
hover:-translate-y-2
hover:border-accent/40
hover:shadow-2xl
hover:shadow-accent/10
"
                >
                  <div
className="
absolute
- left-20
-top-20
h-40
w-40
rounded-full
bg-accent/20
blur-3xl
opacity-0
transition-opacity
duration-500
group-hover:opacity-100
"
/>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    
                    {/* Numéro et Icône */}
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-display text-xl font-bold text-accent/30 group-hover:text-accent transition-colors">
                        {activite.number}
                      </span>
                      <div
                        className="
activity-icon
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-white/5
text-slate-300
border
border-white/10
transition-all
duration-500
group-hover:scale-125
group-hover:bg-accent
group-hover:text-primary
group-hover:rotate-6
"
                        >
                        <Icon size={24} />
                      </div>
                    </div>

                    {/* Titre et Description */}
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent">
                        {activite.titre}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors font-medium">
                        {activite.description}
                      </p>
                    </div>

                    {/* Flèche d'action */}
                    <div className="self-end sm:self-start pt-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 border border-white/5 transition-all group-hover:bg-white/10 group-hover:text-white group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                  </div>
                  
                  {/* Lien invisible pour l'accessibilité */}
                  <Link href="/activites" className="absolute inset-0 z-10" aria-label={activite.titre} />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}