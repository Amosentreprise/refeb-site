"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { href: "/historique", label: "Notre histoire" },
  { href: "/activites", label: "Nos activités" },
  { href: "/evenements", label: "Événements" },
  { href: "/actualites", label: "Actualités" },
  { href: "/galerie", label: "Galerie" }
];

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b2240] pt-24 pb-12 text-white border-t border-white/10 w-full block">
      
      {/* Halo lumineux d'ambiance en arrière-plan */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-[#e1a924]/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* GRILLE DE CONTENU PRINCIPALE */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4 w-full">
          
          {/* LOGO + MISSION COMPRESSED */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative inline-flex rounded-2xl border border-white/10 bg-white/5 p-4 overflow-hidden">
              <Image
                src="/images/logo-refeb.jpg"
                alt="Logo REFEB"
                width={130}
                height={40}
                className="relative z-10 object-contain mix-blend-lighten"
              />
            </div>

            <p className="max-w-md text-sm leading-relaxed text-slate-300 font-medium">
              Former des enseignants de type nouveau en Christ, par Christ et pour Christ afin d'impacter l'école, l'Église et la société.
            </p>

            {/* Badges de valeurs institutionnelles */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Intégrité", "Excellence", "Solidarité"].map((value) => (
                <span key={value} className="rounded-full border border-[#e1a924]/20 bg-[#e1a924]/5 px-3.5 py-1.5 text-xs font-bold text-[#e1a924]">
                  {value}
                </span>
              ))}
            </div>
          </div>

          {/* LIENS DE NAVIGATION */}
          <div className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#e1a924]">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="text-[#e1a924] opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COORDONNÉES DE CONTACT */}
          <div className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#e1a924]">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-slate-300 font-semibold">
              <li className="flex items-center gap-3.5">
                <MapPin size={18} className="text-[#e1a924] shrink-0" />
                Cotonou, Bénin
              </li>
              <li className="flex items-center gap-3.5">
                <Phone size={18} className="text-[#e1a924] shrink-0" />
                +229 0195206304
              </li>
              <li className="flex items-center gap-3.5">
                <Mail size={18} className="text-[#e1a924] shrink-0" />
                contact@refeb-benin.org
              </li>
            </ul>
          </div>

        </div>

        {/* GRANDE BANNER SIGNATURE DE MARQUE */}
        <div className="relative mt-20 rounded-2xl border border-white/5 bg-white/[0.02] py-8 text-center overflow-hidden w-full block">
          <p className="relative z-10 text-xs font-black uppercase tracking-[0.4em] text-[#e1a924]/80 px-4">
            Réseau Évangélique des Frères Enseignants du Bénin
          </p>
          <h2 className="relative mt-2 font-display text-[15vw] font-black leading-none uppercase text-white/[0.02] select-none sm:text-[8rem]">
            REFEB
          </h2>
        </div>

        {/* FOOTER BAR (COPYRIGHT + SIGNATURES) */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-6 sm:flex-row w-full">
          
          <p className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} REFEB Bénin. Tous droits réservés.
          </p>

          {/* BLOC LOGO ET SIGNATURE PRO - EKKLESIA DIGITAL */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span>Propulsé par</span>
            <a 
              href="https://ekklesia-digital.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#e1a924] transition-colors duration-300 tracking-wider font-black uppercase"
            >
              Ekklesia Digital
            </a>
          </div>

          {/* RÉSEAUX SOCIAUX */}
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Suivez-nous sur Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:bg-[#e1a924] hover:text-[#0b2240] hover:border-none"
            >
              <FacebookIcon width={16} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}