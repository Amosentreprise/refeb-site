"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, History, Layers, Calendar, Newspaper,  Image as ImageIcon, Mail, Home } from "lucide-react";
import { cn } from "../../../lib/utils";

const navLinks = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/historique", label: "Historique", icon: History },
  { href: "/activites", label: "Activités", icon: Layers },
  { href: "/evenements", label: "Événements", icon: Calendar },
  { href: "/actualites", label: "Actualités", icon: Newspaper },
 { href: "/galerie", label: "Galerie", icon: ImageIcon },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-6 sm:px-8 lg:px-12 pointer-events-none">
     <header
className={cn(
"animate-header-float relative mx-auto max-w-7xl w-full rounded-full border border-primary/10 bg-white/80 backdrop-blur-xl transition-all duration-300 pointer-events-auto overflow-hidden",
scrolled
? "shadow-xl shadow-accent/10 bg-white/95"
: "shadow-lg"
)}
>


{/* Glow animé autour du header */}

<div className="
absolute
inset-[-2px]
rounded-full
bg-gradient-to-r
from-transparent
via-accent/50
to-transparent
opacity-60
animate-header-glow
pointer-events-none
"
/>


{/* Contenu au-dessus du glow */}

<div className="relative z-10">
        <div className="flex items-center justify-between p-2 pl-6 sm:p-2 sm:pl-8">
          
          {/* LOGO REFEB AUX COULEURS DE LA CHARTE */}
<Link
href="/"
className="
group
relative
flex
items-center
"
>

{/* Glow logo */}

<span
className="
absolute
inset-0
rounded-full
bg-accent/30
blur-xl
opacity-0
transition-opacity
duration-500
group-hover:opacity-100
"
/>


<Image

src="/images/logo-refeb.png"

alt="Logo REFEB"

width={110}

height={35}

priority

className="
relative
z-10
h-auto
w-[90px]
object-contain
transition-transform
duration-500
group-hover:scale-105
"

/>


</Link>

          {/* NAVIGATION DESKTOP EN CAPSULE INTERACTIVE */}
          <nav className="hidden items-center gap-1.5 rounded-full bg-bg-alt/60 p-1 border border-primary/5 lg:flex">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 select-none",
                    isActive
                      ? "bg-white text-primary shadow-sm border border-primary/5"
                      : "text-muted hover:text-primary hover:bg-white/80"
                  )}
                >
                  <LinkIcon size={14} className={cn("transition-transform duration-300", isActive && "scale-110 text-accent-dark")} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* BOUTON D'INSCRIPTION REFEB HARMONISÉ */}
          <div className="hidden lg:block">
            <Link 
              href="/evenements"
              className="group inline-flex items-center gap-3 rounded-full bg-accent p-1.5 pl-5 pr-2.5 text-xs font-bold tracking-wide text-primary shadow-sm transition-all hover:bg-accent/90 cursor-pointer"
            >
              S&apos;inscrire à un événement
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>

          {/* BOUTON DE MENU MOBILE */}
          <button
            className="p-3 mr-1 lg:hidden rounded-full hover:bg-bg-alt transition-colors text-primary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MENU DÉROULANT MOBILE */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 lg:hidden px-4",
            mobileOpen ? "max-h-[450px] pb-6 pt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col gap-1.5 rounded-2xl bg-bg-alt/40 p-3 border border-primary/5">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-white hover:text-primary border border-transparent hover:border-primary/5"
                  )}
                >
                  <LinkIcon size={16} className={isActive ? "text-accent" : "text-muted/60"} />
                  {link.label}
                </Link>
              );
            })}
            
            <Link 
              href="/evenements"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex w-full items-center justify-between rounded-xl bg-accent px-5 py-3.5 text-sm font-bold tracking-wide text-primary shadow-sm hover:bg-accent/90"
            >
              S&apos;inscrire à un événement
              <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
 </div>        
      </header>
    </div>
  );
}