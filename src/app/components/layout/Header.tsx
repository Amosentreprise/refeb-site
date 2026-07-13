"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Import des icônes Lucide

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu mobile
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Données du menu pour simplifier le rendu
  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/historique", label: "Histoire" },
    { href: "/activites", label: "Activités" },
    { href: "/evenements", label: "Événements" },
    { href: "/galerie", label: "Galerie" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-4 bg-[#0b2240]/90 backdrop-blur-md shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* LOGO (Visible tout le temps) */}
        <Link href="/" className="relative z-10">
          <Image 
            src="/images/logo-refeb.png" // Assure-toi que c'est un .png transparent
            alt="Logo REFEB" 
            width={60} 
            height={30} 
            className="h-auto w-auto brightness-0 invert"
          />
        </Link>

        {/* NAVIGATION DESKTOP (Masquée sur mobile) */}
        <div className="hidden lg:flex items-center gap-x-8 text-sm font-bold uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`${isActive(link.href) ? "text-[#e1a924]" : "text-white"} hover:text-[#e1a924] transition-colors`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* BOUTON INSCRIPTION DESKTOP */}
          <Link 
            href="/evenements" 
            className="rounded-full bg-[#e1a924] px-6 py-2.5 text-[#0b2240] transition-transform hover:scale-105"
          >
            S'inscrire
          </Link>
        </div>

        {/* BOUTON MENU HAMBURGER (Mobile uniquement) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="lg:hidden relative z-50 text-white focus:outline-none p-2"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </nav>

      {/* PANNEAU DE NAVIGATION MOBILE ( plein écran ) */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0b2240]/95 backdrop-blur-lg transition-transform duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: '100dvh' }} // Hauteur dynamique tenant compte des barres de navigateur
      >
        <div className="flex flex-col items-center justify-center h-full gap-y-10 text-center font-bold uppercase tracking-wider text-2xl pb-20">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)} // Ferme le menu au clic
              className={`${isActive(link.href) ? "text-[#e1a924]" : "text-white"} transition-colors duration-300 hover:text-[#e1a924]`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* BOUTON INSCRIPTION MOBILE (Dans le menu) */}
          <Link 
            href="/evenements" 
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full bg-[#e1a924] px-10 py-5 text-[#0b2240] mt-6 text-lg font-black"
          >
            S'inscrire 
          </Link>
        </div>
      </div>

    </header>
  );
}