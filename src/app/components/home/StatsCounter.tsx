"use client";

import { useRef } from "react";
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

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>(".stat-value");
      counters.forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
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

  return (
    <section ref={sectionRef} className="bg-primary-dark py-20 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
              <span className="stat-value" data-value={stat.valeur}>
                0
              </span>
              {stat.suffixe}
            </p>
            <p className="mt-2 text-sm text-white/70 sm:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}