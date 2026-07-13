"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";

const SLIDES_DATA = [
  {
    image: "/images/image.jpg",
    eyebrow: "REFEB • DEPUIS 2016 AU BÉNIN",
    titleLine1: "L'école est un",
    titleLine2: "champ de mission",
    titleLine3: "stratégique pour",
    titleLine4: "les générations.",
    subtitle: "Le Réseau Évangélique des Frères Enseignants du Bénin forme des éducateurs capables d'impacter l'école, l'Église et la société.",
  },
  {
    image: "/images/image1.jpg",
    eyebrow: "NOTRE CRÉDO",
    titleLine1: "Prêcher et vivre",
    titleLine2: "l'Évangile en",
    titleLine3: "milieu éducatif",
    titleLine4: "par des professionnels.",
    subtitle: "Une vision née pour amener la jeunesse de la séduction spirituelle à la glorieuse lumière de la vérité et de l'excellence.",
  },
  {
    image: "/images/image2.jpg",
    eyebrow: "NOTRE VOCATION",
    titleLine1: "Former des",
    titleLine2: "enseignants de",
    titleLine3: "type nouveau",
    titleLine4: "en Jésus-Christ.",
    subtitle: "Développer un discipolat discret, multiplicateur et Christocentrique pour transformer durablement notre système éducatif.",
  }
];

const DEVISE_CHANNELS = [
  { title: "Intégrité", desc: "Morale et professionnelle" },
  { title: "Excellence", desc: "Académique et spirituelle" },
  { title: "Solidarité", desc: "Intégration et entraide" }
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".bg-slide");

      slides.forEach((slide, index) => {
        if (index !== currentSlide) {
          gsap.to(slide, { opacity: 0, duration: 2, ease: "power2.inOut" });
        } else {
          // Opacité douce pour laisser transparaître le bleu royal en arrière-plan
          gsap.to(slide, { opacity: 0.25, duration: 2, ease: "power2.inOut" });
        }
      });

      gsap.fromTo(
        ".hero-content-drop",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.05 }
      );
    },
    { scope: containerRef, dependencies: [currentSlide] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center pt-28 bg-gradient-to-br from-[#0b2240] via-[#11325d] to-[#1a457a]"
    >
      {/* ARRIÈRE-PLAN D'IMAGES ET EFFETS DE LUMIÈRE */}
      <div className="absolute inset-0 z-0">
        {SLIDES_DATA.map((slide, index) => (
          <div
            key={slide.image}
            className="bg-slide absolute inset-0 bg-cover bg-center opacity-0 will-change-transform"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        {/* Gradients pour fusionner l'image avec le bleu royal lumineux */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2240] via-[#11325d]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2240] via-transparent to-transparent" />
        
        {/* Le quadrillage discret en arrière-plan */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      {/* Halos de lueur colorés pour donner de la profondeur */}
      <div className="absolute left-[-10%] top-1/4 h-[600px] w-[600px] rounded-full bg-[#e1a924]/15 blur-[130px] pointer-events-none" />
      <div className="absolute right-[-5%] bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#3b82f6]/20 blur-[100px] pointer-events-none" />

      {/* CONTENU GLOBAL */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Colonne Gauche */}
        <div className="lg:col-span-7 text-white space-y-6">
          
          <div className="hero-content-drop flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#e1a924] shadow-md shadow-[#e1a924]/50" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e1a924] sm:text-sm">
              {SLIDES_DATA[currentSlide].eyebrow}
            </p>
          </div>

          <h1 className="hero-content-drop font-display text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-7xl min-h-[4.5em] lg:min-h-[3.8em]">
            <span className="block text-white">{SLIDES_DATA[currentSlide].titleLine1}</span>
            <span className="block bg-gradient-to-r from-[#e1a924] via-[#fcdb8a] to-[#e1a924] bg-clip-text text-transparent">
              {SLIDES_DATA[currentSlide].titleLine2}
            </span>
            <span className="block text-white">{SLIDES_DATA[currentSlide].titleLine3}</span>
            <span className="block bg-gradient-to-r from-[#fcdb8a] to-white bg-clip-text text-transparent">
              {SLIDES_DATA[currentSlide].titleLine4}
            </span>
          </h1>

          <p className="hero-content-drop max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg min-h-[4.5em]">
            {SLIDES_DATA[currentSlide].subtitle}
          </p>

          <div className="hero-content-drop pt-4 flex flex-wrap gap-4">
            <Button
              href="/historique"
              className="rounded-full bg-[#e1a924] px-8 py-4 font-bold text-[#0b2240] shadow-lg shadow-[#e1a924]/20 transition-all duration-300 hover:bg-[#fcdb8a] hover:translate-y-[-2px]"
            >
              Découvrir notre histoire <span className="ml-2">→</span>
            </Button>

            <Button
              href="/adhesion"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:translate-y-[-2px]"
            >
              Rejoindre la mission
            </Button>
          </div>
        </div>

        {/* Colonne Droite - Piliers Institutionnels Épurés */}
        <div className="lg:col-span-5 flex flex-col gap-4 lg:pl-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-1 hidden lg:block">
            NOS PILIERS FONDAMENTAUX
          </p>
          
          {DEVISE_CHANNELS.map((item, idx) => (
            <div
              key={item.title}
              className="group flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-[#e1a924]/40 hover:bg-white/10"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e1a924]/20 text-[#e1a924] font-bold text-sm transition-all duration-300 group-hover:bg-[#e1a924] group-hover:text-[#0b2240]">
                0{idx + 1}
              </div>
              <div>
                <h3 className="text-base font-bold text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-200 group-hover:text-white transition-colors mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* POINTS INDICATEURS */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {SLIDES_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Aller à l'onglet ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide ? "w-10 bg-[#e1a924]" : "w-2.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}