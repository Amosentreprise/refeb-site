"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { KeyStat } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const defaultStats: KeyStat[] = [
  { label: "Années de mission (depuis 2016)", valeur: 10, suffixe: "+" },
  { label: "Enseignants au lancement (2016)", valeur: 50, suffixe: "+" },
  { label: "Sections communales", valeur: 10, suffixe: "+" },
  { label: "Activités phares du réseau", valeur: 9 },
];

export function StatsCounter({ stats = defaultStats }: { stats?: KeyStat[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>(".stat-value");
      counters.forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", 
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString();
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions((prev) => ({
      ...prev,
      [label]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-gradient-to-br from-[#0b2240] via-[#11325d] to-[#1a457a] py-24 text-white border-y border-white/5"
    >
      {/* Subtiles lueurs en arrière-plan */}
      <div className="absolute left-1/4 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[#e1a924]/10 blur-[90px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[90px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const pos = mousePositions[stat.label] || { x: 0, y: 0 };
            return (
              <div
                key={stat.label}
                onMouseMove={(e) => handleMouseMove(e, stat.label)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all duration-300 hover:border-[#e1a924]/30 hover:bg-white/10"
              >
                {/* Effet Courant Lumineux Intégratif au Survol */}
                <div
                  className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
                  style={{
                    background: `radial-gradient(100px circle at ${pos.x}px ${pos.y}px, #e1a924, transparent 70%)`,
                    maskImage: 'linear-gradient(white, white)',
                    WebkitMaskImage: 'linear-gradient(white, white)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px'
                  }}
                />

                {/* Chiffre Principal */}
                <p className="font-display text-5xl font-black tracking-tight text-white sm:text-6xl">
                  <span className="stat-value" data-value={stat.valeur}>
                    0
                  </span>
                  {stat.suffixe && (
                    <span className="text-[#e1a924] ml-0.5">{stat.suffixe}</span>
                  )}
                </p>

                {/* Séparateur Graphique épuré */}
                <div className="mx-auto my-4 h-0.5 w-8 rounded bg-[#e1a924]/30 transition-all duration-300 group-hover:w-16 group-hover:bg-[#e1a924]" />

                {/* Description de la Statistique */}
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors duration-300 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}